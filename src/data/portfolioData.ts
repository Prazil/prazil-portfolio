export interface PortfolioProject {
  id: string;
  projectNumber: string;
  title: string;
  category: string;
  description: string;
  instagramUrl: string;
  thumbnailGradient: string;
  thumbnailSvgType: 'timeline' | 'grading' | 'motion' | 'neon' | 'audio' | 'cinematic';
  video?: string; // Optional local video path
  type: 'reel' | 'video' | 'photo' | 'graphic';
  aspectRatio: 'vertical' | 'landscape' | 'square';
  gridSpan: string; // Tailwind grid span for visual rhythm
  tags: string[];
  accentColor: string;
  specs: {
    resolution: string;
    aspectRatio: string;
    colorSpace: string;
    focus: string;
  };
}

export interface CreativeTool {
  id: string;
  name: string;
  category: 'Video Editing' | 'Photo Editing' | 'Mobile & Motion' | 'Graphic Design';
  proficiencyLabel: 'Mastery' | 'Expert' | 'Advanced' | 'Core Studio Tool';
  experienceYears: string;
  description: string;
  accent: string;
  iconName: string;
  specialties: string[];
}

export interface StudioService {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  accent: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  review: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "project-01",
    projectNumber: "01",
    title: "Creative Project 01",
    category: "Reels & Shorts",
    description: "High-energy pacing, custom speed-ramping, and seamless audio synchronization crafted for maximum social engagement.",
    instagramUrl: "https://www.instagram.com/reel/Ddq34fZPmVK/?stkn=MWZyY3N4djJrN2hsMw==",
    thumbnailGradient: "from-cyan-950 via-zinc-900 to-black",
    thumbnailSvgType: "timeline",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["CapCut", "Speed Ramp", "Sound Design"],
    accentColor: "#06b6d4",
    specs: {
      resolution: "1080 × 1920 (9:16)",
      aspectRatio: "Vertical Reel",
      colorSpace: "Rec.709 Cinema",
      focus: "Rhythm & Engagement"
    }
  },
  {
    id: "project-02",
    projectNumber: "02",
    title: "Creative Project 02",
    category: "Cinematic Video",
    description: "Atmospheric visual narrative with subtle color grading, tonal balance, and cinematic lighting accents.",
    instagramUrl: "https://www.instagram.com/reel/Ddgl1pkgXuc/?stkn=MWdhbWNtaWRweDZvbg==",
    thumbnailGradient: "from-violet-950 via-zinc-900 to-black",
    thumbnailSvgType: "grading",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["Color Grading", "VN", "Atmosphere"],
    accentColor: "#8b5cf6",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16 Mobile",
      colorSpace: "Moody Cinematic",
      focus: "Visual Tone"
    }
  },
  {
    id: "project-03",
    projectNumber: "03",
    title: "Creative Project 03",
    category: "Social Media Content",
    description: "Dynamic transition design engineered with beat-driven cuts, typography placement, and vibrant color enhancement.",
    instagramUrl: "https://www.instagram.com/reel/DdS2oSPv7N8/?stkn=eTc1eDhzamI1ODZ6",
    thumbnailGradient: "from-amber-950 via-neutral-900 to-black",
    thumbnailSvgType: "motion",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["Alight Motion", "Motion Graphics", "Beat Match"],
    accentColor: "#f59e0b",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Vibrant Punch",
      focus: "Pacing & Motion"
    }
  },
  {
    id: "project-04",
    projectNumber: "04",
    title: "Creative Project 04",
    category: "Promotional Content",
    description: "Sharp visual storytelling highlighting motion dynamics, clean contrast curves, and balanced focal composition.",
    instagramUrl: "https://www.instagram.com/reel/DdLqRgXM7mv/?stkn=MXZlaXYwN2JpM2huMQ==",
    thumbnailGradient: "from-emerald-950 via-zinc-900 to-black",
    thumbnailSvgType: "cinematic",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["KineMaster", "Cut Pacing", "Audio Mix"],
    accentColor: "#10b981",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Clean Commercial",
      focus: "Brand Impact"
    }
  },
  {
    id: "project-05",
    projectNumber: "05",
    title: "Creative Project 05",
    category: "Visual Enhancement",
    description: "Creative visual treatment emphasizing lighting depth, texture preservation, and selective color saturation.",
    instagramUrl: "https://www.instagram.com/reel/DcyW8HhARnE/?stkn=am9wbmVwdXBlZmsx",
    thumbnailGradient: "from-rose-950 via-zinc-900 to-black",
    thumbnailSvgType: "grading",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["Adobe Lightroom", "Color Tone", "Lighting"],
    accentColor: "#f43f5e",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Warm Glow",
      focus: "Color Harmony"
    }
  },
  {
    id: "project-06",
    projectNumber: "06",
    title: "Creative Project 06",
    category: "Reels & Shorts",
    description: "Fast-paced rhythmic montage synchronized with precision cuts, audio risers, and impact markers.",
    instagramUrl: "https://www.instagram.com/reel/DbgFI3HhlDF/?stkn=MTBoZWtydXNsaTNlaQ==",
    thumbnailGradient: "from-blue-950 via-zinc-900 to-black",
    thumbnailSvgType: "audio",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["InShot", "Rhythm Cuts", "Audio Sync"],
    accentColor: "#3b82f6",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Dynamic High Contrast",
      focus: "Audio-Visual Sync"
    }
  },
  {
    id: "project-07",
    projectNumber: "07",
    title: "Creative Project 07",
    category: "Event Visuals",
    description: "Vibrant event memory reel combining crowd atmosphere, ambient stage lighting, and cinematic slow-motion framing.",
    instagramUrl: "https://www.instagram.com/reel/DbdVGrHAxn1/?stkn=OGR4Ynh1ZDBwcXN2",
    thumbnailGradient: "from-purple-950 via-zinc-900 to-black",
    thumbnailSvgType: "neon",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-8 row-span-2",
    tags: ["Event Edit", "Slow Motion", "Stage Lighting"],
    accentColor: "#a855f7",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16 Showcase",
      colorSpace: "Vibrant Stage",
      focus: "Event Energy"
    }
  },
  {
    id: "project-08",
    projectNumber: "08",
    title: "Creative Project 08",
    category: "Cinematic Video",
    description: "Subtle grading and mood curation highlighting character presence, scenic texture, and cinematic depth.",
    instagramUrl: "https://www.instagram.com/reel/DbDwWhqgRGi/?stkn=em44bjV4dWg0cWdr",
    thumbnailGradient: "from-teal-950 via-zinc-900 to-black",
    thumbnailSvgType: "cinematic",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["CapCut", "Cinematic Aspect", "Tone Curve"],
    accentColor: "#14b8a6",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Teal & Orange",
      focus: "Atmosphere"
    }
  },
  {
    id: "project-09",
    projectNumber: "09",
    title: "Creative Project 09",
    category: "Social Media Content",
    description: "Trendy pacing and kinetic transitions engineered specifically for algorithmic retention and visual punch.",
    instagramUrl: "https://www.instagram.com/reel/DbAS763NqKC/?stkn=eWk4OHl4MHFnOXlm",
    thumbnailGradient: "from-indigo-950 via-zinc-900 to-black",
    thumbnailSvgType: "motion",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["VN", "Transitions", "Trend Layout"],
    accentColor: "#6366f1",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Punchy Digital",
      focus: "Retention"
    }
  },
  {
    id: "project-10",
    projectNumber: "10",
    title: "Creative Project 10",
    category: "Promotional Content",
    description: "Visual hierarchy and framing structured to spotlight key moments with crisp visual rhythm.",
    instagramUrl: "https://www.instagram.com/reel/Da7gYliv4ea/?stkn=am8wcTI4Zmx6dDN1",
    thumbnailGradient: "from-fuchsia-950 via-zinc-900 to-black",
    thumbnailSvgType: "timeline",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["Adobe Photoshop", "Visual Accents", "Pacing"],
    accentColor: "#d946ef",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Custom Palette",
      focus: "Framing"
    }
  },
  {
    id: "project-11",
    projectNumber: "11",
    title: "Creative Project 11",
    category: "Reels & Shorts",
    description: "Audio-driven cut transitions with micro-zooms and dynamic motion blur for high-velocity viewing.",
    instagramUrl: "https://www.instagram.com/reel/DaskDVeSGGz/?stkn=Z3ptamU4aDNya2xo",
    thumbnailGradient: "from-sky-950 via-zinc-900 to-black",
    thumbnailSvgType: "audio",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["Alight Motion", "Motion Blur", "Audio Stems"],
    accentColor: "#0ea5e9",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Digital Clean",
      focus: "Velocity"
    }
  },
  {
    id: "project-12",
    projectNumber: "12",
    title: "Creative Project 12",
    category: "Visual Enhancement",
    description: "Fine-tuned exposure balance and shadow recovery revealing intricate details and vivid highlights.",
    instagramUrl: "https://www.instagram.com/reel/DajuFTcs6L1/?stkn=ZWtwNGNjb3Bhbnhj",
    thumbnailGradient: "from-amber-900 via-neutral-900 to-black",
    thumbnailSvgType: "grading",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["Picsart", "Detail Sharpen", "Contrast"],
    accentColor: "#d97706",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Warm Glow",
      focus: "Detail & Texture"
    }
  },
  {
    id: "project-13",
    projectNumber: "13",
    title: "Creative Project 13",
    category: "Cinematic Video",
    description: "Evocative color treatment blending soft film glow with natural skin tones and deep midnight contrasts.",
    instagramUrl: "https://www.instagram.com/reel/DYCf80fJ11w/?stkn=MW90eGg4cGQ5MG5xZw==",
    thumbnailGradient: "from-emerald-950 via-zinc-900 to-black",
    thumbnailSvgType: "cinematic",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["CapCut", "Film Emulation", "Grade"],
    accentColor: "#059669",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Film Halation",
      focus: "Cinematic Depth"
    }
  },
  {
    id: "project-14",
    projectNumber: "14",
    title: "Creative Project 14",
    category: "Social Media Content",
    description: "Clean aesthetic edits optimized with modern text motion, subtle drop shadows, and snappy cuts.",
    instagramUrl: "https://www.instagram.com/reel/DYAFNCKzG6y/?stkn=MTB0eTlndHE0cnk0eg==",
    thumbnailGradient: "from-pink-950 via-zinc-900 to-black",
    thumbnailSvgType: "motion",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["Canva", "Graphic Overlay", "Clean Cut"],
    accentColor: "#ec4899",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Modern Fresh",
      focus: "Layout & Text"
    }
  },
  {
    id: "project-15",
    projectNumber: "15",
    title: "Creative Project 15",
    category: "Reels & Shorts",
    description: "Fast multi-angle editing featuring fluid spatial pans, audio hit accents, and color punch.",
    instagramUrl: "https://www.instagram.com/reel/DXmRLJ0ky2y/?stkn=MWp6cHNsYmkzemwzOA==",
    thumbnailGradient: "from-violet-900 via-neutral-900 to-black",
    thumbnailSvgType: "timeline",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["KineMaster", "Multi-Track", "Audio FX"],
    accentColor: "#7c3aed",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Crisp Studio",
      focus: "Multi-Angle Flow"
    }
  },
  {
    id: "project-16",
    projectNumber: "16",
    title: "Creative Project 16",
    category: "Event Visuals",
    description: "Dynamic showcase reel capturing collective emotion, live energy, and smooth tempo shifts.",
    instagramUrl: "https://www.instagram.com/reel/DWu8gsagfHY/?stkn=MXh4aTEzOG9sZG1uNQ==",
    thumbnailGradient: "from-cyan-950 via-zinc-900 to-black",
    thumbnailSvgType: "neon",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["College Event", "Highlight Reel", "Beat Synced"],
    accentColor: "#0891b2",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Festival Neon",
      focus: "Crowd Momentum"
    }
  },
  {
    id: "project-17",
    projectNumber: "17",
    title: "Creative Project 17",
    category: "Promotional Content",
    description: "Polished promotional composition with focused timing, visual highlights, and balanced composition.",
    instagramUrl: "https://www.instagram.com/reel/DWq2F-nl8-F/?stkn=MTF3OXNkenIyMzZrbQ==",
    thumbnailGradient: "from-amber-950 via-zinc-900 to-black",
    thumbnailSvgType: "grading",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["VN", "Promo Edit", "Clean Cut"],
    accentColor: "#b45309",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Punch Commercial",
      focus: "Message Clarity"
    }
  },
  {
    id: "project-18",
    projectNumber: "18",
    title: "Creative Project 18",
    category: "Visual Enhancement",
    description: "Creative split-tone color grade and light leak accents bringing vintage analog character into modern video.",
    instagramUrl: "https://www.instagram.com/reel/DWRYZT4Dt_7/?stkn=Yjd4dzE3eGQ3Z3Rk",
    thumbnailGradient: "from-rose-900 via-neutral-900 to-black",
    thumbnailSvgType: "cinematic",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["Adobe Lightroom", "Light Leaks", "Tone Curve"],
    accentColor: "#e11d48",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Vintage Warm",
      focus: "Analog Feel"
    }
  },
  {
    id: "project-19",
    projectNumber: "19",
    title: "Creative Project 19",
    category: "Reels & Shorts",
    description: "High impact hook pacing with dynamic text highlights, snap zooms, and beat drop synchronization.",
    instagramUrl: "https://www.instagram.com/reel/DWG5lbUkn1X/?stkn=amZsYzF6bW5tcXh5",
    thumbnailGradient: "from-blue-900 via-zinc-900 to-black",
    thumbnailSvgType: "audio",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
    tags: ["CapCut", "Hook Design", "Audio Drop"],
    accentColor: "#2563eb",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Saturated Electric",
      focus: "Instant Hook"
    }
  },
  {
    id: "project-20",
    projectNumber: "20",
    title: "Creative Project 20",
    category: "Cinematic Video",
    description: "Refined slow motion capture with customized curve acceleration, deep shadows, and subtle lens bloom.",
    instagramUrl: "https://www.instagram.com/reel/DWB3NKzkwHd/?stkn=NXV1c2JhZGE4aWNp",
    thumbnailGradient: "from-teal-900 via-zinc-900 to-black",
    thumbnailSvgType: "motion",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
    tags: ["Alight Motion", "Speed Curve", "Lens Flare"],
    accentColor: "#0d9488",
    specs: {
      resolution: "1080 × 1920",
      aspectRatio: "9:16",
      colorSpace: "Deep Ambient",
      focus: "Curve Motion"
    }
  },
  {
    id: "project-21",
    projectNumber: "21",
    title: "Creative Project 21",
    category: "Creative Showcase",
    description: "Grand finale visual synthesis combining rapid sequence cuts, precision sound design, and rich cinematic color grade.",
    instagramUrl: "https://www.instagram.com/reel/Dd_A5sHykPu/?stkn=MWV3cjkyZzNvcW9qcQ==",
    thumbnailGradient: "from-purple-900 via-zinc-900 to-black",
    thumbnailSvgType: "timeline",
    type: "reel",
    aspectRatio: "vertical",
    gridSpan: "col-span-12 md:col-span-12 lg:col-span-8 row-span-2",
    tags: ["Studio Master", "Sound FX", "Full Grade"],
    accentColor: "#9333ea",
    specs: {
      resolution: "1080 × 1920 Full HD",
      aspectRatio: "9:16 Cinematic Master",
      colorSpace: "Rec.709 Ultra",
      focus: "Masterpiece Synthesis"
    }
  }
];

