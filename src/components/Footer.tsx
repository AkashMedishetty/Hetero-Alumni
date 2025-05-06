import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <img 
              src="/purplehat_logo_white_ultra.png" 
              alt="PurpleHat Tech Logo" 
              className="h-8 sm:h-10 md:h-12 w-auto mr-auto opacity-90 ml-[-10px] sm:ml-[-15px] md:ml-[-20px] dark:brightness-100 brightness-75"
            />
            <div className="mt-[-5px] sm:mt-[-8px] md:mt-[-10px]">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Developed by PurpleHat Tech
              </p>
              <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1 mt-1">
                <a href="tel:9705700976" className="flex items-center gap-2 hover:text-hetero transition-colors">
                  9705700976
                </a>
                <a href="mailto:hello@purplehatevents.in" className="flex items-center gap-2 hover:text-hetero transition-colors">
                  hello@purplehatevents.in
                </a>
                <a 
                  href="https://purplehatevents.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-hetero transition-colors"
                 >
                  purplehatevents.in
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-700 dark:text-gray-300 hover:text-hetero transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-hetero transition-colors">About Event</a>
              </li>
              <li>
                <a href="#timeline" className="text-gray-700 dark:text-gray-300 hover:text-hetero transition-colors">Event Timeline</a>
              </li>
              <li>
                <a href="#register" className="text-gray-700 dark:text-gray-300 hover:text-hetero transition-colors">Register</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-700 dark:text-gray-300">
                Hetero Corporate Office
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                Hyderabad, Telangana, India
              </li>
              <li>
                <a href="mailto:alumni@hetero.com" className="text-gray-700 dark:text-gray-300 hover:text-hetero transition-colors">
                  alumni@hetero.com
                </a>
              </li>
              <li>
                <a href="tel:+914023482100" className="text-gray-700 dark:text-gray-300 hover:text-hetero transition-colors">
                  +91 40 2348 2100
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-hetero flex items-center justify-center text-white">
                F
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-hetero flex items-center justify-center text-white">
                T
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-hetero flex items-center justify-center text-white">
                L
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-hetero flex items-center justify-center text-white">
                I
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-700 dark:text-gray-300">
          <p>© {new Date().getFullYear()} Hetero Alumni Event. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
