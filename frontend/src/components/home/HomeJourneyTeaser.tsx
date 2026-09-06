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
      className="relative w-full min-h-[70vh] md:h-[80vh] bg-transparent overflow-hidden border-t-4 md:border-t-8 border-black flex flex-col md:flex-row items-center justify-between py-12 md:py-0 px-6 sm:px-12 md:px-16 lg:px-24 pointer-events-none"
    >
      
      {/* LEFT: Orbit Globe Cluster */}
      <div className="relative pointer-events-auto my-4 md:my-0 order-1 md:order-1 flex items-center justify-center shrink-0 md:ml-4 lg:ml-8">
        <motion.div 
          style={{ rotate: rotation }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-center w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 cursor-pointer"
        >
          {photos.map((photo, index) => {
            const angleDeg = (index / photos.length) * 360;
            const angleRad = (angleDeg * Math.PI) / 180;
            
            // Scaled radius to prevent expanding into center/right text
            const radiusDesktop = 115; 
            const radiusMobile = 75;
            
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
                {/* Desktop item */}
                <motion.div
                  style={{
                    x: xDesktop,
                    y: yDesktop,
                  }}
                  className="hidden md:flex items-center justify-center"
                >
                  <motion.div
                    style={{ rotate: photoCounterRotation }}
                    className="w-24 h-24 lg:w-28 lg:h-28 border-4 border-black shadow-[6px_6px_0_0_#000] overflow-hidden bg-black"
                  >
                    <img src={photo.image} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </motion.div>
                </motion.div>

                {/* Mobile / Tablet item */}
                <motion.div
                  style={{
                    x: xMobile,
                    y: yMobile,
                  }}
                  className="flex md:hidden items-center justify-center"
                >
                  <motion.div
                    style={{ rotate: photoCounterRotation }}
                    className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-black shadow-[3px_3px_0_0_#000] overflow-hidden bg-black"
                  >
                    <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* RIGHT: Timeline Text & CTA Button (Pushed well to the right on laptop/desktop) */}
      <div className="flex flex-col items-center md:items-start pointer-events-auto z-20 order-2 md:order-2 text-center md:text-left max-w-sm sm:max-w-md md:ml-auto md:mr-8 lg:mr-20">
        
        {/* University Badge */}
        <div className="mb-3 md:mb-5 text-black font-black bg-black/5 px-4 py-1.5 md:py-2 rounded-full border border-black/10 shadow-sm text-xs sm:text-sm uppercase tracking-widest">
          Anurag University
        </div>

        {/* Timeline Text */}
        <div className="flex items-center gap-2 md:gap-3 font-organic-mono font-bold text-xs sm:text-sm md:text-base text-black/70 tracking-widest uppercase mb-6 flex-wrap justify-center md:justify-start">
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
