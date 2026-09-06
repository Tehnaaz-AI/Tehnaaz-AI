import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '../ui/Magnetic';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { href: '/', label: 'Core' },
    { href: '/projects', label: 'Projects' },
    { href: '/skills', label: 'Skills' },
    { href: '/journey', label: 'Journey' },
  ];

  return (
    <>
    <header className="z-50 w-max border border-black bg-white/60 backdrop-blur-xl rounded-full shadow-sm transition-all duration-300">
      <div className="px-6 md:px-8 h-14 flex items-center justify-between gap-8 md:gap-16">
        <Magnetic intensity={0.1}>
          <NavLink 
            to="/" 
            className="text-black font-organic-sans font-black tracking-tighter text-lg flex items-center gap-2 group uppercase cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform duration-300 shrink-0"></span>
            <span className="whitespace-nowrap overflow-hidden">
              Tehnaaz Fathima
            </span>
          </NavLink>
        </Magnetic>
        
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Magnetic key={link.href} intensity={0.15}>
                <NavLink
                  to={link.href}
                  className={`block text-xs font-organic-mono font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-black/50 hover:text-black'
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-px bg-black"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </span>
                </NavLink>
              </Magnetic>
            );
          })}
          <Magnetic intensity={0.2}>
            <NavLink 
              to="/contact" 
              className={`block text-xs font-organic-mono font-bold uppercase tracking-widest px-5 py-2 border rounded-full transition-colors duration-300 ${
                location.pathname === '/contact' 
                  ? 'bg-black text-white border-black' 
                  : 'border-black/20 text-black hover:bg-black hover:text-white hover:border-black'
              }`}
            >
              Contact
            </NavLink>
          </Magnetic>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>
    </header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center"
        >
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-black/80 transition-colors z-50 focus:outline-none"
            aria-label="Close menu"
          >
            <span className="text-xl font-bold">×</span>
          </button>
          
          <nav className="flex flex-col items-center gap-8">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={`text-3xl font-organic-sans font-black uppercase tracking-tighter transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-black/50 hover:text-black'
                  }`}
                >
                  {link.label}
                </NavLink>
              );
            })}
            <NavLink 
              to="/contact" 
              className={`mt-4 text-xl font-organic-mono font-bold uppercase tracking-widest px-8 py-3 border-2 rounded-full transition-colors duration-300 ${
                location.pathname === '/contact' 
                  ? 'bg-black text-white border-black' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              Contact
            </NavLink>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
