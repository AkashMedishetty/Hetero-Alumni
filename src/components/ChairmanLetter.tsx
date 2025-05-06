import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// Word Animation Component
interface AnimatedWordProps {
  text: string;
  scrollYProgress: any; // MotionValue<number>
  totalItems: number;
  itemIndex: number; // Index of the paragraph/item
}

const AnimatedParagraph: React.FC<AnimatedWordProps> = ({ text, scrollYProgress, totalItems, itemIndex }) => {
  const words = text.split(' ');
  const paragraphStartThreshold = itemIndex / totalItems;
  const paragraphEndThreshold = (itemIndex + 1) / totalItems;

  // Overall paragraph visibility based on scroll
  const paragraphOpacity = useTransform(
    scrollYProgress,
    [paragraphStartThreshold, (paragraphStartThreshold + paragraphEndThreshold) / 2],
    [0, 1]
  );
  const paragraphY = useTransform(
      scrollYProgress,
      [paragraphStartThreshold, paragraphEndThreshold],
      [15, 0] // Subtle slide up for the whole paragraph block
  );

  return (
    <motion.p 
      className="leading-relaxed text-base mb-4"
      style={{ opacity: paragraphOpacity, y: paragraphY }}
    >
      {words.map((word, wordIndex) => {
        const wordStart = paragraphStartThreshold + (wordIndex / words.length) * (paragraphEndThreshold - paragraphStartThreshold) * 0.8; // Stagger start within paragraph scroll % 
        const wordEnd = wordStart + 0.1; // Duration each word takes to animate

        const wordOpacity = useTransform(
          scrollYProgress,
          [wordStart, wordEnd],
          [0, 1]
        );
        const wordY = useTransform(
          scrollYProgress,
          [wordStart, wordEnd],
          [10, 0] // Slide up each word
        );
        
        return (
          <motion.span 
            key={wordIndex} 
            className="inline-block mr-[0.25em]" // Add space between words
            style={{ opacity: wordOpacity, y: wordY }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.p>
  );
};

const ChairmanLetter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Define the paragraphs
  const paragraphs = [
    "Dear Valued Alumni,",
    "It gives me immense pleasure to invite you to the first-ever Hetero Alumni Reunion Event, scheduled for October 15th, 2025. As we celebrate over three decades of Hetero's contributions to global healthcare, I'm reminded that our greatest asset has always been our people.",
    "Each of you has played an integral role in building Hetero into the pharmaceutical powerhouse it is today. Your dedication, innovation, and commitment have helped us become the world's largest producer of anti-retroviral drugs, making life-saving medicines accessible to millions across the globe.",
    "This reunion is not just about reminiscing on the past but also about reconnecting, sharing your journeys since Hetero, and fostering a strong alumni network. We have planned a day filled with engaging activities, insightful discussions, and opportunities to create new memories with old colleagues.",
    "On behalf of everyone at Hetero, I extend my warmest invitation to you and look forward to welcoming you back to where your professional journey once took you. Your presence will make this event truly special.",
    "With warm regards,"
  ];

  const signature = "B. Parthasaradhi Reddy";
  const totalItems = paragraphs.length + 1; // +1 for signature
  const signatureStartThreshold = (totalItems - 1) / totalItems;
  const animationEndThreshold = 0.95; // Use a fixed threshold near the end

  // Check for animation completion
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= animationEndThreshold && !isComplete) {
      setIsComplete(true);
    } else if (latest < animationEndThreshold && isComplete) {
      setIsComplete(false);
    }
  });
  
  // Background particle speed based on scroll
  const particleDuration = useTransform(scrollYProgress, [0, 1], [25, 10]); // Faster as you scroll

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}> {/* Increased height for longer scroll */}
      <div 
        className={`sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-opacity duration-700 ${isComplete ? 'opacity-80' : 'opacity-100'}`}
        style={{ zIndex: 10 }}
      >
        {/* Original Chairman Letter Subtle Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
           <div className="absolute inset-0 opacity-50 dark:opacity-30">
             {[...Array(7)].map((_, i) => ( // Slightly more particles
          <motion.div
            key={i}
                  className="absolute rounded-full bg-hetero/3 dark:bg-hetero/5"
            style={{
                    width: Math.random() * 40 + 20, // Slightly smaller
                    height: Math.random() * 40 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
                    y: [0, -40, 0],
                    opacity: [0.05, 0.15, 0.05], // Subtler opacity
            }}
            transition={{
                    duration: particleDuration.get(), // Use dynamic duration
              repeat: Infinity,
              delay: Math.random() * 5,
                    ease: "linear" // Consistent speed
            }}
          />
        ))}
      </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="flex w-full gap-16 items-center">
            {/* Left Side: Graphic Placeholder Replaced with Image */}
            <motion.div 
              className="w-1/3 flex flex-col items-center justify-center px-4 h-auto"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {/* Integrated Image */}
              <img 
                src="/letter-from-chairman.png" 
                alt="Chairman Letter Illustration" 
                className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                style={{ maxHeight: '70vh' }} // Ensure it doesn't exceed viewport height
              />
            </motion.div>
            
            {/* Right Side: Letter Content */}
            <div className="w-2/3 pr-8 flex flex-col justify-center h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-hetero/40 scrollbar-track-transparent scrollbar-thumb-rounded-full">
               <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-8 text-gradient"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  >
                Letter from the Chairman
              </motion.h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                {paragraphs.map((paragraph, idx) => (
                  <AnimatedParagraph 
                     key={idx} 
                     text={paragraph} 
                     scrollYProgress={scrollYProgress} 
                     totalItems={totalItems} 
                     itemIndex={idx} 
                  />
                ))}
                
                {/* Signature Animation - Fade and slight scale */}
                <motion.div 
                  className="pt-6 flex flex-col items-end"
                  style={{
                    opacity: useTransform(scrollYProgress, [signatureStartThreshold, animationEndThreshold], [0, 1]),
                    scale: useTransform(scrollYProgress, [signatureStartThreshold, animationEndThreshold], [0.95, 1])
                  }}
                >
                  <div className="text-hetero-light italic font-semibold text-xl font-serif">
                    {signature}
                  </div>
                   <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Chairman & Managing Director, Hetero
                  </p>
                </motion.div>
              </div>
            </div>
              </div>
            </div>
            
        {/* Scroll Progress Bar Indicator */}
            <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1.5 pointer-events-none z-20"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, animationEndThreshold - 0.05, animationEndThreshold], [0, 1, 1, 0]) // Fade in at start, fade out at end
          }}
        >
           <motion.div 
              className="h-full bg-gradient-to-r from-hetero/80 to-hetero-light origin-left"
              style={{ scaleX: scrollYProgress }} 
           />
            </motion.div>

      </div>
    </div>
  );
};

export default ChairmanLetter;
