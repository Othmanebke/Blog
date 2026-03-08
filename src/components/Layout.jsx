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
  'Design Editorial',
  'Culture Visuelle',
  'Stratégie de Marque',
  'Direction Artistique',
  'Innovation Créative',
  'Héritage & Modernité',
];

const Ticker = () => (
  <div className="border-y border-stone bg-cream-50 overflow-hidden py-3">
    <div className="flex animate-ticker whitespace-nowrap">
      {[...TICKER_TEXT, ...TICKER_TEXT].map((t, i) => (
        <span key={i} className="label text-ink/40 px-8 shrink-0">
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
      <header
        className={[
          'fixed top-0 inset-x-0 z-[200] transition-all duration-700 ease-expo',
          scrolled || menuOpen
            ? 'bg-cream/95 backdrop-blur-xl border-b border-stone/60 py-4'
            : 'bg-transparent py-7',
        ].join(' ')}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none z-10">
            <span className="font-serif text-xl md:text-2xl tracking-[-0.02em] text-ink">Atelier</span>
            <span className="label text-bronze" style={{ fontSize: '0.6rem', letterSpacing: '0.22em' }}>Journal</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={[
                  'label text-[0.65rem] underline-anim',
                  location.pathname.startsWith(to) ? 'text-bronze' : 'text-ink/60 hover:text-ink',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-ink/60 hover:text-bronze transition-colors duration-300 hidden md:flex"
              aria-label="Recherche"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link to="/contact" className="hidden md:inline-flex btn-primary py-2.5 px-5 text-[0.6rem]">
              S'Abonner
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 md:hidden text-ink/70 hover:text-bronze transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
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
      </header>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-ink z-[150] flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-2 mb-16">
              {[{ to: '/', label: 'Accueil' }, ...NAV_LINKS].map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Link
                    to={to}
                    className="block font-serif text-5xl text-cream/90 hover:text-bronze transition-colors leading-tight py-3 border-b border-cream/10"
                  >
                    {label}
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
              <span className="label text-cream/30" style={{ fontSize: '0.6rem' }}>Atelier Journal © 2026</span>
              <div className="flex flex-col gap-1 text-right">
                <span className="label text-bronze" style={{ fontSize: '0.6rem' }}>Paris, France</span>
                <span className="label text-cream/30" style={{ fontSize: '0.6rem' }}>contact@atelierjournal.fr</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FooterLink = ({ to, children }) => (
  <Link to={to} className="underline-anim text-stone/60 hover:text-cream text-sm font-light">
    {children}
  </Link>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-night text-cream pt-24 pb-10 relative overflow-hidden noise">
      {/* Top section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20">
        <div className="border-b border-cream/10 pb-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="block mb-8">
              <span className="font-serif text-4xl text-cream tracking-tight">Atelier Journal</span>
            </Link>
            <p className="text-stone/60 text-sm leading-relaxed max-w-xs font-light">
              Un espace de réflexion sur le design, la culture visuelle et les stratégies qui définissent l&apos;esthétique contemporaine.
            </p>
            <div className="mt-10 flex gap-4">
              {['Instagram', 'Pinterest', 'X'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 border border-cream/10 flex items-center justify-center text-stone/40 hover:border-bronze hover:text-bronze transition-all duration-300 label text-[0.55rem]"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="label text-bronze mb-6" style={{ fontSize: '0.6rem' }}>Navigation</h4>
              <ul className="space-y-4">
                {[['/', 'Accueil'], ['/articles', 'Éditions'], ['/about', 'Concept'], ['/contact', 'Contact']].map(([to, l]) => (
                  <li key={to}><FooterLink to={to}>{l}</FooterLink></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="label text-bronze mb-6" style={{ fontSize: '0.6rem' }}>Thématiques</h4>
              <ul className="space-y-4">
                {['Design', 'Culture', 'Stratégie', 'Créativité', 'Mode'].map(c => (
                  <li key={c}><FooterLink to="/articles">{c}</FooterLink></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="label text-bronze mb-6" style={{ fontSize: '0.6rem' }}>Newsletter</h4>
              <p className="text-stone/50 text-sm mb-6 leading-relaxed font-light">
                Sélection éditoriale mensuelle, sans bruit.
              </p>
              <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="bg-cream/5 border border-cream/10 text-cream placeholder:text-stone/30 text-sm px-4 py-3 outline-none focus:border-bronze/50 transition-colors duration-300"
                />
                <button type="submit" className="btn-primary justify-center py-3 text-[0.6rem]">
                  S&apos;inscrire <ArrowUpRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="label text-stone/30" style={{ fontSize: '0.6rem' }}>
          © {currentYear} Atelier Journal — Tous droits réservés
        </span>
        <div className="flex gap-8">
          {['Mentions légales', 'Confidentialité', 'CGU'].map(l => (
            <a key={l} href="#" className="label text-stone/30 hover:text-bronze transition-colors" style={{ fontSize: '0.6rem' }}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
