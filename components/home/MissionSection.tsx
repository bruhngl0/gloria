"use client";

import React from "react";
import AnimatedText from "../ui/AnimatedText";
import ScrollReveal from "../ui/ScrollReveal";

export default function MissionSection() {
  return (
    <section className="bg-sbg-white w-full py-20 md:py-32 border-y border-sbg-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-snug text-sbg-black max-w-4xl mx-auto">
          {/* CLIENT COPY */}
          <AnimatedText 
            text='"We believe clothing should work for your body — not the other way around."' 
            type="word" 
            duration={1.0}
          />
        </p>
        <ScrollReveal delay={0.6} y={10}>
          <span className="mt-6 md:mt-8 block text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-sbg-grey">
            Our Foundational Promise
          </span>
        </ScrollReveal>
      </div>
    </section>
  );
}

