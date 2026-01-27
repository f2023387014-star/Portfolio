'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Code2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import gsap from 'gsap'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeLink, setActiveLink] = useState('hero')

  useEffect(() => {
    setMounted(true)

    // Smooth scroll indicator animation
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href')
        setActiveLink(href || '')
      })
    })
  }, [])

  if (!mounted) return null

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/70 border-b border-border/50 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
            <Code2 size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Portfolio
          </span>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex gap-1">
          {[
            { label: 'About', href: '#about' },
            { label: 'Education', href: '#education' },
            { label: 'Skills', href: '#skills' },
            { label: 'Experience', href: '#experience' },
            { label: 'Projects', href: '#projects' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
            >
              {item.label}
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="relative p-3 rounded-lg border border-border hover:bg-secondary hover:border-primary/50 transition-all duration-300 group"
          aria-label="Toggle theme"
        >
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/10 to-accent/10 transition-opacity duration-300" />
          <div className="relative">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </div>
        </button>
      </nav>
    </header>
  )
}
