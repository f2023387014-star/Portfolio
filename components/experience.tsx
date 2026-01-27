'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, Calendar } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const experienceData = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    period: '2023 - Present',
    description: 'Leading frontend architecture and mentoring junior developers. Implemented advanced animations and improved performance by 40%.',
    highlights: ['React & Next.js', 'Team Leadership', 'Performance Optimization'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2021 - 2023',
    description: 'Developed and maintained full-stack web applications. Collaborated with UX designers and backend teams to deliver seamless user experiences.',
    highlights: ['Django & React', 'Database Design', 'API Development'],
  },
  {
    title: 'Junior Web Developer',
    company: 'StartUp Labs',
    period: '2020 - 2021',
    description: 'Built responsive web applications and learned modern development practices. Contributed to multiple client projects with high satisfaction.',
    highlights: ['HTML/CSS/JS', 'First Projects', 'Learning & Growth'],
  },
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return

    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        '.timeline-line',
        {
          height: 0,
        },
        {
          height: '100%',
          duration: 1.5,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      )

      // Animate timeline items
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
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
    <section ref={containerRef} id="experience" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Experience
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent timeline-line rounded-full" />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el
                }}
                className={`relative flex gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
                  <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50" />
                </div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <div className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default">
                    <div className="flex items-start gap-3 mb-3">
                      <Briefcase size={20} className="text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                        <p className="text-primary font-semibold">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar size={16} />
                      {exp.period}
                    </div>

                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
