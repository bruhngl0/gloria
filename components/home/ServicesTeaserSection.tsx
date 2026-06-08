"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function ServicesTeaserSection() {
  const serviceOfferings = [
    "Initial Consultation",
    "Body Type Education",
    "Personal Shopping",
    "Closet Audit",
    "Full Styling Experience",
  ];

  return (
    <section className="bg-sbg-white w-full py-16 md:py-28 border-t border-sbg-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, intro, CTA */}
          <ScrollReveal staggerChildren={0.12} delay={0.1} className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <span className="text-[10px] font-bold tracking-widest text-sbg-grey uppercase block">
              Styling Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase leading-tight">
              Personalized for your silhouette
            </h2>
            <p className="text-xs tracking-wider leading-relaxed text-sbg-grey max-w-md">
              {/* CLIENT COPY */}
              Style is not about fitting in. It is about understanding your lines, dressing with intention, and feeling like the truest version of yourself. Meet our team to redefine your closet.
            </p>
            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border border-sbg-black text-xs font-bold uppercase tracking-widest bg-sbg-black text-sbg-white hover:bg-transparent hover:text-sbg-black transition-all duration-300 w-full sm:w-auto"
              >
                Book a Consultation
              </Link>
            </div>
          </ScrollReveal>

          {/* Right Column: Clean list of offerings */}
          <div className="lg:col-span-7 border-l border-sbg-border lg:pl-16 space-y-1">
            <ScrollReveal delay={0.2}>
              <span className="text-[10px] font-bold tracking-widest text-sbg-grey uppercase block mb-8 pl-4 lg:pl-0">
                The Offerings
              </span>
            </ScrollReveal>
            <ScrollReveal staggerChildren={0.08} delay={0.3} className="divide-y divide-sbg-border">
              {serviceOfferings.map((service, index) => (
                <Link
                  key={index}
                  href="/services"
                  className="group flex items-center justify-between py-6 px-4 lg:px-0 hover:bg-sbg-hover/30 lg:hover:bg-transparent lg:hover:pl-4 transition-all duration-300 text-sbg-black"
                >
                  <span className="font-display text-lg md:text-xl font-medium tracking-wide">
                    {service}
                  </span>
                  <span className="flex items-center space-x-2 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="h-4.5 w-4.5 stroke-[1.25]" />
                  </span>
                </Link>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

