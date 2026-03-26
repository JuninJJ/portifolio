import WeatherIcon from './WeatherIcon'

const conditionPT: Record<string, string> = {
  Sunny: 'Ensolarado',
  Cloudy: 'Nublado',
  Rain: 'Chuva',
  Thunderstorm: 'Tempestade',
  Snow: 'Neve',
  Mist: 'Névoa',
}

interface CurrentWeatherData {
  city: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
}

export default function CurrentWeather({ data }: { data: CurrentWeatherData }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
      <h2 className="text-2xl font-bold mb-2 text-white">{data.city}</h2>
      <div className="flex justify-center mb-4">
        <WeatherIcon condition={data.condition} className="w-20 h-20 text-white" />
      </div>
      <p className="text-5xl font-semibold mb-2 text-white">{data.temperature}°C</p>
      <p className="text-gray-200 capitalize mb-4">{conditionPT[data.condition] ?? data.condition}</p>
      <div className="mt-4 text-sm text-gray-200 space-y-1">
        <p>Umidade: {data.humidity}%</p>
        <p>Vento: {data.windSpeed} km/h</p>
      </div>
    </div>
  )
}
