import React, { useState, useEffect } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import ParticleBackground from "./ParticleBackground";

// Typewriter Effect Component
const TypewriterEffect = ({ roles }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentRole.length) {
            setCurrentText(currentRole.substring(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-blue-600 mr-2 font-bold">❯</span>
      <span className="min-w-0">{currentText}</span>
    </span>
  );
};

// Import images
import heroImage from "../images/Hero.png";

// Simple SVG Icons
const ChevronDown = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const Github = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Mail = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="m4 4 16 0 0 16-16 0z"></path>
    <path d="m4 4 8 8 8-8"></path>
  </svg>
);

const Hero = ({ roles, scrollToSection }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollArrow(scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-20 sm:pt-24 md:pt-16 overflow-hidden"
    >
      {/* Animated Particle Background */}
      <ParticleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-0 relative z-10">
        <div
          ref={ref}
          className={`fade-in-section ${isVisible ? "visible" : ""}`}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Profile Image (first in mobile) */}
            <div className="order-1 lg:order-1 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl">
                  <img
                    src={heroImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 hidden items-center justify-center text-white text-3xl sm:text-4xl lg:text-6xl font-bold">
                    NB
                  </div>
                </div>
              </div>
            </div>

            {/* Content (second in mobile) */}
            <div className="order-2 lg:order-2 text-center lg:text-left space-y-6 lg:space-y-8">
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block text-gray-900">Hi, I'm</span>
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Nitish B
                  </span>
                </h1>

                <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 flex items-center justify-center lg:justify-start">
                  <TypewriterEffect roles={roles} />
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-4 lg:px-0">
                Software Engineer building intelligent workflows, full-stack web
                applications, and AI-powered solutions.
              </p>

              <div className="flex justify-center lg:justify-start space-x-4 sm:space-x-6">
                <a
                  href="https://github.com/nitishb-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-gray-200 hover:bg-gray-300 rounded-full icon-hover text-gray-700"
                >
                  <Github size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/nitishb-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-gray-200 hover:bg-gray-300 rounded-full icon-hover text-gray-700"
                >
                  <Linkedin size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="mailto:nitishb057@gmail.com"
                  className="p-2 sm:p-3 bg-gray-200 hover:bg-gray-300 rounded-full icon-hover text-gray-700"
                >
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium button-hover text-sm sm:text-base"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 sm:px-8 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium button-hover text-sm sm:text-base"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showScrollArrow && (
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-300"
        >
          <ChevronDown size={24} className="sm:w-8 sm:h-8 text-gray-500" />
        </button>
      )}
    </section>
  );
};

export default Hero;