export const CREATIVE_TOOLS: CreativeTool[] = [
  {
    id: "capcut",
    name: "CapCut",
    category: "Video Editing",
    proficiencyLabel: "Mastery",
    experienceYears: "4+ Years",
    description: "Precision keyframing, velocity curve speed-ramping, 3D tracking, and dynamic reel pacing optimized for viral engagement.",
    accent: "#00e5ff",
    iconName: "Video",
    specialties: ["Speed Ramps", "Keyframe Motion", "Beat Syncing", "Auto-Captions"]
  },
  {
    id: "picsart",
    name: "Picsart",
    category: "Photo Editing",
    proficiencyLabel: "Mastery",
    experienceYears: "4+ Years",
    description: "Creative visual composite layers, AI cutout separation, glow displacement, and high-impact social graphic typography.",
    accent: "#ff2d78",
    iconName: "Sparkles",
    specialties: ["Compositing", "Blend Modes", "Poster Art", "Color Effects"]
  },
  {
    id: "kinemaster",
    name: "KineMaster",
    category: "Video Editing",
    proficiencyLabel: "Expert",
    experienceYears: "3+ Years",
    description: "Multi-track audio-visual mixing, chroma key compositing, precise slice editing, and custom transition sequences.",
    accent: "#ff3d00",
    iconName: "Layers",
    specialties: ["Multi-Track", "Chroma Key", "Audio Mixing", "Custom FX"]
  },
  {
    id: "canva",
    name: "Canva",
    category: "Graphic Design",
    proficiencyLabel: "Mastery",
    experienceYears: "4+ Years",
    description: "High-conversion thumbnail architecture, event flyers, certificate designs, and brand typography systems.",
    accent: "#00c4cc",
    iconName: "Palette",
    specialties: ["Thumbnails", "Certificates", "Event Posters", "Social Assets"]
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    category: "Photo Editing",
    proficiencyLabel: "Advanced",
    experienceYears: "3+ Years",
    description: "Professional raster manipulation, high-frequency separation retouching, light sculpting, and precision composite artwork.",
    accent: "#31a8ff",
    iconName: "Image",
    specialties: ["Retouching", "Color Curves", "Masking", "Poster Layouts"]
  },
  {
    id: "lightroom",
    name: "Adobe Lightroom",
    category: "Photo Editing",
    proficiencyLabel: "Advanced",
    experienceYears: "3+ Years",
    description: "Mastery of tone curves, HSL color grade palettes, selective masking, and cinematic cinematic preset engineering.",
    accent: "#ff9100",
    iconName: "Sliders",
    specialties: ["Tone Curves", "HSL Grading", "Color Harmony", "RAW Processing"]
  },
  {
    id: "alightmotion",
    name: "Alight Motion",
    category: "Mobile & Motion",
    proficiencyLabel: "Expert",
    experienceYears: "3+ Years",
    description: "Vector motion graphics, kinetic typography animation, bezier curve smoothing, and custom optical visual effects.",
    accent: "#00f076",
    iconName: "Activity",
    specialties: ["Bezier Motion", "Kinetic Typography", "Visual FX", "Camera Panning"]
  },
  {
    id: "vn",
    name: "VN",
    category: "Video Editing",
    proficiencyLabel: "Mastery",
    experienceYears: "4+ Years",
    description: "Clean non-linear timeline assembly, curve velocity control, LUT color grading, and broadcast-grade audio timing.",
    accent: "#3b82f6",
    iconName: "Film",
    specialties: ["Curve Velocity", "LUT Application", "Precise Splice", "Sound FX Sync"]
  },
  {
    id: "inshot",
    name: "InShot",
    category: "Video Editing",
    proficiencyLabel: "Mastery",
    experienceYears: "4+ Years",
    description: "Rapid social turnarounds, canvas framing adaptation, sticker animation, sound effect stems, and quick high-fidelity exports.",
    accent: "#ec4899",
    iconName: "Scissors",
    specialties: ["Canvas Sizing", "Sound Stems", "Quick Cuts", "Speed FX"]
  }
];

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: "video-editing",
    title: "Video Editing",
    shortDescription: "Cinematic edits, pacing, and visual storytelling tailored to keep viewers captivated from the first frame.",
    fullDescription: "From raw footage to a finished cinematic experience. Includes audio cleanup, seamless transitions, precision cut timing, and atmospheric sound design.",
    deliverables: ["Full HD/4K Master", "Cinematic Sound Design", "Seamless Cut Pacing", "Color Tuning"],
    accent: "#06b6d4",
    iconName: "Film"
  },
  {
    id: "photo-editing",
    title: "Photo Editing",
    shortDescription: "Creative photo enhancement, skin retouching, color grading, and dynamic manipulation.",
    fullDescription: "Professional treatment for portraits, creative compositions, and event photographs with tailored tone curves, frequency separation, and creative color grades.",
    deliverables: ["High-Res Export", "Color Grading", "Detail Retouching", "Background Refinement"],
    accent: "#8b5cf6",
    iconName: "Camera"
  },
  {
    id: "poster-graphic-design",
    title: "Poster / Graphic Design",
    shortDescription: "Eye-catching posters, promotional graphics, flyers, and event visual identities.",
    fullDescription: "Impactful typography, balanced visual hierarchy, and striking graphic assets designed for college events, parties, announcements, and product campaigns.",
    deliverables: ["Print-Ready CMYK / Digital RGB", "Custom Layouts", "Typography Hierarchy", "Vector Elements"],
    accent: "#f59e0b",
    iconName: "PenTool"
  },
  {
    id: "social-media-content",
    title: "Social Media Content Creation",
    shortDescription: "Creative visual content designed specifically for modern algorithms and audience retention.",
    fullDescription: "Data-driven creative assets optimized for maximum watch-time, click-through rates, and brand identity across all primary social channels.",
    deliverables: ["Platform-Optimized Formats", "Engagement Hooks", "Consistent Aesthetic", "Fast Turnaround"],
    accent: "#ec4899",
    iconName: "Share2"
  },
  {
    id: "reels-shorts-editing",
    title: "Reels / Shorts Editing",
    shortDescription: "High-retention vertical videos with snappy beat-synced cuts, captions, and visual hooks.",
    fullDescription: "Tailored 9:16 vertical storytelling crafted for Instagram Reels, YouTube Shorts, and TikTok with punchy pacing, SFX markers, and custom motion graphics.",
    deliverables: ["9:16 High-Res Output", "Beat-Synced Cuts", "Animated Captions", "Audio Dynamics"],
    accent: "#3b82f6",
    iconName: "Smartphone"
  },
  {
    id: "thumbnail-design",
    title: "Thumbnail Design",
    shortDescription: "High-CTR clickable thumbnails that demand attention in crowded digital feeds.",
    fullDescription: "Psychologically engineered thumbnail designs with expressive subject separation, legible bold typography, vibrant contrast, and strategic focal points.",
    deliverables: ["Full HD Thumbnails", "Subject Cutouts & Glows", "High-Contrast Colors", "A/B Variants"],
    accent: "#10b981",
    iconName: "Image"
  },
  {
    id: "event-video-editing",
    title: "Event / Function Video Editing",
    shortDescription: "High-energy aftermovies, college fests, cultural nights, and milestone function edits.",
    fullDescription: "Preserving raw live emotion and crowd energy into an unforgettable cinematic recap with stage lights matching, rhythm transitions, and memorable audio overlays.",
    deliverables: ["Teaser & Full Recap", "Stage Lighting Balance", "Crowd Energy Pacing", "Audio Mastering"],
    accent: "#a855f7",
    iconName: "Sparkles"
  },
  {
    id: "certificate-design",
    title: "Certificate Design",
    shortDescription: "Prestige certificates for college events, competitions, workshops, and achievements.",
    fullDescription: "Sophisticated certificate templates featuring elegant borders, official crest alignments, authentic typography, and customizable participant data fields.",
    deliverables: ["Printable PDF & Vector Formats", "Editable Data Fields", "Elegant Design System", "High-Res Badges"],
    accent: "#d97706",
    iconName: "Award"
  },
  {
    id: "website-design",
    title: "Website Design",
    shortDescription: "Modern, visually striking web interfaces and digital experiences for creatives & brands.",
    fullDescription: "Responsive, aesthetic web interfaces that bring creative portfolios, landing pages, and digital presences alive with fluid animations and rich dark aesthetics.",
    deliverables: ["Responsive UI/UX", "Modern Design Systems", "Interactive Prototypes", "Visual Assets"],
    accent: "#0ea5e9",
    iconName: "Globe"
  },
  {
    id: "promotional-video-editing",
    title: "Promotional Video Editing",
    shortDescription: "Compelling commercial promos that highlight offerings with clear creative direction.",
    fullDescription: "Polished promotional edits designed for service launches, personal branding, sponsor campaigns, and organizational announcements.",
    deliverables: ["Teaser & Master Cuts", "Brand Identity Match", "Call-to-Action Integration", "Sound Design"],
    accent: "#f43f5e",
    iconName: "Video"
  }
];

