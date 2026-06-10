"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";
import AnimatedText from "../ui/AnimatedText";

export default function DesignPrinciples() {
  const principles = [
    {
      num: "01",
      title: "Structure Over Size",
      desc: "Standard sizes are an average that serve nobody. We build garments around skeletal proportions, drape balance points, and fabric recovery.",
    },
    {
      num: "02",
      title: "Tactile Memory",
      desc: "Every yarn and weight is vetted for structural retention. Our Viscose-rich Italian double crepe is chosen specifically to hold and smooth contours.",
    },
    {
      num: "03",
      title: "Styling Autonomy",
      desc: "We don't believe in dependance. Our consults train you to understand your own structural geometry, ensuring dressing remains simple and intuitive.",
    },
  ];

  return (
    <section className="bg-sbg-white w-full py-20 md:py-28 border-t border-sbg-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-gold block mb-3">
            Atelier Standards
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
            <AnimatedText text="Our Design Principles" type="word" />
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "48px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1.5px] bg-sbg-gold mx-auto mt-4"
          />
        </div>

        {/* List Layout */}
        <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {principles.map((pr, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              className="p-8 border border-sbg-border/40 hover:border-sbg-gold/30 hover:shadow-xl hover:shadow-sbg-gold/5 transition-all duration-300 bg-sbg-offwhite/50"
            >
              <span className="font-display text-4xl font-light text-sbg-gold opacity-70 block mb-4">
                {pr.num}
              </span>
              <h3 className="font-display text-lg font-bold tracking-wider text-sbg-black uppercase mb-3 group-hover:text-sbg-gold transition-colors duration-300">
                {pr.title}
              </h3>
              <p className="text-xs tracking-wider leading-relaxed text-sbg-grey">
                {pr.desc}
              </p>
            </motion.div>
          ))}
        </ScrollReveal>

      </div>
    </section>
  );
}
