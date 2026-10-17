"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import About from "@/components/about/About";
import WhatIDo from "@/components/what-i-do/WhatIDo";
import Skills from "@/components/skills/Skills";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import Stats from "@/components/experience/Stats";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import Services from "@/components/services/Services";
import ResumeCTA from "@/components/resume/ResumeCTA";
import Testimonials from "@/components/testimonials/Testimonials";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { playClickSound } from "@/utils/soundEffects";

export default function WorkPage() {
  // Handle direct hash navigation when arriving from /
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden pt-24 sm:pt-28">
      {/* Portfolio Showcase Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Sparkles size={12} className="text-amber-400" />
              <span>PRODUCTION SHOWCASE & ARCHITECTURE</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-foreground">
              Prazilkar Studio Portfolio
            </h1>
          </div>

          <Link
            href="/"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400 text-xs font-mono text-neutral-300 hover:text-cyan-400 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Back to Cinematic Home</span>
          </Link>
        </div>
      </section>

      {/* 1. About Section */}
      <About />

      {/* 2. What I Do Section (5 Interactive Cards) */}
      <WhatIDo />

      {/* 3. Skills & Tools Section (9 Software Suites) */}
      <Skills />

      {/* 4. Experience & Timeline Section */}
      <ExperienceTimeline />

      {/* 5. Statistics Count-up Section */}
      <Stats />

      {/* 6. Selected Work (All 21 Instagram Reels Bento Showcase) */}
      <PortfolioGrid />

      {/* 7. All 10 Services with Get a Quote */}
      <Services />

      {/* 8. Resume Download / View Architecture */}
      <ResumeCTA />

      {/* 9. Creator Testimonials (3 cols desktop / swipe mobile) */}
      <Testimonials />

      {/* 10. Contact Section (EmailJS & Social Links) */}
      <Contact />

      {/* Grand Finale Footer */}
      <Footer />
    </div>
  );
}
