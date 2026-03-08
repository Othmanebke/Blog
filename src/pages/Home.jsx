import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { articles, categories, authors } from '../data/mockData';

const ease = [0.19, 1, 0.22, 1];

/* ── Word-by-word text reveal ─────────────────────────── */
const TextReveal = ({ children, className = '', delay = 0 }) => {
  const words = typeof children === 'string' ? children.split(' ') : [children];
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 3 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease, delay: delay + i * 0.04 }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ── Counter animation ────────────────────────────────── */
const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(value);
    if (isNaN(num)) { setDisplay(value); return; }
    let cur = 0;
    const step = Math.max(num / 80, 1);
    const t = setInterval(() => {
      cur += step;
      if (cur >= num) { setDisplay(num); clearInterval(t); }
      else setDisplay(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [isInView, value]);
  return <span ref={ref}>{display}{suffix}</span>;
};

/* ════════════════════════════════════════════════════════
   HERO — cinematic dark reveal
   ════════════════════════════════════════════════════════ */
const Hero = ({ article }) => {
  const author = authors.find(a => a.id === article.authorId);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-night">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.img
          src={article.image}
          alt={article.title}
          style={{ scale: imgScale }}
          initial={{ scale: 1.2, filter: 'brightness(0) blur(14px)' }}
          animate={{ scale: 1, filter: 'brightness(0.55) blur(0px)' }}
          transition={{ duration: 2.2, ease }}
          className="w-full h-full object-cover grayscale-editorial"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 noise opacity-60 pointer-events-none" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-20 md:pb-32"
      >
        {/* Category tag */}
        <motion.div className="flex items-center gap-4 mb-8 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.9, ease }}
            className="w-8 h-px bg-bronze origin-left"
          />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="label text-bronze"
            style={{ fontSize: '0.58rem' }}
          >
            {article.category}
          </motion.span>
        </motion.div>

        {/* Large hero title */}
        <h1
          className="font-display font-black uppercase text-ink leading-none text-balance mb-10 tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)' }}
        >
          <TextReveal delay={0.5}>{article.title}</TextReveal>
        </h1>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-ink/50 text-base font-light max-w-xl mb-10 leading-relaxed hidden md:block"
        >
          {article.excerpt}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.7 }}
          className="flex items-center gap-8"
        >
          <Link to={`/article/${article.id}`} className="btn-primary">
            Lire l&apos;article <ArrowUpRight size={13} />
          </Link>
          {author && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="hidden md:flex items-center gap-3"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-7 h-7 rounded-full object-cover grayscale"
              />
              <div className="flex flex-col">
                <span className="label text-ink/40" style={{ fontSize: '0.58rem' }}>{author.name}</span>
                <span className="label text-ink/25" style={{ fontSize: '0.52rem' }}>{article.readTime} de lecture</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-px h-14 bg-gradient-to-b from-ink/30 to-transparent"
        />
        <span className="label text-ink/20" style={{ fontSize: '0.52rem', writingMode: 'vertical-lr' }}>Scroll</span>
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   STATEMENT BAND — "SOME PIECES SETTLE. SOME DON'T."
   ════════════════════════════════════════════════════════ */
const StatementBand = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '4%']);

  return (
    <section ref={ref} className="py-28 md:py-40 bg-cream overflow-hidden border-t border-stone/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div style={{ x: x1 }}>
            <h2
              className="font-display font-black uppercase text-ink leading-none block tracking-tight mb-2"
              style={{ fontSize: 'clamp(3rem,9.5vw,9.5rem)' }}
            >
              <TextReveal delay={0}>Certaines choses</TextReveal>
            </h2>
          </motion.div>
          <motion.div style={{ x: x2 }}>
            <h2
              className="font-display font-black uppercase text-ink leading-none block tracking-tight mb-2"
              style={{ fontSize: 'clamp(3rem,9.5vw,9.5rem)' }}
            >
              <TextReveal delay={0.1}>S&apos;installent.</TextReveal>
            </h2>
          </motion.div>
          <motion.div style={{ x: x1 }}>
            <h2
              className="font-display font-black uppercase text-bronze leading-none block tracking-tight"
              style={{ fontSize: 'clamp(3rem,9.5vw,9.5rem)' }}
            >
              <TextReveal delay={0.2}>D&apos;autres non.</TextReveal>
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="h-px bg-stone/40 mt-16 origin-left"
        />
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   ARCHIVE / CATEGORIES — editorial list
   ════════════════════════════════════════════════════════ */
const ArchiveSection = () => (
  <section className="py-24 md:py-36 bg-cream-200">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      {/* Header */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          <p
            className="font-display font-black uppercase text-bronze leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem,12vw,12rem)' }}
          >
            L&apos;Archive
          </p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-ink/50 text-lg font-light max-w-xl mt-5 leading-relaxed"
        >
          De tout ce que je ne peux pas garder en un seul endroit.
        </motion.p>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.7, ease, delay: i * 0.07 }}
            className="group border-t border-stone/30 py-8 md:py-10 hover:border-bronze/60 transition-colors duration-500 cursor-pointer"
            style={{ borderRightWidth: i % 2 === 0 ? '1px' : '0', borderRightStyle: 'solid', borderRightColor: 'transparent' }}
          >
            <Link to="/articles" className="flex items-start justify-between gap-8 pr-4 md:pr-8">
              <div>
                <div className="flex items-center gap-5 mb-4">
                  <span className="font-mono text-bronze text-[0.6rem] tracking-widest">
                    0{i + 1}
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.07 }}
                    className="w-10 h-px bg-stone/40 origin-left group-hover:bg-bronze/60 transition-colors duration-500"
                  />
                </div>
                <h3
                  className="font-display font-black uppercase text-ink leading-none tracking-tight mb-3 group-hover:text-bronze transition-colors duration-400"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
                >
                  {cat.name}
                </h3>
                <p className="text-ink/35 text-sm font-light leading-relaxed max-w-xs">
                  {cat.description}
                </p>
              </div>
              <motion.div
                className="shrink-0 mt-1 text-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                whileHover={{ x: 4, y: -4 }}
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   HORIZONTAL SCROLL — articles carousel
   ════════════════════════════════════════════════════════ */
