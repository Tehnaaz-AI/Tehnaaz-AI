import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function CurrentStatus() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex items-center cursor-default h-14"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex items-center bg-white/60 backdrop-blur-xl border border-black rounded-full shadow-lg overflow-hidden h-12"
        initial={false}
        animate={{ width: isHovered ? 'auto' : '48px' }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          <span className="font-organic-mono text-[10px] font-black uppercase tracking-widest text-black">
            Now
          </span>
        </div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="whitespace-nowrap pr-6 flex items-center gap-3 origin-left"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="font-organic-sans text-sm font-bold text-black tracking-tight">
                Anurag University, B.Tech AI 3rd Year
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
