import { Moon } from "lucide-react"

interface TeamButtonsProps {
  isAsleep: boolean
}

export function TeamButtons({ isAsleep }: TeamButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center gap-1.5">
        <button className="relative group">
          {/* Glowing ring for "You" */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400/50 bg-gradient-to-br from-purple-400 to-pink-400">
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">Y</div>
          </div>

          {/* Moon indicator when asleep */}
          {isAsleep && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-900 rounded-full flex items-center justify-center border-2 border-purple-500 animate-pulse">
              <Moon className="w-3 h-3 text-purple-200" />
            </div>
          )}
        </button>
        <span className="text-white/80 text-xs font-medium">You</span>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <button className="relative group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 bg-gradient-to-br from-blue-400 to-cyan-400 hover:border-white/50 transition-all">
            <div className="w-full h-full flex items-center justify-center text-white font-bold">M</div>
          </div>
        </button>
        <span className="text-white/70 text-xs">Mathilda</span>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <button className="relative group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 bg-gradient-to-br from-pink-400 to-rose-400 hover:border-white/50 transition-all">
            <div className="w-full h-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </button>
        <span className="text-white/70 text-xs">Ada</span>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/30 hover:border-white/50 transition-all flex items-center justify-center text-white text-xl font-light">
          +
        </button>
        <span className="text-white/70 text-xs opacity-0">Add</span>
      </div>
    </div>
  )
}
