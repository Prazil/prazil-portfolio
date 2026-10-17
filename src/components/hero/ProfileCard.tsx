"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Camera, Award } from "lucide-react";

export default function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 280,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 280,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-3xl p-3 sm:p-4 glass-card group cursor-pointer transition-shadow duration-300"
    >
      {/* Animated glowing border stroke */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-tr from-cyan-500/60 via-purple-500/30 to-amber-500/50 opacity-50 group-hover:opacity-100 blur-[1px] transition-opacity duration-500 pointer-events-none -z-10" />

      {/* Internal Glass Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#141520] to-[#090a0f] flex flex-col justify-between p-4 sm:p-5 border border-white/10 shadow-2xl">
        {/* Top Viewfinder HUD Header */}
        <div className="flex items-center justify-between z-20 font-mono text-[10px] text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold text-white tracking-wider">REC</span>
            <span className="text-cyan-400">4K • 60FPS</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-neutral-300">
            <Camera size={11} className="text-cyan-400" />
            <span>ISO 400</span>
          </div>
        </div>

        {/* Cinematic Avatar Portrait Representation */}
        <div className="relative my-auto flex flex-col items-center justify-center py-4">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-[50px] pointer-events-none" />

          {/* Profile Visual Frame */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-white/20 p-1 bg-gradient-to-b from-white/10 to-transparent shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-[#1d1f30] via-[#10121c] to-[#07080d] flex items-center justify-center">
              {/* Artistic Stylized Creator Silhouette & Optics */}
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full object-cover"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="80" cy="80" r="70" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="80" cy="80" r="50" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
                {/* Creator Head & Torso with Studio Rim Lighting */}
                <path
                  d="M80 32C66.7452 32 56 42.7452 56 56C56 69.2548 66.7452 80 80 80C93.2548 80 104 69.2548 104 56C104 42.7452 93.2548 32 80 32Z"
                  fill="url(#headGrad)"
                />
                <path
                  d="M36 138C36 112.595 56.5949 92 82 92H78C103.405 92 124 112.595 124 138V144H36V138Z"
                  fill="url(#bodyGrad)"
                />
                {/* Cinematic Lens Flare Highlights */}
                <circle cx="95" cy="50" r="1.5" fill="#06b6d4" />
                <path d="M50 80L110 80" stroke="rgba(6,182,212,0.4)" strokeWidth="1" />
                <path d="M80 50L80 110" stroke="rgba(6,182,212,0.4)" strokeWidth="1" />
                <defs>
                  <linearGradient id="headGrad" x1="56" y1="32" x2="104" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.6" stopColor="#1e293b" />
                    <stop offset="1" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="bodyGrad" x1="36" y1="92" x2="124" y2="144" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="0.5" stopColor="#1e1b4b" />
                    <stop offset="1" stopColor="#030712" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Viewfinder crosshairs */}
              <div className="absolute inset-2 border border-white/10 rounded pointer-events-none flex items-center justify-center">
                <div className="w-3 h-[1px] bg-cyan-400/80" />
                <div className="h-3 w-[1px] bg-cyan-400/80 absolute" />
              </div>

              {/* Bottom tag inside frame */}
              <div className="absolute bottom-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-cyan-500/30 text-[9px] font-mono text-cyan-300">
                MASTER EDIT
              </div>
            </div>
          </div>

          {/* Identity & Badges */}
          <div className="text-center mt-4">
            <h3 className="font-display font-bold text-lg text-white tracking-wide">
              PRAZILKAR
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Lead Creative Visual Editor
            </p>
          </div>
        </div>

        {/* Card Footer HUD */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400 z-20">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Award size={13} />
            <span className="font-medium text-white">4+ Yrs Exp</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-400">
            <Sparkles size={11} className="text-amber-400" />
            <span>21+ Reels Showcase</span>
          </div>
        </div>

        {/* Ambient Mouse reflection light */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at center, rgba(6,182,212,0.12) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}
