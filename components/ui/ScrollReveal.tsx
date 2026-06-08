"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  staggerChildren?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 15,
  once = true,
  staggerChildren,
}: ScrollRevealProps) {
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
      <div className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    );
  }

  if (staggerChildren !== undefined) {
    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren: delay,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y },
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-10%" }}
        className={className}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return <motion.div variants={itemVariants}>{child}</motion.div>;
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10%" }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
