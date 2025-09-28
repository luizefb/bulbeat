'use client'

import React, { useEffect, useState } from 'react'
import { AnimatedContent } from './AnimatedContent'

interface ProgressBarProps {
  isVisible: boolean
  progress: number
  className?: string
  animation?: 'fadeInUp' | 'scaleIn' | 'fadeIn'
  delay?: number
  duration?: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  isVisible,
  progress,
  className = "",
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6
}) => {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    if (isVisible) {
      // Animate progress bar filling
      const timer = setTimeout(() => {
        setDisplayProgress(progress)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayProgress(0)
    }
  }, [isVisible, progress])

  if (!isVisible) return null

  return (
    <AnimatedContent
      animation={animation}
      delay={delay}
      duration={duration}
      className={`w-full max-w-md mx-auto progress-container mt-3 ${className}`}
    >
      <div className="space-y-3">
        {/* Progress bar container */}
        <div className="relative w-full h-3 bg-gray-800/50 rounded-full overflow-hidden border border-green-400/20">
          {/* Progress fill */}
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${displayProgress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
          
          {/* Glow effect */}
          <div 
            className="absolute top-0 left-0 h-full bg-green-400/30 rounded-full transition-all duration-500 ease-out blur-sm"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        
        {/* Progress text */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-green-400 font-medium">
            Baixando...
          </span>
          <span className="text-white/80 font-mono">
            {Math.round(displayProgress)}%
          </span>
        </div>
        
        {/* Status text */}
        <div className="text-center">
          <p className="text-xs text-green-400/70">
            {displayProgress < 100 ? 'Preparando sua música...' : 'Download concluído!'}
          </p>
        </div>
      </div>
    </AnimatedContent>
  )
}

export default ProgressBar
