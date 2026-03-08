import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { articles, categories, authors } from '../data/mockData';

const ease = [0.19, 1, 0.22, 1];

const ArticleCard = ({ article, index, view }) => {
  const author = authors.find(a => a.id === article.authorId);

  if (view === 'list') {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease, delay: index * 0.04 }}
        className="group border-b border-stone/40 py-8 first:pt-0"
      >
        <Link to={/article/} className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-3 md:col-span-2 overflow-hidden aspect-square">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover img-hover grayscale-editorial"
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
              <ArrowUpRight size={14} className="text-bronze ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, ease, delay: index * 0.06 }}
      className="group"
    >
      <Link to={/article/} className="block">
        <div className="relative overflow-hidden mb-6 aspect-[3/2]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover img-hover grayscale-editorial"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="absolute top-4 left-4 font-mono text-cream/70 bg-night/50 backdrop-blur-sm px-3 py-1 text-[0.6rem] tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="absolute bottom-4 right-4 w-9 h-9 bg-cream flex items-center justify-center translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-expo">
            <ArrowUpRight size={15} className="text-ink" />
          </div>
          {article.tags?.slice(0, 1).map(tag => (
            <span key={tag} className="absolute top-4 right-4 label bg-cream/90 text-ink px-3 py-1" style={{ fontSize: '0.55rem' }}>
              {tag}
            </span>
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

const Articles = () => {
  const [activeFilter, setActiveFilter] = useState('Tout');
  const [view, setView] = useState('grid');

  const filters = ['Tout', ...categories.map(c => c.name)];

  const filtered = activeFilter === 'Tout'
    ? articles
    : articles.filter(a => a.category === activeFilter);

  return (
    <div className="pt-36 pb-32 min-h-screen bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Page header */}
        <div className="mb-16 md:mb-24 border-b border-stone/40 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-end">
            <div>
              <span className="label text-bronze mb-4 block" style={{ fontSize: '0.6rem' }}>Archive &mdash; {filtered.length} articles</span>
              <h1 className="font-serif text-display text-ink leading-none">Éditions</h1>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="text-ink/45 text-sm font-light max-w-sm leading-relaxed">
                L&apos;ensemble de nos articles, chroniques et réflexions sur le design, la culture et les idées qui façonnent notre époque.
              </p>
              {/* View toggle */}
              <div className="flex items-center gap-2 mt-4">
                <button onClick={() => setView('grid')} className={`p-2 border transition-colors duration-300 ${view === 'grid' ? 'bg-ink text-cream border-ink' : 'border-stone/50 text-ink/40 hover:border-ink/40'}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="0" width="6" height="6" /><rect x="10" y="0" width="6" height="6" />
                    <rect x="0" y="10" width="6" height="6" /><rect x="10" y="10" width="6" height="6" />
                  </svg>
                </button>
                <button onClick={() => setView('list')} className={`p-2 border transition-colors duration-300 ${view === 'list' ? 'bg-ink text-cream border-ink' : 'border-stone/50 text-ink/40 hover:border-ink/40'}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="0" width="16" height="2.5" /><rect x="0" y="6.5" width="16" height="2.5" /><rect x="0" y="13" width="16" height="2.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-16">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={[
                'label text-[0.6rem] pb-2 border-b-2 transition-all duration-400',
                activeFilter === f
                  ? 'border-bronze text-bronze'
                  : 'border-transparent text-ink/40 hover:text-ink/70 hover:border-stone',
              ].join(' ')}
            >
              {f}
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

        {/* Pagination placeholder */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-10 h-10 label flex items-center justify-center border transition-all duration-300 ${n === 1 ? 'bg-ink text-cream border-ink' : 'border-stone text-ink/40 hover:border-ink/40'}`} style={{ fontSize: '0.6rem' }}>
                {n}
              </button>
            ))}
            <button className="h-10 px-5 label flex items-center gap-2 border border-stone text-ink/40 hover:border-ink/40 transition-colors" style={{ fontSize: '0.6rem' }}>
              Suivant <ArrowRight size={12} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Articles;
