import { useRef, useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticProps {
  children: ReactElement;
  intensity?: number;
}

export function Magnetic({ children, intensity = 0.2 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Use springs for smooth physics-based movement
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Transform coordinates for subtle movement
  const x = useTransform(mouseX, (v) => (isHovered && !prefersReducedMotion ? v * intensity : 0));
  const y = useTransform(mouseY, (v) => (isHovered && !prefersReducedMotion ? v * intensity : 0));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
