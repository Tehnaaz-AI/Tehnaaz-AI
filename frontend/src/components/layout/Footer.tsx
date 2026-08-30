import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ENV } from '../../config/env';

export function Footer() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <footer className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-black flex items-center justify-between px-6 md:px-12 z-40 text-xs md:text-sm font-organic-mono font-bold uppercase tracking-widest text-black">
      {/* Social Links (Left) */}
      <div className="flex items-center gap-6">
        <span className="hidden md:inline-block">{ENV.PORTFOLIO_OWNER}</span>
        <div className="flex gap-4 md:gap-8 text-black/60">
          <a href={ENV.GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-black transition-colors flex items-center gap-2">
            <FaGithub size={16} /> GitHub
          </a>
          <a href={ENV.LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-black transition-colors flex items-center gap-2">
            <FaLinkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
      <div>
        <a 
          href={`mailto:${ENV.CONTACT_EMAIL}`} 
          onClick={() => setShowEmail(true)}
          className="text-black hover:text-black/60 transition-colors"
        >
          {showEmail ? ENV.CONTACT_EMAIL : "Get in Touch ↗"}
        </a>
      </div>
    </footer>
  );
}
