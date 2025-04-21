import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const DiscussionRooms = () => {
  const { currentUser } = useAuth();
  const [activeRoom, setActiveRoom] = useState(null);

  const rooms = [
    {
      id: 1,
      title: "Mindfulness & Meditation",
      description: "Share experiences and tips about meditation practices",
      icon: "🧘‍♀️",
      participants: 45,
      lastActive: "2 minutes ago"
    },
    {
      id: 2,
      title: "Spiritual Growth",
      description: "Discuss spiritual journeys and personal growth",
      icon: "✨",
      participants: 32,
      lastActive: "5 minutes ago"
    },
    {
      id: 3,
      title: "Stress Management",
      description: "Share coping strategies and support each other",
      icon: "🌿",
      participants: 28,
      lastActive: "10 minutes ago"
    },
    {
      id: 4,
      title: "Wellness & Self-Care",
      description: "Exchange ideas about holistic wellness practices",
      icon: "💆‍♀️",
      participants: 36,
      lastActive: "15 minutes ago"
    }
  ];

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
            Anonymous Discussion Rooms
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Share your thoughts, ask questions, and seek support in a safe, anonymous space.
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-100 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
              onClick={() => setActiveRoom(room)}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{room.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{room.title}</h3>
                  <p className="text-gray-400 mb-4">{room.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>👥 {room.participants} active</span>
                    <span>•</span>
                    <span>🕒 {room.lastActive}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Privacy Notice */}
        <motion.div 
          className="bg-dark-100 rounded-2xl p-6 border border-primary/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-2xl">🔒</div>
            <h3 className="text-xl font-semibold text-white">Your Privacy is Protected</h3>
          </div>
          <p className="text-gray-400">
            All discussions are completely anonymous. Your identity is never revealed, and all messages are encrypted.
            Our moderators ensure a safe and supportive environment for everyone.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DiscussionRooms; 