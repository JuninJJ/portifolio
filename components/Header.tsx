
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider">
           <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Junior JJ desenvolvedor web</a>
        </div>
        <ul className="flex space-x-8">
          <li><button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors duration-300">Quem eu sou  </button></li>
          <li><button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors duration-300">Contato</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
