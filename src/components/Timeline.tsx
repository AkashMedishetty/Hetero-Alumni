import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { AnimatePresence } from 'framer-motion';

// Interface for timeline items
interface TimelineItem {
  time: string;
  title: string;
  description: string;
  details?: {
    type: 'fireside' | 'entertainment';
    participants?: { name: string; title: string; image: string }[];
    performers?: { name: string; description: string; image: string }[];
  };
}

// Image paths (using correct path format)
const gaurImage = "/placeholder.svg";
const parthaImage = "/placeholder.svg";
const veenaImage = "/placeholder.svg";
const rahulImage = "/placeholder.svg";

const Timeline: React.FC = () => {
  // Event data
  const events: TimelineItem[] = [
    {
      time: "3:30 PM - 5:00 PM",
      title: "Arrival & Engagement",
      description: "Guests arrival, welcome drinks, pre-event engagement activities."
    },
    {
      time: "5:00 PM - 6:30 PM",
      title: "Welcome & Insights",
      description: "Welcome Address by CEO or HR head, Alumni keynote/panel discussion.",
      details: {
        type: 'fireside',
        participants: [
          { name: "Gaur Gopal Das", title: "Renowned spiritual leader and motivational speaker", image: gaurImage },
          { name: "Dr. B. Partha Saradhi Reddy", title: "CEO of Hetero", image: parthaImage }
        ]
      }
    },
    {
      time: "6:30 PM - 7:00 PM",
      title: "Moments & Mingling",
      description: "Group Photo & giveaway Session, Setting up for Live performance, Ice breaker Games / Engagement."
    },
    {
      time: "7:00 PM - 9:30 PM",
      title: "Performance, Dinner & Closing",
      description: "Live Artist Performance / Music, Networking Dinner & Cocktails, Closing note and future Engagement announcement.",
      details: {
        type: 'entertainment',
        performers: [
          { name: "Veena Srivani", description: "Renowned Indian veena artist...", image: veenaImage },
          { name: "Rahul Arya", description: "India's first sand artist...", image: rahulImage }
        ]
      }
    }
  ];
  
  // Refs for scroll hijacking
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Track animation completion
  const [isComplete, setIsComplete] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  
  // Scroll tracking with offset to make the animation last the full scroll distance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Map scroll progress to timeline animation
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  
  // Detect when animation completes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.9 && !isComplete) {
      setIsComplete(true);
    } else if (latest < 0.9 && isComplete) {
      setIsComplete(false);
    }
  });

  const handleEventItemClick = (index: number) => {
    setSelectedEventIndex(prevIndex => prevIndex === index ? null : index);
  };

  // Variants for mobile vertical list animation
  const mobileListVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const mobileItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div ref={containerRef} className="relative h-[300vh]"> {/* Keep outer height for desktop scroll */}
      <div 
        className={`sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-opacity duration-700 ${isComplete ? 'opacity-80' : 'opacity-100'}`}
        style={{ zIndex: 10 }}
      >
        {/* Background elements container - z-0 ensures it's behind content */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Grid Pattern - Increased visibility */}
          <div className="absolute inset-0 bg-grid-hetero/5 dark:bg-grid-hetero/10 opacity-30"></div>
          
          {/* Corner Blobs - Increased visibility */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-to-br from-hetero/15 to-transparent rounded-full filter blur-3xl opacity-70"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-hetero/15 to-transparent rounded-full filter blur-3xl opacity-70"></div>
          </div>
          
          {/* Floating Particles - Container has controlled opacity */}
          <div className="absolute inset-0 opacity-50 dark:opacity-30">
            {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
                className="absolute rounded-full bg-hetero/3 dark:bg-hetero/10"
            style={{
                  width: Math.random() * 50 + 25,
                  height: Math.random() * 50 + 25,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
                  duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
          </div>
      </div>

        {/* Content Area - z-10 ensures it's above background */}
        <div className="container mx-auto px-4 h-full flex flex-col py-6 sm:py-8 md:py-10 relative z-10">
          {/* Event Information Box */}
          <div className="text-center mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-900/60 dark:bg-black/50 backdrop-blur-lg rounded-lg shadow-xl border border-hetero/20 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-hetero-light to-gray-300 dark:to-white mb-2 sm:mb-3">Event Details</h2>
            <p className="text-sm sm:text-md font-semibold text-gray-300 dark:text-gray-300 mb-1">
              Agenda: <span className="text-hetero-light">Reconnect and Network</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              <p>Venue: <span className="font-medium text-gray-300 dark:text-gray-400">TBD</span></p>
              <p>Date: <span className="font-medium text-gray-300 dark:text-gray-400">June 1-10 (TBD)</span></p>
            </div>
          </div>

          {/* Timeline Container - Now contains BOTH layouts */}
          <div ref={timelineRef} className="relative flex-1 flex items-center justify-center mb-8 sm:mb-10 md:mb-12 overflow-hidden">

            {/* --- Desktop Horizontal Layout (lg+) --- */}
            <div className="absolute left-0 top-1/2 w-full h-24 sm:h-28 md:h-32 -translate-y-1/2 z-0">
              <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M0 100 
                     C100 30, 200 160, 300 80 
                     S450 20, 550 120 
                     S750 180, 850 50
                     S950 80, 1000 100"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 8px rgba(234, 56, 76, 0.6))"
                  style={{ pathLength }}
                />
                <defs>
                  <linearGradient id="gradient" gradientTransform="rotate(0)">
                    <stop offset="0%" stopColor="rgba(234, 56, 76, 0.3)" />
                    <stop offset="50%" stopColor="rgba(234, 56, 76, 1)" />
                    <stop offset="100%" stopColor="rgba(234, 56, 76, 0.3)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="w-full h-full relative"> {/* Container for absolutely positioned desktop items */}
              {events.map((event, index) => {
                // Calculate each event's position along the timeline
                const position = index / (events.length - 1);
                
                // Map animation to scroll progress - ensure we see all cards
                const progressThreshold = (index + 1) / (events.length + 0.5) * 0.85; 
                
                // Animation values
                const opacity = useTransform(
                  scrollYProgress,
                  [Math.max(0, progressThreshold - 0.15), progressThreshold],
                  [0, 1]
                );
                
                const scale = useTransform(
                  scrollYProgress,
                  [Math.max(0, progressThreshold - 0.1), progressThreshold],
                  [0.8, 1]
                );
                
                const yOffset = useTransform(
                  scrollYProgress,
                  [Math.max(0, progressThreshold - 0.15), progressThreshold],
                  [index % 2 === 0 ? -40 : 40, 0]
                );
                
                // For last items, ensure they're visually closer
                const adjustedPosition = index === events.length - 1 
                  ? position * 0.92 // Pull in the last card a bit
                  : position;
                
                const isTop = index % 2 === 0;
                
                // Calculate y position - closer to the line
                const baseYPos = isTop ? '40%' : '60%';

                // Adjusted cardClassName for responsive width and margins
                const cardClassName = `absolute ${isTop ? 'bottom-1/2 mb-4 sm:mb-6 md:mb-8' : 'top-1/2 mt-4 sm:mt-6 md:mt-8'} w-48 sm:w-56 md:w-64 max-w-[70vw] sm:max-w-xs ${index === 0 ? '' : 'left-1/2'}`;
                // Adjusted first card's translateX
                const cardTranslateX = index === 0 ? '8px' : 'calc(-50% - 1px)'; 

                return (
                  <motion.div 
                    key={`desktop-${index}`} 
                    className="absolute z-10 cursor-pointer"
                    style={{
                      left: `${adjustedPosition * 100}%`,
                      top: baseYPos,
                      opacity
                    }}
                    onClick={() => handleEventItemClick(index)}
                  >
                    {/* Event Marker */}
                    <motion.div 
                      className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-hetero rounded-full border-4 border-gray-800 dark:border-black flex items-center justify-center z-20 shadow-lg"
                      style={{ scale }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                    
                    {/* Event Card */}
                      <motion.div 
                      className={cardClassName}
                      style={{ 
                        y: yOffset,
                        translateX: cardTranslateX
                      }}
                    >
                      <div className="bg-gray-800/80 dark:bg-black/70 backdrop-blur-md p-3 rounded-lg shadow-xl border border-hetero/20 hover:border-hetero/40 transition-all duration-300">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-hetero rounded mb-1.5 sm:mb-2">
                          {event.time}
                        </span>
                        <h3 className="text-sm font-bold mb-1 text-gray-100 dark:text-white">
                          {event.title}
                        </h3>
                        <p className="text-xs text-gray-300 dark:text-gray-400 line-clamp-2 mb-1">
                          {event.description}
                        </p>
                        
                        {/* Condensed details */}
                        {event.details?.type === 'fireside' && event.details.participants && (
                          <div className="mt-1 pt-1 border-t border-gray-600/40 dark:border-gray-700/40">
                            <div className="flex gap-1">
                              {event.details.participants.map(p => (
                                <div key={p.name} className="flex items-center gap-1">
                                  <img src={p.image} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
                                  <p className="text-xs font-medium text-gray-200 dark:text-gray-300 truncate">{p.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {event.details?.type === 'entertainment' && event.details.performers && (
                          <div className="mt-1 pt-1 border-t border-gray-600/40 dark:border-gray-700/40">
                            <div className="flex gap-1">
                              {event.details.performers.map(p => (
                                <div key={p.name} className="flex items-center gap-1">
                                  <img src={p.image} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
                                  <p className="text-xs font-medium text-gray-200 dark:text-gray-300 truncate">{p.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Connector Line */}
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent via-hetero/50 to-hetero ${isTop ? 'bottom-0 -mb-8' : 'top-0 -mt-8'} opacity-60`}
                      ></div>
                      </motion.div>
                  </motion.div>
                );
              })}
            </div>

          </div>
          
          {/* Scroll indication - Always visible now (conditionally animated by opacity) */}
          <motion.div 
            className="absolute bottom-8 left-0 right-0 flex justify-center"
            animate={{ opacity: isComplete ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center text-gray-600 dark:text-gray-500">
              <span className="text-sm font-medium mb-1">Keep Scrolling</span>
              <svg className="w-6 h-6 text-hetero" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </motion.div>
          </motion.div>
          
          {/* Continue indication - Always visible now (conditionally animated by opacity) */}
          <motion.div 
            className="absolute bottom-8 left-0 right-0 flex justify-center"
            animate={{ opacity: isComplete ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center text-gray-600 dark:text-gray-500">
              <span className="text-sm font-medium mb-1">Continue Scrolling</span>
              <svg className="w-6 h-6 text-hetero" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Detailed Event Modal - Rendered outside the map, at the root of Timeline component */}
      <AnimatePresence>
        {selectedEventIndex !== null && events[selectedEventIndex] && (
          // Single parent motion.div for the entire modal system (overlay + content)
          <motion.div
            key={`modal-wrapper-${selectedEventIndex}`} // Key ensures the whole modal system animates on event change
            className="fixed inset-0 z-40 flex items-center justify-center" // Flex container for centering
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Overlay */}
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setSelectedEventIndex(null)} // Allow closing by clicking overlay
            />

            {/* Modal Content - now animates scale within the fading wrapper */}
            <motion.div
              className="relative w-[90vw] sm:w-[75vw] md:w-[60vw] max-h-[85vh] sm:max-h-[80vh] overflow-y-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border border-white/10 bg-neutral-800/50 dark:bg-neutral-900/70 backdrop-blur-xl z-50"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {(() => { // IIFE to access currentEvent safely
                const currentEvent = events[selectedEventIndex!];
                if (!currentEvent) return null;

                return (
                  <>
                    <div className="flex justify-between items-start mb-3 sm:mb-4 md:mb-6">
                        <div>
                            <span className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-md font-semibold text-white bg-hetero rounded-md mb-2 sm:mb-3">
                            {currentEvent.time}
                            </span>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 dark:text-white">
                            {currentEvent.title}
                            </h3>
                        </div>
                        <button 
                            onClick={() => setSelectedEventIndex(null)} 
                            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    
                    <p className="text-sm sm:text-md md:text-lg text-gray-300 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                      {currentEvent.description}
                    </p>

                    {/* Placeholder for additional event image - if you add a field to TimelineItem */}
                    {/* {currentEvent.largeImageUrl && 
                      <img src={currentEvent.largeImageUrl} alt={currentEvent.title} className="w-full h-auto max-h-64 object-contain rounded-lg mb-6 shadow-lg" />
                    } */}
                    
                    {currentEvent.details?.type === 'fireside' && currentEvent.details.participants && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                        <h4 className="text-md sm:text-lg font-semibold text-gray-200 dark:text-gray-200 mb-3 sm:mb-4 uppercase tracking-wider">Featuring</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                          {currentEvent.details.participants.map(p => (
                            <div key={p.name} className="flex flex-col items-center text-center p-3 sm:p-4 bg-white/5 dark:bg-white/10 rounded-lg">
                              <img src={p.image} alt={p.name} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border-2 sm:border-4 border-white/20 mb-2 sm:mb-3 shadow-md" />
                              <p className="text-base sm:text-lg font-semibold text-gray-100 dark:text-white">{p.name}</p>
                              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300">{p.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentEvent.details?.type === 'entertainment' && currentEvent.details.performers && (
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                        <h4 className="text-md sm:text-lg font-semibold text-gray-200 dark:text-gray-200 mb-3 sm:mb-4 uppercase tracking-wider">Performers</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                          {currentEvent.details.performers.map(p => (
                            <div key={p.name} className="flex flex-col items-center text-center p-3 sm:p-4 bg-white/5 dark:bg-white/10 rounded-lg">
                              <img src={p.image} alt={p.name} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border-2 sm:border-4 border-white/20 mb-2 sm:mb-3 shadow-md" />
                              <p className="text-base sm:text-lg font-semibold text-gray-100 dark:text-white">{p.name}</p>
                              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300">{p.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Timeline;
