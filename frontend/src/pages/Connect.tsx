import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaRegCopy, FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { Magnetic } from '../components/ui/Magnetic';

import { ENV } from '../config/env';

export function Connect() {
  const [copied, setCopied] = useState(false);
  
  const email = ENV.CONTACT_EMAIL;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12 text-center max-w-2xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-sans font-bold"
      >
        LET'S BUILD SOMETHING INTERESTING.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-off-white/70 font-mono"
      >
        Open for collaborations, interesting conversations, and opportunities to build intelligent software.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col w-full gap-4 mt-8"
      >
        <div className="flex items-center justify-between border border-charcoal-700 bg-charcoal-800/50 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-accent-cyan" />
            <span className="font-mono">{email}</span>
          </div>
          <button 
            onClick={handleCopyEmail}
            className="p-2 hover:bg-charcoal-700 rounded transition-colors"
            title="Copy Email"
          >
            {copied ? <FaCheck size={18} className="text-accent-cyan" /> : <FaRegCopy size={18} />}
          </button>
        </div>

        <Magnetic intensity={0.1}>
          <a 
            href="https://github.com/Tehnaaz-AI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex w-full items-center gap-4 border border-charcoal-700 hover:border-accent-cyan bg-charcoal-800/50 hover:bg-charcoal-800 p-4 rounded-lg transition-colors group"
          >
            <FaGithub className="text-off-white group-hover:text-accent-cyan transition-colors" />
            <span className="font-mono group-hover:text-white transition-colors">GitHub</span>
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity font-mono text-sm text-accent-cyan">↗</span>
          </a>
        </Magnetic>

        <Magnetic intensity={0.1}>
          <a 
            href="https://www.linkedin.com/in/tehnaazfathima/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex w-full items-center gap-4 border border-charcoal-700 hover:border-accent-cyan bg-charcoal-800/50 hover:bg-charcoal-800 p-4 rounded-lg transition-colors group"
          >
            <FaLinkedin className="text-off-white group-hover:text-accent-cyan transition-colors" />
            <span className="font-mono group-hover:text-white transition-colors">LinkedIn</span>
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity font-mono text-sm text-accent-cyan">↗</span>
          </a>
        </Magnetic>
      </motion.div>
    </div>
    </PageTransition>
  );
}
