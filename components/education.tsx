'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Technology',
    year: '2020 - 2024',
    description: 'Focus on software engineering and web development',
    gpa: '3.8/4.0',
  },
  {
    degree: 'Full-Stack Web Development Bootcamp',
    institution: 'Tech Academy',
    year: '2020',
    description: 'Intensive training in MERN stack and modern development practices',
    gpa: 'Graduated with Distinction',
  },
  {
    degree: 'Advanced JavaScript & React Certification',
    institution: 'Online Learning Platform',
    year: '2021',
    description: 'Advanced concepts in JavaScript, React, and performance optimization',
    gpa: 'Certified',
  },
]

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="education" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Education
        </h2>

        <div className="space-y-6">
          {educationData.map((edu, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el
              }}
              className="group relative p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10" />

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                  <Award size={24} className="text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                    <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {edu.year}
                    </span>
                  </div>

                  <p className="text-primary font-semibold mb-2">{edu.institution}</p>
                  <p className="text-muted-foreground mb-3">{edu.description}</p>

                  <div className="flex gap-4 text-sm">
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-lg font-semibold">
                      {edu.gpa}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
