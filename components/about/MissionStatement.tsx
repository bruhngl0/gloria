"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import AnimatedText from "@/components/ui/AnimatedText";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500"],
  display: "swap",
});

export default function MissionStatement() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-sbg-offwhite border border-sbg-border p-12 md:p-16 text-center max-w-4xl mx-auto mb-20 overflow-hidden group transition-all duration-500 hover:border-sbg-gold/45 hover:shadow-2xl hover:shadow-sbg-gold/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
    >
      {/* Spotlight cursor follow gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(197, 168, 128, 0.08), transparent 80%)`
            : "radial-gradient(600px circle at center, rgba(197, 168, 128, 0.02), transparent 80%)",
        }}
      />

      {/* Elegant double border design */}
      <div className="absolute inset-3 border border-sbg-border/30 pointer-events-none group-hover:border-sbg-gold/20 transition-colors duration-500" />

      {/* Large decorative quotation marks */}
      <span className="font-serif text-[140px] text-stone-200/40 group-hover:text-sbg-gold/15 select-none absolute -top-4 left-6 leading-none transition-colors duration-500 pointer-events-none">
        &ldquo;
      </span>
      <span className="font-serif text-[140px] text-stone-200/40 group-hover:text-sbg-gold/15 select-none absolute -bottom-16 right-6 leading-none transition-colors duration-500 pointer-events-none">
        &rdquo;
      </span>

      <div className="relative z-10 space-y-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-grey block">
          Our Mission Statement
        </span>
        
        {/* Animated Underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[1.5px] bg-sbg-gold mx-auto"
        />

        <p className={`${playfair.className} text-xl md:text-3xl font-light tracking-wide text-sbg-black italic max-w-2xl mx-auto leading-relaxed pt-2`}>
          {/* CLIENT COPY */}
          <AnimatedText
            text='"To educate, empower, and design for real silhouettes — helping every woman respect and love her body more."'
            type="word"
            duration={1.0}
          />
        </p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[9px] font-bold tracking-[0.25em] uppercase text-sbg-grey/85 pt-4"
        >
          — Gloria G., Founder
        </motion.div>
      </div>
    </motion.div>
  );
}
