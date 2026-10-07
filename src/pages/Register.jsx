import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { technicalEvents, nonTechnicalEvents, esportsEvents } from '../data/events';

const allEvents = [
  ...technicalEvents.map((e) => ({ ...e, category: 'Technical' })),
  ...nonTechnicalEvents.map((e) => ({ ...e, category: 'Non-Technical' })),
  ...esportsEvents.map((e) => ({ ...e, category: 'E-Sports' })),
];

const initialForm = {
  name: '', email: '', phone: '', college: '', department: '', year: '',
  eventId: '', teamName: '', teamSize: '1', members: '',
};

export default function Register() {
  const [searchParams] = useSearchParams();
  const preSelected = searchParams.get('event') || '';
  const [form, setForm] = useState({ ...initialForm, eventId: preSelected });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const selectedEvent = allEvents.find((e) => e.id === form.eventId);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^\d{10}$/)) e.phone = '10-digit phone required';
    if (!form.college.trim()) e.college = 'College name required';
    if (!form.eventId) e.eventId = 'Please select an event';
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 wano-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="glass-card rounded-2xl p-12 max-w-md w-full text-center border border-wano-gold/40 shadow-gold-lg"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-7xl mb-6"
          >
            🏴‍☠️
          </motion.div>
          <h2 className="font-cinzel text-wano-gold text-2xl font-black mb-3">You're In, Pirate!</h2>
          <p className="text-white/60 font-inter mb-2">
            Registration confirmed for <span className="text-wano-gold-light font-semibold">{selectedEvent?.name}</span>
          </p>
          <p className="text-white/40 font-inter text-sm mb-6">
            Check your email <span className="text-wano-gold/70">{form.email}</span> for confirmation.
          </p>
          <div className="ornament-line mb-6" />
          <p className="text-white/50 font-noto italic text-sm">
            "The sea is vast… Set sail for Oct 9, 2026 at SSREC OAT!"
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ ...initialForm }); }}
            className="mt-6 btn-wano w-full py-3 rounded-lg font-semibold"
          >
            Register Another Event
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 wano-bg">
      {/* Header */}
      <div className="relative py-16">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wano-gold/40 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-cinzel text-wano-gold/60 text-sm tracking-[0.5em] uppercase mb-3">📜 Join the Grand Tournament</p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-black gold-text mb-4">Register</h1>
            <div className="ornament-line max-w-xs mx-auto mb-4" />
            <p className="text-white/50 font-inter">Fill in your details and claim your spot in the Wano Fest!</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-8 border border-wano-gold/20 space-y-6"
        >
          {/* Event Selection */}
          <div>
            <label className="block font-cinzel text-wano-gold text-sm font-bold mb-2 tracking-wide">
              ⚔️ Select Event *
            </label>
            <select
              name="eventId"
              value={form.eventId}
              onChange={handleChange}
              id="event-select"
              className="wano-input w-full px-4 py-3 rounded-lg font-inter text-sm"
            >
              <option value="">— Choose your battleground —</option>
              <optgroup label="⚙️ Technical Events">
                {technicalEvents.map((e) => <option key={e.id} value={e.id}>{e.icon} {e.name}</option>)}
              </optgroup>
              <optgroup label="🎭 Non-Technical Events">
                {nonTechnicalEvents.map((e) => <option key={e.id} value={e.id}>{e.icon} {e.name}</option>)}
              </optgroup>
              <optgroup label="🎮 E-Sports">
                {esportsEvents.map((e) => <option key={e.id} value={e.id}>{e.icon} {e.name}</option>)}
              </optgroup>
            </select>
            {errors.eventId && <p className="text-red-400 text-xs mt-1 font-inter">{errors.eventId}</p>}

            {/* Selected Event Info */}
            <AnimatePresence>
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 bg-wano-gold/10 border border-wano-gold/30 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedEvent.icon}</span>
                    <div>
                      <p className="font-cinzel text-wano-gold font-bold text-sm">{selectedEvent.name}</p>
                      <p className="text-white/50 font-inter text-xs mt-0.5">
                        📍 {selectedEvent.venue} &nbsp;•&nbsp; 👥 {selectedEvent.teamSize} &nbsp;•&nbsp; ⏱️ {selectedEvent.duration}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Personal Details */}
          <div className="space-y-1">
            <p className="font-cinzel text-wano-gold/60 text-xs tracking-widest uppercase">Personal Details</p>
            <div className="h-px bg-gradient-to-r from-wano-gold/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'name', label: '👤 Full Name', placeholder: 'Monkey D. Luffy', type: 'text' },
              { name: 'email', label: '📧 Email', placeholder: 'luffy@piratecrew.com', type: 'email' },
              { name: 'phone', label: '📱 Phone', placeholder: '9876543210', type: 'tel' },
              { name: 'college', label: '🏫 College', placeholder: 'Sri Sai Ranganathan Engg...', type: 'text' },
              { name: 'department', label: '📚 Department', placeholder: 'Computer Science', type: 'text' },
              { name: 'year', label: '🎓 Year of Study', placeholder: '3rd Year', type: 'text' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-inter text-white/60 text-xs font-medium mb-1.5 tracking-wide">
                  {field.label}
                </label>
                <input
                  id={`field-${field.name}`}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="wano-input w-full px-4 py-3 rounded-lg font-inter text-sm"
                />
                {errors[field.name] && <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>}
              </div>
            ))}
          </div>

          {/* Team Details */}
          <div className="space-y-1">
            <p className="font-cinzel text-wano-gold/60 text-xs tracking-widest uppercase">Team Details (if applicable)</p>
            <div className="h-px bg-gradient-to-r from-wano-gold/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-inter text-white/60 text-xs font-medium mb-1.5">⚓ Team Name</label>
              <input
                id="field-teamName"
                name="teamName"
                type="text"
                placeholder="Straw Hat Pirates"
                value={form.teamName}
                onChange={handleChange}
                className="wano-input w-full px-4 py-3 rounded-lg font-inter text-sm"
              />
            </div>
            <div>
              <label className="block font-inter text-white/60 text-xs font-medium mb-1.5">👥 Team Size</label>
              <select
                id="field-teamSize"
                name="teamSize"
                value={form.teamSize}
                onChange={handleChange}
                className="wano-input w-full px-4 py-3 rounded-lg font-inter text-sm"
              >
                {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'member' : 'members'}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-inter text-white/60 text-xs font-medium mb-1.5">
              🏴‍☠️ Team Member Names (comma-separated)
            </label>
            <textarea
              id="field-members"
              name="members"
              rows={3}
              placeholder="Zoro, Nami, Usopp, Sanji..."
              value={form.members}
              onChange={handleChange}
              className="wano-input w-full px-4 py-3 rounded-lg font-inter text-sm resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className="w-full btn-wano py-4 rounded-xl text-base font-bold relative overflow-hidden"
            id="submit-register"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  ⚓
                </motion.span>
                Setting Sail...
              </span>
            ) : (
              '🏴‍☠️ Register for Wano Fest!'
            )}
          </motion.button>

          <p className="text-white/30 text-xs font-inter text-center">
            By registering you agree to the event rules. No entry fee for most events.
          </p>
        </motion.form>
      </div>
    </div>
  );
}
