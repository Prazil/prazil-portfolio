"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Film, Camera, PenTool, Share2, Globe, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

const CARDS = [
  {
    id: "video-editing",
    title: "Video Editing",
    subtitle: "Cinematic Pacing & Motion",
    description: "Cinematic edits, high-energy reels, college event aftermovies, and promotional visual content engineered with precision cut timing.",
    icon: Film,
    accent: "#06b6d4",
    deliverables: ["Reels & Shorts", "Event Aftermovies", "Promotional Teasers", "Sound FX Sync"],
  },
  {
    id: "photo-editing",
    title: "Photo Editing",
    subtitle: "Retouching & Color Grading",
    description: "Creative photo enhancement, intricate manipulation, skin tone preservation, and cinematic color curves using Photoshop and Lightroom.",
    icon: Camera,
    accent: "#8b5cf6",
    deliverables: ["Cinematic Grading", "Skin Retouching", "Color Harmony", "Visual Composites"],
  },
  {
    id: "poster-graphic-design",
    title: "Poster & Graphic Design",
    subtitle: "Visual Identity & Print",
    description: "Striking event posters, promotional graphics, prestige certificates, and digital announcements that demand immediate attention.",
    icon: PenTool,
    accent: "#f59e0b",
    deliverables: ["Event Posters", "Official Certificates", "Promotional Flyers", "Brand Layouts"],
  },
  {
    id: "social-media-content",
    title: "Social Media Content",
    subtitle: "Retention & Algorithmic Impact",
    description: "Creative visual content designed specifically for modern feeds to drive watch time, visual interest, and memorable audience retention.",
    icon: Share2,
    accent: "#ec4899",
    deliverables: ["Engagement Hooks", "Custom Aspect Ratios", "Trend Adaptation", "Thumbnails"],
  },
  {
    id: "website-design",
    title: "Website Design",
    subtitle: "Digital Creative Experiences",
    description: "Modern, visually appealing websites and interactive digital portfolios built with responsive design systems and sleek aesthetics.",
    icon: Globe,
    accent: "#10b981",
    deliverables: ["Modern UI/UX", "Portfolio Interfaces", "Responsive Layouts", "Aesthetic Polish"],
  },
];

export default function WhatIDo() {
  return (
    <section id="what-i-do" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        badge="STUDIO CAPABILITIES"
        title="What I Do"
        subtitle="Five specialized creative disciplines crafted to transform vision into high-impact digital experiences."
        animationType="mask"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              onMouseEnter={() => playHoverTick()}
              className="glass-card rounded-3xl p-6 sm:p-7 relative overflow-hidden group border border-white/10 flex flex-col justify-between"
            >
              {/* Top ambient hover glow */}
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: card.accent }}
              />

              <div>
                {/* Floating Icon with Subtle Glow */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-lg"
                    style={{
                      backgroundColor: `${card.accent}15`,
                      borderColor: `${card.accent}40`,
                      color: card.accent,
                    }}
                  >
                    <Icon size={26} className="animate-float" />
                  </div>

                  <span className="font-mono text-xs text-neutral-400 group-hover:text-white transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  {card.subtitle}
                </span>

                <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm text-neutral-300 dark:text-neutral-400 leading-relaxed font-body mb-6">
                  {card.description}
                </p>

                {/* Deliverables tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {card.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer CTA leading to Contact */}
              <Link
                href={`/work#contact?subject=${encodeURIComponent(card.title)}`}
                onClick={() => playClickSound()}
                className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-cyan-400 transition-colors"
              >
                <span>Service Details → Contact Me</span>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-400/50 flex items-center justify-center transition-all">
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
