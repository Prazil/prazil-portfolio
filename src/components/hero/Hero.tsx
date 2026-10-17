"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/common/MagneticButton";
import ProfileCard from "@/components/hero/ProfileCard";
import CreativeWorkspace from "@/components/hero/CreativeWorkspace";

const ROLES = [
  "Video Editor",
  "Photo Editor",
  "Content Creator",
  "Poster Designer",
  "Social Media Content Creator",
  "Creative Visual Editor",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    // Smooth, cinematic role transitions (every 3.2 seconds)
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden">
      {/* Top Studio Micro-Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2.5 self-start px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md text-cyan-400 text-xs font-mono tracking-wider mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>CINEMATIC PORTFOLIO × 4+ YEARS EXPERIENCE</span>
      </motion.div>

      {/* Main Branding Title */}
      <div className="relative mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-foreground select-none"
        >
          PRAZILKAR
        </motion.h1>

        {/* Animated Smooth Role Transition System */}
        <div className="flex items-center gap-3 mt-2 sm:mt-4 h-10 sm:h-12 overflow-hidden">
          <span className="text-neutral-500 text-lg sm:text-2xl font-light font-display">
            Creative
          </span>
          <div className="relative h-full flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 tracking-wide"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Hero Description Copy */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="text-lg sm:text-xl md:text-2xl text-neutral-300 dark:text-neutral-300 font-body max-w-2xl leading-relaxed mb-8"
      >
        I create cinematic videos, striking visuals and digital content that turn ideas into experiences.
      </motion.p>

      {/* Hero CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="flex flex-wrap items-center gap-4 mb-16 z-20"
      >
        <Link href="/work#contact">
          <MagneticButton variant="primary" size="lg" className="text-sm sm:text-base">
            <span>Let&apos;s Create Something Great</span>
            <ArrowRight size={17} />
          </MagneticButton>
        </Link>

        <Link href="/work#work">
          <MagneticButton variant="secondary" size="lg" className="text-sm sm:text-base">
            <Play size={15} className="fill-current text-cyan-400" />
            <span>View My Work (21 Reels)</span>
          </MagneticButton>
        </Link>
      </motion.div>

      {/* Hero Visual Composition: Profile Card + Creative Workspace */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4"
      >
        {/* Left Col: Profile Photo Card */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <ProfileCard />
        </div>

        {/* Right Col: Creative Workspace Suite */}
        <div className="lg:col-span-8 flex justify-center lg:justify-end w-full">
          <CreativeWorkspace />
        </div>
      </motion.div>

      {/* Bottom Live Creator Metrics Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs text-neutral-400"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
          <span>4+ Years Experience</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
          <span>100+ Videos Edited</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-violet-400 shrink-0" />
          <span>200+ Photos Retouched</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400 shrink-0" />
          <span>21 Featured Reels Showcase</span>
        </div>
      </motion.div>
    </section>
  );
}
