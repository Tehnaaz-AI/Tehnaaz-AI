import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const nodesData = [
  { id: 'ai-agents', label: 'AI Agents', status: 'Building', x: 20, y: 30 },
  { id: 'gen-ai', label: 'Generative AI', status: 'Experimenting', x: 70, y: 20 },
  { id: 'deep-learning', label: 'Deep Learning', status: 'Learning', x: 80, y: 70 },
  { id: 'full-stack', label: 'Full-Stack Engineering', status: 'Building', x: 30, y: 80 },
  { id: 'nlp', label: 'NLP', status: 'Exploring', x: 50, y: 50 },
  { id: 'emerging', label: 'Emerging Tech', status: 'Exploring', x: 10, y: 60 },
];

export function Constellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleMouseMove = () => {
    // Left for future use if particles should dodge cursor
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full absolute inset-0 cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredNode(null)}
    >
      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodesData.map((node, i) => {
          return nodesData.slice(i + 1).map((target) => {
            // Only show lines if they are somewhat close or if one is hovered
            const dx = node.x - target.x;
            const dy = node.y - target.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 50 && hoveredNode !== node.id && hoveredNode !== target.id) return null;

            const isHovered = hoveredNode === node.id || hoveredNode === target.id;
            
            return (
              <motion.line
                key={`${node.id}-${target.id}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={isHovered ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.05)"}
                strokeWidth={isHovered ? 2 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            );
          });
        })}
      </svg>

      {/* Nodes */}
      {nodesData.map((node, idx) => {
        const isHovered = hoveredNode === node.id;
        
        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: "spring" }}
            onMouseEnter={() => setHoveredNode(node.id)}
          >
            {/* Core point */}
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isHovered ? 'bg-accent-cyan shadow-[0_0_15px_rgba(0,0,0,0.8)]' : 'bg-charcoal-500'}`} />
            
            {/* Label & Status */}
            <div className={`mt-4 flex flex-col items-center whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}>
              <span className={`font-mono text-sm tracking-wider ${isHovered ? 'text-white font-bold' : 'text-off-white'}`}>
                {node.label}
              </span>
              <motion.span 
                initial={false}
                animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                className="overflow-hidden text-xs font-mono text-accent-cyan mt-1"
              >
                Status: {node.status}
              </motion.span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
