import React from 'react';
import ThoughtCard, { Thought } from './ThoughtCard';

interface MarqueeLaneProps {
  direction: 'ltr' | 'rtl'; 
  duration: string; 
  laneThoughts: Thought[]; 
}

export const MarqueeLane: React.FC<MarqueeLaneProps> = ({ 
  direction, 
  duration, 
  laneThoughts 
}) => {
  const animationClass = direction === 'ltr' ? 'animate-marquee-ltr' : 'animate-marquee-rtl';
  // Duplicate thoughts for seamless looping
  const duplicatedThoughts = [...laneThoughts, ...laneThoughts]; 
  
  return (
    <div 
      className="relative flex overflow-hidden group"
      style={{ "--gap": "0.75rem", "--duration": duration } as React.CSSProperties}
    >
      <div 
        className={`flex shrink-0 justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused] ${animationClass}`}
      >
        {duplicatedThoughts.map((thought, index) => (
          // Wrapper div to enforce aspect ratio on the card
          <div key={`${thought.id}-${index}-${direction}`} className="aspect-[3/4.5] h-full">
            <ThoughtCard 
              thought={thought} 
            />
          </div>
        ))}
      </div>
      {/* Edge Fades - Adjusted width and removed explicit background color */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 sm:w-1/8 md:w-1/6 bg-gradient-to-r from-transparent via-background/80 to-background/0 z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 sm:w-1/8 md:w-1/6 bg-gradient-to-l from-transparent via-background/80 to-background/0 z-10" />
    </div>
  );
}; 