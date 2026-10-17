"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, Maximize2, Sliders, Layers, Sparkles, Smartphone, Scissors } from "lucide-react";

export default function CreativeWorkspace() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playheadPos, setPlayheadPos] = useState(38);
  const [timecode, setTimecode] = useState("00:03:14:18");

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlayheadPos((prev) => (prev >= 95 ? 5 : prev + 0.6));
    }, 80);

    const tcInterval = setInterval(() => {
      const frames = Math.floor(Math.random() * 24);
      const secs = Math.floor(Math.random() * 59);
      setTimecode(`00:03:${secs < 10 ? "0" + secs : secs}:${frames < 10 ? "0" + frames : frames}`);
    }, 250);

    return () => {
      clearInterval(interval);
      clearInterval(tcInterval);
    };
  }, [isPlaying]);

  return (
    <div className="relative w-full max-w-2xl flex flex-col gap-4 select-none">
      {/* Ambient workspace backlights */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-violet-600/20 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-600/20 rounded-full blur-[70px] pointer-events-none" />

      {/* Main Studio Editing Monitor Chassis */}
      <div className="relative rounded-2xl glass-panel p-3.5 sm:p-5 border border-white/15 bg-[#0b0c14]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        {/* Monitor Top Bezel Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-[11px] text-neutral-400 font-sans font-medium ml-2 hidden sm:inline">
              Cinematic Sequence 01 — Color Node 04 [LUT: Teal & Amber]
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-semibold">{timecode}</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] text-cyan-300">
              4K 60FPS
            </span>
          </div>
        </div>

        {/* Video Canvas & Scopes Section */}
        <div className="grid grid-cols-12 gap-3 py-3">
          {/* Main Video Viewport Canvas */}
          <div className="col-span-12 sm:col-span-8 relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 group shadow-inner">
            {/* Cinematic Gradient Scene Preview */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/60 via-purple-950/40 to-amber-950/50 flex items-center justify-center">
              {/* Dynamic Lens & Light Effect */}
              <div className="absolute w-36 h-36 rounded-full bg-cyan-400/20 blur-2xl animate-pulse" />
              
              {/* Viewport Rule of Thirds Grid */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-white" />
                <div className="border-r border-white" />
                <div />
              </div>

              {/* Center Cinematic Motion Graphic / Subject Simulation */}
              <div className="relative text-center z-10">
                <div className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-300 mb-2">
                  TIMELINE PLAYHEAD
                </div>
                <div className="font-display font-black text-xl sm:text-2xl text-white tracking-widest drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                  PRAZILKAR EDIT
                </div>
                <p className="text-[10px] text-neutral-300 font-mono tracking-wider mt-1">
                  Audio Synced • Velocity 1.8x
                </p>
              </div>

              {/* Play / Pause Overlay Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-2.5 left-2.5 p-2 rounded-lg bg-black/70 hover:bg-black/90 text-white border border-white/20 transition-transform active:scale-95 cursor-pointer backdrop-blur-md"
                aria-label={isPlaying ? "Pause timeline" : "Play timeline"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-white" />}
              </button>

              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2 py-1 rounded bg-black/70 border border-white/10 text-[10px] font-mono text-neutral-300">
                <Volume2 size={12} className="text-cyan-400" />
                <span>-6.2 dB</span>
              </div>
            </div>
          </div>

          {/* Color Scopes & Audio VU Meters side panel */}
          <div className="col-span-12 sm:col-span-4 flex flex-col justify-between gap-2.5 bg-black/40 rounded-xl p-3 border border-white/5">
            {/* Color Parade Scopes simulation */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
                <span className="flex items-center gap-1">
                  <Sliders size={10} className="text-cyan-400" />
                  RGB PARADE
                </span>
                <span className="text-neutral-500">Rec.709</span>
              </div>
              <div className="h-16 w-full rounded bg-black/60 border border-white/10 p-1 flex items-end justify-between gap-1 overflow-hidden">
                {/* Red channel wave */}
                <div className="w-1/3 h-full flex items-end justify-around gap-[2px]">
                  {[60, 85, 40, 70, 95, 50].map((h, i) => (
                    <motion.div
                      key={`r-${i}`}
                      className="w-full bg-red-500/80 rounded-t-sm"
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                    />
                  ))}
                </div>
                {/* Green channel wave */}
                <div className="w-1/3 h-full flex items-end justify-around gap-[2px]">
                  {[75, 90, 65, 80, 70, 85].map((h, i) => (
                    <motion.div
                      key={`g-${i}`}
                      className="w-full bg-emerald-500/80 rounded-t-sm"
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.35, repeat: Infinity, repeatType: "reverse", delay: 0.1 }}
                    />
                  ))}
                </div>
                {/* Blue channel wave */}
                <div className="w-1/3 h-full flex items-end justify-around gap-[2px]">
                  {[85, 95, 80, 90, 75, 90].map((h, i) => (
                    <motion.div
                      key={`b-${i}`}
                      className="w-full bg-cyan-400/80 rounded-t-sm"
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Stereo dB Meter */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1">
                <span>MASTER STEREO VU</span>
                <span className="text-emerald-400">0.0 PEAK</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-2 w-full bg-black/80 rounded-sm overflow-hidden flex items-center p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 rounded-sm"
                    animate={{ width: isPlaying ? ["68%", "92%", "74%", "88%"] : "40%" }}
                    transition={{ duration: 0.25, repeat: Infinity }}
                  />
                </div>
                <div className="h-2 w-full bg-black/80 rounded-sm overflow-hidden flex items-center p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 rounded-sm"
                    animate={{ width: isPlaying ? ["62%", "89%", "81%", "76%"] : "35%" }}
                    transition={{ duration: 0.22, repeat: Infinity, delay: 0.05 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Track Video Timeline Scrubber */}
        <div className="mt-2 bg-black/50 rounded-xl p-3 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-2">
            <div className="flex items-center gap-2">
              <Layers size={11} className="text-cyan-400" />
              <span>NON-LINEAR TIMELINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-cyan-400">
                <Scissors size={10} /> Razor Cut
              </span>
              <span className="text-neutral-500">23.976 fps</span>
            </div>
          </div>

          {/* Timeline Track Rows */}
          <div className="space-y-1.5 relative">
            {/* Moving Playhead Needle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{ left: `${playheadPos}%` }}
            >
              <div className="w-3 h-3 rotate-45 bg-cyan-400 -mt-1 shadow-[0_0_10px_rgba(6,182,212,1)]" />
              <div className="w-[1.5px] h-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>

            {/* Track V2 - Text & Graphic Overlays */}
            <div className="h-5 rounded bg-neutral-900/80 flex items-center px-1 text-[9px] font-mono text-neutral-400 border border-white/5 relative">
              <span className="w-5 text-neutral-500">V2</span>
              <div className="absolute left-[15%] w-[25%] h-3.5 rounded bg-violet-600/70 border border-violet-400/40 flex items-center px-1 text-[8px] text-white">
                Intro Title
              </div>
              <div className="absolute left-[52%] w-[30%] h-3.5 rounded bg-cyan-600/70 border border-cyan-400/40 flex items-center px-1 text-[8px] text-white">
                Motion Overlay
              </div>
            </div>

            {/* Track V1 - Main Video Cuts */}
            <div className="h-6 rounded bg-neutral-900/80 flex items-center px-1 text-[9px] font-mono text-neutral-400 border border-white/5 relative">
              <span className="w-5 text-neutral-500">V1</span>
              <div className="absolute left-[4%] w-[22%] h-4.5 rounded bg-emerald-600/70 border border-emerald-400/40 flex items-center px-1 text-[8px] text-white">
                Shot_01.mp4
              </div>
              <div className="absolute left-[28%] w-[26%] h-4.5 rounded bg-teal-600/70 border border-teal-400/40 flex items-center px-1 text-[8px] text-white">
                Shot_02_Ramp.mp4
              </div>
              <div className="absolute left-[56%] w-[38%] h-4.5 rounded bg-cyan-700/70 border border-cyan-400/40 flex items-center px-1 text-[8px] text-white">
                Shot_03_Finale.mp4
              </div>
            </div>

            {/* Track A1 - Beat-Synced Master Audio */}
            <div className="h-5 rounded bg-neutral-900/80 flex items-center px-1 text-[9px] font-mono text-neutral-400 border border-white/5 relative">
              <span className="w-5 text-neutral-500">A1</span>
              <div className="absolute left-[4%] right-[4%] h-3.5 rounded bg-amber-600/50 border border-amber-400/30 flex items-center px-1 text-[8px] text-amber-200">
                Audio_Beat_Sync_Master.wav
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desk Satellite Accessories: Mobile Reel Phone Setup & Creative Tool Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        {/* Mobile Reel Preview Phone */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl glass-panel bg-black/60 border border-white/10 text-xs">
          <Smartphone size={16} className="text-cyan-400" />
          <div className="flex flex-col">
            <span className="font-semibold text-white text-[11px]">9:16 Mobile Sync</span>
            <span className="text-[10px] text-neutral-400">Instagram Reel Ready</span>
          </div>
        </div>

        {/* Orbiting Creative Tool Pills */}
        <div className="flex items-center gap-2">
          {["CapCut", "VN", "Lightroom", "Photoshop", "Alight Motion"].map((tool) => (
            <span
              key={tool}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/[0.05] border border-white/10 text-neutral-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
