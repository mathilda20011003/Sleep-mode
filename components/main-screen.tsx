"use client"

import { Plus } from "lucide-react"
import Image from "next/image"

export function MainScreen() {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Status Bar */}
      <div className="relative z-10 px-6 pt-3">
        <div className="flex items-center justify-between text-white text-sm">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-2 bg-white rounded-full" />
              <div className="w-0.5 h-3 bg-white rounded-full" />
              <div className="w-0.5 h-4 bg-white rounded-full" />
              <div className="w-0.5 h-4 bg-white rounded-full" />
            </div>
            <svg className="w-4 h-3" viewBox="0 0 16 12" fill="white">
              <path d="M0 4.5C0 2.01 2.01 0 4.5 0h7C13.99 0 16 2.01 16 4.5v3c0 2.49-2.01 4.5-4.5 4.5h-7C2.01 12 0 9.99 0 7.5v-3z" />
            </svg>
            <div className="w-6 h-3 border-2 border-white rounded-sm relative">
              <div className="absolute inset-0.5 bg-white rounded-sm" />
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white rounded-r" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Buttons */}
      <div className="relative z-10 px-6 pt-6">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white rounded-full text-black text-sm font-medium hover:bg-white/90 transition-colors">
            Mathilda
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-black text-sm font-medium hover:bg-white/90 transition-colors">
            Ada
          </button>
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors">
            <Plus className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Currency */}
      <div className="relative z-10 px-6 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center animate-pulse-glow">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            240
          </span>
        </div>
      </div>

      {/* Sprite */}
      <div className="relative z-10 flex items-center justify-center mt-8">
        <div className="relative w-80 h-80 animate-wobble-float">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/future%20self-F26G7Yj023iipFpIIGmMThBDVxyrdA.png"
            alt="Dream Sprite"
            width={320}
            height={320}
            className="w-full h-full object-contain drop-shadow-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl animate-pulse-glow" />
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-24 left-0 right-0 z-10 px-6">
        <p className="text-center text-white/60 text-sm">pooped an hour ago</p>
      </div>

      {/* Input Bar */}
      <div className="absolute bottom-8 left-0 right-0 z-10 px-6">
        <div className="w-full h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/30 transition-colors cursor-pointer" />
      </div>
    </div>
  )
}
