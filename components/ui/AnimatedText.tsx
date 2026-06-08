"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "word" | "fade";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  type = "word",
  delay = 0,
  duration = 0.8,
  once = true,
}: AnimatedTextProps) {
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

  if (!loadingComplete) {
    return (
      <span className={`inline-block ${className}`} style={{ opacity: 0 }}>
        {text}
      </span>
    );
  }

  if (type === "fade") {
    return (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, margin: "-10%" }}
        transition={{
          duration,
          delay,
          ease: [0.215, 0.61, 0.355, 1] as const,
        }}
        className={`inline-block ${className}`}
      >
        {text}
      </motion.span>
    );
  }

  // Split into words
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
          <motion.span variants={childVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
