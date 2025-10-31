"use client"

import { X, Copy, Share2, Mail } from "lucide-react"
import { useState } from "react"

interface InviteFriendsProps {
  onClose: () => void
}

export function InviteFriends({ onClose }: InviteFriendsProps) {
  const [copied, setCopied] = useState(false)
  const inviteLink = "https://dreamapp.com/invite/abc123"

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-slide-up">
      <div className="w-full max-w-md mx-4 bg-gradient-to-b from-purple-900/90 to-black/90 rounded-3xl p-6 border-2 border-purple-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold">Invite Friends</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm mb-6">
          Share your dream journey with friends! Invite them to join your dream team and create magical experiences
          together.
        </p>

        {/* Invite Link */}
        <div className="mb-6">
          <label className="text-white/80 text-sm font-medium mb-2 block">Your Invite Link</label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm truncate">
              {inviteLink}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-3">
          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Share via Social Media</div>
              <div className="text-white/60 text-sm">Post to your favorite platforms</div>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Send via Email</div>
              <div className="text-white/60 text-sm">Invite friends directly</div>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Friends invited</span>
            <span className="text-white font-bold">12</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-white/60">Friends joined</span>
            <span className="text-purple-400 font-bold">8</span>
          </div>
        </div>
      </div>
    </div>
  )
}
