import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';
import SakuraPetals from '../components/SakuraPetals';
import { technicalEvents, nonTechnicalEvents, esportsEvents } from '../data/events';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const stats = [
  { value: '14+', label: 'Events', icon: '⚔️' },
  { value: '3', label: 'Floors', icon: '🏛️' },
  { value: '1', label: 'Day', icon: '📅' },
  { value: '∞', label: 'Memories', icon: '🌊' },
];

const highlights = [
  { icon: '⚙️', title: 'Technical Events', desc: '6 challenges — Coding, UI/UX, AI, CTF, Paper Presentation & Project Expo', color: 'from-blue-900/40 to-wano-navy', border: 'border-blue-500/20', count: technicalEvents.length },
  { icon: '🎭', title: 'Non-Technical Events', desc: '7 fun-filled events — Dance, Music, Art, Photography, Shorts & more', color: 'from-pink-900/40 to-wano-navy', border: 'border-pink-500/20', count: nonTechnicalEvents.length },
  { icon: '🎮', title: 'E-Sports', desc: 'Gaming tournament at the Auditorium — Battle for the digital Grand Line', color: 'from-purple-900/40 to-wano-navy', border: 'border-purple-500/20', count: esportsEvents.length },
];

export default function Home() {
  const canvasRef = useRef(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));
    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,162,39,${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <SakuraPetals count={15} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center wano-bg overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Background radial glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-wano-crimson/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-wano-gold/5 blur-[100px] pointer-events-none" />

        {/* Hero gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-wano-dark/20 via-transparent to-wano-dark z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24">
          {/* College Logo Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <img
              src="/college_logo.jpg"
              alt="Sri Sai Ranganathan Engineering College"
              className="h-14 sm:h-16 md:h-20 object-contain rounded-2xl bg-white px-5 py-2 shadow-2xl border-2 border-wano-gold/50 hover:border-wano-gold transition-colors"
            />
          </motion.div>

          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-3 bg-wano-gold/15 border border-wano-gold/40 rounded-full px-6 py-2 mb-4 shadow-md"
          >
            <span className="text-wano-gold text-xs sm:text-sm font-cinzel font-bold tracking-[0.25em] uppercase">
              🏴‍☠️ OCT 9, 2026 • SSREC OAT • NATIONAL SYMPOSIUM
            </span>
          </motion.div>

          {/* Main 3D Title Logo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
            className="my-3 flex justify-center"
          >
            <img
              src="/wano_logo.png"
              alt="CybiTradic Wano Fest 2026"
              className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[700px] object-contain drop-shadow-[0_12px_35px_rgba(201,162,39,0.5)] hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Japanese kanji decorative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-4 my-4"
          >
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-wano-gold/50" />
            <span className="font-noto text-wano-gold/80 text-2xl tracking-[0.5em]">和の国</span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-wano-gold/50" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-noto italic text-white/70 text-lg sm:text-2xl tracking-wide mb-10"
          >
            "Different Crews, One Destination"
          </motion.p>

          {/* Countdown */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mb-10"
          >
            <Countdown />
          </motion.div>

          {/* BIG VENUE MAP & EVENTS BUTTONS (Register removed) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Link to="/venue">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold px-9 sm:px-11 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-black tracking-wider shadow-gold-lg flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <span className="text-2xl">🗺️</span>
                <span>EXPLORE FULL VENUE MAP</span>
              </motion.button>
            </Link>
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-cinzel font-bold border-2 border-wano-gold/50 text-wano-gold hover:bg-wano-gold/15 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>⚔️</span>
                <span>BROWSE ALL EVENTS</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="mt-16 flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs font-inter tracking-widest uppercase">Scroll to Explore</span>
            <span className="text-2xl">↓</span>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-wano-dark relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wano-gold/30 to-transparent" />
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center wano-border rounded-xl py-6 px-4 bg-wano-navy/50"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-cinzel text-3xl sm:text-4xl font-black gold-text mb-1">{stat.value}</div>
                <div className="text-white/50 text-sm font-inter tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT HIGHLIGHTS ── */}
      <section className="py-20 wano-bg relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wano-gold/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-cinzel text-wano-gold/60 text-sm tracking-[0.4em] uppercase mb-3">The Grand Line Awaits</p>
            <h2 className="section-title gold-text mb-4">Event Categories</h2>
            <div className="ornament-line max-w-xs mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-gradient-to-br ${h.color} border ${h.border} rounded-2xl p-8 text-center relative overflow-hidden group cursor-pointer`}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-5xl mb-4 inline-block"
                >
                  {h.icon}
                </motion.div>
                <h3 className="font-cinzel text-wano-gold text-xl font-bold mb-3">{h.title}</h3>
                <p className="text-white/60 text-sm font-inter leading-relaxed mb-4">{h.desc}</p>
                <div className="inline-flex items-center gap-2 bg-wano-gold/10 border border-wano-gold/30 rounded-full px-4 py-1.5">
                  <span className="text-wano-gold font-cinzel font-bold text-lg">{h.count}</span>
                  <span className="text-wano-gold/60 text-xs font-inter">Events</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-wano px-8 py-3.5 rounded-lg text-base font-bold"
              >
                ⚔️ View All Events
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / VENUE PREVIEW ── */}
      <section className="py-20 bg-wano-dark relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wano-gold/30 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-cinzel text-wano-gold/60 text-sm tracking-[0.4em] uppercase mb-3">The Island of Wano</p>
            <h2 className="section-title text-white mb-4">
              Venue: <span className="gold-text">SSREC OAT</span>
            </h2>
            <div className="ornament-line max-w-xs mx-auto mb-8" />
            <p className="text-white/60 font-inter leading-relaxed text-lg max-w-2xl mx-auto mb-8">
              Sri Sai Ranganathan Engineering College Open Air Theatre transforms into the legendary land of Wano for one epic day.
              Events span across Ground, First, Second, and Third floors.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {[
                { floor: 'Ground Floor', events: 'Red Line Rush, Dance, Music, Art...', color: 'bg-red-900/30 border-red-500/30' },
                { floor: 'First Floor', events: 'Coding Challenge, UI/UX', color: 'bg-blue-900/30 border-blue-500/30' },
                { floor: 'Second Floor', events: 'Will of D, AI, CTF, Papers', color: 'bg-green-900/30 border-green-500/30' },
                { floor: 'Third Floor', events: 'E-Sports, Paper Pres.', color: 'bg-purple-900/30 border-purple-500/30' },
              ].map((f, i) => (
                <motion.div
                  key={f.floor}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-xl p-4 border ${f.color} text-left`}
                >
                  <div className="font-cinzel text-wano-gold text-xs font-bold mb-1">{f.floor}</div>
                  <div className="text-white/50 text-xs font-inter">{f.events}</div>
                </motion.div>
              ))}
            </div>
            <Link to="/venue">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold px-8 py-3.5 rounded-lg text-base font-bold"
              >
                🗺️ View Full Venue Map
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wano-crimson/20 via-wano-dark to-wano-navy/50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-wano-crimson/10 blur-[100px] rounded-full" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <img
                src="/wano_logo.png"
                alt="CybiTradic Wano Fest"
                className="h-20 sm:h-28 object-contain drop-shadow-[0_8px_25px_rgba(201,162,39,0.4)]"
              />
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-black gold-text mb-4">
              Ready to Navigate the Island?
            </h2>
            <p className="font-noto text-white/70 italic text-lg sm:text-xl mb-8 max-w-xl mx-auto">
              "I'm gonna be King of the Pirates!" — October 9, 2026 at Sri Sai Ranganathan Engineering College
            </p>
            <Link to="/venue">
              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gold px-10 sm:px-14 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-black shadow-gold-lg inline-flex items-center gap-3"
              >
                <span className="text-2xl">🗺️</span>
                <span>OPEN INTERACTIVE VENUE MAP</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
