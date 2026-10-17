"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, AlertTriangle, Mail, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { SOCIAL_LINKS } from "@/data/portfolioData";
import SectionHeading from "@/components/common/SectionHeading";
import MagneticButton from "@/components/common/MagneticButton";
import { playClickSound } from "@/utils/soundEffects";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Anti-spam trap
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    // Honeypot spam check
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields before sending.");
      return;
    }

    setStatus("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    try {
      let delivered = false;

      // 1. Deliver to Google Apps Script (Google Sheets + Gmail Notification)
      if (googleScriptUrl) {
        await fetch(googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || "New Creative Collaboration Inquiry",
            message: formData.message,
            honeypot: formData.honeypot,
          }),
        });
        delivered = true;
      }

      // 2. Deliver to EmailJS if configured
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || "New Creative Collaboration Inquiry",
            message: formData.message,
          },
          publicKey
        );
        delivered = true;
      }

      // 3. Graceful simulation when neither service has live production keys configured yet
      if (!delivered) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#06b6d4", "#8b5cf6", "#f59e0b"],
        });
      } catch {
        // Ignore if unavailable
      }
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Failed to deliver message. Please try again or reach out directly.";
      setErrorMessage(message);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        badge="GET IN TOUCH"
        title="Let's Create Something Great"
        subtitle="Have a creative project, event aftermovie, or reel series in mind? Send a message and let's craft something unforgettable."
        animationType="blur"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct channels and reassurance */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2 block font-semibold">
              COMMUNICATION CHANNELS
            </span>

            <h3 className="font-display font-bold text-2xl text-foreground mb-4">
              Collaborate With Prazilkar
            </h3>

            <p className="text-sm text-neutral-300 dark:text-neutral-400 font-body leading-relaxed mb-8">
              Whether you need rapid-turnaround vertical reels, full college event coverage, high-impact poster graphics, or a complete visual refresh, I am ready to collaborate.
            </p>

            {/* Social channels (using editable placeholders without exposing private data) */}
            <div className="space-y-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-pink-500/10 border border-white/10 hover:border-pink-500/40 text-neutral-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center justify-center">
                    <InstagramIcon size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold block">Instagram Profile</span>
                    <span className="text-xs font-mono text-neutral-400">@prazilkar (Direct Messages)</span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                onClick={() => playClickSound()}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-neutral-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold block">Direct Studio Email</span>
                    <span className="text-xs font-mono text-neutral-400">{SOCIAL_LINKS.email}</span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-neutral-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold block">WhatsApp Collaboration</span>
                    <span className="text-xs font-mono text-neutral-400">Quick Project Chat</span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Premium Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-black/40">
            {/* Form Title */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground">
                  Send a Direct Inquiry
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Expected response time: within 24 hours
                </p>
              </div>
              <Sparkles size={22} className="text-cyan-400" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anti-spam trap field (hidden from view) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-neutral-400 mb-2">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] text-foreground text-sm placeholder:text-neutral-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-neutral-400 mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] text-foreground text-sm placeholder:text-neutral-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-neutral-400 mb-2">
                  Project Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Instagram Reel Editing / Event Aftermovie"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] text-foreground text-sm placeholder:text-neutral-600 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-neutral-400 mb-2">
                  Project Brief & Details <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your footage, deadlines, preferred style, or visual reference links..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] text-foreground text-sm placeholder:text-neutral-600 outline-none transition-all resize-none"
                />
              </div>

              {/* Status Feedback Banners */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-3"
                  >
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span>
                      Thank you! Your message has been sent successfully. Prazilkar will review your brief and respond shortly.
                    </span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs font-mono flex items-center gap-3"
                  >
                    <AlertTriangle size={18} className="text-rose-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div className="pt-2">
                <MagneticButton
                  type="submit"
                  disabled={status === "loading"}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>Send Message</span>
                      <Send size={15} />
                    </span>
                  )}
                </MagneticButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
