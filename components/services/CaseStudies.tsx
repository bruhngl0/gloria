"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";
import AnimatedText from "../ui/AnimatedText";
import EditorialPlaceholder from "../ui/EditorialPlaceholder";

export default function CaseStudies() {
  const cases = [
    {
      label: "Case Study 01: Capsule Curation",
      client: "Pear Shape Profile",
      challenge: "Executive role. Flooded with fast-fashion items that stretch out, drape incorrectly, and look unprofessional.",
      solution: "Conducted virtual body line mapping and closet audit. Replaced high-shrink synthetic blends with Italian Viscose crepe tailoring. Selected pieces designed for high waist contours and vertical balance.",
      aspectLabel: "Pear Shape Line Mapping Study (3:4 Ratio)"
    },
    {
      label: "Case Study 02: Silhouette Proportions",
      client: "Inverted Triangle Profile",
      challenge: "Shoulder lines dwarfed by bulky un-tailored structured jackets, resulting in boxy fitting that hides her natural curves.",
      solution: "Assessed balance points to guide length selections. Recommended customizable wrap cuts and customizable cowl draping to soften shoulders. Curated tailored adjustments for sleeve offsets.",
      aspectLabel: "Rectangle / Triangle Balance Point Study (3:4 Ratio)"
    }
  ];

  return (
    <section className="bg-sbg-offwhite w-full py-20 md:py-28 border-t border-sbg-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-gold block mb-3">
            Case Archive
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
            <AnimatedText text="Client Transformations" type="word" />
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "48px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1.5px] bg-sbg-gold mx-auto mt-4"
          />
        </div>

        {/* 2 Column Grid */}
        <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {cases.map((c, idx) => (
            <div key={idx} className="space-y-6 group">
              
              {/* Offset border placeholder */}
              <div className="relative">
                <div className="absolute inset-0 border border-sbg-border translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1 pointer-events-none" />
                <div className="relative z-10 border border-sbg-black">
                  <EditorialPlaceholder 
                    label={c.aspectLabel} 
                    aspectRatioClassName="aspect-[3/4]" 
                  />
                </div>
              </div>

              {/* Copy */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold tracking-widest text-sbg-gold uppercase block">
                  {c.label}
                </span>
                <h3 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
                  Client Profile: {c.client}
                </h3>
                <p className="text-xs leading-relaxed text-sbg-grey">
                  <strong className="text-sbg-black font-semibold uppercase text-[10px] tracking-wider block mt-2">Challenge:</strong> 
                  {c.challenge}
                </p>
                <p className="text-xs leading-relaxed text-sbg-grey">
                  <strong className="text-sbg-black font-semibold uppercase text-[10px] tracking-wider block mt-2">Solution:</strong> 
                  {c.solution}
                </p>
              </div>

            </div>
          ))}
        </ScrollReveal>

      </div>
    </section>
  );
}
