'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Github, ExternalLink, Code2, Loader2 } from 'lucide-react'
import useSWR from 'swr'
import { getProjects } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

// Fallback data in case API fails - Only Analytics Dashboard
const fallbackProjectsData = [
  {
    title: 'Analytics Dashboard',
    description:
      'Comprehensive analytics dashboard with real-time data visualization, team collaboration features, and advanced metrics tracking.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'Django', 'D3.js', 'PostgreSQL'],
    link: '#',
    github: '#',
  },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // Fetch data from Django API
  const { data: apiData, error, isLoading } = useSWR('/projects/', getProjects, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // Use API data if available, fallback to hardcoded data
  const projectsData = apiData?.results || fallbackProjectsData

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: (index % 3) * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
            ease: 'back.out',
          }
        )

        // Image tilt effect on hover
        card.addEventListener('mousemove', (e: Event) => {
          if (!(e instanceof MouseEvent)) return
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5

          gsap.to(card, {
            rotationY: x * 5,
            rotationX: -y * 5,
            duration: 0.3,
            overwrite: 'auto',
            transformPerspective: 1000,
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            overwrite: 'auto',
          })
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Show error state
  if (error && !fallbackProjectsData.length) {
    return (
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Unable to load projects</h2>
            <p className="text-muted-foreground">Please check your Django API connection</p>
            <p className="text-sm text-red-500">{error.message}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/20 via-accent/10 to-transparent rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <Code2 size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Featured Work</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-balance">
            Crafted Projects That
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Drive Real Impact
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of my recent work showcasing expertise in full-stack development, modern design patterns, and scalable architecture.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="group relative h-full rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-500 cursor-default hover:shadow-2xl hover:shadow-primary/20"
                style={{ perspective: '1000px' }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/20 group-hover:via-accent/10 group-hover:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-5" />

                {/* Image container */}
                <div className="relative h-56 overflow-hidden bg-secondary">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    priority={index < 3}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Premium badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-full space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-semibold border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-2 mt-auto">
                    <a
                      href={project.link}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 text-sm group/btn"
                    >
                      <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300 text-sm group/btn"
                    >
                      <Github size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                      Code
                    </a>
                  </div>
                </div>
            </div>
          ))}
          </div>
        )}

        {/* Call to action */}
        <div className="mt-20 relative">
          <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 backdrop-blur p-12 text-center space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">Want to see more?</h3>
              <p className="text-muted-foreground">
                Explore my complete portfolio and contributions on GitHub
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
            >
              <Code2 size={20} />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
