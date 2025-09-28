'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SplitTextProps {
  text: string
  animation?: 'fadeIn' | 'fadeInUp' | 'slideInUp' | 'bounceIn'
  delay?: number
  duration?: number
  className?: string
  stagger?: number
}

const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  animation = 'fadeInUp', 
  delay = 0, 
  duration = 0.6, 
  className = '',
  stagger = 0.05
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const chars = ref.current.querySelectorAll('.char')
    
    // Configuração inicial
    chars.forEach((char, index) => {
      switch (animation) {
        case 'fadeInUp':
          gsap.set(char, { opacity: 0, y: 20 })
          break
        case 'fadeIn':
          gsap.set(char, { opacity: 0 })
          break
        case 'slideInUp':
          gsap.set(char, { opacity: 0, y: 30 })
          break
        case 'bounceIn':
          gsap.set(char, { opacity: 0, scale: 0.3 })
          break
        default:
          gsap.set(char, { opacity: 0 })
      }
    })

    // Animação sequencial dos caracteres
    const tl = gsap.timeline({ delay })
    
    chars.forEach((char, index) => {
      const charDelay = index * stagger
      
      switch (animation) {
        case 'fadeInUp':
          tl.to(char, { 
            opacity: 1, 
            y: 0, 
            duration, 
            ease: 'power2.out' 
          }, charDelay)
          break
        case 'fadeIn':
          tl.to(char, { 
            opacity: 1, 
            duration, 
            ease: 'power2.out' 
          }, charDelay)
          break
        case 'slideInUp':
          tl.to(char, { 
            opacity: 1, 
            y: 0, 
            duration, 
            ease: 'back.out(1.7)' 
          }, charDelay)
          break
        case 'bounceIn':
          tl.to(char, { 
            opacity: 1, 
            scale: 1, 
            duration, 
            ease: 'back.out(1.7)' 
          }, charDelay)
          break
        default:
          tl.to(char, { 
            opacity: 1, 
            duration, 
            ease: 'power2.out' 
          }, charDelay)
      }
    })
  }, [text, animation, delay, duration, stagger])

  return (
    <div ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </div>
  )
}

export { SplitText }
