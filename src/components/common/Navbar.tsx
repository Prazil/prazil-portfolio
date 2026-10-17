"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface NavItem {
  name: string;
  href: string;
  sectionId?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/", sectionId: "hero" },
  { name: "About", href: "/work#about", sectionId: "about" },
  { name: "Skills", href: "/work#skills", sectionId: "skills" },
  { name: "Experience", href: "/work#experience", sectionId: "experience" },
  { name: "Work", href: "/work#work", sectionId: "work" },
  { name: "Services", href: "/work#services", sectionId: "services" },
  { name: "Contact", href: "/work#contact", sectionId: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, isSoundActive, toggleSound } = useTheme();

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Intelligent show/hide behavior on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY && currentScrollY > 180) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Section observer on /work
  useEffect(() => {
    if (pathname === "/") {
      setActiveSection("hero");
      return;
    }

    const sections = ["about", "skills", "experience", "work", "services", "contact"];
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const isLinkActive = (item: NavItem) => {
    if (pathname === "/" && item.href === "/") return true;
    if (pathname === "/work" && item.sectionId === activeSection) return true;
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    playClickSound();
    setMobileMenuOpen(false);

    if (pathname === "/work" && item.sectionId && item.href.startsWith("/work#")) {
      e.preventDefault();
      const el = document.getElementById(item.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${item.sectionId}`);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 border ${
            isScrolled
              ? "bg-[#0b0c12]/80 dark:bg-[#0b0c12]/80 backdrop-blur-xl border-white/10 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)]"
              : "bg-white/[0.04] dark:bg-white/[0.04] backdrop-blur-md border-white/[0.08]"
          } max-w-5xl w-full`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => playClickSound()}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-cyan-300 flex items-center justify-center font-display font-black text-black text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform duration-200">
              P
            </div>
            <span className="font-display font-black text-base sm:text-lg tracking-wider text-foreground group-hover:text-cyan-400 transition-colors">
              PRAZILKAR
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-1.5 bg-black/20 dark:bg-white/[0.02] px-2 py-1 rounded-full border border-white/[0.05]">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  onMouseEnter={() => playHoverTick()}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 select-none ${
                    active
                      ? "text-cyan-400 font-semibold"
                      : "text-neutral-400 hover:text-foreground"
                  }`}
                >
                  {item.name}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full -z-10 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Controls: Audio, Theme & CTA */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => playHoverTick()}
              aria-label={isSoundActive ? "Mute audio sound effects" : "Enable audio sound effects"}
              className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
                isSoundActive
                  ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-foreground"
              }`}
            >
              {isSoundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Theme Toggle (Dark / Editorial Light) */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => playHoverTick()}
              aria-label={theme === "dark" ? "Switch to Editorial Light Mode" : "Switch to Cinematic Dark Mode"}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors duration-200 cursor-pointer"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Let's Talk CTA button */}
            <Link
              href={pathname === "/work" ? "#contact" : "/work#contact"}
              onClick={() => playClickSound()}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-teal-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-200"
            >
              <span>Let&apos;s Create</span>
              <ArrowUpRight size={13} />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:text-cyan-400 transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Cinematic Mobile Navigation Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#07070a]/90 flex flex-col justify-center px-8 md:hidden"
          >
            {/* Background Aurora Blob */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-2">
                Navigation
              </span>

              {NAV_ITEMS.map((item, idx) => {
                const active = isLinkActive(item);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`text-2xl font-display font-bold transition-colors flex items-center justify-between ${
                        active ? "text-cyan-400" : "text-neutral-300 hover:text-white"
                      }`}
                    >
                      <span>{item.name}</span>
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="pt-6 border-t border-white/10 flex flex-col gap-3 mt-4"
              >
                <Link
                  href="/work#contact"
                  onClick={() => {
                    playClickSound();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full text-center font-semibold text-sm bg-gradient-to-r from-cyan-500 to-teal-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  Let&apos;s Create Something Great
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
