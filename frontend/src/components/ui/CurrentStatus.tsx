import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function CurrentStatus() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex items-center cursor-pointer h-10 sm:h-12 md:h-14"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <motion.div 
        className="flex items-center justify-center bg-white/80 backdrop-blur-xl border border-black rounded-full shadow-sm overflow-hidden h-10 sm:h-12 md:h-14"
        initial={false}
        animate={{ width: isHovered ? 'auto' : '48px' }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="w-12 h-full flex items-center justify-center shrink-0">
          <span className="font-organic-mono text-[10px] sm:text-xs font-black uppercase tracking-widest text-black text-center leading-none">
            Now
          </span>
        </div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="whitespace-nowrap pr-5 sm:pr-6 pl-1 flex items-center gap-3 origin-left"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <div className="w-2 h-2 rounded-full bg-black animate-pulse shrink-0" />
              <span className="font-organic-sans text-xs sm:text-sm font-bold text-black tracking-tight">
                Anurag University, B.Tech AI 3rd Year
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
