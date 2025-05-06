
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from './AnimatedSection';

const Registration: React.FC = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [yearsWorked, setYearsWorked] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // In a real app, this would be an API call to verify alumni status
  const checkAlumniStatus = (email: string, mobile: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, let's assume these are valid credentials
        const validEmails = ["alumni@hetero.com", "test@example.com"];
        const validMobiles = ["9876543210", "1234567890"];
        
        resolve(validEmails.includes(email) || validMobiles.includes(mobile));
      }, 1500);
    });
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !mobile) {
      toast.error("Please enter either email or mobile number");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const isVerified = await checkAlumniStatus(email, mobile);
      
      if (isVerified) {
        toast.success("Verification successful!");
        setStep(2);
      } else {
        toast.error("Verification failed. Please contact the organizers if you believe this is an error.");
      }
    } catch (error) {
      toast.error("An error occurred during verification.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to register
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registration successful! Check your email and WhatsApp for confirmation.");
      
      // In a real app, we would redirect to a confirmation page
      // or show a modal with confirmation details
      
      // For demo purposes, let's set the user as logged in
      localStorage.setItem("isLoggedIn", "true");
      
      // Reset form
      setEmail("");
      setMobile("");
      setFullName("");
      setDepartment("");
      setYearsWorked("");
      setStep(1);
    }, 2000);
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full opacity-5" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            fill="#ea384c" 
            fillOpacity="1" 
            d="M0,224L60,218.7C120,213,240,203,360,176C480,149,600,107,720,106.7C840,107,960,149,1080,181.3C1200,213,1320,235,1380,245.3L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={inView ? { pathLength: 1, pathOffset: 0 } : { pathLength: 0, pathOffset: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.path>
        </svg>
        
        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-hetero/10"
            style={{
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gradient">
          Register for the Reunion
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-12 text-gray-700 dark:text-gray-300">
          Join your former colleagues for an unforgettable day of reconnecting and celebrating our shared legacy. 
          Complete the registration below to secure your spot.
        </p>
      </AnimatedSection>
      
      <div ref={ref} className="container mx-auto px-4 max-w-md">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
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
          }}
        >
          <Card className="glass-card border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                <motion.span
                  className="text-gradient inline-block"
                  initial={{ backgroundPosition: "200% 0%" }}
                  animate={{ backgroundPosition: "0% 0%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  {step === 1 ? "Alumni Verification" : "Complete Registration"}
                </motion.span>
              </CardTitle>
              <CardDescription className="text-center">
                {step === 1 
                  ? "Please verify your alumni status with your email or mobile number" 
                  : "Complete your registration details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <motion.form 
                  onSubmit={handleVerify} 
                  className="space-y-4"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="text-center text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    - OR -
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="mobile" className="block text-sm font-medium mb-1">
                      Mobile Number
                    </label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button 
                        type="submit" 
                        className="w-full bg-hetero hover:bg-hetero-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <motion.div 
                            className="flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </motion.div>
                        ) : "Verify Alumni Status"}
                      </Button>
                    </motion.div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-center text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Having trouble? Contact us at <a href="mailto:alumni@hetero.com" className="text-hetero hover:underline">alumni@hetero.com</a>
                  </motion.p>
                </motion.form>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="department" className="block text-sm font-medium mb-1">
                      Department/Team You Worked In
                    </label>
                    <Input
                      id="department"
                      placeholder="e.g., R&D, Manufacturing, HR"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                      className="w-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="yearsWorked" className="block text-sm font-medium mb-1">
                      Years at Hetero
                    </label>
                    <Input
                      id="yearsWorked"
                      placeholder="e.g., 2010-2018"
                      value={yearsWorked}
                      onChange={(e) => setYearsWorked(e.target.value)}
                      required
                      className="w-full"
                    />
                  </motion.div>
                  
                  {/* This would display the email or mobile they entered in step 1 */}
                  <motion.div 
                    className="pt-2 pb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Registering with: <span className="font-medium">{email || mobile}</span>
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button 
                        type="submit" 
                        className="w-full bg-hetero hover:bg-hetero-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <motion.div 
                            className="flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </motion.div>
                        ) : "Complete Registration"}
                      </Button>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full"
                        onClick={() => setStep(1)}
                        disabled={isLoading}
                      >
                        Back to Verification
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
