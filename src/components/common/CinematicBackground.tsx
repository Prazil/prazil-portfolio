"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CinematicBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate subtle, performance-friendly floating ambient particles
    const items = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 15 + 18,
      delay: Math.random() * 5,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Aurora Ambient Orb 1 - Cyan / Electric Teal */}
      <motion.div
        className="aurora-mesh w-[550px] h-[550px] -top-32 -left-32 bg-gradient-to-br from-cyan-600/25 via-teal-500/15 to-transparent"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Ambient Orb 2 - Deep Violet / Magenta */}
      <motion.div
        className="aurora-mesh w-[650px] h-[650px] top-1/4 -right-40 bg-gradient-to-bl from-purple-600/20 via-violet-600/15 to-transparent"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Ambient Orb 3 - Amber / Warm Glow */}
      <motion.div
        className="aurora-mesh w-[500px] h-[500px] bottom-10 left-1/3 bg-gradient-to-tr from-amber-600/15 via-rose-500/10 to-transparent"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Digital Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)"
        }}
      />

      {/* Ambient Floating Dust Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-300/40 dark:bg-cyan-200/50"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 6px rgba(6, 182, 212, 0.6)",
          }}
          animate={{
            y: ["0vh", "-25vh"],
            x: ["0px", `${(p.id % 2 === 0 ? 1 : -1) * 20}px`],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
