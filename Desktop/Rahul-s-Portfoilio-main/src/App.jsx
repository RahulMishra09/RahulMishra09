import React from 'react';
    import Header from './components/Header';
    import HeroSection from './components/HeroSection';
    import SkillsSection from './components/SkillsSection';
    import ExperienceSection from './components/ExperienceSection';
    import EducationSection from './components/EducationSection';
    import ProjectsSection from './components/ProjectsSection';
    import ContactSection from './components/ContactSection';
    import Footer from './components/Footer';

    function App() {
      return (
        <div className="font-sans">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <HeroSection />
            <SkillsSection />
            <ExperienceSection />
            <EducationSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      );
    }

    export default App;
