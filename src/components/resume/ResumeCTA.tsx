"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import MagneticButton from "@/components/common/MagneticButton";
import { playClickSound } from "@/utils/soundEffects";

export default function ResumeCTA() {
  const [showNotification, setShowNotification] = useState(false);

  const handleResumeClick = (action: "view" | "download") => {
    playClickSound();
    // Check if resume.pdf exists or show graceful upload placeholder modal
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          if (action === "download") {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Prazilkar_Creative_Resume.pdf";
            link.click();
          } else {
            window.open("/resume.pdf", "_blank");
          }
        } else {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 4500);
        }
      })
      .catch(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4500);
      });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/15 relative overflow-hidden bg-gradient-to-r from-cyan-950/30 via-purple-950/20 to-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      >
        {/* Ambient lighting orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <FileText size={32} />
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                  CURRICULUM VITAE
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
                  PDF READY
                </span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                Prazilkar&apos;s Creative Resume
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-body mt-1 max-w-md">
                Complete overview of 4+ years editing practice, technical software proficiencies, and college event credentials.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => handleResumeClick("download")}
            >
              <Download size={15} />
              <span>Download Resume</span>
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="md"
              onClick={() => handleResumeClick("view")}
            >
              <ExternalLink size={15} />
              <span>View Online</span>
            </MagneticButton>
          </div>
        </div>

        {/* Graceful placeholder toast if PDF hasn't been uploaded yet */}
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-200 flex items-center gap-2"
          >
            <AlertCircle size={15} className="shrink-0 text-cyan-400" />
            <span>
              Resume file structure is prepared. Drop your custom <code className="text-white bg-black/40 px-1 py-0.5 rounded">resume.pdf</code> into the <code className="text-white bg-black/40 px-1 py-0.5 rounded">/public/</code> directory anytime to enable instant download!
            </span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
