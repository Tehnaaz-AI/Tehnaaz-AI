import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Project from '../models/Project';
import Skill from '../models/Skill';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const ASSETS_DIR = path.join(__dirname, '../../../assets');
const CLOUD_FOLDER = 'portfolio'; // Base folder in Cloudinary

async function uploadDirectory(dir: string, currentPath: string = '') {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await uploadDirectory(fullPath, path.join(currentPath, file));
    } else {
      // It's a file
      const relativePath = path.join(currentPath, file).replace(/\\/g, '/');
      const publicId = `${CLOUD_FOLDER}/${relativePath.split('.').slice(0, -1).join('.')}`; // Remove extension
      
      console.log(`Uploading ${relativePath}...`);
      try {
        await cloudinary.uploader.upload(fullPath, {
          public_id: publicId,
          overwrite: true
        });
      } catch (err: any) {
        console.error(`Failed to upload ${relativePath}:`, err.message);
      }
    }
  }
}

async function updateDatabaseUrls() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1/${CLOUD_FOLDER}`;

  console.log('Connecting to MongoDB to update URLs...');
  await mongoose.connect(process.env.MONGO_URI as string);
  
  const projects = await Project.find();
  for (const project of projects) {
    if (project.image && project.image.startsWith('/')) {
      project.image = `${baseUrl}${project.image}`;
      await project.save();
    }
  }

  const skills = await Skill.find();
  for (const skill of skills) {
    if (skill.cert && skill.cert.startsWith('/')) {
      skill.cert = `${baseUrl}${skill.cert}`;
      await skill.save();
    }
  }

  console.log('Database URLs updated successfully!');
}

async function main() {
  console.log('Starting Cloudinary Upload Process...');
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('Missing Cloudinary Credentials in .env');
    process.exit(1);
  }
  
  await uploadDirectory(ASSETS_DIR);
  console.log('Finished uploading assets to Cloudinary!');
  
  await updateDatabaseUrls();
  process.exit(0);
}

main();
