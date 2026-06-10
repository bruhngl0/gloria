"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  speed?: number; // Adjusts the intensity of the parallax movement
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  sizes = "100vw",
  speed = 0.15,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position relative to the container element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate translation range based on speed factor
  const translateOffset = speed * 80;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-translateOffset, translateOffset]
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <motion.div
        style={{
          y,
          height: `calc(100% + ${translateOffset * 2}px)`,
          top: -translateOffset,
          position: "absolute",
          width: "100%",
        }}
        className="left-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}
