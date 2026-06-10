"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

export default function StylingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I know which styling package is right for me?",
      answer: "Every styling client starts with our 30-Minute Initial Consultation. In this session, we map out your wardrobe pain points, identify your structural goals, and help you select between individual programs or the complete Styling Bundle.",
    },
    {
      question: "Do you travel for in-person closet audits?",
      answer: "Yes. While virtual consultations are standard and highly effective, in-person closet audits and personal shopping sessions are available for clients based in the greater metropolitan area. Custom travel rates apply.",
    },
    {
      question: "What exactly is 'body-type intentionality'?",
      answer: "Traditional sizing assumes a body should mold to standard grade specs. We reverse this. We look at skeletal proportions, balance points, and vertical lines to determine how clothing must drape, select fabric weight to hold shape, and place customizable adjusters to serve your natural lines.",
    },
    {
      question: "How does the digital Lookbook work?",
      answer: "Following a shopping or styling session, we compile a digital archive containing 15+ fully styled outfit combinations mapped to your shape profile. Each outfit comes with tailoring instructions, accessorizing tips, and direct links to build your collection.",
    },
  ];

  return (
    <section className="bg-sbg-white w-full py-20 md:py-28 border-t border-sbg-border/60">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sbg-gold block mb-3">
            Inquiries
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wide text-sbg-black uppercase">
            Frequently Asked Questions
          </h2>
          <div className="h-[1.5px] w-12 bg-sbg-gold mx-auto mt-4" />
        </ScrollReveal>

        {/* Accordion loop */}
        <div className="divide-y divide-sbg-border/60 border-t border-b border-sbg-border/60">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left group"
                >
                  <span className="font-display text-base md:text-lg font-bold tracking-wide text-sbg-black group-hover:text-sbg-gold transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span className="ml-4 font-light text-2xl text-sbg-grey group-hover:text-sbg-gold transition-colors">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs leading-relaxed text-sbg-grey tracking-wider pt-4 max-w-3xl pr-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
