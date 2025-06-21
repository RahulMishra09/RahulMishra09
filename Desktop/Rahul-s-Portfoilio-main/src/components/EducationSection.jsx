import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaDatabase, FaNetworkWired, FaCogs, FaBrain } from 'react-icons/fa';

function EducationSection() {
  const skills = [
    { name: "Data Structures & Algorithms", icon: <FaLaptopCode />, color: "#FF6B6B" },
    { name: "Object-Oriented Programming", icon: <FaCogs />, color: "#4ECDC4" },
    { name: "Database Management Systems", icon: <FaDatabase />, color: "#45B7D1" },
    { name: "Computer Network", icon: <FaNetworkWired />, color: "#96CEB4" },
    { name: "Operating Systems", icon: <FaCogs />, color: "#D4A5A5" },
    { name: "Machine Learning", icon: <FaBrain />, color: "#9B89B3" }
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-dark-background section-glow-on-hover relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-batman-yellow/5 rounded-full blur-3xl"></div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-12 text-primary-orange text-center flex items-center"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          
        </motion.div>
        Education 
      </motion.h2>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="p-8 rounded-xl shadow-lg bg-black border border-primary-orange/30 hover:shadow-batman-yellow/20 transition-all duration-300 relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-batman-yellow/5"></div>

        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-primary-orange mb-2 relative">
            B.Tech CSE (Hons.) - IoT & Intelligent Systems
            <span className="absolute -left-4 top-1/2 w-2 h-8 bg-primary-orange transform -translate-y-1/2 rounded-full"></span>
          </h3>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-gray-300">Manipal University Jaipur</span>
            <span className="text-gray-500">•</span>
            <motion.span 
              className="text-batman-yellow font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              2022 - 2026
            </motion.span>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 text-gray-300 bg-black p-4 rounded-lg border border-primary-orange/20 hover:border-batman-yellow/50 transition-all duration-300 group relative"
            >
              <motion.span 
                className="text-primary-orange text-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {skill.icon}
              </motion.span>
              <span className="group-hover:text-batman-yellow transition-colors">
                {skill.name}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-orange/5 to-transparent -z-10 group-hover:via-batman-yellow/5 transition-all duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default EducationSection;