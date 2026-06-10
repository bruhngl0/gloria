"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ConsultationBox() {
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
      className="relative max-w-3xl mx-auto border border-sbg-black p-8 md:p-12 mb-20 text-center overflow-hidden group transition-all duration-500 hover:border-sbg-gold/45 hover:shadow-2xl hover:shadow-sbg-gold/5"
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
            ? `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, rgba(197, 168, 128, 0.08), transparent 80%)`
            : "radial-gradient(500px circle at center, rgba(197, 168, 128, 0.02), transparent 80%)",
        }}
      />

      {/* Elegant double border design */}
      <div className="absolute inset-2 md:inset-3 border border-sbg-border/40 pointer-events-none group-hover:border-sbg-gold/20 transition-colors duration-500" />

      <div className="relative z-10 space-y-6">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-grey group-hover:text-sbg-gold transition-colors duration-300 block">
          Start Here
        </span>
        
        <h2 className="font-display text-2xl md:text-3xl font-bold text-sbg-black uppercase tracking-wider">
          30-Minute Initial Consultation
        </h2>
        
        <p className="text-xs tracking-wider leading-relaxed text-sbg-grey max-w-xl mx-auto">
          {/* CLIENT COPY */}
          New to SBG? Every full styling experience begins here. In this virtual meet-up, we'll discuss your styling goals, identify your shape profile, and match you with the perfect program.
        </p>
        
        <p className="text-sm font-semibold tracking-wider text-sbg-black">
          $25.00 CAD
        </p>

        <div className="pt-2">
          {/* Direct Booking to Calendly */}
          <a
            href="https://calendly.com/styledbygloria/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border border-sbg-black text-xs font-bold uppercase tracking-widest bg-sbg-black text-sbg-white hover:bg-sbg-white hover:text-sbg-black transition-all duration-300 w-full sm:w-auto"
          >
            Book Your Consultation
          </a>
        </div>
      </div>
    </motion.div>
  );
}