export const STUDIO_STATS = [
  { value: 4, suffix: "+", label: "Years Experience", description: "Hands-on editing & design practice" },
  { value: 100, suffix: "+", label: "Videos Edited", description: "Reels, promos, and event recaps" },
  { value: 200, suffix: "+", label: "Photos Edited", description: "Color graded, retouched & enhanced" },
  { value: 50, suffix: "+", label: "Posters Designed", description: "College events & creative flyers" },
  { value: 10, suffix: "+", label: "College Events", description: "Creative contributor & visual lead" },
  { value: 50, suffix: "+", label: "Projects Completed", description: "Delivered across media disciplines" }
];

export const EXPERIENCE_TIMELINE = [
  {
    period: "2022 — Present",
    role: "Freelance Creative Visual Editor",
    focus: "Video Editing • Photo Editing • Social Media Content",
    description: "Directing independent visual editing workflows for creators, students, and social projects. Specializing in high-engagement Instagram Reels, color grading, thumbnail art, and short-form storytelling using CapCut, VN, and Adobe suite."
  },
  {
    period: "2022 — Present",
    role: "College Event Creative Contributor",
    focus: "Event Aftermovies • Poster Design • Certificate Architecture",
    description: "Lead visual creator for campus cultural festivals, academic symposiums, and sports meets. Designed event brand identities, promo teasers, certificates of achievement, and main stage visual banners."
  },
  {
    period: "2021 — 2022",
    role: "Independent Photo & Video Specialist",
    focus: "Visual Experimentation • Tool Mastery • Graphic Design",
    description: "Deepened technical mastery across Alight Motion, KineMaster, Picsart, and Adobe Lightroom. Built a rigorous foundation in keyframe animation, velocity curve modulation, and precision tone-curve grading."
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-01",
    name: "Campus Event Organizer",
    role: "Cultural Committee Lead",
    review: "Prazilkar's video editing transformed our college fest recap into a cinematic spectacle. The speed ramping, beat-drops, and stage lighting color grading captured the exact euphoria of the night."
  },
  {
    id: "test-02",
    name: "Social Content Creator",
    role: "Digital Influencer",
    review: "The pacing and motion transitions Prazilkar delivers on Reels consistently spike our retention metrics. He understands how to hook an audience within the first two seconds."
  },
  {
    id: "test-03",
    name: "Student Club President",
    role: "Creative Arts Society",
    review: "From vibrant event posters to professional certificates and social teasers, Prazilkar consistently delivers polished, eye-catching visual work on tight deadlines."
  }
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/reel/Ddq34fZPmVK/", // Easily editable
  email: "hello@prazilkar.com", // Easily editable
  whatsapp: "https://wa.me/?text=Hi%20Prazilkar,%20I%20would%20like%20to%20collaborate%20on%20a%20project", // Easily editable
  portfolioUrl: "https://prazilkar.vercel.app"
};
