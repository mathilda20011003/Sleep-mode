"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles, Flame, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBar } from "@/components/status-bar"

interface SleepMonitorProps {
  onWakeUp: () => void
  onExtendSleep: () => void
}

interface Friend {
  id: string
  name: string
  initial: string
  color: string
}

interface LogEntry {
  time: string
  message: string
}

const ADVENTURE_LOGS = [
  { delay: 2000, time: "01:30 AM", message: "The sprite absorbed your [Tired] ingredient. It felt heavy..." },
  { delay: 5000, time: "02:15 AM", message: "...but then it found Mathilda's [Happy] ingredient! They swirled together and sparked!" },
  { delay: 8000, time: "03:00 AM", message: "Adventure Vibe changed to: Warm." },
  { delay: 11000, time: "03:45 AM", message: "The sprite dodged a \"Nightmare Fragment\" while looking for Ada's [Work]..." },
  { delay: 14000, time: "04:00 AM", message: "All ingredients collected! Brewing the [Dream Crystal/Bottle]!" },
  { delay: 16000, time: "04:01 AM", message: "Mission complete. Returning to The Hub." },
]

export function SleepMonitor({ onWakeUp, onExtendSleep }: SleepMonitorProps) {
  const [spriteHeartRate, setSpriteHeartRate] = useState(68)
  const [spriteTemperature, setSpriteTemperature] = useState(36.8)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [sleepDuration, setSleepDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Friends who are sleeping together
  const friends: Friend[] = [
    { id: "you", name: "You", initial: "Y", color: "from-purple-500 to-pink-500" },
    { id: "mathilda", name: "Mathilda", initial: "M", color: "from-blue-400 to-cyan-400" },
    { id: "ada", name: "Ada", initial: "A", color: "from-pink-400 to-rose-400" },
  ]

  // Simulate sprite heart rate fluctuation (slower when sleeping)
  useEffect(() => {
    const interval = setInterval(() => {
      setSpriteHeartRate((prev) => {
        const change = Math.random() * 4 - 2 // -2 to +2
        return Math.max(55, Math.min(75, prev + change))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Simulate sprite temperature fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpriteTemperature((prev) => {
        const change = Math.random() * 0.2 - 0.1 // -0.1 to +0.1
        return Math.max(36.5, Math.min(37.5, prev + change))
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Add adventure logs progressively
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    ADVENTURE_LOGS.forEach((log) => {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, { time: log.time, message: log.message }])
      }, log.delay)

      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach((t) => clearTimeout(t))
    }
  }, [])

  // Track sleep duration
  useEffect(() => {
    const interval = setInterval(() => {
      setSleepDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Auto play video on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch((error) => {
      console.log("Video autoplay failed:", error)
    })
  }, [])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`
    }
    return `${mins}m ${secs}s`
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Floating stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Status Bar */}
      <StatusBar />

      <div className="relative z-10 h-full flex flex-col pt-14 pb-6">
        {/* Friends Sleeping Together - Top */}
        <div className="flex items-center justify-center gap-2 px-6 mb-3">
          <span className="text-xs text-white/40 font-medium">Sleeping with</span>
          <div className="flex -space-x-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${friend.color} border-2 border-black flex items-center justify-center`}
                title={friend.name}
              >
                <span className="text-white text-xs font-bold">{friend.initial}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sprite's Live Vitals - Top */}
        <div className="px-6 mb-4">
          <h3 className="text-center text-sm text-purple-300/70 font-medium mb-3 tracking-wider">
            — Sprite&apos;s &quot;Live&quot; Vitals —
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Sprite Heart Rate */}
            <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-3 border border-red-500/20 shadow-lg shadow-red-500/10 flex flex-col">
              {/* Row 1: Label */}
              <div className="flex items-center gap-1 mb-2">
                <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
                <span className="text-[10px] text-red-300/80 font-medium">Heart</span>
              </div>
              {/* Row 2: Value */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-red-200 leading-none">{Math.round(spriteHeartRate)}</span>
                <span className="text-xs text-red-300/50 leading-none">bpm</span>
              </div>
              {/* Row 3: Visualization */}
              <div className="h-6 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path
                    d="M0,10 L20,10 L25,5 L30,15 L35,10 L100,10"
                    fill="none"
                    stroke="rgba(252, 165, 165, 0.6)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>

            {/* Sleep Timer - Center */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 flex flex-col">
              {/* Row 1: Label */}
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[10px] text-cyan-300/60 font-medium">Together</span>
              </div>
              {/* Row 2: Value */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-cyan-200 leading-none tabular-nums">{formatDuration(sleepDuration)}</span>
              </div>
              {/* Row 3: Visualization */}
              <div className="h-6 flex items-center justify-center">
                <div className="flex gap-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sprite Temperature */}
            <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 backdrop-blur-sm rounded-xl p-3 border border-orange-500/20 shadow-lg shadow-orange-500/10 flex flex-col">
              {/* Row 1: Label */}
              <div className="flex items-center gap-1 mb-2">
                <Flame className="w-3 h-3 text-orange-400 animate-pulse" />
                <span className="text-[10px] text-orange-300/80 font-medium">Temp</span>
              </div>
              {/* Row 2: Value */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-orange-200 leading-none">{spriteTemperature.toFixed(1)}</span>
                <span className="text-xs text-orange-300/50 leading-none">°C</span>
              </div>
              {/* Row 3: Visualization */}
              <div className="h-6 flex items-end gap-0.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-orange-500/60 to-yellow-400/40 rounded-t animate-pulse"
                    style={{
                      height: `${40 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sleeping Video - Center */}
        <div className="flex items-center justify-center px-6 mb-4">
          <div className="relative w-full max-w-md aspect-square">
            <video
              ref={videoRef}
              src="/sleep video.mp4"
              className="w-full h-full object-contain"
              playsInline
              muted
              loop
              autoPlay
            />
          </div>
        </div>

        {/* Adventure Log - Fixed Bottom Area */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-4 border border-indigo-500/20 shadow-lg shadow-indigo-500/10 h-[180px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-purple-300/80 text-sm font-semibold tracking-wide">— The Adventure Log —</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-xs text-purple-300/50 font-medium">Dreaming</span>
              </div>
            </div>

            <div
              ref={logContainerRef}
              className="flex-1 space-y-2.5 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent pr-2"
            >
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-xs text-purple-300/60 font-medium mb-0.5">{log.time}</div>
                  <div className="text-sm text-white/70 leading-relaxed">{log.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-6">
          <Button
            onClick={onWakeUp}
            className="flex-1 h-14 rounded-full text-white font-semibold text-base shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 border-0"
            style={{
              background: "linear-gradient(135deg, #0C1C8A 0%, #6B4DF5 50%, #A490FE 100%)",
            }}
          >
            Wake Up
          </Button>

          <Button
            onClick={onExtendSleep}
            className="h-14 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-base backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Extend ({Math.floor(sleepDuration / 60)}m)
          </Button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.3);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(168, 85, 247, 0.3) transparent;
        }
      `}</style>
    </div>
  )
}

