import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Clock, Share2 } from 'lucide-react';
import { articles, authors } from '../data/mockData';
import { useScrollProgress } from '../hooks/useScrollProgress';

const ease = [0.19, 1, 0.22, 1];

const RelatedCard = ({ article }) => {
  const author = authors.find(a => a.id === article.authorId);
  return (
    <Link to={/article/} className="group block">
      <div className="overflow-hidden aspect-[3/2] mb-5">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover img-hover grayscale-editorial" />
      </div>
      <span className="label text-bronze mb-3 block" style={{ fontSize: '0.58rem' }}>{article.category}</span>
      <h4 className="font-serif text-lg text-ink leading-snug group-hover:text-bronze transition-colors duration-400 text-balance mb-3">
        {article.title}
      </h4>
      <span className="label text-ink/30" style={{ fontSize: '0.55rem' }}>{author?.name}</span>
    </Link>
  );
};

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id)) || articles[0];
  const author = authors.find(a => a.id === article.authorId);
  const related = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
  const progress = useScrollProgress();
  const heroRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="bg-cream min-h-screen">
      {/* Reading progress */}
      <div
        className="progress-bar"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease }}
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover grayscale-editorial"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
        </motion.div>

        {/* Floating meta top right */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute top-32 right-6 md:right-12 flex flex-col items-end gap-1 hidden md:flex"
        >
          <span className="label text-cream/30" style={{ fontSize: '0.58rem' }}>Issue — 2026</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-16 md:pb-24"
        >
          <div className="flex items-center gap-3 mb-7">
            <span className="w-6 h-px bg-bronze" />
            <span className="label text-bronze" style={{ fontSize: '0.6rem' }}>{article.category}</span>
          </div>
          <h1 className="font-serif text-hero text-cream text-balance leading-tight max-w-4xl mb-8">
            {article.title}
          </h1>
          <p className="text-stone/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed hidden md:block">
            {article.excerpt}
          </p>
        </motion.div>
      </section>

      {/* Meta bar */}
      <div className="sticky top-[60px] z-50 bg-cream/95 backdrop-blur-md border-b border-stone/40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3 flex items-center justify-between gap-4">
          <Link to="/articles" className="flex items-center gap-2 text-ink/40 hover:text-ink transition-colors duration-300 group">
            <ArrowLeft size={15} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="label hidden md:block" style={{ fontSize: '0.58rem' }}>Retour aux éditions</span>
          </Link>

          <div className="flex items-center gap-6">
            {author && (
              <div className="flex items-center gap-2">
                <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full grayscale object-cover" />
                <span className="label text-ink/50 hidden md:block" style={{ fontSize: '0.58rem' }}>{author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-ink/30">
              <Clock size={12} strokeWidth={1.5} />
              <span className="label" style={{ fontSize: '0.58rem' }}>{article.readTime}</span>
            </div>
            <span className="label text-ink/30 hidden md:block" style={{ fontSize: '0.58rem' }}>{article.date}</span>
            <button onClick={handleShare} className="flex items-center gap-2 label text-ink/40 hover:text-bronze transition-colors duration-300" style={{ fontSize: '0.58rem' }}>
              <Share2 size={13} strokeWidth={1.5} />
              <span className="hidden md:block">{copied ? 'Copié !' : 'Partager'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

          {/* Sidebar Table of Contents */}
          <aside className="hidden md:block md:col-span-3">
            <div className="sticky top-40">
              <span className="label text-ink/30 mb-6 block" style={{ fontSize: '0.58rem' }}>Dans cet article</span>
              <nav className="flex flex-col gap-3">
                {article.content?.map((_, i) => (
                  <button key={i} className="label text-ink/40 hover:text-bronze transition-colors text-left leading-relaxed" style={{ fontSize: '0.6rem' }}>
                    {i === 0 ? 'Introduction' : `Partie ${i + 1}`}
                  </button>
                ))}
                <div className="mt-8 pt-6 border-t border-stone/40">
                  {article.tags?.map(tag => (
                    <span key={tag} className="inline-block label border border-stone/50 text-ink/40 px-3 py-1.5 mr-2 mb-2 hover:border-bronze hover:text-bronze transition-colors cursor-pointer" style={{ fontSize: '0.55rem' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="md:col-span-7">
            {/* Lead paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="font-serif text-2xl md:text-3xl text-ink/80 leading-relaxed mb-14 text-balance"
            >
              {article.excerpt}
            </motion.p>

            <div className="article-body">
              {article.content?.map((para, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, ease, delay: 0 }}
                >
                  {i === 1 && article.image2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="my-12 -mx-6 md:-mx-16 overflow-hidden"
                    >
                      <img src={article.image2} alt="" className="w-full h-80 md:h-[500px] object-cover grayscale-editorial" />
                      <p className="text-ink/30 text-xs italic mt-3 px-6 md:px-16">Direction artistique — Atelier Journal</p>
                    </motion.div>
                  )}
                  <p>{para}</p>
                  {i === Math.floor((article.content.length - 1) / 2) && article.pullQuote && (
                    <blockquote>{article.pullQuote}</blockquote>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Article footer meta */}
            <div className="mt-16 pt-10 border-t border-stone/40 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div className="flex items-center gap-5">
                {author && (
                  <>
                    <img src={author.avatar} alt={author.name} className="w-14 h-14 rounded-full grayscale object-cover" />
                    <div>
                      <h4 className="font-serif text-lg text-ink mb-0.5">{author.name}</h4>
                      <span className="label text-bronze block" style={{ fontSize: '0.58rem' }}>{author.role}</span>
                      <p className="text-ink/40 text-xs font-light mt-1 max-w-xs">{author.bio}</p>
                    </div>
                  </>
                )}
              </div>
              <button onClick={handleShare} className="btn-ghost shrink-0">
                <Share2 size={14} strokeWidth={1.5} />
                {copied ? 'Lien copié !' : 'Partager'}
              </button>
            </div>
          </div>

          {/* Right spacer for 3-col look */}
          <div className="hidden md:block md:col-span-2" />
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-stone/40 pt-20 pb-32 bg-cream-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="section-heading mb-14">
              <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>À lire ensuite</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map(a => <RelatedCard key={a.id} article={a} />)}
            </div>
            <div className="mt-16 flex justify-center">
              <Link to="/articles" className="btn-ghost">
                Toutes les éditions <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default ArticleDetail;
