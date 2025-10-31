"use client"

import { useState, useEffect } from "react"

export function StatusBar() {
  const [currentTime, setCurrentTime] = useState("9:41")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 h-11 bg-black z-50 flex items-center justify-between px-6 text-white text-sm">
      <span className="font-semibold">{currentTime}</span>
      <div className="flex items-center gap-1">
        {/* Signal */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-0.5 bg-white rounded-full" style={{ height: `${i * 2 + 2}px` }} />
          ))}
        </div>
        {/* WiFi */}
        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>
        {/* Battery */}
        <div className="ml-1 w-6 h-3 border border-white rounded-sm relative">
          <div className="absolute inset-0.5 bg-white rounded-sm" />
          <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white rounded-r" />
        </div>
      </div>
    </div>
  )
}
