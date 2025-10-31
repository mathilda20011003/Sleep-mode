import { Sparkles } from "lucide-react"

interface CurrencyProps {
  amount: number
}

export function Currency({ amount }: CurrencyProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Sparkles className="w-8 h-8 text-purple-400 animate-pulse-glow" fill="currentColor" />
        <div className="absolute inset-0 bg-purple-400/50 blur-xl" />
      </div>
      <span className="text-3xl font-bold text-white animate-pulse-glow">{amount}</span>
    </div>
  )
}
