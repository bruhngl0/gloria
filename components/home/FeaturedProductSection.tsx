"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/shopify";
import BodyTypeTags from "../product/BodyTypeTags";
import ScrollReveal from "../ui/ScrollReveal";

interface FeaturedProductSectionProps {
  product: Product;
}

export default function FeaturedProductSection({ product }: FeaturedProductSectionProps) {
  const mainImage = product.images?.edges[0]?.node?.url || "/images/point.png";
  const mainImageAlt = product.images?.edges[0]?.node?.altText || product.title;

  return (
    <section className="bg-sbg-white w-full py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image (60% equivalent span 7) */}
          <ScrollReveal className="lg:col-span-7 w-full relative aspect-[3/4] border border-sbg-border overflow-hidden bg-sbg-offwhite" y={20}>
            <Image
              src={mainImage}
              alt={mainImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
            />
          </ScrollReveal>

          {/* Right Column: Copy & Actions (40% equivalent span 5) */}
          <ScrollReveal staggerChildren={0.12} delay={0.1} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-sbg-grey uppercase block">
                Featured Piece — SBG-D001
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase">
                {product.title}
              </h2>
              <p className="text-xs tracking-wider leading-relaxed text-sbg-grey">
                {/* CLIENT COPY */}
                A single dress engineered to honor a multitude of shapes. Made from our heavy stretch crepe, this piece features customizable ruching and a cowl neck that drapes to your exact proportions.
              </p>
            </div>

            {/* Body Type tags */}
            <div className="border-t border-b border-sbg-border py-6">
              <BodyTypeTags metafieldValue={product.metafield?.value} />
            </div>

            <div className="pt-2">
              <Link
                href={`/shop/${product.handle}`}
                className="inline-flex items-center justify-center px-8 py-4 border border-sbg-black text-xs font-bold uppercase tracking-widest bg-sbg-black text-sbg-white hover:bg-transparent hover:text-sbg-black transition-all duration-300 w-full sm:w-auto"
              >
                View The Dress
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

