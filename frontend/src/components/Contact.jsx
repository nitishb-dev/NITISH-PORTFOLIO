import React, { useState } from 'react';
import axios from 'axios';
import useScrollFadeObserver from '../hooks/useScrollFadeObserver';

// Import illustration
import contactIllustration from '../images/contact-illustration.svg';

// Simple SVG Icons
const Send = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
  </svg>
);



const Contact = () => {
  const [ref, isVisible] = useScrollFadeObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await axios.post('/api/contact', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`scroll-fade-section ${isVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Have a project in mind? Let's discuss how we can work together
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Illustration */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <img
                  src={contactIllustration}
                  alt="Contact illustration"
                  className="w-full h-auto"
                />
                <div className="text-center mt-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Let's Connect!
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none sm:rows-5"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg text-sm sm:text-base font-medium button-hover"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                  <span className="text-sm sm:text-base">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>

                {submitStatus === 'success' && (
                  <div className="p-3 sm:p-4 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center text-xs sm:text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3 sm:p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center text-xs sm:text-sm">
                    Failed to send message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;