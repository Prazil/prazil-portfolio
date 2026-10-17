"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Layers, ExternalLink } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Preloader from "@/components/common/Preloader";
import Hero from "@/components/hero/Hero";
import Footer from "@/components/footer/Footer";
import MagneticButton from "@/components/common/MagneticButton";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "@/data/portfolioData";
import PortfolioViewer from "@/components/portfolio/PortfolioViewer";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Spotlight featured reels for the Home experience
  const spotlightReels = PORTFOLIO_PROJECTS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Minimal Cinematic Preloader on initial arrival */}
      <Preloader />

      {/* Main Cinematic Hero Experience */}
      <Hero />

      {/* Home Experience: Spotlight Reel Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles size={11} className="text-amber-400" />
              <span>SPOTLIGHT PRODUCTION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-foreground">
              Featured Reel Highlights
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 font-body">
              A curated preview of high-retention vertical edits and color grading.
            </p>
          </div>

          <Link href="/work#work" onClick={() => playClickSound()}>
            <MagneticButton variant="secondary" size="md">
              <span>Explore All 21 Projects</span>
              <ArrowRight size={15} />
            </MagneticButton>
          </Link>
        </div>

        {/* 4 Featured Spotlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spotlightReels.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => {
                playClickSound();
                setSelectedProject(project);
              }}
              onMouseEnter={() => playHoverTick()}
              className="glass-card rounded-3xl p-4 border border-white/10 relative group cursor-pointer flex flex-col justify-between"
            >
              {/* Card visual preview */}
              <div className={`relative w-full aspect-[9/14] rounded-2xl overflow-hidden bg-gradient-to-br ${project.thumbnailGradient} p-4 flex flex-col justify-between mb-4 shadow-xl`}>
                <div className="flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-cyan-300">
                    REEL {project.projectNumber}
                  </span>
                  <InstagramIcon size={13} className="text-pink-400" />
                </div>

                <div className="self-center text-center z-10 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <Play size={18} className="fill-white ml-0.5" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-300 block">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 pt-2 border-t border-white/10 z-10">
                  <span>{project.specs.colorSpace}</span>
                  <span className="text-neutral-200">{project.specs.resolution}</span>
                </div>
              </div>

              {/* Title & CTA */}
              <div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-cyan-300 transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-400 font-body line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>Inspect Specs</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portal Gateway to Full One-Page Experience */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-neutral-900/40 to-purple-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block mb-1">
              FULL CREATIVE SUITE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Explore The Complete One-Page Portfolio
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              About philosophy, What I Do, 9 software toolkits, 4+ years timeline, 21 Instagram reels showcase, 10 services, and direct collaboration inquiry.
            </p>
          </div>

          <Link href="/work" onClick={() => playClickSound()} className="shrink-0">
            <MagneticButton variant="primary" size="lg">
              <span>View Full Portfolio</span>
              <ArrowRight size={17} />
            </MagneticButton>
          </Link>
        </div>
      </section>

      {/* Project Viewer Modal */}
      <PortfolioViewer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Grand Cinematic Finale Scene Footer */}
      <Footer />
    </div>
  );
}
