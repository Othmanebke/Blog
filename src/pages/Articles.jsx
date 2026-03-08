import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles, categories } from '../data/mockData';

const Articles = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="pt-40 min-h-screen bg-luxury-cream pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif mb-12"
          >
            Éditions
          </motion.h1>
          
          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-8 border-b border-luxury-black/10 pb-6"
          >
            <button 
              onClick={() => setActiveCategory('all')}
              className={`text-sm uppercase tracking-widest transition-colors ${activeCategory === 'all' ? 'text-luxury-black font-medium' : 'text-luxury-gray hover:text-luxury-bronze'}`}
            >
              Tout
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`text-sm uppercase tracking-widest transition-colors ${activeCategory === cat.name ? 'text-luxury-black font-medium' : 'text-luxury-gray hover:text-luxury-bronze'}`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Articles Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          <AnimatePresence>
            {filteredArticles.map((article, idx) => (
              <motion.article 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={article.id} 
                className="group cursor-pointer"
              >
                <Link to={`/article/${article.id}`}>
                  <div className="overflow-hidden mb-6 h-[500px]">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[10%]" />
                  </div>
                  <div className="flex items-center space-x-4 mb-4 text-xs font-medium tracking-widest text-luxury-gray uppercase">
                    <span className="text-luxury-bronze">{article.category}</span>
                    <span>&mdash;</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-3xl font-serif mb-4 group-hover:text-luxury-bronze transition-colors">{article.title}</h3>
                  <p className="text-luxury-gray/80 leading-relaxed">{article.excerpt}</p>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Articles;
