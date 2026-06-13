import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ConsultationBox from "@/components/services/ConsultationBox";
import ServiceCard from "@/components/services/ServiceCard";
import CaseStudies from "@/components/services/CaseStudies";
import StylingFAQ from "@/components/services/StylingFAQ";

export const metadata: Metadata = {
  title: "Styling Services | Styled by Gloria",
  description: "Book an initial consultation or enquire about our body type education, closet audit, and personal shopping programs.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Body Type Education Session",
      badge: "Virtual",
      duration: "45 Minutes",
      bullets: [
        "Personalized body line analysis",
        "Understanding drape, fabric weight, and proportions for your silhouette",
        "Custom styling guidelines sheet to reference forever",
        "No pressure to buy — purely educational focus",
      ],
    },
    {
      title: "Closet Audit",
      badge: "Virtual or In-Person",
      duration: "Hourly Program",
      bullets: [
        "In-depth review of your current wardrobe lineup",
        "Identify and keep pieces that honor your shape",
        "Identify fit gaps and create a strategic shopping list",
        "Organization tips tailored to ease your daily selection",
      ],
    },
    {
      title: "Personal Shopping",
      badge: "Virtual or In-Person",
      duration: "Hourly Program",
      bullets: [
        "Curated search for garments matching your body lines",
        "Private fitting session support with expert tailoring advice",
        "Strategic wardrobe building with zero impulse buying",
        "Access to exclusive boutique partnerships",
      ],
    },
    {
      title: "Full Styling Experience",
      badge: "Virtual or In-Person",
      duration: "Complete Bundle",
      bullets: [
        "All-inclusive transformation: Closet Audit + Education + Shopping",
        "Creation of a personalized digital Lookbook of 15+ outfits",
        "Continuous 30-day stylist messaging support",
        "Lifetime body-positive dressing blueprint",
      ],
    },
  ];

  return (
    <div className="bg-sbg-white min-h-screen pt-28 md:pt-36 pb-12 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section 1: Page Header */}
        <ScrollReveal staggerChildren={0.12} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-grey block mb-2">
            Elevate Your Style
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[0.2em] text-sbg-black uppercase">
            Styling Services
          </h1>
          <div className="h-[1px] w-16 bg-sbg-black mx-auto mt-4 mb-6" />
          <p className="text-xs tracking-wider leading-relaxed text-sbg-grey">
            {/* CLIENT COPY */}
            Every service is designed with a body-first philosophy. We focus on how garments serve your lines, teaching you how to dress with lasting confidence.
          </p>
        </ScrollReveal>

        {/* Section 2: Consultation CTA Box (Above Fold, Prominent) */}
        <ConsultationBox />

        {/* Section 3: Service Cards */}
        <div className="mb-24">
          <ScrollReveal delay={0.1} className="text-center mb-12">
            <h2 className="font-display text-xl md:text-2xl font-bold text-sbg-black uppercase tracking-widest">
              Our Styling Programs
            </h2>
            <p className="text-[10px] tracking-widest text-sbg-grey uppercase mt-1">
              Custom-tailored to your style journey
            </p>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.15} delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard service={service} key={index} />
            ))}
          </ScrollReveal>
        </div>

        {/* Case Studies Transformations */}
        <CaseStudies />

        {/* Section 4: Styling Team */}
        <div className="border-t border-sbg-border pt-20 mb-16">
          <ScrollReveal delay={0.1} className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-xl md:text-2xl font-bold text-sbg-black uppercase tracking-widest">
              Meet Your Stylist
            </h2>
            <p className="text-[10px] tracking-widest text-sbg-grey uppercase mt-1">
              Guiding you to dress for your lines
            </p>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Stylist Image */}
            <ScrollReveal delay={0.2} className="md:col-span-5 relative aspect-square w-full border border-sbg-border overflow-hidden bg-sbg-offwhite rounded-full max-w-[280px] mx-auto md:max-w-none">
              <Image
                src="/images/gloria.jpg"
                alt="Gloria - Founder & Lead Stylist"
                fill
                sizes="(max-width: 768px) 280px, 30vw"
                className="object-cover"
              />
            </ScrollReveal>

            {/* Stylist Bio */}
            <ScrollReveal delay={0.3} className="md:col-span-7 space-y-4 text-center md:text-left">
              <h3 className="font-display text-lg font-bold text-sbg-black uppercase tracking-wider">
                Gloria G.
              </h3>
              <p className="text-xs font-semibold tracking-widest text-sbg-grey uppercase">
                Founder & Lead Stylist
              </p>
              <p className="text-xs tracking-wider leading-relaxed text-sbg-grey">
                {/* CLIENT COPY */}
                After a decade working in commercial fashion, I founded Styled by Gloria to change how we relate to our wardrobes. I believe that style is a form of self-respect. Our goal is to shift the conversation away from standard sizes toward structural proportions, drape, and confidence.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Styling Frequently Asked Questions */}
        <StylingFAQ />

        {/* Section 5: Footer Note */}
        <div className="text-center py-6 border-t border-sbg-border/60">
          <p className="text-xs tracking-wider italic text-sbg-grey">
            Don't see what you're looking for?{" "}
            <Link
              href="/contact"
              className="text-sbg-black font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Ask me about it.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
