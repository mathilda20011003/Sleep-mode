"use client"

import { useState, useEffect } from "react"
import { Plus, Moon, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBar } from "@/components/status-bar"

export interface TeamIngredient {
  memberId: string
  memberName: string
  memberInitial: string
  memberColor: string
  ingredient: string
  ingredientColor: string
}

interface DreamIngredientsProps {
  onClose: () => void
  onFeedAndSleep: (allIngredients: TeamIngredient[]) => void
}

const presetIngredients = [
  { label: "Tired", color: "from-blue-300 to-blue-400" },
  { label: "Happy", color: "from-yellow-300 to-amber-300" },
  { label: "Work", color: "from-slate-300 to-gray-300" },
  { label: "Excited", color: "from-orange-300 to-rose-300" },
  { label: "Calm", color: "from-emerald-300 to-teal-300" },
  { label: "Creative", color: "from-purple-300 to-violet-300" },
  { label: "Anxious", color: "from-indigo-300 to-blue-300" },
  { label: "Peaceful", color: "from-cyan-300 to-sky-300" },
  { label: "Energetic", color: "from-lime-300 to-green-300" },
  { label: "Dreamy", color: "from-pink-300 to-fuchsia-300" },
  { label: "Focused", color: "from-amber-300 to-orange-300" },
  { label: "Playful", color: "from-rose-300 to-pink-300" },
  { label: "Curious", color: "from-violet-300 to-purple-300" },
  { label: "Grateful", color: "from-teal-300 to-cyan-300" },
  { label: "Inspired", color: "from-fuchsia-300 to-purple-300" },
]

// Team members data - ingredients will be added dynamically
const TEAM_MEMBERS_CONFIG = [
  { id: "you", name: "You", initial: "Y", color: "from-purple-500 to-pink-500" },
  {
    id: "mathilda",
    name: "Mathilda",
    initial: "M",
    color: "from-blue-400 to-cyan-400",
    targetIngredients: ["Happy", "Creative", "Peaceful"],
    delays: [2000, 4000, 6000] // When to add each ingredient (ms)
  },
  {
    id: "ada",
    name: "Ada",
    initial: "A",
    color: "from-pink-400 to-rose-400",
    targetIngredients: ["Excited", "Playful", "Dreamy"],
    delays: [3000, 5500, 7500] // When to add each ingredient (ms)
  },
]

