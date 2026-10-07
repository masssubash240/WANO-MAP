import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REGISTER_URL = 'https://wano-fest-five.vercel.app/';

const floors = [
  {
    id: 'ground',
    label: 'Ground Floor',
    emoji: '🏟️',
    image: '/ground_floor.jpg',
    glowColor: 'rgba(139,0,0,0.5)',
    description: 'Dance, Music, Art, Photography, Sports & Project Expo',
    events: [
      { name: 'Red Line Rush', venue: 'GROUND (Open Area)', incharge: 'Srimathi', color: '#dc2626', icon: '🏃', category: 'Non-Technical' },
      { name: 'Dance Arena', venue: 'OAT (Open Auditorium)', incharge: 'Pavithra, Priyadarshini', color: '#9333ea', icon: '💃', category: 'Non-Technical' },
      { name: 'Bink Rhythm', venue: 'OAT (Open Auditorium)', incharge: 'Pavithra, Priyadarshini', color: '#2563eb', icon: '🎵', category: 'Non-Technical' },
      { name: 'Pirate Portraits', venue: 'Seminar Hall', incharge: 'Bhuvaneshwari', color: '#d97706', icon: '🖌️', category: 'Non-Technical' },
      { name: 'Grand Line Visuals', venue: 'Seminar Hall', incharge: 'Bhuvaneshwari', color: '#059669', icon: '📸', category: 'Non-Technical' },
      { name: 'Straw Hat Studio', venue: 'Webinar Hall', incharge: 'Kalaiarasi', color: '#db2777', icon: '🎬', category: 'Non-Technical' },
      { name: 'Project Expo', venue: 'IQAC', incharge: 'Saranya', color: '#7c3aed', icon: '🔬', category: 'Technical' },
    ],
  },
  {
    id: 'first',
    label: 'First Floor',
    emoji: '🖥️',
    image: '/first_floor.jpg',
    glowColor: 'rgba(37,99,235,0.5)',
    description: 'Coding Challenge & UI/UX Design in CAD Lab',
    events: [
      { name: 'Coding Challenge', venue: 'CAD LAB', incharge: 'Aniyarasi', color: '#2563eb', icon: '⚔️', category: 'Technical' },
      { name: 'UI/UX Challenge', venue: 'CAD LAB', incharge: 'Aniyarasi', color: '#7c3aed', icon: '🎨', category: 'Technical' },
    ],
  },
  {
    id: 'second',
    label: 'Second Floor',
    emoji: '📡',
    image: '/second_floor.jpg',
    glowColor: 'rgba(22,163,74,0.5)',
    description: 'Will of D, AI Prompt, CTF & Paper Presentations',
    events: [
      { name: 'Will of D', venue: 'LH 28', incharge: 'Swathi', color: '#dc2626', icon: '🌀', category: 'Non-Technical' },
      { name: 'AI Prompt', venue: 'IT LAB', incharge: 'Vaishnavi', color: '#0891b2', icon: '🤖', category: 'Technical' },
      { name: 'Capture the Flag', venue: 'IT LAB', incharge: 'Vaishnavi', color: '#16a34a', icon: '🏴', category: 'Technical' },
      { name: 'Paper Presentation', venue: 'LH 25, LH 24, LH 23, LH 29, ALUMINI CELL', incharge: 'Sandhiya, Sowmika, Nithya, Tholhappiyan, Ishwariya', color: '#d97706', icon: '📜', category: 'Technical' },
    ],
  },
  {
    id: 'third',
    label: 'Third Floor',
    emoji: '🎮',
    image: '/third_floor.jpg',
    glowColor: 'rgba(124,58,237,0.5)',
    description: 'E-Sports at Auditorium & Pitch at Communication Lab',
    events: [
      { name: 'E-Sports', venue: 'AUDITORIUM', incharge: '—', color: '#7c3aed', icon: '🎮', category: 'E-Sports' },
      { name: 'Pitch', venue: 'COMMUNICATION SYSTEM LAB', incharge: 'Sudhakar', color: '#f59e0b', icon: '⚡', category: 'Technical' },
      { name: 'Paper Presentation', venue: 'SH 06, SH 05, LH 06, LH 05, LH 20, LH 21', incharge: 'Meera Devi, Maheswari, Sowmiya, Ishwariya', color: '#d97706', icon: '📜', category: 'Technical' },
    ],
  },
];

