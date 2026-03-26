const SunIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Sol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const CloudIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Nuvens" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
)


const CloudRainIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Chuva" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M8 19v1" /><path d="M8 14v1" />
    <path d="M16 19v1" /><path d="M16 14v1" />
    <path d="M12 21v1" /><path d="M12 16v1" />
  </svg>
)

const CloudLightningIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Tempestade" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
    <path d="m13 12-3 5h4l-3 5" />
  </svg>
)

const SnowflakeIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Neve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="17" y1="5" x2="7" y2="19" />
    <line x1="7" y1="5" x2="17" y2="19" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="5" y1="17" x2="19" y2="7" />
    <line x1="5" y1="7" x2="19" y2="17" />
  </svg>
)

const MistIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Névoa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="M2 17h20" />
    <path d="M3 7h18" />
  </svg>
)

const icons: Record<string, React.FC<{ className?: string }>> = {
  Sunny: SunIcon,
  Cloudy: CloudIcon,
  Rain: CloudRainIcon,
  Thunderstorm: CloudLightningIcon,
  Snow: SnowflakeIcon,
  Mist: MistIcon,
}

export default function WeatherIcon({ condition, className = 'w-6 h-6' }: { condition: string; className?: string }) {
  const IconComponent = icons[condition] ?? CloudIcon
  return <IconComponent className={className} />
}
