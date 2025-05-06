import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Timeline", href: "#timeline" },
    { name: "Committee", href: "#committee" },
    { name: "Venue", href: "#venue" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-2 sm:top-4 md:top-6 inset-x-0 mx-auto w-full max-w-4xl z-50`}
      animate={{ y: headerVisible ? 0 : -120 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg rounded-full border border-white/20 dark:border-gray-700/50">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-hetero dark:text-white">
              Hetero<span className="text-black dark:text-hetero">Alumni</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-700 hover:text-hetero font-medium dark:text-gray-300 dark:hover:text-hetero transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          <Button
            variant="default"
            className="bg-hetero hover:bg-hetero-dark text-white hidden md:block"
          >
            Register Now
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg mt-2 rounded-lg overflow-hidden">
          <div className="px-3 sm:px-4 md:px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-hetero font-medium dark:text-gray-300 dark:hover:text-hetero"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="default"
              className="bg-hetero hover:bg-hetero-dark text-white w-full mt-4"
            >
              Register Now
            </Button>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
