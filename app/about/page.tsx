import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MissionStatement from "@/components/about/MissionStatement";
import DesignPrinciples from "@/components/about/DesignPrinciples";
import TimelineAtelier from "@/components/about/TimelineAtelier";

export const metadata: Metadata = {
  title: "Our Story | Styled by Gloria",
  description: "Learn about the mission behind Styled by Gloria — building a body-intentional fashion house and virtual styling studio.",
};

export default function AboutPage() {
  return (
    <div className="bg-sbg-white min-h-screen">
      {/* Editorial Header Banner */}
      <div className="relative h-[40vh] md:h-[55vh] w-full bg-sbg-black overflow-hidden border-b border-sbg-border">
        <Image
          src="/images/about-hero.jpg"
          alt="Styled by Gloria Design Studio Workspace"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85 select-none"
        />
        {/* Top Dark Vignette overlay for Header legibility */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/45 via-black/10 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-sbg-black/10 z-10" />
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Intro */}
        <ScrollReveal staggerChildren={0.12} className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-grey block mb-3">
            Our Purpose
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[0.2em] text-sbg-black uppercase">
            The Story Behind SBG
          </h1>
          <div className="h-[1px] w-16 bg-sbg-black mx-auto mt-4" />
        </ScrollReveal>

        {/* Two Column Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          {/* Left Column: Origin & Mission (Centered to match reference) */}
          <ScrollReveal staggerChildren={0.1} delay={0.2} className="lg:col-span-7 space-y-8 text-sbg-grey text-center">
            <div className="space-y-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-sbg-black uppercase tracking-[0.2em]">
                The Origin Story
              </h2>
              <div className="w-12 h-[1px] bg-sbg-black/35 mx-auto" />
              
              <div className="space-y-5 text-xs tracking-wider leading-relaxed text-sbg-black/80 font-normal italic">
                <p>
                  “Styled by Gloria (SBG) was born out of a simple observation: women spend their entire lives trying to fit their bodies into standard, rigid clothing sizes. When a garment doesn't look right, we blame our bodies instead of the architecture of the clothes.”
                </p>
                <p>
                  “We set out to reverse this dynamic. We design pieces from the ground up to hold, contour, and adapt to your unique lines. By integrating custom adjustability features and selecting premium, heavy stretch crepes with structural memory, we make clothing that truly serves the shape.”
                </p>
                <p>
                  “Beyond our capsule collections, we believe education is the key to styling autonomy. Our virtual consultation programs teach women how to read their body lines, choose textiles that complement their shape, and build a lasting wardrobe with zero impulse purchases.”
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-sbg-border/60 max-w-md mx-auto space-y-4">
              <span className="font-display text-sm font-bold tracking-widest text-sbg-black uppercase block">
                — Gloria G.
              </span>
              <p className="text-[9px] tracking-[0.2em] text-sbg-grey uppercase font-semibold">
                Instagram & TikTok:{" "}
                <a
                  href="https://instagram.com/styledbygloria_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-sbg-black transition-colors"
                >
                  @styledbygloria_g
                </a>
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column: Warped Stylist Portrait with Badge */}
          <ScrollReveal y={20} className="lg:col-span-5 w-full relative max-w-sm mx-auto lg:max-w-none pt-6 pl-6">
            <div className="relative w-full aspect-[4/5]">
              {/* Starburst badge */}
              <div
                className="absolute -top-4 -left-4 w-18 h-18 bg-sbg-black text-sbg-white flex items-center justify-center text-[9px] font-bold tracking-[0.2em] uppercase z-20 shadow-[2px_2px_4px_rgba(0,0,0,0.15)] select-none"
                style={{
                  clipPath:
                    "polygon(50% 0%, 63% 13%, 81% 10%, 83% 29%, 99% 31%, 90% 47%, 99% 63%, 83% 66%, 81% 84%, 63% 81%, 50% 99%, 37% 81%, 19% 84%, 17% 66%, 1% 63%, 10% 47%, 1% 31%, 17% 29%, 19% 10%, 37% 13%)",
                }}
              >
                Founder
              </div>

              {/* Warped Container */}
              <div
                className="w-full h-full border-2 border-sbg-black overflow-hidden bg-sbg-offwhite shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] transition-transform hover:-translate-y-1 hover:scale-[1.01] duration-500"
                style={{ borderRadius: "30% 70% 70% 30% / 50% 30% 70% 50%" }}
              >
                <Image
                  src="/images/gloria.jpg"
                  alt="Gloria - Founder of Styled by Gloria"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  style={{ borderRadius: "30% 70% 70% 30% / 50% 30% 70% 50%" }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Brand Core Design Standards */}
        <DesignPrinciples />

        {/* Mission Statement Block */}
        <MissionStatement />

        {/* History Timeline Atelier */}
        <TimelineAtelier />

        {/* Call to Actions at bottom */}
        <ScrollReveal staggerChildren={0.12} delay={0.2} className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-sbg-border/60 pt-16">
          <Link
            href="/shop/one-for-all-dress"
            className="inline-flex items-center justify-center px-8 py-4 border border-sbg-black text-xs font-bold uppercase tracking-widest bg-sbg-black text-sbg-white hover:bg-sbg-white hover:text-sbg-black transition-all duration-300 w-full sm:w-60 text-center animate-button"
          >
            Shop The Collection
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 border border-sbg-black text-xs font-bold uppercase tracking-widest bg-sbg-white text-sbg-black hover:bg-sbg-black hover:text-sbg-white transition-all duration-300 w-full sm:w-60 text-center animate-button"
          >
            Book a Consultation
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
