import WeatherIcon from './WeatherIcon'

interface ForecastDay {
  day: string
  condition: string
  max: number
  min: number
}

function ForecastCard({ day }: { day: ForecastDay }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all duration-300 hover:bg-white/10 hover:scale-105">
      <p className="font-bold text-lg text-white">{day.day}</p>
      <WeatherIcon condition={day.condition} className="w-12 h-12 text-white my-1" />
      <div className="flex gap-2 font-semibold">
        <span className="text-white">{day.max}°</span>
        <span className="text-gray-300">{day.min}°</span>
      </div>
    </div>
  )
}

export default function Forecast({ data }: { data: ForecastDay[] }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl h-full">
      <h3 className="text-xl font-bold mb-4 text-center md:text-left text-white">Previsão para 5 dias</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <ForecastCard key={index} day={day} />
        ))}
      </div>
    </div>
  )
}
