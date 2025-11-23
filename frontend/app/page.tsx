'use client'

import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'

// Emotion to emoji mapping
const emotionEmojis: { [key: string]: string } = {
  angry: '😠',
  disgust: '🤢',
  fear: '😨',
  happy: '😊',
  sad: '😢',
  surprise: '😲',
  neutral: '😐',
}

interface PredictionResult {
  label: string
  confidence: number
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload and predict
      uploadImage(file)
    }
  }

  const uploadImage = async (file: File) => {
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // API endpoint - can be configured via environment variable
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to predict emotion')
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      uploadImage(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const resetApp = () => {
    setSelectedImage(null)
    setPrediction(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Emotion Recognition
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Upload an image to detect facial emotions with AI
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-90">
          {!selectedImage ? (
            // Upload Area
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-4 border-dashed border-purple-300 dark:border-purple-600 rounded-2xl p-12 text-center hover:border-purple-500 transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600"
            >
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-20 h-20 mx-auto mb-6 text-purple-500" />
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Upload an Image
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Click to browse or drag and drop an image here
                </p>
              </label>
            </div>
          ) : (
            // Results Area
            <div className="space-y-8">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <button
                  onClick={resetApp}
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
                >
                  Upload New Image
                </button>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
                  <span className="ml-4 text-xl text-gray-700 dark:text-gray-200">
                    Analyzing emotion...
                  </span>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-lg">
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
                </div>
              )}

              {/* Prediction Result */}
              {prediction && !loading && (
                <div className="space-y-6">
                  {/* Emotion Display */}
                  <div className="text-center py-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl">
                    <div className="text-8xl mb-4">
                      {emotionEmojis[prediction.label.toLowerCase()]}
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 capitalize mb-2">
                      {prediction.label}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      Detected Emotion
                    </p>
                  </div>

                  {/* Confidence Progress Bar */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        Confidence Level
                      </span>
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {(prediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      >
                        {prediction.confidence > 0.15 && (
                          <span className="text-white text-xs font-bold">
                            {(prediction.confidence * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {Object.entries(emotionEmojis).map(([emotion, emoji]) => (
                      <div
                        key={emotion}
                        className={`p-4 rounded-xl text-center transition-all duration-300 ${
                          prediction.label.toLowerCase() === emotion
                            ? 'bg-purple-200 dark:bg-purple-800 scale-105 shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}
                      >
                        <div className="text-3xl mb-1">{emoji}</div>
                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {emotion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          <p>Powered by AI • Real-time Emotion Detection</p>
        </div>
      </div>
    </main>
  )
}
