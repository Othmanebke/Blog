import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Instagram } from 'lucide-react';

const ease = [0.19, 1, 0.22, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease, delay },
});

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
  { q: 'Peut-on reprendre vos contenus ?', a: "Nos textes sont soumis à copyright. Pour toute reproduction partielle ou totale, contactez-nous en précisant l'usage prévu." },
];

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-cream pt-36 pb-32 min-h-screen overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* ─── Page Header ──────────────────────────────── */}
        <div className="mb-20 md:mb-28 border-b border-stone/40 pb-12">
          <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="label text-bronze mb-4 block" style={{ fontSize: '0.6rem' }}>Paris, France — 2026</span>
              <h1 className="font-serif text-display text-ink leading-none">Contact</h1>
            </div>
            <p className="text-ink/45 text-sm font-light max-w-sm leading-relaxed">
              Pour toute demande, collaboration ou simple échange, notre bureau est à votre écoute. Nous répondons à chaque message.
            </p>
          </motion.div>
        </div>

        {/* ─── Grid: Form + Info ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-32">

          {/* Left: Contact info */}
          <motion.div {...fadeUp(0.1)} className="md:col-span-4 flex flex-col gap-12">
            <div>
              <h2 className="font-serif text-3xl text-ink mb-8">Converser<br /><em className="text-bronze">avec l&apos;Atelier</em></h2>
              <p className="text-ink/50 font-light leading-relaxed text-sm">
                Atelier Journal est avant tout une conversation. Chaque échange, suggestion ou critique est le bienvenu — c&apos;est ce dialogue qui nourrit notre éditorial.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-stone/50 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-bronze" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="label text-ink/30 block mb-1" style={{ fontSize: '0.58rem' }}>Email</span>
                  <a href="mailto:contact@atelierjournal.fr" className="text-ink text-sm hover:text-bronze transition-colors underline-anim">
                    contact@atelierjournal.fr
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-stone/50 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-bronze" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="label text-ink/30 block mb-1" style={{ fontSize: '0.58rem' }}>Bureau</span>
                  <p className="text-ink text-sm font-light leading-relaxed">12 Rue de la Paix<br />75002 Paris, France</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-stone/50 flex items-center justify-center shrink-0">
                  <Instagram size={16} className="text-bronze" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="label text-ink/30 block mb-1" style={{ fontSize: '0.58rem' }}>Social</span>
                  <a href="#" className="text-ink text-sm hover:text-bronze transition-colors underline-anim">
                    @atelierjournal
                  </a>
                </div>
              </div>
            </div>

            {/* Response times */}
            <div className="border-t border-stone/30 pt-8">
              <span className="label text-ink/30 block mb-5" style={{ fontSize: '0.58rem' }}>Délais de réponse</span>
              <div className="flex flex-col gap-3">
                {[['Questions générales', '24h'], ['Demandes presse', '48h'], ['Propositions éditoriales', '10 jours']].map(([label, time]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-ink/50 text-xs font-light">{label}</span>
                    <span className="label text-bronze" style={{ fontSize: '0.58rem' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div {...fadeUp(0.2)} className="md:col-span-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-20 gap-6 text-center"
              >
                <div className="w-16 h-16 border-2 border-bronze flex items-center justify-center">
                  <ArrowUpRight size={24} className="text-bronze" />
                </div>
                <h3 className="font-serif text-3xl text-ink">Message envoyé</h3>
                <p className="text-ink/50 max-w-sm font-light leading-relaxed">
                  Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais.
                </p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-4">
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="label text-ink/40" style={{ fontSize: '0.58rem' }}>Nom complet *</label>
                  <input
                    required
                    type="text"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    placeholder="Votre nom"
                    className="bg-transparent border-b border-stone/50 py-3 text-ink text-sm placeholder:text-stone focus:border-bronze outline-none transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="label text-ink/40" style={{ fontSize: '0.58rem' }}>Adresse email *</label>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    placeholder="votre@email.fr"
                    className="bg-transparent border-b border-stone/50 py-3 text-ink text-sm placeholder:text-stone focus:border-bronze outline-none transition-colors duration-300"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="label text-ink/40" style={{ fontSize: '0.58rem' }}>Objet de votre demande</label>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {TOPICS.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormState({...formState, topic: t})}
                        className={[
                          'label px-4 py-2.5 border transition-all duration-300',
                          formState.topic === t
                            ? 'bg-ink text-cream border-ink'
                            : 'border-stone/50 text-ink/40 hover:border-ink/40 hover:text-ink/70',
                        ].join(' ')}
                        style={{ fontSize: '0.58rem' }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="label text-ink/40" style={{ fontSize: '0.58rem' }}>Message *</label>
                  <textarea
                    required
                    rows="6"
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    placeholder="Décrivez votre demande avec précision…"
                    className="bg-transparent border-b border-stone/50 py-3 text-ink text-sm placeholder:text-stone focus:border-bronze outline-none transition-colors duration-300 resize-none"
                  />
                </div>
                <div className="md:col-span-2 flex items-center justify-between">
                  <p className="text-ink/30 text-xs font-light">* Champs obligatoires</p>
                  <button type="submit" className="btn-primary">
                    Envoyer le message <ArrowUpRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* ─── FAQ ──────────────────────────────────────── */}
        <section>
          <div className="section-heading mb-12">
            <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Questions fréquentes</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="border-b md:border-b-0 md:border-r border-stone/30 last:border-0 p-6 md:p-8"
              >
                <h4 className="font-serif text-xl text-ink mb-4">{item.q}</h4>
                <p className="text-ink/50 text-sm font-light leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
