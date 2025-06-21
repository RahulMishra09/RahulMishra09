import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaHackerrank, FaFilePdf } from "react-icons/fa";
import { SiKaggle, SiLeetcode } from "react-icons/si";

function Header() {
  const name = "RAHUL MISHRA".split(""); // Split name into individual letters

  return (
    <header className="bg-dark-background py-4 shadow-lg backdrop-blur-md border-b border-gray-700">
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Letter-by-letter Reveal Animation */}
        <motion.h1 
          className="text-4xl font-extrabold text-white relative"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } } 
          }}
        >
          {name.map((letter, index) => (
            <motion.span
              key={index}
              className="text-orange-400"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Social Icons + Resume */}
        <div className="flex space-x-6 items-center">
          {/* Social Links */}
          {[
            { href: "https://www.linkedin.com/in/rahul-mishra-a2a5ba253/", icon: <FaLinkedin size={24} />, title: "LinkedIn" },
            { href: "https://github.com/RahulMishra09", icon: <FaGithub size={24} />, title: "GitHub" },
            { href: "https://www.hackerrank.com/profile/rahulchh07", icon: <FaHackerrank size={24} />, title: "HackerRank" },
            { href: "https://www.kaggle.com/rahulmishra09", icon: <SiKaggle size={24} />, title: "Kaggle" },
            { href: "https://leetcode.com/u/RahulMishra0008/", icon: <SiLeetcode size={24} />, title: "LeetCode" },
            { href: "https://drive.google.com/file/d/161wJCwHIExAJKlwgnCfmJluF5ffWFNbk/view?usp=sharing", icon: <FaFilePdf size={28} />, title: "Resume" } // Resume integrated into social links
          ].map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-orange-400 transition-all duration-300"
              title={link.title}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
