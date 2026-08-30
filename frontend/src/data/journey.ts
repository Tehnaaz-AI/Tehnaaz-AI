import { ENV } from '../config/env';
export type JourneyPhoto = {
  id: string;
  title: string;
  role?: string;
  description?: string;
  image: string;
};

export type JourneyYear = {
  id: string;
  year: string;
  phase: string;
  description: string;
  photos: JourneyPhoto[];
};

export const JOURNEY_DATA: JourneyYear[] = [
  {
    id: "y1",
    year: "YEAR 01",
    phase: "EXPLORING & PARTICIPATING",
    description: "The first year was dedicated to discovering technology, attending various college events, and actively participating in my first coding contests to build a strong technical foundation.",
    photos: [
      {
        id: "y1-1",
        title: "INAE Event",
        role: "Participant",
        image: `${ENV.CLOUDINARY_URL}/events/1styear/INAE.jpeg`
      },
      {
        id: "y1-2",
        title: "Hackathon Participation",
        role: "Participant",
        image: `${ENV.CLOUDINARY_URL}/events/1styear/hackathonparticipation.jpeg`
      },
      {
        id: "y1-3",
        title: "Organizing Team",
        role: "Organizer",
        image: `${ENV.CLOUDINARY_URL}/events/1styear/organizing.jpeg`
      },
      {
        id: "y1-4",
        title: "Organizing Events",
        role: "Organizer",
        image: `${ENV.CLOUDINARY_URL}/events/1styear/organizing (2).jpeg`
      },
      {
        id: "y1-5",
        title: "Project Reviews",
        role: "Participant",
        image: `${ENV.CLOUDINARY_URL}/events/1styear/reviews.jpeg`
      },
      {
        id: "y1-6",
        title: "Interacting",
        role: "Participant",
        image: `${ENV.CLOUDINARY_URL}/events/1styear/taking reviews and interacting.jpeg`
      },
      {
        id: "y1-7",
        title: "Networking",
        role: "Participant",
        image: `${ENV.CLOUDINARY_URL}/events/1styear/WhatsApp Image 2026-08-30 at 12.15.31 PM.jpeg`
      }
    ]
  },
  {
    id: "y2",
    year: "YEAR 02",
    phase: "CONDUCTING & ORGANIZING",
    description: "I transitioned from an attendee to an active contributor—coordinating hackathons, anchoring technical seminars, and executing core responsibilities as part of multiple club organizing teams.",
    photos: [
      {
        id: "y2-1",
        title: "AI Day",
        role: "Organizer",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/AI-Day.jpeg`
      },
      {
        id: "y2-2",
        title: "HOD Addressing (Coding Cubs)",
        role: "Coordinator",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/HOD adrressing (Coding cunbs).jpeg`
      },
      {
        id: "y2-3",
        title: "HOD Addressing (AsquareI)",
        role: "Coordinator",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/HODaddressing hackathon(AsquareI).jpeg`
      },
      {
        id: "y2-4",
        title: "IIT Hyderabad Visit",
        role: "Visitor",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/IIT.jpeg`
      },
      {
        id: "y2-5",
        title: "IIT Visit Sessions",
        role: "Visitor",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/IIT-1.jpeg`
      },
      {
        id: "y2-6",
        title: "Technical Seminars",
        role: "Anchor",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/Seminar (2).jpeg`
      },
      {
        id: "y2-7",
        title: "Anchoring Events",
        role: "Anchor",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/anchoring.jpeg`
      },
      {
        id: "y2-8",
        title: "Coding Events Organising",
        role: "Organizer",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/codingevents organising.jpeg`
      },
      {
        id: "y2-9",
        title: "Group Activities",
        role: "Organizer",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/conducting activities (2).jpeg`
      },
      {
        id: "y2-10",
        title: "Conducting Hackathon",
        role: "Coordinator",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/conducting hackathon.jpeg`
      },
      {
        id: "y2-11",
        title: "DevWars by Coding Cubs",
        role: "Organizer",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/devwars by coding cubs.jpeg`
      },
      {
        id: "y2-12",
        title: "Neural Nexus Launch",
        role: "Design Team",
        image: `${ENV.CLOUDINARY_URL}/events/2ndyear/neuralnexusLaunch.jpeg`
      }
    ]
  },
  {
    id: "y3",
    year: "YEAR 03",
    phase: "LEADING & SERVING",
    description: "Stepping into core leadership as President of AUDAO. My focus shifted to guiding the club, managing orientations, and fostering deep, meaningful interactions with new students and parents.",
    photos: [
      {
        id: "y3-1",
        title: "AUDAO Team",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/AUDAO Team.jpeg`
      },
      {
        id: "y3-2",
        title: "Faculty and team AUDAO",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/AUDAOTeam.jpeg`
      },
      {
        id: "y3-3",
        title: "HOD AI Addressing",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/HOD-AI addresiing first years.jpg`
      },
      {
        id: "y3-4",
        title: "Induction Day 1",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/Induction (1).jpg`
      },
      {
        id: "y3-5",
        title: "Interacting with first years",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/Interacting with first years.jpg`
      },
      {
        id: "y3-6",
        title: "Orientation",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/Orientation.jpeg`
      },
      {
        id: "y3-7",
        title: "Managing Stalls",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/stalls.jpeg`
      },
      {
        id: "y3-8",
        title: "Student Interactions",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/studentinteractions (1).jpg`
      },
      {
        id: "y3-9",
        title: "Engagement",
        role: "President",
        image: `${ENV.CLOUDINARY_URL}/events/3rd year/studentinteractions (2).jpg`
      }
    ]
  }
];
