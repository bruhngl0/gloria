import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedText from "@/components/ui/AnimatedText";

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          {/* Left Column: Stylist Portrait */}
          <ScrollReveal y={20} className="lg:col-span-5 w-full relative aspect-[3/4] border border-sbg-border overflow-hidden bg-sbg-offwhite max-w-md mx-auto lg:max-w-none">
            <Image
              src="/images/gloria.jpg"
              alt="Gloria - Founder of Styled by Gloria"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </ScrollReveal>

          {/* Right Column: Origin & Mission */}
          <ScrollReveal staggerChildren={0.1} delay={0.2} className="lg:col-span-7 space-y-8 text-sbg-grey">
            <div className="space-y-4">
              <h2 className="font-display text-xl md:text-2xl font-bold text-sbg-black uppercase tracking-widest">
                Reversing the Fit
              </h2>
              <p className="text-xs tracking-wider leading-relaxed">
                {/* CLIENT COPY */}
                Styled by Gloria (SBG) was born out of a simple observation: women spend their entire lives trying to fit their bodies into standard, rigid clothing sizes. When a garment doesn't look right, we blame our bodies instead of the architecture of the clothes.
              </p>
              <p className="text-xs tracking-wider leading-relaxed">
                {/* CLIENT COPY */}
                We set out to reverse this dynamic. We design pieces from the ground up to hold, contour, and adapt to your unique lines. By integrating custom adjustability features and selecting premium, heavy stretch crepes with structural memory, we make clothing that truly serves the shape.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-xl md:text-2xl font-bold text-sbg-black uppercase tracking-widest">
                The Virtual Styling Studio
              </h2>
              <p className="text-xs tracking-wider leading-relaxed">
                {/* CLIENT COPY */}
                Beyond our capsule collections, we believe education is the key to styling autonomy. Our virtual consultation programs teach women how to read their body lines, choose textiles that complement their shape, and build a lasting wardrobe with zero impulse purchases.
              </p>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-sbg-border/60">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sbg-black block">
                Connect with Gloria
              </span>
              <p className="text-xs tracking-wider text-sbg-black font-semibold">
                Instagram & TikTok:{" "}
                <a
                  href="https://instagram.com/styledbygloria_g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:opacity-85"
                >
                  @styledbygloria_g
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Mission Statement Block */}
        <div className="bg-sbg-offwhite border border-sbg-border py-16 px-8 text-center max-w-4xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-sbg-grey block mb-4">
            Our Mission Statement
          </span>
          <p className="font-display text-2xl md:text-4xl font-light tracking-wide text-sbg-black italic max-w-2xl mx-auto leading-normal">
            {/* CLIENT COPY */}
            <AnimatedText
              text='"To educate, empower, and design for real silhouettes — helping every woman respect and love her body more."'
              type="word"
              duration={1.0}
            />
          </p>
        </div>

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
