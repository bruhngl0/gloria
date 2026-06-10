"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";

interface StepItem {
  num: string;
  title: string;
  desc: string;
}

const STEPS_LEFT: StepItem[] = [
  {
    num: "01",
    title: "Proportion Mapping",
    desc: "We analyze your vertical lines, skeletal frame, and balance points to map your structural silhouette—completely bypassing standard sizing charts.",
  },
  {
    num: "02",
    title: "Textile Calibration",
    desc: "Identify the precise textile weights, drape speeds, and fabric stiffnesses that hold and contour your body lines without cling or resistance.",
  },
  {
    num: "03",
    title: "Symmetry Analysis",
    desc: "Evaluate natural body balance and vertical alignment axis points to establish visual equilibrium across all garment fittings.",
  },
];

const STEPS_RIGHT: StepItem[] = [
  {
    num: "04",
    title: "Capsule Curation",
    desc: "Learn to assemble a minimal, cohesive wardrobe designed around structural symmetry, completely eliminating impulse fashion purchases.",
  },
  {
    num: "05",
    title: "Fiber Calibration",
    desc: "Test fiber response and drape memory under active conditions to ensure a flawless daily wear fit across various temperatures.",
  },
  {
    num: "06",
    title: "Atelier Integration",
    desc: "Refine fit and proportions through individual structural adjustments, ensuring high silhouette harmony with zero drag.",
  },
];

// Generate SVG starburst points
const generateStarburstPoints = (pointsCount = 8, outerRadius = 200, innerRadius = 75) => {
  const cx = 200;
  const cy = 200;
  const points: string[] = [];

  for (let i = 0; i < pointsCount * 2; i++) {
    const angle = (i * Math.PI) / pointsCount - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(" ");
};

export default function MethodologySection() {
  const starburstPoints = generateStarburstPoints(8, 200, 75);

  return (
    <section className="bg-sbg-white w-full py-20 md:py-28 border-b border-sbg-border relative overflow-hidden selection:bg-sbg-black selection:text-sbg-white">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F0F0F0_1px,transparent_1px),linear-gradient(to_bottom,#F0F0F0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
          <span className="text-[8px] tracking-[0.3em] font-bold text-sbg-grey uppercase block mb-3">
            THE STYLING METHOD
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-sbg-black uppercase">
            Steps to Silhouette Harmony
          </h2>
          <div className="w-12 h-[1px] bg-sbg-black mx-auto mt-4" />
        </div>

        {/* Outer Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (3 Steps) */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <ScrollReveal staggerChildren={0.12} className="space-y-8">
              {STEPS_LEFT.map((step) => (
                <div
                  key={step.num}
                  className="bg-sbg-white border-2 border-sbg-black p-6 shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(10,10,10,1)]"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-display text-sm font-bold tracking-widest text-sbg-black uppercase">
                      {step.title}
                    </h3>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-sbg-black text-sbg-white">
                      {step.num}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-wider text-sbg-grey uppercase leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* Center Column (Starburst Graphic & Video) */}
          <div className="lg:col-span-4 flex items-center justify-center relative min-h-[300px] md:min-h-[360px] order-1 lg:order-2">
            {/* Spinning Starburst Background (Charcoal color) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] pointer-events-none"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full fill-[#2B2B2B] stroke-none">
                <polygon points={starburstPoints} />
              </svg>
            </motion.div>
            {/* Central Grayscale Video Box */}
            <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] bg-sbg-white border-2 border-sbg-black relative z-10 overflow-hidden shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] hover:scale-105 transition-transform duration-500">
              <video
                src="/images/shortdes.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full grayscale contrast-125 brightness-95"
              />
              <div className="absolute inset-0 border border-sbg-white/20 pointer-events-none" />
            </div>
          </div>

          {/* Right Column (3 Steps) */}
          <div className="lg:col-span-4 order-3">
            <ScrollReveal staggerChildren={0.12} className="space-y-8">
              {STEPS_RIGHT.map((step) => (
                <div
                  key={step.num}
                  className="bg-sbg-white border-2 border-sbg-black p-6 shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(10,10,10,1)]"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-display text-sm font-bold tracking-widest text-sbg-black uppercase">
                      {step.title}
                    </h3>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-sbg-black text-sbg-white">
                      {step.num}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-wider text-sbg-grey uppercase leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
