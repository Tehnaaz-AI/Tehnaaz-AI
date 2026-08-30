import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OrbitSystem } from './OrbitSystem';

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] flex flex-col items-center justify-start pt-[30vh] overflow-hidden bg-organic-bg">
      <OrbitSystem />
      
      <motion.div 
        className="z-10 text-center flex flex-col items-center justify-center p-8 pointer-events-none"
        style={{ y, scale, opacity }}
      >
        <h1 className="text-[12vw] md:text-[14vw] font-organic-sans font-black tracking-tighter text-organic-dark leading-[0.8] mb-8">
          TEHNAAZ <br/>
          FATHIMA
        </h1>
        
        <div className="flex flex-col items-center space-y-2 mt-4">
          <p className="font-organic-sans text-xl md:text-3xl font-medium tracking-tight text-organic-dark">
            CURIOUS BY NATURE.
          </p>
          <p className="font-organic-sans text-xl md:text-3xl font-medium tracking-tight text-organic-dark">
            BUILDING BY CHOICE.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
