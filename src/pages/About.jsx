import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { authors, articles } from '../data/mockData';

const ease = [0.19, 1, 0.22, 1];

const ArticleCard = ({ article, i }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease, delay: i * 0.12 }}
    >
      <Link to={`/article/${article.id}`} className="group block">
        <div className="overflow-hidden aspect-[3/2] mb-5 relative">
          <motion.img
            src={article.image}
            alt={article.title}
            style={{ y: imgY }}
            className="w-full h-[125%] object-cover grayscale-editorial group-hover:grayscale-0 transition-[filter] duration-700"
          />
        </div>
        <span className="label text-bronze mb-3 block" style={{ fontSize: '0.58rem' }}>{article.category}</span>
        <h4 className="font-serif text-xl text-ink group-hover:text-bronze transition-colors duration-400 text-balance leading-snug">
          {article.title}
        </h4>
      </Link>
    </motion.div>
  );
};

const VALUES = [
  { num: '01', title: 'Le regard avant tout', body: "Nous croyons que voir avec précision est le premier acte créatif. Avant la forme, avant la couleur — il y a l'attention portée au réel." },
  { num: '02', title: 'La lenteur comme méthode', body: "Dans un monde qui privilégie la réactivité, nous choisissons délibérément la profondeur. Nos articles se bonifient." },
  { num: '03', title: "L'exigence formelle", body: "Chaque mot est pesé. Chaque image choisie. La qualité éditoriale et visuelle n'est pas un objectif — c'est une discipline." },
  { num: '04', title: 'La vision partagée', body: "Un espace de rencontre entre créateurs, stratèges et amateurs éclairés qui refusent la superficialité." },
];

const NUMBERS = [
  { val: 6, suffix: '+', label: 'Thématiques éditoriales' },
  { val: 3, suffix: '', label: 'Voix expertes' },
  { val: 50, suffix: '+', label: 'Articles publiés' },
  { val: 2024, suffix: '', label: 'Année de fondation' },
];

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
            transition={{ duration: 0.9, ease, delay: delay + i * 0.04 }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const heroImgScale = useTransform(heroProgress, [0, 1], [1, 1.2]);
  const heroTextY = useTransform(heroProgress, [0, 0.5], ['0%', '-20%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  /* Horizontal scroll for manifesto */
  const manifestoRef = useRef(null);
  const { scrollYProgress: manifestoProgress } = useScroll({ target: manifestoRef });
  const rawX = useTransform(manifestoProgress, [0, 1], ['5%', '-45%']);
  const manifestoX = useSpring(rawX, { stiffness: 60, damping: 25 });

  return (
    <div className="bg-cream pt-28 overflow-hidden">

      {/* ─── Hero with parallax layers ─────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <motion.img
            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=2000"
            alt="Atelier"
            style={{ scale: heroImgScale }}
            initial={{ filter: 'brightness(0) blur(20px)' }}
            animate={{ filter: 'brightness(1) blur(0px)' }}
            transition={{ duration: 2.2, ease }}
            className="w-full h-[115%] object-cover grayscale-editorial"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-16 md:pb-28"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="label text-bronze mb-5 block"
            style={{ fontSize: '0.6rem' }}
          >
            Notre Histoire
          </motion.span>
          <h1 className="font-display font-black uppercase text-display text-ink leading-none text-balance max-w-3xl tracking-tight">
            <TextReveal delay={0.3}>Un espace pour penser le visible</TextReveal>
          </h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-cream/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─── Horizontal Scroll Manifesto ───────────────── */}
      <section ref={manifestoRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full mb-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="label text-bronze block"
              style={{ fontSize: '0.65rem' }}
            >
              Manifeste
            </motion.span>
          </div>
          <motion.div style={{ x: manifestoX }} className="flex gap-12 md:gap-20 pl-6 md:pl-12">
            {[
              "Atelier Journal est né d'un constat simple : le bruit ambiant a rendu le silence précieux.",
              "Nous avons fait le choix inverse : moins de volume, plus de profondeur.",
              "Atelier Journal est un prisme à travers lequel nous décomposons les tendances pour en extraire l'essence.",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1, ease, delay: i * 0.1 }}
                className="shrink-0 w-[85vw] md:w-[50vw] lg:w-[40vw]"
              >
                <span className="font-mono text-stone/30 text-xs mb-6 block">0{i + 1}</span>
                <p className="font-serif text-2xl md:text-4xl text-ink leading-snug text-balance">
                  {text}
                </p>
                {i === 0 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1, ease }}
                    className="w-20 h-px bg-bronze mt-8 origin-left"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Numbers with counting ─────────────────────── */}
      <section className="py-16 border-y border-stone/40 bg-cream-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {NUMBERS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                className="border-r border-stone/30 last:border-0 px-8 py-10 text-center"
              >
                <div className="font-serif text-5xl md:text-6xl text-ink mb-3">
                  <Counter value={item.val} suffix={item.suffix} />
                </div>
                <div className="label text-ink/40" style={{ fontSize: '0.6rem' }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values with rotate-in ─────────────────────── */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="section-heading mb-20">
            <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Nos valeurs</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotate: i % 2 === 0   ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, ease, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="border-b md:even:border-l border-stone/30 p-8 md:p-12 hover:bg-cream-200 transition-colors duration-500"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="font-mono text-stone/40 text-xs block mb-6"
                >
                  {v.num}
                </motion.span>
                <h3 className="font-serif text-2xl text-ink mb-5">{v.title}</h3>
                <p className="text-ink/50 leading-relaxed font-light">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team with perspective tilt on hover ──────── */}
      <section className="py-24 bg-night text-ink overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-6 mb-20">
            <span className="label text-bronze" style={{ fontSize: '0.65rem' }}>L&apos;Équipe</span>
            <div className="flex-1 h-px bg-stone/30" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {authors.map((author, i) => (
              <motion.div
                key={author.id}
                initial={{ opacity: 0, y: 80, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1, ease, delay: i * 0.15 }}
                whileHover={{ y: -12, rotateY: -3 }}
                className="group md:border-r border-b md:border-b-0 border-stone/20 last:border-0 p-8 md:p-10 hover:bg-stone/[0.05] transition-colors duration-500 perspective-1000"
              >
                <div className="relative mb-8 overflow-hidden w-full aspect-[3/4] max-w-[200px]">
                  <motion.img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                </div>
                <h3 className="font-display font-black uppercase text-xl text-ink mb-1 tracking-tight">{author.name}</h3>
                <span className="label text-bronze block mb-5" style={{ fontSize: '0.58rem' }}>{author.role}</span>
                <p className="text-stone/50 text-sm font-light leading-relaxed mb-6">{author.bio}</p>
                <span className="label text-ink/20" style={{ fontSize: '0.56rem' }}>{author.articles} articles</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Strip with scale-in ──────────────────── */}
      <section className="py-24 bg-bronze/10 border-y border-bronze/20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
          >
            <h2 className="font-display font-black uppercase text-ink leading-none tracking-tight mb-8" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              <TextReveal>Rejoindre la conversation</TextReveal>
            </h2>
            <motion.p
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-ink/50 font-light mb-10 max-w-lg mx-auto leading-relaxed"
            >
              Des articles inédits, une sélection taillée sur mesure et une communauté d&apos;esprits curieux.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/articles" className="btn-primary">
                Lire les éditions <ArrowUpRight size={14} />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Nous écrire
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Latest articles with parallax images ─────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="section-heading mb-14">
            <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Récemment publiés</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {articles.slice(0, 3).map((article, i) => (
              <ArticleCard key={article.id} article={article} i={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
