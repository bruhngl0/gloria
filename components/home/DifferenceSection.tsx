"use client";

import React from "react";
import { Sparkles, Heart, Compass } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import AnimatedText from "../ui/AnimatedText";

export default function DifferenceSection() {
  const points = [
    {
      icon: <Sparkles className="h-6 w-6 stroke-[1.25] text-sbg-black" />,
      title: "Body-Type Intentional",
      description:
        "Every piece is designed around how it serves specific shapes, offering customizable elements to contour to your proportions.",
    },
    {
      icon: <Heart className="h-6 w-6 stroke-[1.25] text-sbg-black" />,
      title: "Styled, Not Sold",
      description:
        "We are not here to move inventory. Our primary objective is to empower you to look and feel authentic in your own skin.",
    },
    {
      icon: <Compass className="h-6 w-6 stroke-[1.25] text-sbg-black" />,
      title: "With You, Not For You",
      description:
        "Collaborative personal styling that treats you as the expert on your own body, teaching you rules that last a lifetime.",
    },
  ];

  return (
    <section className="bg-sbg-offwhite w-full py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
            <AnimatedText text="The SBG Difference" type="word" />
          </h2>
          <div className="h-0.5 w-12 bg-sbg-black mx-auto mt-4" />
        </div>

        <ScrollReveal
          staggerChildren={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {points.map((point, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-6 group p-6 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="p-4 bg-sbg-white rounded-full border border-sbg-border/60 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                {point.icon}
              </div>
              <h3 className="font-display text-lg font-bold tracking-wider text-sbg-black uppercase">
                {point.title}
              </h3>
              <p className="text-xs tracking-wider text-sbg-grey leading-relaxed max-w-sm">
                {/* CLIENT COPY */}
                {point.description}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

