'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { AnimatedContent } from './AnimatedContent'
import { SplitText } from './SplitText'
import InputField from './inputField'
import ProgressBar from './ProgressBar'
import { useYouTubeDownload } from '@/hooks/useYouTubeDownload'

const WelcomeComp = () => {
  const [inputValue, setInputValue] = useState('')
  const [showVideoInfo, setShowVideoInfo] = useState(false)
  
  const {
    isDownloading,
    progress,
    videoInfo,
    error,
    downloadType,
    getVideoInfo,
    download,
    setDownloadType,
    clearError
  } = useYouTubeDownload()

  const handleDownload = async (url: string) => {
    try {
      clearError()
      await download(url)
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  const handleGetInfo = async (url: string) => {
    try {
      clearError()
      await getVideoInfo(url)
      setShowVideoInfo(true)
    } catch (error) {
      console.error('Get info error:', error)
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
                handleDownload(inputValue.trim())
              }
            }}
          />
        </AnimatedContent>

        {/* Error message */}
        {error && (
          <AnimatedContent
            animation="fadeInUp"
            delay={0}
            duration={0.6}
            className="flex justify-center"
          >
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 max-w-md">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </AnimatedContent>
        )}

        {/* Video info display */}
        {videoInfo && showVideoInfo && (
          <AnimatedContent
            animation="fadeInUp"
            delay={0}
            duration={0.6}
            className="flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-md">
              <Image 
                src={videoInfo.thumbnail} 
                alt={videoInfo.title}
                width={400}
                height={225}
                className="w-full rounded-lg mb-4"
              />
              <h3 className="text-white font-semibold mb-2">{videoInfo.title}</h3>
              <p className="text-green-400 text-sm mb-2">Canal: {videoInfo.uploader}</p>
              <p className="text-gray-300 text-sm mb-4">
                Duração: {Math.floor(videoInfo.duration / 60)}:{(videoInfo.duration % 60).toString().padStart(2, '0')}
              </p>
              <button
                onClick={() => setShowVideoInfo(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                Fechar
              </button>
            </div>
          </AnimatedContent>
        )}

        {/* Download type selector */}
        <AnimatedContent
          animation="fadeInUp"
          delay={1.2}
          duration={0.6}
          className="flex justify-center"
        >
          <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setDownloadType('video')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                downloadType === 'video'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Vídeo MP4
            </button>
            <button
              onClick={() => setDownloadType('audio')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                downloadType === 'audio'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Áudio M4A
            </button>
          </div>
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
            progress={progress}
            animation="scaleIn"
            delay={0}
            duration={0.4}
          />
        </AnimatedContent>

        {/* Action buttons */}
        <AnimatedContent
          animation="fadeInUp"
          delay={1.4}
          duration={0.6}
          className="flex justify-center gap-4"
        >
          <button
            onClick={() => {
              if (inputValue.trim() && !isDownloading) {
                handleGetInfo(inputValue.trim())
              }
            }}
            disabled={isDownloading || !inputValue.trim()}
            className={`py-2 px-6 font-semibold rounded-lg transform transition-all duration-300 shadow-lg ${
              isDownloading || !inputValue.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 hover:scale-105 hover:shadow-blue-400/25'
            }`}
          >
            Ver Info
          </button>
          
          <button
            onClick={() => {
              if (inputValue.trim() && !isDownloading) {
                handleDownload(inputValue.trim())
              }
            }}
            disabled={isDownloading || !inputValue.trim()}
            className={`py-2 px-8 font-semibold rounded-lg transform transition-all duration-300 shadow-lg ${
              isDownloading || !inputValue.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 hover:scale-105 hover:shadow-green-400/25'
            }`}
          >
            {isDownloading ? 'Baixando...' : `Baixar ${downloadType === 'video' ? 'MP4' : 'M4A'}`}
          </button>
        </AnimatedContent>
      </div>
    </div>
  )
}

export default WelcomeComp
