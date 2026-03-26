'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { getWeatherData, getWeatherByCoords, type WeatherResult } from '@/lib/weatherService'
import SearchBar from '@/components/weather/SearchBar'
import CurrentWeather from '@/components/weather/CurrentWeather'
import Forecast from '@/components/weather/Forecast'
import Loader from '@/components/weather/Loader'

type LocationStatus = 'idle' | 'using' | 'denied'

const BACKGROUND_MAP: Record<string, string> = {
  Sunny: 'bg-sunny',
  Cloudy: 'bg-cloudy',
  Mist: 'bg-cloudy',
  Rain: 'bg-rain',
  Thunderstorm: 'bg-rain',
  Snow: 'bg-snow',
}

const BG_LAYER_IDS = ['bg-sunny', 'bg-rain', 'bg-cloudy', 'bg-snow']

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle')

  // Garante que a geolocalização seja tentada apenas uma vez
  const locationAttempted = useRef(false)

  const fetchWeather = useCallback(async (city: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getWeatherData(city)
      setWeatherData(data)
    } catch {
      setError('Falha ao buscar dados do clima. Tente novamente.')
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Carrega São Paulo na primeira renderização
  useEffect(() => {
    fetchWeather('São Paulo')
  }, [fetchWeather])

  // Tenta geolocalização uma única vez após o primeiro dado carregar
  useEffect(() => {
    if (!weatherData || locationAttempted.current) return
    locationAttempted.current = true

    if (!navigator.geolocation) {
      setLocationStatus('denied')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          const city = await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
          await fetchWeather(city)
          setLocationStatus('using')
        } catch {
          setLocationStatus('denied')
        }
      },
      () => setLocationStatus('denied')
    )
  }, [weatherData, fetchWeather])

  // Ativa o fundo correto conforme a condição climática
  useEffect(() => {
    const condition = weatherData?.current?.condition
    BG_LAYER_IDS.forEach(id => document.getElementById(id)?.classList.remove('active'))
    if (condition && BACKGROUND_MAP[condition]) {
      document.getElementById(BACKGROUND_MAP[condition])?.classList.add('active')
    }
  }, [weatherData])

  // Gera partículas de chuva, nuvens e neve (apenas uma vez)
  useEffect(() => {
    const rainLayer = document.getElementById('bg-rain')
    if (rainLayer && rainLayer.children.length === 0) {
      for (let i = 0; i < 120; i++) {
        const drop = document.createElement('div')
        drop.className = 'drop'
        drop.style.left = `${Math.random() * 100}%`
        drop.style.animationDuration = `${0.5 + Math.random() * 0.8}s`
        drop.style.animationDelay = `${-Math.random() * 2}s`
        rainLayer.appendChild(drop)
      }
    }

    const cloudLayer = document.getElementById('bg-cloudy')
    if (cloudLayer && cloudLayer.children.length === 0) {
      for (let i = 0; i < 6; i++) {
        const cloud = document.createElement('div')
        cloud.className = 'cloud'
        cloud.style.width = `${200 + Math.random() * 200}px`
        cloud.style.height = `${100 + Math.random() * 100}px`
        cloud.style.top = `${10 + Math.random() * 40}%`
        cloud.style.left = `${-200 - Math.random() * 200}px`
        cloud.style.animationDuration = `${40 + Math.random() * 40}s`
        cloudLayer.appendChild(cloud)
      }
    }

    const snowLayer = document.getElementById('bg-snow')
    if (snowLayer && snowLayer.children.length === 0) {
      const snowflakeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><line x1="12" y1="2" x2="12" y2="22"/><line x1="17" y1="5" x2="7" y2="19"/><line x1="7" y1="5" x2="17" y2="19"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="5" y1="17" x2="19" y2="7"/><line x1="5" y1="7" x2="19" y2="17"/></svg>`
      for (let i = 0; i < 80; i++) {
        const flake = document.createElement('div')
        flake.className = 'snowflake'
        const size = 8 + Math.random() * 12
        flake.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 10}s;animation-delay:-${Math.random() * 10}s;opacity:${0.5 + Math.random() * 0.5}`
        flake.innerHTML = snowflakeSVG
        snowLayer.appendChild(flake)
      }
    }
  }, [])

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/10">
        <header className="mb-6">
          <Link href="/" className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors duration-300 block mb-4">
            ← Voltar ao portfólio
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-2">
            Previsão do Tempo
          </h1>

          {locationStatus === 'denied' && (
            <p className="text-center text-yellow-300 text-sm mb-2">
              Acesso à localização negado. Mostrando São Paulo como padrão.
            </p>
          )}
          {locationStatus === 'using' && (
            <p className="text-center text-green-300 text-sm mb-2">
              Mostrando o clima da sua localização
            </p>
          )}

          <SearchBar onSearch={fetchWeather} />
        </header>

        <main>
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">
              <p className="font-semibold">Ocorreu um erro</p>
              <p>{error}</p>
            </div>
          ) : weatherData ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <CurrentWeather data={weatherData.current} />
              </div>
              <div className="md:col-span-2">
                <Forecast data={weatherData.forecast} />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400 p-4">
              Digite uma cidade para ver a previsão do tempo.
            </p>
          )}
        </main>
      </div>

      {/* Camadas de fundo do clima */}
      <div className="weather-bg">
        <div id="bg-sunny" className="weather-layer sunny">
          <div className="rays" />
          <div className="sun" />
        </div>
        <div id="bg-rain" className="weather-layer rain" />
        <div id="bg-cloudy" className="weather-layer cloudy" />
        <div id="bg-snow" className="weather-layer weather-snow" />
      </div>
    </div>
  )
}
