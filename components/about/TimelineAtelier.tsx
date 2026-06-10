"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";
import AnimatedText from "../ui/AnimatedText";

export default function TimelineAtelier() {
  const milestones = [
    {
      year: "2020",
      title: "The Blueprint",
      desc: "Founder Gloria G. departs traditional commercial fashion design to map vertical proportions and skeletal silhouettes, seeking to reverse sizing bias.",
    },
    {
      year: "2022",
      title: "Como Textile Labs",
      desc: "Collaborating directly with double-knit circular loom mills in Como, Italy, we develop a heavyweight viscosity crepe fabric with elastic memory.",
    },
    {
      year: "2024",
      title: "Virtual Consultation Launch",
      desc: "Launching remote personal styling programs, guiding clients internationally to identify shape proportions, fabric drape, and wardrobe geometry.",
    },
    {
      year: "2026",
      title: "Storefront Debut",
      desc: "SBG launches our digital storefront offering the signature customizable 'One for All' dress, introducing structural fitting to the public.",
    },
  ];

  return (
    <section className="bg-sbg-offwhite w-full py-20 md:py-32 border-t border-b border-sbg-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-gold block mb-3">
            Atelier Timeline
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
            <AnimatedText text="The Journey of SBG" type="word" />
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "48px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1.5px] bg-sbg-gold mx-auto mt-4"
          />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-sbg-border/60 pl-8 ml-4 space-y-12">
          {milestones.map((m, idx) => (
            <ScrollReveal key={idx} y={15} delay={idx * 0.1} className="relative group">
              {/* Dot on Timeline */}
              <div className="absolute -left-[41px] top-1.5 h-[17px] w-[17px] rounded-full border border-sbg-black bg-sbg-white group-hover:border-sbg-gold group-hover:bg-sbg-gold transition-colors duration-300" />
              
              <div className="space-y-2">
                <span className="font-display text-2xl font-light text-sbg-gold tracking-wide block">
                  {m.year}
                </span>
                <h3 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
                  {m.title}
                </h3>
                <p className="text-xs tracking-wider leading-relaxed text-sbg-grey max-w-2xl">
                  {m.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
