import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Publications from "./components/Publications";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI & ML Enthusiast",
  "Automation & Testing Engineer",
  "Problem Solver"
];

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'publications', 'education', 'certifications', 'contact'];
      const navbarHeight = 64;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollTop + windowHeight / 2;

      // Special case for hero section (when at the very top)
      if (scrollTop < 50) {
        setActiveSection('hero');
        return;
      }

      let currentSection = 'hero';
      let minDistance = Infinity;

      // Find the section whose center is closest to the viewport center
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;
          const elementHeight = rect.height;
          const elementCenter = elementTop + elementHeight / 2;

          // Calculate distance from viewport center to element center
          const distance = Math.abs(viewportCenter - elementCenter);

          // Also check if the section is actually visible in the viewport
          const isVisible = rect.top < windowHeight && rect.bottom > navbarHeight;

          if (isVisible && distance < minDistance) {
            minDistance = distance;
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Initial call
    handleScroll();

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Height of the fixed navbar
      let elementPosition;

      // For hero section, scroll to top
      if (sectionId === 'hero') {
        elementPosition = 0;
      } else {
        elementPosition = element.offsetTop - navbarHeight;
      }

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 text-gray-900 overflow-x-hidden">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <Hero
          roles={roles}
          currentRole={currentRole}
          scrollToSection={scrollToSection}
        />
        <About />
        <Skills />
        <Projects />
        <Publications />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;