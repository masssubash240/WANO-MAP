import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { searchBot, quickQuestions, floorImages } from '../data/botKnowledge';

const categoryColor = {
  'Technical': '#2563eb',
  'Non-Technical': '#db2777',
  'E-Sports': '#7c3aed',
  'Floor Info': '#c9a227',
  'General': '#10b981',
};

const greetings = [
  "Yohoho! 💀 Search any event, hall, floor, or coordinator — I'll find all details and blueprint locations on the map!",
  "Den Den Mushi connected! 🐌 Type an event (e.g. 'CTF', 'Coding', 'E-Sports', 'CAD Lab') to view complete venue info.",
  "Nami's Grand Line Map is ready! 🗺️ Search any event name or hall here.",
];

function BotMessage({ msg, isBot }) {
  const result = msg.result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold ${
        isBot ? 'bg-wano-gold/20 border border-wano-gold/50 shadow-md' : 'bg-wano-crimson/30 border border-wano-crimson/50'
      }`}>
        {isBot ? '🏴‍☠️' : '👤'}
      </div>

      <div className={`flex flex-col gap-1.5 max-w-[88%] ${isBot ? '' : 'items-end'}`}>
        {/* Text bubble */}
        <div className={`rounded-2xl px-4 py-3 text-sm font-inter leading-relaxed ${
          isBot
            ? 'bg-wano-navy/95 border border-wano-gold/25 text-white/90 rounded-tl-none shadow-lg'
            : 'bg-wano-crimson/35 border border-wano-crimson/40 text-white font-medium rounded-tr-none'
        }`}>
          {msg.text}
        </div>

        {/* Detailed Event / Venue Card */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="w-full rounded-2xl border overflow-hidden shadow-2xl bg-[#0a1220]"
            style={{ borderColor: `${categoryColor[result.category] || '#c9a227'}60` }}
          >
            {/* Top Category Header */}
            <div
              className="px-4 py-2 flex items-center justify-between text-xs font-bold text-white"
              style={{ background: `linear-gradient(90deg, ${categoryColor[result.category] || '#c9a227'} 0%, #0d1b2e 100%)` }}
            >
              <span className="flex items-center gap-1.5 font-cinzel tracking-wider uppercase">
                <span>{result.icon}</span>
                <span>{result.category}</span>
              </span>
              {result.bounty && (
                <span className="bg-amber-400/20 border border-amber-300/40 text-amber-300 px-2 py-0.5 rounded-full text-[10px]">
                  {result.bounty}
                </span>
              )}
            </div>

            {/* Blueprint Image Preview */}
            {floorImages[result.floorId] && (
              <div className="relative h-44 overflow-hidden group">
                <img
                  src={floorImages[result.floorId]}
                  alt={result.floor}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220] via-transparent to-black/30" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h4 className="font-cinzel text-wano-gold font-black text-base sm:text-lg leading-tight drop-shadow">
                      {result.event}
                    </h4>
                    <p className="text-white/80 font-inter text-xs flex items-center gap-1 mt-0.5">
                      <span>📍</span>
                      <span className="font-bold text-white">{result.venue}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-amber-300 font-semibold">{result.floor}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Event Info Details */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-inter bg-white/5 p-3 rounded-xl border border-white/5">
                {result.incharge && (
                  <div>
                    <span className="text-white/40 text-[10px] uppercase tracking-wider block">Faculty Incharge</span>
                    <span className="text-slate-200 font-semibold">{result.incharge}</span>
                  </div>
                )}
                {result.coordinator && (
                  <div>
                    <span className="text-white/40 text-[10px] uppercase tracking-wider block">Student Lead / Contact</span>
                    <span className="text-amber-400 font-semibold">{result.coordinator}</span>
                  </div>
                )}
                {result.teamSize && result.teamSize !== '—' && (
                  <div>
                    <span className="text-white/40 text-[10px] uppercase tracking-wider block">Team Size</span>
                    <span className="text-slate-200">{result.teamSize}</span>
                  </div>
                )}
                {result.duration && result.duration !== '—' && (
                  <div>
                    <span className="text-white/40 text-[10px] uppercase tracking-wider block">Timing / Duration</span>
                    <span className="text-slate-200">{result.duration}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-white/70 text-xs font-inter leading-relaxed">
                {result.description}
              </p>

              {/* Action Buttons: Phone & Open on Map */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {result.phone && (
                  <a
                    href={`tel:${result.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>📞</span>
                    <span>CALL LEAD</span>
                  </a>
                )}
                <Link
                  to="/venue"
                  className="flex-1 py-2.5 px-4 rounded-xl btn-gold text-xs font-black tracking-wider text-center flex items-center justify-center gap-1.5 shadow-gold"
                >
                  <span>🗺️</span>
                  <span>VIEW ON VENUE MAP</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function MapBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, text: greetings[Math.floor(Math.random() * greetings.length)], isBot: true, result: null },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSearch = async (query) => {
    if (!query || !query.trim()) return;
    const userMsg = { id: Date.now(), text: query, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setShowQuick(false);

    // Simulate bot typing
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsTyping(false);

    const result = searchBot(query);

    let botText;
    if (result) {
      botText = `Found full details for **${result.event}**! Located at **${result.venue}** (${result.floor}). Here is everything you need:`;
    } else {
      botText = `I couldn't locate "${query}" directly. Try searching an event like "CTF", "Coding", "Dance", "E-Sports", a hall like "CAD Lab", "IT Lab", "OAT", or click a quick suggestion below:`;
      setShowQuick(true);
    }

    const botMsg = { id: Date.now() + 1, text: botText, isBot: true, result };
    setMessages((prev) => [...prev, botMsg]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch(input);
  };

  return (
    <>
      {/* ── BIG PROMINENT FLOATING CHATBOT LAUNCHER BUTTON ── */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={isOpen ? {} : { y: [0, -6, 0] }}
        transition={isOpen ? {} : { duration: 2.2, repeat: Infinity }}
        className="fixed bottom-6 right-6 z-50 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full btn-gold shadow-2xl flex items-center gap-3 border-2 border-amber-300"
        id="map-bot-trigger"
        title="Open Wano Map Chatbot"
      >
        <span className="text-2xl sm:text-3xl animate-bounce">
          {isOpen ? '✕' : '🗺️'}
        </span>
        <div className="text-left font-cinzel">
          <span className="block text-xs sm:text-sm font-black text-black leading-tight tracking-wider">
            {isOpen ? 'CLOSE CHAT' : 'MAP CHATBOT'}
          </span>
          {!isOpen && (
            <span className="block text-[10px] text-black/75 font-inter font-bold leading-none">
              Search Event & Venue
            </span>
          )}
        </div>
      </motion.button>

      {/* ── EXPANDED CHAT PANEL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[480px] md:w-[520px] max-w-[95vw] flex flex-col rounded-3xl overflow-hidden border-2 border-wano-gold/50 shadow-2xl"
            style={{
              background: 'rgba(6, 14, 26, 0.98)',
              backdropFilter: 'blur(25px)',
              height: '82vh',
              maxHeight: '750px',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-wano-gold/30 bg-gradient-to-r from-wano-crimson/30 via-wano-navy/80 to-[#070e1b]">
              <div className="w-11 h-11 rounded-2xl bg-wano-gold/20 border border-wano-gold/50 flex items-center justify-center text-2xl shadow-md">
                🏴‍☠️
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel text-wano-gold text-base font-black leading-none">
                    Wano Map Chatbot
                  </h3>
                  <span className="text-[10px] font-bold bg-green-500/20 text-green-300 border border-green-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    LIVE SEARCH
                  </span>
                </div>
                <p className="text-white/50 text-xs font-inter mt-1">
                  Search any event, floor, hall, or coordinator phone
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setMessages([{ id: 0, text: greetings[0], isBot: true, result: null }]);
                    setShowQuick(true);
                  }}
                  className="text-white/40 hover:text-wano-gold text-xs px-2.5 py-1.5 rounded-xl border border-white/10 hover:border-wano-gold/40 transition-all font-inter"
                  title="Clear conversation"
                >
                  ↺ Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white text-base px-2.5 py-1.5 rounded-xl border border-white/10 hover:border-white/30 transition-all"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0">
              {messages.map((msg) => (
                <BotMessage key={msg.id} msg={msg} isBot={msg.isBot} />
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3 items-center"
                  >
                    <div className="w-9 h-9 rounded-full bg-wano-gold/20 border border-wano-gold/40 flex items-center justify-center text-sm">
                      🏴‍☠️
                    </div>
                    <div className="bg-wano-navy border border-wano-gold/30 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 shadow-md">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                          className="w-2 h-2 rounded-full bg-wano-gold"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Questions (Larger, bold clickable pills) */}
              <AnimatePresence>
                {showQuick && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="pt-2"
                  >
                    <p className="text-[11px] font-cinzel text-wano-gold/70 tracking-wider uppercase mb-2">
                      ⚡ Quick Map & Event Searches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((q) => (
                        <motion.button
                          key={q.query}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSearch(q.query)}
                          className="text-xs font-inter font-bold px-3.5 py-2 rounded-xl bg-wano-gold/15 border border-wano-gold/35 text-wano-gold-light hover:bg-wano-gold/30 hover:border-wano-gold transition-all duration-200 shadow-sm"
                        >
                          {q.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input Form */}
            <div className="p-3.5 sm:p-4 border-t border-wano-gold/25 bg-[#070e1a]/95">
              <div className="flex gap-2.5 items-center">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search event name, hall, coordinator, or floor..."
                  className="wano-input flex-1 px-4 py-3 rounded-2xl text-sm font-inter text-white placeholder-white/40 focus:ring-2 focus:ring-wano-gold/50"
                  id="map-bot-input"
                />
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSearch(input)}
                  disabled={!input.trim()}
                  className="btn-gold px-5 py-3 rounded-2xl flex items-center justify-center text-sm font-black disabled:opacity-40 shadow-gold"
                  id="map-bot-send"
                >
                  <span>SEARCH</span>
                  <span className="ml-1 text-base">➔</span>
                </motion.button>
              </div>
              <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-white/40 font-inter">
                <span>📍 Full campus blueprints & hall registry</span>
                <Link to="/venue" className="text-wano-gold hover:underline font-semibold">
                  Open Full Venue Map ➔
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
