"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Film, Sparkles, Award } from "lucide-react";
import { EXPERIENCE_TIMELINE } from "@/data/portfolioData";
import SectionHeading from "@/components/common/SectionHeading";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        badge="JOURNEY & PRACTICE"
        title="4+ Years of Creative Experience"
        subtitle="Hands-on practice across independent freelance workflows, campus festivals, and multi-media visual production."
        animationType="scale"
      />

      <div className="relative mt-12 max-w-4xl mx-auto">
        {/* Central glowing vertical timeline rule */}
        <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500/50 to-transparent" />

        <div className="space-y-12 sm:space-y-16">
          {EXPERIENCE_TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={`${item.period}-${item.role}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                } gap-6 sm:gap-12`}
              >
                {/* Timeline Center Node Badge */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0b0c14] border-2 border-cyan-400 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                  {idx === 0 ? (
                    <Award size={13} className="text-cyan-400" />
                  ) : idx === 1 ? (
                    <Film size={13} className="text-cyan-400" />
                  ) : (
                    <Sparkles size={13} className="text-cyan-400" />
                  )}
                </div>

                {/* Content Card (Left or Right on desktop) */}
                <div className="w-full sm:w-1/2 pl-12 sm:pl-0">
                  <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-500/40 relative group">
                    {/* Period tag */}
                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-2">
                      <Calendar size={12} />
                      <span>{item.period}</span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-1 group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>

                    <div className="text-xs font-mono text-neutral-400 mb-4 pb-2 border-b border-white/10">
                      {item.focus}
                    </div>

                    <p className="text-sm text-neutral-300 dark:text-neutral-400 font-body leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {["Video Editing", "Photo Editing", "Poster Design", "Social Media Content", "Website Design"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-neutral-400 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
