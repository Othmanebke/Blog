import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled || isMenuOpen ? 'bg-luxury-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif tracking-widest uppercase text-luxury-black z-50">
            Atelier Journal
          </Link>
          <nav className="hidden md:flex space-x-10 text-sm font-medium tracking-widest uppercase items-center">
            <Link to="/" className="hover:text-luxury-bronze transition-colors">Accueil</Link>
            <Link to="/articles" className="hover:text-luxury-bronze transition-colors">Éditions</Link>
            <Link to="/about" className="hover:text-luxury-bronze transition-colors">Concept</Link>
            <Link to="/contact" className="hover:text-luxury-bronze transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4 z-50">
            <button className="p-2 hover:text-luxury-bronze transition-colors"><Search size={20} strokeWidth={1.5} /></button>
            <button 
              className="p-2 md:hidden hover:text-luxury-bronze transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-luxury-cream z-[90] flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col items-center space-y-12">
              <Link to="/" className="text-4xl font-serif hover:text-luxury-bronze transition-colors">Accueil</Link>
              <Link to="/articles" className="text-4xl font-serif hover:text-luxury-bronze transition-colors">Éditions</Link>
              <Link to="/about" className="text-4xl font-serif hover:text-luxury-bronze transition-colors">Concept</Link>
              <Link to="/contact" className="text-4xl font-serif hover:text-luxury-bronze transition-colors">Contact</Link>
            </nav>
            <div className="absolute bottom-12 text-sm uppercase tracking-widest text-luxury-gray">
              Atelier Journal © 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-luxury-black text-luxury-cream py-24 border-t border-luxury-gray/20">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-luxury-gray/20 pb-16">
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-3xl font-serif mb-6">Atelier Journal</h2>
        <p className="text-luxury-gray text-sm md:w-2/3 leading-relaxed">
          Un espace de réflexion sur le design, la culture visuelle, et la stratégie des marques contemporaines. Pensé pour les esprits créatifs.
        </p>
      </div>
      <div>
        <h3 className="text-sm uppercase tracking-widest mb-6 text-luxury-bronze">Navigation</h3>
        <ul className="space-y-4 text-sm font-medium">
          <li><Link to="/" className="hover:text-white transition-colors text-luxury-gray">Accueil</Link></li>
          <li><Link to="/articles" className="hover:text-white transition-colors text-luxury-gray">Éditions</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors text-luxury-gray">Concept</Link></li>
          <li><Link to="/contact" className="hover:text-white transition-colors text-luxury-gray">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm uppercase tracking-widest mb-6 text-luxury-bronze">Newsletter</h3>
        <p className="text-sm text-luxury-gray mb-4">Recevez notre sélection éditoriale chaque mois.</p>
        <div className="flex border-b border-luxury-gray/50 pb-2 overflow-hidden group">
          <input type="email" placeholder="Votre email" className="bg-transparent w-full outline-none text-sm placeholder:text-luxury-gray focus:placeholder-transparent duration-300" />
          <button className="uppercase text-xs tracking-widest group-hover:text-luxury-bronze transition-colors">S'inscrire</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-luxury-gray/50 tracking-widest uppercase">
      <span>© 2026 Atelier Journal. Tous droits réservés.</span>
      <div className="space-x-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
        <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
      </div>
    </div>
  </footer>
);

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-luxury-cream">
      <Navbar />
      <main className="flex-1 w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
