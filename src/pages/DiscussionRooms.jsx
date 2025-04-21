import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const DiscussionRooms = () => {
  const { currentUser } = useAuth();
  const [activeRoom, setActiveRoom] = useState(null);
  const [thought, setThought] = useState('');
  const [reply, setReply] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharedThoughts, setSharedThoughts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [activeReaction, setActiveReaction] = useState(null);

  const reactions = [
    { emoji: '❤️', label: 'Love' },
    { emoji: '🙏', label: 'Support' },
    { emoji: '💡', label: 'Insightful' },
    { emoji: '🤗', label: 'Hug' },
    { emoji: '🌱', label: 'Growth' }
  ];

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

  const handleShareThought = (e) => {
    e.preventDefault();
    if (thought.trim() && activeRoom) {
      const newThought = {
        id: Date.now(),
        content: thought,
        roomId: activeRoom.id,
        timestamp: new Date().toISOString(),
        likes: 0,
        reactions: {},
        replies: []
      };
      setSharedThoughts([newThought, ...sharedThoughts]);
      setThought('');
      setIsModalOpen(false);
    }
  };

  const handleAddReply = (thoughtId) => {
    if (reply.trim()) {
      setSharedThoughts(sharedThoughts.map(t => 
        t.id === thoughtId ? {
          ...t,
          replies: [...t.replies, {
            id: Date.now(),
            content: reply,
            timestamp: new Date().toISOString()
          }]
        } : t
      ));
      setReply('');
    }
  };

  const handleAddReaction = (thoughtId, reaction) => {
    setSharedThoughts(sharedThoughts.map(t => {
      if (t.id === thoughtId) {
        const updatedReactions = { ...t.reactions };
        if (updatedReactions[reaction]) {
          updatedReactions[reaction]++;
        } else {
          updatedReactions[reaction] = 1;
        }
        return { ...t, reactions: updatedReactions };
      }
      return t;
    }));
  };

  const sortedThoughts = [...sharedThoughts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'mostLiked':
        return (b.likes + Object.values(b.reactions).reduce((a, b) => a + b, 0)) - 
               (a.likes + Object.values(a.reactions).reduce((a, b) => a + b, 0));
      default:
        return 0;
    }
  });

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
              onClick={() => {
                setActiveRoom(room);
                setIsModalOpen(true);
              }}
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

        {/* Shared Thoughts Section */}
        {sharedThoughts.length > 0 && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Recent Thoughts</h2>
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-200 text-white rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="mostLiked">Most Liked</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {sortedThoughts.map((thought) => (
                <motion.div
                  key={thought.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-100 rounded-2xl p-6 border border-primary/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white mb-2">{thought.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>{new Date(thought.timestamp).toLocaleString()}</span>
                        <button 
                          onClick={() => handleAddReaction(thought.id, '❤️')}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                        >
                          <span>❤️</span>
                          <span>{thought.likes}</span>
                        </button>
                      </div>
                      
                      {/* Reactions */}
                      <div className="flex gap-2 mb-4">
                        {reactions.map((reaction) => (
                          <button
                            key={reaction.emoji}
                            onClick={() => handleAddReaction(thought.id, reaction.emoji)}
                            className={`p-2 rounded-full transition-all ${
                              thought.reactions[reaction.emoji] 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-dark-200 text-gray-400 hover:bg-primary/10'
                            }`}
                            title={reaction.label}
                          >
                            <span className="text-lg">{reaction.emoji}</span>
                            {thought.reactions[reaction.emoji] && (
                              <span className="ml-1 text-sm">{thought.reactions[reaction.emoji]}</span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Replies */}
                      {thought.replies.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {thought.replies.map((reply) => (
                            <div key={reply.id} className="bg-dark-200 rounded-xl p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <span className="text-sm">👤</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-white text-sm">{reply.content}</p>
                                  <span className="text-xs text-gray-400">
                                    {new Date(reply.timestamp).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      <div className="mt-4">
                        <textarea
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full h-20 bg-dark-200 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-sm"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => handleAddReply(thought.id)}
                            disabled={!reply.trim()}
                            className="px-3 py-1 bg-primary text-dark-300 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Share Thought Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-dark-100 rounded-2xl p-6 w-full max-w-lg mx-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{activeRoom?.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{activeRoom?.title}</h3>
                    <p className="text-gray-400 text-sm">{activeRoom?.description}</p>
                  </div>
                </div>
                <form onSubmit={handleShareThought}>
                  <textarea
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder="Share your thoughts anonymously..."
                    className="w-full h-32 bg-dark-200 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!thought.trim()}
                      className="px-4 py-2 bg-primary text-dark-300 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Share Thought
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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