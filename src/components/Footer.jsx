import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-wano-deep border-t border-wano-gold/20 pt-16 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-wano-gold to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-wano-gold/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex flex-col gap-3 mb-4">
              <img
                src="/wano_logo.png"
                alt="CybiTradic Wano Fest"
                className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(201,162,39,0.4)]"
              />
              <img
                src="/college_logo.jpg"
                alt="Sri Sai Ranganathan Engineering College"
                className="h-10 sm:h-12 w-fit object-contain rounded-xl bg-white px-3 py-1 shadow border border-wano-gold/30"
              />
            </div>
            <p className="font-noto text-white/50 text-sm leading-relaxed italic">
              "Different Crews, One Destination"
            </p>
            <div className="mt-3 flex items-center gap-2 text-wano-gold/80 text-xs sm:text-sm font-inter">
              <span>📅</span>
              <span>October 9, 2026 • Sri Sai Ranganathan Engineering College</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-wano-gold text-sm font-bold tracking-widest mb-4 uppercase">Navigation</h4>
            <div className="ornament-line mb-4" />
            <ul className="flex flex-col gap-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/events', label: 'Events' },
                { to: '/venue', label: 'Venue Map' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/50 hover:text-wano-gold transition-colors duration-200 text-sm font-inter flex items-center gap-2 group"
                  >
                    <span className="text-wano-gold/0 group-hover:text-wano-gold transition-all duration-200">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="font-cinzel text-wano-gold text-sm font-bold tracking-widest mb-4 uppercase">Events</h4>
            <div className="ornament-line mb-4" />
            <ul className="flex flex-col gap-2 text-sm text-white/50 font-inter">
              <li className="flex items-center gap-2"><span className="text-blue-400">⚙️</span> Technical Events (6)</li>
              <li className="flex items-center gap-2"><span className="text-pink-400">🎭</span> Non-Technical Events (7)</li>
              <li className="flex items-center gap-2"><span className="text-purple-400">🎮</span> E-Sports (1)</li>
              <li className="mt-3 flex items-center gap-2 text-wano-gold/60"><span>📍</span> Sri Sai Ranganathan Engineering College</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-wano-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-inter text-center">
            © 2026 Cybitrodic Wano Fest • SSREC • All Rights Reserved
          </p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-wano-gold/50 text-xs font-cinzel tracking-widest text-center"
          >
            ⚓ SET SAIL FOR THE GRAND LINE ⚓
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
