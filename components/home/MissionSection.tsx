"use client";

import React from "react";
import AnimatedText from "../ui/AnimatedText";
import ScrollReveal from "../ui/ScrollReveal";

const tickerStyles = `
  @keyframes sg-ticker-slide {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
  .sg-ticker-wrapper {
    display: inline-flex;
    animation: sg-ticker-slide 20s linear infinite;
    width: max-content;
  }
  .sg-mission-grid-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background-size: 60px 60px;
    background-image: 
      linear-gradient(to right, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 1px, transparent 1px);
    mask-image: linear-gradient(to bottom, black 30%, transparent 95%);
    -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 95%);
  }
`;

export default function MissionSection() {
  const repeatedText = Array(12).fill("ONE FOR ALL");

  return (
    <section className="bg-sbg-white w-full pt-20 md:pt-32 border-t border-sbg-border flex flex-col justify-between relative overflow-hidden">
      <style>{tickerStyles}</style>
      
      {/* Fading Background Grid Lines */}
      <div className="sg-mission-grid-bg" />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pb-16 md:pb-24 relative z-10">
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

      {/* Infinite Moving Marquee Banner (Thinner Height) */}
      <div className="w-full bg-sbg-black py-1.5 overflow-hidden border-t border-sbg-black select-none relative z-10">
        <div className="sg-ticker-wrapper">
          {[...repeatedText, ...repeatedText].map((text, idx) => (
            <span key={idx} className="inline-flex items-center mx-6 text-sbg-white text-[9px] md:text-[10px] font-bold tracking-[0.3em] font-body">
              {text} <span className="text-sbg-grey/50 ml-12">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
