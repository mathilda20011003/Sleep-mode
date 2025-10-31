"use client"

import { Sparkles } from "lucide-react"

interface DreamCrystalProps {
  onClick: () => void
}

export function DreamCrystal({ onClick }: DreamCrystalProps) {
  return (
    <button onClick={onClick} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group z-30">
      <div className="relative w-24 h-24 animate-float">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-2xl opacity-75 animate-pulse-glow" />

        {/* Crystal with rotation */}
        <div className="relative w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-2xl rotate-45 shadow-2xl group-hover:scale-110 transition-transform duration-300 animate-crystal-rotate">
          <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-xl" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-8 h-8 text-white animate-pulse-glow" />
        </div>

        {/* Particle effects */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse-glow"
            style={{
              top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
              left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </button>
  )
}
