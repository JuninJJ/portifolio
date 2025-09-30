
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import RainbowBackground from './components/RainbowBackground';

const App: React.FC = () => {
  return (
    <div className="text-white min-h-screen font-sans relative">
      <RainbowBackground />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </main>
      <FloatingWhatsApp />
    </div>
  );
};

export default App;