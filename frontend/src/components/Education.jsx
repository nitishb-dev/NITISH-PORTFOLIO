import React from 'react';
import useScrollFadeObserver from '../hooks/useScrollFadeObserver';

// Import images
import vitLogo from '../images/vitLogo.jpg';
import holycrossLogo from '../images/holycross.png';

// Professional SVG Icons
const GraduationCap = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const Calendar = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);





const Education = () => {
  const [ref, isVisible] = useScrollFadeObserver();

  const educationData = [
    {
      degree: "Integrated M.Tech in Software Engineering",
      institution: "Vellore Institute of Technology (VIT)",
      grade: "8.84 CGPA",
      years: "2021 - 2026",
      status: "Final Year",
      image: vitLogo
    },
    {
      degree: "Higher Secondary Certificate (XII)",
      institution: "Holy Cross Matric Hr. Sec. School",
      grade: "92.02%",
      years: "2020 - 2021",
      image: holycrossLogo
    }
  ];



  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`scroll-fade-section ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Academic Excellence
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Strong educational foundation with consistent academic performance and specialized technical focus
            </p>
          </div>



          {/* Simplified Education */}
          <div className="grid md:grid-cols-2 gap-6">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 card-hover shadow-lg border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={edu.image}
                      alt={edu.institution}
                      className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg hidden items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-sm sm:text-base text-blue-600 font-semibold mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">{edu.years}</span>
                      {edu.status && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {edu.status}
                        </span>
                      )}
                    </div>
                    <div className="inline-block bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {edu.grade}
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

export default Education;