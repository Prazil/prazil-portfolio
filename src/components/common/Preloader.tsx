"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Quick, elegant cinematic timer: short and impactful
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07070a] select-none"
        >
          {/* Subtle Ambient Pulse behind logo */}
          <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

          {/* Minimalist studio marks */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400">
              STUDIO PORTFOLIO
            </span>
          </div>

          {/* PRAZILKAR Signature Brand */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%", letterSpacing: "0.2em", opacity: 0 }}
              animate={{
                y: "0%",
                letterSpacing: "0.45em",
                opacity: 1,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-neutral-400 pl-[0.45em]"
            >
              PRAZILKAR
            </motion.h1>
          </div>

          {/* Minimalist Progress Meter */}
          <div className="w-48 sm:w-64 h-[1.5px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[11px] font-mono text-neutral-500 tracking-widest mt-4 uppercase"
          >
            Video Editor • Photo Editor • Content Creator
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
