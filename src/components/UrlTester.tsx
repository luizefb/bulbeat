'use client'

import React, { useState } from 'react'
import { youtubeApi } from '@/lib/api'

const UrlTester = () => {
  const [testUrl, setTestUrl] = useState('')
  const [results, setResults] = useState<string[]>([])

  const testUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    'https://m.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtube.com/watch?v=dQw4w9WgXcQ',
  ]

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testUrlValidation = (url: string) => {
    const isValid = youtubeApi.isValidYouTubeUrl(url)
    const videoId = youtubeApi.extractVideoId(url)
    
    addResult(`URL: ${url}`)
    addResult(`Válida: ${isValid}`)
    addResult(`Video ID: ${videoId || 'Não encontrado'}`)
    addResult('---')
  }

  const testAllUrls = () => {
    setResults([])
    testUrls.forEach(testUrlValidation)
  }

  const testCustomUrl = () => {
    if (testUrl.trim()) {
      testUrlValidation(testUrl.trim())
    }
  }

  const testHealthCheck = async () => {
    try {
      addResult('Testando health check...')
      const result = await youtubeApi.healthCheck()
      addResult(`Health check OK: ${JSON.stringify(result)}`)
    } catch (error) {
      addResult(`Health check ERRO: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-md max-h-96 overflow-y-auto">
      <h3 className="text-white font-semibold mb-4">URL Tester (Debug)</h3>
      
      <div className="space-y-2 mb-4">
        <button
          onClick={testAllUrls}
          className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Testar URLs Padrão
        </button>
        
        <button
          onClick={testHealthCheck}
          className="w-full px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          Testar Health Check
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <input
          type="text"
          value={testUrl}
          onChange={(e) => setTestUrl(e.target.value)}
          placeholder="Cole URL do YouTube aqui..."
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm"
        />
        <button
          onClick={testCustomUrl}
          className="w-full px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
        >
          Testar URL Personalizada
        </button>
      </div>

      <div className="space-y-1">
        <h4 className="text-white text-sm font-medium">Resultados:</h4>
        <div className="bg-black/50 rounded p-2 max-h-32 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-gray-400 text-xs">Nenhum teste executado</p>
          ) : (
            results.map((result, index) => (
              <p key={index} className="text-xs text-gray-300 font-mono">
                {result}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default UrlTester
