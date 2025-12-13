import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaCode, FaGlobe } from 'react-icons/fa';
import ParticlesBackground from '../components/ParticlesBackground';
import Astra from "../assets/Astra.png";
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const loadingToast = toast.loading('Sending message...');

    try {
      const response = await fetch('https://portfolio-backend-aoqc.onrender.com/api/contact', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.details) {
          const errorMessages = Object.entries(data.details)
            .filter(([_, value]) => value)
            .map(([_, value]) => `• ${value}`)
            .join('\n');
          
          throw new Error(`Validation failed:\n${errorMessages}`);
        }
        
        throw new Error(data.error || 'Failed to send message');
      }

      // Success case
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        id: loadingToast,
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      
      // Format error message with line breaks if it contains them
      const errorMessage = error.message.includes('\n')
        ? error.message.split('\n').map((line, i) => 
            i === 0 ? line : <div key={i} className="mt-1">{line}</div>
          )
        : error.message;
      
      toast.error(
        <div className="text-sm">
          <div className="font-bold mb-1">Failed to send message</div>
          <div>{errorMessage}</div>
        </div>,
        {
          id: loadingToast,
          duration: 10000, // Longer duration for error messages
          style: {
            maxWidth: '500px',
            whiteSpace: 'pre-line',
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #2d2d2d',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '500px',
            width: '90vw',
          },
          success: {
            duration: 5000,
            style: {
              borderLeft: '4px solid #10B981',
            },
            iconTheme: {
              primary: '#10B981',
              secondary: '#1a1a1a',
            },
          },
          error: {
            duration: 10000,
            style: {
              borderLeft: '4px solid #EF4444',
              whiteSpace: 'pre-line',
            },
            iconTheme: {
              primary: '#EF4444',
              secondary: '#1a1a1a',
            },
          },
          loading: {
            style: {
              borderLeft: '4px solid #3B82F6',
            },
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#1a1a1a',
            },
          },
        }}
      />
   
      
      <div className="max-w-7xl mx-auto relative z-10">
     
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Astra Image with Animation */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative group">
              <div className="absolute -inset-4  rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <motion.img 
                src={Astra} 
                alt="Astra" 
                className="relative z-10 w-full max-w-md h-auto object-contain"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            className="w-full lg:w-1/2 bg-gray-900/30 backdrop-blur-md rounded-2xl p-8 border border-gray-800 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-[#1cd8d2]" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1cd8d2] focus:border-transparent outline-none transition duration-200 text-white placeholder-gray-500"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-[#1cd8d2]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1cd8d2] focus:border-transparent outline-none transition duration-200 text-white placeholder-gray-500"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-[#1cd8d2]" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone (Optional)"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1cd8d2] focus:border-transparent outline-none transition duration-200 text-white placeholder-gray-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCode className="h-5 w-5 text-[#1cd8d2]" />
                </div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1cd8d2] focus:border-transparent outline-none appearance-none transition duration-200 text-white"
                  required
                >
                  <option value="" className="text-gray-500">Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="app-development">App Development</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1cd8d2] focus:border-transparent outline-none transition duration-200 text-white placeholder-gray-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] hover:from-[#00bf8f] hover:to-[#1cd8d2] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
