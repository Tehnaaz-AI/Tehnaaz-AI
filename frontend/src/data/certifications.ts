export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    title: "Data Analytics & Business Intelligence",
    issuer: "IBM SkillsBuild",
  },
  {
    title: "Problem Solving in C",
    issuer: "HackerRank",
  },
  {
    title: "Data Structures and Algorithms",
    issuer: "NPTEL",
  },
  {
    title: "Data Structures and Algorithms",
    issuer: "Infosys Springboard",
  },
  {
    title: "Pragati: Path to Future",
    issuer: "Infosys Springboard",
  },
  {
    title: "Prompt Engineering",
    issuer: "Simplilearn",
  }
];
