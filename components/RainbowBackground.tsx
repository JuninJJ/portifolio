'use client'

import { useState, useEffect } from 'react'

interface BarStyle {
  boxShadow: string
  animation: string
  animationDelay: string
  willChange: string
}

export default function RainbowBackground() {
  const [bars, setBars] = useState<BarStyle[]>([])

  useEffect(() => {
    const purple = 'rgb(126, 34, 206)'
    const blue = 'rgb(30, 64, 175)'
    const green = 'rgb(15, 118, 110)'
    const colors = [purple, blue, green]

    const shuffle = (array: string[]) => {
      const arr = [...array]
      let i = arr.length
      while (i !== 0) {
        const j = Math.floor(Math.random() * i--)
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    }

    const animationTime = 90
    const length = 25

    setBars(
      Array.from({ length }).map((_, i) => {
        const c = shuffle(colors)
        return {
          boxShadow: `-130px 0 80px 40px black, -50px 0 50px 25px ${c[0]}, 0 0 50px 25px ${c[1]}, 50px 0 50px 25px ${c[2]}, 130px 0 80px 40px black`,
          animation: `slide ${animationTime}s linear infinite`,
          animationDelay: `-${(i / length) * animationTime}s`,
          willChange: 'transform',
        }
      })
    )
  }, [])

  return (
    <div className="fixed inset-0 -z-20 bg-black overflow-hidden">
      {bars.map((style, i) => (
        <div key={i} className="absolute top-0 h-screen w-0 origin-top-right" style={style} />
      ))}

      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-screen h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  )
}
