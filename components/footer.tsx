'use client'

import { Github, Linkedin, Mail, ArrowUp, Twitter } from 'lucide-react'
import { useEffect } from 'react'
import gsap from 'gsap'

export function Footer() {
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    // Hover animation for social links
    const socialLinks = document.querySelectorAll('.social-link')
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          y: -5,
          duration: 0.3,
          overwrite: 'auto',
        })
      })
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          y: 0,
          duration: 0.3,
          overwrite: 'auto',
        })
      })
    })
  }, [])

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@example.com' },
  ]

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 1.5,
      ease: 'power3.inOut',
    })
  }

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background to-background/80 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/10 via-accent/5 to-transparent rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                <span className="text-white font-bold">DEV</span>
              </div>
              <span className="font-bold text-lg">Portfolio</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-stack developer crafting beautiful, high-performance web experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-foreground">Navigation</h3>
            <div className="space-y-3">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 text-sm group"
                >
                  <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-6 text-foreground">Resources</h3>
            <div className="space-y-3">
              {[
                { label: 'GitHub', href: '#' },
                { label: 'LinkedIn', href: '#' },
                { label: 'Resume', href: '#' },
                { label: 'Blog', href: '#' },
              ].map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 text-sm group"
                >
                  <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="font-bold mb-6 text-foreground">Get In Touch</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Interested in working together? Let's talk!
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:scale-105 text-sm w-full justify-center"
            >
              <Mail size={16} />
              Send Email
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        {/* Social Links and Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link p-3 bg-secondary hover:bg-gradient-to-r hover:from-primary hover:to-accent text-foreground hover:text-white rounded-lg transition-all duration-300 group border border-border hover:border-transparent"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right text-muted-foreground text-sm space-y-1">
            <p>© {currentYear} Portfolio. Built with Next.js & GSAP</p>
            <p>Deployed on Vercel</p>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-3 bg-secondary hover:bg-primary/10 text-foreground hover:text-primary rounded-lg transition-all duration-300 group border border-border hover:border-primary/50"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
