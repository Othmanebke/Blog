import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Clock, Share2 } from 'lucide-react';
import { articles, authors } from '../data/mockData';
import { useScrollProgress } from '../hooks/useScrollProgress';

const ease = [0.19, 1, 0.22, 1];

/* ── Word reveal for hero title ───────────────────────── */
const WordReveal = ({ children, delay = 0 }) => {
  const words = typeof children === 'string' ? children.split(' ') : [children];
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 3 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.04 }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  );
};

/* ── Related card with tilt ───────────────────────────── */
const RelatedCard = ({ article, index }) => {
  const author = authors.find(a => a.id === article.authorId);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease, delay: index * 0.12 }}
    >
      <Link to={`/article/${article.id}`} className="group block">
        <div className="overflow-hidden aspect-[3/2] mb-5 relative">
          <motion.img
            src={article.image}
            alt={article.title}
            style={{ y }}
            className="w-full h-[130%] object-cover grayscale-editorial group-hover:grayscale-0 transition-[filter] duration-700"
          />
          <div className="absolute inset-0 bg-night/0 group-hover:bg-night/15 transition-colors duration-500" />
        </div>
        <span className="label text-bronze mb-3 block" style={{ fontSize: '0.58rem' }}>{article.category}</span>
        <h4 className="font-serif text-lg text-ink leading-snug group-hover:text-bronze transition-colors duration-400 text-balance mb-3">
          {article.title}
        </h4>
        <span className="label text-ink/30" style={{ fontSize: '0.55rem' }}>{author?.name}</span>
      </Link>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id)) || articles[0];
  const author = authors.find(a => a.id === article.authorId);
  const related = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
  const progress = useScrollProgress();
  const heroRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const heroBlur = useTransform(scrollY, [0, 600], [0, 8]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const titleY = useTransform(scrollY, [0, 500], [0, -80]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="bg-cream min-h-screen">
      {/* Reading progress */}
      <motion.div
        className="progress-bar"
        style={{ width: `${progress * 100}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* ── Cinematic Hero ─────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden">
        {/* Multi-layer parallax: image layer */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <motion.img
            src={article.image}
            alt={article.title}
            style={{ scale: heroScale, filter: heroBlur.get ? undefined : undefined }}
            initial={{ scale: 1.2, filter: 'brightness(0) blur(20px)' }}
            animate={{ scale: 1, filter: 'brightness(1) blur(0px)' }}
            transition={{ duration: 2, ease }}
            className="w-full h-full object-cover grayscale-editorial"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
        </motion.div>

        {/* Floating issue number */}
        <motion.div
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute top-32 right-6 md:right-12 hidden md:flex flex-col items-end gap-1"
        >
          <span className="label text-ink/30" style={{ fontSize: '0.58rem' }}>Issue — 2026</span>
          <span className="font-mono text-ink/20 text-[0.55rem]">No. {String(article.id).padStart(3, '0')}</span>
        </motion.div>

        {/* Text layer with different parallax speed */}
        <motion.div
          style={{ y: titleY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-16 md:pb-24"
        >
          {/* Category line */}
          <motion.div className="flex items-center gap-3 mb-7">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease }}
              className="w-10 h-px bg-bronze origin-left"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="label text-bronze"
              style={{ fontSize: '0.6rem' }}
            >
              {article.category}
            </motion.span>
          </motion.div>

          {/* Word-by-word title reveal */}
          <h1 className="font-display font-black uppercase text-hero text-ink text-balance leading-tight max-w-4xl mb-8 tracking-tight">
            <WordReveal delay={0.5}>{article.title}</WordReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-stone/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed hidden md:block"
          >
            {article.excerpt}
          </motion.p>
        </motion.div>
      </section>

      {/* ── Meta bar ───────────────────────────────────── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="sticky top-[60px] z-50 bg-cream/95 backdrop-blur-md border-b border-stone/40"
      >
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
      </motion.div>

      {/* ── Body ───────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

          {/* TOC sidebar */}
          <aside className="hidden md:block md:col-span-3">
            <div className="sticky top-40">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="label text-ink/30 mb-6 block"
                style={{ fontSize: '0.58rem' }}
              >
                Dans cet article
              </motion.span>
              <nav className="flex flex-col gap-3">
                {article.content?.map((_, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="label text-ink/40 hover:text-bronze transition-colors text-left leading-relaxed"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {i === 0 ? 'Introduction' : `Partie ${i + 1}`}
                  </motion.button>
                ))}
                <div className="mt-8 pt-6 border-t border-stone/40">
                  {article.tags?.map((tag, ti) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: ti * 0.05 }}
                      className="inline-block label border border-stone/50 text-ink/40 px-3 py-1.5 mr-2 mb-2 hover:border-bronze hover:text-bronze transition-colors cursor-pointer"
                      style={{ fontSize: '0.55rem' }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </nav>
            </div>
          </aside>

          {/* Main content — paragraphs from alternating sides */}
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="font-serif text-2xl md:text-3xl text-ink/80 leading-relaxed mb-14 text-balance"
            >
              {article.excerpt}
            </motion.p>

            <div className="article-body">
              {article.content?.map((para, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, rotate: i % 2 === 0 ? -1 : 1 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, ease }}
                >
                  {/* Inline image after first paragraph — zooms in on scroll */}
                  {i === 1 && article.image2 && (
                    <InlineImage src={article.image2} />
                  )}
                  <p>{para}</p>
                  {/* Pull quote at midpoint */}
                  {i === Math.floor((article.content.length - 1) / 2) && article.pullQuote && (
                    <motion.blockquote
                      initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease }}
                    >
                      {article.pullQuote}
                    </motion.blockquote>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Author bio */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="mt-16 pt-10 border-t border-stone/40 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"
            >
              <div className="flex items-center gap-5">
                {author && (
                  <>
                    <motion.img
                      src={author.avatar}
                      alt={author.name}
                      className="w-14 h-14 rounded-full grayscale object-cover"
                      whileHover={{ scale: 1.1, filter: 'grayscale(0)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    />
                    <div>
                      <h4 className="font-serif text-lg text-ink mb-0.5">{author.name}</h4>
                      <span className="label text-bronze block" style={{ fontSize: '0.58rem' }}>{author.role}</span>
                      <p className="text-ink/40 text-xs font-light mt-1 max-w-xs">{author.bio}</p>
                    </div>
                  </>
                )}
              </div>
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost shrink-0"
              >
                <Share2 size={14} strokeWidth={1.5} />
                {copied ? 'Lien copié !' : 'Partager'}
              </motion.button>
            </motion.div>
          </div>

          <div className="hidden md:block md:col-span-2" />
        </div>
      </div>

      {/* ── Related articles ───────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-stone/40 pt-20 pb-32 bg-cream-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="section-heading mb-14">
              <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>À lire ensuite</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {related.map((a, i) => <RelatedCard key={a.id} article={a} index={i} />)}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 flex justify-center"
            >
              <Link to="/articles" className="btn-ghost">
                Toutes les éditions <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </article>
  );
};

/* ── Inline image that zooms on scroll ────────────────── */
const InlineImage = ({ src }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.02]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="my-12 -mx-6 md:-mx-16 overflow-hidden"
    >
      <img src={src} alt="" className="w-full h-80 md:h-[500px] object-cover grayscale-editorial" />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-ink/30 text-xs italic mt-3 px-6 md:px-16"
      >
        Direction artistique — Atelier Journal
      </motion.p>
    </motion.div>
  );
};

export default ArticleDetail;
