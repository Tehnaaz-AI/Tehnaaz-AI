import { PageTransition } from '../components/layout/PageTransition';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ENV } from '../config/env';
import { ScrollSequence } from '../components/home/ScrollSequence';

const INTERESTS = [
  { name: "C Language", certLabel: "C# HackerRank", cert: "/certificates/CSharp_Hackerrank.png", side: "left" },
  { name: "Python", certLabel: "HackerRank PBS (Basic)", cert: "/certificates/HackerRank PBS(basic) Certificate.jpeg", side: "right" },
  { name: "Java", certLabel: "Java Basics (HackerRank)", cert: "/certificates/Java Basics (Hackerrank).png", side: "left" },
  { name: "AI & ML", certLabel: "JP MindLuster", cert: "/certificates/JP MindLuster.jpg", side: "right" },
  { name: "DL", certLabel: "HCL GUVI Certification", cert: "/certificates/HCL GUVI Certification.png", side: "left" },
  { name: "MERN Stack", certLabel: "Internship Completion", cert: "/certificates/Internship Completion_page-0001.jpg", side: "right" },
  { name: "Web Development", certLabel: "PFSD Project", cert: "/certificates/PFSD Project Certificate_page-0001.jpg", side: "left" },
  { name: "DSA Basics", certLabel: "NPTEL DSA Certificate", cert: "/certificates/NPTEL DSA Certificate.jpeg", side: "right" },
  { name: "Data Analysis", certLabel: "IBM DAB Certificate", cert: "/certificates/IBM DAB Certificate.png", side: "left" },
  { name: "Gen AI", certLabel: "Prompt Eng Certificate", cert: "/certificates/Prompt Eng Certificate.jpeg", side: "right" }
];

