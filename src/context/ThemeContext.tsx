"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { initSoundState, toggleSoundState, playClickSound } from "@/utils/soundEffects";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isSoundActive: boolean;
  toggleSound: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isSoundActive, setIsSoundActive] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Dark mode is default cinematic experience
    const savedTheme = localStorage.getItem("prazilkar_theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      document.documentElement.classList.toggle("light", savedTheme === "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }

    const sound = initSoundState();
    setIsSoundActive(sound);
  }, []);

  const toggleTheme = () => {
    playClickSound();
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("prazilkar_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
  };

  const toggleSound = () => {
    const next = toggleSoundState();
    setIsSoundActive(next);
  };

  // Provide initial dark theme even before hydration to prevent layout flash
  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : "dark", toggleTheme, isSoundActive, toggleSound }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
