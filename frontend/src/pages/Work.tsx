import { motion, useReducedMotion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { PaperPulseShowcase } from '../components/ui/PaperPulseShowcase';
import { projects } from '../data/projects';
import { FaGithub } from 'react-icons/fa';

export function Work() {
  const shouldReduceMotion = useReducedMotion();
  const otherProjects = projects.filter(p => p.id !== 'paper-pulse');

  return (
    <PageTransition>
      <div className="flex flex-col">
        <PaperPulseShowcase />

        <section className="min-h-screen flex flex-col justify-center py-24 container mx-auto px-6">
          <div className="w-full">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-sans uppercase tracking-widest text-accent-indigo">Other Work</h2>
              <div className="h-px bg-charcoal-700 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProjects.map((project, idx) => (
                <motion.article 
                  key={project.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: idx * 0.1 }}
                  className="group relative glass-panel p-8 rounded-lg glass-panel-hover flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold font-sans group-hover:text-accent-cyan transition-colors">{project.title}</h4>
                    {project.githubUrl && project.githubUrl !== "[ADD GITHUB URL]" && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-off-white/50 hover:text-white transition-colors">
                        <FaGithub size={24} />
                      </a>
                    )}
                  </div>
                  <p className="text-off-white/70 mb-6 text-sm font-body">{project.oneLineProblem}</p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-xs font-mono text-off-white/50 border border-charcoal-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
