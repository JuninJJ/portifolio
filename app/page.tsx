import { readFileSync } from 'fs'
import { join } from 'path'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import RainbowBackground from '@/components/RainbowBackground'
import type { Project } from '@/components/ProjectsSection'

function getProjects(): Project[] {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), 'data', 'projects.json'), 'utf-8'))
  } catch {
    return []
  }
}

export default function Home() {
  const projects = getProjects()

  return (
    <div className="text-white min-h-screen font-sans relative">
      <RainbowBackground />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection initialProjects={projects} />
        <ContactSection />
      </main>
      <FloatingWhatsApp />
    </div>
  )
}