function SkillItem({
  interest,
  index,
  scrollYProgress,
  onSelect
}: {
  interest: { name: string, certLabel: string, cert: string, side: string };
  index: number;
  scrollYProgress: MotionValue<number>;
  onSelect: () => void;
}) {
  const totalItems = INTERESTS.length;
  // Center point for this item (0 to 1)
  const center = index / (totalItems - 1);

  // Compute distance from center (-1 to 1 basically)
  const diff = useTransform(scrollYProgress, (v) => v - center);
  const window = 0.15;

  // 3D Cover Flow Transforms calculated safely via callbacks
  const y = useTransform(diff, (d) => {
    if (d < -window) return 250;
    if (d > window) return -250;
    return (d / window) * -250;
  });

  const rotateX = useTransform(diff, (d) => {
    if (d < -window) return -60;
    if (d > window) return 60;
    return (d / window) * 60;
  });

  const scale = useTransform(diff, (d) => {
    if (d < -window) return 0.6;
    if (d > window) return 0.6;
    // 1.15 at center (d=0), drops to 0.6 at d=window
    return 1.15 - (Math.abs(d) / window) * 0.55;
  });

  const opacity = useTransform(diff, (d) => {
    const opWindow = 0.1;
    if (d < -opWindow) return 0;
    if (d > opWindow) return 0;
    return 1 - (Math.abs(d) / opWindow);
  });

  const z = useTransform(diff, (d) => {
    if (d < -window) return -300;
    if (d > window) return -300;
    return - (Math.abs(d) / window) * 300;
  });

  // Certificate Animation Transforms (Vertical scroll only, no fading)
  const certOpacity = useTransform(diff, (d) => {
    // Jump instantly to 1 when near center, 0 otherwise (no fading)
    return Math.abs(d) < 0.05 ? 1 : 0;
  });

  const certPointerEvents = useTransform(diff, (d) => {
    // Only allow clicking when the certificate is visible
    return Math.abs(d) < 0.05 ? "auto" : "none";
  });

  const certY = useTransform(diff, (d) => {
    // Subtle parallax vertical scrolling
    return d * 500;
  });

  return (
    <>
      {/* 3D Skill Text */}
      <motion.div
        className="absolute w-full flex justify-center items-center pointer-events-none z-30"
        style={{
          y,
          rotateX,
          scale,
          opacity,
          z,
        }}
      >
        <div className="font-organic-mono font-bold uppercase tracking-widest text-xs sm:text-base md:text-xl text-black bg-white px-5 py-2.5 sm:px-8 sm:py-4 border border-black/20 rounded-full shadow-xl whitespace-nowrap text-center pointer-events-auto hover:bg-black hover:text-white transition-colors duration-300">
          {interest.name}
        </div>
      </motion.div>

      {/* Independent Certificate Image (Vertical scroll only, no fading) */}
      <motion.div
        className={`absolute top-[58%] md:top-1/2 -translate-y-1/2 w-52 sm:w-64 md:w-80 rounded-md shadow-2xl overflow-hidden border-2 sm:border-4 border-white backdrop-blur-sm z-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 ${
          interest.side === 'left' 
            ? 'md:right-[62%] lg:right-[65%]' 
            : 'md:left-[62%] lg:left-[65%]'
        }`}
        style={{
          opacity: certOpacity,
          y: certY,
          pointerEvents: certPointerEvents as any,
        }}
      >
        <div
          className="relative group overflow-hidden rounded-md border-2 sm:border-4 border-white cursor-pointer"
          onClick={onSelect}
        >
          <img
            src={interest.cert}
            alt={interest.certLabel}
            className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm text-white text-center py-1 sm:py-2 px-1 sm:px-2 font-organic-mono text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {interest.certLabel}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function Skills() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<{ name: string, certLabel: string, cert: string } | null>(null);
  const [skills, setSkills] = useState<any[]>(INTERESTS);

  useEffect(() => {
    fetch(`${ENV.API_URL}/api/skills`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setSkills(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch skills', err));
  }, []);

  // Track vertical scroll progress relative to the 3D scroll container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <PageTransition>
      <div className="relative w-full bg-white selection:bg-black selection:text-white">

        {/* Background Arc Reactor animation */}
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          <ScrollSequence isBackgroundMode={true} />
        </div>

        {/* Hero Header Section */}
        <div className="relative z-10 w-full min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center px-6 bg-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)]">
          <div className="mb-6 md:mb-8 text-black font-black bg-black/5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-black/10 shadow-sm text-xs sm:text-sm md:text-base uppercase tracking-widest">
            Technical Arsenal
          </div>
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tighter uppercase text-black text-center">
            Skills
          </h1>
          <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-black mt-4 sm:mt-6 mb-8 sm:mb-12"></div>
          <p className="font-organic-mono text-black/60 text-xs sm:text-sm md:text-base max-w-xl text-center flex flex-col items-center gap-4">
            <span>Scroll down to explore my expertise.</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 sm:h-12 bg-black/40 mt-2 sm:mt-4"
            />
          </p>
        </div>

        {/* Dynamic Container for the 3D scroll animation */}
        <div ref={container} className="relative w-full h-[600vh] md:h-[1200vh] bg-transparent">

          {/* Sticky wrapper */}
          <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden z-10 pointer-events-none" style={{ perspective: "1000px" }}>

            {/* 3D Container */}
            <div className="relative flex items-center justify-center w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {skills.map((interest, index) => (
                <SkillItem
                  key={interest.name}
                  interest={interest}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  onSelect={() => setSelectedCert(interest)}
                />
              ))}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-black/40 font-organic-mono text-xs uppercase tracking-widest flex flex-col items-center gap-2 pointer-events-none">
              <span>Scroll to explore</span>
              <div className="w-px h-8 bg-black/20"></div>
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 z-10 bg-black text-white w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-black/80 transition-colors"
                >
                  ×
                </button>

                <div className="w-full max-h-[70vh] bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={selectedCert.cert}
                    alt={selectedCert.certLabel}
                    className="max-w-full max-h-[60vh] object-contain border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div className="w-full bg-white p-6 md:p-8 border-t-4 border-black text-center">
                  <h3 className="font-organic-sans text-3xl md:text-5xl font-black tracking-tighter uppercase text-black leading-none mb-2">
                    {selectedCert.certLabel}
                  </h3>
                  <span className="inline-block bg-black text-white px-3 py-1 font-organic-mono text-xs md:text-sm font-bold tracking-widest uppercase">
                    {selectedCert.name}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </PageTransition>
  );
}
