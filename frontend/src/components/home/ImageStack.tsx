import { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';

interface ImageStackProps {
  images: string[];
  scrollYProgress: any; // from parent's useScroll
}

export function ImageStack({ images, scrollYProgress }: ImageStackProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // When scrolling into view, they separate.
  // We map 0 -> 1 progress to a spread factor.
  const spreadFactor = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-video flex items-center justify-center">
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-organic-bg/90 backdrop-blur-md flex items-center justify-center p-8 cursor-zoom-out"
            onClick={() => setActiveIdx(null)}
          >
            <motion.img 
              layoutId={`img-${activeIdx}`}
              src={images[activeIdx]} 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {images.map((src, i) => {
        // Base separation offset
        const yOffset = useTransform(spreadFactor, (val) => val * (i * 40 - ((images.length-1) * 20)));
        const xOffset = useTransform(spreadFactor, (val) => val * (i * 30 - ((images.length-1) * 15)));
        const rotation = useTransform(spreadFactor, (val) => val * (i % 2 === 0 ? 2 : -2));

        const isHovered = hoveredIdx === i;

        return (
          <motion.div
            key={i}
            layoutId={`img-${i}`}
            className="absolute origin-center cursor-zoom-in shadow-xl rounded-sm overflow-hidden border border-organic-muted/20"
            style={{
              width: '80%',
              aspectRatio: '16/9',
              zIndex: images.length - i + (isHovered ? 10 : 0),
              y: yOffset,
              x: xOffset,
              rotate: rotation
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -10, 
              zIndex: 20,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onHoverStart={() => setHoveredIdx(i)}
            onHoverEnd={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(i)}
          >
            <img src={src} className="w-full h-full object-cover" alt={`Screenshot ${i}`} />
          </motion.div>
        );
      })}
    </div>
  );
}
