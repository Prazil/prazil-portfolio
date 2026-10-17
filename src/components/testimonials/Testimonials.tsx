"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/portfolioData";
import SectionHeading from "@/components/common/SectionHeading";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

export default function Testimonials() {
  const [mobileIndex, setMobileIndex] = useState(0);

  const nextSlide = () => {
    playClickSound();
    setMobileIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevSlide = () => {
    playClickSound();
    setMobileIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        badge="COLLABORATION FEEDBACK"
        title="Creator Testimonials"
        subtitle="Endorsements and collaboration feedback from campus event coordinators, student organizers, and creators."
        animationType="blur"
      />

      {/* Desktop Layout: 3 Columns Grid */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {TESTIMONIALS_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => playHoverTick()}
            className="glass-card rounded-3xl p-7 border border-white/10 relative group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Quote size={18} />
              </div>

              <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-300 font-body leading-relaxed mb-6 italic">
                &ldquo;{item.review}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              {/* Initials monogram avatar (no fake photos) */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-display font-bold text-sm text-cyan-300">
                {item.name.charAt(0)}
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-foreground">
                  {item.name}
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  {item.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Layout: Swipeable Carousel */}
      <div className="md:hidden relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={TESTIMONIALS_DATA[mobileIndex].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="glass-card rounded-3xl p-7 border border-white/10 w-full flex flex-col justify-between min-h-[260px]"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
                <Quote size={18} />
              </div>

              <p className="text-sm text-neutral-300 font-body leading-relaxed mb-6 italic">
                &ldquo;{TESTIMONIALS_DATA[mobileIndex].review}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-display font-bold text-sm text-cyan-300">
                {TESTIMONIALS_DATA[mobileIndex].name.charAt(0)}
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-foreground">
                  {TESTIMONIALS_DATA[mobileIndex].name}
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  {TESTIMONIALS_DATA[mobileIndex].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:text-cyan-400 active:scale-95 transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-1.5">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === mobileIndex ? "w-6 bg-cyan-400" : "bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:text-cyan-400 active:scale-95 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
