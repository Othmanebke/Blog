// src/data/mockData.js
export const categories = [
  { id: 'design', name: 'Design', slug: 'design' },
  { id: 'culture', name: 'Culture', slug: 'culture' },
  { id: 'strategy', name: 'Stratégie', slug: 'strategie' },
  { id: 'creative', name: 'Créativité', slug: 'creativite' }
];

export const articles = [
  {
    id: 1,
    title: "Le minimalisme brutal : L'évolution de l'esthétique du vide",
    excerpt: "Comment les grandes maisons de couture redéfinissent l'espace et le silence à travers des volumes stricts et des palettes monocolores.",
    category: "Design",
    author: {
      name: "Aurélie Morel",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
      bio: "Rédactrice en chef, experte en design et tendances visuelles."
    },
    date: "12 Octobre 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    content: "L'art du vide n'est plus ce qu'il était. Autrefois associé à la simplicité, il s'exprime aujourd'hui avec une force presque brutale..."
  },
  {
    id: 2,
    title: "L'art subtil de la typographie éditoriale en 2026",
    excerpt: "Pourquoi le retour des empattements marqués bouleverse les codes visuels du digital.",
    category: "Design",
    author: {
      name: "Marc Auban",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    date: "08 Octobre 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1557992260-ec58e38d363c?auto=format&fit=crop&q=80&w=800",
    content: "Nous assistons à une renaissance de la direction artistique numérique classique..."
  },
  {
    id: 3,
    title: "Construire une marque intemporelle : l'approche héritage",
    excerpt: "Les stratégies discrètes qui permettent aux jeunes maisons de s'inscrire dans l'éternité.",
    category: "Stratégie",
    author: {
      name: "Aurélie Morel"
    },
    date: "05 Octobre 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1623941400827-51e417122184?auto=format&fit=crop&q=80&w=800",
    content: "Dans un monde saturé de lancements bruyants, le silence devient la stratégie ultime..."
  },
  {
    id: 4,
    title: "Le nouveau mécénat : Quand l'entreprise devient galerie",
    excerpt: "Comment l'intégration d'oeuvres d'art devient le marqueur ultime du luxe d'entreprise.",
    category: "Culture",
    author: {
      name: "Diane Lestang"
    },
    date: "28 Septembre 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1518991669955-9c7e68ee46aa?auto=format&fit=crop&q=80&w=800",
    content: "L'art n'est plus seulement une décoration, il est une déclaration de valeurs..."
  },
  {
    id: 5,
    title: "L'obsession des matériaux organiques",
    excerpt: "Travailler la texture imparfaite comme une signature visuelle et émotionnelle.",
    category: "Créativité",
    author: {
      name: "Marc Auban"
    },
    date: "15 Septembre 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1515281239448-2abe3297d31b?auto=format&fit=crop&q=80&w=800",
    content: "L'œil réclame aujourd'hui de la friction. Le lisse indiffère..."
  }
];
