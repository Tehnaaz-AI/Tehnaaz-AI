import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ENV } from '../config/env';
import { PageTransition } from '../components/layout/PageTransition';

const MAJOR_PROJECTS = [
  {
    title: "ProLearn",
    description: "Full-stack MERN e-learning platform with authentication, course management, quizzes, certificates, leaderboards and payment integration.",
    link: "https://prolearn-sepia.vercel.app/",
    image: "/projects/Prolearn.jpg"
  },
  {
    title: "AULoop",
    description: "An exclusive campus marketplace for students to securely trade textbooks, electronics, and lab gear. Features verified users, integrated chat, video reels, and a secure handover OTP system to prevent scams.",
    link: "https://au-loop.vercel.app/",
    image: "/projects/AULoop.jpg"
  },
  {
    title: "Paper-Pulse",
    description: "AI-powered paper trading simulator where users can practice stock trading with virtual money, explore market data and predictions, and track their portfolio.",
    link: "https://paper-pulse-trade.vercel.app/",
    image: "/projects/Paper-Pulse.jpg"
  }
];

const OTHER_PROJECTS = [
  {
    title: "NLP Hate Speech Detection",
    description: "NLP-based machine learning project for classifying text and identifying potentially hateful or offensive content.",
    link: null,
    github: ENV.GITHUB_URL
  },
  {
    title: "Smart Waste AI",
    description: "Computer-vision/deep-learning project that classifies waste from images to support automated waste categorization.",
    link: null,
    github: ENV.GITHUB_URL
  },
  {
    title: "CogniLearn",
    description: "An advanced education and learning-focused platform demonstrating interactive UI and secure data handling.",
    link: null,
    github: ENV.GITHUB_URL
  },
  {
    title: "SevaAI",
    description: "AI-powered smart government-service kiosk concept designed around multilingual assistance, document scanning and citizen-service support.",
    link: null,
    github: ENV.GITHUB_URL
  },
  {
    title: "Quick Sketch",
    description: "A lightweight, highly responsive sketch and drawing-focused web application.",
    link: null,
    github: ENV.GITHUB_URL
  },
  {
    title: "Random Quote Generator",
    description: "Simple web application that dynamically generates random quotes through an interactive and fluid interface.",
    link: null,
    github: ENV.GITHUB_URL
  }
];

function StickyProjectCardContent({ project, index, setSelectedImage }: any) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full justify-between">
      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-between order-2 md:order-1">
        <div>
          <div className="flex justify-between items-start mb-2 md:mb-4">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black leading-tight">
              {project.title}
            </h2>
            <span className="text-xl sm:text-3xl md:text-5xl font-black text-black/10 shrink-0 ml-2">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <p className="text-xs sm:text-sm lg:text-base font-organic-mono leading-relaxed text-black/80 mt-1 md:mt-4 max-w-2xl line-clamp-3 sm:line-clamp-4">
            {project.description}
          </p>
        </div>

        <div className="flex justify-start mt-3 md:mt-0">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 border-2 md:border-4 border-black bg-black text-white px-4 py-2 md:px-6 md:py-3 font-mono font-bold text-xs sm:text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-black hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all duration-300"
            >
              <span>View Project</span>
              <span className="text-sm md:text-xl">↗</span>
            </a>
          ) : (
            <div className="inline-block border-2 md:border-4 border-black/20 text-black/40 px-4 py-2 md:px-6 md:py-3 font-mono font-bold text-xs sm:text-sm md:text-base uppercase tracking-widest cursor-not-allowed">
              Offline / Internal
            </div>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div
        className="flex-1 relative order-1 md:order-2 h-28 sm:h-40 md:h-full border-2 md:border-4 border-black overflow-hidden group bg-[#f4f4f4] flex items-center justify-center p-2 sm:p-4 cursor-zoom-in shrink-0"
        onClick={() => project.image && setSelectedImage(project.image)}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
          />
        )}
      </div>
    </div>
  );
}

