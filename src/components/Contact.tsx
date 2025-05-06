import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from './AnimatedSection';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const contactDetails = [
    {
      icon: <Mail className="h-6 w-6 text-hetero" />,
      title: "Email",
      content: "alumni@hetero.com",
      link: "mailto:alumni@hetero.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-hetero" />,
      title: "Phone",
      content: "+91 40 2348 2100",
      link: "tel:+914023482100"
    },
    {
      icon: <User className="h-6 w-6 text-hetero" />,
      title: "Event Coordinator",
      content: "Dr. Anand Sharma",
      link: "tel:+919876543210"
    },
    {
      icon: <MapPin className="h-6 w-6 text-hetero" />,
      title: "Headquarters",
      content: "Hetero Corporate, Hyderabad",
      link: "https://goo.gl/maps/your-location-link"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - would connect to a backend API in a real app
    console.log("Form submitted:", formData);
    alert("Message sent! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="py-12 relative overflow-hidden">
      {/* Background wave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <motion.path 
            fill="#ea384c" 
            d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,154.7C672,128,768,96,864,90.7C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{ pathLength: 1, pathOffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.path>
        </svg>
      </div>

      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Contact Us</h2>
      </AnimatedSection>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref={contactRef}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            >
              <Card className="h-full border border-gray-200 dark:border-gray-700 rounded-lg bg-background/95">
                <CardContent className="p-4 sm:p-6">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    Get in Touch
                  </motion.h3>
                  
                  <motion.div 
                    className="space-y-6 sm:space-y-8"
                    variants={listVariants}
                    initial="hidden"
                    animate={contactInView ? "visible" : "hidden"}
                  >
                    {contactDetails.map((item, index) => (
                      <motion.a 
                        key={index}
                        href={item.link}
                        className="flex items-start hover:text-hetero transition-colors group"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className="mt-1 mr-4 transition-transform"
                          whileHover={{ rotate: 15 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-gray-700 dark:text-gray-300 group-hover:text-hetero transition-colors">
                            {item.content}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <h4 className="font-semibold mb-2">Social Media</h4>
                    <div className="flex space-x-4">
                      {/* Social media icons with hover animations */}
                      {['F', 'T', 'L', 'I'].map((letter, i) => (
                        <motion.div
                          key={i}
                          className="w-10 h-10 rounded-full bg-hetero flex items-center justify-center text-white cursor-pointer"
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                        >
                          {letter}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div ref={formRef}>
            <motion.div
              variants={contactVariants}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              <Card className="border border-gray-200 dark:border-gray-700 rounded-lg bg-background/95">
                <CardContent className="p-4 sm:p-6">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    Send a Message
                  </motion.h3>
                  
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <motion.div
                      custom={1}
                      variants={formItemVariants}
                      initial="hidden"
                      animate={formInView ? "visible" : "hidden"}
                    >
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-hetero focus:border-hetero transition bg-white/50 dark:bg-gray-800/50"
                        placeholder="John Doe"
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={2}
                      variants={formItemVariants}
                      initial="hidden"
                      animate={formInView ? "visible" : "hidden"}
                    >
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-hetero focus:border-hetero transition bg-white/50 dark:bg-gray-800/50"
                        placeholder="john@example.com"
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={3}
                      variants={formItemVariants}
                      initial="hidden"
                      animate={formInView ? "visible" : "hidden"}
                    >
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-hetero focus:border-hetero transition bg-white/50 dark:bg-gray-800/50"
                        placeholder="Query about the alumni event"
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      custom={4}
                      variants={formItemVariants}
                      initial="hidden"
                      animate={formInView ? "visible" : "hidden"}
                    >
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-hetero focus:border-hetero transition bg-white/50 dark:bg-gray-800/50"
                        placeholder="Your message here..."
                        required
                      ></textarea>
                    </motion.div>
                    
                    <motion.button 
                      type="submit"
                      className="w-full px-4 py-2 bg-hetero text-white rounded-md hover:bg-hetero-dark transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      custom={5}
                      variants={formItemVariants}
                      initial="hidden"
                      animate={formInView ? "visible" : "hidden"}
                    >
                      Send Message
                    </motion.button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
