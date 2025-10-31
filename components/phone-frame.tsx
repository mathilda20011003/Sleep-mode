"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return <div className="w-full h-screen bg-black">{children}</div>
  }

  return (
    <div className="relative">
      {/* iPhone Frame */}
      <div className="relative w-[375px] h-[812px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20" />

        {/* Screen */}
        <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">{children}</div>

        {/* Side buttons */}
        <div className="absolute -left-1 top-24 w-1 h-8 bg-gray-700 rounded-l" />
        <div className="absolute -left-1 top-36 w-1 h-12 bg-gray-700 rounded-l" />
        <div className="absolute -left-1 top-52 w-1 h-12 bg-gray-700 rounded-l" />
        <div className="absolute -right-1 top-36 w-1 h-16 bg-gray-700 rounded-r" />
      </div>
    </div>
  )
}
