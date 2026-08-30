import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function CuriousScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const concepts = ["CURIOUS", "LEARN", "EXPLORE", "EXPERIMENT", "BUILD", "ITERATE"];

  // Map scroll progress to horizontal movement of the concepts
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-organic-bg">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        <motion.div style={{ opacity }} className="absolute top-24 left-12 md:left-24 z-10 max-w-sm">
          <p className="font-organic-sans text-xl md:text-2xl text-organic-dark leading-relaxed">
            I'm a B.Tech Artificial Intelligence student exploring how intelligent systems, software and emerging technologies can become things people actually use.
          </p>
        </motion.div>

        <motion.div 
          className="flex items-center gap-32 px-[10vw] pt-[15vh] w-max"
          style={{ x, opacity }}
        >
          {concepts.map((concept, idx) => (
            <h2 
              key={concept} 
              className={`text-[12vw] md:text-[15vw] font-organic-sans font-black tracking-tighter uppercase shrink-0 
                ${idx === 0 ? 'text-organic-dark' : 'text-transparent'}
              `}
              style={idx !== 0 ? { WebkitTextStroke: '2px #111111' } : {}}
            >
              {concept}
            </h2>
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
        
      </div>
    </section>
  );
}
