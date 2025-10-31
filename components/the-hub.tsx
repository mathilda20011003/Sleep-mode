"use client"

import { Moon, Sparkles } from "lucide-react"
import { useState } from "react"
import { StatusBar } from "@/components/status-bar"
import { TeamAvatars } from "@/components/team-avatars"
import { Currency } from "@/components/currency"
import { SpriteCenter } from "@/components/sprite-center"
import { Button } from "@/components/ui/button"
import { StatusSelector } from "@/components/status-selector"
import { InviteFriends } from "@/components/invite-friends"
import type { SpriteState } from "@/app/page"

interface TheHubProps {
  spriteState: SpriteState
  hasDreamCrystal: boolean
  onOpenIngredients: () => void
  onOpenDream: () => void
}

export function TheHub({
  spriteState,
  hasDreamCrystal,
  onOpenIngredients,
  onOpenDream,
}: TheHubProps) {
  const [showStatusSelector, setShowStatusSelector] = useState(false)
  const [showInviteFriends, setShowInviteFriends] = useState(false)
  const [userStatus, setUserStatus] = useState<string | null>(null)

  const getDynamicText = () => {
    if (spriteState === "sleeping") {
      return "Brewing your dream... Good night Zzz..."
    } else if (hasDreamCrystal) {
      return "Look! See what we brought back from the dream!"
    }
    return "The sprite is waiting for your dream ingredients..."
  }

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
      <StatusBar />

      {/* Top Section */}
      <div className={`relative z-10 px-6 pt-12 transition-opacity duration-1000 ${
        spriteState === "sleeping" ? "opacity-50" : "opacity-100"
      }`}>
        <TeamAvatars
          isAsleep={spriteState === "sleeping"}
          onInviteFriend={() => setShowInviteFriends(true)}
          onStatusSelect={() => setShowStatusSelector(true)}
          userStatus={userStatus}
        />

        <div className="mt-4">
          <Currency amount={240} />
        </div>
      </div>

      {/* Center Sprite */}
      <div className="relative z-10 flex items-center justify-center mt-8">
        <SpriteCenter isAsleep={spriteState === "sleeping"} />

        {/* Magic Bottle Button - Top Right */}
        {hasDreamCrystal && (
          <button
            onClick={onOpenDream}
            className="absolute top-0 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-purple-500/70 group"
          >
            {/* Magic Bottle Icon */}
            <div className="relative">
              <Sparkles className="w-8 h-8 text-white group-hover:animate-pulse" />
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:bg-white/30 transition-all" />
            </div>
            {/* Red Dot Notification */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse shadow-lg shadow-red-500/50" />
          </button>
        )}

        {/* Sprite Speech Bubble - Top Right of Sprite */}
        {hasDreamCrystal && (
          <div className="absolute top-10 right-24 animate-fade-in">
            <div className="relative bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-gray-200">
              <p className="text-gray-800 text-xs font-semibold whitespace-nowrap">
                Check last night&apos;s adventure! ✨
              </p>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45" />
            </div>
          </div>
        )}

        {/* Initial State Speech Bubble - Bedtime Reminder */}
        {spriteState === "awake" && !hasDreamCrystal && (
          <div className="absolute top-10 right-24 animate-fade-in">
            <div className="relative bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-gray-200">
              <p className="text-gray-800 text-xs font-semibold whitespace-nowrap">
                It&apos;s time to sleep! 😴
              </p>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45" />
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Text */}
      <div className="absolute bottom-32 left-0 right-0 z-10 px-6">
        <p className={`text-center text-white/70 text-sm ${
          spriteState === "sleeping" ? "animate-breathe" : "animate-pulse-glow"
        }`}>
          {getDynamicText()}
        </p>
      </div>

      {/* Team Dynamic Text - Only show when sleeping */}
      {spriteState === "sleeping" && (
        <div className="absolute bottom-20 left-0 right-0 z-10 px-6 animate-fade-in">
          <p className="text-center text-purple-300/60 text-xs">
            Team Dynamic
          </p>
        </div>
      )}

      {/* Action Bar */}
      {spriteState === "awake" && !hasDreamCrystal && (
        <div className="absolute bottom-8 left-0 right-0 z-10 px-6">
          <Button
            onClick={onOpenIngredients}
            className="w-full h-16 rounded-full text-white font-medium text-lg shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 relative overflow-hidden backdrop-blur-md"
            style={{
              background: "linear-gradient(135deg, #0C1C8A 0%, #6B4DF5 50%, #A490FE 100%)",
              border: "none",
            }}
          >
            <Moon className="w-6 h-6 mr-2" />
            Sleep Ritual
          </Button>
        </div>
      )}

      {showStatusSelector && (
        <StatusSelector
          onClose={() => setShowStatusSelector(false)}
          onSelectStatus={(emoji) => {
            console.log("[v0] Status selected:", emoji)
            setUserStatus(emoji || null)
          }}
        />
      )}

      {showInviteFriends && <InviteFriends onClose={() => setShowInviteFriends(false)} />}
    </div>
  )
}
