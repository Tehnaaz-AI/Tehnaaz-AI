import { motion, useReducedMotion } from 'framer-motion';
import { experienceTimeline } from '../../data/experience';

export function JourneyTimeline() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="relative border-l border-charcoal-700 ml-4 md:ml-8 py-8 space-y-12">
      {experienceTimeline.map((item, idx) => (
        <motion.div
          key={`${item.title}-${idx}`}
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.15 }}
          className="relative pl-8 md:pl-12"
        >
          {/* Node */}
          <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-charcoal-900 border-2 border-accent-violet"></div>
          
          <div className="glass-panel p-6 rounded-lg glass-panel-hover">
            <div className="flex flex-col gap-1 mb-2">
              <span className="text-sm font-mono text-accent-warm">{item.year}</span>
              <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
              <span className="text-off-white/60 font-mono">{item.organization}</span>
            </div>
            
            {item.description && (
              <ul className="list-disc list-inside space-y-2 mt-4 text-off-white/80">
                {item.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
