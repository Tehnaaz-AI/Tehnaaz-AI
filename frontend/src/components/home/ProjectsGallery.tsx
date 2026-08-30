import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    title: 'Paper-Pulse',
    subtitle: 'AI Paper Trading Simulator',
    description: 'Practice stock trading using virtual money, explore historical stock analysis, AI-based predictions, financial explanations and portfolio tracking.',
    tags: ['Frontend Engineering', 'UI/UX', 'Deployment', 'Backend'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    link: 'https://github.com/Tehnaaz-AI/Paper-Pulse'
  },
  {
    id: 2,
    title: 'ProLearn',
    subtitle: 'MERN e-learning platform',
    description: 'Course management, authentication, quizzes, certificates, leaderboards, and payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    link: '#'
  },
  {
    id: 3,
    title: 'Hate Speech Detection',
    subtitle: 'NLP text classification',
    description: 'Natural Language Processing model to classify and detect hate speech in text data.',
    tags: ['Python', 'NLP', 'Scikit-learn', 'Pandas'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
    link: '#'
  },
  {
    id: 4,
    title: 'Waste Classification',
    subtitle: 'Computer Vision',
    description: 'Image-based deep learning project for automatic waste categorization and sorting.',
    tags: ['Deep Learning', 'Computer Vision', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
    link: '#'
  }
];

export function ProjectsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Map scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-white text-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10 pointer-events-none">
          <p className="font-organic-mono text-sm tracking-widest text-black/60 uppercase mb-2">
            Selected Works
          </p>
          <h2 className="text-4xl md:text-6xl font-organic-sans font-black tracking-tighter">
            PROJECTS
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-24 px-[10vw] pt-32 items-center h-full w-max">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              className="w-[85vw] md:w-[60vw] lg:w-[50vw] flex flex-col shrink-0 group border border-black bg-white p-6 md:p-8"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden mb-8 border border-black/10">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-organic-dark/20 mix-blend-overlay pointer-events-none"></div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex-1">
                  <span className="font-organic-mono text-xs font-bold tracking-widest text-black/60 uppercase inline-block mb-2">
                    0{index + 1} // {project.subtitle}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-organic-sans font-black tracking-tighter uppercase mb-4 leading-none text-black">
                    {project.title}
                  </h3>
                  <p className="font-organic-mono text-base text-black/70 max-w-md">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-6 md:w-1/3 shrink-0">
                  <ul className="flex flex-col gap-2 font-organic-mono text-sm text-black/60 text-left md:text-right w-full">
                    {project.tags.map(tag => (
                      <li key={tag} className="flex items-center gap-2 justify-start md:justify-end">
                        <span className="md:hidden w-1 h-1 rounded-full bg-black"></span>
                        {tag} 
                        <span className="hidden md:inline-block w-1 h-1 rounded-full bg-black"></span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-organic-mono text-sm tracking-widest text-black hover:text-white hover:bg-black transition-colors px-6 py-3 border border-black uppercase font-bold w-full text-center"
                  >
                    EXPLORE PROJECT ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
