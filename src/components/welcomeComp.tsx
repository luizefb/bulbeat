'use client'

import React, { useState } from 'react'
import { AnimatedContent } from './AnimatedContent'
import { SplitText } from './SplitText'

const WelcomeComp = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="min-h-screen bg-[#060010] flex flex-col items-center justify-center px-4">
      {/* Container principal com animação */}
      <AnimatedContent
        animation="fadeInUp"
        delay={0.2}
        duration={0.8}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Título de boas-vindas com animação de texto */}
        <div className="mb-12">
          <SplitText
            text="Bem-vindo ao Bulbeat"
            animation="fadeInUp"
            delay={0.4}
            duration={0.6}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          />
          <AnimatedContent
            animation="fadeIn"
            delay={1.0}
            duration={0.8}
            className="text-lg md:text-xl text-green-400 opacity-90"
          >
            Sua jornada começa aqui
          </AnimatedContent>
        </div>

        {/* Input centralizado com animação */}
        <AnimatedContent
          animation="scaleIn"
          delay={1.2}
          duration={0.6}
          className="w-full max-w-md mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite seu nome ou email..."
              className="w-full px-6 py-4 bg-transparent border-2 border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300 text-center text-lg"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/5 to-transparent pointer-events-none"></div>
          </div>
        </AnimatedContent>

        {/* Botão de ação com animação */}
        <AnimatedContent
          animation="fadeInUp"
          delay={1.4}
          duration={0.6}
          className="mt-8"
        >
          <button
            onClick={() => {
              if (inputValue.trim()) {
                alert(`Olá, ${inputValue}! Bem-vindo ao Bulbeat!`)
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-400/25"
          >
            Continuar
          </button>
        </AnimatedContent>

        {/* Elementos decorativos */}
        <AnimatedContent
          animation="fadeIn"
          delay={1.6}
          duration={1.0}
          className="mt-16 flex justify-center space-x-4"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-green-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </AnimatedContent>
      </AnimatedContent>
    </div>
  )
}

export default WelcomeComp
