import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

// Image paths (Ensure these are correct relative to your public folder or assets structure)
const heroImageUrl = new URL('../ChatGPT Image May 6, 2025, 01_43_15 AM.png', import.meta.url).href;
const chairmanImageUrl = '/letter-from-chairman.png';

interface ImageMorphAnimatorProps {
  scrollYProgress: MotionValue<number>;
  // Scene boundaries passed from the manager
  heroSceneEnd: number;
  chairmanSceneStart: number; // Should be the same as heroSceneEnd
  chairmanSceneEnd: number;
  transitionOverlap: number; // How much the transitions overlap
}

const ImageMorphAnimator: React.FC<ImageMorphAnimatorProps> = ({ 
  scrollYProgress, 
  heroSceneEnd, 
  chairmanSceneStart, // Could technically just use heroSceneEnd
  chairmanSceneEnd,
  transitionOverlap
}) => {

  // Define the core transition period
  const transitionStart = heroSceneEnd - transitionOverlap;
  const transitionEnd = chairmanSceneStart + transitionOverlap; 

  // Define Start/End Horizontal Positions in vw units (relative to viewport center)
  const startXvw = 25;    // Center of a 50vw container on the right half 
  const endXvw = -33.33; // Center of a 33.33vw container on the left third

  // Define Start/End Container Widths in vw units
  const heroContainerWidthVw = 50;
  const chairmanContainerWidthVw = 33.33;

  // --- Animated X Position --- 
  const animatedX = useTransform(
    scrollYProgress,
    [transitionStart, transitionEnd],
    [`${startXvw}vw`, `${endXvw}vw`]
  );

  // --- Animated Container Width ---
  const animatedWidth = useTransform(
    scrollYProgress,
    [transitionStart, transitionEnd],
    [`${heroContainerWidthVw}vw`, `${chairmanContainerWidthVw}vw`]
  );

  // --- Hero Image Animations --- 
  // Fade out during the transition
  const heroImageOpacity = useTransform(
    scrollYProgress,
    [transitionStart, transitionEnd],
    [1, 0]
  );
  // Optional: Scale down during transition
  const heroImageScale = useTransform(
    scrollYProgress,
    [transitionStart, transitionEnd],
    [1, 0.95]
  );

  // --- Chairman Image Animations --- 
  // Fade in during the transition
  const chairmanImageOpacity = useTransform(
    scrollYProgress,
    [transitionStart, transitionEnd],
    [0, 1]
  );
   // Optional: Scale up during transition
  const chairmanImageScale = useTransform(
    scrollYProgress,
    [transitionStart, transitionEnd],
    [0.95, 1]
  );

  // Control overall visibility - only render/animate when relevant
  // Visible from start until the transition ends for Hero
  const heroImageDisplay = useTransform(scrollYProgress, value => 
      value <= transitionEnd ? 'block' : 'none'
  );
  // Visible from transition start until the chairman scene ends
  const chairmanImageDisplay = useTransform(scrollYProgress, value => 
      (value >= transitionStart && value <= chairmanSceneEnd) ? 'block' : 'none'
  );

  return (
    // Container spans the full area, positioning happens via transform
    <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none z-0">
      {/* Single positioning wrapper - its X position is animated */}
      <motion.div 
        className="absolute h-[70vh] flex items-center justify-center" // Width is now dynamic
        style={{
          x: animatedX, 
          width: animatedWidth, 
        }}
      >
            {/* Hero Image - Inherits moving X from parent */}
            <motion.img
                src={heroImageUrl}
                alt="Alumni Group Illustration" // More descriptive alt
                className="absolute max-w-full h-auto object-contain rounded-lg shadow-lg"
                style={{
                    opacity: heroImageOpacity,
                    scale: heroImageScale,
                    display: heroImageDisplay,
                    maxHeight: '70vh'
                }}
            />
            {/* Chairman Letter Image */}
            <motion.img
                src={chairmanImageUrl}
                alt="Chairman Letter Illustration"
                className="absolute max-w-full h-auto object-contain rounded-lg shadow-lg"
                style={{
                    opacity: chairmanImageOpacity,
                    scale: chairmanImageScale,
                    display: chairmanImageDisplay,
                    maxHeight: '70vh'
                }}
            />
      </motion.div>
    </div>
  );
};

export default ImageMorphAnimator; 