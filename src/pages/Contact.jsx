import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowUpRight, Mail, MapPin, Instagram, ChevronDown } from 'lucide-react';

const ease = [0.19, 1, 0.22, 1];

const TOPICS = [
  'Informations générales',
  'Presse & Médias',
  'Collaboration créative',
  'Proposition éditoriale',
  'Publicité & Partenariat',
];

const FAQ = [
  { q: 'Comment soumettre un article ?', a: 'Remplissez le formulaire en choisissant "Proposition éditoriale". Notre comité de lecture répond sous 10 jours ouvrés.' },
  { q: 'Proposez-vous des abonnements premium ?', a: "Oui, notre abonnement mensuel donne accès à des articles approfondis et à une sélection de ressources visuelles exclusives." },
  { q: 'Peut-on reprendre vos contenus ?', a: "Nos textes sont soumis à copyright. Pour toute reproduction, contactez-nous en précisant l'usage prévu." },
];

/* ── FAQ Accordion Item ───────────────────────────────── */
const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay: index * 0.1 }}
      className="border-b border-stone/30"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-7 text-left group"
      >
        <h4 className="font-serif text-xl text-ink group-hover:text-bronze transition-colors duration-300 pr-4">{item.q}</h4>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <ChevronDown size={18} className="text-ink/30 shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease }}
        className="overflow-hidden"
      >
        <p className="text-ink/50 text-sm font-light leading-relaxed pb-7 pr-12">{item.a}</p>
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const decoRotate = useTransform(scrollYProgress, [0, 1], ['-25deg', '25deg']);
  const decoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.8]);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={sectionRef} className="bg-cream pt-36 pb-32 min-h-screen overflow-hidden relative">
      {/* Decorative rotating ampersand */}
      <motion.div
        style={{ rotate: decoRotate, scale: decoScale }}
        className="absolute top-40 right-[-5%] md:right-[5%] text-[25rem] md:text-[35rem] font-serif text-stone/[0.04] leading-none select-none pointer-events-none"
      >
        &amp;
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

        {/* ─── Page Header with outline text ─────────── */}
        <div className="mb-20 md:mb-28 border-b border-stone/40 pb-12">
          <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease }}
                className="label text-bronze mb-4 block"
                style={{ fontSize: '0.6rem' }}
              >
                Paris, France — 2026
              </motion.span>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', rotate: 3 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ duration: 1.2, ease }}
                  className="font-serif text-display text-ink leading-none"
                >
                  Contact
                </motion.h1>
              </div>
              {/* Outline echo text */}
              <div className="overflow-hidden mt-2">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, ease, delay: 0.15 }}
                  className="font-serif text-[clamp(2rem,5vw,4rem)] text-outline text-ink/20 leading-none block"
                >
                  Parlons ensemble
                </motion.span>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="text-ink/45 text-sm font-light max-w-sm leading-relaxed"
            >
              Pour toute demande, collaboration ou simple échange, notre bureau est à votre écoute.
            </motion.p>
          </motion.div>
        </div>

        {/* ─── Grid: Info + Form ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-32">

          {/* Left: Contact info — stagger from left */}
          <div className="md:col-span-4 flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              <h2 className="font-serif text-3xl text-ink mb-8">
                Converser<br /><em className="text-bronze">avec l&apos;Atelier</em>
              </h2>
              <p className="text-ink/50 font-light leading-relaxed text-sm">
                Chaque échange, suggestion ou critique est le bienvenu — c&apos;est ce dialogue qui nourrit notre éditorial.
              </p>
            </motion.div>

            <div className="flex flex-col gap-6">
              {[
                { icon: Mail, label: 'Email', value: 'contact@atelierjournal.fr', href: 'mailto:contact@atelierjournal.fr' },
                { icon: MapPin, label: 'Bureau', value: '12 Rue de la Paix\n75002 Paris', href: null },
                { icon: Instagram, label: 'Social', value: '@atelierjournal', href: '#' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, borderColor: '#A8864C' }}
                    className="w-10 h-10 border border-stone/50 flex items-center justify-center shrink-0 transition-colors duration-300"
                  >
                    <item.icon size={16} className="text-bronze" strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <span className="label text-ink/30 block mb-1" style={{ fontSize: '0.58rem' }}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-ink text-sm hover:text-bronze transition-colors underline-anim">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-ink text-sm font-light leading-relaxed whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Response times */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="border-t border-stone/30 pt-8"
            >
              <span className="label text-ink/30 block mb-5" style={{ fontSize: '0.58rem' }}>Délais de réponse</span>
              <div className="flex flex-col gap-3">
                {[['Questions générales', '24h'], ['Demandes presse', '48h'], ['Propositions éditoriales', '10 jours']].map(([label, time], i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-ink/50 text-xs font-light">{label}</span>
                    <span className="label text-bronze" style={{ fontSize: '0.58rem' }}>{time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form — fields appear sequentially */}
          <div className="md:col-span-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex flex-col items-center justify-center h-full py-20 gap-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                  className="w-16 h-16 border-2 border-bronze flex items-center justify-center"
                >
                  <ArrowUpRight size={24} className="text-bronze" />
                </motion.div>
                <h3 className="font-serif text-3xl text-ink">Message envoyé</h3>
                <p className="text-ink/50 max-w-sm font-light leading-relaxed">
                  Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais.
                </p>
                <motion.button
                  onClick={() => setSent(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost mt-4"
                >
                  Envoyer un autre message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0 }}
                  className="flex flex-col gap-2"
                >
                  <label className="label text-ink/40" style={{ fontSize: '0.58rem' }}>Nom complet *</label>
                  <input
                    required
                    type="text"
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Votre nom"
                    className="bg-transparent border-b border-stone/50 py-3 text-ink text-sm placeholder:text-stone focus:border-bronze outline-none transition-colors duration-300"
                  />
                </motion.div>
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <label className="label text-ink/40" style={{ fontSize: '0.58rem' }}>Adresse email *</label>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                    placeholder="votre@email.fr"
                    className="bg-transparent border-b border-stone/50 py-3 text-ink text-sm placeholder:text-stone focus:border-bronze outline-none transition-colors duration-300"
                  />
                </motion.div>
                {/* Topic pills with spring animation */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.2 }}
                  className="md:col-span-2 flex flex-col gap-2"
                >
                  <label className="label text-ink/40" style={{ fontSize: '0.58rem' }}>Objet de votre demande</label>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {TOPICS.map(t => (
                      <motion.button
                        key={t}
                        type="button"
                        onClick={() => setFormState({ ...formState, topic: t })}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        className={[
                          'label px-4 py-2.5 border transition-all duration-300',
                          formState.topic === t
                            ? 'bg-ink text-cream border-ink'
                            : 'border-stone/50 text-ink/40 hover:border-ink/40 hover:text-ink/70',
                        ].join(' ')}
                        style={{ fontSize: '0.58rem' }}
                      >
                        {t}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.3 }}
                  className="md:col-span-2 flex flex-col gap-2"
                >
                  <label className="label text-ink/40" style={{ fontSize: '0.58rem' }}>Message *</label>
                  <textarea
                    required
                    rows="6"
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Décrivez votre demande avec précision…"
                    className="bg-transparent border-b border-stone/50 py-3 text-ink text-sm placeholder:text-stone focus:border-bronze outline-none transition-colors duration-300 resize-none"
                  />
                </motion.div>
                {/* Submit */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.4 }}
                  className="md:col-span-2 flex items-center justify-between"
                >
                  <p className="text-ink/30 text-xs font-light">* Champs obligatoires</p>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Envoyer le message <ArrowUpRight size={14} />
                  </motion.button>
                </motion.div>
              </form>
            )}
          </div>
        </div>

        {/* ─── FAQ Accordion ────────────────────────────── */}
        <section className="max-w-3xl">
          <div className="section-heading mb-8">
            <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Questions fréquentes</span>
          </div>
          {FAQ.map((item, i) => (
            <FaqItem key={i} item={item} index={i} />
          ))}
        </section>

      </div>
    </div>
  );
};

export default Contact;
