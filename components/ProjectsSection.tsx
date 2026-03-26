'use client'

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import AnimatedElement from './AnimatedElement'

export interface Project {
  id: string
  title: string
  description: string
  details?: string
  image?: string
  tags: string[]
  github?: string
  demo?: string
}

interface Props {
  initialProjects: Project[]
}

function ProjectCard({ project }: { project: Project }) {
  const projectUrl = project.demo || project.github || '#'

  return (
    <div className="group h-72" style={{ perspective: '1000px' }}>
      <div
        className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        <div className="absolute inset-0 [backface-visibility:hidden] bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex flex-col">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-5xl text-gray-700 font-mono">{'</>'}</span>
            </div>
          )}
          <div className="p-4 flex flex-col flex-1 justify-between">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-950 rounded-xl border border-cyan-500/40 flex flex-col p-5 justify-between">
          <div className="overflow-hidden">
            <h3 className="text-base font-bold text-cyan-400 mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
              {project.details || project.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
                    onClick={e => e.stopPropagation()}
                  >
                    <FaGithub className="w-4 h-4" /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    onClick={e => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt className="w-3 h-3" /> Demo
                  </a>
                )}
              </div>

              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500 text-black text-xs font-bold py-1.5 px-4 rounded-full hover:bg-cyan-400 transition-colors"
              >
                Ver Projeto →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection({ initialProjects }: Props) {
  return (
    <section id="projects" className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <AnimatedElement type="heading">
          <h2 className="text-4xl font-bold text-center mb-4">Projetos</h2>
          <p className="text-center text-gray-400 mb-12">Passe o mouse para ver mais detalhes</p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {initialProjects.map((project, index) => (
            <AnimatedElement key={project.id} delay={0.1 * index}>
              <ProjectCard project={project} />
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
