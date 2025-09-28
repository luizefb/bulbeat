'use client'

import React, { useState } from 'react'
import { AnimatedContent } from './AnimatedContent'
import { SplitText } from './SplitText'
import InputField from './inputField'
import ProgressBar from './ProgressBar'

const WelcomeComp = () => {
  const [inputValue, setInputValue] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const downloadVideo = async (url: string) => {
    try {
      setIsDownloading(true)
      setDownloadProgress(0)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 500)

      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      clearInterval(progressInterval)
      setDownloadProgress(100)
      
      // Show success message
      alert('Download simulado concluído!')

    } catch (error) {
      console.error('Download error:', error)
      alert(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
      setDownloadProgress(0)
    } finally {
      setTimeout(() => {
        setIsDownloading(false)
        setDownloadProgress(0)
      }, 2000)
    }
  }

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
            Baixe vídeos do YouTube em MP4
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
            placeholder="Cole a URL do YouTube aqui..."
            type="text"
            animation="scaleIn"
            delay={0}
            duration={0.6}
            autoFocus={true}
            onEnterPress={() => {
              if (inputValue.trim() && !isDownloading) {
                downloadVideo(inputValue.trim())
              }
            }}
          />
        </AnimatedContent>

        {/* Progress bar - aparece quando download está ativo */}
        <AnimatedContent
          animation="fadeInUp"
          delay={0}
          duration={0.6}
          className="flex justify-center"
        >
          <ProgressBar
            isVisible={isDownloading}
            progress={downloadProgress}
            animation="scaleIn"
            delay={0}
            duration={0.4}
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
              if (inputValue.trim() && !isDownloading) {
                downloadVideo(inputValue.trim())
              }
            }}
            disabled={isDownloading || !inputValue.trim()}
            className={`py-2 px-8 mt-4 mb-4 font-semibold rounded-lg transform transition-all duration-300 shadow-lg ${
              isDownloading || !inputValue.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 hover:scale-105 hover:shadow-green-400/25'
            }`}
          >
            {isDownloading ? 'Baixando...' : 'Baixar MP4'}
          </button>
        </AnimatedContent>
      </div>
    </div>
  )
}

export default WelcomeComp
