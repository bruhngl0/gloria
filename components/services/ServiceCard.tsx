"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  service: {
    title: string;
    badge: string;
    duration: string;
    bullets: string[];
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      className="border border-sbg-border p-8 md:p-10 flex flex-col justify-between space-y-8 bg-sbg-white hover:border-sbg-gold/40 hover:shadow-xl hover:shadow-sbg-gold/5 transition-all duration-300 group"
    >
      <div className="space-y-6">
        {/* Title & Badge */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-sbg-hover text-sbg-grey text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 border border-sbg-border/30 group-hover:bg-sbg-gold/10 transition-colors duration-300">
              {service.badge}
            </span>
            <span className="text-[9px] font-bold tracking-wider uppercase text-sbg-grey/85">
              {service.duration}
            </span>
          </div>
          <h3 className="font-display text-lg md:text-xl font-bold tracking-wide text-sbg-black uppercase group-hover:text-sbg-gold transition-colors duration-300">
            {service.title}
          </h3>
        </div>

        {/* Bullet points */}
        <ul className="space-y-3 text-xs tracking-wider text-sbg-grey list-disc pl-4 leading-relaxed">
          {service.bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      </div>

      {/* Inquiry Link */}
      <div className="pt-4 border-t border-sbg-border/60">
        <Link
          href={`/contact?subject=Styling%20Services&service=${encodeURIComponent(
            service.title
          )}`}
          className="inline-flex items-center justify-center px-6 py-3.5 border border-sbg-black text-[10px] font-bold uppercase tracking-widest bg-sbg-white text-sbg-black hover:bg-sbg-black hover:text-sbg-white transition-all duration-300 w-full"
        >
          Enquire About This Service
        </Link>
      </div>
    </motion.div>
  );
}
