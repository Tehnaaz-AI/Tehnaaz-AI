export interface SkillCategory {
  title: string;
  skills: { name: string; projects?: string[] }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI and Machine Learning",
    skills: [
      { name: "Machine Learning Fundamentals", projects: ["NLP Hate Speech Detection", "Image-Based Waste Classification"] },
      { name: "NLP Applications", projects: ["NLP Hate Speech Detection"] },
      { name: "Scikit-learn", projects: ["NLP Hate Speech Detection"] }
    ]
  },
  {
    title: "Python and Data Science",
    skills: [
      { name: "Python", projects: ["NLP Hate Speech Detection", "Image-Based Waste Classification"] },
      { name: "Pandas" },
      { name: "NumPy" }
    ]
  },
  {
    title: "Frontend and Product Engineering",
    skills: [
      { name: "React", projects: ["Paper Pulse", "ProLearn"] },
      { name: "JavaScript", projects: ["Paper Pulse", "ProLearn"] },
      { name: "HTML/CSS" },
      { name: "Framer Motion", projects: ["Paper Pulse"] }
    ]
  },
  {
    title: "Backend and APIs",
    skills: [
      { name: "Node.js", projects: ["Paper Pulse", "ProLearn"] },
      { name: "Express", projects: ["Paper Pulse", "ProLearn"] },
      { name: "MongoDB", projects: ["Paper Pulse", "ProLearn"] },
      { name: "SQL" }
    ]
  },
  {
    title: "Data Visualization",
    skills: [
      { name: "Recharts", projects: ["Paper Pulse"] },
      { name: "Matplotlib" }
    ]
  },
  {
    title: "Tools and Collaboration",
    skills: [
      { name: "Git & GitHub" },
      { name: "VS Code" },
      { name: "Jupyter Notebook" }
    ]
  }
];
