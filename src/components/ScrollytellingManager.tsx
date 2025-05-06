import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import HeroContent from './HeroContent';
import ChairmanLetterContent from './ChairmanLetterContent'; // Import ChairmanLetter content
import ImageMorphAnimator from './ImageMorphAnimator'; // Import the new component

interface ScrollytellingManagerProps {
  // children prop might not be needed anymore if scenes are hardcoded
  totalHeight?: string; // e.g., "600vh"
}

const ScrollytellingManager: React.FC<ScrollytellingManagerProps> = ({ 
  // Keep default totalHeight for desktop
  totalHeight = "400vh" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress only relevant for desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  // Scene definitions only relevant for desktop
  const heroSceneStart = 0;
  const heroSceneEnd = 0.4; 
  const chairmanSceneStart = heroSceneEnd; 
  const chairmanSceneEnd = 1.0; 
  const transitionOverlap = 0.05; 

  // Transforms only relevant for desktop
  const heroScrollProgress = useTransform(scrollYProgress, [heroSceneStart, heroSceneEnd], [0, 1]);
  const chairmanScrollProgress = useTransform(scrollYProgress, [chairmanSceneStart, chairmanSceneEnd], [0, 1]);
  const heroOpacity = useTransform(scrollYProgress, [heroSceneStart, heroSceneEnd - transitionOverlap, heroSceneEnd], [1, 1, 0]);
  const heroDisplay = useTransform(scrollYProgress, value => value <= heroSceneEnd ? 'flex' : 'none'); 
  const chairmanOpacity = useTransform(scrollYProgress, [chairmanSceneStart, chairmanSceneStart + transitionOverlap, chairmanSceneEnd - transitionOverlap, chairmanSceneEnd], [0, 1, 1, 0]);
  const chairmanDisplay = useTransform(scrollYProgress, value => (value > chairmanSceneStart && value <= chairmanSceneEnd) ? 'flex' : 'none');

  // Dummy motion value for mobile chairman letter prop
  const dummyScrollProgress = useMotionValue(0);

  return (
    // Responsive height: auto on mobile, specific vh on desktop
    <div ref={containerRef} className="relative h-auto lg:h-[400vh]"> 
      {/* --- Sticky Container - Responsive Height --- */}
      <div 
        className="sticky top-0 left-0 w-full h-auto min-h-screen lg:h-screen flex flex-col items-center justify-start lg:justify-center" 
        style={{ zIndex: 10 }}
      >
        {/* --- Background Elements (Keep as is) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0"> 
          <div className="absolute inset-0 bg-grid-hetero/5 dark:bg-grid-hetero/10 opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-to-br from-hetero/15 to-transparent rounded-full filter blur-3xl opacity-70"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-hetero/15 to-transparent rounded-full filter blur-3xl opacity-70"></div>
          </div>
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

        {/* --- Image Morph Animator (Only for Desktop) --- */}
        {/* It already has hidden lg:flex applied internally */}
        <ImageMorphAnimator 
            scrollYProgress={scrollYProgress}
            heroSceneEnd={heroSceneEnd}
            chairmanSceneStart={chairmanSceneStart}
            chairmanSceneEnd={chairmanSceneEnd}
            transitionOverlap={transitionOverlap}
        />

        {/* --- Content Area --- */}
        <div className="container mx-auto px-0 md:px-4 h-full flex items-center justify-center relative z-10 w-full">
          {/* --- Mobile Static Content (<lg) --- */}
          <div className="block lg:hidden w-full pt-20 pb-10 px-4"> {/* Added padding top/bottom for mobile */} 
            <div className="space-y-16 md:space-y-24"> {/* Add space between sections on mobile */} 
              <HeroContent />
              <ChairmanLetterContent localScrollYProgress={dummyScrollProgress} isMobile={true} /> {/* Pass dummy motion value for mobile and isMobile=true */} 
            </div>
          </div>

          {/* --- Desktop Animated Content (lg+) --- */}
          <div className="hidden lg:block w-full h-full absolute inset-0 pointer-events-none"> {/* Container for absolute positioning */} 
             {/* --- Hero Scene Content --- */}
             <motion.div 
                className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-auto"
                style={{ 
                  opacity: heroOpacity,
                  display: heroDisplay,
                  zIndex: 2 
                }}
             >
               <HeroContent /> 
             </motion.div>
             
             {/* --- Chairman Letter Scene Content --- */}
             <motion.div 
                className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-auto"
                style={{ 
                  opacity: chairmanOpacity,
                  display: chairmanDisplay,
                  zIndex: 1 
                }}
             >
               <ChairmanLetterContent localScrollYProgress={chairmanScrollProgress} isMobile={false} />
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollytellingManager; 