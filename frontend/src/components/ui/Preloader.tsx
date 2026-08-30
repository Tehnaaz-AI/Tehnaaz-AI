import { motion } from 'framer-motion';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[1000] w-full h-full bg-white flex flex-col items-center justify-center selection:bg-black selection:text-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Arc Reactor Spinning Image */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="w-48 h-48 md:w-64 md:h-64 mb-12 mix-blend-multiply"
        >
          <img 
            src="/scroll-sequence/ezgif-frame-001.jpg" 
            alt="Arc Reactor Loading"
            className="w-full h-full object-contain rounded-full"
          />
        </motion.div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "circInOut" }}
            className="h-1 bg-black w-full max-w-[200px]"
          />
          <h2 className="font-organic-sans font-black text-2xl md:text-3xl tracking-tighter uppercase text-black text-center">
            Initializing System
          </h2>
          <motion.p 
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="font-organic-mono text-xs md:text-sm font-bold tracking-widest uppercase text-black/60"
          >
            Loading Experience...
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
