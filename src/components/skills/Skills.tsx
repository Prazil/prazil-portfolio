"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Video, Sparkles, Layers, Palette, Image, Sliders, Activity, Film, Scissors, Check } from "lucide-react";
import { CREATIVE_TOOLS, CreativeTool } from "@/data/portfolioData";
import SectionHeading from "@/components/common/SectionHeading";
import { playHoverTick } from "@/utils/soundEffects";

const ICON_MAP: Record<string, React.ElementType> = {
  Video,
  Sparkles,
  Layers,
  Palette,
  Image,
  Sliders,
  Activity,
  Film,
  Scissors,
};

function SkillCard({ tool, index }: { tool: CreativeTool; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const IconComponent = ICON_MAP[tool.iconName] || Film;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        playHoverTick();
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 relative overflow-hidden group cursor-pointer"
    >
      {/* Dynamic Colored Hover Backlight */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[45px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: tool.accent }}
      />

      {/* Top Header: Icon & Category */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 shadow-md"
          style={{
            backgroundColor: `${tool.accent}15`,
            borderColor: `${tool.accent}35`,
            color: tool.accent,
          }}
        >
          <IconComponent size={22} className="group-hover:rotate-6 transition-transform" />
        </div>

        {/* Subtle Visual Proficiency Indicator (No fake percentages) */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: tool.accent }}
          />
          <span className="text-neutral-300">{tool.proficiencyLabel}</span>
        </div>
      </div>

      {/* Title & Experience */}
      <div className="mb-2">
        <h3 className="font-display font-bold text-xl text-foreground group-hover:text-cyan-300 transition-colors">
          {tool.name}
        </h3>
        <span className="text-xs font-mono text-neutral-400">
          {tool.category} • {tool.experienceYears}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-neutral-400 font-body leading-relaxed mb-4">
        {tool.description}
      </p>

      {/* Visual Proficiency Meter Bars (Subtle 4-segment indicator) */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4].map((seg) => {
          const filled =
            tool.proficiencyLabel === "Mastery"
              ? seg <= 4
              : tool.proficiencyLabel === "Expert"
              ? seg <= 3
              : seg <= 2;
          return (
            <div
              key={seg}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: filled ? tool.accent : "rgba(255,255,255,0.08)",
                boxShadow: filled && isHovered ? `0 0 8px ${tool.accent}` : "none",
              }}
            />
          );
        })}
      </div>

      {/* Tool Specialties Badges */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
        {tool.specialties.map((spec) => (
          <span
            key={spec}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-neutral-300 border border-white/5"
          >
            <Check size={9} className="text-cyan-400" />
            {spec}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        badge="STUDIO TOOLKIT"
        title="Skills & Creative Software"
        subtitle="Hands-on mastery across nine industry-standard video, photo, and motion design suites."
        animationType="slide"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CREATIVE_TOOLS.map((tool, idx) => (
          <SkillCard key={tool.id} tool={tool} index={idx} />
        ))}
      </div>
    </section>
  );
}
