"use client";

import React, { useRef, useState } from "react";
import { Play, Volume2, VolumeX, Sparkles, Layers, Sliders, Activity, Film } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { PortfolioProject } from "@/data/portfolioData";

interface ProjectThumbnailProps {
  project: PortfolioProject;
  isHovered: boolean;
}

export default function ProjectThumbnailVisual({ project, isHovered }: ProjectThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // If project has local video, handle smooth hover playback
  const handleMouseEnter = () => {
    if (project.video && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback to muted playback if browser blocks unmuted autoplay
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  };

  const handleMouseLeave = () => {
    if (project.video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Toggle mute on hover preview if video is present
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[280px] sm:min-h-[340px] overflow-hidden rounded-2xl bg-black flex flex-col justify-between p-4 sm:p-5"
    >
      {/* If local MP4 video exists */}
      {project.video ? (
        <>
          <video
            ref={videoRef}
            src={project.video}
            loop
            playsInline
            muted={isMuted}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-cyan-400 transition-colors"
              aria-label={isMuted ? "Unmute video preview" : "Mute video preview"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          )}
        </>
      ) : (
        /* Rich Aesthetic Studio Artwork Representation for Instagram Reel */
        <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} flex items-center justify-center overflow-hidden`}>
          {/* Subtle Geometric Overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Dynamic Graphic Archetype based on thumbnailSvgType */}
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
            {/* Ambient Center Glow */}
            <div
              className="absolute w-48 h-48 rounded-full blur-[60px] opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: project.accentColor }}
            />

            {/* Central Visual Hologram */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border backdrop-blur-xl mb-4 transition-transform duration-500 group-hover:scale-110 shadow-2xl"
                style={{
                  backgroundColor: `${project.accentColor}18`,
                  borderColor: `${project.accentColor}40`,
                  color: project.accentColor,
                }}
              >
                {project.thumbnailSvgType === "timeline" ? (
                  <Layers size={32} />
                ) : project.thumbnailSvgType === "grading" ? (
                  <Sliders size={32} />
                ) : project.thumbnailSvgType === "audio" ? (
                  <Activity size={32} />
                ) : project.thumbnailSvgType === "neon" ? (
                  <Sparkles size={32} />
                ) : (
                  <Film size={32} />
                )}
              </div>

              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-300">
                {project.category}
              </span>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide mt-1">
                {project.title}
              </h4>
            </div>

            {/* Bottom Instagram Reel Emblem */}
            <div className="absolute bottom-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 group-hover:border-cyan-400/50 transition-colors">
              <InstagramIcon size={12} className="text-pink-400" />
              <span>Official Reel Source</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] text-cyan-300 font-semibold tracking-wider">
          PROJECT {project.projectNumber}
        </span>

        <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[9px] text-neutral-300">
          {project.specs.aspectRatio}
        </span>
      </div>

      {/* Hover Center Indicator */}
      <div className="relative z-10 self-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 text-black font-semibold text-xs shadow-[0_0_20px_rgba(6,182,212,0.8)]">
          <Play size={13} className="fill-black" />
          <span>Inspect Project</span>
        </div>
      </div>

      {/* Bottom Specs HUD */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/10 bg-gradient-to-t from-black/80 to-transparent">
        <span>{project.specs.colorSpace}</span>
        <span className="text-neutral-300">{project.specs.resolution}</span>
      </div>
    </div>
  );
}
