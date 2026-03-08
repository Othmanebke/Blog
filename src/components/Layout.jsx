import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrolled } from '../hooks/useScrollProgress';

const NAV_LINKS = [
  { to: '/articles', label: 'Éditions' },
  { to: '/about', label: 'Concept' },
  { to: '/contact', label: 'Contact' },
];

const TICKER_TEXT = [
  'Expériences Visuelles',
  'Forme & Fonction',
  'Son & Mouvement',
  'Fragments Écrits',
  'Direction Artistique',
  'Culture Contemporaine',
];

const ease = [0.19, 1, 0.22, 1];

const Ticker = () => (
  <div className="border-b border-stone/50 bg-night overflow-hidden py-2.5">
    <div className="flex animate-ticker whitespace-nowrap">
      {[...TICKER_TEXT, ...TICKER_TEXT].map((t, i) => (
        <span key={i} className="label text-ink/35 px-8 shrink-0 text-[0.58rem] tracking-[0.25em]">
          {t} <span className="text-bronze mx-4">&times;</span>
        </span>
      ))}
    </div>
  </div>
);

const Navbar = () => {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className={[
          'fixed top-0 inset-x-0 z-[200] transition-all duration-500 ease-expo',
          scrolled || menuOpen
            ? 'bg-night/97 backdrop-blur-xl border-b border-stone/50 py-4'
            : 'bg-transparent py-7',
        ].join(' ')}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 leading-none z-10 group">
            <div className="flex flex-col">
              <motion.span
                whileHover={{ x: 2 }}
                className="font-display text-lg md:text-xl font-black uppercase tracking-tight text-ink leading-none"
              >
                Atelier
              </motion.span>
              <span className="label text-bronze" style={{ fontSize: '0.55rem', letterSpacing: '0.28em' }}>Journal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={[
                  'label text-[0.62rem] underline-anim tracking-[0.2em]',
                  location.pathname.startsWith(to) ? 'text-bronze' : 'text-ink/45 hover:text-ink',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setSearchOpen(!searchOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-ink/45 hover:text-bronze transition-colors duration-300 hidden md:flex"
              aria-label="Recherche"
            >
              <Search size={18} strokeWidth={1.5} />
            </motion.button>
            <Link to="/contact" className="hidden md:inline-flex btn-primary py-2.5 px-5 text-[0.6rem]">
              S&apos;Abonner
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 md:hidden text-ink/60 hover:text-bronze transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="overflow-hidden border-t border-stone/40"
            >
              <div className="max-w-[1440px] mx-auto px-12 py-4 flex items-center gap-4">
                <Search size={16} className="text-ink/40 shrink-0" strokeWidth={1.5} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher un article, une thématique…"
                  className="flex-1 bg-transparent text-ink placeholder:text-ink/30 text-sm outline-none py-2"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={16} className="text-ink/40 hover:text-ink transition-colors" strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-night z-[150] flex flex-col justify-center px-8 noise"
          >
            <nav className="flex flex-col gap-2 mb-16">
              {[{ to: '/', label: 'Accueil' }, ...NAV_LINKS].map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
                >
                  <Link
                    to={to}
                    className="flex items-center justify-between font-display text-[clamp(2.5rem,10vw,5rem)] font-black uppercase text-ink/80 hover:text-bronze transition-colors leading-tight py-3 border-b border-stone/30 group"
                  >
                    {label}
                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity text-bronze" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between items-end"
            >
              <span className="label text-ink/25" style={{ fontSize: '0.6rem' }}>Atelier Journal © 2026</span>
              <div className="flex flex-col gap-1 text-right">
                <span className="label text-bronze" style={{ fontSize: '0.6rem' }}>Paris, France</span>
                <span className="label text-ink/25" style={{ fontSize: '0.6rem' }}>contact@atelierjournal.fr</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FooterLink = ({ to, children }) => (
  <Link to={to} className="underline-anim text-ink/35 hover:text-ink text-sm font-light transition-colors duration-300">
    {children}
  </Link>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-night relative overflow-hidden noise">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="border-b border-stone/25 pb-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">
          <div className="md:col-span-4">
            <Link to="/" className="block mb-7">
              <span className="font-display text-xl font-black uppercase text-ink tracking-tight">
                Atelier<span className="text-bronze">.</span>
              </span>
              <span className="label text-ink/25 block mt-1" style={{ fontSize: '0.58rem' }}>Journal Éditorial</span>
            </Link>
            <p className="text-ink/35 text-sm font-light leading-relaxed max-w-xs mb-10">
              Un espace de réflexion sur le design, la culture visuelle et les stratégies qui définissent l&apos;esthétique contemporaine.
            </p>
            <div className="flex gap-3">
              {['Ig', 'Pi', 'X'].map(s => (
                <motion.a
                  key={s}
                  href="#"
                  whileHover={{ scale: 1.15, borderColor: '#B4FF39' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 border border-stone/50 flex items-center justify-center text-ink/30 hover:text-bronze transition-colors duration-300 label text-[0.55rem]"
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h4 className="label text-bronze mb-6" style={{ fontSize: '0.58rem' }}>Navigation</h4>
            <ul className="space-y-4">
              {[['/', 'Accueil'], ['/articles', 'Éditions'], ['/about', 'Concept'], ['/contact', 'Contact']].map(([to, l]) => (
                <li key={to}><FooterLink to={to}>{l}</FooterLink></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <h4 className="label text-bronze mb-6" style={{ fontSize: '0.58rem' }}>Thématiques</h4>
            <ul className="space-y-4">
              {['Design', 'Culture', 'Stratégie', 'Créativité', 'Mode'].map(c => (
                <li key={c}><FooterLink to="/articles">{c}</FooterLink></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="label text-bronze mb-6" style={{ fontSize: '0.58rem' }}>Newsletter</h4>
            <p className="text-ink/30 text-sm mb-6 leading-relaxed font-light">
              Sélection éditoriale mensuelle, sans bruit.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="bg-stone/20 border border-stone/40 text-ink placeholder:text-ink/25 text-sm px-4 py-3 outline-none focus:border-bronze/60 transition-colors duration-300"
              />
              <button type="submit" className="btn-primary justify-center py-3 text-[0.58rem]">
                S&apos;inscrire <ArrowUpRight size={13} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Giant brand wordmark */}
      <div className="overflow-hidden select-none pointer-events-none">
        <motion.p
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.4, ease }}
          className="font-display font-black uppercase text-ink/[0.04] leading-none tracking-tighter whitespace-nowrap px-4 md:px-6"
          style={{ fontSize: 'clamp(4rem, 20vw, 22rem)' }}
        >
          ATELIER JOURNAL
        </motion.p>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-8 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-stone/20">
        <span className="label text-ink/20" style={{ fontSize: '0.56rem' }}>
          © {currentYear} Atelier Journal — Tous droits réservés
        </span>
        <div className="flex gap-8">
          {['Mentions légales', 'Confidentialité', 'CGU'].map(l => (
            <a key={l} href="#" className="label text-ink/20 hover:text-bronze transition-colors duration-300" style={{ fontSize: '0.56rem' }}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

/* ── Page transition wrapper ──────────────────────────── */
const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
