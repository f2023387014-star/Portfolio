'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import { ArrowDown, Sparkles, Code2, Zap, Globe } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Stagger intro animations
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'cubic.out',
        }
      )

      tl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6'
      )

      // Image parallax and scale on enter
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
            rotateY: 20,
          },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: 'back.out',
          },
          '-=0.6'
        )

        // Floating animation for image
        gsap.to(imageRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // Stats animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item')
        tl.fromTo(
          statItems,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '-=0.4'
        )
      }

      // Floating elements
      floatingElementsRef.current.forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 === 0 ? -30 : 30,
          x: index % 2 === 1 ? -20 : 20,
          duration: 4 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.1,
        })
      })

      // Scroll indicator
      const scrollIndicator = containerRef.current?.querySelector('.scroll-indicator')
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          y: 12,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative overflow-hidden pt-32 pb-20 flex items-center justify-center"
      id="hero"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/30 via-accent/20 to-transparent rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-accent/30 to-transparent rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gradient-to-r from-primary/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" />
      </div>

      {/* Grid background pattern */}
      <div className="absolute inset-0 -z-5 opacity-5">
        <div className="absolute inset-0 bg-grid" style={{
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-16 h-16 rounded-lg border border-primary/20 backdrop-blur-sm"
        ref={(el) => el && floatingElementsRef.current.push(el)} />
      <div className="absolute top-1/3 left-10 w-12 h-12 rounded-full border border-accent/20 backdrop-blur-sm"
        ref={(el) => el && floatingElementsRef.current.push(el)} />
      <div className="absolute bottom-1/4 right-1/4 w-14 h-14 rounded-lg border border-primary/15 backdrop-blur-sm"
        ref={(el) => el && floatingElementsRef.current.push(el)} />

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-6 z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm w-fit">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Full-Stack Developer & Designer</span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance"
          >
            <span className="block">Building Digital</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Experiences That Matter
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg text-muted-foreground leading-relaxed max-w-xl text-balance"
          >
            I craft beautiful, high-performance web applications using modern technologies. Combining stunning design with powerful functionality to create unforgettable user experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Code2 size={18} />
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 hover:shadow-lg transition-all duration-300"
            >
              <Zap size={18} />
              Learn More
            </a>
          </div>

          {/* Stats section */}
          <div ref={statsRef} className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="stat-item">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right side - Image showcase */}
        <div className="relative h-full min-h-500px flex items-center justify-center perspective hidden lg:flex">
          <div
            ref={imageRef}
            className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 group"
            style={{ perspective: '1200px' }}
          >
            {/* Multiple image layers for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

            <Image
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=600&fit=crop"
              alt="Developer workspace"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              priority
            />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Floating badge */}
          <div className="absolute bottom-10 left-0 px-6 py-4 bg-card border border-border rounded-xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-bold">
                  <Globe size={14} />
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Web Dev Stack</div>
                <div className="text-xs text-muted-foreground">Next.js • React • TypeScript</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Scroll to explore</span>
        <ArrowDown size={20} className="text-primary" />
      </div>
    </section>
  )
}
