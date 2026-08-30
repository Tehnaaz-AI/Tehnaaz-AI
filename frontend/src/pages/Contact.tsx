import { motion, useReducedMotion } from 'framer-motion';
import { PageTransition } from '../components/layout/PageTransition';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { ENV } from '../config/env';

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition>
      <section className="min-h-screen flex flex-col justify-center items-center text-center py-24 relative container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tighter mb-6">Let's Connect</h2>
          <p className="text-xl text-off-white/80 font-body mb-12">
            I'm currently looking for new opportunities in AI engineering and full-stack development. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href={`mailto:${ENV.CONTACT_EMAIL}`} className="inline-block px-8 py-4 bg-accent-cyan text-charcoal-900 font-bold rounded hover:bg-white transition-colors mb-16">
            Say Hello
          </a>
          
          <div className="flex justify-center gap-8 text-off-white/50">
            <a href={ENV.GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors">
              <FaGithub size={32} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={ENV.LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-indigo transition-colors">
              <FaLinkedin size={32} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={`mailto:${ENV.CONTACT_EMAIL}`} className="hover:text-accent-violet transition-colors">
              <FaEnvelope size={32} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
