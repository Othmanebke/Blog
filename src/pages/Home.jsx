import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { articles, categories, authors } from '../data/mockData';

const ease = [0.19, 1, 0.22, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease, delay },
});

// ─── Hero ──────────────────────────────────────────────
const Hero = ({ article }) => {
  const author = authors.find(a => a.id === article.authorId);
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Fullscreen image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0"
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover grayscale-editorial"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/40 to-transparent" />
      </motion.div>

      {/* Category label top-center (desktop) */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-36 flex justify-between items-start">
        <div />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="hidden md:flex flex-col items-end gap-2"
        >
          <span className="label text-stone/50" style={{ fontSize: '0.6rem' }}>À la une</span>
          <span className="text-stone/30 text-xs">No. 001</span>
        </motion.div>
      </div>

      {/* Content bottom */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-16 md:pb-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="w-6 h-px bg-bronze" />
            <span className="label text-bronze" style={{ fontSize: '0.6rem' }}>{article.category}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease }}
            className="text-hero font-serif text-cream text-balance mb-8 leading-tight"
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-stone/60 text-lg font-light max-w-2xl mb-10 leading-relaxed hidden md:block"
          >
            {article.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex items-center gap-8"
          >
            <Link to={/article/} className="btn-primary">
              Lire l&apos;article <ArrowUpRight size={14} />
            </Link>
            <div className="hidden md:flex items-center gap-3">
              {author && (
                <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover grayscale" />
              )}
              <div className="flex flex-col">
                <span className="label text-cream/50" style={{ fontSize: '0.6rem' }}>{author?.name}</span>
                <span className="label text-stone/30" style={{ fontSize: '0.55rem' }}>{article.readTime} de lecture</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2"
      >
        <span className="label text-cream/20" style={{ fontSize: '0.55rem', writingMode: 'vertical-lr' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-cream/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};

// ─── Article Card – Large ───────────────────────────────
const CardLarge = ({ article, index }) => {
  const author = authors.find(a => a.id === article.authorId);
  return (
    <motion.article {...fadeUp(index * 0.1)} className="group">
      <Link to={/article/} className="block">
        <div className="relative overflow-hidden mb-7 aspect-[4/3]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover img-hover grayscale-editorial"
          />
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/8 transition-colors duration-700" />
          {/* Article number */}
          <span className="absolute top-5 left-5 font-mono text-2xs text-cream/60 bg-night/40 backdrop-blur-sm px-3 py-1">
            0{index + 2}
          </span>
          <div className="absolute bottom-5 right-5 w-8 h-8 bg-cream/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
            <ArrowUpRight size={14} className="text-ink" />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="label text-bronze" style={{ fontSize: '0.6rem' }}>{article.category}</span>
          <span className="text-stone w-1 h-1 rounded-full bg-stone/50 block" />
          <span className="label text-ink/40" style={{ fontSize: '0.6rem' }}>{article.readTime}</span>
        </div>
        <h3 className="font-serif text-xl md:text-2xl text-ink mb-4 leading-snug group-hover:text-bronze transition-colors duration-500 text-balance">
          {article.title}
        </h3>
        <p className="text-ink/50 text-sm font-light leading-relaxed line-clamp-2 mb-6">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3">
          {author && (
            <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full object-cover grayscale" />
          )}
          <span className="label text-ink/40" style={{ fontSize: '0.6rem' }}>{author?.name}</span>
          <span className="label text-stone/50 ml-auto" style={{ fontSize: '0.6rem' }}>{article.date}</span>
        </div>
      </Link>
    </motion.article>
  );
};

// ─── Article Card – Compact (horizontal) ───────────────
const CardCompact = ({ article, index }) => {
  const author = authors.find(a => a.id === article.authorId);
  return (
    <motion.article {...fadeUp(index * 0.08)} className="group border-b border-stone/40 pb-6 last:border-0">
      <Link to={/article/} className="flex gap-5 items-start">
        <div className="shrink-0 overflow-hidden w-20 h-20 md:w-28 md:h-28">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover img-hover grayscale-editorial" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="label text-bronze" style={{ fontSize: '0.55rem' }}>{article.category}</span>
          </div>
          <h4 className="font-serif text-base leading-snug text-ink mb-2 group-hover:text-bronze transition-colors duration-400 line-clamp-2">
            {article.title}
          </h4>
          <span className="label text-ink/30" style={{ fontSize: '0.55rem' }}>{author?.name} &mdash; {article.readTime}</span>
        </div>
      </Link>
    </motion.article>
  );
};

// ─── Category Grid ──────────────────────────────────────
const CategoryGrid = () => (
  <section className="py-24 md:py-32 border-t border-stone/40 bg-cream-200">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="section-heading mb-16">
        <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Thématiques</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            {...fadeUp(i * 0.07)}
          >
            <Link
              to="/articles"
              className="group block border border-stone/50 p-6 md:p-8 hover:border-bronze hover:bg-cream transition-all duration-500 h-full"
            >
              <span className="font-mono text-stone/40 text-xs mb-4 block">0{i + 1}</span>
              <h3 className="font-serif text-xl md:text-2xl text-ink mb-3 group-hover:text-bronze transition-colors duration-400">
                {cat.name}
              </h3>
              <p className="text-ink/40 text-xs leading-relaxed font-light hidden md:block">
                {cat.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span className="label" style={{ fontSize: '0.55rem' }}>Explorer</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Authors Section ────────────────────────────────────
const AuthorsSection = () => (
  <section className="py-24 md:py-32 bg-ink text-cream">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center gap-6 mb-16">
        <span className="label text-bronze" style={{ fontSize: '0.65rem' }}>Les voix du Journal</span>
        <div className="flex-1 h-px bg-cream/10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {authors.map((author, i) => (
          <motion.div
            key={author.id}
            {...fadeUp(i * 0.15)}
            className="group border-b md:border-b-0 md:border-r border-cream/10 last:border-0 p-8 md:p-10 hover:bg-cream/5 transition-colors duration-500"
          >
            <div className="flex items-start gap-5 mb-6">
              <div className="relative shrink-0">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-14 h-14 object-cover grayscale rounded-sm"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl text-cream mb-0.5">{author.name}</h3>
                <span className="label text-bronze" style={{ fontSize: '0.58rem' }}>{author.role}</span>
              </div>
            </div>
            <p className="text-stone/50 text-sm font-light leading-relaxed line-clamp-3 mb-6">
              {author.bio}
            </p>
            <span className="label text-cream/20" style={{ fontSize: '0.58rem' }}>
              {author.articles} articles publiés
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Newsletter Section ─────────────────────────────────
const NewsletterSection = () => (
  <section className="py-24 bg-bronze/10 border-y border-bronze/20">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp()}>
          <span className="label text-bronze mb-6 block" style={{ fontSize: '0.65rem' }}>Newsletter Éditoriale</span>
          <h2 className="font-serif text-3xl md:text-5xl text-ink mb-6 leading-snug">
            Un regard mensuel sur<br />
            <em>l&apos;essentiel créatif</em>
          </h2>
          <p className="text-ink/50 font-light leading-relaxed mb-10">
            Sélection d&apos;articles, découvertes visuelles et réflexions éditoriales. Envoyée une fois par mois, sans compromis sur la qualité.
          </p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.fr"
              className="flex-1 bg-cream border border-stone px-5 py-4 text-ink text-sm outline-none focus:border-bronze transition-colors duration-300 placeholder:text-stone"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              S&apos;abonner <ArrowUpRight size={14} />
            </button>
          </form>
          <p className="text-ink/30 text-xs mt-5 font-light">Désinscription en un clic. Aucun spam.</p>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Editorial Quote ────────────────────────────────────
const EditorialQuote = () => (
  <section className="py-24 md:py-40">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <motion.blockquote
        {...fadeUp()}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="font-serif text-8xl text-bronze/20 leading-none block mb-[-2rem]">&ldquo;</span>
        <p className="font-serif text-2xl md:text-4xl text-ink leading-snug text-balance mb-10">
          La création n&apos;est pas un acte solitaire. C&apos;est une conversation discrète entre ceux qui regardent vraiment.
        </p>
        <cite className="label text-ink/30 not-italic" style={{ fontSize: '0.65rem' }}>
          — Aurélie Morel, Rédactrice en Chef
        </cite>
      </motion.blockquote>
    </div>
  </section>
);

// ─── Main ───────────────────────────────────────────────
const Home = () => {
  const featured = articles.find(a => a.featured);
  const latest = articles.filter(a => !a.featured);
  const mainGrid = latest.slice(0, 3);
  const sideList = latest.slice(3);

  return (
    <div className="bg-cream">
      <Hero article={featured} />

      {/* Latest editions */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="section-heading">
            <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Dernières Éditions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {/* Main 3-col grid */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
              <div className="sm:col-span-2">
                {mainGrid[0] && <CardLarge article={mainGrid[0]} index={0} />}
              </div>
              {mainGrid.slice(1).map((a, i) => (
                <CardLarge key={a.id} article={a} index={i + 1} />
              ))}
            </div>

            {/* Sidebar compact list */}
            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-stone/30 pt-10 md:pt-0 md:pl-10">
              <span className="label text-ink/30 mb-8 block" style={{ fontSize: '0.6rem' }}>À Lire Aussi</span>
              <div className="flex flex-col gap-6">
                {sideList.map((a, i) => (
                  <CardCompact key={a.id} article={a} index={i} />
                ))}
              </div>
              <div className="mt-10">
                <Link to="/articles" className="btn-ghost w-full justify-center">
                  Voir toutes les éditions <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditorialQuote />
      <CategoryGrid />
      <AuthorsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
