"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyStackSectionProps {
  children: React.ReactNode;
  zIndex: number;
  isLast?: boolean;
}

export default function StickyStackSection({
  children,
  zIndex,
  isLast = false,
}: StickyStackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      // Apply sticky stacking only on screen widths >= 768px (MD and up)
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // opacity transitions: start at 1, begin fading to 0.4 at 80% scroll past, and end at 0.1 at 100% scroll past
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.4, 0.1]);
  // scale transitions: gently shrink from 1 to 0.95 to create a layered "deck-of-cards" depth
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  // translate Y: shift slightly upward to enhance the overlap depth effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isDesktop ? "md:sticky md:top-0" : ""}`}
      style={{
        zIndex,
      }}
    >
      {isDesktop && !isLast ? (
        <motion.div
          style={{
            opacity,
            scale,
            y,
          }}
          className="w-full origin-top"
        >
          {children}
        </motion.div>
      ) : (
        <div className="w-full">
          {children}
        </div>
      )}
    </div>
  );
}
