'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AnimatedContentProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'fadeInUp' | 'scaleIn' | 'slideInLeft' | 'slideInRight'
  delay?: number
  duration?: number
  className?: string
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({ 
  children, 
  animation = 'fadeIn', 
  delay = 0, 
  duration = 0.8, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Configuração inicial baseada na animação
    switch (animation) {
      case 'fadeInUp':
        gsap.set(element, { opacity: 0, y: 30 })
        break
      case 'fadeIn':
        gsap.set(element, { opacity: 0 })
        break
      case 'scaleIn':
        gsap.set(element, { opacity: 0, scale: 0.9 })
        break
      case 'slideInLeft':
        gsap.set(element, { opacity: 0, x: -50 })
        break
      case 'slideInRight':
        gsap.set(element, { opacity: 0, x: 50 })
        break
      default:
        gsap.set(element, { opacity: 0 })
    }

    // Animação de entrada
    const tl = gsap.timeline({ delay })
    
    switch (animation) {
      case 'fadeInUp':
        tl.to(element, { opacity: 1, y: 0, duration, ease: 'power2.out' })
        break
      case 'fadeIn':
        tl.to(element, { opacity: 1, duration, ease: 'power2.out' })
        break
      case 'scaleIn':
        tl.to(element, { opacity: 1, scale: 1, duration, ease: 'back.out(1.7)' })
        break
      case 'slideInLeft':
        tl.to(element, { opacity: 1, x: 0, duration, ease: 'power2.out' })
        break
      case 'slideInRight':
        tl.to(element, { opacity: 1, x: 0, duration, ease: 'power2.out' })
        break
      default:
        tl.to(element, { opacity: 1, duration, ease: 'power2.out' })
    }
  }, [animation, delay, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export { AnimatedContent }
