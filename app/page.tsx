"use client"

import type React from "react"
import { useState } from "react"

import { PhoneFrame } from "@/components/phone-frame"
import { TheHub } from "@/components/the-hub"
import { DreamIngredients, type TeamIngredient } from "@/components/dream-ingredients"
import { SharedDream } from "@/components/shared-dream"
import { SleepMonitor } from "@/components/sleep-monitor"

export type AppScreen = "hub" | "ingredients" | "shared-dream" | "sleep-monitor"
export type SpriteState = "awake" | "sleeping"

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("hub")
  const [spriteState, setSpriteState] = useState<SpriteState>("awake")
  const [selectedIngredients, setSelectedIngredients] = useState<TeamIngredient[]>([])
  const [hasDreamCrystal, setHasDreamCrystal] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center p-4 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle-float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                "--tx": `${(Math.random() - 0.5) * 200}px`,
                "--ty": `${(Math.random() - 0.5) * 200}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <PhoneFrame>
        {currentScreen === "hub" && (
          <TheHub
            spriteState={spriteState}
            hasDreamCrystal={hasDreamCrystal}
            onOpenIngredients={() => setCurrentScreen("ingredients")}
            onOpenDream={() => {
              setCurrentScreen("shared-dream")
              setHasDreamCrystal(false)
            }}
          />
        )}
        {currentScreen === "ingredients" && (
          <DreamIngredients
            onClose={() => setCurrentScreen("hub")}
            onFeedAndSleep={(ingredients) => {
              // Animation plays in DreamIngredients, then we switch to Sleep Monitor
              setSelectedIngredients(ingredients)
              setCurrentScreen("sleep-monitor")
              setSpriteState("sleeping")
            }}
          />
        )}
        {currentScreen === "sleep-monitor" && (
          <SleepMonitor
            onWakeUp={() => {
              setCurrentScreen("hub")
              setSpriteState("awake")
              setHasDreamCrystal(true)
            }}
            onExtendSleep={() => {
              // Extend sleep time - could add more logs or effects
              console.log("Extending sleep...")
            }}
          />
        )}
        {currentScreen === "shared-dream" && (
          <SharedDream
            ingredients={selectedIngredients.map(i => i.ingredient)}
            onClose={() => setCurrentScreen("hub")}
          />
        )}
      </PhoneFrame>
    </main>
  )
}
