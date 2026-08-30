import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { JOURNEY_DATA } from '../../data/journey';

export function HomeJourneyTeaser() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Collect 8 photos for the globe cluster
  const photos = JOURNEY_DATA.flatMap(year => year.photos).slice(0, 8);
  
  // Live continuous rotation
  const rotation = useMotionValue(0);
  
  useAnimationFrame((_, delta) => {
    if (!isHovered) {
      rotation.set((rotation.get() + delta * 0.02) % 360);
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] bg-transparent overflow-hidden border-t-8 border-black pointer-events-none">
      
      {/* LEFT: Orbit Globe */}
      {/* Vertically shifted down, pushed to the left side */}
      <div className="absolute top-[55%] left-0 md:left-[5vw] -translate-y-1/2 pointer-events-auto">
        <motion.div 
          style={{ rotate: rotation }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96 cursor-pointer"
        >
          {photos.map((photo, index) => {
            const angleDeg = (index / photos.length) * 360;
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 150; 
            
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            
            // Counter-rotate the individual photos so they stay upright
            const fixedOffset = (index % 3 === 0) ? -10 : (index % 2 === 0) ? 15 : 5;
            const photoCounterRotation = useTransform(rotation, (v) => -v + fixedOffset);

            return (
              <motion.div
                key={photo.id}
                style={{
                  position: 'absolute',
                  x,
                  y,
                  zIndex: index
                }}
                className="flex items-center justify-center"
              >
                <motion.div
                   style={{ rotate: photoCounterRotation }}
                   className="w-24 h-24 md:w-32 md:h-32 border-4 border-black shadow-[8px_8px_0_0_#000] overflow-hidden bg-black"
                >
                  <img src={photo.image} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* CENTER-RIGHT: Timeline Text & Small Button */}
      {/* Positioned between the globe (left) and Arc Reactor (right), shifted down */}
      <div className="absolute top-[55%] left-[60%] md:left-[52%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto z-20">
        
        {/* University Badge */}
        <div className="mb-6 text-black font-black bg-black/5 px-4 py-2 rounded-full border border-black/10 shadow-sm text-sm uppercase tracking-widest">
          Anurag University
        </div>

        {/* Timeline Text */}
        <div className="flex items-center gap-2 md:gap-4 font-organic-mono font-bold text-xs md:text-sm text-black/60 tracking-widest uppercase mb-6 text-center flex-wrap justify-center">
          <span>1st Year</span>
          <span>➔</span>
          <span>2nd Year</span>
          <span>➔</span>
          <span>3rd Year</span>
          <span>➔</span>
          <span className="text-black animate-pulse">...</span>
        </div>

        {/* Small Curved Button */}
        <Link 
          to="/journey" 
          className="bg-black text-white px-6 py-3 text-sm md:text-base font-black uppercase tracking-widest border-2 border-black rounded-full hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0_0_#000]"
        >
          Explore Journey
        </Link>
      </div>

    </div>
  );
}
