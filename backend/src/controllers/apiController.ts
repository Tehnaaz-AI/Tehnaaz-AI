import { Request, Response } from 'express';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Journey from '../models/Journey';

import Message from '../models/Message';
import nodemailer from 'nodemailer';

export const getHealthStatus = (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Neural API online, Systems nominal.' });
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json({ message: 'Projects endpoint', data: projects });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getExperience = async (req: Request, res: Response) => {
  try {
    const journey = await Journey.find().sort({ order: 1 });
    res.json({ message: 'Experience endpoint', data: journey });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json({ message: 'Skills endpoint', data: skills });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getExperiments = (req: Request, res: Response) => {
  res.json({ message: 'Experiments endpoint', data: [] });
};

export const handleContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // 1. Save to Database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    console.log('New message saved:', newMessage._id);

    // 2. Send Email Notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const recipientEmail = process.env.EMAIL_TO || process.env.EMAIL_USER || '24eg106c63@anurag.edu.in';
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: `New Portfolio Message from ${name}`,
        text: `You have received a new message from your portfolio website!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully!');
    } else {
      console.log('Email notification skipped: EMAIL_USER or EMAIL_PASS not configured in .env');
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err: any) {
    console.error('Error handling message:', err);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
};
