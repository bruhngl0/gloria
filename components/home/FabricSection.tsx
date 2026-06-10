"use client";
import React from "react";
import ScrollReveal from "../ui/ScrollReveal";
import ParallaxImage from "../ui/ParallaxImage";

export default function FabricSection() {
  const specs = [
    { label: "Weight Index", value: "380 GSM (Heavyweight)" },
    { label: "Composition", value: "74% Viscose, 18% Polyamide, 8% Elastane" },
    { label: "Weave Structure", value: "Double-knit stretch crepe with structural memory" },
    { label: "Mill Location", value: "Como, Italy" },
  ];

  return (
    <section className="bg-sbg-white w-full py-20 md:py-32 border-t border-sbg-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Asymmetrical Copy & Metrics (Span 5) */}
          <ScrollReveal staggerChildren={0.12} className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-sbg-gold uppercase block">
                Atelier & Textiles
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
                The Architecture of Stretch Crepe
              </h2>
              <p className="text-xs tracking-wider leading-relaxed text-sbg-grey">
                Our signature capsule collections leverage a bespoke heavyweight crepe engineered with structural memory. Unlike standard fabrics that stretch thin and pull, our Viscose-rich weave contours to your lines, holding its shape while adapting dynamically to your movements.
              </p>
            </div>

            {/* Spec List */}
            <div className="border-t border-sbg-border/60 pt-6 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-sbg-grey uppercase block">
                Textile Specifications
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specs.map((spec, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-[9px] font-bold text-sbg-grey/65 uppercase tracking-wider block">
                      {spec.label}
                    </span>
                    <span className="text-xs text-sbg-black font-medium tracking-wide">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Product image, mirrored horizontally (Span 7) */}
          <div className="lg:col-span-7 relative group order-1 lg:order-2">
            <div className="absolute inset-0 border border-sbg-border translate-x-4 -translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 pointer-events-none" />
            <ScrollReveal className="relative w-full aspect-[4/5] border border-sbg-black overflow-hidden bg-sbg-offwhite z-10" y={20}>
              <div className="w-full h-full" style={{ transform: "scaleX(-1)" }}>
                <ParallaxImage
                  src="/images/point.png"
                  alt="Stretch crepe fabric detail"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  speed={0.12}
                  className="object-top"
                  containerClassName="w-full h-full"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}