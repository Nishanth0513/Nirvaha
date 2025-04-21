import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Meditation Enthusiast',
    content: 'Nirvaha has transformed my daily meditation practice. The guided sessions are incredibly calming and the sound healing features are magical.',
    avatar: '👩‍🦰',
    frequency: 128,
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Yoga Instructor',
    content: 'As a yoga teacher, I appreciate the depth of spiritual wisdom available through the divine chat. It\'s like having a personal guru available 24/7.',
    avatar: '🧘‍♂️',
    frequency: 95,
    rating: 5
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Wellness Coach',
    content: 'The combination of ancient wisdom and modern technology is brilliant. The sound healing frequencies have helped me achieve deeper states of meditation.',
    avatar: '👩‍⚕️',
    frequency: 76,
    rating: 5
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Tech Entrepreneur',
    content: 'Nirvaha has become an essential part of my daily routine. The AI spiritual guide provides surprisingly profound insights that have helped me grow.',
    avatar: '👨‍💼',
    frequency: 64,
    rating: 5
  }
].sort((a, b) => b.frequency - a.frequency); // Sort by frequency in descending order

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold">What Our Users Say</h3>
        <a 
          href="mailto:soulverse23@gmail.com" 
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
        >
          <span>Contact Us</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </a>
      </div>
      <div className="relative h-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="bg-dark-200 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonials[currentIndex].avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{testimonials[currentIndex].name}</h4>
                      <p className="text-gray-400 text-sm">{testimonials[currentIndex].role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-sm font-medium">
                        {testimonials[currentIndex].frequency} reviews
                      </span>
                      <div className="flex items-center">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 italic">"{testimonials[currentIndex].content}"</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-4' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials; 