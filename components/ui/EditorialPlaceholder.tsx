"use client";

import React from "react";
import { motion } from "framer-motion";

interface EditorialPlaceholderProps {
  label?: string;
  aspectRatioClassName?: string; // e.g. "aspect-[3/4]" or "aspect-square"
  className?: string;
}

export default function EditorialPlaceholder({
  label = "SBG PHOTO ARCHIVE",
  aspectRatioClassName = "aspect-[3/4]",
  className = "",
}: EditorialPlaceholderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-sbg-offwhite border border-sbg-border/60 group ${aspectRatioClassName} ${className}`}
    >
      {/* Subtle hover zoom effect inside placeholder */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center p-6"
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Architectural grid corner brackets */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-sbg-border/80 transition-colors duration-300 group-hover:border-sbg-gold/40" />
        <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-sbg-border/80 transition-colors duration-300 group-hover:border-sbg-gold/40" />
        <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-sbg-border/80 transition-colors duration-300 group-hover:border-sbg-gold/40" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-sbg-border/80 transition-colors duration-300 group-hover:border-sbg-gold/40" />
        
        {/* Subtle center marker crosshair lines */}
        <div className="w-6 h-[1px] bg-sbg-border/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:bg-sbg-gold/20 transition-colors" />
        <div className="h-6 w-[1px] bg-sbg-border/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:bg-sbg-gold/20 transition-colors" />

        {/* Small minimalist text */}
        <span className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] text-sbg-grey/55 group-hover:text-sbg-gold transition-colors block text-center uppercase select-none">
          {label}
        </span>
      </motion.div>
    </div>
  );
}
