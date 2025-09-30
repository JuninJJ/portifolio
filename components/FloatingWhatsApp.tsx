import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/YOUR_PHONE_NUMBER" // Replace with your WhatsApp number e.g., 5511999999999
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300 z-40"
      aria-label="Contact me on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  );
};

export default FloatingWhatsApp;