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
            initial={{ y: '110%', rotate: 4 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.045 }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ── Parallax image ───────────────────────────────────── */
const ParallaxImg = ({ src, alt, className = '', speed = 0.15 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}%`, `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.05]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale }} className="w-full h-[120%] object-cover" />
    </div>
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
   HERO — cinematic reveal
   ════════════════════════════════════════════════════════ */
const Hero = ({ article }) => {
  const author = authors.find(a => a.id === article.authorId);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.img
          src={article.image}
          alt={article.title}
          style={{ scale: imgScale }}
          initial={{ scale: 1.3, filter: 'brightness(0) blur(12px)' }}
          animate={{ scale: 1, filter: 'brightness(1) blur(0px)' }}
          transition={{ duration: 2.2, ease }}
          className="w-full h-full object-cover grayscale-editorial"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/40 to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-16 md:pb-24">
        <div className="max-w-4xl">
          {/* Category line animates width */}
          <motion.div className="flex items-center gap-3 mb-7 overflow-hidden">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease }}
              className="w-10 h-px bg-bronze origin-left"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="label text-bronze"
              style={{ fontSize: '0.6rem' }}
            >
              {article.category}
            </motion.span>
          </motion.div>

          {/* Word-by-word title */}
          <h1 className="text-hero font-serif text-cream text-balance mb-8 leading-tight">
            <TextReveal delay={0.6}>{article.title}</TextReveal>
          </h1>

          {/* Excerpt with blur reveal */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.4, duration: 1.2 }}
            className="text-stone/60 text-lg font-light max-w-2xl mb-10 leading-relaxed hidden md:block"
          >
            {article.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex items-center gap-8"
          >
            <Link to={`/article/${article.id}`} className="btn-primary">
              Lire l&apos;article <ArrowUpRight size={14} />
            </Link>
            {author && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.1, duration: 0.6 }}
                className="hidden md:flex items-center gap-3"
              >
                <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover grayscale" />
                <div className="flex flex-col">
                  <span className="label text-cream/50" style={{ fontSize: '0.6rem' }}>{author.name}</span>
                  <span className="label text-stone/30" style={{ fontSize: '0.55rem' }}>{article.readTime} de lecture</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.15, 0.5, 0.15] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="label text-cream/20"
          style={{ fontSize: '0.55rem', writingMode: 'vertical-lr' }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 10, 0], scaleY: [1, 1.6, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-px h-14 bg-gradient-to-b from-cream/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   HORIZONTAL SCROLL — articles carousel
   ════════════════════════════════════════════════════════ */
const HorizontalScroll = ({ items }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const rawX = useTransform(scrollYProgress, [0, 1], ['2%', '-65%']);
  const x = useSpring(rawX, { stiffness: 80, damping: 30 });

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section heading */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full mb-10">
          <div className="section-heading">
            <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Dernières Éditions</span>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-12">
          {items.map((article, i) => {
            const author = authors.find(a => a.id === article.authorId);
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, rotateY: -8 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 1, ease, delay: i * 0.1 }}
                className="shrink-0 w-[85vw] md:w-[42vw] lg:w-[32vw] perspective-1000"
              >
                <Link to={`/article/${article.id}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3] mb-6">
                    <motion.img
                      src={article.image}
                      alt={article.title}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.8, ease }}
                      className="w-full h-full object-cover grayscale-editorial"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <span className="absolute top-4 left-4 font-mono text-cream/60 text-[0.65rem] bg-night/40 backdrop-blur-sm px-3 py-1 tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <motion.div
                      className="absolute bottom-4 right-4 w-10 h-10 bg-cream flex items-center justify-center"
                      initial={{ scale: 0, rotate: -90 }}
                      whileHover={{ scale: 1.1, rotate: 0 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <ArrowUpRight size={16} className="text-ink" />
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="label text-bronze" style={{ fontSize: '0.6rem' }}>{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-stone/50" />
                    <span className="label text-ink/30" style={{ fontSize: '0.6rem' }}>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-ink mb-4 leading-snug group-hover:text-bronze transition-colors duration-500 text-balance">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    {author && <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full grayscale object-cover" />}
                    <span className="label text-ink/40" style={{ fontSize: '0.58rem' }}>{author?.name}</span>
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

/* ── Editorial Quote with rotating mark ───────────────── */
const EditorialQuote = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], ['-15deg', '15deg']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section ref={ref} className="py-28 md:py-44 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.blockquote className="max-w-4xl mx-auto text-center relative">
          <motion.span
            style={{ rotate, scale }}
            className="font-serif text-[12rem] md:text-[18rem] text-bronze/10 leading-none block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
          >
            &ldquo;
          </motion.span>
          <div className="relative z-10">
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-ink leading-snug text-balance mb-10">
              <TextReveal delay={0}>
                La création n&apos;est pas un acte solitaire. C&apos;est une conversation discrète entre ceux qui regardent vraiment.
              </TextReveal>
            </p>
            <motion.cite
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="label text-ink/30 not-italic"
              style={{ fontSize: '0.65rem' }}
            >
              — Aurélie Morel, Rédactrice en Chef
            </motion.cite>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
};

/* ── Category Grid with clip-path wipe ────────────────── */
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
            initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease, delay: i * 0.08 }}
          >
            <Link
              to="/articles"
              className="group block border border-stone/50 p-6 md:p-8 hover:border-bronze hover:bg-cream transition-all duration-500 h-full"
            >
              <span className="font-mono text-stone/40 text-xs mb-4 block">0{i + 1}</span>
              <h3 className="font-serif text-xl md:text-2xl text-ink mb-3 group-hover:text-bronze transition-colors duration-400">
                {cat.name}
              </h3>
              <p className="text-ink/40 text-xs leading-relaxed font-light hidden md:block">{cat.description}</p>
              <motion.div
                className="mt-6 flex items-center gap-2 text-bronze"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ x: 4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <span className="label" style={{ fontSize: '0.55rem' }}>Explorer</span>
                <ArrowRight size={12} />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Numbers Strip with counting animation ────────────── */
const NumbersStrip = () => {
  const nums = [
    { val: 6, suffix: '+', label: 'Thématiques' },
    { val: 50, suffix: '+', label: 'Articles publiés' },
    { val: 3, suffix: '', label: 'Voix expertes' },
    { val: 2024, suffix: '', label: 'Fondation' },
  ];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  return (
    <section ref={ref} className="py-16 border-y border-stone/40 bg-cream-200 overflow-hidden">
      <motion.div style={{ x }} className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {nums.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              className="border-r border-stone/30 last:border-0 px-8 py-10 text-center"
            >
              <div className="font-serif text-5xl md:text-6xl text-ink mb-3">
                <Counter value={item.val} suffix={item.suffix} />
              </div>
              <div className="label text-ink/40" style={{ fontSize: '0.6rem' }}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ── Authors with spring hover ────────────────────────── */
const AuthorsSection = () => (
  <section className="py-24 md:py-32 bg-ink text-cream overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex items-center gap-6 mb-16">
        <span className="label text-bronze" style={{ fontSize: '0.65rem' }}>Les voix du Journal</span>
        <div className="flex-1 h-px bg-cream/10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {authors.map((author, i) => (
          <motion.div
            key={author.id}
            initial={{ opacity: 0, y: 60, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="group border-b md:border-b-0 md:border-r border-cream/10 last:border-0 p-8 md:p-10 hover:bg-cream/5 transition-colors duration-500"
          >
            <div className="relative shrink-0 mb-6 overflow-hidden w-14 h-14">
              <motion.img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 rounded-sm"
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              />
            </div>
            <h3 className="font-serif text-xl text-cream mb-0.5">{author.name}</h3>
            <span className="label text-bronze" style={{ fontSize: '0.58rem' }}>{author.role}</span>
            <p className="text-stone/50 text-sm font-light leading-relaxed line-clamp-3 mt-4 mb-6">{author.bio}</p>
            <span className="label text-cream/20" style={{ fontSize: '0.58rem' }}>{author.articles} articles publiés</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Newsletter with scale reveal ─────────────────────── */
const NewsletterSection = () => (
  <section className="py-24 bg-bronze/10 border-y border-bronze/20">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease }}
        className="max-w-2xl mx-auto text-center"
      >
        <span className="label text-bronze mb-6 block" style={{ fontSize: '0.65rem' }}>Newsletter Éditoriale</span>
        <h2 className="font-serif text-3xl md:text-5xl text-ink mb-6 leading-snug">
          Un regard mensuel sur<br /><em>l&apos;essentiel créatif</em>
        </h2>
        <p className="text-ink/50 font-light leading-relaxed mb-10">
          Sélection d&apos;articles, découvertes visuelles et réflexions éditoriales. Envoyée une fois par mois, sans compromis.
        </p>
        <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="votre@email.fr"
            className="flex-1 bg-cream border border-stone px-5 py-4 text-ink text-sm outline-none focus:border-bronze transition-colors duration-300 placeholder:text-stone"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">S&apos;abonner <ArrowUpRight size={14} /></button>
        </form>
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
      <HorizontalScroll items={rest} />
      <EditorialQuote />
      <NumbersStrip />
      <CategoryGrid />
      <AuthorsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