const HorizontalScroll = ({ items }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const rawX = useTransform(scrollYProgress, [0, 1], ['2%', '-65%']);
  const x = useSpring(rawX, { stiffness: 80, damping: 30 });

  return (
    <section ref={ref} className="relative h-[280vh] bg-cream">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full mb-10">
          <div className="flex items-center gap-6">
            <span className="label text-ink/35" style={{ fontSize: '0.62rem' }}>Dernières Éditions</span>
            <div className="flex-1 h-px bg-stone/30" />
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-12">
          {items.map((article, i) => {
            const author = authors.find(a => a.id === article.authorId);
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.9, ease, delay: i * 0.08 }}
                className="shrink-0 w-[85vw] md:w-[40vw] lg:w-[30vw]"
              >
                <Link to={`/article/${article.id}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3] mb-6">
                    <motion.img
                      src={article.image}
                      alt={article.title}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.9, ease }}
                      className="w-full h-full object-cover grayscale-editorial group-hover:grayscale-0 transition-[filter] duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
                    <span className="absolute top-4 left-4 font-mono text-ink/40 text-[0.6rem] bg-night/60 backdrop-blur-sm px-3 py-1 tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <motion.div
                      className="absolute bottom-4 right-4 w-9 h-9 bg-bronze flex items-center justify-center"
                      initial={{ scale: 0, rotate: -90 }}
                      whileHover={{ scale: 1.1 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <ArrowUpRight size={15} className="text-night" />
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="label text-bronze" style={{ fontSize: '0.58rem' }}>{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-stone/60" />
                    <span className="label text-ink/30" style={{ fontSize: '0.58rem' }}>{article.readTime}</span>
                  </div>
                  <h3
                    className="font-display font-bold uppercase text-ink mb-4 leading-tight group-hover:text-bronze transition-colors duration-400 text-balance tracking-tight"
                    style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}
                  >
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    {author && (
                      <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full grayscale object-cover" />
                    )}
                    <span className="label text-ink/30" style={{ fontSize: '0.56rem' }}>{author?.name}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   EDITORIAL QUOTE
   ════════════════════════════════════════════════════════ */
const EditorialQuote = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], ['-10deg', '10deg']);

  return (
    <section ref={ref} className="py-32 md:py-52 bg-cream-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.blockquote className="max-w-5xl mx-auto text-center relative">
          <motion.span
            style={{ rotate }}
            className="font-serif text-[10rem] md:text-[16rem] text-bronze/10 leading-none block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
          >
            &ldquo;
          </motion.span>
          <div className="relative z-10">
            <p
              className="font-serif italic text-ink leading-snug text-balance mb-10"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3.2rem)' }}
            >
              <TextReveal delay={0}>
                Que ce soit sur papier ou en pixels, l&apos;objectif reste constant : un design qui disparaît en tant que médium et laisse le travail parler sans crier pour attirer l&apos;attention.
              </TextReveal>
            </p>
            <motion.cite
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="label text-ink/30 not-italic"
              style={{ fontSize: '0.62rem' }}
            >
              — Aurélie Morel, Rédactrice en Chef
            </motion.cite>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   NUMBERS STRIP
   ════════════════════════════════════════════════════════ */
const NumbersStrip = () => {
  const nums = [
    { val: 6, suffix: '+', label: 'Thématiques' },
    { val: 50, suffix: '+', label: 'Articles publiés' },
    { val: 3, suffix: '', label: 'Voix expertes' },
    { val: 2024, suffix: '', label: 'Fondation' },
  ];

  return (
    <section className="py-20 border-y border-stone/30 bg-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {nums.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="border-r border-stone/30 last:border-0 px-6 md:px-10 py-10 text-center"
            >
              <div
                className="font-display font-black uppercase text-bronze leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                <Counter value={item.val} suffix={item.suffix} />
              </div>
              <div className="label text-ink/30" style={{ fontSize: '0.58rem' }}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   AUTHORS SECTION
   ════════════════════════════════════════════════════════ */
const AuthorsSection = () => (
  <section className="py-28 md:py-40 bg-night overflow-hidden relative noise">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center gap-6 mb-16">
        <span className="label text-bronze" style={{ fontSize: '0.62rem' }}>Les voix du Journal</span>
        <div className="flex-1 h-px bg-stone/30" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {authors.map((author, i) => (
          <motion.div
            key={author.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease, delay: i * 0.14 }}
            whileHover={{ y: -6 }}
            className="group border-b md:border-b-0 md:border-r border-stone/25 last:border-0 p-8 md:p-10 hover:bg-stone/[0.06] transition-colors duration-500"
          >
            <div className="relative shrink-0 mb-6 overflow-hidden w-12 h-12">
              <motion.img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 rounded-sm transition-[filter] duration-700"
                whileHover={{ scale: 1.12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              />
            </div>
            <h3 className="font-display font-black uppercase text-ink text-xl mb-0.5 tracking-tight">{author.name}</h3>
            <span className="label text-bronze block mb-4" style={{ fontSize: '0.56rem' }}>{author.role}</span>
            <p className="text-ink/35 text-sm font-light leading-relaxed line-clamp-3 mb-6">{author.bio}</p>
            <span className="label text-ink/20" style={{ fontSize: '0.56rem' }}>{author.articles} articles publiés</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   NEWSLETTER
   ════════════════════════════════════════════════════════ */
const NewsletterSection = () => (
  <section className="py-28 md:py-36 bg-cream-200 border-t border-stone/30">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 items-center"
      >
        <div>
          <span className="label text-bronze mb-5 block" style={{ fontSize: '0.62rem' }}>Newsletter Éditoriale</span>
          <h2
            className="font-display font-black uppercase text-ink leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            Un regard<br />mensuel<br /><span className="text-bronze">sur l&apos;essentiel.</span>
          </h2>
          <p className="text-ink/40 font-light leading-relaxed max-w-sm">
            Sélection d&apos;articles, découvertes visuelles et réflexions éditoriales. Envoyée une fois par mois, sans compromis.
          </p>
        </div>
        <div className="md:pl-20">
          <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="votre@email.fr"
              className="bg-stone/20 border border-stone/40 text-ink text-sm outline-none focus:border-bronze/60 transition-colors duration-300 px-5 py-4 placeholder:text-ink/25"
            />
            <button type="submit" className="btn-primary">
              S&apos;abonner <ArrowUpRight size={14} />
            </button>
            <p className="text-ink/20 text-xs">Désabonnement en un clic. Aucun spam.</p>
          </form>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const Home = () => {
  const featured = articles.find(a => a.featured);
  const rest = articles.filter(a => !a.featured);

  return (
    <div className="bg-cream">
      <Hero article={featured} />
      <StatementBand />
      <ArchiveSection />
      <HorizontalScroll items={rest} />
      <EditorialQuote />
      <NumbersStrip />
      <AuthorsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
