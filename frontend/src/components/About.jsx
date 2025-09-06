import React from 'react';
import useScrollFadeObserver from '../hooks/useScrollFadeObserver';

// Professional SVG Icons
const Code = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6"></polyline>
    <polyline points="8,6 2,12 8,18"></polyline>
  </svg>
);

const Database = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const Brain = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 3 3v1a3 3 0 0 0 3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0 3-3v-1a3 3 0 0 0 3-3 3 3 0 0 0-3-3V8a3 3 0 0 0-3-3 3 3 0 0 0-3-3z"></path>
  </svg>
);

const Award = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"></polyline>
  </svg>
);

const Eye = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const About = () => {
  const [ref, isVisible] = useScrollFadeObserver();
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "Built multiple web applications using MERN stack, React.js, and modern JavaScript"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Machine Learning Projects",
      description: "Developed ML models for sentiment analysis and gesture recognition with strong accuracy"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Automation & Testing",
      description: "Selenium WebDriver frameworks, AI workflow automation with n8n, AWS cloud services"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Academic Excellence",
      description: "8.84 CGPA, published research, Microsoft Azure certified, active learner"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`scroll-fade-section ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              About Me
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Final-year M.Tech student with hands-on experience in full-stack development and machine learning
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4 md:space-y-6 px-4 sm:px-0">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-left">
                I'm Nitish B, a final-year M.Tech student in Software Engineering at VIT University with a strong foundation in full-stack development, AI/ML, and automation testing. Through academic projects and personal initiatives, I've built several web applications using the MERN stack, developed ML models for real-world problems, implemented AI-powered automation workflows, and gained hands-on experience with cloud technologies like AWS.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-left">
                My journey includes contributing to published research in machine learning, earning Microsoft Azure certification, and creating automated testing frameworks using Selenium WebDriver. I've also worked with AI integration tools like n8n for intelligent workflow automation and developed NLP systems for sentiment analysis. I'm passionate about writing clean, efficient code and building applications that make a difference. Currently seeking opportunities to apply my skills in a professional environment and continue growing as a software engineer.
              </p>

              {/* Call-to-Action Section */}
              <div className="mt-8 space-y-4">
                <a
                  href="https://firebasestorage.googleapis.com/v0/b/portfolio-nitishb.appspot.com/o/Nitish_Resume_SoftwareEngineer.pdf?alt=media&token=6bb5c840-9af6-460e-8ff4-f52cfa3e3704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium button-hover shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Resume</span>
                </a>
                
                {/* Availability Status */}
                <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">Available for opportunities</span> • Full-time from June 2026 • Open to internships
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-400 shadow-sm border border-gray-200"
                >
                  <div className="text-blue-600 mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;