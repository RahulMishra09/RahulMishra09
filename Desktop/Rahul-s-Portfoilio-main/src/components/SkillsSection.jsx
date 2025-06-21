import React from 'react';

function SkillsSection() {
  return (
    <section className="py-6 section-glow-on-hover">
      <h2 className="text-3xl font-bold mb-4 text-primary-orange">Skills & Expertise</h2>
      <ul className="text-lg space-y-2 text-gray-300">
        <li className="bg-dark-background p-3 rounded-md shadow-md">
          <span className="text-primary-orange font-semibold">Programming Languages:</span> Python, Java, C++, C, TypeScript, JavaScript
        </li>
       {/* <li className="bg-dark-background p-3 rounded-md shadow-md">
          <span className="text-primary-orange font-semibold">Machine Learning & AI:</span> 
          PyTorch, TensorFlow, NumPy, Pandas, OpenCV, Scikit-learn
        </li>*/}
        <li className="bg-dark-background p-3 rounded-md shadow-md">
          <span className="text-primary-orange font-semibold">Web Development:</span> React.js, Next.js, Node.js, Express.js, {/*Flask, Django*/}
        </li>
        <li className="bg-dark-background p-3 rounded-md shadow-md">
          <span className="text-primary-orange font-semibold">Frontend Technologies:</span> HTML, CSS, Sass, Tailwind CSS, Material UI, Bootstrap
        </li>
        <li className="bg-dark-background p-3 rounded-md shadow-md">
          <span className="text-primary-orange font-semibold">Backend & Databases:</span> MongoDB, PostgreSQL, Firebase, MySQL
        </li>
        {/*  <li className="bg-dark-background p-3 rounded-md shadow-md">
          <span className="text-primary-orange font-semibold">Cloud & DevOps:</span> 
          
          AWS, GCP, Docker, Kubernetes, Linux, CI/CD
        </li>*/}
        <li className="bg-dark-background p-3 rounded-md shadow-md">
          <span className="text-primary-orange font-semibold">Tools & Version Control:</span> Git, GitHub, VS Code, Postman, Jupyter Notebook
        </li>
      </ul>
    </section>
  );
}

export default SkillsSection;
