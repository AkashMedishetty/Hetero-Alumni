import React from 'react';
import { motion, Variants } from 'framer-motion';

// Assuming Thought interface is defined in/imported by WallOfThoughts.tsx or a shared types file
// For now, let's redefine a simplified version here or expect it via props.
export interface Thought {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  // Optional fields for future enhancement
  // avatarUrl?: string;
  // batch?: string;
}

interface ThoughtCardProps {
  thought: Thought;
  variants?: Variants;
  // custom?: any; // If variants need custom prop for staggering delay
}

const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="w-60 sm:w-64 md:w-72 h-full flex-shrink-0 p-4 bg-neutral-800/50 dark:bg-black/30 rounded-xl shadow-lg hover:shadow-xl hover:shadow-hetero/20 transition-shadow duration-300 ease-in-out cursor-default border border-neutral-700/50 hover:border-hetero/50 flex flex-col"
      // Removed explicit scale on hover, will rely on parent hover or more subtle effects if needed
      // whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      // `layout` prop can be useful if card sizes change dynamically, but start without
    >
      <div className="flex-grow mb-2">
        <p className="text-gray-300 dark:text-gray-300 text-base leading-relaxed">
          {thought.content}
        </p>
      </div>
      <div className="mt-auto pt-2 border-t border-neutral-700/30">
        <p className="text-sm font-semibold text-hetero-light mb-0.5">
          {thought.author}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {thought.timestamp}
        </p>
      </div>
    </motion.div>
  );
};

export default ThoughtCard; 