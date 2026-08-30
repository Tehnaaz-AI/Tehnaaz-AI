import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

interface OrbitItem {
  label: string;
  radius: number;
  speed: number; // degrees per frame
  initialAngle: number;
  size: 'sm' | 'md' | 'lg';
}

const items: OrbitItem[] = [
  { label: 'AI', radius: 250, speed: 0.2, initialAngle: 0, size: 'lg' },
  { label: 'ML', radius: 320, speed: -0.15, initialAngle: 45, size: 'md' },
  { label: 'WEB', radius: 390, speed: 0.1, initialAngle: 120, size: 'md' },
  { label: 'DATA', radius: 460, speed: -0.08, initialAngle: 210, size: 'sm' },
  { label: 'BUILD', radius: 530, speed: 0.05, initialAngle: 300, size: 'lg' },
  { label: 'LEARN', radius: 600, speed: -0.04, initialAngle: 60, size: 'sm' },
  { label: 'EXPLORE', radius: 670, speed: 0.03, initialAngle: 180, size: 'md' },
  { label: 'CREATE', radius: 740, speed: -0.02, initialAngle: 270, size: 'lg' },
];

export function OrbitSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {items.map((item, index) => {
        // Scroll transformation: as scroll increases, structure them 
        const scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0.8]);
        const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.8, 0.8, 0]);

        // Target grid positions for "STRUCTURE" phase
        const cols = 4;
        const row = Math.floor(index / cols);
        const col = index % cols;
        const targetX = (col - 1.5) * 150;
        const targetY = (row - 0.5) * 80 + 300; // Shift down

        // Mouse Parallax
        const parallaxX = useTransform(smoothMouseX, [-1, 1], [-item.radius * 0.1, item.radius * 0.1]);
        const parallaxY = useTransform(smoothMouseY, [-1, 1], [-item.radius * 0.1, item.radius * 0.1]);

        // When scrolling, pull them towards target grid
        const structX = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0, targetX]);
        const structY = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0, targetY]);

        // Fade out the orbit rotation radius as they structure
        const dynamicRadius = useTransform(scrollYProgress, [0, 0.3, 0.7], [item.radius, item.radius, 0]);

        return (
          <motion.div
            key={item.label}
            className="absolute flex items-center justify-center"
            style={{ 
              x: parallaxX,
              y: parallaxY,
              scale,
              opacity
            }}
          >
            <motion.div
              style={{ x: structX, y: structY }}
              className="absolute flex items-center justify-center"
            >
              <motion.div
                animate={{
                  rotate: [item.initialAngle, item.initialAngle + (item.speed > 0 ? 360 : -360)]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 360 / Math.abs(item.speed) / 60, // Approximate based on 60fps
                  ease: "linear"
                }}
                className="absolute flex items-center justify-center"
                style={{ 
                  width: useTransform(dynamicRadius, r => r * 2), 
                  height: useTransform(dynamicRadius, r => r * 2) 
                }}
              >
                <motion.div 
                  className={`font-organic-mono uppercase tracking-widest whitespace-nowrap drop-shadow-md
                    ${item.size === 'sm' ? 'text-xs text-organic-muted' : item.size === 'md' ? 'text-sm font-bold text-organic-dark' : 'text-xl font-black text-organic-accent'}`}
                style={{
                  // Counter-rotate so text stays upright
                  rotate: useTransform(
                    useMotionValue(0), 
                    () => -(item.initialAngle + (item.speed > 0 ? 360 : -360)) // This needs to be animated in sync.
                    // Actually, framer motion counter-rotation is tricky without a separate animated value.
                    // Instead of full counter rotation, we can just leave them rotating with the orbit or animate them separately.
                  )
                }}
                animate={{
                  rotate: [-item.initialAngle, -item.initialAngle - (item.speed > 0 ? 360 : -360)]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 360 / Math.abs(item.speed) / 60,
                  ease: "linear"
                }}
              >
                {item.label}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
