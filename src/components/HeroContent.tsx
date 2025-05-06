import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';

// Define or import the hero image URL
const heroImageUrl = new URL('../ChatGPT Image May 6, 2025, 01_43_15 AM.png', import.meta.url).href;

interface HeroContentProps {
  // We'll add props later to control animation based on scroll
}

const HeroContent: React.FC<HeroContentProps> = () => {
  // Initial visibility state for entry animations
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    // Trigger entry animations shortly after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Restore outer container structure
    <div className="container mx-auto px-4 z-10 pb-16 w-full h-full flex items-end">
      {/* Restore grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center lg:items-end w-full">
        {/* Left Column: Text Content (Order 2 on mobile) */}
        <div className={`order-2 lg:order-1 lg:text-left space-y-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-snug"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-hetero via-hetero-light to-hetero"
              // Keep gradient animation simple for now
            >
              Hetero
            </motion.span>
            <br />
            <motion.span 
              className="text-gray-900 dark:text-white"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            >
              Alumni Connect
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          >
            Reuniting the people who built a pharmaceutical powerhouse
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          >
             <motion.div 
               whileHover={{ scale: 1.05 }} 
               whileTap={{ scale: 0.98 }}
               className="w-full sm:w-auto"
             >
               <Button 
                 className="bg-hetero hover:bg-hetero-dark w-full sm:w-auto text-white text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 shadow-lg shadow-hetero/20 hover:shadow-hetero/40 transition-all duration-300"
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
                 className="w-full sm:w-auto border-hetero text-hetero hover:bg-hetero/10 hover:border-hetero-dark text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 transition-all duration-300"
               >
                 Event Details
               </Button>
             </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-6 md:space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
          >
            {/* Date/Location Blocks */}
             <motion.div 
               className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-2 px-4 sm:p-3 sm:px-5 rounded-xl shadow-lg"
               whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(234, 56, 76, 0.3)" }}
               transition={{ duration: 0.2 }}
             >
               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-hetero to-hetero-dark bg-clip-text text-transparent">OCT</h3>
               <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">15, 2025</p>
             </motion.div>
             <div className="h-10 sm:h-12 w-px bg-gradient-to-b from-transparent via-hetero/30 to-transparent"></div>
             <motion.div 
               className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-2 px-4 sm:p-3 sm:px-5 rounded-xl shadow-lg"
               whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(234, 56, 76, 0.3)" }}
               transition={{ duration: 0.2 }}
             >
               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-hetero to-hetero-dark bg-clip-text text-transparent">09<span className="text-sm sm:text-base md:text-lg">AM</span></h3>
               <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">Hyderabad</p>
             </motion.div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            className="pt-8 flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }} 
          >
            <CountdownTimer /> 
          </motion.div>
        </div>
        
        {/* Right Column: Image Area (Order 1 on mobile, Static on Mobile, Placeholder for LG) */}
        <div className={`order-1 lg:order-2 flex justify-center items-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
           {/* Static Image for Mobile Only */}
           <img 
             src={heroImageUrl} 
             alt="Hero Illustration" 
             className="block lg:hidden w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto mb-8 object-contain"
           />
           {/* This div is effectively empty on large screens, allowing ImageMorphAnimator to place the image */}
        </div>
      </div>
    </div>
  );
};

export default HeroContent; 