import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ImageStack } from './ImageStack';

export function PaperPulseScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  const placeholderImages = [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  ];

  return (
    <section ref={containerRef} className="relative w-full min-h-[200vh] py-24">
      
      {/* Sticky Container for the scene */}
      <div className="sticky top-0 h-screen w-full flex flex-col pt-24 px-6 md:px-12 lg:px-24">
        
        {/* Header / Title */}
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="mb-12 max-w-4xl self-center text-center">
          <p className="font-organic-mono text-xs tracking-widest text-organic-muted mb-4 uppercase">
            Featured Project — 01
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-organic-sans font-black text-organic-text mb-4">
            PAPER-PULSE
          </h2>
          <p className="font-organic-sans text-xl md:text-2xl text-organic-muted">
            AI PAPER TRADING SIMULATOR
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-24">
          
          {/* Data Viz Area (Left) */}
          <div className="flex flex-col justify-center relative h-full">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-md animate-spin-slow">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#000000" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#000000" strokeWidth="1" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="#000000" strokeWidth="0.5" strokeDasharray="2 4" />
              </svg>
            </div>
            
            <motion.div 
              className="relative z-10 max-w-sm"
              style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
            >
              <h3 className="font-organic-sans text-xl font-bold mb-6 text-organic-text">MY CONTRIBUTION</h3>
              <ul className="space-y-4 font-organic-mono text-sm text-organic-muted">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-organic-accent"></span>
                  Frontend Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-organic-accent"></span>
                  UI / UX
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-organic-accent"></span>
                  Deployment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-organic-accent"></span>
                  Backend
                </li>
              </ul>
              
              <a 
                href="https://github.com/Tehnaaz-AI/Paper-Pulse" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-12 font-organic-mono text-sm tracking-widest text-organic-text hover:text-organic-accent transition-colors pb-1 border-b border-organic-text hover:border-organic-accent"
              >
                EXPLORE PROJECT ↗
              </a>
            </motion.div>
          </div>

          {/* Image Stack Area (Right) */}
          <div className="flex items-center justify-center h-full">
            <ImageStack images={placeholderImages} scrollYProgress={scrollYProgress} />
          </div>

        </div>

      </div>
    </section>
  );
}
