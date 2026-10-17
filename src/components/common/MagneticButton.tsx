"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  magneticStrength?: number;
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  magneticStrength = 0.35,
  ...rest
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary:
      "relative bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-400 text-black font-semibold shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] border border-cyan-300/40",
    secondary:
      "relative bg-white/10 dark:bg-white/[0.06] text-foreground font-medium border border-white/20 dark:border-white/10 hover:border-cyan-400/50 backdrop-blur-md shadow-lg hover:shadow-cyan-500/10",
    outline:
      "relative bg-transparent text-foreground border border-white/20 hover:border-cyan-400 hover:text-cyan-400 backdrop-blur-sm",
    ghost:
      "relative bg-transparent text-foreground/80 hover:text-foreground hover:bg-white/5",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.5 }}
      whileTap={{ scale: 0.96 }}
      className={`group rounded-full overflow-hidden inline-flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 magnetic-target select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {/* Dynamic Hover Shimmer Ripple */}
      {variant === "primary" && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none transition-transform ease-out"
        />
      )}

      {/* Glow aura */}
      {isHovered && variant !== "ghost" && (
        <span
          className="absolute -inset-1 rounded-full blur-md opacity-50 bg-cyan-400 -z-10 transition-opacity duration-300 pointer-events-none"
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
