import React from 'react';
import { SiReact, SiHtml5, SiCss3, SiJavascript, SiSass, SiGit, SiNodedotjs, SiTailwindcss } from 'react-icons/si';
import AnimatedElement from './AnimatedElement';

const technologies = [
  { Icon: SiReact, name: "React.js", color: "#61DAFB" },
  { Icon: SiHtml5, name: "HTML5", color: "#E34F26" },
  { Icon: SiCss3, name: "CSS3", color: "#1572B6" },
  { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { Icon: SiSass, name: "SASS", color: "#CC6699" },
  { Icon: SiGit, name: "Git", color: "#F05032" },
  { Icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <AnimatedElement type="heading">
          <h2 className="text-4xl font-bold text-center mb-12">Quem Sou Eu</h2>
        </AnimatedElement>
        <div className="max-w-4xl mx-auto text-center text-gray-300 text-lg leading-relaxed">
           <AnimatedElement>
            <p>
              Sou um desenvolvedor front-end Freelancer, com conhecimentos em React.js, HTML5, CSS3, JavaScript, SASS, Git, GitHub e Node.js. Tenho paixão por criar interfaces modernas, funcionais e responsivas, sempre buscando unir boa experiência do usuário com código limpo e bem estruturado.
            </p>
           </AnimatedElement>
        </div>
        
        <AnimatedElement type="heading" delay={0.2}>
            <h3 className="text-3xl font-bold text-center mt-20 mb-10">Tecnologias</h3>
        </AnimatedElement>

        <div className="flex flex-wrap justify-center items-center gap-8 max-w-3xl mx-auto">
          {technologies.map((tech, index) => (
             <AnimatedElement key={tech.name} delay={0.1 * index}>
              <div
                className="group p-4 bg-gray-900 rounded-lg transition-all duration-300 transform hover:-translate-y-2"
                style={{ '--tech-color': tech.color } as React.CSSProperties}
              >
                <tech.Icon className="h-16 w-16 mx-auto transition-all duration-300 text-gray-400 group-hover:text-white group-hover:drop-shadow-[0_0_8px_var(--tech-color)]" />
                <p className="text-center mt-2 text-sm text-gray-400 group-hover:text-white transition-colors duration-300">{tech.name}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;