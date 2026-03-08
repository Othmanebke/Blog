import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { authors, articles } from '../data/mockData';

const ease = [0.19, 1, 0.22, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease, delay },
});

const VALUES = [
  { num: '01', title: 'Le regard avant tout', body: "Nous croyons que voir avec précision est le premier acte créatif. Avant la forme, avant la couleur, avant la stratégie — il y a l'attention portée au réel." },
  { num: '02', title: 'La lenteur comme méthode', body: "Dans un monde qui privilégie la réactivité, nous choisissons délibérément la profondeur. Nos articles ne vieillissent pas, ils se bonifient." },
  { num: '03', title: "L'exigence formelle", body: "Chaque mot est pesé. Chaque image choisie. La qualité éditoriale et visuelle n'est pas un objectif — c'est une discipline quotidienne." },
  { num: '04', title: 'La vision partagée', body: "Atelier Journal est un espace de rencontre entre créateurs, stratèges et amateurs éclairés qui refusent la superficialité cultural." },
];

const NUMBERS = [
  { val: '6+', label: 'Thématiques éditoriales' },
  { val: '3', label: 'Voix expertes' },
  { val: '50+', label: 'Articles publiés' },
  { val: '2024', label: 'Année de fondation' },
];

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-15%']);

  return (
    <div className="bg-cream pt-24 overflow-hidden">

      {/* ─── Hero ─────────────────────────────────────── */}
      <section ref={containerRef} className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <img
            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=2000"
            alt="Atelier"
            className="w-full h-[115%] object-cover grayscale-editorial"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
        </motion.div>

        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-16 md:pb-28"
        >
          <motion.div {...fadeUp(0.3)}>
            <span className="label text-bronze mb-5 block" style={{ fontSize: '0.6rem' }}>Notre Histoire</span>
            <h1 className="font-serif text-display text-cream leading-none text-balance max-w-3xl">
              Un espace pour <em>penser</em> le visible
            </h1>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Intro Statement ──────────────────────────── */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <motion.span {...fadeUp()} className="label text-ink/30 block mb-4 h-px bg-stone/40 w-12 mt-8" />
              <motion.span {...fadeUp(0.1)} className="label text-bronze block mb-8" style={{ fontSize: '0.65rem' }}>Manifeste</motion.span>
            </div>
            <div className="md:col-span-7">
              <motion.h2 {...fadeUp()} className="font-serif text-3xl md:text-5xl text-ink leading-snug text-balance mb-10">
                Atelier Journal est né d&apos;un constat simple : le bruit ambiant a rendu le silence d&apos;autant plus précieux.
              </motion.h2>
              <motion.div {...fadeUp(0.15)} className="space-y-6 text-ink/60 text-lg font-light leading-loose">
                <p>
                  Dans un écosystème médiatique saturé, nous avons fait le choix inverse : moins de volume, plus de profondeur. Moins de réactivité, plus de recul. Moins de clics, plus de sens.
                </p>
                <p>
                  Atelier Journal est un prisme à travers lequel nous décomposons les tendances pour en extraire l&apos;essence. Nous donnons la parole aux créateurs, aux stratèges et aux visionnaires qui bâtissent l&apos;imaginaire de demain.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Numbers ──────────────────────────────────── */}
      <section className="py-16 border-y border-stone/40 bg-cream-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {NUMBERS.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="border-r border-stone/30 last:border-0 px-8 py-10 text-center"
              >
                <div className="font-serif text-5xl md:text-6xl text-ink mb-3">{item.val}</div>
                <div className="label text-ink/40" style={{ fontSize: '0.6rem' }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values ───────────────────────────────────── */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="section-heading mb-20">
            <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Nos valeurs</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="border-b md:even:border-l border-stone/30 p-8 md:p-12 hover:bg-cream-200 transition-colors duration-500"
              >
                <span className="font-mono text-stone/40 text-xs block mb-6">{v.num}</span>
                <h3 className="font-serif text-2xl text-ink mb-5">{v.title}</h3>
                <p className="text-ink/50 leading-relaxed font-light">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─────────────────────────────────────── */}
      <section className="py-24 bg-ink text-cream">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-6 mb-20">
            <span className="label text-bronze" style={{ fontSize: '0.65rem' }}>L&apos;Équipe</span>
            <div className="flex-1 h-px bg-cream/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {authors.map((author, i) => (
              <motion.div
                key={author.id}
                {...fadeUp(i * 0.12)}
                className="group md:border-r border-b md:border-b-0 border-cream/10 last:border-0 p-8 md:p-10 hover:bg-cream/5 transition-colors duration-500"
              >
                <div className="relative mb-8 overflow-hidden w-full aspect-[3/4] max-w-[200px]">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                </div>
                <h3 className="font-serif text-2xl text-cream mb-1">{author.name}</h3>
                <span className="label text-bronze block mb-5" style={{ fontSize: '0.58rem' }}>{author.role}</span>
                <p className="text-stone/50 text-sm font-light leading-relaxed mb-6">{author.bio}</p>
                <span className="label text-cream/20" style={{ fontSize: '0.56rem' }}>{author.articles} articles</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Strip ────────────────────────────────── */}
      <section className="py-24 bg-bronze/10 border-y border-bronze/20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-4xl md:text-6xl text-ink mb-8 leading-tight">
              Rejoindre la conversation
            </h2>
            <p className="text-ink/50 font-light mb-10 max-w-lg mx-auto leading-relaxed">
              Des articles inédits, une sélection éditoriale taillée sur mesure et une communauté d&apos;esprits curieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/articles" className="btn-primary">
                Lire les éditions <ArrowUpRight size={14} />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Nous écrire
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Latest from team ─────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="section-heading mb-14">
            <span className="label text-ink/40" style={{ fontSize: '0.65rem' }}>Récemment publiés</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {articles.slice(0, 3).map((article, i) => (
              <motion.div key={article.id} {...fadeUp(i * 0.1)}>
                <Link to={/article/} className="group block">
                  <div className="overflow-hidden aspect-[3/2] mb-5">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover img-hover grayscale-editorial" />
                  </div>
                  <span className="label text-bronze mb-3 block" style={{ fontSize: '0.58rem' }}>{article.category}</span>
                  <h4 className="font-serif text-xl text-ink group-hover:text-bronze transition-colors duration-400 text-balance leading-snug">
                    {article.title}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
