"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShopifyImage } from "@/types/shopify";

interface ImageGalleryProps {
  images: ShopifyImage[];
  selectedImageUrl?: string;
}

export default function ImageGallery({ images, selectedImageUrl }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync active index when a variant image is selected from outside
  useEffect(() => {
    if (selectedImageUrl) {
      const index = images.findIndex((img) => img.url === selectedImageUrl);
      if (index !== -1) {
        setActiveIndex(index);
        // Scroll to the active thumbnail on mobile if needed
        if (scrollContainerRef.current) {
          const { clientWidth } = scrollContainerRef.current;
          scrollContainerRef.current.scrollTo({
            left: index * clientWidth,
            behavior: "smooth",
          });
        }
      }
    }
  }, [selectedImageUrl, images]);

  // If no images are available, display a placeholder

  // If no images are available, display a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-sbg-hover flex items-center justify-center text-xs tracking-widest text-sbg-grey uppercase">
        No Image Available
      </div>
    );
  }

  // Handle mobile horizontal scroll index detection
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const nextIndex = Math.round(scrollLeft / clientWidth);
    if (nextIndex !== activeIndex && nextIndex >= 0 && nextIndex < images.length) {
      setActiveIndex(nextIndex);
    }
  };

  const scrollToImage = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Desktop Main Image Display (Hidden on Mobile) */}
      <div className="hidden md:block relative aspect-[3/4] w-full border border-sbg-border overflow-hidden bg-sbg-offwhite cursor-zoom-in group">
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].altText || "Product Image"}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Mobile Swipeable Carousel (Hidden on Desktop) */}
      <div className="relative md:hidden w-full">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth aspect-[3/4] w-full border border-sbg-border bg-sbg-offwhite"
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className="relative w-full h-full flex-shrink-0 snap-start snap-always"
            >
              <Image
                src={image.url}
                alt={image.altText || `Product Image ${idx + 1}`}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10 bg-sbg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-sbg-border/40">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToImage(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === idx ? "w-4 bg-sbg-black" : "w-1.5 bg-sbg-grey/40"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Thumbnails (Hidden on Mobile) */}
      {images.length > 1 && (
        <div className="hidden md:grid grid-cols-4 gap-3">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative aspect-[3/4] border overflow-hidden bg-sbg-offwhite hover:opacity-90 transition-all",
                activeIndex === idx
                  ? "border-sbg-black ring-1 ring-sbg-black"
                  : "border-sbg-border"
              )}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={image.url}
                alt={image.altText || `Thumbnail ${idx + 1}`}
                fill
                sizes="15vw"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