const categoryBadge = {
  'Technical': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Non-Technical': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'E-Sports': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

export default function VenueMap() {
  const [activeFloor, setActiveFloor] = useState('ground');
  const floor = floors.find((f) => f.id === activeFloor);

  return (
    <div className="min-h-screen pt-20 wano-bg">
      {/* ── Header ── */}
      <div className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wano-teal/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wano-gold/40 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Logos */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-5">
              <img
                src="/college_logo.jpg"
                alt="Sri Sai Ranganathan Engineering College"
                className="h-11 sm:h-14 object-contain rounded-xl bg-white px-3.5 py-1.5 shadow-lg border border-wano-gold/40"
              />
              <img
                src="/wano_logo.png"
                alt="CybiTradic Wano Fest"
                className="h-14 sm:h-20 object-contain drop-shadow-[0_8px_20px_rgba(201,162,39,0.4)]"
              />
            </div>

            <p className="font-cinzel text-wano-gold/70 text-xs sm:text-sm tracking-[0.4em] uppercase mb-2">
              🗺️ GRAND LINE CAMPUS BLUEPRINT
            </p>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-black gold-text mb-3">Interactive Venue Map</h1>
            <div className="ornament-line max-w-xs mx-auto mb-3" />
            <p className="text-white/60 font-inter max-w-xl mx-auto text-sm sm:text-base">
              Sri Sai Ranganathan Engineering College • Tap any floor below to reveal hall blueprints and event locations.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* ── BIG FLOOR SELECTOR BUTTONS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12">
          {floors.map((f) => (
            <motion.button
              key={f.id}
              onClick={() => setActiveFloor(f.id)}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 relative overflow-hidden group shadow-xl ${
                activeFloor === f.id
                  ? 'bg-gradient-to-b from-wano-gold/25 to-[#0b1626] border-wano-gold text-wano-gold shadow-gold-lg'
                  : 'border-wano-gold/25 bg-[#081220]/80 text-white/70 hover:border-wano-gold/60 hover:text-white'
              }`}
              style={activeFloor === f.id ? { boxShadow: `0 0 30px ${f.glowColor}` } : {}}
            >
              <span className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {f.emoji}
              </span>
              <span className="font-cinzel text-base sm:text-lg font-black tracking-wide leading-tight text-center">
                {f.label}
              </span>
              <span className={`mt-2 text-xs font-bold px-3 py-1 rounded-full ${
                activeFloor === f.id
                  ? 'bg-wano-gold/30 text-wano-gold-light border border-wano-gold/50'
                  : 'bg-white/10 text-white/60'
              }`}>
                {f.events.length} Events Inside
              </span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFloor}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* Floor Title */}
            <div className="text-center mb-6">
              <h2 className="font-cinzel text-wano-gold text-2xl sm:text-3xl font-bold mb-1">
                {floor.emoji} {floor.label}
              </h2>
              <p className="text-white/50 font-inter text-sm">{floor.description}</p>
            </div>

            {/* ── Blueprint Image ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full rounded-2xl overflow-hidden mb-8 border border-wano-gold/20"
              style={{ boxShadow: `0 0 60px ${floor.glowColor}` }}
            >
              <img
                src={floor.image}
                alt={`${floor.label} Blueprint`}
                className="w-full object-cover"
                style={{ maxHeight: '520px', objectPosition: 'center' }}
              />
              {/* Gold overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-wano-dark/80 to-transparent pointer-events-none" />
              {/* Floor badge */}
              <div className="absolute top-4 left-4 bg-wano-dark/80 backdrop-blur-sm border border-wano-gold/40 rounded-lg px-4 py-2">
                <span className="font-cinzel text-wano-gold text-sm font-bold tracking-widest">{floor.label}</span>
              </div>
              {/* Event count badge */}
              <div className="absolute top-4 right-4 bg-wano-gold/20 backdrop-blur-sm border border-wano-gold/40 rounded-lg px-3 py-2">
                <span className="font-cinzel text-wano-gold-light text-xs font-bold">{floor.events.length} Events Here</span>
              </div>
            </motion.div>

            {/* ── Events on this Floor ── */}
            <div className="mb-8">
              <h3 className="font-cinzel text-wano-gold text-lg font-bold mb-5 text-center tracking-wide">
                ⚔️ Events on {floor.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {floor.events.map((event, i) => (
                  <motion.div
                    key={event.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="glass-card rounded-xl overflow-hidden border relative group"
                    style={{ borderColor: `${event.color}40` }}
                  >
                    {/* Color top bar */}
                    <div className="h-1 w-full" style={{ background: event.color }} />

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{event.icon}</span>
                          <h4 className="font-cinzel font-bold text-base" style={{ color: event.color }}>
                            {event.name}
                          </h4>
                        </div>
                        <span className={`text-xs font-inter font-semibold px-2 py-0.5 rounded-full border ${categoryBadge[event.category] || ''}`}>
                          {event.category}
                        </span>
                      </div>

                      {/* Venue */}
                      <div className="flex items-start gap-2 mb-2 text-sm">
                        <span className="text-wano-gold mt-0.5 flex-shrink-0">📍</span>
                        <span className="text-white/70 font-inter leading-snug">{event.venue}</span>
                      </div>

                      {/* Incharge */}
                      {event.incharge !== '—' && (
                        <div className="flex items-start gap-2 mb-3 text-sm">
                          <span className="text-wano-gold mt-0.5 flex-shrink-0">👤</span>
                          <span className="text-white/60 font-inter leading-snug">{event.incharge}</span>
                        </div>
                      )}

                      {/* Register Button */}
                      <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full btn-wano py-2 rounded-lg text-xs font-semibold mt-1"
                        >
                          ⚡ Register
                        </motion.button>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Hall Details Table ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl border border-wano-gold/20 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-wano-gold/10 bg-wano-gold/5">
                <h3 className="font-cinzel text-wano-gold text-base font-bold tracking-wide">
                  📋 {floor.label} — Hall Details
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-inter">
                  <thead>
                    <tr className="border-b border-wano-gold/10 bg-wano-navy/50">
                      <th className="text-left px-5 py-3 text-wano-gold/70 font-semibold tracking-wide text-xs uppercase">Event</th>
                      <th className="text-left px-5 py-3 text-wano-gold/70 font-semibold tracking-wide text-xs uppercase">Hall / Venue</th>
                      <th className="text-left px-5 py-3 text-wano-gold/70 font-semibold tracking-wide text-xs uppercase">Incharge</th>
                      <th className="text-left px-5 py-3 text-wano-gold/70 font-semibold tracking-wide text-xs uppercase">Category</th>
                      <th className="text-left px-5 py-3 text-wano-gold/70 font-semibold tracking-wide text-xs uppercase">Register</th>
                    </tr>
                  </thead>
                  <tbody>
                    {floor.events.map((event, i) => (
                      <tr
                        key={event.name}
                        className={`border-b border-wano-gold/5 hover:bg-wano-gold/5 transition-colors duration-150 ${i % 2 === 0 ? 'bg-wano-dark/20' : ''}`}
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span>{event.icon}</span>
                            <span className="font-medium text-white/90">{event.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-wano-gold/80 font-medium">{event.venue}</span>
                        </td>
                        <td className="px-5 py-3 text-white/60">{event.incharge}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${categoryBadge[event.category] || ''}`}>
                            {event.category}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              className="text-xs btn-gold px-3 py-1 rounded-full font-bold"
                            >
                              Register →
                            </motion.button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ── All Floors Quick Reference ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="font-cinzel text-wano-gold text-xl font-bold text-center mb-6 tracking-wide">
            🏛️ Complete Venue Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {floors.map((f) => (
              <motion.button
                key={f.id}
                onClick={() => { setActiveFloor(f.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card rounded-xl overflow-hidden border border-wano-gold/20 text-left group cursor-pointer"
                style={{ boxShadow: activeFloor === f.id ? `0 0 20px ${f.glowColor}` : 'none' }}
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={f.image} alt={f.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-wano-dark via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <span className="font-cinzel text-wano-gold font-bold text-sm">{f.emoji} {f.label}</span>
                  </div>
                </div>
                <div className="p-4">
                  <ul className="space-y-1">
                    {f.events.map((e) => (
                      <li key={e.name} className="flex items-center gap-2 text-xs font-inter text-white/60">
                        <span style={{ color: e.color }}>{e.icon}</span>
                        <span className="truncate">{e.name}</span>
                        <span className="text-wano-gold/40 text-xs ml-auto flex-shrink-0">→ {e.venue.split(',')[0]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 glass-card rounded-xl p-5 border border-wano-gold/20 flex flex-wrap gap-4 justify-center"
        >
          {[
            { color: '#2563eb', label: 'Technical Venue' },
            { color: '#db2777', label: 'Non-Technical Venue' },
            { color: '#7c3aed', label: 'E-Sports Venue' },
            { color: '#d97706', label: 'Paper Presentation' },
            { color: '#f59e0b', label: 'Pitch / Seminar' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
              <span className="text-white/60 font-inter text-xs">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
