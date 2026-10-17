"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Film,
  Camera,
  PenTool,
  Share2,
  Smartphone,
  Image as ImageIcon,
  Sparkles,
  Award,
  Globe,
  Video,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { STUDIO_SERVICES, StudioService } from "@/data/portfolioData";
import SectionHeading from "@/components/common/SectionHeading";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Film,
  Camera,
  PenTool,
  Share2,
  Smartphone,
  Image: ImageIcon,
  Sparkles,
  Award,
  Globe,
  Video,
};

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        badge="SOLUTIONS & SERVICES"
        title="Creative Services"
        subtitle="End-to-end creative visual production for creators, brands, and campus committees. Transparent scoping with tailored quotes."
        animationType="slide"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STUDIO_SERVICES.map((service: StudioService, idx: number) => {
          const Icon = SERVICE_ICONS[service.iconName] || Film;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (idx % 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => playHoverTick()}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 relative group flex flex-col justify-between"
            >
              {/* Top ambient hover illumination */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: service.accent }}
              />

              <div>
                {/* Header Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-md group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: `${service.accent}15`,
                      borderColor: `${service.accent}40`,
                      color: service.accent,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <span className="font-mono text-xs text-neutral-400">
                    SERVICE 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 font-body leading-relaxed mb-4">
                  {service.fullDescription}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-1.5 mb-6">
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                      <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Get a Quote CTA Button leading to Contact */}
              <Link
                href={`/work#contact?service=${encodeURIComponent(service.title)}`}
                onClick={() => playClickSound()}
                className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-cyan-400 transition-colors"
              >
                <span>Get a Quote</span>
                <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                  <span>Contact Me</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
