import React from "react";
import useScrollFadeObserver from "../hooks/useScrollFadeObserver";
import forageLogo from "../images/forage-logo.png";

// Clean SVG Icons
const Award = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"></polyline>
  </svg>
);

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

const Certifications = () => {
  const [ref, isVisible] = useScrollFadeObserver();

  const certifications = [
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "2024",
      description:
        "Foundational knowledge of AI and machine learning concepts on Microsoft Azure platform",
      credentialUrl:
        "https://drive.google.com/file/d/1DwMgQbbloFaRzWNbmNbEq_iYgpXqJhgs/view?usp=sharing",
      skills: [
        "Azure AI",
        "Machine Learning",
        "AI Services",
        "Cognitive Services",
      ],
      badgeImage:
        "https://images.credly.com/size/340x340/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png",
      badgeAlt: "Microsoft Azure AI Fundamentals Badge",
    },
    {
      title: "Docker Foundations Professional Certificate",
      issuer: "Docker & LinkedIn",
      date: "2024",
      description:
        "Comprehensive understanding of containerization, Docker fundamentals, and container orchestration",
      credentialUrl:
        "https://drive.google.com/file/d/1UKngxRrKQZccn3imnQJfhhLH6YQ21wQP/view?usp=sharing",
      skills: ["Docker", "Containerization", "DevOps", "Microservices"],
      badgeImage:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      badgeAlt: "Docker Logo",
    },
    {
      title: "Deloitte Data Analytics Job Simulation",
      issuer: "Forage",
      date: "2025",
      description:
        "Practical experience in data analytics methodologies and business intelligence solutions",
      credentialUrl:
        "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_xdnNYZzmqSqmuz7xb_1748357316129_completion_certificate.pdf",
      skills: [
        "Data Analytics",
        "Business Intelligence",
        "Data Visualization",
        "SQL",
      ],
      badgeImage: forageLogo,
      badgeAlt: "Forage Logo",
    },
    {
      title: "Building Intelligent Chatbots on AWS",
      issuer: "LinkedIn",
      date: "2024",
      description:
        "Advanced techniques for developing AI-powered chatbots using AWS services and machine learning",
      credentialUrl:
        "https://www.linkedin.com/learning/certificates/2ba34bc378076a0d8718e5ba38744d45ac4d97f49134deece13b275bf74dd9f5",
      skills: ["AWS", "Chatbots", "AI/ML", "Natural Language Processing"],
      badgeImage:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      badgeAlt: "AWS Logo",
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`scroll-fade-section ${isVisible ? "visible" : ""}`}
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Certifications & Achievements
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Professional certifications that validate my expertise and
              commitment to continuous learning
            </p>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 card-hover shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-md border border-gray-100 p-2 flex items-center justify-center">
                      <img
                        src={cert.badgeImage}
                        alt={cert.badgeAlt}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg">
                        <Award className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight mb-1">
                          {cert.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-blue-600 font-medium">
                            {cert.issuer}
                          </span>
                          <span className="text-gray-500 font-medium">
                            {cert.date}
                          </span>
                        </div>
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 text-gray-400 hover:text-blue-600 icon-hover transition-colors duration-200"
                        title="View Credential"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                      {cert.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden carousel-container">
            <div className="horizontal-scroll">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="horizontal-scroll-item bg-white rounded-lg p-6 card-hover shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-md border border-gray-100 p-2 flex items-center justify-center">
                        <img
                          src={cert.badgeImage}
                          alt={cert.badgeAlt}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg">
                          <Award className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight mb-1">
                        {cert.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-blue-600 font-medium">
                          {cert.issuer}
                        </span>
                        <span className="text-gray-500 font-medium">
                          {cert.date}
                        </span>
                      </div>
                    </div>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 icon-hover transition-colors duration-200"
                      title="View Credential"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicator for mobile */}
            <div className="flex justify-center mt-6 scroll-indicator">
              <p className="text-sm text-gray-500">
                Swipe to see more certifications
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-sm">
              Want to verify these certifications? Click the link icon on each
              certificate card.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
