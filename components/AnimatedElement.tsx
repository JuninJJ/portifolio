import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  type?: 'heading' | 'content';
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay = 0, type = 'content' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  const baseClasses = 'transition-all duration-700 ease-out';
  const animationClass = type === 'heading' 
    ? (isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0')
    : (isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0');


  return (
    <div 
        ref={ref} 
        className={`${baseClasses} ${animationClass}`}
        style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;