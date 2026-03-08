import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="pt-40 min-h-screen bg-luxury-cream pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro */}
        <section className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-serif mb-8 leading-tight"
            >
              L'art de la<br />
              <span className="italic text-luxury-bronze">réflexion</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="text-luxury-gray text-xl md:text-2xl leading-relaxed"
          >
            <p>Atelier Journal est un espace dédié à l'exploration de la culture visuelle contemporaine, du design intemporel et des stratégies de marque qui redéfinissent notre rapport à l'esthétique et au luxe.</p>
          </motion.div>
        </section>

        {/* Big Parallax Image */}
        <section className="h-[70vh] mb-40 overflow-hidden relative">
          <motion.div style={{ y: yImage }} className="absolute inset-x-0 -inset-y-[10%]">
            <img 
              src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=2000" 
              alt="Bureau Atelier" 
              className="w-full h-full object-cover grayscale-[30%]"
            />
          </motion.div>
        </section>

        {/* Manifesto */}
        <section className="max-w-3xl mx-auto text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-4xl font-serif mb-12"
          >
            Notre Manifeste
          </motion.h2>
          <div className="space-y-8 text-luxury-gray text-lg leading-loose">
            <p>Nous croyons que le bruit ambiant rend le silence d'autant plus précieux. Que l'excès d'information appelle au retour de la rareté. Notre démarche éditoriale s'inscrit dans cette volonté de ralentir, d'analyser, de percevoir.</p>
            <p>Atelier n'est pas qu'un journal. C'est un prisme à travers lequel nous décomposons les tendances pour en extraire l'essence. Nous donnons la parole aux créateurs, aux stratèges et aux visionnaires qui bâtissent l'imaginaire de demain.</p>
          </div>
        </section>

        {/* Team Simple */}
        <section className="border-t border-luxury-black/10 pt-20">
          <h2 className="text-3xl font-serif mb-16">Les Voix du Journal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Aurélie Morel", role: "Rédactrice en Chef", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=500" },
              { name: "Marc Auban", role: "Directeur de la Création", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500" },
              { name: "Diane Lestang", role: "Éditrice Associée", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500" }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden mb-6 h-[400px]">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <h3 className="text-xl font-serif">{member.name}</h3>
                <p className="text-luxury-bronze text-sm uppercase tracking-widest mt-2">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
