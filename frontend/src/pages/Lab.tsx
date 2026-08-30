import { motion, AnimatePresence } from 'framer-motion';
import { experiments } from '../data/experiments';
import { PageTransition } from '../components/layout/PageTransition';
import { NLPSimulation, CVSimulation, MLSimulation } from '../components/ui/LabExperiments';
import { useState } from 'react';

export function Lab() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  return (
    <PageTransition>
      <div className="flex flex-col gap-16">
      <header className="pt-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold mb-6">THE LAB</h1>
        <p className="text-xl text-off-white/70 font-mono max-w-2xl">
          Experiments, ideas, and things I'm trying to understand.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {/* Interactive Simulations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <NLPSimulation />
          <CVSimulation />
          <MLSimulation />
        </div>

        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-mono uppercase tracking-widest">Experiment Logs</h2>
          <div className="h-px bg-charcoal-700 flex-grow"></div>
        </div>

        {experiments.map((exp) => (
          <motion.article 
            key={exp.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`border border-charcoal-700 rounded-lg overflow-hidden ${expandedId === exp.id ? 'bg-charcoal-800/50' : 'bg-charcoal-900'}`}
          >
            <div 
              className="p-6 cursor-pointer hover:bg-charcoal-800/30 transition-colors flex items-center justify-between"
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              <div>
                <span className="text-xs font-mono px-3 py-1 bg-charcoal-800 rounded-full border border-charcoal-700 text-accent-cyan mb-3 inline-block">{exp.area}</span>
                <h2 className="text-2xl font-bold">{exp.title}</h2>
              </div>
              <div className="text-accent-cyan text-2xl font-mono">
                {expandedId === exp.id ? '−' : '+'}
              </div>
            </div>
            
            <AnimatePresence>
              {expandedId === exp.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <div className="h-px w-full bg-charcoal-700 mb-8" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-sm font-mono text-accent-cyan mb-2">Question</h3>
                        <p className="text-off-white/90 italic">"{exp.question}"</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-mono text-off-white/50 mb-2 uppercase tracking-wider">Approach</h3>
                        <p className="text-off-white/80 text-sm">{exp.approach}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-sm font-mono text-off-white/50 mb-2 uppercase tracking-wider">Experiment & Result</h3>
                        <p className="text-off-white/80 text-sm mb-2">{exp.experiment}</p>
                        <p className="text-off-white/90 text-sm border-l border-accent-cyan pl-3">{exp.result}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-mono text-off-white/50 mb-2 uppercase tracking-wider">What I Learned</h3>
                        <p className="text-off-white/80 text-sm bg-charcoal-800 p-4 rounded border border-charcoal-700">{exp.lessons}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </div>
    </div>
    </PageTransition>
  );
}
