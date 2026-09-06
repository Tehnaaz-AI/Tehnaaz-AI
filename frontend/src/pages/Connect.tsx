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
      const endpoint = ENV.API_URL ? `${ENV.API_URL}/api/contact` : '/api/contact';
      const response = await fetch(endpoint, {
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
      <div className="w-full min-h-screen bg-white text-black selection:bg-black selection:text-white px-4 sm:px-6 pt-24 sm:pt-28 pb-32">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto gap-8 sm:gap-10 text-center">
          
          <div>
            <div className="mb-4 text-black font-black bg-black/5 px-4 py-1.5 rounded-full border border-black/10 shadow-sm text-xs sm:text-sm uppercase tracking-widest inline-block">
              Get in Touch
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black leading-tight"
            >
              Let's Build Something Great.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-black/70 font-organic-mono text-xs sm:text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed"
            >
              Open for collaborations, interesting conversations, internships, and building intelligent software.
            </motion.p>
          </div>

          {/* Contact Direct Links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col w-full gap-3 sm:gap-4"
          >
            {/* Copy Email Box */}
            <div className="flex items-center justify-between border-2 border-black bg-white p-3 sm:p-4 rounded-xl shadow-[4px_4px_0_0_#000]">
              <div className="flex items-center gap-3 truncate pr-2">
                <FaEnvelope className="text-black shrink-0" size={18} />
                <span className="font-organic-mono text-xs sm:text-sm font-bold text-black truncate">{email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 text-black hover:bg-black/5 rounded-lg transition-colors shrink-0"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copied ? <FaCheck size={16} className="text-green-600" /> : <FaRegCopy size={16} />}
              </button>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Magnetic intensity={0.1}>
                <a
                  href={ENV.GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between gap-3 border-2 border-black bg-white hover:bg-black text-black hover:text-white p-3.5 sm:p-4 rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <FaGithub size={18} />
                    <span className="font-organic-mono text-xs sm:text-sm font-bold uppercase tracking-wider">GitHub</span>
                  </div>
                  <span className="font-mono text-sm">↗</span>
                </a>
              </Magnetic>

              <Magnetic intensity={0.1}>
                <a
                  href={ENV.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between gap-3 border-2 border-black bg-white hover:bg-black text-black hover:text-white p-3.5 sm:p-4 rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <FaLinkedin size={18} />
                    <span className="font-organic-mono text-xs sm:text-sm font-bold uppercase tracking-wider">LinkedIn</span>
                  </div>
                  <span className="font-mono text-sm">↗</span>
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full border-t-2 border-black pt-8 sm:pt-10 text-left"
          >
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black mb-6 text-center sm:text-left">
              Send a Direct Message
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs sm:text-sm font-organic-mono font-bold uppercase tracking-wider text-black">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white border-2 border-black rounded-lg p-3 text-xs sm:text-sm font-organic-mono text-black placeholder:text-black/40 focus:outline-none focus:shadow-[4px_4px_0_0_#000] transition-all"
                  placeholder="e.g. Alex Smith"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs sm:text-sm font-organic-mono font-bold uppercase tracking-wider text-black">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white border-2 border-black rounded-lg p-3 text-xs sm:text-sm font-organic-mono text-black placeholder:text-black/40 focus:outline-none focus:shadow-[4px_4px_0_0_#000] transition-all"
                  placeholder="alex@company.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs sm:text-sm font-organic-mono font-bold uppercase tracking-wider text-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-white border-2 border-black rounded-lg p-3 text-xs sm:text-sm font-organic-mono text-black placeholder:text-black/40 focus:outline-none focus:shadow-[4px_4px_0_0_#000] transition-all resize-y"
                  placeholder="Say hi, ask a doubt, or share an exciting opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`mt-2 py-3.5 px-6 rounded-lg font-mono font-bold text-xs sm:text-sm uppercase tracking-widest border-2 md:border-4 border-black transition-all duration-300 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] ${
                  status === 'success'
                    ? 'bg-green-500 text-white'
                    : status === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-black text-white hover:bg-white hover:text-black hover:-translate-y-0.5'
                }`}
              >
                {status === 'loading'
                  ? 'Sending...'
                  : status === 'success'
                  ? '✓ Message Sent Successfully!'
                  : status === 'error'
                  ? 'Error Sending Message - Try Again'
                  : 'Send Message ➔'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
