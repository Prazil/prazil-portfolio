"use client";

import React, { useState } from "react";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "@/data/portfolioData";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import PortfolioViewer from "@/components/portfolio/PortfolioViewer";
import SectionHeading from "@/components/common/SectionHeading";

export default function PortfolioGrid() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        badge="PRODUCTION REELS & VISUALS"
        title="Selected Work"
        subtitle="Explore 21 real production Instagram Reels, cinematic cuts, and digital visual edits. Built for velocity, engagement, and visual rhythm."
        animationType="blur"
      />

      {/* Bento / Masonry Cinematic Grid displaying all 21 projects together */}
      <div className="grid grid-cols-12 gap-5 sm:gap-6 auto-rows-[auto]">
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <PortfolioCard
            key={project.id}
            project={project}
            onSelect={(proj) => setSelectedProject(proj)}
            index={index}
          />
        ))}
      </div>

      {/* Fullscreen Cinematic Project Viewer */}
      <PortfolioViewer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
