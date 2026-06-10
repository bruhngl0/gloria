"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/shopify";
import { cn } from "@/lib/utils";
import SizeGuideModal from "../product/SizeGuideModal";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import ScrollReveal from "../ui/ScrollReveal";
import AnimatedText from "../ui/AnimatedText";

interface HeroSectionProps {
  product: Product;
}

export default function HeroSection({ product }: HeroSectionProps) {
  const { addToCart, openCart, cartCount } = useCart();

  // Carousel & Image States
  const colors = ["Black", "Red", "Baby Blue"];
  const colorLabels: Record<string, string> = {
    "Black": "Onyx Black",
    "Red": "Crimson Red",
    "Baby Blue": "French Blue",
  };
  const colorHex: Record<string, string> = {
    "Black": "#2B2B2B",
    "Red": "#A62626",
    "Baby Blue": "#5F85A6",
  };

  const [activeColor, setActiveColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState<string | null>("S");
  const [isDetailView, setIsDetailView] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // CTA Button animation states
  const [addingToBag, setAddingToBag] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).__sbg_loading_complete) {
        setLoadingComplete(true);
      } else {
        const handleComplete = () => setLoadingComplete(true);
        window.addEventListener("sbg-loading-complete", handleComplete);
        return () => window.removeEventListener("sbg-loading-complete", handleComplete);
      }
    } else {
      setLoadingComplete(true);
    }
  }, []);

  // Active color index
  const activeColorIndex = colors.indexOf(activeColor);

  // Map color index to mock images
  const imageMap: Record<string, { main: string; detail: string }> = {
    "Black": {
      main: "/images/rrhero.png",
      detail: "/images/two.png",
    },
    "Red": {
      main: "/images/two.png",
      detail: "/images/three.png",
    },
    "Baby Blue": {
      main: "/images/three.png",
      detail: "/images/one.png",
    },
  };

  const activeImages = imageMap[activeColor] || imageMap["Black"];
  const currentMainImage = isDetailView ? activeImages.detail : activeImages.main;

  // Handle slide switching
  const handlePrevSlide = () => {
    setIsDetailView(false);
    const newIndex = (activeColorIndex - 1 + colors.length) % colors.length;
    setActiveColor(colors[newIndex]);
  };

  const handleNextSlide = () => {
    setIsDetailView(false);
    const newIndex = (activeColorIndex + 1) % colors.length;
    setActiveColor(colors[newIndex]);
  };

  const selectSlide = (index: number) => {
    setIsDetailView(false);
    setActiveColor(colors[index]);
  };

  // Find active variant matching selected color & size
  const activeVariant = product.variants.edges.find((edge) => {
    const hasColor = edge.node.selectedOptions.some(
      (opt) => opt.name === "Color" && opt.value === activeColor
    );
    const hasSize = edge.node.selectedOptions.some(
      (opt) => opt.name === "Size" && opt.value === selectedSize
    );
    return hasColor && hasSize;
  })?.node;

  const isAvailable = activeVariant ? activeVariant.availableForSale : false;
  const currentPrice = activeVariant
    ? parseFloat(activeVariant.price.amount)
    : 185.0;

  // Handle Add to Bag Action
  const handleAddToBag = async () => {
    if (!activeVariant || !isAvailable) return;

    setAddingToBag(true);
    const success = await addToCart(activeVariant.id, 1);
    setAddingToBag(false);

    if (success) {
      setAddedToBag(true);
      setTimeout(() => {
        setAddedToBag(false);
      }, 1500);
    }
  };

  return (
    <section className="relative w-full border-b border-sbg-border selection:bg-sbg-black selection:text-sbg-white">
      {/* ========================================================================= */}
      {/* 1. DESKTOP WORKSPACE LAYOUT (Saint Laurent Grid Structure) */}
      {/* ========================================================================= */}
      <div className="hidden md:grid md:grid-cols-12 h-[calc(100vh-64px)] overflow-hidden w-full bg-sbg-white">

        {/* --- LEFT COLUMN: Brand Wordmark Track & Editorial Navigation --- */}
        <div className="col-span-3 flex h-full border-r border-sbg-border bg-sbg-white select-none">
          {/* Vertical brand title container */}
          <div className="w-[60px] lg:w-[65px] h-full border-r border-sbg-border flex items-center justify-center relative py-8">
            <motion.span
              initial={{ opacity: 0, y: 15, rotate: -90 }}
              animate={loadingComplete ? { opacity: 1, y: 0, rotate: -90 } : { opacity: 0, y: 15, rotate: -90 }}
              transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] as const, delay: 0.1 }}
              className="font-display text-[18px] lg:text-[20px] font-bold tracking-[0.25em] uppercase whitespace-nowrap select-none text-sbg-black origin-center"
            >
              ONE FOR ALL
            </motion.span>
          </div>

          {/* Navigation panel */}
          <div className="flex-1 flex flex-col justify-between p-6">
            {/* Top link stack */}
            <ScrollReveal staggerChildren={0.08} delay={0.2} className="space-y-6 mt-8">
              <div>
                <a
                  href="/shop"
                  className="font-bold tracking-[0.25em] text-[9px] uppercase text-sbg-black hover:text-sbg-grey transition-colors block"
                >
                  SHOP PIECES &gt;
                </a>
                <span className="text-[8px] tracking-widest text-sbg-grey uppercase block mt-0.5">
                  1 SKU Edition
                </span>
              </div>

              <div className="space-y-3 pt-3 border-t border-sbg-border/60">
                <a
                  href="/services"
                  className="tracking-[0.2em] text-[9px] uppercase text-sbg-grey hover:text-sbg-black transition-colors block"
                >
                  SERVICES
                </a>
                <a
                  href="/about"
                  className="tracking-[0.2em] text-[9px] uppercase text-sbg-grey hover:text-sbg-black transition-colors block"
                >
                  THE FOUNDER
                </a>
                <a
                  href="/contact"
                  className="tracking-[0.2em] text-[9px] uppercase text-sbg-grey hover:text-sbg-black transition-colors block"
                >
                  CONTACT OFFICE
                </a>
              </div>
            </ScrollReveal>

            {/* Bottom info panel */}
            <ScrollReveal staggerChildren={0.08} delay={0.4} className="space-y-3.5 text-[8px] tracking-[0.18em] text-sbg-grey uppercase leading-relaxed mb-2">
              <div>
                <span className="text-sbg-black block font-bold">SHIPPING TO</span>
                <span>CANADA / USD</span>
              </div>
              <div>
                <span className="text-sbg-black block font-bold">LANGUAGE</span>
                <span>ENGLISH</span>
              </div>
              <div className="pt-3 border-t border-sbg-border/60 text-[7.5px] tracking-widest text-sbg-grey/70">
                SBG © 2026
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* --- CENTER COLUMN: Full-Height Immersive Lookbook Cover --- */}
        <div className="col-span-6 flex flex-col relative h-full bg-sbg-offwhite border-r border-sbg-border overflow-hidden group/center">

          {/* Main Visual Slider */}
          <div className="absolute inset-0 w-full h-full">
            <motion.div
              key={currentMainImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={loadingComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.4, ease: [0.215, 0.61, 0.355, 1] as const }}
              className="relative w-full h-full"
            >
              <Image
                src={currentMainImage}
                alt={product.title}
                fill
                priority
                className="object-cover object-center w-full h-full"
                sizes="(max-width: 1200px) 70vw, 60vw"
              />
            </motion.div>
            {/* Subtle premium dark vignette overlay to lift layout text */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-sbg-white/40 to-transparent pointer-events-none" />
          </div>

          {/* Carousel Arrow Controls */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-25 w-11 h-11 border border-sbg-border/60 bg-sbg-white/85 text-sbg-black hover:bg-sbg-black hover:text-sbg-white hover:border-sbg-black transition-all flex items-center justify-center rounded-full cursor-pointer shadow-sm opacity-0 group-hover/center:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 stroke-[1.25]" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-25 w-11 h-11 border border-sbg-border/60 bg-sbg-white/85 text-sbg-black hover:bg-sbg-black hover:text-sbg-white hover:border-sbg-black transition-all flex items-center justify-center rounded-full cursor-pointer shadow-sm opacity-0 group-hover/center:opacity-100 focus:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 stroke-[1.25]" />
          </button>

          {/* Bottom Left: Slide Indicator */}
          <div className="absolute bottom-8 left-8 z-20">
            {/* Slide dot paginations */}
            <div className="flex items-center space-x-3">
              {colors.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectSlide(i)}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
                    activeColorIndex === i
                      ? "bg-sbg-black scale-125"
                      : "bg-sbg-grey/40 hover:bg-sbg-grey"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN: Purchasing Drawer & Sizing configs --- */}
        <div className="col-span-3 flex flex-col justify-between h-full p-6 bg-sbg-white overflow-y-auto">

          {/* Top Info row */}
          <div className="flex justify-between items-center text-[9px] tracking-[0.2em] text-sbg-grey uppercase border-b border-sbg-border/60 pb-4">
            <button
              onClick={openCart}
              className="font-bold text-sbg-black hover:text-sbg-grey transition-colors flex items-center"
            >
              BAG ({cartCount}) &gt;
            </button>
            <span className="select-none">STUDIO SPEC</span>
          </div>

          {/* View detail thumbnail frame */}
          <ScrollReveal staggerChildren={0.12} delay={0.1} className="my-4 space-y-4">
            <div>
              <span className="text-[8px] tracking-[0.25em] font-bold text-sbg-grey uppercase block mb-3">
                ATELIER SHOT
              </span>

              {/* Interactive Thumbnail wrapper */}
              <div
                onClick={() => setIsDetailView((prev) => !prev)}
                className="group/thumb relative aspect-[4/3] w-full bg-sbg-offwhite border border-sbg-border overflow-hidden cursor-pointer shadow-sm"
              >
                <video
                  src="/images/shortdes.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full transition-transform duration-500 group-hover/thumb:scale-105"
                />
                <div className="absolute inset-0 bg-sbg-black/0 transition-colors group-hover/thumb:bg-sbg-black/15 pointer-events-none" />
              </div>
            </div>

            {/* Editorial product description */}
            <div className="space-y-2.5 text-[8.5px] tracking-[0.2em] text-sbg-grey leading-relaxed uppercase">
              <p className="font-bold text-sbg-black">
                {product.title} &mdash; {formatPrice(currentPrice)}
              </p>
              <p>
                HEAVYWEIGHT 280G STRETCH CREPE DRESS DESIGNED AROUND SPECIFIC BODY SHAPES.
                FEATURES AN ADJUSTABLE DRAPED NECK AND SIDE RUCHING FOR CUSTOM PROFILE CONTOURING.
              </p>
            </div>
          </ScrollReveal>

          {/* Custom sizing and Variant config form */}
          <ScrollReveal staggerChildren={0.1} delay={0.3} className="space-y-6 pt-4 border-t border-sbg-border/60">
            {/* Colorway Selection swatches */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[8px] tracking-[0.2em] font-bold text-sbg-black uppercase">
                  COLORWAY
                </span>
                <span className="text-[8px] tracking-[0.2em] text-sbg-grey uppercase">
                  {colorLabels[activeColor]}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setIsDetailView(false);
                      setActiveColor(color);
                    }}
                    className={cn(
                      "w-5.5 h-5.5 rounded-full border border-sbg-border transition-all flex items-center justify-center focus:outline-none",
                      activeColor === color
                        ? "ring-1 ring-offset-2 ring-sbg-black border-sbg-black"
                        : "hover:scale-110"
                    )}
                    style={{ backgroundColor: colorHex[color] }}
                    aria-label={`Select ${colorLabels[color]}`}
                  />
                ))}
              </div>
            </div>

            {/* Sizing options */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[8px] tracking-[0.2em] font-bold text-sbg-black uppercase">
                  SELECT SIZE
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[8px] tracking-[0.2em] text-sbg-grey hover:text-sbg-black underline uppercase"
                >
                  SIZING CHART
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {["XS", "S", "M", "L", "XL"].map((size) => {
                  const isSizeAvailable = !(activeColor === "Red" && size === "XL");
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      disabled={!isSizeAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-7 px-2.5 border text-[9px] tracking-widest transition-all focus:outline-none flex items-center justify-center min-w-[32px]",
                        !isSizeAvailable
                          ? "opacity-30 line-through cursor-not-allowed border-sbg-border bg-sbg-offwhite text-sbg-grey"
                          : isSelected
                            ? "border-sbg-black bg-sbg-black text-sbg-white font-bold"
                            : "border-sbg-border bg-sbg-white text-sbg-black hover:border-sbg-black"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Add to Bag button */}
            <button
              onClick={handleAddToBag}
              disabled={!isAvailable || addingToBag}
              className={cn(
                "w-full py-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-all flex items-center justify-center",
                !isAvailable
                  ? "bg-sbg-offwhite border border-sbg-border text-sbg-grey cursor-not-allowed"
                  : addedToBag
                    ? "bg-sbg-black text-sbg-white"
                    : "bg-sbg-black text-sbg-white hover:opacity-90 active:scale-[0.98]"
              )}
            >
              {addingToBag ? (
                <span className="flex items-center space-x-1.5">
                  <span className="animate-spin rounded-full h-2.5 w-2.5 border-b-2 border-sbg-white" />
                  <span>PREPARING ATELIER...</span>
                </span>
              ) : addedToBag ? (
                <span>ADDED TO PROFILE ✓</span>
              ) : isAvailable ? (
                <span>ADD TO BAG &mdash; {formatPrice(currentPrice)}</span>
              ) : (
                <span>COLORWAY OUT OF STOCK</span>
              )}
            </button>
          </ScrollReveal>

          {/* Right footer links */}
          <div className="flex justify-between items-center text-[7.5px] tracking-[0.2em] text-sbg-grey uppercase pt-4 border-t border-sbg-border/60 mt-4 select-none">
            <span className="hover:text-sbg-black cursor-pointer">INSTAGRAM</span>
            <span>SCROLL TO EXPLORE &darr;</span>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. RESPONSIVE MOBILE VIEWPORT (Editorial Stacked layout) */}
      {/* ========================================================================= */}
      <div className="block md:hidden bg-sbg-white w-full">
        {/* Mobile Lookbook Carousel Image Hero */}
        <section className="relative w-full aspect-[3/4] bg-sbg-offwhite overflow-hidden">
          <Image
            key={currentMainImage}
            src={currentMainImage}
            alt={product.title}
            fill
            className="object-cover"
            sizes="100vw"
          />

          {/* Mobile Carousel Indicator overlay */}
          <div className="absolute bottom-6 left-6 z-10 flex items-center space-x-3">
            {colors.map((_, i) => (
              <button
                key={i}
                onClick={() => selectSlide(i)}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all",
                  activeColorIndex === i ? "bg-sbg-black scale-125" : "bg-sbg-grey/50"
                )}
              />
            ))}
          </div>

          {/* Mobile slide swipe arrows */}
          <div className="absolute inset-y-0 inset-x-4 flex justify-between items-center pointer-events-none">
            <button
              onClick={handlePrevSlide}
              className="pointer-events-auto w-9 h-9 bg-sbg-white/85 border border-sbg-border/60 rounded-full flex items-center justify-center shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextSlide}
              className="pointer-events-auto w-9 h-9 bg-sbg-white/85 border border-sbg-border/60 rounded-full flex items-center justify-center shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Mobile purchasing form stack */}
        <section className="px-6 py-6 space-y-6">
          {/* Header titles */}
          <div className="space-y-2">
            <span className="text-[8px] tracking-[0.25em] font-bold text-sbg-grey uppercase block">
              THE SIGNATURE SKU
            </span>
            <div className="flex justify-between items-baseline">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                {product.title}
              </h2>
              <span className="text-xs font-bold tracking-wider text-sbg-grey">
                {formatPrice(currentPrice)}
              </span>
            </div>
            <p className="text-[9px] tracking-[0.2em] text-sbg-grey uppercase leading-relaxed">
              HEAVYWEIGHT 280G CREPE COWL NECKLINE DRESS WITH ADJUSTABLE DRAWER SIDE RUCHING FOR ACCURATE SHAPE CONTOURING.
            </p>
          </div>

          {/* Atelier shot toggle */}
          <div className="space-y-2">
            <span className="text-[8px] tracking-[0.2em] font-bold text-sbg-black uppercase block">
              DETAIL ATELIER IMAGE
            </span>
            <div
              onClick={() => setIsDetailView((prev) => !prev)}
              className="relative aspect-[3/2] w-full border border-sbg-border overflow-hidden bg-sbg-offwhite"
            >
              <video
                src="/images/shortdes.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Color selectors */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] tracking-[0.2em]">
              <span className="font-bold text-sbg-black uppercase">COLORWAY</span>
              <span className="text-sbg-grey uppercase">{colorLabels[activeColor]}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setIsDetailView(false);
                    setActiveColor(color);
                  }}
                  className={cn(
                    "w-6 h-6 rounded-full border border-sbg-border transition-all flex items-center justify-center focus:outline-none",
                    activeColor === color ? "ring-1 ring-offset-2 ring-sbg-black" : ""
                  )}
                  style={{ backgroundColor: colorHex[color] }}
                />
              ))}
            </div>
          </div>

          {/* Size selectors */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] tracking-[0.2em]">
              <span className="font-bold text-sbg-black uppercase">SELECT SIZE</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-sbg-grey underline uppercase"
              >
                SIZING CHART
              </button>
            </div>

            <div className="flex gap-1.5">
              {["XS", "S", "M", "L", "XL"].map((size) => {
                const isSizeAvailable = !(activeColor === "Red" && size === "XL");
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    disabled={!isSizeAvailable}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-8 flex-1 border text-[9px] tracking-widest focus:outline-none flex items-center justify-center min-w-[32px]",
                      !isSizeAvailable
                        ? "opacity-30 line-through bg-sbg-offwhite text-sbg-grey border-sbg-border"
                        : isSelected
                          ? "border-sbg-black bg-sbg-black text-sbg-white font-bold"
                          : "border-sbg-border bg-sbg-white text-sbg-black"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Add to cart */}
          <div className="pt-2">
            <button
              onClick={handleAddToBag}
              disabled={!isAvailable || addingToBag}
              className={cn(
                "w-full py-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-all flex items-center justify-center",
                !isAvailable
                  ? "bg-sbg-offwhite border border-sbg-border text-sbg-grey"
                  : addedToBag
                    ? "bg-sbg-black text-sbg-white"
                    : "bg-sbg-black text-sbg-white"
              )}
            >
              {addingToBag ? (
                <span>ADDING TO PROFILE...</span>
              ) : addedToBag ? (
                <span>ADDED TO PROFILE ✓</span>
              ) : isAvailable ? (
                <span>ADD TO BAG &mdash; {formatPrice(currentPrice)}</span>
              ) : (
                <span>OUT OF STOCK</span>
              )}
            </button>
          </div>
        </section>
      </div>

      {/* Sizing Chart Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </section>
  );
}
