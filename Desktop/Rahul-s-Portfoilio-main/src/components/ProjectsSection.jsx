import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectsSection() {
  const projects = [
    { 
      title: 'Online Conference System', 
      description: 'An Online Conference System enables virtual meetings and events.',
      link: 'https://github.com/RahulMishra09/Online_Conference_System',
      tech: ['React', 'Node.js', 'WebRTC']
    },
    { 
      title: 'Zerodha Clone', 
      description: 'A Zerodha Clone is a stock trading platform with Zerodha-like features',
      link: 'https://github.com/RahulMishra09/Zerodha_clone',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    { 
      title: 'Fire Detection', 
      description: 'Fire Detection identifies fire or smoke for early warning and safety.',
      link: 'https://github.com/RahulMishra09/Fire_Detection_System?tab=readme-ov-file',
      tech: ['Python', 'Yolo V8', 'Pytouch']
    },
    { 
      title: 'Student Management System', 
      description: 'A Student Management System manages student data and administration.',
      link: 'https://github.com/RahulMishra09/Student_Management_System',
      tech: ['Python', 'Tkinter', 'MySQL']
    },
  ];

  return (
    <section className="py-16 section-glow-on-hover">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-12 text-primary-orange"
      >
      Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="project-card bg-black rounded-xl p-6 shadow-lg hover:shadow-batman-yellow/20 transition-all duration-300 border border-primary-orange/30"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-primary-orange">{project.title}</h3>
              <div className="flex gap-2">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-batman-yellow transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-batman-yellow transition-colors"
                >
                  <FaExternalLinkAlt size={20} />
                </a>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 bg-black rounded-full text-sm text-batman-yellow border border-primary-orange/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
