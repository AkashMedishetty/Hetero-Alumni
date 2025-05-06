import React, { useRef, useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface CommitteeMember {
  name: string;
  position: string;
  image: string;
}

const Committee: React.FC = () => {
  const committeeMembers: CommitteeMember[] = [
    {
      name: "Dr. Bandi Parthasaradhi Reddy",
      position: "Chairman & Managing Director",
      image: "https://placehold.co/400x500/ea384c/ffffff?text=BPR"
    },
    {
      name: "Dr. Vamsi Krishna Bandi",
      position: "Managing Director",
      image: "https://placehold.co/400x500/1a202c/ffffff?text=VKB"
    },
    {
      name: "Dr. Srinivas Reddy",
      position: "Director of Operations",
      image: "https://placehold.co/400x500/2d3748/ffffff?text=SR"
    },
    {
      name: "Ms. Divya Bandi",
      position: "Director",
      image: "https://placehold.co/400x500/4a5568/ffffff?text=DB"
    },
    {
      name: "Mr. Rajesh Kumar",
      position: "Alumni Committee Head",
      image: "https://placehold.co/400x500/718096/ffffff?text=RK"
    },
    {
      name: "Dr. Anand Sharma",
      position: "Event Coordinator",
      image: "https://placehold.co/400x500/a0aec0/ffffff?text=AS"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  const textOverlayContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.3 } } 
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScrollability = () => {
      const container = scrollContainerRef.current;
      if (container) {
        const isScrollable = container.scrollWidth > container.clientWidth;
        const isNotAtEnd = container.scrollLeft + container.clientWidth < container.scrollWidth - 10;
        setShowScrollIndicator(isScrollable && isNotAtEnd);
      }
    };

    checkScrollability();
    window.addEventListener('resize', checkScrollability);

    const containerElement = scrollContainerRef.current;
    if (containerElement) {
      containerElement.addEventListener('scroll', checkScrollability);
    }

    return () => {
      window.removeEventListener('resize', checkScrollability);
      if (containerElement) {
        containerElement.removeEventListener('scroll', checkScrollability);
      }
    };
  }, [committeeMembers]);

  return (
    <div className="relative" style={{ height: "150vh" }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-hetero/20 dark:bg-hetero/25"
              style={{
                width: Math.random() * 70 + 20,
                height: Math.random() * 70 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 60 - 30],
                y: [0, Math.random() * 60 - 30],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col flex-grow justify-center py-16 md:py-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-hetero-light via-hetero to-hetero-dark">
                Organizing Committee
              </span>
            </h2>
          </AnimatedSection>
          
          <div className="relative mt-auto mb-auto">
            <motion.div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 items-stretch gap-x-4 sm:gap-x-6 md:gap-x-8 [&::-webkit-scrollbar]:hidden"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {committeeMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  className="w-[75vw] sm:w-80 md:w-96 flex-shrink-0"
                >
                  <Card className="relative aspect-[3/4] w-full h-full overflow-hidden rounded-xl shadow-2xl transition-all duration-300 group hover:shadow-hetero/30 border-transparent">
                    <motion.img 
                      src={member.image} 
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex flex-col justify-end">
                      <motion.div 
                        className="p-3 sm:p-4 md:p-5 text-white"
                        variants={textOverlayContentVariants} 
                      >
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-0.5">
                          {member.name}
                        </h3>
                        <p className="text-sm text-hetero-light group-hover:text-white transition-colors duration-300">
                          {member.position}
                        </p>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <AnimatePresence>
              {showScrollIndicator && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center bg-hetero/90 backdrop-blur-md px-4 py-2.5 rounded-l-full text-white text-sm font-medium shadow-xl pointer-events-none"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  Scroll
                  <ChevronRightIcon className="w-5 h-5 ml-1.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committee;
