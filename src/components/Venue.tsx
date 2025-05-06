import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Clock } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from './AnimatedSection';

const Venue: React.FC = () => {
  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  const [detailsRef, detailsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="py-12 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-hetero/10 filter blur-3xl"
          style={{ top: '30%', left: '5%' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-80 h-80 rounded-full bg-hetero/5 filter blur-3xl"
          style={{ bottom: '10%', right: '5%' }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
        />
      </div>

      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Event Venue</h2>
      </AnimatedSection>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref={detailsRef}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            >
              <Card className="h-full border border-gray-200 dark:border-gray-700 rounded-lg bg-background/95 transform transition-all duration-500 hover:shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Venue Details
                  </motion.h3>
                  
                  <motion.div 
                    className="space-y-6"
                    variants={listVariants}
                    initial="hidden"
                    animate={detailsInView ? "visible" : "hidden"}
                  >
                    <motion.div 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <MapPin className="text-hetero mr-3 h-6 w-6 shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Address</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Hetero Convention Center<br />
                          Plot No. 22-110, Block III<br />
                          Hyderabad, Telangana 500034<br />
                          India
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <Calendar className="text-hetero mr-3 h-6 w-6 shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Date</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Saturday, October 15, 2025
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <Clock className="text-hetero mr-3 h-6 w-6 shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Time</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          09:00 AM to 09:00 PM
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <h4 className="font-semibold mb-2">Getting There</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      The venue is conveniently located 15 minutes from the Rajiv Gandhi International Airport and 
                      20 minutes from Hyderabad city center.
                    </p>
                    <motion.ul 
                      className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300"
                      variants={listVariants}
                      initial="hidden"
                      animate={detailsInView ? "visible" : "hidden"}
                      transition={{ delayChildren: 1.4 }}
                    >
                      <motion.li variants={itemVariants}>Free parking available on premises</motion.li>
                      <motion.li variants={itemVariants}>Shuttle service from major hotels</motion.li>
                      <motion.li variants={itemVariants}>Accessible by public transportation</motion.li>
                    </motion.ul>
                  </motion.div>
                  
                  <motion.button 
                    className="mt-6 px-4 py-2 bg-hetero text-white rounded-md hover:bg-hetero-dark transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={detailsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                  >
                    Get Directions
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div ref={mapRef} className="relative h-64 sm:h-96 md:h-full rounded-lg overflow-hidden">
            {/* Interactive Map Component - this would be replaced by a real map */}
            <motion.div 
              className="absolute inset-0 bg-gray-300 dark:bg-gray-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={mapInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
            >
              <div className="h-full w-full relative overflow-hidden">
                {/* Map grid lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                  {[...Array(36)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="border border-gray-400/20 dark:border-gray-600/20"
                      initial={{ opacity: 0 }}
                      animate={mapInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.5 }}
                    />
                  ))}
                </div>
                
                {/* Map location pin */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ y: -50, opacity: 0 }}
                  animate={mapInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 100 }}
                >
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="w-12 h-12 bg-hetero rounded-full flex items-center justify-center shadow-lg shadow-hetero/30"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    >
                      <MapPin className="h-6 w-6 text-white" />
                    </motion.div>
                    <motion.div 
                      className="mt-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-1 shadow-md"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={mapInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <p className="text-sm font-medium">Hetero Convention Center</p>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Map decorative elements */}
                <motion.div 
                  className="absolute bottom-5 right-5 text-hetero italic text-sm"
                  initial={{ opacity: 0 }}
                  animate={mapInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 2 }}
                >
                  Interactive map loading...
                </motion.div>
                
                {/* Concentric circles around pin */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full border border-hetero/30"
                  style={{ transform: 'translate(-50%, -50%)' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={mapInView ? 
                    { scale: [0, 2, 3, 4], opacity: [0, 0.3, 0.2, 0] } : 
                    { scale: 0, opacity: 0 }
                  }
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Venue;
