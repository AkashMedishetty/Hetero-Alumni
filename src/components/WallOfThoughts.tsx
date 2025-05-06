import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from './AnimatedSection';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ThoughtCard, { Thought } from './ThoughtCard';
import { MarqueeLane } from './MarqueeLane';
import { XMarkIcon } from '@heroicons/react/24/solid';

const WallOfThoughts: React.FC = () => {
  const sampleThoughts: Thought[] = [
    { id: 1, content: "Excited to reconnect!", author: "Dr. Rajesh K", timestamp: "2d ago" },
    { id: 2, content: "Years at Hetero shaped my career.", author: "Priya M", timestamp: "3d ago" },
    { id: 3, content: "See how the company grew!", author: "Vivek S", timestamp: "1w ago" },
    { id: 4, content: "Proud of Hetero's impact.", author: "Dr. Anita R", timestamp: "5d ago" },
    { id: 5, content: "Remembering the HIV drug team.", author: "Dr. Samuel J", timestamp: "3d ago" },
    { id: 6, content: "Grateful for my first break.", author: "Suresh P", timestamp: "1d ago" },
    { id: 7, content: "10 years since generic launch!", author: "Lakshmi N", timestamp: "4d ago" },
    { id: 8, content: "Manufacturing expertise gained.", author: "David W", timestamp: "2d ago" },
    { id: 9, content: "Looking forward to networking.", author: "Amit Singh", timestamp: "6h ago" },
    { id: 10, content: "Great initiative for alumni.", author: "Sunita Rao", timestamp: "10h ago" },
  ];

  const [thoughts, setThoughts] = useState<Thought[]>([...sampleThoughts, ...sampleThoughts]);
  const [newThought, setNewThought] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const animationControls = useAnimation();
  const [containerRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      animationControls.start("visible");
    } else {
      // animationControls.start("hidden");
    }
  }, [animationControls, inView]);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const addThought = () => {
    if (!newThought.trim()) return;
    if (!isLoggedIn) {
      alert("Please register to share your thoughts!");
      return;
    }
    const newThoughtObj: Thought = {
      id: Date.now(),
      content: newThought,
      author: "You (Registered User)",
      timestamp: "Just now",
    };
    const currentThoughts = thoughts.slice(0, thoughts.length / 2);
    const updatedUniqueThoughts = [newThoughtObj, ...currentThoughts];
    setThoughts([...updatedUniqueThoughts, ...updatedUniqueThoughts]);
    setNewThought("");
    setIsShareModalOpen(false);
  };

  const handleThoughtClick = (thought: Thought) => {
    setSelectedThought(thought === selectedThought ? null : thought);
  };

  const wallContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative" style={{ height: "150vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-hetero/10 dark:bg-hetero/15 rounded-full blur-2xl"
              style={{
                width: `${Math.random() * 200 + 150}px`,
                height: `${Math.random() * 200 + 150}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 25 + 20,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div 
          ref={containerRef} 
          className="container mx-auto px-4 relative z-10 flex flex-col h-full py-6 lg:py-8"
        >
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-hetero-light via-hetero to-hetero-dark">
                Wall of Thoughts
              </span>
            </h2>
          </AnimatedSection>
        
          <AnimatedSection className="mb-4 flex-shrink-0" delay={0.2}>
            <div className="max-w-lg mx-auto">
              <button
                onClick={() => setIsShareModalOpen(true)}
                disabled={!isLoggedIn}
                className="w-full p-3 text-left rounded-lg bg-gray-800/40 dark:bg-black/30 hover:bg-gray-700/50 dark:hover:bg-black/40 border border-neutral-700/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  {isLoggedIn ? "Share a thought or memory..." : "Register to share your thoughts..."}
                </span>
              </button>
            </div>
          </AnimatedSection>

          <motion.div 
            className="my-auto flex flex-col gap-1.5 flex-grow min-h-0"
            variants={wallContainerVariants} 
            initial="hidden"
            animate={animationControls} 
          >
            <MarqueeLane direction="ltr" duration="60s" laneThoughts={thoughts.slice(0, thoughts.length / 2)} />
            <MarqueeLane direction="rtl" duration="75s" laneThoughts={thoughts.slice(0, thoughts.length / 2)} />
            <MarqueeLane direction="ltr" duration="55s" laneThoughts={thoughts.slice(0, thoughts.length / 2)} />
            <MarqueeLane direction="rtl" duration="70s" laneThoughts={thoughts.slice(0, thoughts.length / 2)} />
          </motion.div>
          
          <AnimatedSection className="text-center mt-auto pt-3 pb-3 flex-shrink-0" direction="up">
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
              Explore thoughts from Hetero alumni. 
              {isLoggedIn ? "Add your voice!" : "Register to connect."}
            </p>
          </AnimatedSection>
        </div>
      </div>

      <AnimatePresence>
        {isShareModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsShareModalOpen(false)} 
            />
            <motion.div
              key="share-modal"
              className="fixed top-1/2 left-1/2 w-[90vw] max-w-lg p-4 sm:p-6 rounded-xl shadow-2xl border border-neutral-700/50 bg-gray-900/90 backdrop-blur-xl z-50 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.9, y: "-45%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, y: "-45%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Share Your Thought</h3>
                <button 
                  onClick={() => setIsShareModalOpen(false)} 
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <Textarea
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                placeholder="What's on your mind? Share a memory or thought..."
                rows={4}
                className="w-full p-3 border border-gray-600/50 dark:border-gray-700/60 rounded-md focus:ring-1 focus:ring-hetero focus:border-hetero transition bg-white/5 dark:bg-gray-800/20 text-gray-200 text-sm placeholder-gray-500 dark:placeholder-gray-500 mb-4"
              />
              <div className="flex justify-end">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={addThought}
                    disabled={!isLoggedIn || !newThought.trim()}
                    size="sm"
                    className="bg-hetero text-white hover:bg-hetero-dark transition disabled:opacity-50 text-sm px-5 py-2"
                  >
                    Post Thought
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WallOfThoughts;
