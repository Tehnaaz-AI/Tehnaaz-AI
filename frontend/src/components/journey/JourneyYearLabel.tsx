import { motion, AnimatePresence } from 'framer-motion';

export function JourneyYearLabel({ year, phase }: { year: string, phase: string }) {
  return (
    <div className="sticky top-24 md:top-32 z-40 w-full flex justify-center md:justify-start md:pl-24 mb-16 pointer-events-none">
      <div className="bg-white/95 backdrop-blur-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-4 inline-flex flex-col items-center md:items-start pointer-events-auto overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span 
            key={year}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="font-organic-mono font-bold tracking-widest text-black/50 text-sm md:text-base uppercase block"
          >
            {year}
          </motion.span>
        </AnimatePresence>
        
        <AnimatePresence mode="popLayout">
          <motion.h2
            key={phase}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tighter text-black mt-1 block"
          >
            {phase}
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>
  );
}
