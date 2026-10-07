import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET_DATE = new Date('2026-10-09T09:00:00+05:30');

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

const Unit = ({ value, label }) => (
  <motion.div
    key={value}
    initial={{ scale: 0.9, opacity: 0.7 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.2 }}
    className="countdown-unit rounded-lg px-4 py-4 sm:px-6 sm:py-5 text-center min-w-[72px] sm:min-w-[100px]"
  >
    <div className="font-cinzel text-4xl sm:text-6xl font-bold gold-text leading-none tabular-nums">
      {String(value).padStart(2, '0')}
    </div>
    <div className="font-inter text-white/50 text-xs sm:text-sm tracking-widest uppercase mt-2">{label}</div>
  </motion.div>
);

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.expired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-5xl mb-4">🎉</div>
        <p className="font-cinzel text-wano-gold text-2xl font-bold">The Fest Has Begun!</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-cinzel text-wano-gold/70 text-sm tracking-[0.3em] uppercase">Event Starts In</p>
      <div className="flex gap-3 sm:gap-4 items-center">
        <Unit value={time.days} label="Days" />
        <span className="text-wano-gold text-3xl font-bold self-start mt-4">:</span>
        <Unit value={time.hours} label="Hours" />
        <span className="text-wano-gold text-3xl font-bold self-start mt-4">:</span>
        <Unit value={time.minutes} label="Minutes" />
        <span className="text-wano-gold text-3xl font-bold self-start mt-4">:</span>
        <Unit value={time.seconds} label="Seconds" />
      </div>
    </div>
  );
}