function OtherProjectsAccordion() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-32">
      <div className="mb-8 md:mb-12 text-center md:text-left">
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter border-b-4 border-black pb-3 inline-block">
          Other Projects
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OTHER_PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative min-h-[220px] md:min-h-[240px] border-4 border-black bg-white flex flex-col justify-between p-5 md:p-6 shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="font-organic-mono text-[10px] md:text-xs font-bold tracking-widest text-black/40 uppercase">
                  Project 0{i + 4}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-black line-clamp-2 mb-2">
                {project.title}
              </h4>
              <p className="text-xs sm:text-sm font-organic-mono leading-relaxed text-black/75 line-clamp-4">
                {project.description}
              </p>
            </div>

            <div className="pt-4 mt-auto border-t border-black/10 flex items-center justify-between">
              {/* @ts-ignore */}
              {(project.link || project.github) ? (
                <a
                  href={project.link || project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-organic-mono text-xs font-bold tracking-widest border-b-2 border-black pb-0.5 hover:text-black/50 hover:border-black/50 transition-colors uppercase inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>{project.link ? 'View Project' : 'View Code (GitHub)'}</span>
                  <span>↗</span>
                </a>
              ) : (
                <span className="font-organic-mono text-[11px] font-bold text-black/40 uppercase">
                  Internal / Research
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const container = useRef(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [majorProjects, setMajorProjects] = useState<any[]>(MAJOR_PROJECTS);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    fetch(`${ENV.API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setMajorProjects(data.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch projects', err);
      });
  }, []);

  return (
    <PageTransition>
      <div className="w-full bg-[#f4f4f4] min-h-screen text-black selection:bg-black selection:text-white">

        {/* Modal Portal */}
        {createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
                onClick={() => setSelectedImage(null)}
              >
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedImage}
                  alt="Enlarged project"
                  className="max-w-[95vw] max-h-[95vh] object-contain border-4 border-white"
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Major Projects Stacking Container */}
        <div ref={container} className="relative h-[300vh]">
          {/* Sticky Wrapper */}
          <div className="sticky top-0 h-screen w-full flex flex-col pt-24 md:pt-28 overflow-hidden">

            {/* Header Group */}
            <div className="w-full flex flex-col items-center gap-4 mb-4 z-20 shrink-0">
              <a
                href="https://github.com/Tehnaaz-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto bg-black text-white px-6 py-2 rounded-full font-mono font-bold text-xs md:text-sm shadow-xl flex items-center gap-2 hover:bg-white hover:text-black border-2 border-black transition-all duration-300"
              >
                <span>View All Projects on GitHub</span>
                <span>↗</span>
              </a>

              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block text-black bg-[#f4f4f4] px-4 py-2 rounded-t-lg">
                Major Projects
              </h3>
            </div>

            {/* Cards Area */}
            <div className="relative w-full flex-1 flex justify-center px-4 mt-0 md:-mt-2">
              {majorProjects.map((project, i) => {
                const N = MAJOR_PROJECTS.length;

                // y mapping: Card 0 is always at 0. Card 1 slides up from 0 to 0.5. Card 2 from 0.5 to 1.
                const startProgress = i === 0 ? 0 : (i - 1) / (N - 1);
                const endProgress = i === 0 ? 0 : i / (N - 1);
                const y = useTransform(
                  scrollYProgress,
                  [0, Math.max(0, startProgress), endProgress, 1],
                  [i === 0 ? '0vh' : '100vh', i === 0 ? '0vh' : '100vh', '0vh', '0vh']
                );

                // scale mapping: Shrinks when subsequent cards arrive
                const targetScale = 1 - ((N - 1 - i) * 0.05);
                const shrinkStart = Math.min(1, i / (N - 1));
                const scale = useTransform(
                  scrollYProgress,
                  [shrinkStart, 1],
                  [1, targetScale]
                );

                return (
                  <motion.div
                    key={project.title}
                    style={{
                      y,
                      scale,
                      top: `${i * 10}px`,
                      zIndex: 10 + i
                    }}
                    className="absolute w-full max-w-5xl h-[58vh] sm:h-[52vh] md:h-[46vh] bg-white border-2 md:border-4 border-black p-4 sm:p-6 md:p-8 shadow-[6px_6px_0_0_#000] md:shadow-[12px_12px_0_0_#000] flex flex-col justify-between transform-gpu"
                  >
                    <StickyProjectCardContent project={project} index={i} setSelectedImage={setSelectedImage} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Other Projects Section */}
        <OtherProjectsAccordion />

      </div>
    </PageTransition>
  );
}
