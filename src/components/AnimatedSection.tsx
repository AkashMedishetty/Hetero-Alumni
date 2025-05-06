
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  threshold?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0.2,
  duration = 0.8,
  distance = 100, // Increased distance for more dramatic effect
  direction = 'up',
  once = true,
  threshold = 0.2,
  springConfig = {
    stiffness: 100,
    damping: 10,
    mass: 1,
  },
}) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: threshold,
    rootMargin: '-50px 0px',
  });

  const getDirection = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getDirection()}
      animate={inView ? { y: 0, x: 0, opacity: 1 } : getDirection()}
      transition={{
        type: 'spring',
        damping: springConfig.damping,
        stiffness: springConfig.stiffness,
        mass: springConfig.mass,
        duration: duration,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
