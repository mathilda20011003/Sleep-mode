"use client"

import { X } from "lucide-react"

interface StatusSelectorProps {
  onClose: () => void
  onSelectStatus: (emoji: string) => void
}

const EMOJI_STATUSES = [
  { emoji: "😴", label: "Sleeping" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "📚", label: "Studying" },
  { emoji: "🎵", label: "Music" },
  { emoji: "🍕", label: "Eating" },
  { emoji: "💪", label: "Working out" },
  { emoji: "🎨", label: "Creating" },
  { emoji: "✨", label: "Vibing" },
  { emoji: "🚀", label: "Busy" },
  { emoji: "☕", label: "Coffee" },
  { emoji: "🎬", label: "Watching" },
  { emoji: "🌙", label: "Dreaming" },
]

export function StatusSelector({ onClose, onSelectStatus }: StatusSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-slide-up">
      <div className="w-full max-w-md bg-gradient-to-b from-purple-900/90 to-black/90 rounded-t-3xl p-6 border-t-2 border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">Set Your Status</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-4 gap-4">
          {EMOJI_STATUSES.map((status) => (
            <button
              key={status.emoji}
              onClick={() => {
                onSelectStatus(status.emoji)
                onClose()
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{status.emoji}</span>
              <span className="text-white/70 text-xs text-center">{status.label}</span>
            </button>
          ))}
        </div>

        {/* Clear Status Button */}
        <button
          onClick={() => {
            onSelectStatus("")
            onClose()
          }}
          className="w-full mt-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-sm font-medium transition-all"
        >
          Clear Status
        </button>
      </div>
    </div>
  )
}
