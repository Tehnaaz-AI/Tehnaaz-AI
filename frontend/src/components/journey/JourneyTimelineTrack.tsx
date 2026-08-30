import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function JourneyTimelineTrack() {
  // Global scroll representing the entire page progress
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const opacity = useTransform(pathLength, [0, 0.05], [0, 1]); // Fade in arrowhead quickly at start

  return (
    <div className="fixed left-2 md:left-12 top-0 bottom-0 w-8 z-50 pointer-events-none flex flex-col items-center pt-32 pb-8">
      
      <svg 
        width="4" 
        height="100%" 
        className="overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="vertical-dash-mask">
            <motion.line
              x1="2" y1="0" x2="2" y2="100%"
              stroke="white"
              strokeWidth="10"
              style={{ pathLength }}
            />
          </mask>
        </defs>
        
        {/* The dashed track that gets revealed by the mask */}
        <line
          x1="2" y1="0" x2="2" y2="100%"
          stroke="black"
          strokeWidth="4"
          strokeDasharray="12 12"
          mask="url(#vertical-dash-mask)"
        />
      </svg>
      
      {/* Animated Arrowhead tracking the line's tip */}
      <motion.div 
        className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-transparent border-t-black ml-0"
        style={{ 
          // 8rem is pt-32, tracking down to the bottom
          top: useTransform(pathLength, [0, 1], ["8rem", "calc(100% - 2rem)"]),
          opacity 
        }}
      />
    </div>
  );
}
