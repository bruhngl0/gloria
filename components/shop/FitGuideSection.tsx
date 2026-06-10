"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";
import AnimatedText from "../ui/AnimatedText";
import EditorialPlaceholder from "../ui/EditorialPlaceholder";

export default function FitGuideSection() {
  const steps = [
    {
      title: "01 / High Waist Contour",
      desc: "Measure around the narrowest section of your torso, typically 1 inch above the navel. Our structural crepe allows +/- 1.5 inches of ease.",
    },
    {
      title: "02 / Hip Drape Span",
      desc: "Measure around the widest point of your hips. The customizable side-ruching details allow you to adjust how the drape recovery holds.",
    },
    {
      title: "03 / Vertical Line Calibration",
      desc: "Measure from your collarbone down to the knee. This helps determine your proportion segment and optimal ruching style.",
    },
  ];

  return (
    <section className="bg-sbg-white w-full py-20 md:py-28 border-t border-sbg-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Blueprint Measurement Placeholder (Span 7) */}
          <div className="lg:col-span-7 relative group">
            <div className="absolute inset-0 border border-sbg-border translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none" />
            <ScrollReveal className="relative z-10 border border-sbg-black" y={20}>
              <EditorialPlaceholder 
                label="Shop Blueprint: Proportional Sizing & Fit Guide (4:3 Aspect)" 
                aspectRatioClassName="aspect-[4/3]" 
              />
            </ScrollReveal>
          </div>

          {/* Right Column: Copy and Sizing Steps (Span 5) */}
          <ScrollReveal staggerChildren={0.12} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-sbg-gold uppercase block">
                Fit Assistance
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
                Measuring Your Lines
              </h2>
              <p className="text-xs tracking-wider leading-relaxed text-sbg-grey">
                Styled by Gloria pieces are built from the ground up around structural body line mapping, completely bypassing generic sizing metrics. Measure your shape coordinates below to choose your optimal fit.
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-6 pt-4 border-t border-sbg-border/60">
              {steps.map((st, i) => (
                <div key={i} className="space-y-1">
                  <h3 className="font-display text-xs font-bold tracking-wider text-sbg-black uppercase">
                    {st.title}
                  </h3>
                  <p className="text-xs tracking-wider leading-relaxed text-sbg-grey">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
