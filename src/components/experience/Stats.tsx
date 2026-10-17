"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STUDIO_STATS } from "@/data/portfolioData";

function CounterItem({
  target,
  suffix,
  label,
  description,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  description: string;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

      <div>
        <div className="flex items-baseline gap-1 font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
          <span>{count}</span>
          <span className="text-cyan-400 text-3xl sm:text-4xl">{suffix}</span>
        </div>

        <h4 className="font-display font-bold text-base sm:text-lg text-foreground mb-1">
          {label}
        </h4>

        <p className="text-xs sm:text-sm text-neutral-400 font-body leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400/80">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>VERIFIED MILESTONE</span>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {STUDIO_STATS.map((stat, idx) => (
          <CounterItem
            key={stat.label}
            target={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            description={stat.description}
            delay={idx}
          />
        ))}
      </div>
    </section>
  );
}