export function DreamIngredients({ onClose, onFeedAndSleep }: DreamIngredientsProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [customInput, setCustomInput] = useState("")
  const [brewingProgress, setBrewingProgress] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)
  const [allIngredientsData, setAllIngredientsData] = useState<TeamIngredient[]>([])
  const [visibleCapsules, setVisibleCapsules] = useState<number[]>([])
  const [animationMessage, setAnimationMessage] = useState("")
  const [animationStage, setAnimationStage] = useState<"capsules" | "video">("capsules")

  // Track team members' dynamic ingredient selection
  const [teamIngredients, setTeamIngredients] = useState<Record<string, string[]>>({
    you: [],
    mathilda: [],
    ada: [],
  })

  // Simulate team members selecting ingredients over time
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    TEAM_MEMBERS_CONFIG.forEach((member) => {
      if (member.id === "you" || !member.targetIngredients || !member.delays) return

      member.delays.forEach((delay, index) => {
        const timeout = setTimeout(() => {
          setTeamIngredients((prev) => ({
            ...prev,
            [member.id]: [...prev[member.id], member.targetIngredients![index]],
          }))
        }, delay)

        timeouts.push(timeout)
      })
    })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  // Calculate brewing window progress (8 PM to 4 AM = 8 hours)
  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()

      // Convert to minutes since 8 PM (20:00)
      let minutesSince8PM
      if (hours >= 20) {
        // Same day after 8 PM
        minutesSince8PM = (hours - 20) * 60 + minutes
      } else if (hours < 4) {
        // Next day before 4 AM
        minutesSince8PM = (4 + hours) * 60 + minutes
      } else {
        // Outside brewing window
        minutesSince8PM = 0
      }

      // Total window is 8 hours = 480 minutes
      const progress = Math.min((minutesSince8PM / 480) * 100, 100)
      setBrewingProgress(progress)
    }

    calculateProgress()
    const interval = setInterval(calculateProgress, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const toggleIngredient = (label: string) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((i) => i !== label))
    } else if (selected.length < 3) {
      setSelected([...selected, label])
    }
  }

  const addCustom = () => {
    if (customInput.trim() && selected.length < 3 && !selected.includes(customInput.trim())) {
      setSelected([...selected, customInput.trim()])
      setCustomInput("")
    }
  }

  const handleSubmit = () => {
    if (selected.length > 0) {
      // Combine all team members' ingredients into one array
      const allIngredients: TeamIngredient[] = []

      TEAM_MEMBERS_CONFIG.forEach((member) => {
        const memberIngredients = member.id === "you" ? selected : teamIngredients[member.id]

        memberIngredients.forEach((ingredientLabel) => {
          // Find the color for this ingredient
          const ingredientData = presetIngredients.find((p) => p.label === ingredientLabel)

          allIngredients.push({
            memberId: member.id,
            memberName: member.name,
            memberInitial: member.initial,
            memberColor: member.color,
            ingredient: ingredientLabel,
            ingredientColor: ingredientData?.color || "from-purple-300 to-pink-300",
          })
        })
      })

      console.log("[DreamIngredients] Starting animation with", allIngredients.length, "ingredients")
      // Store the data and show animation
      setAllIngredientsData(allIngredients)
      setShowAnimation(true)
    }
  }

  // Handle capsule animation
  useEffect(() => {
    if (!showAnimation || animationStage !== "capsules") return

    console.log("[DreamIngredients] Starting capsule animation with", allIngredientsData.length, "ingredients")
    const timeouts: NodeJS.Timeout[] = []

    // Show message immediately
    setAnimationMessage("Your ingredients are being absorbed by the sprite...")

    // Animate capsules flying in one by one
    allIngredientsData.forEach((ingredient, index) => {
      const timeout = setTimeout(() => {
        console.log("[Animation] Showing capsule", index, ":", ingredient.ingredient)
        setVisibleCapsules((prev) => [...prev, index])
      }, index * 300) // Stagger each capsule by 300ms
      timeouts.push(timeout)
    })

    // Update message during animation
    const messageTimeout1 = setTimeout(() => {
      setAnimationMessage("They will become the material for its dream adventure...")
    }, allIngredientsData.length * 300 + 500)
    timeouts.push(messageTimeout1)

    // Transition to video stage
    const videoTimeout = setTimeout(() => {
      console.log("[DreamIngredients] Transitioning to video stage")
      setAnimationStage("video")
      setAnimationMessage("The sprite is absorbing the energy...")
    }, allIngredientsData.length * 300 + 2500) // Wait 2.5s after last capsule
    timeouts.push(videoTimeout)

    return () => {
      timeouts.forEach((t) => clearTimeout(t))
    }
  }, [showAnimation, animationStage, allIngredientsData])

  // Handle video stage messages
  useEffect(() => {
    if (animationStage !== "video") return

    const timeouts: NodeJS.Timeout[] = []

    // Initial message
    setAnimationMessage("The sprite is absorbing the energy...")

    // Update messages during video playback
    const message1 = setTimeout(() => {
      setAnimationMessage("Your emotions are transforming into dream essence...")
    }, 2000)
    timeouts.push(message1)

    const message2 = setTimeout(() => {
      setAnimationMessage("Preparing for the dream adventure...")
    }, 4000)
    timeouts.push(message2)

    return () => {
      timeouts.forEach((t) => clearTimeout(t))
    }
  }, [animationStage])

  // Handle video playback and completion
  const handleVideoEnd = () => {
    console.log("[DreamIngredients] Video ended, transitioning to sleep monitor")
    onFeedAndSleep(allIngredientsData)
  }

  return (
    <div className="relative w-full h-full bg-black animate-slide-up">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 to-black" />

      {/* Status Bar */}
      <StatusBar />

      {/* Animation Overlay */}
      {showAnimation && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center">
          {/* Capsule Flying Stage */}
          {animationStage === "capsules" && (
            <>
              {/* Flying Capsules */}
              {visibleCapsules.map((index) => {
                const ingredient = allIngredientsData[index]
                return (
                  <div
                    key={index}
                    className="absolute animate-capsule-fly"
                    style={{
                      left: "50%",
                      bottom: "-80px",
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    {/* Energy Capsule */}
                    <div
                      className={`px-6 py-3 bg-gradient-to-r ${ingredient.ingredientColor} rounded-full text-gray-800 font-medium shadow-lg backdrop-blur-sm relative`}
                    >
                      {/* Comet tail effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/60 to-transparent blur-xl scale-150 -z-10" />

                      {/* Ingredient text */}
                      <span className="relative z-10">{ingredient.ingredient}</span>

                      {/* Particle effects */}
                      <div className="absolute -inset-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-particle"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 0.5}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          )}

          {/* Video Stage */}
          {animationStage === "video" && (
            <div className="flex flex-col items-center justify-center w-full h-full animate-fade-in">
              {/* Video Container */}
              <div className="relative w-full max-w-lg aspect-square mb-8">
                <video
                  src="/input video.mp4"
                  className="w-full h-full object-contain"
                  playsInline
                  muted
                  autoPlay
                  onEnded={handleVideoEnd}
                />
              </div>
            </div>
          )}

          {/* Animation Message */}
          <div className="absolute bottom-32 left-0 right-0 text-center px-6 animate-fade-in">
            <p className="text-white/80 text-base font-medium leading-relaxed tracking-wide">
              {animationMessage}
            </p>
          </div>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-500 ${
          showAnimation ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <X className="w-5 h-5" />
      </button>

      <div className={`relative z-10 h-full flex flex-col p-6 pt-16 transition-opacity duration-500 ${
        showAnimation ? "opacity-0" : "opacity-100"
      }`}>
        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-4 animate-pulse-glow">
          Tonight&apos;s dream ingredients?
        </h2>

        {/* Team Avatars */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {TEAM_MEMBERS_CONFIG.map((member) => {
            const isYou = member.id === "you"
            const memberIngredients = isYou ? selected : teamIngredients[member.id]
            const isComplete = memberIngredients.length >= 3
            const isSelecting = !isYou && memberIngredients.length > 0 && !isComplete

            return (
              <div key={member.id} className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  {/* Rotating gradient ring - show for active members */}
                  {(isYou || isSelecting) && (
                    <div className="absolute -inset-1 rounded-full">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-ring-rotate opacity-60" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 blur-lg opacity-80" />
                    </div>
                  )}

                  {/* Avatar */}
                  <div
                    className={`relative w-14 h-14 rounded-full overflow-hidden border-2 ${
                      isYou || isSelecting ? "border-white/30" : "border-white/20"
                    } bg-gradient-to-br ${member.color} ${
                      isComplete && !isYou ? "grayscale opacity-60" : ""
                    } transition-all duration-500`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                      {member.initial}
                    </div>
                  </div>

                  {/* Checkmark for completed members */}
                  {isComplete && !isYou && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border-2 border-black animate-scale-in">
                      <Check className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium ${isYou || isSelecting ? "text-white" : "text-white/60"} transition-colors duration-300`}>
                  {member.name}
                </span>
              </div>
            )
          })}
        </div>

        {/* Brewing Window Timer */}
        <div className="mb-6 px-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm font-medium flex items-center gap-2">
                <Moon className="w-4 h-4 text-purple-300" />
                Brewing Window
              </span>
              <span className="text-white/60 text-xs">Closes at 4:00 AM</span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${brewingProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer" />
              </div>
            </div>
          </div>
        </div>

        {/* Ingredient Cloud - Horizontal Scrolling */}
        <div className="flex-1 relative mb-6 overflow-hidden">
          <div className="absolute inset-0 flex flex-col gap-4 justify-center">
            {/* First Row */}
            <div className="flex gap-3 animate-scroll-right">
              {presetIngredients.slice(0, 5).map((ingredient) => (
                <button
                  key={ingredient.label}
                  onClick={() => toggleIngredient(ingredient.label)}
                  className={`px-6 py-3 bg-gradient-to-r ${ingredient.color} rounded-full text-gray-800 font-medium shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0 backdrop-blur-sm ${
                    selected.includes(ingredient.label) ? "ring-4 ring-white/80 scale-110" : "opacity-90"
                  }`}
                  style={{
                    boxShadow: selected.includes(ingredient.label)
                      ? "0 8px 32px rgba(255, 255, 255, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {ingredient.label}
                </button>
              ))}
              {/* Duplicate for seamless loop */}
              {presetIngredients.slice(0, 5).map((ingredient) => (
                <button
                  key={`${ingredient.label}-dup1`}
                  onClick={() => toggleIngredient(ingredient.label)}
                  className={`px-6 py-3 bg-gradient-to-r ${ingredient.color} rounded-full text-gray-800 font-medium shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0 backdrop-blur-sm ${
                    selected.includes(ingredient.label) ? "ring-4 ring-white/80 scale-110" : "opacity-90"
                  }`}
                  style={{
                    boxShadow: selected.includes(ingredient.label)
                      ? "0 8px 32px rgba(255, 255, 255, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {ingredient.label}
                </button>
              ))}
            </div>

            {/* Second Row */}
            <div className="flex gap-3 animate-scroll-right-slow">
              {presetIngredients.slice(5, 10).map((ingredient) => (
                <button
                  key={ingredient.label}
                  onClick={() => toggleIngredient(ingredient.label)}
                  className={`px-6 py-3 bg-gradient-to-r ${ingredient.color} rounded-full text-gray-800 font-medium shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0 backdrop-blur-sm ${
                    selected.includes(ingredient.label) ? "ring-4 ring-white/80 scale-110" : "opacity-90"
                  }`}
                  style={{
                    boxShadow: selected.includes(ingredient.label)
                      ? "0 8px 32px rgba(255, 255, 255, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {ingredient.label}
                </button>
              ))}
              {/* Duplicate for seamless loop */}
              {presetIngredients.slice(5, 10).map((ingredient) => (
                <button
                  key={`${ingredient.label}-dup2`}
                  onClick={() => toggleIngredient(ingredient.label)}
                  className={`px-6 py-3 bg-gradient-to-r ${ingredient.color} rounded-full text-gray-800 font-medium shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0 backdrop-blur-sm ${
                    selected.includes(ingredient.label) ? "ring-4 ring-white/80 scale-110" : "opacity-90"
                  }`}
                  style={{
                    boxShadow: selected.includes(ingredient.label)
                      ? "0 8px 32px rgba(255, 255, 255, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {ingredient.label}
                </button>
              ))}
            </div>

            {/* Third Row */}
            <div className="flex gap-3 animate-scroll-right-fast">
              {presetIngredients.slice(10, 15).map((ingredient) => (
                <button
                  key={ingredient.label}
                  onClick={() => toggleIngredient(ingredient.label)}
                  className={`px-6 py-3 bg-gradient-to-r ${ingredient.color} rounded-full text-gray-800 font-medium shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0 backdrop-blur-sm ${
                    selected.includes(ingredient.label) ? "ring-4 ring-white/80 scale-110" : "opacity-90"
                  }`}
                  style={{
                    boxShadow: selected.includes(ingredient.label)
                      ? "0 8px 32px rgba(255, 255, 255, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {ingredient.label}
                </button>
              ))}
              {/* Duplicate for seamless loop */}
              {presetIngredients.slice(10, 15).map((ingredient) => (
                <button
                  key={`${ingredient.label}-dup3`}
                  onClick={() => toggleIngredient(ingredient.label)}
                  className={`px-6 py-3 bg-gradient-to-r ${ingredient.color} rounded-full text-gray-800 font-medium shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0 backdrop-blur-sm ${
                    selected.includes(ingredient.label) ? "ring-4 ring-white/80 scale-110" : "opacity-90"
                  }`}
                  style={{
                    boxShadow: selected.includes(ingredient.label)
                      ? "0 8px 32px rgba(255, 255, 255, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {ingredient.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Ingredients Display - Ultra Compact with Animation */}
        {(selected.length > 0 || Object.values(teamIngredients).some(arr => arr.length > 0)) && (
          <div className="mb-3 px-4">
            <div className="flex items-center gap-1 justify-center flex-wrap text-xs">
              {TEAM_MEMBERS_CONFIG.map((member, memberIndex) => {
                const isYou = member.id === "you"
                const ingredients = isYou ? selected : teamIngredients[member.id]
                const isComplete = ingredients.length >= 3

                if (ingredients.length === 0) return null

                return (
                  <div key={member.id} className="inline-flex items-center gap-1 animate-fade-in">
                    {/* Compact avatar dot */}
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-br ${member.color} ${
                        isComplete && !isYou ? "grayscale opacity-40" : "opacity-90"
                      } transition-all duration-500`}
                    />

                    {/* Ingredients as inline text with separators */}
                    {ingredients.map((item, index) => (
                      <span key={item} className="inline-flex items-center animate-slide-in-right">
                        <button
                          onClick={() => isYou && toggleIngredient(item)}
                          className={`transition-all ${
                            isYou
                              ? "text-purple-300 hover:text-purple-200 underline decoration-dotted underline-offset-2 cursor-pointer"
                              : isComplete
                              ? "text-white/40"
                              : "text-white/60"
                          }`}
                        >
                          {item}
                        </button>
                        {index < ingredients.length - 1 && (
                          <span className="text-white/30 mx-0.5">,</span>
                        )}
                      </span>
                    ))}

                    {/* Separator between members */}
                    {memberIndex < TEAM_MEMBERS_CONFIG.length - 1 &&
                     TEAM_MEMBERS_CONFIG.slice(memberIndex + 1).some(m => {
                       const nextIngredients = m.id === "you" ? selected : teamIngredients[m.id]
                       return nextIngredients.length > 0
                     }) && (
                      <span className="text-white/20 mx-1.5">•</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Custom Entry */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustom()}
                placeholder="Add a custom ingredient..."
                className="w-full h-12 bg-white/5 backdrop-blur-md border-2 border-purple-500/30 text-white placeholder:text-white/40 rounded-full px-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 animate-input-glow"
                disabled={selected.length >= 3}
              />
            </div>
            <Button
              onClick={addCustom}
              disabled={!customInput.trim() || selected.length >= 3}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/10"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-white/50 text-center mt-2">Select up to 3 ingredients ({selected.length}/3)</p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="w-full h-16 rounded-full text-white font-medium text-lg shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md border-0"
          style={{
            background:
              selected.length === 0
                ? "rgba(107, 77, 245, 0.3)"
                : "linear-gradient(135deg, #0C1C8A 0%, #6B4DF5 50%, #A490FE 100%)",
          }}
        >
          <Moon className="w-6 h-6 mr-2" />
          Feed & Go to Sleep
        </Button>
      </div>
    </div>
  )
}
