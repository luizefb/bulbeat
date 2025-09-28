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
      <div className="group relative flex flex-col items-center justify-center">
        {/* Container do input com posicionamento relativo */}
        <div className="relative w-full mt-4">
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
              w-full py-4 px-4 pr-12 mt-2 bg-transparent border-2 rounded-xl text-white 
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
          
          {/* Overlay com gradiente animado - mais arredondado */}
          <div className={`
            absolute inset-0 rounded-xl pointer-events-none transition-all duration-300
            ${isFocused || hasValue 
              ? 'bg-gradient-to-r from-green-400/10 via-green-400/5 to-transparent' 
              : 'bg-gradient-to-r from-green-400/5 to-transparent'
            }
          `} />
          
          {/* Efeito de brilho no foco - mais suave e arredondado */}
          <div className={`
            absolute inset-0 rounded-xl pointer-events-none transition-all duration-500
            ${isFocused 
              ? 'bg-gradient-to-r from-transparent via-green-400/15 to-transparent animate-pulse' 
              : 'opacity-0'
            }
          `} />
          
          {/* Indicador de status - posicionado dentro do input */}
          <div className={`
            absolute top-1/2 right-3 transform -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-300
            ${isFocused 
              ? 'bg-green-400 shadow-lg shadow-green-400/50 animate-pulse' 
              : hasValue 
                ? 'bg-green-400/70' 
                : 'bg-green-400/40'
            }
          `} />
        </div>
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
