"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Sparkles, Wand2, Lightbulb, Compass, Monitor } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const HIGHLIGHTS = [
  {
    icon: Film,
    title: "Passionate Video Editor",
    description: "Obsessed with pacing, velocity curves, and sound design that holds viewer attention.",
  },
  {
    icon: Sparkles,
    title: "Photo Editing Enthusiast",
    description: "Crafting atmospheric tone curves, color balance, and clean raster enhancements.",
  },
  {
    icon: Wand2,
    title: "Creative & Visual Designer",
    description: "Designing impactful posters, event visual identities, and social thumbnails.",
  },
  {
    icon: Lightbulb,
    title: "Creative Problem Solver",
    description: "Translating raw ideas, stories, and footage into polished, engaging digital media.",
  },
  {
    icon: Compass,
    title: "Always Learning Techniques",
    description: "Continuously experimenting with modern color LUTs, motion graphics, and workflows.",
  },
  {
    icon: Monitor,
    title: "Web Design + Editing",
    description: "Merging visual aesthetics with modern, responsive digital web interfaces.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        badge="ABOUT PRAZILKAR"
        title="Visual Storyteller & Creative Editor"
        subtitle="I transform raw moments into cinematic stories and digital visuals that captivate audiences."
        animationType="blur"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Authentic Narrative Statement */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent">
            {/* Ambient accent orb */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />

            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-3 block">
              AUTHENTIC CREATIVE PHILOSOPHY
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-snug">
              &ldquo;Great editing is not just about cuts; it is about how the rhythm feels.&rdquo;
            </h3>

            <div className="space-y-4 text-neutral-300 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mt-4 font-body">
              <p>
                Over the past 4+ years, I have immersed myself in the art of visual editing. Whether crafting high-retention Instagram Reels, directing aftermovies for major college events, or retouching creative photo compositions, my goal is always the same: make the visual feel alive.
              </p>
              <p>
                As a passionate creator and college event creative contributor, I combine technical discipline in CapCut, VN, Adobe Lightroom, Photoshop, and Alight Motion with an eye for modern digital aesthetics and kinetic typography.
              </p>
              <p>
                I thrive at the intersection of video pacing, graphic composition, and web design—consistently exploring fresh techniques to turn creative ideas into memorable visual experiences.
              </p>
            </div>

            {/* Quick credentials strip */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                4+ Years Practice
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300">
                Independent Editor
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300">
                Campus Visual Lead
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: 6 Core Creative Pillars */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                  <Icon size={20} />
                </div>
                <h4 className="font-display font-bold text-base text-foreground mb-1 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 font-body leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
