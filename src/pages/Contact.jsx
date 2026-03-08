import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="pt-40 min-h-screen bg-luxury-cream pb-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24">
        
        {/* Left Side: Text & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">
            Converser<br />
            <span className="italic text-luxury-bronze">avec l'Atelier</span>
          </h1>
          <p className="text-luxury-gray text-xl mb-16 max-w-lg leading-relaxed">
            Pour toute demande presse, collaboration ou proposition éditoriale, notre bureau se tient à votre disposition.
          </p>

          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-luxury-bronze mb-4">Bureau</h3>
              <p className="text-luxury-gray text-lg">
                12 Rue de la Paix<br />75002 Paris, France
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest text-luxury-bronze mb-4">Correspondance</h3>
              <a href="mailto:contact@atelierjournal.fr" className="text-luxury-gray text-lg hover:text-luxury-black transition-colors">contact@atelierjournal.fr</a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-12 shadow-sm rounded-sm self-start"
        >
          <h2 className="text-3xl font-serif mb-8 border-b border-luxury-gray/20 pb-6">Envoyer une missive</h2>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm uppercase tracking-widest text-luxury-gray mb-3">Nom complet</label>
              <input 
                type="text" 
                id="name"
                className="w-full bg-transparent border-b border-luxury-gray/30 pb-3 focus:outline-none focus:border-luxury-bronze transition-colors" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm uppercase tracking-widest text-luxury-gray mb-3">Adresse électronique</label>
              <input 
                type="email" 
                id="email"
                className="w-full bg-transparent border-b border-luxury-gray/30 pb-3 focus:outline-none focus:border-luxury-bronze transition-colors" 
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm uppercase tracking-widest text-luxury-gray mb-3">Objet</label>
              <select 
                id="subject"
                className="w-full bg-transparent border-b border-luxury-gray/30 pb-3 focus:outline-none focus:border-luxury-bronze transition-colors text-luxury-black" 
              >
                <option value="general">Informations générales</option>
                <option value="press">Presse & Médias</option>
                <option value="collab">Projet ou Collaboration</option>
                <option value="editorial">Proposition Éditoriale</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm uppercase tracking-widest text-luxury-gray mb-3">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full bg-transparent border-b border-luxury-gray/30 pb-3 focus:outline-none focus:border-luxury-bronze transition-colors resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-luxury-black text-white hover:bg-luxury-bronze py-4 uppercase text-sm tracking-widest transition-colors duration-300">
              Soumettre
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
