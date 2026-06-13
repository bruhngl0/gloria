"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "../ui/ScrollReveal";

export default function DifferenceSection() {
  return (
    <section className="bg-sbg-white w-full py-20 md:py-28 border-b border-sbg-border overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top Section Tag */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-[9px] tracking-[0.25em] font-bold text-sbg-grey uppercase">
            THE SBG DIFFERENCE
          </span>
        </div>

        {/* 1. LAYERED EDITORIAL ARTWORK BLOCK */}
        <div className="relative flex flex-col justify-center items-center w-full min-h-[300px] md:min-h-[440px] mb-16 select-none">
          {/* Layer 1: Back Text (Symmetric) */}
          <h3 className="font-cursive text-[89px] md:text-[9.5rem] text-sbg-black leading-none absolute z-0 select-none -translate-y-36 md:-translate-y-44 font-normal">
            Symmetric
          </h3>

          {/* Layer 2: Center Image Card */}
          <div className="w-[180px] h-[240px] md:w-[240px] md:h-[320px] relative z-10 bg-sbg-offwhite border border-sbg-border/60 shadow-sm overflow-hidden select-none">
            <Image
              src="/images/dress-black-detail.jpg"
              alt="Detailed atelier cowl neck calibration drape"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 180px, 240px"
            />
          </div>

          {/* Layer 3: Front Text (SHAPE) */}
          <h3 className="font-sans font-light text-[62px] md:text-[7.8rem] tracking-[0.05em] text-sbg-black leading-none absolute z-20 select-none translate-y-8 md:translate-y-12 uppercase">
            SHAPE
          </h3>
        </div>

        {/* Tagline below graphic */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[10px] tracking-[0.2em] uppercase text-sbg-black font-semibold">
            ECHOES OF — <span className="italic font-display font-normal">SILHOUETTE HARMONY</span>
          </p>
        </div>

        {/* 2. SINGLE EDITORIAL PARAGRAPH */}
        <ScrollReveal className="max-w-2xl mx-auto text-center border-t border-sbg-border/60 pt-16 px-4">
          <p className="text-[11px] md:text-[12px] tracking-wider text-sbg-grey leading-relaxed">
            Every piece is designed around how it serves specific shapes, offering customizable elements to contour to your proportions rather than standard grids. We are not here to move inventory—our primary objective is to empower you to look and feel authentic in your own skin and capsule designs. This is collaborative personal styling that treats you as the expert on your own body, teaching you styling rules that last a lifetime.
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
