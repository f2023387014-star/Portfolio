'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js'],
  },
  {
    category: 'Backend',
    skills: ['Django', 'Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'Vercel', 'AWS', 'GitHub', 'VS Code'],
  },
  {
    category: 'Design',
    skills: ['UI/UX Design', 'Figma', 'Responsive Design', 'Animation', 'Accessibility', 'Web Performance'],
  },
]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
            ease: 'back.out',
          }
        )

        // Hover animation
        const skillItems = card.querySelectorAll('.skill-item')
        skillItems.forEach((item) => {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              y: -8,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              duration: 0.3,
              overwrite: 'auto',
            })
          })

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              y: 0,
              boxShadow: '0 0px 0px rgba(0,0,0,0)',
              duration: 0.3,
              overwrite: 'auto',
            })
          })
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skillGroup, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group p-8 rounded-xl border border-border bg-gradient-to-br from-card to-secondary/20 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-primary group-hover:text-accent transition-colors">
                {skillGroup.category}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-item px-4 py-3 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-default"
                  >
                    <p className="font-semibold text-sm text-foreground">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency breakdown */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            { label: 'Frontend Development', percentage: 95 },
            { label: 'Backend Development', percentage: 85 },
            { label: 'UI/UX Design', percentage: 90 },
          ].map((proficiency, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">{proficiency.label}</span>
                <span className="text-primary font-bold">{proficiency.percentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{
                    width: `${proficiency.percentage}%`,
                    animation: `slideIn 1s ease-out forwards`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: var(--width);
          }
        }
      `}</style>
    </section>
  )
}
