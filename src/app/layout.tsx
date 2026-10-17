import type { Metadata, Viewport } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import CinematicBackground from "@/components/common/CinematicBackground";
import CustomCursor from "@/components/common/CustomCursor";
import Navbar from "@/components/common/Navbar";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Prazilkar — Video Editor, Photo Editor & Content Creator",
  description:
    "Production portfolio of Prazilkar. 4+ years of creative visual editing, cinematic videos, high-engagement Instagram Reels, photo retouching, poster design, and digital experiences.",
  keywords: [
    "Prazilkar",
    "Video Editor",
    "Photo Editor",
    "Content Creator",
    "Poster Designer",
    "Reels Editor",
    "Shorts Editor",
    "CapCut Editor",
    "VN Editor",
    "Color Grading",
    "Creative Visual Editor",
  ],
  authors: [{ name: "Prazilkar" }],
  creator: "Prazilkar",
  openGraph: {
    title: "Prazilkar — Video Editor, Photo Editor & Content Creator",
    description:
      "I create cinematic videos, striking visuals and digital content that turn ideas into experiences. Explore 21 featured reel projects and creative editing services.",
    url: "https://prazilkar.vercel.app",
    siteName: "Prazilkar Creative Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prazilkar — Video Editor, Photo Editor & Content Creator",
    description:
      "Cinematic Video Editor Portfolio × Futuristic Creator × Premium Creative Studio × Interactive Digital Experience",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${outfit.variable} font-body bg-[#07070a] text-foreground min-h-screen relative selection:bg-cyan-500/30`}
      >
        <ThemeProvider>
          {/* Film Grain Texture Filter */}
          <div className="film-grain" aria-hidden="true" />

          {/* Layered Cinematic Atmosphere */}
          <CinematicBackground />

          {/* Magnetic Custom Cursor (Desktop only) */}
          <CustomCursor />

          {/* Floating Glass Navigation */}
          <Navbar />

          {/* Page Body Viewport */}
          <main className="relative z-10 flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
