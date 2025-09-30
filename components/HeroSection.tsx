import React, { useState, useRef, useEffect } from 'react';
import AnimatedElement from './AnimatedElement';

const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const freelancerRef = useRef<HTMLSpanElement>(null);
  const modernasRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePos({
        x: x - rect.width / 2,
        y: y - rect.height / 2
      });
    }
  };

  useEffect(() => {
    if ('ontouchstart' in window === false) {
      const moveX = mousePos.x * 0.01;
      const moveY = mousePos.y * 0.01;

      if (freelancerRef.current) {
        freelancerRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
      if (modernasRef.current) {
        modernasRef.current.style.transform = `translate3d(${moveX * 1.2}px, ${moveY * 1.2}px, 0)`;
      }
    }
  }, [mousePos]);

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="min-h-screen flex items-center justify-center text-center bg-transparent cursor-default"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6">
        <AnimatedElement>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
            Junior JJ desenvolvedor web{' '}
            <span 
              ref={freelancerRef}
              className="text-cyan-400 inline-block transition-transform duration-100 ease-out"
            >
              Freelancer
            </span>
          </h2>
        </AnimatedElement>
        
        <AnimatedElement delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            Criando Experiências Digitais{' '}
            <span 
              ref={modernasRef}
              className="text-cyan-400 inline-block transition-transform duration-100 ease-out"
            >
              Modernas
            </span>
          </h1>
        </AnimatedElement>
        
        <AnimatedElement delay={0.4}>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transformando ideias em interfaces interativas e responsivas com React e as mais novas tecnologias do mercado.
          </p>
        </AnimatedElement>
        
        <AnimatedElement delay={0.6}>
          <button 
            onClick={scrollToContact}
            className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105"
          >
            Vamos Conversar
          </button>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default HeroSection;