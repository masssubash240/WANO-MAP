import { useState } from 'react';
import { motion } from 'framer-motion';
import { collegeInfo, quartermasters, allEventCoordinators, contactCards } from '../data/wanoData';

const faqs = [
  { q: 'Is there a registration fee?', a: 'Most events are free! Some premium events may have a nominal fee. Check individual event details and passes.' },
  { q: 'Can I register for multiple events?', a: 'Yes! You can register for as many events as you want across Technical, Non-Technical, and E-Sports divisions.' },
  { q: 'What should I bring on event day?', a: 'A valid college ID card, your registration confirmation, and your competitive spirit!' },
  { q: 'Is accommodation available?', a: 'Official accommodation details can be enquired with the coordinators. Nearby lodges are available around Coimbatore / Thondamuthur.' },
  { q: 'Can students from other colleges participate?', a: 'Absolutely! Wano Fest is open to all engineering and arts college students across Tamil Nadu.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-20 wano-bg">
      {/* Page Header */}
      <div className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wano-crimson/15 via-transparent to-transparent pointer-events-none" />
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
              📡 DEN DEN MUSHI TRANSMISSION • FLEET HEADQUARTERS
            </p>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-black gold-text mb-3">Contact & Coordinators</h1>
            <div className="ornament-line max-w-xs mx-auto mb-4" />
            <p className="text-white/60 font-inter max-w-2xl mx-auto text-sm sm:text-base">
              Reach out directly to division commanders, quartermasters, and the official college desk for queries, rules, and event guidance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* ─── SECTION 1: DIVISION QUARTERMASTERS (As in wano-fest-five) ─── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-cinzel font-bold text-wano-gold tracking-[0.3em] uppercase bg-wano-gold/10 border border-wano-gold/30 px-4 py-1.5 rounded-full inline-block mb-3">
              ⚔️ DIVISION QUARTERMASTERS
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-black text-white">Event Coordinators & Leads</h2>
            <p className="text-white/50 text-sm mt-2 max-w-xl mx-auto font-inter">
              Contact the division heads directly via phone call, WhatsApp, or email for immediate event support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quartermasters.map((group, idx) => (
              <motion.div
                key={group.eventName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl p-6 sm:p-7 bg-[#070b16] border border-wano-gold/30 shadow-2xl hover:border-wano-gold/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Glow accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-wano-gold/60 to-transparent group-hover:via-wano-gold transition-all duration-500" />

                <div>
                  {/* Category & Bounty */}
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className={`text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md border ${group.badgeColor}`}>
                      {group.eventCategory}
                    </span>
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-full">
                      {group.bounty}
                    </span>
                  </div>

                  {/* Event Name */}
                  <h3 className="font-cinzel text-xl sm:text-2xl font-black text-white tracking-wide mb-6">
                    {group.eventName}
                  </h3>

                  {/* Coordinators List */}
                  <div className="space-y-4">
                    {group.coordinators.map((c) => (
                      <div
                        key={c.name}
                        className="p-4 rounded-2xl bg-[#0c1222]/80 border border-white/10 hover:border-white/20 transition-all duration-200"
                      >
                        {/* Header: Name + Role */}
                        <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                          <span className="text-sm font-black text-slate-100 tracking-wide font-inter">
                            {c.name}
                          </span>
                          {c.role && (
                            <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase bg-amber-400/10 px-2 py-0.5 rounded">
                              {c.role}
                            </span>
                          )}
                        </div>

                        {/* Phone display */}
                        <div className="text-xs text-slate-400 font-mono tracking-wider mb-3">
                          {c.phone}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Call Button */}
                          <a
                            href={`tel:${c.tel}`}
                            className="flex-1 min-w-[75px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 hover:text-emerald-300 text-xs font-bold font-inter transition-all duration-200"
                          >
                            <span>📞</span>
                            <span>CALL</span>
                          </a>

                          {/* WhatsApp Button */}
                          <a
                            href={c.wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[85px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 hover:text-emerald-300 text-xs font-bold font-inter transition-all duration-200"
                          >
                            <span>💬</span>
                            <span>WHATSAPP</span>
                          </a>

                          {/* Gmail Button (if available) */}
                          {c.email && (
                            <a
                              href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(c.email)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/50 hover:text-rose-200 text-xs font-bold font-inter transition-all duration-200"
                              title={`Send email to ${c.email}`}
                            >
                              <span>✉️</span>
                              <span>GMAIL</span>
                            </a>
                          )}

                          {/* Website / Portfolio Button (if available) */}
                          {c.website && (
                            <a
                              href={c.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50 hover:text-cyan-200 text-xs font-bold font-inter transition-all duration-200"
                              title="Visit Profile"
                            >
                              <span>🌐</span>
                              <span>BIO</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 2: OFFICIAL HARBOR & SANCTUARY CONTACT CARDS ─── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-cinzel font-bold text-wano-gold tracking-[0.3em] uppercase bg-wano-gold/10 border border-wano-gold/30 px-4 py-1.5 rounded-full inline-block mb-3">
              🏛️ CAMPUS CHANNELS
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-black text-white">Official Communication Desk</h2>
            <p className="text-white/50 text-sm mt-2 max-w-xl mx-auto font-inter">
              Connect with Sri Sai Ranganathan Engineering College directly through authorized media and physical location.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 border border-wano-gold/25 hover:border-wano-gold/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2.5 rounded-xl bg-wano-gold/10 border border-wano-gold/20 group-hover:scale-110 transition-transform duration-200">
                      {card.icon}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-white/5 text-wano-gold border border-wano-gold/20">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-white mb-1">{card.title}</h3>
                  <p className="font-mono text-sm font-semibold text-wano-gold-light mb-1 truncate" title={card.value}>
                    {card.value}
                  </p>
                  <p className="text-xs text-white/50 font-inter mb-4">{card.displayValue}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-wano-gold/10 border border-wano-gold/30 text-wano-gold hover:bg-wano-gold/20 text-xs font-cinzel font-bold tracking-wider transition-all duration-200"
                  >
                    {card.actionLabel}
                  </a>
                  {card.value && (
                    <button
                      onClick={() => handleCopy(card.value, card.id)}
                      className="py-2 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs font-inter transition-all duration-200"
                      title="Copy to clipboard"
                    >
                      {copiedText === card.id ? '✓ Copied' : '📋 Copy'}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 3: ALL EVENTS COORDINATORS DIRECTORY ─── */}
        <div className="mb-20 glass-card rounded-3xl p-6 sm:p-10 border border-wano-gold/25">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-cinzel font-bold text-wano-gold tracking-[0.3em] uppercase mb-1 block">
                📋 MASTER REGISTRY
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white">All Event Coordinators Directory</h2>
            </div>
            <p className="text-xs text-white/50 font-inter max-w-sm">
              Complete index of leads assigned to technical, non-technical, cultural, and sports competitions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-inter text-sm">
              <thead>
                <tr className="border-b border-wano-gold/20 text-wano-gold text-xs font-cinzel tracking-wider uppercase">
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Coordinator / Lead</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allEventCoordinators.map((item, idx) => (
                  <tr key={idx} className="hover:bg-wano-gold/5 transition-colors duration-150">
                    <td className="py-3.5 px-4 font-bold text-white">{item.event}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.category === 'Technical' ? 'bg-blue-500/20 text-blue-300' :
                        item.category === 'E-Sports' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-pink-500/20 text-pink-300'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-200">
                      <div>{item.name}</div>
                      {item.role && <div className="text-[10px] text-amber-400 font-semibold">{item.role}</div>}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">{item.phone}</td>
                    <td className="py-3.5 px-4 text-right">
                      {item.phone.includes('+91') || !isNaN(item.phone.replace(/[^0-9]/g, '')) ? (
                        <a
                          href={`tel:${item.phone.split('/')[0].trim().replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30"
                        >
                          📞 Call
                        </a>
                      ) : (
                        <span className="text-xs text-white/30">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── SECTION 4: LOCATION & CONTACT FORM ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Interactive Map & Campus Address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-wano-gold/25 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-cinzel font-bold text-wano-gold tracking-[0.3em] uppercase block mb-1">
                📍 HARBOR EMBED
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">Campus Location</h3>
              <p className="text-white/60 text-xs sm:text-sm font-inter mb-4 leading-relaxed">
                {collegeInfo.address}
              </p>

              {/* Google Maps Embed iframe */}
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-wano-gold/30 mb-5 relative shadow-xl">
                <iframe
                  title="Sri Sai Ranganathan Engineering College Map"
                  src={collegeInfo.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href={collegeInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center btn-wano py-3 px-4 rounded-xl text-xs font-bold font-cinzel"
              >
                🗺️ Open in Google Maps
              </a>
              <a
                href={collegeInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center btn-gold py-3 px-4 rounded-xl text-xs font-bold font-cinzel"
              >
                🌐 College Website
              </a>
            </div>
          </motion.div>

          {/* Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-wano-gold/25"
          >
            <span className="text-xs font-cinzel font-bold text-wano-gold tracking-[0.3em] uppercase block mb-1">
              🐌 DEN DEN MUSHI
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">Send Direct Transmission</h3>
            <p className="text-white/60 text-xs sm:text-sm font-inter mb-6">
              Have specific registration or accommodation questions? Transmit a note to our crew.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-8 border border-wano-gold/40 text-center bg-wano-gold/5"
              >
                <div className="text-5xl mb-3">🐌</div>
                <h4 className="font-cinzel text-wano-gold text-lg font-bold mb-1">Transmission Dispatched!</h4>
                <p className="text-white/60 font-inter text-xs leading-relaxed mb-4">
                  Your Den Den Mushi message was received. The crew will respond to your email shortly.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="btn-wano px-5 py-2 rounded-lg text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-inter text-white/70 text-xs font-semibold mb-1">👤 Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Monkey D. Luffy"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="wano-input w-full px-4 py-2.5 rounded-xl font-inter text-sm"
                  />
                </div>
                <div>
                  <label className="block font-inter text-white/70 text-xs font-semibold mb-1">📧 Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="pirate.king@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="wano-input w-full px-4 py-2.5 rounded-xl font-inter text-sm"
                  />
                </div>
                <div>
                  <label className="block font-inter text-white/70 text-xs font-semibold mb-1">💬 Query or Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter your event registration questions or general queries..."
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="wano-input w-full px-4 py-2.5 rounded-xl font-inter text-sm resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full btn-wano py-3 rounded-xl text-sm font-bold tracking-wider"
                >
                  📡 Dispatch Transmission
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* ─── SECTION 5: FREQUENTLY ASKED QUESTIONS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="text-xs font-cinzel font-bold text-wano-gold tracking-[0.3em] uppercase block mb-1">
              💡 KNOWLEDGE ARCHIVE
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
            <div className="ornament-line max-w-xs mx-auto mt-2" />
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl border border-wano-gold/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-wano-gold/5 transition-colors duration-200"
                >
                  <span className="font-inter font-semibold text-white/90 text-sm">{faq.q}</span>
                  <span className="text-wano-gold ml-4 text-xs font-bold">
                    {openFaq === i ? '▲' : '▼'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-white/60 font-inter text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
