"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const tickerStyles = `
  @keyframes ticker-slide {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-25%); }
  }
  .ticker-content {
    display: flex;
    white-space: nowrap;
    width: max-content;
    animation: ticker-slide 32s linear infinite;
    will-change: transform;
  }
`;

export default function CoverHeroSection() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).__sbg_loading_complete) {
        setLoadingComplete(true);
      } else {
        const handleComplete = () => setLoadingComplete(true);
        window.addEventListener("sbg-loading-complete", handleComplete);
        return () => window.removeEventListener("sbg-loading-complete", handleComplete);
      }
    } else {
      setLoadingComplete(true);
    }
  }, []);

  const handleScrollDown = () => {
    document.getElementById("dress-showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  const words = ["Silhouette", "Symmetry", "Drape", "Line", "Balance", "Harmony", "Intentional", "Proportions"];
  // Quadruple for a seamless loop with no jump
  const tickerList = [...words, ...words, ...words, ...words];

  return (
    <section className="relative w-full min-h-screen pt-20 flex items-center justify-center bg-sbg-white overflow-hidden select-none border-b border-sbg-border">
      <style>{tickerStyles}</style>

      {/* Top Dark Vignette overlay for Header legibility */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/45 via-black/10 to-transparent z-30 pointer-events-none" />

      {/* Editorial Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F0F0F0_1px,transparent_1px),linear-gradient(to_bottom,#F0F0F0_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

      {/* Center Image Collage (Symmetrical Staggered Triptych) */}
      <div className="relative w-full h-[72vh] md:h-[65vh] max-w-5xl mx-auto flex items-center justify-center gap-0 md:gap-8 z-10 px-4">
        
        {/* Left Card: Staggered down/left on mobile, staggered down on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -40, y: 40 }}
          animate={loadingComplete ? { opacity: 0.85, x: 0, y: 0 } : { opacity: 0, x: -40, y: 40 }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
          className="absolute left-4 top-2 md:relative md:left-auto md:top-auto w-[40%] sm:w-[25%] md:w-[24%] aspect-[3/4] border border-sbg-border/60 bg-sbg-offwhite z-0 shadow-sm md:shadow-md overflow-hidden md:mt-12 hover:scale-105 transition-transform duration-500"
        >
          <Image
            src="/images/about-hero.jpg"
            alt="Styled by Gloria campaign style"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 40vw, 25vw"
          />
        </motion.div>

        {/* Main Center Portrait Image Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={loadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative w-[56%] sm:w-[45%] md:w-[42%] aspect-[3/4] border-2 border-sbg-black bg-sbg-offwhite z-10 shadow-md md:shadow-[10px_10px_0px_rgba(10,10,10,1)] overflow-hidden hover:scale-[1.02] transition-transform duration-500"
        >
          <Image
            src="/images/hero.jpg"
            alt="Styled by Gloria silhouette campaign"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 60vw, 45vw"
          />
        </motion.div>

        {/* Right Card: Staggered down/right on mobile, staggered down on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 40 }}
          animate={loadingComplete ? { opacity: 0.85, x: 0, y: 0 } : { opacity: 0, x: 40, y: 40 }}
          transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
          className="absolute right-4 bottom-2 md:relative md:right-auto md:top-auto w-[40%] sm:w-[25%] md:w-[24%] aspect-[3/4] border border-sbg-border/60 bg-sbg-offwhite z-0 shadow-sm md:shadow-md overflow-hidden md:mt-12 hover:scale-105 transition-transform duration-500"
        >
          <Image
            src="/images/dress-black-model.jpg"
            alt="Styled by Gloria capsule look"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 40vw, 25vw"
          />
        </motion.div>

      </div>

      {/* Horizontal Scrolling Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loadingComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute bottom-28 left-0 w-full z-10 pointer-events-none select-none border-t border-b border-sbg-black/15 py-4 bg-sbg-white/30 backdrop-blur-sm overflow-hidden"
      >
        <div className="ticker-content">
          {tickerList.map((word, idx) => (
            <span
              key={idx}
              className="font-display text-xl sm:text-3xl text-sbg-black/70 uppercase tracking-[0.3em] mx-10 inline-flex items-center gap-20"
            >
              {word}
              <span className="text-sbg-gold/70 font-body text-xs">•</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Bottom Title & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loadingComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 cursor-pointer z-20 text-center w-full px-4"
        onClick={handleScrollDown}
      >
        <p className="text-[10px] md:text-xs tracking-[0.25em] font-semibold text-sbg-black uppercase select-none">
          BODY-TYPE INTENTIONAL FASHION
        </p>
        <div className="flex flex-col items-center space-y-2">
          <span className="text-[8.5px] tracking-[0.2em] text-sbg-grey uppercase select-none">
            Explore The Collection
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-sbg-black/60"
          />
        </div>
      </motion.div>

    </section>
  );
}