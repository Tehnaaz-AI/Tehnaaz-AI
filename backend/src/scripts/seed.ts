import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Journey from '../models/Journey';

// Load env variables
dotenv.config();

const PROJECTS = [
  {
    title: "Prolearn",
    description: "An AI-powered interview preparation platform with real-time feedback, behavioral analysis, and technical question generation. Built for students preparing for tech interviews.",
    link: "https://prolearn-sepia.vercel.app/",
    image: "/projects/Prolearn.jpg",
    order: 1
  },
  {
    title: "AULoop",
    description: "An exclusive campus marketplace for students to securely trade textbooks, electronics, and lab gear. Features verified users, integrated chat, video reels, and a secure handover OTP system to prevent scams.",
    link: "https://au-loop.vercel.app/",
    image: "/projects/AULoop.jpg",
    order: 2
  },
  {
    title: "Paper-Pulse",
    description: "AI-powered paper trading simulator where users can practice stock trading with virtual money, explore market data and predictions, and track their portfolio.",
    link: "https://paper-pulse-trade.vercel.app/",
    image: "/projects/Paper-Pulse.jpg",
    order: 3
  }
];

const SKILLS = [
  { name: "C Language", certLabel: "C# HackerRank", cert: "/certificates/CSharp_Hackerrank.png", side: "left", order: 1 },
  { name: "Python", certLabel: "HackerRank PBS (Basic)", cert: "/certificates/HackerRank PBS(basic) Certificate.jpeg", side: "right", order: 2 },
  { name: "Java", certLabel: "Java Basics (HackerRank)", cert: "/certificates/Java Basics (Hackerrank).png", side: "left", order: 3 },
  { name: "AI & ML", certLabel: "JP MindLuster", cert: "/certificates/JP MindLuster.jpg", side: "right", order: 4 },
  { name: "DL", certLabel: "HCL GUVI Certification", cert: "/certificates/HCL GUVI Certification.png", side: "left", order: 5 },
  { name: "MERN Stack", certLabel: "Internship Completion", cert: "/certificates/Internship Completion_page-0001.jpg", side: "right", order: 6 },
  { name: "Web Development", certLabel: "PFSD Project", cert: "/certificates/PFSD Project Certificate_page-0001.jpg", side: "left", order: 7 },
  { name: "DSA Basics", certLabel: "NPTEL DSA Certificate", cert: "/certificates/NPTEL DSA Certificate.jpeg", side: "right", order: 8 },
  { name: "Data Analysis", certLabel: "IBM DAB Certificate", cert: "/certificates/IBM DAB Certificate.png", side: "left", order: 9 },
  { name: "Gen AI", certLabel: "Prompt Eng Certificate", cert: "/certificates/Prompt Eng Certificate.jpeg", side: "right", order: 10 }
];

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Clear existing data
    await Project.deleteMany();
    await Skill.deleteMany();
    console.log("Cleared existing Projects and Skills...");

    // Insert new data
    await Project.insertMany(PROJECTS);
    await Skill.insertMany(SKILLS);
    console.log("Projects and Skills seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
