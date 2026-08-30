import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function BuildingScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const nodes = [
    { label: "QUESTION", x: 100, y: 150 },
    { label: "EXPLORE", x: 300, y: 300 },
    { label: "EXPERIMENT", x: 500, y: 150 },
    { label: "BUILD", x: 700, y: 300 },
    { label: "ITERATE", x: 900, y: 150 },
  ];

  // Opacity maps for sequential appearance
  const opacities = nodes.map((_, i) => {
    const start = 0.2 + (i * 0.1);
    const end = start + 0.05;
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  const pathLength = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-organic-bg">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <motion.div 
          className="relative z-20 text-center p-12 mb-12"
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-organic-sans font-black tracking-tighter text-organic-dark mb-4 uppercase">
            How I Think
          </h2>
          <p className="font-organic-sans text-xl md:text-2xl text-organic-muted max-w-xl mx-auto">
            Ideas become systems.
          </p>
        </motion.div>

        <div className="relative w-full max-w-5xl h-[400px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400">
            {/* Connection Path */}
            <motion.path
              d="M 100 150 L 300 300 L 500 150 L 700 300 L 900 150"
              fill="transparent"
              stroke="#B6FF4A" // organic-accent
              strokeWidth="4"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
            
            {/* Nodes */}
            {nodes.map((node, i) => (
              <motion.g key={node.label} style={{ opacity: opacities[i] }}>
                <circle cx={node.x} cy={node.y} r="8" fill="#111111" />
                <circle cx={node.x} cy={node.y} r="16" fill="transparent" stroke="#111111" strokeWidth="2" strokeDasharray="4 4" />
                <text 
                  x={node.x} 
                  y={node.y - 24} 
                  textAnchor="middle" 
                  className="font-organic-mono text-sm tracking-widest font-bold fill-organic-dark"
                >
                  {node.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

      </div>
    </section>
  );
}
