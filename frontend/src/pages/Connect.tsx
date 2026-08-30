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

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen py-32 gap-12 text-center max-w-2xl mx-auto">
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
            className="p-2 text-off-white hover:text-accent-cyan transition-colors"
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
            className="flex w-full items-center gap-4 border border-black/20 hover:border-black bg-transparent hover:bg-black p-4 rounded-lg transition-colors group"
          >
            <FaGithub className="text-black group-hover:text-white transition-colors" />
            <span className="font-mono text-black group-hover:text-white transition-colors">GitHub</span>
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity font-mono text-sm text-white">↗</span>
          </a>
        </Magnetic>

        <Magnetic intensity={0.1}>
          <a 
            href="https://www.linkedin.com/in/tehnaazfathima/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex w-full items-center gap-4 border border-black/20 hover:border-black bg-transparent hover:bg-black p-4 rounded-lg transition-colors group"
          >
            <FaLinkedin className="text-black group-hover:text-white transition-colors" />
            <span className="font-mono text-black group-hover:text-white transition-colors">LinkedIn</span>
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity font-mono text-sm text-white">↗</span>
          </a>
        </Magnetic>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full mt-12 border-t border-charcoal-700 pt-12"
      >
        <h2 className="text-2xl font-bold mb-6 font-sans">Send a Message or Doubt</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-mono text-off-white/70">Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-charcoal-800/50 border border-charcoal-700 rounded p-3 text-off-white focus:outline-none focus:border-accent-cyan transition-colors"
              placeholder="Your Name"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-mono text-off-white/70">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-charcoal-800/50 border border-charcoal-700 rounded p-3 text-off-white focus:outline-none focus:border-accent-cyan transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-mono text-off-white/70">Message</label>
            <textarea 
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-charcoal-800/50 border border-charcoal-700 rounded p-3 text-off-white focus:outline-none focus:border-accent-cyan transition-colors resize-y"
              placeholder="Post a doubt, say hi, or share an idea..."
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className={`mt-4 p-3 rounded font-mono font-bold transition-all ${
              status === 'success' ? 'bg-green-50 text-green-700 border border-green-500' :
              status === 'error' ? 'bg-red-50 text-red-700 border border-red-500' :
              'bg-black text-white hover:bg-black/80'
            }`}
          >
            {status === 'loading' ? 'Sending...' : 
             status === 'success' ? 'Message Sent!' : 
             status === 'error' ? 'Error sending message' : 
             'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
    </PageTransition>
  );
}
