"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const MailIconFilled = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M3 4c-1.11 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.11-.9-2-2-2H3zm18 4.75L12 14.12 3 8.75V6l9 5.38L21 6v2.75z" />
  </svg>
);

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.475 1.33 4.996L2.025 22l5.176-1.358c1.477.807 3.137 1.23 4.811 1.23 5.505 0 9.987-4.482 9.987-9.988C22 6.482 17.518 2 12.012 2zm6.046 14.28c-.246.696-1.245 1.286-1.745 1.344-.45.053-1.042.083-1.685-.121-.409-.13-1.61-.532-3.455-1.344-3.155-1.385-5.187-4.577-5.344-4.789-.158-.212-1.28-1.706-1.28-3.256 0-1.55.808-2.31 1.097-2.61.29-.3.633-.377.844-.377.211 0 .422.003.606.012.193.009.45-.072.702.536.257.62.877 2.134.954 2.293.076.158.127.342.023.551-.105.21-.158.342-.317.525-.158.183-.332.408-.475.547-.158.152-.323.318-.14.63.183.313.812 1.342 1.74 2.17 1.196 1.066 2.204 1.396 2.518 1.553.314.158.497.13.682-.083.185-.212.788-.918.998-1.232.211-.314.422-.26.712-.152.29.108 1.84.869 2.157 1.028.317.158.528.236.606.37.079.135.079.782-.167 1.478z" />
  </svg>
);

