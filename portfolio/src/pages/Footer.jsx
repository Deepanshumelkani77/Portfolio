import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    icon: <FaGithub className="w-6 h-6" />,
    url: 'https://github.com/yourusername',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className="w-6 h-6" />,
    url: 'https://linkedin.com/in/yourusername',
  },
  {
    name: 'Twitter',
    icon: <FaTwitter className="w-6 h-6" />,
    url: 'https://twitter.com/yourusername',
  },
  {
    name: 'Email',
    icon: <FaEnvelope className="w-6 h-6" />,
    url: 'mailto:your.email@example.com',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]">
              About Me
            </h3>
            <p className="text-gray-400 mb-4">
              I'm a passionate developer creating beautiful and functional web applications with modern technologies.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1cd8d2] transition-colors duration-300"
                  whileHover={{ y: -3 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#1cd8d2] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaEnvelope className="text-[#1cd8d2] mt-1 mr-3 flex-shrink-0" />
                <a href="mailto:your.email@example.com" className="text-gray-400 hover:text-[#1cd8d2] transition-colors duration-300">
                  deepumelkani123@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-[#1cd8d2] mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+91 7983458418</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Your Name. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-[#1cd8d2] text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-[#1cd8d2] text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
