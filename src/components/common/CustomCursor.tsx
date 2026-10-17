"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "card" | "text" | "view">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing follower
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Detect touch device to strictly disable custom cursor on mobile
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], .magnetic-target");
      const card = target.closest(".portfolio-card, .glass-card");
      const textInput = target.closest("input, textarea");

      if (textInput) {
        setCursorType("text");
      } else if (interactive) {
        setCursorType("pointer");
      } else if (card) {
        setCursorType("card");
      } else {
        setCursorType("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[1000] rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "pointer" ? 6 : cursorType === "card" ? 8 : 6,
          height: cursorType === "pointer" ? 6 : cursorType === "card" ? 8 : 6,
          backgroundColor: "#ffffff",
          opacity: cursorType === "text" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing illuminated follower circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] rounded-full flex items-center justify-center font-mono text-[9px] tracking-wider uppercase text-cyan-300 font-semibold"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:
            cursorType === "pointer"
              ? 52
              : cursorType === "card"
              ? 64
              : cursorType === "text"
              ? 24
              : 32,
          height:
            cursorType === "pointer"
              ? 52
              : cursorType === "card"
              ? 64
              : cursorType === "text"
              ? 24
              : 32,
          border:
            cursorType === "pointer"
              ? "1.5px solid rgba(6, 182, 212, 0.7)"
              : cursorType === "card"
              ? "1.5px solid rgba(139, 92, 246, 0.7)"
              : "1px solid rgba(255, 255, 255, 0.25)",
          backgroundColor:
            cursorType === "pointer"
              ? "rgba(6, 182, 212, 0.08)"
              : cursorType === "card"
              ? "rgba(139, 92, 246, 0.1)"
              : "rgba(255, 255, 255, 0.02)",
          backdropFilter: cursorType === "card" ? "blur(3px)" : "none",
          boxShadow:
            cursorType === "pointer"
              ? "0 0 20px rgba(6, 182, 212, 0.3)"
              : cursorType === "card"
              ? "0 0 25px rgba(139, 92, 246, 0.35)"
              : "0 0 10px rgba(255, 255, 255, 0.05)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
      >
        {cursorType === "card" && (
          <span className="opacity-90 select-none scale-90">VIEW</span>
        )}
      </motion.div>
    </>
  );
}
