"use client"

import Image from "next/image"

interface SpriteCenterProps {
  isAsleep: boolean
}

export function SpriteCenter({ isAsleep }: SpriteCenterProps) {
  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-64 h-64 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 rounded-full blur-3xl ${isAsleep ? "animate-breathe" : "animate-pulse-glow"}`}
        />
      </div>

      {/* Sprite Image */}
      <div className={`relative z-10 w-80 h-80 ${isAsleep ? "animate-breathe scale-90" : "animate-wobble-float"}`}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/future%20self-F26G7Yj023iipFpIIGmMThBDVxyrdA.png"
          alt="Dream Sprite"
          width={320}
          height={320}
          className="w-full h-full object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  )
}
