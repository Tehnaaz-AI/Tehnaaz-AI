export interface TimelineEvent {
  year: string;
  title: string;
  organization: string;
  description?: string[];
  type: 'education' | 'experience' | 'leadership' | 'hackathon' | 'certification';
}

export const experienceTimeline: TimelineEvent[] = [
  {
    year: "2024",
    title: "Started B.Tech — Artificial Intelligence",
    organization: "Anurag University",
    type: "education"
  },
  {
    year: "2025",
    title: "Technical Club Involvement",
    organization: "Anurag University",
    description: [
      "Participated in various technical club activities and projects."
    ],
    type: "leadership"
  },
  {
    year: "[ADD VERIFIED DATE]",
    title: "AI Intern",
    organization: "Smarted Innovations",
    description: [
      "[ADD VERIFIED RESPONSIBILITY]",
      "[ADD VERIFIED RESPONSIBILITY]"
    ],
    type: "experience"
  },
  {
    year: "[ADD VERIFIED DATE]",
    title: "Campus Mantri",
    organization: "GeeksforGeeks",
    description: [
      "Represented GeeksforGeeks at Anurag University.",
      "[ADD VERIFIED RESPONSIBILITY]"
    ],
    type: "leadership"
  },
  {
    year: "[ADD VERIFIED DATE]",
    title: "Hackathon / Certification Placeholder",
    organization: "[ADD ORGANIZATION]",
    description: [
      "[ADD VERIFIED DETAIL]"
    ],
    type: "hackathon"
  }
];
