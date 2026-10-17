# Prazil Portfolio

A modern, high-performance creative portfolio website for **Prazil** — Visual & Graphic Designer, 2D Animator, and Video Editor.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **Interactive Visual Showcase**: Filterable portfolio gallery featuring Instagram Reels, motion graphics, branding identity, 3D artwork, and client highlights with full-screen interactive preview.
- **Micro-Interactions & Audio**: Physics-based magnetic buttons, interactive cursor effects, and subtle audio feedback (with sound toggle).
- **Contact System**:
  - Direct integration with **Google Apps Script** (saves submissions directly into Google Sheets and triggers automated email notifications).
  - Optional fallback to **EmailJS**.
- **Dark / Light Theme Support**: Seamless theme switching with persistent user preferences.
- **Fully Responsive & Accessible**: Pixel-perfect design optimized for desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **FX**: Canvas Confetti & Web Audio API
- **Language**: TypeScript

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Prazil/prazil-portfolio.git
cd prazil-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and set your backend URLs:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the portfolio.

---

## 📦 Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

Created by [Prazil](https://github.com/Prazil). All rights reserved.
