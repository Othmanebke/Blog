import { useParams } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { articles } from '../data/mockData';
import { useEffect } from 'react';

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id)) || articles[0];
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <article className="bg-white min-h-screen pb-32">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-luxury-bronze origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Hero Content */}
      <div className="pt-40 max-w-4xl mx-auto px-6 mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-luxury-bronze mb-6 block"
        >
          {article.category}
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif leading-tight mb-8"
        >
          {article.title}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-4 text-sm tracking-widest uppercase text-luxury-gray"
        >
          <span>Par {article.author.name}</span>
          <span>&mdash;</span>
          <span>{article.date}</span>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        className="w-full max-w-6xl mx-auto h-[60vh] md:h-[80vh] px-6 mb-24"
      >
        <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale-[15%]" />
      </motion.div>

      {/* Editor Content */}
      <div className="max-w-2xl mx-auto px-6 relative">
        <p className="text-xl md:text-2xl font-serif leading-relaxed mb-12 text-luxury-gray">
          {article.excerpt}
        </p>

        <div className="prose prose-lg prose-p:font-sans prose-p:font-light prose-p:leading-loose prose-p:text-[#333] prose-headings:font-serif prose-a:text-luxury-bronze mb-24 max-w-none">
          <p>{article.content}</p>
          <p>La recherche de la perfection graphique commence par l'élagage. Supprimer ce qui n'est pas nécessaire pour laisser respirer l'essence même de l'idée.</p>
          <blockquote className="my-16 pl-6 border-l-2 border-luxury-bronze italic text-2xl font-serif text-luxury-black">
            "Le détail n'est pas un détail, c'est la conception." — Charles Eames
          </blockquote>
          <p>Dans un écosystème où l'attention est la ressource la plus rare, s'imposer par le vide relève d'une audace calculée. Ce n'est plus l'absence de design, c'est le design poussé à son paroxysme de pureté.</p>
        </div>

        {/* Author Bio */}
        <div className="border-t border-luxury-gray/20 pt-12 flex items-center space-x-6">
          {article.author.avatar && (
            <img src={article.author.avatar} alt={article.author.name} className="w-16 h-16 rounded-full object-cover grayscale" />
          )}
          <div>
            <h4 className="font-serif text-xl mb-1">{article.author.name}</h4>
            {article.author.bio && <p className="text-luxury-gray text-sm">{article.author.bio}</p>}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;