const ChevronIcon = ({ isOpen, className = "" }: { isOpen: boolean; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${className}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Footer() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    brand: false,
    gloria: false,
    customer: false,
    popular: false,
    reachOut: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-sbg-black border-t border-white/10 w-full overflow-hidden select-none font-body">
      {/* 5-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10 w-full">

        {/* Column 1: Brand & Contact Coordinates */}
        <div className="col-span-1 md:col-span-3 p-6 md:p-8 flex flex-col space-y-6">
          {/* Mobile Accordion Header */}
          <button
            onClick={() => toggleSection("brand")}
            className="w-full flex items-center justify-between text-left md:hidden"
            aria-expanded={openSections.brand}
          >
            <h2 className="font-display text-xl font-bold tracking-[0.18em] uppercase text-sbg-white">
              STYLED BY GLORIA
            </h2>
            <ChevronIcon isOpen={openSections.brand} className="text-sbg-white/70" />
          </button>

          {/* Desktop Static Header */}
          <div className="hidden md:block">
            <h2 className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-sbg-white mb-4">
              STYLED BY GLORIA
            </h2>
            <p className="font-body text-[10px] tracking-[0.15em] leading-relaxed uppercase text-sbg-white/80">
              @STYLED BY GLORIA<br />
              HAUTE ATELIER SECTOR, 4B<br />
              CREATIVE CLUSTER<br />
              BANGALORE, INDIA
            </p>
          </div>

          {/* Mobile Collapsible Content */}
          <AnimatePresence initial={false}>
            {openSections.brand && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: "1rem" },
                  collapsed: { opacity: 0, height: 0, marginTop: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden md:hidden space-y-6"
              >
                <p className="font-body text-[10px] tracking-[0.15em] leading-relaxed uppercase text-sbg-white/80 pt-2">
                  @STYLED BY GLORIA<br />
                  HAUTE ATELIER SECTOR, 4B<br />
                  CREATIVE CLUSTER<br />
                  BANGALORE, INDIA
                </p>
                <div className="space-y-2 pb-2">
                  <p className="font-body text-[9px] font-bold tracking-[0.2em] uppercase text-sbg-white/50">
                    FOLLOW US
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="mailto:studio@styledbygloria.com"
                      className="text-sbg-white hover:opacity-80 transition-opacity"
                      aria-label="Email Office"
                    >
                      <MailIconFilled className="h-5 w-5" />
                    </a>
                    <a
                      href="https://instagram.com/styledbygloria_g"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sbg-white hover:opacity-80 transition-opacity"
                      aria-label="Instagram Profile"
                    >
                      <InstagramIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Static Footer actions */}
          <div className="hidden md:block mt-4 space-y-2">
            <p className="font-body text-[10px] font-bold tracking-[0.2em] uppercase text-sbg-white/50">
              FOLLOW US
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:studio@styledbygloria.com"
                className="text-sbg-white hover:opacity-80 transition-opacity"
                aria-label="Email Office"
              >
                <MailIconFilled className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/styledbygloria_g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sbg-white hover:opacity-80 transition-opacity"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: 01/ Gloria links */}
        <div className="col-span-1 md:col-span-2 p-6 md:p-8 flex flex-col md:space-y-4">
          {/* Mobile Accordion Header */}
          <button
            onClick={() => toggleSection("gloria")}
            className="w-full flex items-center justify-between text-left md:hidden"
            aria-expanded={openSections.gloria}
          >
            <span className="font-body text-[10px] tracking-[0.18em] font-bold text-sbg-white/80">
              01/ Gloria
            </span>
            <ChevronIcon isOpen={openSections.gloria} className="text-sbg-white/70" />
          </button>

          {/* Desktop Static Header */}
          <span className="hidden md:inline font-body text-[10px] tracking-[0.18em] font-bold text-sbg-white/80">
            01/ Gloria
          </span>

          {/* Mobile Collapsible Links */}
          <AnimatePresence initial={false}>
            {openSections.gloria && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: "1rem" },
                  collapsed: { opacity: 0, height: 0, marginTop: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden md:hidden"
              >
                <ul className="font-body space-y-3 text-[11px] font-normal tracking-[0.12em] pb-2 pt-2">
                  <li><Link href="/" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Styled by Gloria</Link></li>
                  <li><Link href="/contact" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Contact</Link></li>
                  <li><Link href="/services" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Services</Link></li>
                  <li><Link href="/about" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">The Brand</Link></li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Static Links */}
          <ul className="hidden md:block space-y-3 text-[11px] font-normal tracking-[0.12em]">
            <li><Link href="/" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Styled by Gloria</Link></li>
            <li><Link href="/contact" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Contact</Link></li>
            <li><Link href="/services" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Services</Link></li>
            <li><Link href="/about" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">The Brand</Link></li>
          </ul>
        </div>

        {/* Column 3: 02/ Customer Service links */}
        <div className="col-span-1 md:col-span-2 p-6 md:p-8 flex flex-col md:space-y-4">
          {/* Mobile Accordion Header */}
          <button
            onClick={() => toggleSection("customer")}
            className="w-full flex items-center justify-between text-left md:hidden"
            aria-expanded={openSections.customer}
          >
            <span className="font-body text-[10px] tracking-[0.18em] font-bold text-sbg-white/80">
              02/ Customer Service
            </span>
            <ChevronIcon isOpen={openSections.customer} className="text-sbg-white/70" />
          </button>

          {/* Desktop Static Header */}
          <span className="hidden md:inline font-body text-[10px] tracking-[0.18em] font-bold text-sbg-white/80">
            02/ Customer Service
          </span>

          {/* Mobile Collapsible Content */}
          <AnimatePresence initial={false}>
            {openSections.customer && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: "1rem" },
                  collapsed: { opacity: 0, height: 0, marginTop: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden md:hidden"
              >
                <ul className="font-body space-y-3 text-[11px] font-normal tracking-[0.12em] pb-2 pt-2">
                  <li><Link href="/services" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Bespoke</Link></li>
                  <li><Link href="/shipping" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Shipping Policy</Link></li>
                  <li><Link href="/returns" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Return & Exchange</Link></li>
                  <li><Link href="/privacy" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Privacy Policy</Link></li>
                  <li><Link href="/about" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Care Instructions</Link></li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Static Links */}
          <ul className="hidden md:block space-y-3 text-[11px] font-normal tracking-[0.12em]">
            <li><Link href="/services" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Bespoke</Link></li>
            <li><Link href="/shipping" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Shipping Policy</Link></li>
            <li><Link href="/returns" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Return & Exchange</Link></li>
            <li><Link href="/privacy" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Privacy Policy</Link></li>
            <li><Link href="/about" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Care Instructions</Link></li>
          </ul>
        </div>

        {/* Column 4: 03/ Popular Now links */}
        <div className="col-span-1 md:col-span-2 p-6 md:p-8 flex flex-col md:space-y-4">
          {/* Mobile Accordion Header */}
          <button
            onClick={() => toggleSection("popular")}
            className="w-full flex items-center justify-between text-left md:hidden"
            aria-expanded={openSections.popular}
          >
            <span className="font-body text-[10px] tracking-[0.18em] font-bold text-sbg-white/80">
              03/ Popular Now
            </span>
            <ChevronIcon isOpen={openSections.popular} className="text-sbg-white/70" />
          </button>

          {/* Desktop Static Header */}
          <span className="hidden md:inline font-body text-[10px] tracking-[0.18em] font-bold text-sbg-white/80">
            03/ Popular Now
          </span>

          {/* Mobile Collapsible Content */}
          <AnimatePresence initial={false}>
            {openSections.popular && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: "1rem" },
                  collapsed: { opacity: 0, height: 0, marginTop: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden md:hidden"
              >
                <ul className="font-body space-y-3 text-[11px] font-normal tracking-[0.12em] pb-2 pt-2">
                  <li><Link href="/shop/one-for-all-dress" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">The Cowl Dress</Link></li>
                  <li><Link href="/shop/one-for-all-dress" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Onyx Black Dress</Link></li>
                  <li><Link href="/shop/one-for-all-dress" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Crimson Red Dress</Link></li>
                  <li><Link href="/shop/one-for-all-dress" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">French Blue Dress</Link></li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Static Links */}
          <ul className="hidden md:block space-y-3 text-[11px] font-normal tracking-[0.12em]">
            <li><Link href="/shop/one-for-all-dress" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">The Cowl Dress</Link></li>
            <li><Link href="/shop/one-for-all-dress" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Onyx Black Dress</Link></li>
            <li><Link href="/shop/one-for-all-dress" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">Crimson Red Dress</Link></li>
            <li><Link href="/shop/one-for-all-dress" className="text-sbg-white/70 hover:text-white hover:underline underline-offset-4">French Blue Dress</Link></li>
          </ul>
        </div>

        {/* Column 5: Newsletter Promotion & Reach Out Actions */}
        <div className="col-span-1 md:col-span-3 p-6 md:p-8 flex flex-col space-y-6">
          {/* Mobile Accordion Header */}
          <button
            onClick={() => toggleSection("reachOut")}
            className="w-full flex items-center justify-between text-left md:hidden"
            aria-expanded={openSections.reachOut}
          >
            <h3 className="font-display text-lg font-bold tracking-[0.15em] uppercase text-sbg-white leading-tight">
              REACH OUT SAVE 10% ON EVERYTHING NEW
            </h3>
            <ChevronIcon isOpen={openSections.reachOut} className="text-sbg-white/70" />
          </button>

          {/* Desktop Static Header */}
          <div className="hidden md:block">
            <h3 className="font-display text-base md:text-lg font-bold tracking-[0.15em] uppercase text-sbg-white leading-tight">
              REACH OUT SAVE 10% ON EVERYTHING NEW
            </h3>
          </div>

          {/* Mobile Collapsible Content */}
          <AnimatePresence initial={false}>
            {openSections.reachOut && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: "1rem" },
                  collapsed: { opacity: 0, height: 0, marginTop: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden md:hidden pt-2"
              >
                <div className="flex space-x-5 pb-2">
                  <a
                    href="mailto:newsletter@styledbygloria.com"
                    className="text-sbg-white hover:opacity-80 transition-opacity"
                    aria-label="Email Newsletter"
                  >
                    <MailIconFilled className="h-8 w-8" />
                  </a>
                  <a
                    href="https://wa.me/910000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sbg-white hover:opacity-80 transition-opacity"
                    aria-label="Chat on WhatsApp"
                  >
                    <WhatsappIcon className="h-8 w-8" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Static Footer Actions */}
          <div className="hidden md:flex mt-4 space-x-5">
            <a
              href="mailto:newsletter@styledbygloria.com"
              className="text-sbg-white hover:opacity-80 transition-opacity"
              aria-label="Email Newsletter"
            >
              <MailIconFilled className="h-7 w-7" />
            </a>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sbg-white hover:opacity-80 transition-opacity"
              aria-label="Chat on WhatsApp"
            >
              <WhatsappIcon className="h-7 w-7" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="py-4 text-center">
        <p className="font-body text-[9px] tracking-widest text-sbg-white/50 uppercase">
          &copy; {new Date().getFullYear()} STYLED BY GLORIA. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}