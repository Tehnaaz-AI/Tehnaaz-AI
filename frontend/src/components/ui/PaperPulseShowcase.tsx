import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

export function PaperPulseShowcase() {
  const project = projects.find(p => p.id === 'paper-pulse');
  const targetRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to horizontal translation (from 0% to -75% since we have 4 panels)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  if (!project) return null;

  return (
    <section id="work" ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col pt-16 overflow-hidden">
        <div className="w-full container mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-mono uppercase tracking-widest text-accent-indigo">02. Work</h2>
            <div className="h-px bg-charcoal-700 flex-grow"></div>
          </div>
        </div>
        
        <div className="flex-grow relative w-full container mx-auto px-6 mb-16">
          <div className="absolute inset-x-6 inset-y-0 flex items-center bg-charcoal-900/50 backdrop-blur-sm border border-charcoal-700/50 rounded-xl overflow-hidden">
            <motion.div style={{ x: shouldReduceMotion ? 0 : x }} className="flex w-[400vw] h-full flex-col md:flex-row overflow-y-auto md:overflow-visible">
          
          {/* Panel 1: Discover */}
          <div className="w-full md:w-[100vw] h-auto md:h-full flex flex-col justify-center px-6 md:px-24 shrink-0 py-24 md:py-0">
            <h3 className="text-sm font-mono text-accent-indigo mb-3 uppercase tracking-wider">Stage 1: Discover</h3>
            <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tighter mb-4 text-white">
              {project.title}
            </h2>
            <p className="text-xl md:text-3xl font-mono text-accent-cyan max-w-2xl mb-8">
              {project.description}
            </p>
            <div className="w-16 h-1 bg-charcoal-700 mb-8" />
            <h3 className="text-sm font-mono text-off-white/50 mb-3 uppercase tracking-wider">My Contribution</h3>
            <ul className="space-y-3 font-mono text-off-white/80 mb-8">
              {project.contribution.map((item, i) => (
                <li key={i} className="flex gap-3 items-start border-l-2 border-accent-cyan pl-4 py-1">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg text-off-white/70 max-w-2xl hidden md:block">Scroll to explore →</p>
          </div>

          {/* Panel 2: Analyze */}
          <div className="w-full md:w-[100vw] h-auto md:h-full flex flex-col md:flex-row items-center justify-center gap-16 px-6 md:px-24 shrink-0 py-24 md:py-0 border-t md:border-t-0 border-charcoal-800">
            <div className="flex-1 max-w-xl">
              <h3 className="text-sm font-mono text-accent-indigo mb-3 uppercase tracking-wider">Stage 2: Analyze</h3>
              <h4 className="text-3xl font-bold mb-4">Historical Data Analysis</h4>
              <p className="text-off-white/90 leading-relaxed text-lg mb-8">
                Trading requires realistic market emulation. We integrated financial data to provide users with tools to analyze past stock performances and recognize patterns.
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-xs font-mono bg-charcoal-800 text-off-white px-3 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 relative w-full h-[300px] border border-charcoal-700 bg-charcoal-800/30 rounded flex items-center justify-center">
              <span className="text-off-white/30 font-mono text-sm">[ADD PROJECT SCREENSHOT]</span>
            </div>
          </div>

          {/* Panel 3: Simulate */}
          <div className="w-full md:w-[100vw] h-auto md:h-full flex flex-col md:flex-row-reverse items-center justify-center gap-16 px-6 md:px-24 shrink-0 py-24 md:py-0 border-t md:border-t-0 border-charcoal-800">
            <div className="flex-1 max-w-xl">
              <h3 className="text-sm font-mono text-accent-indigo mb-3 uppercase tracking-wider">Stage 3: Simulate</h3>
              <h4 className="text-3xl font-bold mb-4">Virtual Trading & AI Insights</h4>
              <p className="text-off-white/90 leading-relaxed text-lg mb-8">
                Users can execute mock trades using virtual money while AI models provide mock predictions to supplement their decisions (Educational purposes only).
              </p>
              <p className="text-sm font-mono text-off-white/60">
                <strong>Challenge:</strong> {project.challenges}
              </p>
            </div>
            <div className="flex-1 relative w-full h-[300px] border border-charcoal-700 bg-charcoal-800/30 rounded flex items-center justify-center">
              <span className="text-off-white/30 font-mono text-sm">[ADD PROJECT SCREENSHOT]</span>
            </div>
          </div>

          {/* Panel 4: Track */}
          <div className="w-full md:w-[100vw] h-auto md:h-full flex flex-col items-center justify-center text-center px-6 md:px-24 shrink-0 py-24 md:py-0 border-t md:border-t-0 border-charcoal-800">
            <h3 className="text-sm font-mono text-accent-indigo mb-3 uppercase tracking-wider">Stage 4: Track</h3>
            <h2 className="text-4xl md:text-6xl font-sans font-black mb-8">
              Explore Paper Pulse
            </h2>
            <p className="text-off-white/70 text-lg max-w-2xl mx-auto mb-12">
              <strong>Learnings:</strong> {project.lessons}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-charcoal-900 font-bold rounded hover:bg-off-white transition-colors">
                  <FaGithub size={20} /> View Source
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "[Deployment link to be updated]" ? (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 border border-charcoal-700 text-white font-bold rounded hover:border-accent-cyan transition-colors">
                  <ExternalLink size={20} /> Live Demo
                </a>
              ) : (
                <span className="flex items-center justify-center gap-3 px-8 py-4 border border-charcoal-700 text-off-white/30 font-bold rounded cursor-not-allowed">
                  <ExternalLink size={20} /> Deployment link to be updated
                </span>
              )}
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
