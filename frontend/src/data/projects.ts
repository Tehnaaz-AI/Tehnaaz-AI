export interface Project {
  id: string;
  title: string;
  oneLineProblem: string;
  description: string;
  contribution: string[];
  techStack: string[];
  challenges: string;
  lessons: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "paper-pulse",
    title: "AI Paper Trading Simulator",
    oneLineProblem: "Trading safely requires realistic market emulation and insights.",
    description: "An educational AI paper-trading simulator that lets users explore stock analysis and simulated trading with virtual money.",
    contribution: [
      "Frontend development and deployment",
      "[ADD EXACT CONTRIBUTION DETAILS]"
    ],
    techStack: ["React", "JavaScript", "Framer Motion", "Recharts", "Node.js", "Express", "MongoDB"],
    challenges: "[ADD TECHNICAL CHALLENGES]",
    lessons: "[ADD WHAT I LEARNED]",
    githubUrl: "https://github.com/Tehnaaz-AI/Paper-Pulse",
    liveUrl: "[Deployment link to be updated]",
    imageUrl: "/assets/project-paper-pulse.png", // [ADD PROJECT SCREENSHOT]
    featured: true
  },
  {
    id: "prolearn",
    title: "ProLearn",
    oneLineProblem: "E-learning platforms often lack engaging, integrated assessment features.",
    description: "A MERN-based e-learning platform featuring course management, authentication, quizzes, certificates, leaderboards, and payment integration.",
    contribution: [
      "Frontend development and responsive design.",
      "Backend feature enhancements and API integration.",
      "UI optimization, debugging, and performance improvements."
    ],
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    challenges: "[ADD TECHNICAL CHALLENGES]",
    lessons: "[ADD WHAT I LEARNED]",
    githubUrl: "[ADD GITHUB URL]",
    liveUrl: "[ADD LIVE URL]",
    featured: true
  },
  {
    id: "hate-speech-nlp",
    title: "NLP Hate Speech Detection",
    oneLineProblem: "Identifying toxic content requires contextual language understanding.",
    description: "An NLP-based project designed to detect and classify hate speech in text data.",
    contribution: [
      "Data preprocessing and model evaluation.",
      "Implemented detection algorithms using Python and NLP libraries."
    ],
    techStack: ["Python", "NLP", "Scikit-learn", "Pandas"],
    challenges: "[ADD TECHNICAL CHALLENGES]",
    lessons: "[ADD WHAT I LEARNED]",
    githubUrl: "[ADD GITHUB URL]",
    featured: false
  },
  {
    id: "waste-classification",
    title: "Image-Based Waste Classification",
    oneLineProblem: "Automated sorting of waste using computer vision.",
    description: "A machine learning project that classifies images of waste into categories to assist in recycling processes.",
    contribution: [
      "Model training and dataset augmentation.",
      "Evaluated model performance and accuracy."
    ],
    techStack: ["Python", "Computer Vision", "Deep Learning"],
    challenges: "[ADD TECHNICAL CHALLENGES]",
    lessons: "[ADD WHAT I LEARNED]",
    githubUrl: "[ADD GITHUB URL]",
    featured: false
  }
];
