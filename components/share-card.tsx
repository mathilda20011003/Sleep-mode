"use client"

import { X, Download } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

interface ShareCardProps {
  type: "photo" | "video" | "audio"
  ingredients: string[]
  onClose: () => void
}

// Mock team members data
const TEAM_MEMBERS = [
  { id: "you", name: "You", avatar: "Y", color: "bg-purple-500" },
  { id: "matilda", name: "Matilda", avatar: "M", color: "bg-pink-500" },
  { id: "ada", name: "Ada", avatar: "A", color: "bg-cyan-500" },
]

export function ShareCard({ type, ingredients, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Split ingredients into 3 per page
  const ingredientsPerPage = 3
  const page1Ingredients = ingredients.slice(0, ingredientsPerPage)
  const page2Ingredients = ingredients.slice(ingredientsPerPage, ingredientsPerPage * 2)
  const page3Ingredients = ingredients.slice(ingredientsPerPage * 2)

  // Determine which ingredients to show based on type
  const currentIngredients = 
    type === "photo" ? page1Ingredients :
    type === "video" ? page2Ingredients :
    page3Ingredients

  const handleDownload = async () => {
    // TODO: Implement download functionality
    console.log("Download card")
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <Download className="w-5 h-5 text-white" />
        <span className="text-white text-sm font-medium">Download</span>
      </button>

      {/* Share Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Photo Card */}
        {type === "photo" && (
          <div className="relative">
            {/* Photo with white border */}
            <div className="relative bg-white p-4">
              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-purple-100 to-pink-100 rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/future%20self-F26G7Yj023iipFpIIGmMThBDVxyrdA.png"
                  alt="Dream visualization"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                  <Image
                    src="/Frankie.png"
                    alt="Frankie"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">Frankie</h3>
                  <p className="text-xs text-gray-500">Your Dream Sprite</p>
                </div>
              </div>

              {/* Story */}
              <p className="text-sm text-gray-800 leading-relaxed">
                I&apos;m back! I took your dream energy and embarked on a magical adventure.
                At the Starlight Gate, I faced my first challenge - unlocking the portal with the emotional power you gave me.
                When I infused{" "}
                {currentIngredients.map((ing, i) => (
                  <span key={i}>
                    <span className="font-semibold text-purple-600">&apos;{ing}&apos;</span>
                    {i < currentIngredients.length - 2 && ", "}
                    {i === currentIngredients.length - 2 && " and "}
                  </span>
                ))}{" "}
                into the gate, brilliant light illuminated the entire universe, and the door slowly opened...
              </p>

              {/* Ingredients Tags */}
              <div className="flex flex-wrap gap-2">
                {currentIngredients.map((ingredient, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Dreamed by:</span>
                  <div className="flex -space-x-2">
                    {TEAM_MEMBERS.map((member) => (
                      <div
                        key={member.id}
                        className={`w-6 h-6 ${member.color} rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-pink-500">
                  <span className="text-xs">📍</span>
                  <span className="text-xs font-medium">Dreamscape</span>
                </div>
              </div>
              <div className="text-center text-xs text-gray-400">
                October 30, 2025
              </div>
            </div>
          </div>
        )}

        {/* Video Card - Film Strip Style */}
        {type === "video" && (
          <div className="relative">
            {/* Film Strip Header */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
              {/* Film Perforations */}
              <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`left-${i}`} className="w-2 h-2 bg-gray-700 rounded-sm" />
                ))}
              </div>
              <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-around py-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`right-${i}`} className="w-2 h-2 bg-gray-700 rounded-sm" />
                ))}
              </div>

              {/* Video Thumbnail */}
              <div className="relative mx-3">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-600 rounded" />
                <div className="relative w-full aspect-[4/3] bg-black rounded overflow-hidden flex items-center justify-center">
                  <div className="text-white text-4xl">🎬</div>
                </div>
              </div>

              {/* Film Label */}
              <div className="mt-2 text-center text-yellow-500 text-xs font-mono">
                ◄◄ DREAM REEL 001 ►►
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                  <Image
                    src="/Frankie.png"
                    alt="Frankie"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">Frankie</h3>
                  <p className="text-xs text-gray-500">Your Dream Sprite</p>
                </div>
              </div>

              {/* Story */}
              <p className="text-sm text-gray-800 leading-relaxed">
                Beyond the gate, I ventured deep into the Dream Forest.
                Every tree whispered ancient secrets, and each leaf sparkled with memories.
                Using your{" "}
                {currentIngredients.map((ing, i) => (
                  <span key={i}>
                    <span className="font-semibold text-purple-600">&apos;{ing}&apos;</span>
                    {i < currentIngredients.length - 2 && ", "}
                    {i === currentIngredients.length - 2 && " and "}
                  </span>
                ))}{" "}
                I awakened the Forest Guardian, who revealed the hidden path to the Dream Ocean...
              </p>

              {/* Ingredients Tags */}
              <div className="flex flex-wrap gap-2">
                {currentIngredients.map((ingredient, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Dreamed by:</span>
                  <div className="flex -space-x-2">
                    {TEAM_MEMBERS.map((member) => (
                      <div
                        key={member.id}
                        className={`w-6 h-6 ${member.color} rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-pink-500">
                  <span className="text-xs">📍</span>
                  <span className="text-xs font-medium">Dreamscape</span>
                </div>
              </div>
              <div className="text-center text-xs text-gray-400">
                October 30, 2025
              </div>
            </div>
          </div>
        )}

        {/* Audio Card - Vinyl Record Style */}
        {type === "audio" && (
          <div className="relative">
            {/* Vinyl Record Header */}
            <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-6">
              {/* Wood Texture */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
              }} />

              {/* Vinyl Record */}
              <div className="relative mx-auto w-48 h-48">
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-full shadow-2xl border-4 border-gray-800">
                  {/* Grooves */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border border-gray-700/30"
                      style={{ margin: `${i * 7}px` }}
                    />
                  ))}

                  {/* Center Label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-full shadow-lg flex flex-col items-center justify-center border-4 border-gray-800">
                      <span className="text-white text-[10px] font-bold">DREAM</span>
                      <span className="text-white text-[6px] opacity-80">RECORDS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Label */}
              <div className="mt-3 text-center">
                <span className="inline-block bg-amber-100 px-3 py-1 rounded-full text-amber-900 text-xs font-bold">
                  🎵 SIDE A
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                  <Image
                    src="/Frankie.png"
                    alt="Frankie"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-800">Frankie</h3>
                  <p className="text-xs text-gray-500">Your Dream Sprite</p>
                </div>
              </div>

              {/* Story */}
              <p className="text-sm text-gray-800 leading-relaxed">
                Finally, I reached the shores of the Dream Ocean - where a Crystal Palace woven from starlight stood.
                At its heart, I discovered the most precious fragments of your dreams.
                With your final{" "}
                {currentIngredients.map((ing, i) => (
                  <span key={i}>
                    <span className="font-semibold text-purple-600">&apos;{ing}&apos;</span>
                    {i < currentIngredients.length - 2 && ", "}
                    {i === currentIngredients.length - 2 && " and "}
                  </span>
                ))}{" "}
                I restored these fragments, and now they shine brighter than the stars... ✨
              </p>

              {/* Ingredients Tags */}
              <div className="flex flex-wrap gap-2">
                {currentIngredients.map((ingredient, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Dreamed by:</span>
                  <div className="flex -space-x-2">
                    {TEAM_MEMBERS.map((member) => (
                      <div
                        key={member.id}
                        className={`w-6 h-6 ${member.color} rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-pink-500">
                  <span className="text-xs">📍</span>
                  <span className="text-xs font-medium">Dreamscape</span>
                </div>
              </div>
              <div className="text-center text-xs text-gray-400">
                October 30, 2025
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

