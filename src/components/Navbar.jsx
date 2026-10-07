import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home', icon: '⛵' },
  { path: '/events', label: 'Events', icon: '⚔️' },
  { path: '/venue', label: 'Venue Map', icon: '🗺️' },
  { path: '/register', label: 'Register', icon: '📜' },
  { path: '/contact', label: 'Contact', icon: '📡' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-wano-deep/95 backdrop-blur-md border-b border-wano-gold/20 shadow-gold'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 sm:gap-4 group py-1">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src="/wano_logo.png"
              alt="CybiTradic Wano Fest"
              className="h-11 sm:h-14 w-auto object-contain drop-shadow-[0_4px_12px_rgba(201,162,39,0.4)]"
            />
            <div className="hidden sm:block h-8 w-px bg-wano-gold/30" />
            <img
              src="/college_logo.jpg"
              alt="Sri Sai Ranganathan Engineering College"
              className="hidden md:block h-9 sm:h-10 w-auto object-contain bg-white rounded-lg px-2.5 py-1 shadow-md border border-wano-gold/30 hover:border-wano-gold/60 transition-all duration-200"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.filter(l => l.path !== '/register').map((link) => (
              <Link key={link.path} to={link.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`px-3.5 py-2 rounded-lg font-inter text-sm font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 relative group ${
                    location.pathname === link.path
                      ? 'text-wano-gold-light'
                      : 'text-white/70 hover:text-wano-gold'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-wano-gold to-transparent"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            <Link to="/venue">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-3 px-5 py-2.5 btn-gold rounded-xl text-sm font-extrabold tracking-wide flex items-center gap-2 shadow-gold"
              >
                <span className="text-base">🗺️</span>
                <span>VENUE MAP</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-wano-gold p-2.5 rounded-xl border border-wano-gold/30 bg-wano-gold/10"
            id="mobile-menu-btn"
          >
            <motion.div
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-bold"
            >
              {isOpen ? '✕' : '☰'}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-wano-deep/98 backdrop-blur-md border-t border-wano-gold/20"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.filter(l => l.path !== '/register').map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'border-wano-gold/50 bg-wano-gold/15 text-wano-gold-light font-bold'
                        : 'border-transparent text-white/70 hover:border-wano-gold/30 hover:text-wano-gold'
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-inter font-medium tracking-wide">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
              <Link to="/venue" className="mt-2">
                <button className="w-full btn-gold py-3 rounded-xl font-extrabold text-base flex items-center justify-center gap-2">
                  <span>🗺️</span>
                  <span>OPEN VENUE MAP</span>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
