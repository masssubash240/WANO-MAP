import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from '../components/EventCard';
import { technicalEvents, nonTechnicalEvents, esportsEvents } from '../data/events';

const tabs = [
  { id: 'all', label: 'All Events', icon: '🌊', count: technicalEvents.length + nonTechnicalEvents.length + esportsEvents.length },
  { id: 'technical', label: 'Technical', icon: '⚙️', count: technicalEvents.length },
  { id: 'nonTechnical', label: 'Non-Technical', icon: '🎭', count: nonTechnicalEvents.length },
  { id: 'esports', label: 'E-Sports', icon: '🎮', count: esportsEvents.length },
];

const allEventsWithCategory = [
  ...technicalEvents.map((e) => ({ ...e, category: 'technical' })),
  ...nonTechnicalEvents.map((e) => ({ ...e, category: 'nonTechnical' })),
  ...esportsEvents.map((e) => ({ ...e, category: 'esports' })),
];

export default function Events() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = {
    all: allEventsWithCategory,
    technical: technicalEvents.map((e) => ({ ...e, category: 'technical' })),
    nonTechnical: nonTechnicalEvents.map((e) => ({ ...e, category: 'nonTechnical' })),
    esports: esportsEvents.map((e) => ({ ...e, category: 'esports' })),
  };

  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.toLowerCase();
    return allEventsWithCategory.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.incharge && e.incharge.toLowerCase().includes(q)) ||
        (e.floor && e.floor.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const events = isSearching ? searchResults : filtered[activeTab];

  return (
    <div className="min-h-screen pt-20 wano-bg">
      {/* Page Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wano-crimson/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wano-gold/40 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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

            <p className="font-cinzel text-wano-gold/70 text-xs sm:text-sm tracking-[0.4em] uppercase mb-2">⚔️ THE GRAND TOURNAMENT • ALL CHALLENGES ⚔️</p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-black gold-text mb-3">Festival Events</h1>
            <div className="ornament-line max-w-xs mx-auto mb-4" />
            <p className="text-white/60 font-inter max-w-xl mx-auto text-sm sm:text-base">
              Choose your battleground, explore venues across the campus, and prove your worth across {technicalEvents.length + nonTechnicalEvents.length + esportsEvents.length} electrifying events.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* magnifier */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-wano-gold/60 text-lg pointer-events-none select-none">
            🔍
          </span>
          <input
            id="event-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event name, venue, incharge…"
            className="wano-input w-full pl-12 pr-14 py-3.5 rounded-2xl font-inter text-sm tracking-wide"
          />
          {/* live count badge */}
          <AnimatePresence>
            {searchQuery.trim().length > 0 && (
              <motion.span
                key="count"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-cinzel font-bold px-2.5 py-1 rounded-full bg-wano-gold/20 text-wano-gold border border-wano-gold/30"
              >
                {searchResults.length}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 bg-wano-dark/95 backdrop-blur-md border-b border-wano-gold/20">
        <div className={`max-w-6xl mx-auto px-4 transition-all duration-300 ${isSearching ? 'opacity-0 pointer-events-none h-0 overflow-hidden py-0' : ''}`}>
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-cinzel text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-wano-gold/20 border border-wano-gold/60 text-wano-gold-light shadow-gold'
                    : 'border border-transparent text-white/50 hover:text-wano-gold hover:border-wano-gold/30'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-wano-gold/30 text-wano-gold' : 'bg-white/10 text-white/40'
                }`}>
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events.length === 0 && isSearching ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full flex flex-col items-center py-20 gap-4"
              >
                <span className="text-5xl">⚓</span>
                <p className="font-cinzel text-wano-gold text-xl font-bold">No Events Found</p>
                <p className="text-white/40 font-inter text-sm">Try a different keyword or clear the search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 btn-wano px-6 py-2 rounded-lg text-sm font-semibold"
                >
                  Clear Search
                </button>
              </motion.div>
            ) : (
              events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} category={event.category} />
            ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Venue Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card rounded-2xl p-8"
        >
          <h3 className="font-cinzel text-wano-gold text-xl font-bold mb-6 text-center">📍 Venue Quick Reference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                floor: 'Ground Floor',
                bg: 'bg-red-900/20 border-red-500/20',
                events: ['Red Line Rush → Ground', 'Nika\'s Dance → Open Auditorium', 'Bink\'s Rhythm → Open Auditorium', 'Pirate Portraits → Seminar Hall', 'Grand Line Visuals → Seminar Hall', 'Straw Hat Studio → Webinar Hall'],
              },
              {
                floor: 'First Floor',
                bg: 'bg-blue-900/20 border-blue-500/20',
                events: ['Coding Challenge → CAD Lab', 'UI/UX Design → CAD Lab'],
              },
              {
                floor: 'Second Floor',
                bg: 'bg-green-900/20 border-green-500/20',
                events: ['Will of D → LH 28', 'AI Prompt → IT Lab', 'CTF → IT Lab', 'Paper Presentation → LH 25, 24, 23, 21, 20'],
              },
              {
                floor: 'Third Floor',
                bg: 'bg-purple-900/20 border-purple-500/20',
                events: ['E-Sports → Auditorium', 'Paper Presentation → SH 06, Alumni Cell'],
              },
            ].map((section) => (
              <div key={section.floor} className={`rounded-xl p-4 border ${section.bg}`}>
                <h4 className="font-cinzel text-wano-gold text-sm font-bold mb-3">{section.floor}</h4>
                <ul className="space-y-1.5">
                  {section.events.map((e) => {
                    const [name, venue] = e.split(' → ');
                    return (
                      <li key={e} className="text-xs font-inter">
                        <span className="text-white/70">{name}</span>
                        <span className="text-white/30"> → </span>
                        <span className="text-wano-gold/60">{venue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
