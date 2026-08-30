import { Request, Response } from 'express';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Journey from '../models/Journey';

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

export const handleContact = (req: Request, res: Response) => {
  console.log('Contact form received:', req.body);
  res.status(200).json({ success: true, message: 'Message received successfully!' });
};
