import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { articles, categories, authors } from '../data/mockData';

const ease = [0.19, 1, 0.22, 1];

/* ── Card with parallax image + 3D tilt hover ─────────── */
const ArticleCard = ({ article, index, view }) => {
  const author = authors.find(a => a.id === article.authorId);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  if (view === 'list') {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.6, ease, delay: index * 0.05 }}
        className="group border-b border-stone/40 py-8 first:pt-0"
      >
        <Link to={`/article/${article.id}`} className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-3 md:col-span-2 overflow-hidden aspect-square relative">
            <motion.img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease }}
            />
          </div>
          <div className="col-span-9 md:col-span-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="label text-bronze" style={{ fontSize: '0.58rem' }}>{article.category}</span>
              <span className="bg-stone/50 w-1 h-1 rounded-full" />
              <span className="label text-ink/30" style={{ fontSize: '0.58rem' }}>{article.readTime}</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-ink mb-3 group-hover:text-bronze transition-colors duration-400 text-balance leading-snug">
              {article.title}
            </h3>
            <p className="text-ink/40 text-sm font-light leading-relaxed line-clamp-2 mb-4 hidden md:block">{article.excerpt}</p>
            <div className="flex items-center gap-3">
              {author && <img src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full grayscale object-cover" />}
              <span className="label text-ink/30" style={{ fontSize: '0.58rem' }}>{author?.name} &mdash; {article.date}</span>
              <motion.div
                className="ml-auto"
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                animate={{ x: 0, opacity: 0 }}
              >
                <ArrowUpRight size={14} className="text-bronze" />
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
      animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
      exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
      transition={{ duration: 0.8, ease, delay: index * 0.08 }}
      className="group"
    >
      <Link to={`/article/${article.id}`} className="block">
        <div className="relative overflow-hidden mb-6 aspect-[3/2]">
          <motion.img
            src={article.image}
            alt={article.title}
            style={{ y: imgY }}
            className="w-[100%] h-[120%] object-cover grayscale-editorial group-hover:grayscale-0 transition-[filter] duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="absolute top-4 left-4 font-mono text-cream/70 bg-night/50 backdrop-blur-sm px-3 py-1 text-[0.6rem] tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
          <motion.div
            className="absolute bottom-4 right-4 w-9 h-9 bg-cream flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 45 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            <ArrowUpRight size={15} className="text-ink" />
          </motion.div>
          {article.tags?.slice(0, 1).map(tag => (
            <span key={tag} className="absolute top-4 right-4 label bg-cream/90 text-ink px-3 py-1" style={{ fontSize: '0.55rem' }}>{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="label text-bronze" style={{ fontSize: '0.6rem' }}>{article.category}</span>
          <span className="bg-stone/50 w-1 h-1 rounded-full" />
          <span className="label text-ink/30" style={{ fontSize: '0.6rem' }}>{article.readTime}</span>
        </div>
        <h3 className="font-serif text-xl md:text-2xl text-ink leading-snug mb-4 group-hover:text-bronze transition-colors duration-500 text-balance">
          {article.title}
        </h3>
        <p className="text-ink/45 text-sm font-light leading-relaxed line-clamp-2 mb-6">{article.excerpt}</p>
        <div className="flex items-center gap-3">
          {author && <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full grayscale object-cover" />}
          <div className="flex flex-col">
            <span className="label text-ink/40" style={{ fontSize: '0.58rem' }}>{author?.name}</span>
            <span className="label text-ink/25" style={{ fontSize: '0.55rem' }}>{article.date}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const Articles = () => {
  const [activeFilter, setActiveFilter] = useState('Tout');
  const [view, setView] = useState('grid');

  const filters = ['Tout', ...categories.map(c => c.name)];
  const filtered = activeFilter === 'Tout' ? articles : articles.filter(a => a.category === activeFilter);

  return (
    <div className="pt-36 pb-32 min-h-screen bg-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Page header — title with mask + stagger */}
        <div className="mb-16 md:mb-24 border-b border-stone/40 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-end">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease }}
                className="label text-bronze mb-4 block"
                style={{ fontSize: '0.6rem' }}
              >
                Archive &mdash; {filtered.length} articles
              </motion.span>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', rotate: 3 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ duration: 1, ease }}
                  className="font-serif text-display text-ink leading-none"
                >
                  Éditions
                </motion.h1>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="flex flex-col gap-4 md:items-end"
            >
              <p className="text-ink/45 text-sm font-light max-w-sm leading-relaxed">
                L&apos;ensemble de nos articles, chroniques et réflexions sur le design, la culture et les idées qui façonnent notre époque.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <motion.button
                  onClick={() => setView('grid')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 border transition-colors duration-300 ${view === 'grid' ? 'bg-ink text-cream border-ink' : 'border-stone/50 text-ink/40 hover:border-ink/40'}`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="0" width="6" height="6" /><rect x="10" y="0" width="6" height="6" />
                    <rect x="0" y="10" width="6" height="6" /><rect x="10" y="10" width="6" height="6" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => setView('list')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 border transition-colors duration-300 ${view === 'list' ? 'bg-ink text-cream border-ink' : 'border-stone/50 text-ink/40 hover:border-ink/40'}`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="0" width="16" height="2.5" /><rect x="0" y="6.5" width="16" height="2.5" /><rect x="0" y="13" width="16" height="2.5" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters with animated underline */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-16 relative">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="label text-[0.6rem] pb-2 relative"
            >
              <span className={`transition-colors duration-300 ${activeFilter === f ? 'text-bronze' : 'text-ink/40 hover:text-ink/70'}`}>
                {f}
              </span>
              {activeFilter === f && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid / List */}
        <motion.div layout>
          <AnimatePresence mode="popLayout">
            {view === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
              >
                {filtered.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} view="grid" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filtered.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} view="list" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(n => (
              <motion.button
                key={n}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 label flex items-center justify-center border transition-all duration-300 ${n === 1 ? 'bg-ink text-cream border-ink' : 'border-stone text-ink/40 hover:border-ink/40'}`}
                style={{ fontSize: '0.6rem' }}
              >
                {n}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ x: 4 }}
              className="h-10 px-5 label flex items-center gap-2 border border-stone text-ink/40 hover:border-ink/40 transition-colors"
              style={{ fontSize: '0.6rem' }}
            >
              Suivant <ArrowRight size={12} />
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Articles;
