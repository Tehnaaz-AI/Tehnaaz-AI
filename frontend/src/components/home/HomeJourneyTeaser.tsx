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
    <div 
      ref={containerRef} 
      className="relative w-full h-[95vh] md:h-[85vh] bg-white overflow-hidden border-t-4 md:border-t-8 border-black pointer-events-none"
    >
      
      {/* ORBIT CLUSTER (Circular Photos) */}
      <div className="absolute top-[36%] md:top-[50%] left-[50%] md:left-[6vw] -translate-x-1/2 md:translate-x-0 -translate-y-1/2 pointer-events-auto flex items-center justify-center">
        <motion.div 
          style={{ rotate: rotation }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-88 md:h-88 cursor-pointer"
        >
          {photos.map((photo, index) => {
            const angleDeg = (index / photos.length) * 360;
            const angleRad = (angleDeg * Math.PI) / 180;
            
            const radiusDesktop = 120; 
            const radiusMobile = 100;
            
            const xDesktop = Math.cos(angleRad) * radiusDesktop;
            const yDesktop = Math.sin(angleRad) * radiusDesktop;

            const xMobile = Math.cos(angleRad) * radiusMobile;
            const yMobile = Math.sin(angleRad) * radiusMobile;
            
            // Counter-rotate the individual photos so they stay upright
            const fixedOffset = (index % 3 === 0) ? -10 : (index % 2 === 0) ? 15 : 5;
            const photoCounterRotation = useTransform(rotation, (v) => -v + fixedOffset);

            return (
              <div
                key={photo.id}
                style={{
                  position: 'absolute',
                  zIndex: index
                }}
                className="flex items-center justify-center"
              >
                {/* Desktop item (Large Circular) */}
                <motion.div
                  style={{
                    x: xDesktop,
                    y: yDesktop,
                  }}
                  className="hidden md:flex items-center justify-center"
                >
                  <motion.div
                    style={{ rotate: photoCounterRotation }}
                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 border-black shadow-[5px_5px_0_0_#000] overflow-hidden bg-black"
                  >
                    <img src={photo.image} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </motion.div>
                </motion.div>

                {/* Mobile / Tablet item (Big Circular) */}
                <motion.div
                  style={{
                    x: xMobile,
                    y: yMobile,
                  }}
                  className="flex md:hidden items-center justify-center"
                >
                  <motion.div
                    style={{ rotate: photoCounterRotation }}
                    className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-3 border-black shadow-[4px_4px_0_0_#000] overflow-hidden bg-black"
                  >
                    <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* CENTER: Timeline Text & CTA Button */}
      <div className="absolute top-[80%] md:top-[50%] left-[50%] md:left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto z-20 text-center w-max max-w-[90vw] md:max-w-md">
        
        {/* University Badge */}
        <div className="mb-3 md:mb-5 text-black font-black bg-black/5 px-4 py-1.5 md:py-2 rounded-full border border-black/10 shadow-sm text-xs sm:text-sm uppercase tracking-widest">
          Anurag University
        </div>

        {/* Timeline Text */}
        <div className="flex items-center gap-2 md:gap-3 font-organic-mono font-bold text-xs sm:text-sm md:text-base text-black/70 tracking-widest uppercase mb-5 flex-wrap justify-center">
          <span>1st Year</span>
          <span>➔</span>
          <span>2nd Year</span>
          <span>➔</span>
          <span>3rd Year</span>
          <span>➔</span>
          <span className="text-black font-black animate-pulse">...</span>
        </div>

        {/* Action Button */}
        <Link 
          to="/journey" 
          className="bg-black text-white px-7 py-3 text-xs sm:text-sm md:text-base font-black uppercase tracking-widest border-2 border-black rounded-full hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0_0_#000]"
        >
          Explore Journey ➔
        </Link>
      </div>

    </div>
  );
}
