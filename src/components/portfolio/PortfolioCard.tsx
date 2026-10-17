"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { PortfolioProject } from "@/data/portfolioData";
import ProjectThumbnailVisual from "@/components/portfolio/ProjectThumbnailVisual";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface PortfolioCardProps {
  project: PortfolioProject;
  onSelect: (project: PortfolioProject) => void;
  index: number;
}

export default function PortfolioCard({ project, onSelect, index }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse lighting coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Subtle 3D tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 320,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 320,
    damping: 28,
  });

  const [mousePosPx, setMousePosPx] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setMousePosPx({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    playClickSound();
    onSelect(project);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: (index % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`portfolio-card ${project.gridSpan} rounded-3xl p-3 sm:p-4 glass-card border border-white/10 relative group cursor-pointer flex flex-col justify-between transition-all duration-300`}
    >
      {/* Dynamic Mouse-Follow Cinematic Light */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePosPx.x}px ${mousePosPx.y}px, rgba(6, 182, 212, 0.15), transparent 70%)`,
        }}
      />

      {/* Cinematic Border Illumination on hover */}
      <div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-[1px]"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}80, transparent 40%, ${project.accentColor}40)`,
        }}
      />

      {/* Visual Canvas Representation */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-4 shadow-xl">
        <ProjectThumbnailVisual project={project} isHovered={isHovered} />
      </div>

      {/* Project Meta Details */}
      <div className="flex flex-col justify-between flex-1 px-2 pb-1 relative z-20">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-xs text-neutral-400">
              {project.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 opacity-80 group-hover:opacity-100">
              <span>View Details</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground group-hover:text-cyan-300 transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 font-body line-clamp-2 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Tags and Instagram source status */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-neutral-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
            }}
            className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 hover:text-pink-400 transition-colors"
          >
            <InstagramIcon size={11} />
            <span>Open Reel</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
