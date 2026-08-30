import { motion } from 'framer-motion';
import { Magnetic } from '../ui/Magnetic';
import { NavLink, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  const links = [
    { href: '/', label: 'Core' },
    { href: '/projects', label: 'Projects' },
    { href: '/skills', label: 'Skills' },
    { href: '/journey', label: 'Journey' },
  ];

  return (
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
      </div>
    </header>
  );
}
