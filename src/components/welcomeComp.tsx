'use client'

import React, { useState } from 'react'
import { AnimatedContent } from './AnimatedContent'
import { SplitText } from './SplitText'
import InputField from './inputField'

const WelcomeComp = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Container principal com animação */}
      <div className="text-center max-w-2xl mx-auto space-y-24">
        {/* Título de boas-vindas com animação de texto */}
        <AnimatedContent
          animation="fadeInUp"
          delay={0.2}
          duration={0.8}
          className="space-y-4"
        >
          <SplitText
            text="Bem-vindo ao Bulbeat"
            animation="fadeInUp"
            delay={0.4}
            duration={0.6}
            className="text-4xl md:text-6xl font-bold text-white"
          />
          <AnimatedContent
            animation="fadeIn"
            delay={1.0}
            duration={0.8}
            className="text-lg md:text-xl text-green-400 opacity-90"
          >
            Sua jornada começa aqui
          </AnimatedContent>
        </AnimatedContent>

        {/* Input centralizado com animação */}
        <AnimatedContent
          animation="scaleIn"
          delay={1.2}
          duration={0.6}
          className="flex justify-center"
        >
          <InputField
            value={inputValue}
            onChange={setInputValue}
            placeholder="Adicione a URL da sua música aqui..."
            type="text"
            animation="scaleIn"
            delay={0}
            duration={0.6}
            autoFocus={true}
            onEnterPress={() => {
              if (inputValue.trim()) {
                alert(`Olá, ${inputValue}! Bem-vindo ao Bulbeat!`)
              }
            }}
          />
        </AnimatedContent>

        {/* Botão de ação com animação */}
        <AnimatedContent
          animation="fadeInUp"
          delay={1.4}
          duration={0.6}
          className="flex justify-center"
        >
          <button
            onClick={() => {
              if (inputValue.trim()) {
                alert(`Olá, ${inputValue}! Bem-vindo ao Bulbeat!`)
              }
            }}
            className="py-2 px-8 mt-4 mb-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-400/25"
          >
            Baixar
          </button>
        </AnimatedContent>
      </div>
    </div>
  )
}

export default WelcomeComp
