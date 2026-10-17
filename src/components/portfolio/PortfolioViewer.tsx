"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Mail, CheckCircle2, Sliders, Layers, Sparkles, Film, ArrowRight } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { PortfolioProject } from "@/data/portfolioData";
import MagneticButton from "@/components/common/MagneticButton";
import { playClickSound } from "@/utils/soundEffects";

interface PortfolioViewerProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export default function PortfolioViewer({ project, onClose }: PortfolioViewerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay with heavy blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0d0e16] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Top Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090a10]">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 font-mono text-xs text-cyan-300 font-semibold">
                PROJECT {project.projectNumber}
              </span>
              <span className="font-mono text-xs text-neutral-400">
                {project.category}
              </span>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close project viewer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Media Display */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl flex flex-col justify-between p-4">
                  {project.video ? (
                    <video
                      src={project.video}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} flex flex-col items-center justify-center p-6 text-center`}>
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center border backdrop-blur-xl mb-4 shadow-xl"
                        style={{
                          backgroundColor: `${project.accentColor}20`,
                          borderColor: `${project.accentColor}50`,
                          color: project.accentColor,
                        }}
                      >
                        {project.thumbnailSvgType === "timeline" ? (
                          <Layers size={36} />
                        ) : project.thumbnailSvgType === "grading" ? (
                          <Sliders size={36} />
                        ) : project.thumbnailSvgType === "neon" ? (
                          <Sparkles size={36} />
                        ) : (
                          <Film size={36} />
                        )}
                      </div>

                      <h3 className="font-display font-black text-2xl text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-300 font-mono mb-6">
                        {project.category}
                      </p>

                      <a
                        href={project.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-transform"
                      >
                        <InstagramIcon size={14} />
                        <span>Watch on Instagram</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {/* Corner Watermark */}
                  <div className="relative z-10 self-start px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono text-cyan-300 border border-cyan-500/30">
                    4K REEL MASTER
                  </div>
                </div>
              </div>

              {/* Right Column: In-depth Technical Specs & Description */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-foreground mb-3">
                    {project.title}
                  </h2>
                  <p className="text-base text-neutral-300 font-body leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technical Specifications Grid */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
                    <span className="text-[11px] text-cyan-400 uppercase tracking-widest block font-bold mb-1">
                      TECHNICAL METRICS
                    </span>

                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-neutral-400">Resolution</span>
                      <span className="text-foreground font-semibold">{project.specs.resolution}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-neutral-400">Aspect Ratio</span>
                      <span className="text-foreground font-semibold">{project.specs.aspectRatio}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-neutral-400">Color Grading</span>
                      <span className="text-foreground font-semibold">{project.specs.colorSpace}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Pacing Focus</span>
                      <span className="text-cyan-400 font-semibold">{project.specs.focus}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-5">
                    <span className="text-xs font-mono text-neutral-400 block mb-2">
                      Tools & Techniques Applied:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTAs in Modal: Contact Me & View on Instagram */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/work#contact?project=${encodeURIComponent(project.title)}`}
                    onClick={() => {
                      playClickSound();
                      onClose();
                    }}
                    className="flex-1"
                  >
                    <MagneticButton variant="primary" size="md" className="w-full">
                      <Mail size={15} />
                      <span>Contact Me For Custom Editing</span>
                      <ArrowRight size={14} />
                    </MagneticButton>
                  </Link>

                  <a
                    href={project.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickSound()}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-white/20 bg-white/5 hover:border-pink-500/60 hover:text-pink-400 transition-colors"
                  >
                    <InstagramIcon size={16} />
                    <span>View on Instagram</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
