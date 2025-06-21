import React from 'react';

function ResumeLogo() {
  return (
    <a 
      href="/public/resume.pdf" 
      download="RahulMishra_Resume.pdf" 
      aria-label="Download Resume"
    >
      <img 
        src="https://via.placeholder.com/50" 
        alt="Rahul Mishra's Resume" 
        className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
        style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
      />
    </a>
  );
}

export default ResumeLogo;
