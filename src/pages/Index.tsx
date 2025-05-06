import React, { useEffect, useRef } from 'react';
import { useParallax, ParallaxProvider } from 'react-scroll-parallax';
import Header from '@/components/Header';
// import Hero from '@/components/Hero'; // Keep commented out
// import ChairmanLetter from '@/components/ChairmanLetter'; // Keep commented out
import Timeline from '@/components/Timeline';
import Committee from '@/components/Committee';
import WallOfThoughts from '@/components/WallOfThoughts';
import Registration from '@/components/Registration';
import Venue from '@/components/Venue';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollytellingManager from '@/components/ScrollytellingManager';

const Index: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const { ref: parallaxBg1 } = useParallax<HTMLDivElement>({
    speed: -40, // Increased speed for more noticeable effect
  });
  
  const { ref: parallaxBg2 } = useParallax<HTMLDivElement>({
    speed: -20, // Increased speed for more noticeable effect
  });

  // Transform values based on scroll for more pronounced effects
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.2, 0]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth'
        });
      });
    });
    
    // Enhanced scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
      
      document.querySelectorAll('section').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <ParallaxProvider>
    <div ref={pageRef} className="min-h-screen relative">
      {/* Enhanced background parallax elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Top half background with enhanced parallax */}
        <motion.div 
          ref={parallaxBg1} 
          className="absolute top-0 left-0 right-0 h-full"
          style={{ 
            scale: bgScale,
            rotate: rotation,
          }}
        >
          {/* Top circular gradient */}
          <div className="absolute top-0 left-[5%] w-[90%] h-[40%] rounded-[100%] bg-gradient-to-b from-hetero/30 to-transparent blur-3xl"></div>
          
          {/* Additional floating elements */}
          <motion.div 
            className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-hetero/20 blur-3xl"
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute top-[5%] right-[15%] w-80 h-80 rounded-full bg-hetero-light/15 blur-3xl"
            animate={{
              y: [-30, 30, -30],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
        
        {/* Bottom half background with enhanced parallax */}
        <motion.div 
          ref={parallaxBg2} 
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{ opacity: bgOpacity }}
        >
          {/* Bottom diagonal gradient */}
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-hetero/20 to-transparent blur-3xl"></div>
          
          {/* Additional decorative elements */}
          <motion.div 
            className="absolute bottom-[15%] right-[20%] w-72 h-72 rounded-full bg-hetero-dark/15 blur-3xl"
            animate={{
              x: [-20, 20, -20],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute bottom-[30%] left-[15%] w-96 h-96 rounded-full bg-hetero/10 blur-3xl"
            animate={{
              x: [20, -20, 20],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </motion.div>
        
        {/* Animated grid lines for visual depth */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
          {[...Array(36)].map((_, i) => (
            <motion.div 
              key={i}
              className="border border-hetero/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
      
      <Header />
      
        <ScrollytellingManager />
      
        <section id="timeline" className="relative z-10 py-12 sm:py-16 md:py-20">
        <Timeline />
      </section>
      
        <section id="committee" className="relative z-10 py-12 sm:py-16 md:py-20">
        <Committee />
      </section>
      
        <section id="thoughts" className="relative z-10 py-12 sm:py-16 md:py-20">
        <WallOfThoughts />
      </section>
      
        <section id="register" className="relative z-10 py-12 sm:py-16 md:py-20">
        <Registration />
      </section>
      
        <section id="venue" className="relative z-10 py-12 sm:py-16 md:py-20">
        <Venue />
      </section>
      
        <section id="contact" className="relative z-10 py-12 sm:py-16 md:py-20">
        <Contact />
      </section>
      
      <Footer />
      
      {/* Enhanced scroll to top button */}
      <motion.button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 bg-hetero hover:bg-hetero-dark text-white p-3 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(234, 56, 76, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
    </ParallaxProvider>
  );
};

export default Index;
