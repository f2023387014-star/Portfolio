'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        }
      )

      // Content animation
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        }
      )

      // Text reveal for paragraphs
      const paragraphs = contentRef.current?.querySelectorAll('p')
      if (paragraphs) {
        paragraphs.forEach((p, index) => {
          gsap.fromTo(
            p,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: p,
                start: 'top 80%',
              },
            }
          )
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary">About Me</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-balance">
            Passionate Developer,
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Lifelong Learner
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with enhanced styling */}
          <div ref={imageRef} className="relative group h-full min-h-500px">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl opacity-25 group-hover:opacity-40 blur-2xl transition duration-1000" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-10 group-hover:opacity-20 blur transition duration-1000" />

            <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                alt="Profile"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/30 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                I'm a <span className="text-primary font-semibold">Full-Stack Web Developer</span> with a passion for creating exceptional digital experiences. With 5+ years of experience in modern web technologies, I specialize in building scalable, high-performance applications that solve real-world problems.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                My approach combines clean code architecture with thoughtful UX design. I'm proficient in React and Next.js for frontend development, with solid backend expertise in Django, Node.js, and database management. I believe in writing maintainable code and creating intuitive user experiences.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond coding, I'm passionate about exploring emerging technologies, contributing to open-source projects, and sharing knowledge with the developer community. When I'm not coding, you'll find me exploring design trends, experimenting with new frameworks, or working on innovative side projects.
              </p>
            </div>

            {/* Skills grid */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm uppercase tracking-widest font-semibold text-primary">Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['React', 'Next.js', 'Django', 'TypeScript', 'Python', 'PostgreSQL', 'Node.js', 'AWS', 'GraphQL'].map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg text-sm font-semibold text-primary hover:from-primary/20 hover:to-accent/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
