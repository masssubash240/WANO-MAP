import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function EventCard({ event, index, category }) {
  const categoryColors = {
    technical: { border: 'border-blue-500/30', glow: 'hover:shadow-blue-500/20', badge: 'bg-blue-500/20 text-blue-300', icon: '⚙️' },
    nonTechnical: { border: 'border-pink-500/30', glow: 'hover:shadow-pink-500/20', badge: 'bg-pink-500/20 text-pink-300', icon: '🎭' },
    esports: { border: 'border-purple-500/30', glow: 'hover:shadow-purple-500/20', badge: 'bg-purple-500/20 text-purple-300', icon: '🎮' },
  };

  const colors = categoryColors[category] || categoryColors.technical;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`event-card glass-card rounded-xl overflow-hidden border ${colors.border} hover:shadow-xl ${colors.glow} cursor-pointer group relative flex flex-col justify-between`}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wano-gold/50 to-transparent" />

      <div className="p-6">
        {/* Icon & Badge */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
            transition={{ duration: 0.4 }}
            className="text-4xl"
          >
            {event.icon}
          </motion.div>
          <span className={`text-xs font-inter font-semibold px-3 py-1 rounded-full ${colors.badge} tracking-wide`}>
            {colors.icon} {category === 'nonTechnical' ? 'Non-Tech' : category === 'esports' ? 'E-Sports' : 'Technical'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-cinzel text-wano-gold-light text-lg font-bold mb-2 group-hover:text-white transition-colors duration-300">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm font-inter leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Incharge */}
        {event.incharge && event.incharge !== '—' && (
          <div className="mb-4 flex items-center gap-2 text-xs bg-red-950/40 border border-red-500/30 text-red-200 px-3 py-1.5 rounded-lg">
            <span>👤</span>
            <span className="font-semibold text-wano-gold-light">Incharge:</span>
            <span className="truncate">{event.incharge}</span>
          </div>
        )}

        {/* Meta badges */}
        <div className="flex flex-wrap gap-2.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-wano-gold/70 bg-wano-gold/10 px-2.5 py-1.5 rounded-full">
            <span>📍</span>
            <span className="font-inter truncate max-w-[150px]" title={event.venue}>{event.venue}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-wano-gold/70 bg-wano-gold/10 px-2.5 py-1.5 rounded-full">
            <span>👥</span>
            <span className="font-inter">{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-wano-gold/70 bg-wano-gold/10 px-2.5 py-1.5 rounded-full">
            <span>⏱️</span>
            <span className="font-inter">{event.duration}</span>
          </div>
        </div>

        {/* Floor */}
        <div className="flex items-center gap-2 text-xs text-white/40 font-inter mb-4">
          <span>🏛️</span>
          <span>{event.floor}</span>
        </div>
      </div>

      <div className="p-6 pt-0">
        {/* Venue Map CTA */}
        <Link to="/venue">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full btn-gold py-2.5 rounded-xl text-xs font-black tracking-wider flex items-center justify-center gap-2 shadow-sm"
          >
            <span>🗺️</span>
            <span>LOCATE ON VENUE MAP</span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
