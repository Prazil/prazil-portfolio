"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Mail, MessageSquare, Heart, Sparkles } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import MagneticButton from "@/components/common/MagneticButton";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

export default function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10 bg-[#06070a]">
      {/* Background Cinematic Aurora Bloom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-600/15 via-purple-600/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between">
        {/* Massive Film-Ending Grand CTA */}
        <div className="text-center py-12 sm:py-20 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-6"
          >
            <Sparkles size={12} className="text-amber-400" />
            <span>LET&apos;S BRING YOUR VISION TO LIFE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-foreground select-none max-w-5xl mx-auto"
          >
            LET&apos;S CREATE SOMETHING GREAT
          </motion.h2>

          <p className="mt-6 text-base sm:text-xl text-neutral-400 font-body max-w-2xl mx-auto">
            Cinematic videos • High-engagement reels • Striking visual designs
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="/work#contact">
              <MagneticButton variant="primary" size="lg">
                <span>Start a Project Together</span>
              </MagneticButton>
            </Link>
          </div>
        </div>

        {/* Footer Navigation and Social Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <Link
              href="/"
              onClick={() => playClickSound()}
              className="flex items-center gap-2 group mb-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-cyan-300 flex items-center justify-center font-display font-black text-black text-sm shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                P
              </div>
              <span className="font-display font-black text-xl tracking-wider text-foreground">
                PRAZILKAR
              </span>
            </Link>
            <p className="text-xs font-mono text-neutral-400 text-center md:text-left">
              Video Editor • Photo Editor • Content Creator
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-400">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/work#about" },
              { name: "Skills", href: "/work#skills" },
              { name: "Experience", href: "/work#experience" },
              { name: "Work", href: "/work#work" },
              { name: "Services", href: "/work#services" },
              { name: "Contact", href: "/work#contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => playClickSound()}
                onMouseEnter={() => playHoverTick()}
                className="hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Icons & Back to Top */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onClick={() => playClickSound()}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
            >
              <InstagramIcon size={16} />
            </a>

            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              aria-label="Email"
              onClick={() => playClickSound()}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <Mail size={16} />
            </a>

            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              onClick={() => playClickSound()}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
            >
              <MessageSquare size={16} />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-cyan-400 transition-colors ml-2 cursor-pointer"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Copyright and Brand Statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} Prazilkar. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Creative visuals. Cinematic stories. Digital experiences.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
