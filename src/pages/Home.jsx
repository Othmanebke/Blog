import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../data/mockData';

const Home = () => {
  const featured = articles.find(a => a.featured);
  const latest = articles.filter(a => !a.featured);

  return (
    <div className="pt-32">
      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative block overflow-hidden"
        >
          <Link to={`/article/${featured.id}`}>
            <div className="w-full h-[60vh] md:h-[75vh] overflow-hidden">
              <motion.img 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={featured.image} 
                className="w-full h-full object-cover grayscale-[20%]"
                alt={featured.title} 
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-32 pb-12 px-8 text-luxury-cream">
              <span className="text-xs uppercase tracking-[0.2em] mb-4 block text-luxury-bronze">{featured.category}</span>
              <h1 className="text-4xl md:text-6xl font-serif max-w-4xl leading-tight mb-4">{featured.title}</h1>
              <p className="text-luxury-gray max-w-2xl text-lg hidden md:block">{featured.excerpt}</p>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Latest Articles */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-luxury-black/10 pb-6">
            <h2 className="text-3xl font-serif">Dernières Éditions</h2>
            <Link to="/articles" className="text-sm uppercase tracking-widest font-medium hover:text-luxury-bronze transition-colors">Tout voir</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-24">
            {latest.map((article, idx) => (
              <motion.article 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={article.id} 
                className="group cursor-pointer"
              >
                <Link to={`/article/${article.id}`}>
                  <div className="overflow-hidden mb-6 h-[400px]">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[10%]" />
                  </div>
                  <div className="flex items-center space-x-4 mb-4 text-xs font-medium tracking-widest text-luxury-gray uppercase">
                    <span className="text-luxury-bronze">{article.category}</span>
                    <span>&mdash;</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-3 group-hover:text-luxury-bronze transition-colors">{article.title}</h3>
                  <p className="text-luxury-gray/80 text-sm leading-relaxed">{article.excerpt}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
