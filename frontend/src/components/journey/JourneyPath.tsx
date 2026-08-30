import { useRef, useId } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function JourneyPath({ isReversed }: { isReversed: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskId = useId();
  
  // Track scroll through this specific path segment
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 40%"]
  });

  // Spring animation for smoother drawing
  const pathLength = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const opacity = useTransform(pathLength, [0.95, 1], [0, 1]);

  // We have to remove colons from the maskId because they are not valid in SVG URLs (React 18 useId contains colons like :r0:)
  const safeMaskId = maskId.replace(/:/g, '');

  return (
    <div ref={containerRef} className="w-full h-32 md:h-48 relative flex justify-center items-center my-[-1rem] md:my-[-3rem] z-0 pointer-events-none">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 150" 
        preserveAspectRatio="none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`transform w-full h-full max-w-2xl hidden md:block ${isReversed ? 'scale-x-[-1]' : ''}`}
      >
        <defs>
          <mask id={`mask-${safeMaskId}`}>
            <motion.path
              d="M 50,0 C 50,75 350,75 350,150"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength }}
            />
          </mask>
        </defs>

        {/* The dashed path masked by the drawing white path */}
        <path
          d="M 50,0 C 50,75 350,75 350,150"
          stroke="black"
          strokeWidth="4"
          strokeDasharray="12 12"
          strokeLinecap="round"
          mask={`url(#mask-${safeMaskId})`}
        />
        {/* The arrowhead */}
        <motion.polygon
          points="340,135 350,150 360,135"
          fill="black"
          style={{ opacity }}
        />
      </svg>
      
      {/* Mobile fallback straight dashed line */}
      <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0 border-l-4 border-dashed border-black/20 -z-10"></div>
    </div>
  );
}
