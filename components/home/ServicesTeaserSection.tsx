"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../ui/ScrollReveal";

export default function ServicesTeaserSection() {
  return (
    <section className="bg-sbg-white w-full py-20 md:py-28 border-t border-sbg-border select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 1. Large Typographic Headline Flow with Inline Picture */}
        <div className="mb-16 md:mb-24">
          <ScrollReveal delay={0.1}>
            <h2 className="font-sans text-[2.2rem] sm:text-[3.2rem] md:text-[4.5rem] lg:text-[4.8rem] font-normal tracking-tighter uppercase leading-[0.95] text-sbg-black select-none" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              Fashion without silhouette is just another image{" "}
              <span className="inline-flex items-center">
                with noise!
                <span className="inline-block relative w-[48px] h-[48px] sm:w-[65px] sm:h-[65px] md:w-[95px] md:h-[95px] border-2 border-sbg-black overflow-hidden rounded bg-sbg-offwhite ml-3 sm:ml-4 md:ml-6 align-middle -translate-y-1 md:-translate-y-2 select-none shadow-[2px_2px_0px_rgba(10,10,10,1)]">
                  <Image
                    src="/images/dress-black-model.jpg"
                    alt="Signature cowl neck styling shot"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 48px, 95px"
                  />
                </span>
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* 2. Split Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Vintage Atelier Monitor console */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center">
            <ScrollReveal delay={0.2} className="w-full">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:mx-0 bg-[#1A1A1A] border-[6px] md:border-8 border-sbg-black rounded-xl shadow-[8px_8px_0px_rgba(10,10,10,1)] overflow-hidden flex flex-col justify-between p-2.5 md:p-3 select-none">
                {/* Screen inner container */}
                <div className="relative w-full h-[88%] bg-black rounded-lg overflow-hidden border border-black">
                  <video
                    src="/images/shortdes.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full grayscale contrast-125 opacity-85"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
                  {/* Subtle scanline overlay for retro CRT monitor feel */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" />
                  {/* Monitor branding tag */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] text-white/50 tracking-[0.2em] uppercase font-mono bg-black/50 px-2 py-0.5 rounded-sm backdrop-blur-xs">
                    Atelier Monitor 01
                  </div>
                </div>

                {/* Monitor Bottom panel controls */}
                <div className="flex justify-between items-center h-[10%] px-1 pt-1">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-sbg-gold/90 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                  {/* Speaker grill lines */}
                  <div className="flex space-x-0.5 h-2 w-14 items-center">
                    <div className="w-[1.5px] h-full bg-white/10" />
                    <div className="w-[1.5px] h-full bg-white/10" />
                    <div className="w-[1.5px] h-full bg-white/10" />
                    <div className="w-[1.5px] h-full bg-white/10" />
                    <div className="w-[1.5px] h-full bg-white/10" />
                  </div>
                  {/* Dial knob */}
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20 bg-[#252525] flex items-center justify-center">
                    <div className="w-0.5 h-1.5 bg-white/30 rounded-sm -translate-y-0.5 rotate-45" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Descriptions & Bullet List logs */}
          <ScrollReveal staggerChildren={0.12} delay={0.3} className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs md:text-sm tracking-wider leading-relaxed text-sbg-black font-medium">
                We transform your styling experience into a powerful platform for self-expression and silhouette harmony. Our approach is to combine skeletal proportion mapping, textile calibrations, and custom styling rules to ensure your wardrobe aligns perfectly with your physical lines.
              </p>
            </div>

            {/* Structured Bullet Offerings */}
            <ul className="space-y-6 border-t border-sbg-black/15 pt-8">
              <li className="flex items-start space-x-4">
                <span className="text-sbg-gold font-bold text-xs mt-1">•</span>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-sbg-black mb-1.5">
                    Skeletal & Proportion Mapping
                  </h4>
                  <p className="text-[9px] tracking-wider uppercase text-sbg-grey leading-relaxed">
                    A personalized analysis of your skeletal frame, vertical balance axis, and silhouette lines to find what shapes serve you best.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-sbg-gold font-bold text-xs mt-1">•</span>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-sbg-black mb-1.5">
                    Textile & Drape Calibration
                  </h4>
                  <p className="text-[9px] tracking-wider uppercase text-sbg-grey leading-relaxed">
                    Identifying the exact fiber structures, GSM weights, and drape speed dynamics that contour your body naturally.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-sbg-gold font-bold text-xs mt-1">•</span>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-sbg-black mb-1.5">
                    Capsule Wardrobe Integration
                  </h4>
                  <p className="text-[9px] tracking-wider uppercase text-sbg-grey leading-relaxed">
                    Curation of a functional, unified seasonal catalog that matches your silhouette guidelines and eliminates clutter.
                  </p>
                </div>
              </li>
            </ul>
          </ScrollReveal>

        </div>

        {/* 3. CTA Buttons in One Row */}
        <div className="mt-16 pt-10 border-t border-sbg-black/15 flex flex-col md:flex-row w-full items-center justify-center gap-6">
          <ScrollReveal delay={0.35} className="w-full md:w-auto">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#2B2B2B] text-[10px] font-bold uppercase tracking-widest bg-[#2B2B2B] text-[#F2F2F2] hover:bg-transparent hover:text-[#2B2B2B] transition-all duration-300 w-full md:w-72 shadow-[4px_4px_0px_rgba(10,10,10,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              Book a Consultation
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="w-full md:w-auto">
            <a
              href="https://wa.me/910000000000?text=Hello!%20I%20would%20like%20to%20inquire%20about%20bulk%20orders%20with%20Styled%20by%20Gloria."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#2B2B2B] text-[10px] font-bold uppercase tracking-widest bg-[#2B2B2B] text-[#F2F2F2] hover:bg-transparent hover:text-[#2B2B2B] transition-all duration-300 w-full md:w-72 shadow-[4px_4px_0px_rgba(10,10,10,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              WhatsApp for Bulk Orders
            </a>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}