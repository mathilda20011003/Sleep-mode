"use client"

import { X, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ShareCard } from "./share-card"

interface SharedDreamProps {
  ingredients: string[]
  onClose: () => void
}

// Mock team members data
const TEAM_MEMBERS = [
  { id: "you", name: "You", avatar: "Y", color: "bg-purple-500" },
  { id: "matilda", name: "Matilda", avatar: "M", color: "bg-pink-500" },
  { id: "ada", name: "Ada", avatar: "A", color: "bg-cyan-500" },
]

export function SharedDream({ ingredients, onClose }: SharedDreamProps) {
  const [showContent, setShowContent] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(2)
  const [showComments, setShowComments] = useState(false)
  const [currentPage, setCurrentPage] = useState(0) // 0: photo, 1: video, 2: audio
  const [showShareCard, setShowShareCard] = useState(false)

  useEffect(() => {
    // Crystal shatter animation then show content
    setTimeout(() => setShowContent(true), 500)
  }, [])

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikeCount(prev => prev - 1)
    } else {
      setLiked(true)
      setLikeCount(prev => prev + 1)
    }
  }

  const handleShare = () => {
    setShowShareCard(true)
  }

  const getShareCardType = (): "photo" | "video" | "audio" => {
    if (currentPage === 0) return "photo"
    if (currentPage === 1) return "video"
    return "audio"
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-amber-50 to-amber-100 overflow-y-auto">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 bg-amber-50/95 backdrop-blur-sm border-b border-amber-200/50 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-amber-800 hover:text-amber-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-sm font-semibold text-amber-900">Dream Postcard</h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Postcard Content */}
      {showContent && (
        <div className="p-4 pb-24 animate-fade-in">
          {/* Postcard Frame */}
          <div className="relative bg-white rounded-lg shadow-2xl overflow-visible p-4">
            {/* Page 1: Dream Photo */}
            {currentPage === 0 && (
              <div className="relative bg-white p-3 rounded-lg shadow-lg">
                {/* Tape Decorations - on top of photo border */}
                <div className="absolute -top-2 left-8 w-16 h-8 bg-amber-300/70 rotate-12 z-10 shadow-md" />
                <div className="absolute -top-2 right-8 w-16 h-8 bg-amber-300/70 -rotate-12 z-10 shadow-md" />

                {/* Photo */}
                <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-purple-100 to-pink-100 rounded overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/future%20self-F26G7Yj023iipFpIIGmMThBDVxyrdA.png"
                    alt="Dream visualization"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Page 2: Dream Video - Film Strip Style */}
            {currentPage === 1 && (
              <div className="relative space-y-4">
                {/* Film Strip Container */}
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 rounded-lg shadow-2xl">
                  {/* Film Perforations - Left Side */}
                  <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={`left-${i}`} className="w-2 h-3 bg-gray-700 rounded-sm" />
                    ))}
                  </div>

                  {/* Film Perforations - Right Side */}
                  <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-around py-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={`right-${i}`} className="w-2 h-3 bg-gray-700 rounded-sm" />
                    ))}
                  </div>

                  {/* Video Frame */}
                  <div className="relative mx-4">
                    {/* Film Frame Border */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-600 rounded" />

                    {/* Video Container */}
                    <div className="relative bg-black rounded overflow-hidden">
                      <video
                        src="/input video.mp4"
                        className="w-full h-full object-contain"
                        controls
                        playsInline
                        loop
                      />
                    </div>

                    {/* Film Frame Label */}
                    <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-between px-2 text-yellow-500 text-xs font-mono">
                      <span>◄◄ DREAM REEL 001 ►►</span>
                      <span>🎬</span>
                    </div>
                  </div>

                  {/* Clapperboard Decoration */}
                  <div className="absolute -top-6 -right-4 w-20 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg border-2 border-white transform rotate-12 shadow-xl">
                    <div className="h-6 bg-white border-b-2 border-black flex items-center justify-center">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="w-1 h-4 bg-black transform -skew-x-12" />
                        ))}
                      </div>
                    </div>
                    <div className="p-1 text-white text-[6px] font-bold">
                      <div>SCENE: DREAM</div>
                      <div>TAKE: ∞</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Page 3: Dream Audio - Vinyl Record Style */}
            {currentPage === 2 && (
              <div className="relative space-y-4">
                {/* Vinyl Record Player */}
                <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-6 rounded-lg shadow-2xl">
                  {/* Wood Texture Overlay */}
                  <div className="absolute inset-0 opacity-20 rounded-lg" style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                  }} />

                  {/* Vinyl Record */}
                  <div className="relative mx-auto w-64 h-64 mb-6">
                    {/* Record Shadow */}
                    <div className="absolute inset-0 bg-black/30 rounded-full blur-xl transform translate-y-2" />

                    {/* Record Disc */}
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-full shadow-2xl animate-spin-slow border-4 border-gray-800">
                      {/* Grooves */}
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 rounded-full border border-gray-700/30"
                          style={{
                            margin: `${i * 8}px`,
                          }}
                        />
                      ))}

                      {/* Center Label */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-full shadow-lg flex flex-col items-center justify-center border-4 border-gray-800">
                          <span className="text-white text-xs font-bold">DREAM</span>
                          <span className="text-white text-[8px] opacity-80">RECORDS</span>
                          <div className="w-3 h-3 bg-gray-800 rounded-full mt-1" />
                        </div>
                      </div>

                      {/* Reflection Effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                    </div>

                    {/* Tone Arm */}
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-32 h-2 origin-right transform -rotate-12">
                      <div className="relative w-full h-full">
                        {/* Arm */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-lg" />
                        {/* Needle */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* Audio Player Controls */}
                  <div className="relative bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-amber-700/30">
                    <audio
                      className="w-full"
                      controls
                      src="/dream-audio.mp3"
                      style={{
                        filter: 'sepia(0.5) hue-rotate(-10deg)',
                      }}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Vintage Label */}
                  <div className="absolute -top-4 -left-4 bg-amber-100 px-3 py-1 rounded-full shadow-lg border-2 border-amber-800 transform -rotate-12">
                    <span className="text-amber-900 text-xs font-bold">🎵 SIDE A</span>
                  </div>

                  {/* Volume Knobs Decoration */}
                  <div className="absolute -bottom-3 right-8 flex gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full shadow-lg border-4 border-amber-900 flex items-center justify-center">
                      <div className="w-1 h-4 bg-white rounded-full" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full shadow-lg border-4 border-amber-900 flex items-center justify-center">
                      <div className="w-1 h-4 bg-white rounded-full transform rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Diary Section - Bottom Section */}
            <div className="bg-amber-50/80 p-6 space-y-4 mt-4">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
                  <Image
                    src="/Frankie.png"
                    alt="Frankie"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Frankie</h3>
                  <p className="text-xs text-gray-500">Your Dream Sprite</p>
                </div>
              </div>

              {/* Dream Story - Different for each page */}
              <div className="space-y-2">
                {currentPage === 0 && (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    I spawn in, and I&apos;m already over it. I&apos;m literally buried under a mountain of{" "}
                    <span className="font-semibold text-purple-600">Homework</span>. Not a metaphor. An actual, physical mountain of assignments.
                    The air smells like <span className="font-semibold text-purple-600">Anxiety</span> (which, btw, smells like burnt toast and regret).
                    I try to climb out, but every time I move a paper, ten more fall on me. Not me literally about to be taken out by a due date.
                    I give up. I&apos;m just a girl... who&apos;s gonna fail this class. I put on my headphones, turn on my{" "}
                    <span className="font-semibold text-purple-600">Music</span>. I queue up the full Lana Del Rey discography, ready to just... vibe in my sad girl era.
                    It&apos;s giving &quot;main character in a very sad indie film.&quot;
                  </p>
                )}

                {currentPage === 1 && (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    And that&apos;s when I hear it. A THUD. THUD. THUD. That is not a Lana Del Rey drum beat.
                    Suddenly, a <span className="font-semibold text-purple-600">Dog</span> bursts through my homework wall. It&apos;s a Golden Retriever.
                    It&apos;s wearing sunglasses. And it&apos;s <span className="font-semibold text-purple-600">Running</span>. Like, full-on, high-knees running... in place.
                    And it looks... aggressively <span className="font-semibold text-purple-600">Happy</span>.
                    It barks at me, and I swear its &quot;happy&quot; energy almost gave me a sunburn. It grabs a corner of my Homework... not to help, but to play tug-of-war.
                    My &quot;Summertime Sadness&quot; playlist is immediately drowned out by its panting and a built-in &quot;Who Let the Dogs Out&quot; soundtrack.
                  </p>
                )}

                {currentPage === 2 && (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    I&apos;m losing it. &quot;Dude, not the vibe!&quot; I&apos;m pulling on my 18th-century literature essay (Homework), and this thing is pulling back, growling playfully.
                    My <span className="font-semibold text-purple-600">Anxiety</span> is now at an all-time high—not because of the homework, but because of this dog.
                    My <span className="font-semibold text-purple-600">Music</span> auto-switches from Lana to some hardcore thrash metal.
                    So now it&apos;s just me, the Emo Kid, and this Manic Furball, <span className="font-semibold text-purple-600">Running</span> in place,
                    having a high-stakes tug-of-war in the ruins of my GPA.
                    Finally, I just let go. The Dog, looking way too Happy about its victory, grabs the paper and just... phases back through the wall.
                    It left. Just... gone. Leaving me alone with my anxiety and a lot of slobber.
                  </p>
                )}
              </div>

              {/* Ingredients Tags - Only show current page's ingredients */}
              <div className="flex flex-wrap gap-2 mt-4">
                {currentPage === 0 && ingredients.slice(0, 3).map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200"
                  >
                    {ing}
                  </span>
                ))}
                {currentPage === 1 && ingredients.slice(3, 6).map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200"
                  >
                    {ing}
                  </span>
                ))}
                {currentPage === 2 && ingredients.slice(6, 9).map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              {/* Metadata */}
              <div className="pt-4 border-t border-amber-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Dreamed by:</span>
                    <div className="flex -space-x-2">
                      {TEAM_MEMBERS.map((member) => (
                        <div
                          key={member.id}
                          className={`w-6 h-6 ${member.color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                          title={member.name}
                        >
                          {member.avatar}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">📍</span>
                    <span className="font-medium">
                      {currentPage === 0 && "Homework Mountain"}
                      {currentPage === 1 && "Homework Wall"}
                      {currentPage === 2 && "GPA Ruins"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end text-xs text-gray-500">
                  <span>October 30, 2025</span>
                </div>
              </div>

              {/* Social Interaction Bar - Inside Card */}
              <div className="pt-4 border-t border-amber-200">
                <div className="flex items-center justify-around">
                  {/* Like Button */}
                  <button
                    onClick={handleLike}
                    className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                  >
                    <div className={`w-12 h-12 rounded-lg border-2 ${liked ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'} flex items-center justify-center transition-colors`}>
                      <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{likeCount}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      <MessageCircle className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">2</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center hover:border-green-400 hover:bg-green-50 transition-colors">
                      <Share2 className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">Share</span>
                  </button>
                </div>

                {/* Like Info */}
                {likeCount > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      {liked ? (
                        <>
                          <span className="font-semibold text-gray-800">You</span>
                          {likeCount > 1 && <span> and <span className="font-semibold text-gray-800">Matilda</span></span>}
                          {likeCount > 2 && <span> liked this</span>}
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-gray-800">Matilda</span>
                          {likeCount > 1 && <span> and <span className="font-semibold text-gray-800">Ada</span></span>}
                          <span> liked this</span>
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4 bg-white rounded-lg shadow-lg border border-amber-200 p-4 animate-fade-in">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Comments</h3>
              <div className="space-y-3">
                {/* Frankie's Comment - Always first */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/Frankie.png"
                      alt="Frankie"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <p className="text-xs font-semibold text-purple-900">Frankie</p>
                      {currentPage === 0 && (
                        <p className="text-xs text-gray-700 mt-1">
                          Spawned in and already buried alive? Bet. Not me entering my &apos;sad girl era&apos; on day one.
                          Don&apos;t mind me, just vibin&apos; with my Anxiety. The main character energy is... bleak.
                        </p>
                      )}
                      {currentPage === 1 && (
                        <p className="text-xs text-gray-700 mt-1">
                          ??? EXCUSE ME?! Who let this guy in? Dude, read the room! I was busy being emo!
                          The vibe was so off. And &apos;Who Let the Dogs Out?&apos;... It&apos;s giving... 2003. Cringe.
                        </p>
                      )}
                      {currentPage === 2 && (
                        <p className="text-xs text-gray-700 mt-1">
                          Tonight&apos;s Vibe Rating: Schizophrenic / 10. The Roast: I lost... I actually lost to a dog.
                          My Anxiety feels... violated by all that slobber. Can you two please coordinate your vibes next time?
                          One &apos;emo&apos; and one &apos;eager&apos; is a combo that&apos;s gonna send me into early retirement.
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-2">3 hours ago</p>
                  </div>
                </div>

                {/* Page 1 Comments */}
                {currentPage === 0 && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-xs font-semibold text-gray-800">Matilda</p>
                        <p className="text-xs text-gray-700 mt-1">
                          OMG the homework mountain is TOO real 😭 And Lana Del Rey? Perfect soundtrack for this vibe! Stay strong bestie! 💜
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-2">2 hours ago</p>
                    </div>
                  </div>
                )}

                {/* Page 2 Comments */}
                {currentPage === 1 && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-xs font-semibold text-gray-800">Ada</p>
                        <p className="text-xs text-gray-700 mt-1">
                          A golden retriever with sunglasses running in place?! 😂 This is the chaotic energy we didn&apos;t know we needed! 🐕✨
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-2">1 hour ago</p>
                    </div>
                  </div>
                )}

                {/* Page 3 Comments */}
                {currentPage === 2 && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-xs font-semibold text-gray-800">Matilda</p>
                        <p className="text-xs text-gray-700 mt-1">
                          The way you went from Lana to thrash metal 💀 This whole dream is a MOOD ROLLERCOASTER! Love it! 🎢
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-2">30 minutes ago</p>
                    </div>
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex gap-3 pt-2 border-t border-gray-200">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    Y
                  </div>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 bg-gray-100 rounded-full text-xs text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <div className="mt-6 flex items-center justify-between px-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className={`flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-amber-200 transition-colors ${
                currentPage === 0
                  ? 'text-gray-400 cursor-not-allowed opacity-50'
                  : 'text-gray-600 hover:bg-amber-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-medium">Previous</span>
            </button>

            {/* Page Indicator */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === page
                      ? 'bg-purple-500 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === 2}
              className={`flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-amber-200 transition-colors ${
                currentPage === 2
                  ? 'text-gray-400 cursor-not-allowed opacity-50'
                  : 'text-gray-600 hover:bg-amber-50'
              }`}
            >
              <span className="text-xs font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Share Card Modal */}
      {showShareCard && (
        <ShareCard
          type={getShareCardType()}
          ingredients={ingredients}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  )
}
