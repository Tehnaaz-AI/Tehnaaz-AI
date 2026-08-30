import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      initial={{ y: prefersReducedMotion ? 0 : 20, opacity: 0, filter: prefersReducedMotion ? "none" : "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: prefersReducedMotion ? 0 : -20, opacity: 0, filter: prefersReducedMotion ? "none" : "blur(10px)" }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
