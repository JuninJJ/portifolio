const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// Tipos da resposta da API OpenWeatherMap
interface ApiCurrentResponse {
  name: string
  main: { temp: number; humidity: number }
  weather: { main: string }[]
  wind: { speed: number }
}

interface ApiForecastItem {
  dt: number
  main: { temp: number; temp_max: number; temp_min: number }
  weather: { main: string }[]
}

interface ApiForecastResponse {
  list: ApiForecastItem[]
}

// Tipos de saída
export interface CurrentWeather {
  city: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
}

export interface ForecastDay {
  day: string
  condition: string
  max: number
  min: number
}

export interface WeatherResult {
  current: CurrentWeather
  forecast: ForecastDay[]
}

const CONDITION_MAP: Record<string, string> = {
  Clear: 'Sunny',
  Clouds: 'Cloudy',
  Rain: 'Rain',
  Drizzle: 'Rain',
  Thunderstorm: 'Thunderstorm',
  Snow: 'Snow',
  Mist: 'Mist',
  Fog: 'Mist',
  Haze: 'Mist',
}

function mapCondition(apiCondition: string, temperature: number): string {
  if (temperature <= 0 && ['Clear', 'Clouds', 'Rain', 'Drizzle'].includes(apiCondition)) {
    return 'Snow'
  }
  return CONDITION_MAP[apiCondition] ?? 'Cloudy'
}

export async function getWeatherData(city: string): Promise<WeatherResult> {
  if (!city.trim()) throw new Error('Digite o nome de uma cidade')

  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`),
    fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`),
  ])

  if (!currentRes.ok) throw new Error('Cidade não encontrada')
  if (!forecastRes.ok) throw new Error('Previsão não disponível')

  const [currentData, forecastData]: [ApiCurrentResponse, ApiForecastResponse] = await Promise.all([
    currentRes.json(),
    forecastRes.json(),
  ])

  const forecast: ForecastDay[] = forecastData.list
    .filter((_, i) => i % 8 === 0)
    .slice(0, 5)
    .map(item => ({
      day: new Date(item.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'short' }),
      condition: mapCondition(item.weather[0].main, item.main.temp),
      max: Math.round(item.main.temp_max),
      min: Math.round(item.main.temp_min),
    }))

  return {
    current: {
      city: currentData.name,
      temperature: Math.round(currentData.main.temp),
      condition: mapCondition(currentData.weather[0].main, currentData.main.temp),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6),
    },
    forecast,
  }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<string> {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
  if (!res.ok) throw new Error('Localização não encontrada')
  const data: ApiCurrentResponse = await res.json()
  return data.name
}
