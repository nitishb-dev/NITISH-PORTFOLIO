import React from "react";
import useScrollFadeObserver from "../hooks/useScrollFadeObserver";

// Clean SVG Icons
const BookOpen = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
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

const Award = ({ className = "w-5 h-5" }) => (
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

const OrcidIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947-.525 0-.946-.422-.946-.947 0-.525.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.588-1.444 3.588-3.722 0-2.016-1.091-3.722-3.569-3.722h-2.316z" />
  </svg>
);

const Publications = () => {
  const [ref, isVisible] = useScrollFadeObserver();

  const publications = [
    {
      title:
        "Investigation on Generative Autoencoders for Hand Gesture Recognition",
      type: "Book Chapter",
      chapter: "Chapter 7",
      book: "Humans and Generative AI Tools for Collaborative Intelligence",
      publisher: "IGI Global",
      role: "Co-Author",
      year: "2025",
      description:
        "Developed and compared machine learning models (KNN, Decision Tree, SVM, Autoencoders) on the LeapGestRecog dataset (20,000 images). Achieved 99.98% accuracy using SVM with RBF kernel and Autoencoder.",
      highlights: [
        "Achieved 99.98% accuracy using SVM with RBF kernel",
        "Worked with LeapGestRecog dataset (20,000 images)",
        "Focused on feature extraction and dimensionality reduction (PCA)",
      ],
      technologies: [
        "Python",
        "Machine Learning",
        "SVM",
        "Autoencoders",
        "PCA",
      ],
      url: "https://www.igi-global.com/portal/certificate-of-publication/?tid=350260",
      orcidId: "https://orcid.org/0009-0006-0558-4406",
    },
  ];

  return (
    <section id="publications" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`scroll-fade-section ${isVisible ? "visible" : ""}`}
        >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Publications & Research
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Academic contributions and research work in machine learning and
              AI
            </p>
          </div>

          {/* ORCID Profile Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <OrcidIcon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      ORCID Profile
                    </h3>
                    <p className="text-sm text-gray-600">
                      Researcher identifier and publication record
                    </p>
                  </div>
                </div>
                <a
                  href="https://orcid.org/0009-0006-0558-4406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  <span className="text-sm">View Profile</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          <div>
            {publications.map((pub, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 card-hover shadow-lg border border-blue-200"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                      <BookOpen />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {pub.role}
                        </span>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                          {pub.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{pub.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={pub.orcidId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 icon-hover transition-colors duration-200"
                      title="View ORCID Profile"
                    >
                      <OrcidIcon size={20} />
                    </a>
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 icon-hover transition-colors duration-200"
                      title="View Publication Certificate"
                    >
                      <ExternalLink />
                    </a>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {pub.title}
                    </h3>
                    <div className="text-base sm:text-lg text-blue-600 font-semibold mb-1">
                      {pub.chapter} - {pub.book}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                      Published by: {pub.publisher}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {pub.description}
                  </p>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {pub.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-gray-700">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                      Technologies & Methods
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pub.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 sm:px-3 py-1 bg-white text-gray-700 rounded-full text-xs sm:text-sm border border-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
