'use client'

import React, { useState, useRef, useEffect } from 'react'
import { AnimatedContent } from './AnimatedContent'

interface InputFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  className?: string
  animation?: 'fadeInUp' | 'scaleIn' | 'fadeIn'
  delay?: number
  duration?: number
  disabled?: boolean
  autoFocus?: boolean
  onEnterPress?: () => void
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder = "Digite aqui...",
  type = 'text',
  className = "",
  animation = 'scaleIn',
  delay = 0,
  duration = 0.6,
  disabled = false,
  autoFocus = false,
  onEnterPress
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHasValue(value.length > 0)
  }, [value])

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress()
    }
  }

  return (
    <AnimatedContent
      animation={animation}
      delay={delay}
      duration={duration}
      className={`w-full max-w-md mx-auto ${className}`}
    >
      <div className="group flex flex-col items-center justify-center">
        {/* Input principal */}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full h-18 px-6 py-12 bg-transparent border-2 rounded-lg text-white 
            placeholder-gray-400 focus:outline-none transition-all duration-300 
            text-center text-lg font-medium
            ${isFocused || hasValue 
              ? 'border-green-400 shadow-lg shadow-green-400/20' 
              : 'border-green-400/30 hover:border-green-400/50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
            group-hover:border-green-400/60
          `}
        />
        
        {/* Overlay com gradiente animado */}
        <div className={`
          absolute inset-0 rounded-lg pointer-events-none transition-all duration-300
          ${isFocused || hasValue 
            ? 'bg-gradient-to-r from-green-400/10 via-green-400/5 to-transparent' 
            : 'bg-gradient-to-r from-green-400/5 to-transparent'
          }
        `} />
        
        {/* Efeito de brilho no foco */}
        <div className={`
          absolute inset-0 rounded-lg pointer-events-none transition-all duration-500
          ${isFocused 
            ? 'bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse' 
            : 'opacity-0'
          }
        `} />
        
        {/* Indicador de status */}
        <div className={`
          absolute top-2 right-2 w-2 h-2 rounded-full transition-all duration-300
          ${isFocused 
            ? 'bg-green-400 shadow-lg shadow-green-400/50' 
            : hasValue 
              ? 'bg-green-400/60' 
              : 'bg-green-400/30'
          }
        `} />
      </div>
      
      {/* Texto de ajuda opcional */}
      {isFocused && (
        <AnimatedContent
          animation="fadeIn"
          delay={0}
          duration={0.3}
          className="mt-2 text-center"
        >
          <p className="text-xs text-green-400/70">
            {type === 'email' ? 'Digite um email válido' : 'Pressione Enter para continuar'}
          </p>
        </AnimatedContent>
      )}
    </AnimatedContent>
  )
}

export default InputField
