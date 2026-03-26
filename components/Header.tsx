'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider">
          <button onClick={() => scrollTo('hero')}>Junior JJ desenvolvedor web</button>
        </div>
        <ul className="flex space-x-8">
          <li><button onClick={() => scrollTo('about')} className="hover:text-cyan-400 transition-colors duration-300">Quem eu sou</button></li>
          <li><button onClick={() => scrollTo('projects')} className="hover:text-cyan-400 transition-colors duration-300">Projetos</button></li>
          <li><Link href="/weather" className="hover:text-cyan-400 transition-colors duration-300">Tempo</Link></li>
          <li><button onClick={() => scrollTo('contact')} className="hover:text-cyan-400 transition-colors duration-300">Contato</button></li>
        </ul>
      </nav>
    </header>
  )
}
