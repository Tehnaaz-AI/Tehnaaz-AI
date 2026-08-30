import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState(false);
  const { cursorState } = useCursor();

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Check for touch device or reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (prefersReducedMotion || isTouchDevice) {
      setIsTouch(true);
      return;
    }

    // Hide native cursor globally
    document.body.classList.add('custom-cursor-active');

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isTouch) return null;

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: isClicked ? 0.8 : 1,
      transition: { type: "tween", ease: "backOut", duration: 0.05 }
    },
    view: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: isClicked ? 1.3 : 1.5,
      transition: { type: "spring", mass: 0.3, stiffness: 400, damping: 25 }
    },
    explore: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: isClicked ? 1.3 : 1.5,
      transition: { type: "spring", mass: 0.3, stiffness: 400, damping: 25 }
    },
    open: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: isClicked ? 1.3 : 1.5,
      transition: { type: "spring", mass: 0.3, stiffness: 400, damping: 25 }
    }
  };

  const getLabel = () => {
    switch(cursorState) {
      case 'view': return 'VIEW';
      case 'explore': return 'EXPLORE';
      case 'open': return 'OPEN ↗';
      default: return '';
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] flex items-start justify-start font-mono text-[10px] tracking-widest text-black drop-shadow-md"
      variants={variants as any}
      animate={cursorState}
      style={{ originX: 0, originY: 0 }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <path d="M4 4L28 14L18 18L14 28L4 4Z" fill="black" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      {cursorState !== 'default' && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 10 }}
          exit={{ opacity: 0, x: -10 }}
          className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white px-3 py-1 font-bold whitespace-nowrap border-2 border-white"
        >
          {getLabel()}
        </motion.div>
      )}
    </motion.div>
  );
}
