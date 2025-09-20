import React from "react";
import useScrollFadeObserver from "../hooks/useScrollFadeObserver";

// Import images
import nlpImage from "../images/nlpprjLSTM.jpg";
import airesumehelper from "../images/airesumehelper.png";
import cricketManagementImage from "../images/cricketManagementImage.png";
import twitterImage from "../images/twitterQuoteAutomation.jpg";
import powerBIImage from "../images/powerbi.png";
import todoImage from "../images/Todo.jpg";
import seleniumImage from "../images/TestingPrj.png";

// Clean SVG Icons
const ExternalLink = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15,3 21,3 21,9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const Github = ({ size = 16, className = "" }) => (
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

const FileText = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14,2 14,8 20,8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10,9 9,9 8,9"></polyline>
  </svg>
);

const Play = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <polygon points="5,3 19,12 5,21"></polygon>
  </svg>
);

const Projects = () => {
  const [ref, isVisible] = useScrollFadeObserver();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState(null);
  const [touchEnd, setTouchEnd] = React.useState(null);

  const projects = [
    {
      title: "AI Resume Helper",
      description:
        "Built an AI-powered resume analyzer that compares resumes against job descriptions. Built with React, TypeScript & N8N workflows. Get match scores, keyword suggestions & improvement tips. Upload resume as PDF & paste text of JD for instant analysis.",
      image: airesumehelper,
      technologies: [
        "n8n",
        "JavaScript",
        "Gemini API",
        "ReactJS",
        "TailwindCSS",
        "Text Extraction",
        "AI Autoamtion",
      ],
      type: "AI", //
      githubUrl: "https://github.com/nitishb-dev/AI-Resume-Helper.git",
      featured: true,
    },
    {
      title: "Cricket Management",
      description:
        "A full-stack dynamic Cricket Web Application that manages cricket matches, dynamic teams, player statistics, and match history.",
      image: cricketManagementImage,
      technologies: [
        "ReactJS",
        "TypeScript",
        "NodeJS",
        "Express",
        "MySQL",
      ],
      type: "Web Developement", //
      githubUrl: "https://github.com/nitishb-dev/Cricket-Management.git",
      featured: true,
    },
    {
      title: "NLP Sentiment Classifier with LSTM",
      description:
        "Built an LSTM-based model using Keras to classify 50,000 IMDB reviews with 88% accuracy. Applied advanced NLP techniques on Kaggle dataset using Python.",
      image: nlpImage,
      technologies: [
        "Python",
        "TensorFlow",
        "Keras",
        "NLP",
        "Google Colab",
        "Scikit-learn",
      ],
      type: "ml", // Machine Learning project
      githubUrl: "https://github.com/nitishb-dev/IMDB_SENTIMENT-ANALYSIS.git",
      featured: true,
    },
    {
      title: "AI-Based Twitter Quote Automation",
      description:
        "Automated daily motivational quote posts on Twitter using n8n, OpenAI, and Google Sheets with image support, cron scheduling, and duplicate detection.",
      image: twitterImage,
      technologies: [
        "n8n",
        "OpenAI API",
        "Twitter API",
        "Google Sheets API",
        "JavaScript",
        "Cron Jobs",
      ],
      type: "report", // Report project with PDF documentation
      confidential: true, // Mark as confidential - no public documentation available
      featured: true,
    },
    {
      title: "Sales Dashboard using Power BI",
      description:
        "Created an interactive dashboard to analyze Superstore sales (15.6L+ revenue, ₹1.75L profit). Used DAX for KPIs, trend analysis, and segment-wise insights.",
      image: powerBIImage,
      technologies: ["Power BI", "DAX", "Power Query", "Data Visualization"],
      type: "report", // Report project
      reportUrl:
        "https://drive.google.com/file/d/1HWQg_Onf5e1BrLbyd0cAy68hzoM7iSAd/view?usp=drive_link",
      featured: true,
    },
    {
      title: "Cloud-Native Todo App with AWS & React",
      description:
        "Developed a serverless Todo app with React.js (Vercel) frontend, AWS Lambda (Python) backend, and MySQL (RDS). Enabled secure CRUD operations and scalable deployment.",
      image: todoImage,
      technologies: [
        "React.js",
        "AWS Lambda",
        "API Gateway",
        "MySQL",
        "Vercel",
        "Python",
      ],
      type: "concept", // Concept project (no live demo or code)
      githubUrl: "https://github.com/nitishb-dev/REACT_TODO_LIST.git",
      featured: true,
    },
    {
      title: "Amazon Test Automation with Selenium",
      description:
        "Automated login, search, and checkout flows on Amazon using Selenium WebDriver with Java and TestNG. Ensured functional testing and regression coverage.",
      image: seleniumImage,
      technologies: ["Selenium", "Java", "TestNG", "ChromeDriver"],
      type: "testing", // Testing project
      githubUrl: "https://github.com/nitishb-dev/Amazon_AutomationTesting.git",
      featured: false,
    },
  ];

  // Function to get appropriate button configuration based on project type
  const getProjectButtons = (project) => {
    const buttons = [];

    // Handle confidential projects
    if (project.confidential) {
      buttons.push({
        href: "#",
        icon: <FileText size={16} />,
        text: "Details Confidential",
        className:
          "bg-amber-100 text-amber-800 cursor-not-allowed border border-amber-200",
        disabled: true,
      });
      return buttons;
    }

    // Add GitHub button only if available
    if (project.githubUrl) {
      buttons.push({
        href: project.githubUrl,
        icon: <Github size={16} />,
        text: "View Code",
        className: "bg-gray-800 hover:bg-gray-900 text-white",
      });
    }

    // Add primary button based on project type and availability
    if (project.type === "web" && project.liveUrl) {
      buttons.unshift({
        href: project.liveUrl,
        icon: <ExternalLink size={16} />,
        text: "Live Demo",
        className: "bg-blue-600 hover:bg-blue-700 text-white",
      });
    } else if (project.type === "report" && project.reportUrl) {
      buttons.unshift({
        href: project.reportUrl,
        icon: <FileText size={16} />,
        text: "View Report",
        className: "bg-green-600 hover:bg-green-700 text-white",
      });
    }

    // If no buttons available, show a disabled state
    if (buttons.length === 0) {
      buttons.push({
        href: "#",
        icon: <FileText size={16} />,
        text: "Project Details",
        className: "bg-gray-400 cursor-not-allowed text-white",
        disabled: true,
      });
    }

    return buttons;
  };

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play carousel
  React.useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`scroll-fade-section ${isVisible ? "visible" : ""}`}
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              A showcase of my recent work and development projects
            </p>
          </div>

          {/* Desktop/Tablet Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Project Image with Enhanced Overlay */}
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-103"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 hidden items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm font-semibold">Project Preview</p>
                    </div>
                  </div>

                  {/* Confidential Badge */}
                  {project.confidential && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Confidential
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-in-out"></div>
                </div>

                {/* Card Content with Better Spacing */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Title with Better Typography */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h3>

                  {/* Description with Improved Readability */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies with Better Visual Hierarchy */}
                  <div className="mb-6 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies
                        .slice(0, 4)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-medium">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {getProjectButtons(project).map((button, buttonIndex) =>
                      button.disabled ? (
                        <div
                          key={buttonIndex}
                          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed flex-1"
                        >
                          {button.icon}
                          <span>{button.text}</span>
                        </div>
                      ) : (
                        <a
                          key={buttonIndex}
                          href={button.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex-1 ${button.className}`}
                        >
                          {button.icon}
                          <span>{button.text}</span>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              {/* Carousel Container */}
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {projects.map((project, index) => (
                  <div
                    key={`mobile-${index}`}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 mx-auto max-w-sm transition-all duration-300">
                      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-103"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 hidden items-center justify-center">
                          <div className="text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-2"></div>
                            <p className="text-sm font-semibold">
                              Project Preview
                            </p>
                          </div>
                        </div>

                        {/* Confidential Badge */}
                        {project.confidential && (
                          <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                            Confidential
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-in-out"></div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {project.title}
                        </h3>

                        <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies
                              .slice(0, 3)
                              .map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {getProjectButtons(project).map(
                            (button, buttonIndex) =>
                              button.disabled ? (
                                <div
                                  key={buttonIndex}
                                  className="flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-400 cursor-not-allowed flex-1"
                                >
                                  {React.cloneElement(button.icon, {
                                    size: 14,
                                  })}
                                  <span>{button.text}</span>
                                </div>
                              ) : (
                                <a
                                  key={buttonIndex}
                                  href={button.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex-1 ${button.className}`}
                                >
                                  {React.cloneElement(button.icon, {
                                    size: 14,
                                  })}
                                  <span>{button.text}</span>
                                </a>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-blue-600 w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Swipe or use arrows to explore projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
