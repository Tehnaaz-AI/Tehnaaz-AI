import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function NLPSimulation() {
  const [stage, setStage] = useState(0); // 0: input, 1: tokens, 2: classification
  
  const text = "This breakthrough model achieves state-of-the-art results.";
  const tokens = text.split(" ");
  const classifications = ["O", "O", "B-TECH", "O", "O", "O", "O"];

  const nextStage = () => setStage((s) => (s + 1) % 3);

  return (
    <div className="border border-charcoal-700 bg-charcoal-900 rounded-lg p-6 font-mono text-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-accent-cyan uppercase tracking-widest">NLP Sequence Labeling</h4>
        <button onClick={nextStage} className="px-3 py-1 bg-charcoal-800 hover:bg-charcoal-700 rounded transition-colors text-xs">
          {stage === 0 ? "Tokenize" : stage === 1 ? "Classify" : "Reset"}
        </button>
      </div>

      <div className="min-h-[100px] flex flex-wrap gap-2 items-center">
        {stage === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg">
            {text}
          </motion.p>
        )}
        
        {stage > 0 && tokens.map((token, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="px-2 py-1 bg-charcoal-800 rounded border border-charcoal-700">{token}</span>
            {stage === 2 && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`text-xs px-1 rounded ${classifications[idx] !== 'O' ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50' : 'text-off-white/40'}`}
              >
                {classifications[idx]}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CVSimulation() {
  const [scanning, setScanning] = useState(false);

  return (
    <div className="border border-charcoal-700 bg-charcoal-900 rounded-lg p-6 font-mono text-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-accent-cyan uppercase tracking-widest">Computer Vision (CNN)</h4>
        <button onClick={() => setScanning(!scanning)} className="px-3 py-1 bg-charcoal-800 hover:bg-charcoal-700 rounded transition-colors text-xs">
          {scanning ? "Stop" : "Scan"}
        </button>
      </div>

      <div className="relative w-full max-w-sm mx-auto aspect-square bg-charcoal-800 rounded border border-charcoal-700 overflow-hidden flex items-center justify-center">
        {/* Placeholder Image */}
        <div className="grid grid-cols-8 grid-rows-8 w-3/4 h-3/4 gap-[1px]">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="bg-charcoal-700 rounded-sm opacity-50" />
          ))}
        </div>

        {/* Scanner */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-16 bg-gradient-to-b from-accent-cyan/0 via-accent-cyan/20 to-accent-cyan/50 border-b-2 border-accent-cyan z-10"
            />
          )}
        </AnimatePresence>
        
        {/* Bounding Box that appears randomly during scan */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [1.1, 1, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute w-1/3 h-1/3 border-2 border-accent-cyan bg-accent-cyan/10 z-20"
              style={{ left: '30%', top: '25%' }}
            >
              <span className="absolute -top-6 left-[-2px] bg-accent-cyan text-charcoal-900 text-xs px-1 font-bold">Feature_01: 98%</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MLSimulation() {
  const [points, setPoints] = useState<{x: number, y: number, class: number}[]>([]);
  
  useEffect(() => {
    // Generate random points for classification
    const newPoints = Array.from({length: 40}).map(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      // Simple non-linear boundary
      const isClass1 = y > x + 10 * Math.sin(x / 10);
      return { x, y, class: isClass1 ? 1 : 0 };
    });
    setPoints(newPoints);
  }, []);

  return (
    <div className="border border-charcoal-700 bg-charcoal-900 rounded-lg p-6 font-mono text-sm md:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-accent-cyan uppercase tracking-widest">Decision Boundary (SVM)</h4>
      </div>

      <div className="relative w-full h-48 bg-charcoal-800 rounded border border-charcoal-700 overflow-hidden">
        {/* Animated decision boundary */}
        <motion.div 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <motion.path 
              d="M 0 50 Q 25 20, 50 50 T 100 50"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          </svg>
        </motion.div>

        {/* Data points */}
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`absolute w-2 h-2 rounded-full ${p.class === 1 ? 'bg-accent-cyan' : 'bg-charcoal-500'}`}
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </div>
    </div>
  );
}
