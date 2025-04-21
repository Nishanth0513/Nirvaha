import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'meditation', name: 'Meditation', icon: '🧘‍♀️' },
    { id: 'yoga', name: 'Yoga', icon: '🧘‍♂️' },
    { id: 'wellness', name: 'Wellness', icon: '🌿' },
    { id: 'books', name: 'Books', icon: '📚' }
  ];

  const products = [
    {
      id: 1,
      name: "Premium Meditation Cushion",
      description: "Ergonomic design for comfortable meditation sessions",
      price: "$49.99",
      category: "meditation",
      image: "🪑",
      rating: 4.8,
      reviews: 128
    },
    {
      id: 2,
      name: "Organic Herbal Tea Collection",
      description: "Handcrafted blend of calming herbs",
      price: "$29.99",
      category: "wellness",
      image: "🍵",
      rating: 4.9,
      reviews: 95
    },
    {
      id: 3,
      name: "Yoga Mat with Alignment Guide",
      description: "Non-slip, eco-friendly mat with pose markers",
      price: "$39.99",
      category: "yoga",
      image: "🧘‍♂️",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Spiritual Journal",
      description: "Guided journal for self-reflection and growth",
      price: "$24.99",
      category: "books",
      image: "📔",
      rating: 4.9,
      reviews: 87
    },
    {
      id: 5,
      name: "Crystal Healing Set",
      description: "Collection of energy-balancing crystals",
      price: "$59.99",
      category: "wellness",
      image: "💎",
      rating: 4.8,
      reviews: 112
    },
    {
      id: 6,
      name: "Meditation Timer",
      description: "Digital timer with gentle chime",
      price: "$19.99",
      category: "meditation",
      image: "⏱️",
      rating: 4.6,
      reviews: 76
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-dark-300 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Wellness Marketplace
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover handpicked wellness products curated by our experts to support your spiritual journey.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-dark-300'
                  : 'bg-dark-100 text-white hover:bg-dark-200'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-100 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all"
            >
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white">{product.rating}</span>
                  <span className="text-gray-400">({product.reviews})</span>
                </div>
                <span className="text-primary font-semibold">{product.price}</span>
              </div>
              <motion.button
                className="w-full mt-4 px-4 py-2 bg-primary text-dark-300 rounded-lg font-medium hover:bg-primary/90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Affiliate Notice */}
        <motion.div 
          className="mt-16 bg-dark-100 rounded-2xl p-6 border border-primary/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-2xl">💫</div>
            <h3 className="text-xl font-semibold text-white">Support Our Mission</h3>
          </div>
          <p className="text-gray-400">
            Every purchase you make through our marketplace helps support Nirvaha's mission to make spiritual growth accessible to everyone. 
            We carefully select products that align with our values and have been tested by our community.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Marketplace; 