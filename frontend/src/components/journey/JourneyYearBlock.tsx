import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { JourneyYear, JourneyPhoto } from '../../data/journey';

export function JourneyYearBlock({ data }: { data: JourneyYear }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<JourneyPhoto | null>(null);
  
  // Height scales with the number of photos to ensure smooth scrolling pace
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Automatically scroll exactly the width of the content minus the viewport width.
  // We use CSS variables to dynamically calculate the width of the viewport based on mobile vs desktop.
  const x = useTransform(scrollYProgress, (v) => `calc(-${v * 100}% + calc(${v} * var(--track-vw)))`);

  return (
    <>
      <section ref={containerRef} style={{ height: `${data.photos.length * 50}vh` }} className="relative w-full bg-white">
        
        {/* Define CSS variable for the track width: 100vw on mobile, 60vw on desktop */}
        <style dangerouslySetInnerHTML={{__html: `
          .scroll-track-viewport {
            --track-vw: 100vw;
          }
          @media (min-width: 768px) {
            .scroll-track-viewport {
              --track-vw: 60vw;
            }
          }
        `}} />

        <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between overflow-hidden bg-white scroll-track-viewport">
          
          {/* Top/Left Side: Sticky Text Context */}
          <div className="w-full md:w-[40%] h-auto md:h-full shrink-0 flex flex-col justify-center px-6 sm:px-8 md:pl-12 pt-20 pb-3 md:py-0 bg-white z-20 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)] relative">
            <div className="max-w-md pr-2 sm:pr-4">
              <span className="font-organic-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-black/50 uppercase block mb-1 sm:mb-2 md:mb-3">
                {data.year} <span className="mx-1 sm:mx-2 font-black text-black/20">•</span> <span className="text-black/80 font-black">Anurag University</span>
              </span>
              <h2 className="font-sans font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-tighter text-black leading-tight mb-1 sm:mb-3 md:mb-6">
                {data.phase}
              </h2>
              <p className="font-organic-mono font-medium text-[11px] sm:text-xs md:text-sm text-black/80 leading-relaxed line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                {data.description}
              </p>
            </div>
          </div>

          {/* Bottom/Right Side: Horizontally Scrolling Track */}
          <div className="w-full md:w-[60%] flex-1 md:h-full shrink-0 relative z-10 flex items-center bg-gray-50/50 overflow-hidden py-3 md:py-0">
            <motion.div 
              style={{ x }}
              className="flex gap-4 sm:gap-6 md:gap-10 items-center px-6 sm:px-8 md:px-10 w-max"
            >
              {data.photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="w-[72vw] sm:w-[50vw] md:w-[26vw] max-w-sm shrink-0 flex flex-col cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="aspect-[16/10] sm:aspect-[4/3] w-full bg-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group">
                    <img 
                      src={photo.image} 
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 pointer-events-none border-[3px] border-white/10 mix-blend-overlay group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  
                  <div className="mt-2 sm:mt-4 md:mt-6 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4 md:p-5 group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="font-organic-sans text-base sm:text-lg md:text-xl font-black tracking-tighter uppercase text-black leading-tight line-clamp-1">
                      {photo.title}
                    </h3>
                    {photo.role && (
                      <span className="inline-block bg-black text-white px-2 py-0.5 sm:py-1 font-organic-mono text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest uppercase mt-1 sm:mt-2 md:mt-3 mb-1">
                        {photo.role}
                      </span>
                    )}
                    {photo.description && (
                      <p className="font-organic-mono text-[9px] sm:text-[10px] md:text-xs text-black/80 mt-1 line-clamp-2">
                        {photo.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
              >
                {/* Close button */}
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 bg-black text-white w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-black/80 transition-colors"
                >
                  ×
                </button>
                
                <div className="w-full max-h-[60vh] bg-gray-100 flex items-center justify-center p-4">
                  <img 
                    src={selectedPhoto.image} 
                    alt={selectedPhoto.title}
                    className="max-w-full max-h-[50vh] object-contain border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                
                <div className="w-full bg-white p-6 md:p-8 border-t-4 border-black">
                  <h3 className="font-organic-sans text-3xl md:text-5xl font-black tracking-tighter uppercase text-black leading-none">
                    {selectedPhoto.title}
                  </h3>
                  {selectedPhoto.role && (
                    <span className="inline-block bg-black text-white px-3 py-1 font-organic-mono text-xs md:text-sm font-bold tracking-widest uppercase mt-4 mb-2">
                      {selectedPhoto.role}
                    </span>
                  )}
                  {selectedPhoto.description && (
                    <p className="font-organic-mono text-sm md:text-base text-black/80 mt-2 max-w-2xl">
                      {selectedPhoto.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
