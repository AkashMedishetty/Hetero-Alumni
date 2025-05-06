import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParallax } from 'react-scroll-parallax';
import { motion, useTransform, useScroll } from 'framer-motion';
import CountdownTimer from './CountdownTimer';

// Remove the direct import
// import alumniImage from '../ChatGPT Image May 6, 2025, 01_43_15 AM.png';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Re-enable background parallax only
  const backgroundParallax = useParallax<HTMLDivElement>({
    speed: -15, // Slower speed for subtle effect
    // scale: [1, 1.1], // Remove scale effect for now
    opacity: [1, 0.7], // Fade slightly on scroll
  });
  
  /*
  const contentParallax = useParallax<HTMLDivElement>({
    speed: -15,
    translateY: [0, -80],
    opacity: [1, 0.8],
  });
  */
  
  /*
  const logoParallax = useParallax<HTMLDivElement>({ speed: 5 });
  */

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id="hero" className="relative min-h-screen flex items-end bg-gray-100 dark:bg-black overflow-hidden pt-16">
      {/* Replaced placeholder div with an image */}
      <div ref={backgroundParallax.ref} className="absolute inset-0 overflow-hidden -z-10"> 
         <motion.img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your final image URL
            alt="Atmospheric background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]), // Slightly reduced scale effect
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]), // Adjusted fade
            }}
         />
         {/* Subtle overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-black/10 to-black/40 dark:from-black/20 dark:via-black/30 dark:to-black/70"></div>
         {/* Bottom Fade Overlay - Increased height and stronger fade */} 
         <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/70 to-transparent dark:from-black dark:via-black/80"></div>
      </div>
      
      {/* Improved content layout with reduced padding */}
      <div className="container mx-auto px-4 z-10 pb-16">
        {/* Reverted to original grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Removed col-span class */}
          <div className={`lg:text-left space-y-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-snug"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-hetero via-hetero-light to-hetero"
                initial={{ backgroundPosition: "200% 0%" }}
                animate={{ backgroundPosition: "0% 0%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                Hetero
              </motion.span>
              <br />
              <motion.span 
                className="text-gray-900 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Alumni Connect
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Reuniting the people who built a pharmaceutical powerhouse
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  className="bg-hetero hover:bg-hetero-dark w-full sm:w-auto text-white text-lg px-8 py-6 shadow-lg shadow-hetero/20 hover:shadow-hetero/40 transition-all duration-300"
                >
                  Register Now
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-hetero text-hetero hover:bg-hetero/10 hover:border-hetero-dark text-lg px-8 py-6 transition-all duration-300"
                >
                  Event Details
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center lg:justify-start space-x-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <motion.div 
                className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 px-5 rounded-xl shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(234, 56, 76, 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-hetero to-hetero-dark bg-clip-text text-transparent">OCT</h3>
                <p className="text-lg font-medium">15, 2025</p>
              </motion.div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-hetero/30 to-transparent"></div>
              <motion.div 
                className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-3 px-5 rounded-xl shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(234, 56, 76, 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-hetero to-hetero-dark bg-clip-text text-transparent">09<span className="text-lg">AM</span></h3>
                <p className="text-lg font-medium">Hyderabad</p>
              </motion.div>
            </motion.div>

            {/* Add Countdown Timer Here */}
            <motion.div
              className="pt-8 flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }} // Slightly later delay
            >
              <CountdownTimer /> 
            </motion.div>

          </div>
          
          {/* Model/Image Container */}
          <div className={`lg:self-center flex justify-center items-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
            <div className="w-full h-full min-h-[300px] flex items-center justify-center">
            <motion.div
                className="relative w-full h-full flex justify-center items-center"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.8, 
                type: "spring", 
                stiffness: 100 
              }}
              >
                {/* Using relative path */}
                <img 
                  src={new URL('../ChatGPT Image May 6, 2025, 01_43_15 AM.png', import.meta.url).href}
                  alt="Alumni Group"
                  className="w-auto h-auto max-w-full max-h-[400px] object-contain rounded-lg shadow-lg"
                  style={{ display: 'block' }}
              />
            </motion.div>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <a 
              href="#about" 
              className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-hetero transition-colors group"
            >
              <span className="text-sm font-medium mb-1 group-hover:text-hetero transition-colors">Scroll Down</span>
              <motion.svg 
                className="w-6 h-6 text-hetero"
                whileHover={{ scale: 1.2 }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </motion.svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
