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
      className="relative w-full min-h-[90vh] md:min-h-[85vh] bg-transparent overflow-hidden border-t-4 md:border-t-8 border-black flex flex-col justify-center py-10 md:py-16 pointer-events-none"
    >
      
      {/* Main Flex Wrapper (Side-by-side on desktop, stacked with Arc Reactor landing in center on mobile) */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between pointer-events-auto gap-8 md:gap-4">
        
        {/* LEFT / MOBILE-TOP: Orbit Globe Cluster (with Arc Reactor landing in center on mobile) */}
        <div className="relative flex items-center justify-center w-full md:w-auto my-2 md:my-0">
          <motion.div 
            style={{ rotate: rotation }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 cursor-pointer"
          >
            {photos.map((photo, index) => {
              const angleDeg = (index / photos.length) * 360;
              const angleRad = (angleDeg * Math.PI) / 180;
              
              const radiusDesktop = 115; 
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
                      className="w-22 h-22 lg:w-26 lg:h-26 rounded-full border-4 border-black shadow-[5px_5px_0_0_#000] overflow-hidden bg-black"
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
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-black shadow-[4px_4px_0_0_#000] overflow-hidden bg-black"
                    >
                      <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* CENTER-RIGHT: Timeline Text & CTA Button */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-20 w-full md:w-auto max-w-lg mt-4 md:mt-0 md:pl-6 lg:pl-12">
          
          {/* University Badge */}
          <div className="mb-3 md:mb-4 text-black font-black bg-black/5 px-4 py-1.5 md:py-2 rounded-full border border-black/10 shadow-sm text-xs sm:text-sm uppercase tracking-widest inline-block">
            Anurag University
          </div>

          {/* Timeline Text */}
          <div className="flex items-center gap-2 md:gap-3 font-organic-mono font-bold text-xs sm:text-sm md:text-base text-black/80 tracking-widest uppercase mb-6 flex-wrap justify-center md:justify-start">
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
            className="bg-black text-white px-8 py-3.5 text-xs sm:text-sm md:text-base font-black uppercase tracking-widest border-2 border-black rounded-full hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0_0_#000]"
          >
            Explore Journey ➔
          </Link>
        </div>

        {/* Right side spacer on desktop so the Arc Reactor canvas (canvasX = 30vw) has its dedicated spot */}
        <div className="hidden lg:block w-64 h-64 pointer-events-none" />

      </div>

    </div>
  );
}
