"use client"

import { Moon, Plus } from "lucide-react"
import { useRef, useEffect } from "react"

interface TeamAvatarsProps {
  isAsleep: boolean
  onInviteFriend: () => void
  onStatusSelect: () => void
  userStatus?: string | null
}

const MOCK_FRIENDS = [
  { id: "you", name: "You", color: "from-purple-500 to-pink-500", initial: "Y", status: null },
  { id: "mathilda", name: "Mathilda", color: "from-blue-400 to-cyan-400", initial: "M", isAsleep: false, status: "🎮" },
  { id: "ada", name: "Ada", color: "from-pink-400 to-rose-400", initial: "A", isAsleep: false, status: "📚" },
  { id: "emma", name: "Emma", color: "from-green-400 to-emerald-400", initial: "E", isAsleep: true, status: null },
  { id: "lucas", name: "Lucas", color: "from-orange-400 to-amber-400", initial: "L", isAsleep: false, status: "🎵" },
  { id: "sophia", name: "Sophia", color: "from-violet-400 to-purple-400", initial: "S", isAsleep: false, status: "🍕" },
  { id: "noah", name: "Noah", color: "from-teal-400 to-cyan-400", initial: "N", isAsleep: true, status: null },
  { id: "olivia", name: "Olivia", color: "from-rose-400 to-pink-400", initial: "O", isAsleep: false, status: "💪" },
  { id: "liam", name: "Liam", color: "from-indigo-400 to-blue-400", initial: "L", isAsleep: false, status: "🎨" },
  { id: "mia", name: "Mia", color: "from-amber-400 to-yellow-400", initial: "M", isAsleep: false, status: "✨" },
]

export function TeamAvatars({ isAsleep, onInviteFriend, onStatusSelect, userStatus }: TeamAvatarsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault()
        container.scrollLeft += e.deltaY
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <div className="relative w-full -mx-6">
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto pb-2 px-6 scrollbar-hide touch-pan-x cursor-grab active:cursor-grabbing"
      >
        {MOCK_FRIENDS.map((friend) => {
          const isYou = friend.id === "you"
          const showSleepIndicator = isYou ? isAsleep : friend.isAsleep
          const displayStatus = isYou ? userStatus : friend.status

          return (
            <div key={friend.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <button onClick={isYou ? onStatusSelect : undefined} className="relative group">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-cyan-400/40 animate-ring-rotate" />

                <div
                  className={`relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br ${friend.color} ${
                    isYou && isAsleep ? "grayscale" : ""
                  } transition-all duration-1000`}
                >
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                    {friend.initial}
                  </div>
                </div>

                {showSleepIndicator && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-900 rounded-full flex items-center justify-center border-2 border-purple-400 animate-scale-in">
                    <Moon className="w-3.5 h-3.5 text-purple-200" />
                  </div>
                )}

                {displayStatus && !showSleepIndicator && (
                  <div className="absolute -top-1 -right-1 text-xl leading-none drop-shadow-lg">{displayStatus}</div>
                )}
              </button>

              <span className={`text-white/80 text-xs font-medium ${isYou ? "text-white" : "text-white/70"} transition-opacity duration-1000 ${
                isYou && isAsleep ? "opacity-50" : ""
              }`}>
                {friend.name}
              </span>
            </div>
          )
        })}

        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onInviteFriend}
            className="relative group w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 transition-all flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm opacity-0 group-hover:opacity-60 transition-opacity" />
            <Plus className="w-7 h-7 text-white/70 relative z-10" />
          </button>
          <span className="text-white/70 text-xs">Invite</span>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
