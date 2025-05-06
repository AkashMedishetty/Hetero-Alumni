import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

// Word Animation Component
interface AnimatedWordProps {
    text: string;
    scrollYProgress: MotionValue<number>; // Use MotionValue type
    totalItems: number;
    itemIndex: number; 
    isMobile: boolean; // Added isMobile prop
}

const AnimatedParagraph: React.FC<AnimatedWordProps> = ({ text, scrollYProgress, totalItems, itemIndex, isMobile }) => {
    const words = text.split(' ');
    // Calculate the primary range for the paragraph based on local progress (0-1)
    const paragraphStart = itemIndex / totalItems;
    const paragraphEnd = (itemIndex + 1) / totalItems;

    // Only calculate transforms if not on mobile
    const paragraphY = !isMobile ? useTransform(
        scrollYProgress,
        [paragraphStart, paragraphEnd],
        [20, 0] // Slightly more slide
    ) : undefined;

    return (
      // Apply slide only to the paragraph container if not mobile
      <motion.p 
        className="leading-relaxed text-base mb-4 text-gray-700 dark:text-gray-300"
        style={isMobile ? {} : { y: paragraphY }}
      >
        {words.map((word, wordIndex) => {
          // Only calculate transforms if not on mobile
          let finalOpacity: number | MotionValue<number> = 1; // Default to 1 for mobile
          if (!isMobile) {
              // Calculate when each word should start and finish animating (within the 0-1 local progress)
              // Stagger words across the first 80% of the paragraph's duration
              const wordStart = paragraphStart + (wordIndex / words.length) * (paragraphEnd - paragraphStart) * 0.8;
              // Give each word a bit longer to animate in (e.g., 0.15 of total progress)
              const wordMid = wordStart + 0.075; 
              const wordEndThreshold = paragraphEnd; // Words stay visible until paragraph ends

              finalOpacity = useTransform(
                scrollYProgress,
                // Fade in quickly, stay visible longer
                [wordStart, wordMid, wordEndThreshold],
                [0, 1, 1] 
              );
          }
          
          // Optional: Add a very subtle Y-offset per word for depth, but focus on opacity
          // const wordY = useTransform(scrollYProgress, [wordStart, wordMid], [5, 0]);

          return (
            <motion.span 
              key={wordIndex} 
              className="inline-block mr-[0.25em]"
              style={{ 
                // Use calculated opacity or 1 for mobile
                opacity: finalOpacity,
                // y: wordY // Optional: re-enable if needed
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.p>
    );
};

// Import the chairman image URL
const chairmanImageUrl = '/letter-from-chairman.png';

// Main Content Component
interface ChairmanLetterContentProps {
    localScrollYProgress: MotionValue<number>;
    isMobile?: boolean; // Added optional isMobile prop
}

const ChairmanLetterContent: React.FC<ChairmanLetterContentProps> = ({ localScrollYProgress, isMobile = false }) => {

    // Define the paragraphs (keep same as before)
    const paragraphs = [
        "Dear Valued Alumni,",
        "It gives me immense pleasure to invite you to the first-ever Hetero Alumni Reunion Event, scheduled for October 15th, 2025. As we celebrate over three decades of Hetero's contributions to global healthcare, I'm reminded that our greatest asset has always been our people.",
        "Each of you has played an integral role in building Hetero into the pharmaceutical powerhouse it is today. Your dedication, innovation, and commitment have helped us become the world's largest producer of anti-retroviral drugs, making life-saving medicines accessible to millions across the globe.",
        "This reunion is not just about reminiscing on the past but also about reconnecting, sharing your journeys since Hetero, and fostering a strong alumni network. We have planned a day filled with engaging activities, insightful discussions, and opportunities to create new memories with old colleagues.",
        "On behalf of everyone at Hetero, I extend my warmest invitation to you and look forward to welcoming you back to where your professional journey once took you. Your presence will make this event truly special.",
        "With warm regards,"
    ];

    const signature = "B. Parthasaradhi Reddy";
    const totalItems = paragraphs.length + 1;
    // Signature animation thresholds based on local progress (0-1)
    // ADJUSTED: Start earlier, finish earlier, stay visible longer
    const signatureStartLocal = 0.75; // Start animating in at 75% of local progress
    const signatureMidLocal = 0.85;   // Fully visible by 85%
    const signatureEndLocal = 1.0;    // Stay visible until the very end of local progress

    return (
        // Stacks vertically on mobile (default), row on desktop
        // Items-center for vertical alignment on desktop row
        <div className="flex flex-col lg:flex-row w-full h-full gap-8 lg:gap-12 items-center">
            {/* Image Area (Order 1 on Desktop, Top on Mobile) */}
            <div className="order-1 lg:order-1 w-full lg:w-1/3 flex flex-col items-center justify-center px-4">
              {/* Static Image for Mobile Only */}
              <img 
                 src={chairmanImageUrl}
                 alt="Chairman Illustration" 
                 className="block lg:hidden w-full max-w-[250px] sm:max-w-xs mx-auto mb-8 object-contain rounded-lg shadow-lg"
               />
               {/* EMPTY on Desktop - ImageMorphAnimator handles desktop image */}
            </div>

            {/* Text Area (Order 2 on Desktop, Bottom on Mobile) */}
            <div className="order-2 lg:order-2 w-full max-w-3xl lg:max-w-none lg:w-2/3 px-6 sm:px-8 lg:pr-0 lg:pl-12 flex flex-col justify-center">
                <motion.h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 lg:mb-8 text-gradient text-center lg:text-left"
                    // Simple animation based on component mount/visibility for now
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                    Letter from the Chairman
                </motion.h2>
                <div className="space-y-2 text-center lg:text-left">
                    {paragraphs.map((paragraph, idx) => (
                        <AnimatedParagraph 
                           key={idx} 
                           text={paragraph} 
                           scrollYProgress={localScrollYProgress}
                           totalItems={totalItems} 
                           itemIndex={idx} 
                           isMobile={isMobile} // Pass isMobile down
                        />
                    ))}
                    
                    {/* Signature Animation */}
                    <motion.div 
                        className="pt-6 flex flex-col items-center lg:items-end"
                        // Only apply animation styles if not mobile
                        style={isMobile ? {} : {
                            opacity: useTransform(localScrollYProgress, [signatureStartLocal, signatureMidLocal, signatureEndLocal], [0, 1, 1]),
                            scale: useTransform(localScrollYProgress, [signatureStartLocal, signatureMidLocal], [0.95, 1])
                        }}
                    >
                        <div className="text-hetero-light italic font-semibold text-lg sm:text-xl font-serif">
                            {signature}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Chairman & Managing Director, Hetero
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ChairmanLetterContent; 