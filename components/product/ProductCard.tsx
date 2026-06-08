"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ShopifyImage, MoneyV2 } from "@/types/shopify";

interface ProductCardProps {
  handle: string;
  title: string;
  price: MoneyV2;
  images: ShopifyImage[];
  tags?: string[];
  availableForSale?: boolean;
}

export default function ProductCard({
  handle,
  title,
  price,
  images,
  tags = [],
  availableForSale = true,
}: ProductCardProps) {
  const isNew = tags.includes("new");
  const isSoldOut = !availableForSale;

  const mainImage = images[0] || { url: "/images/point.png", altText: title };
  const hoverImage = images[1] || images[0] || { url: "/images/two.png", altText: title };

  return (
    <Link href={`/shop/${handle}`} className="group block space-y-4">
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full border border-sbg-border overflow-hidden bg-sbg-offwhite">
        {/* Main Image */}
        <Image
          src={mainImage.url}
          alt={mainImage.altText || title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Hover Image */}
        {hoverImage && (
          <Image
            src={hoverImage.url}
            alt={hoverImage.altText || title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* "New" Badge */}
        {isNew && !isSoldOut && (
          <span className="absolute top-3 left-3 bg-sbg-black text-sbg-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 z-10 select-none">
            New
          </span>
        )}

        {/* "Sold Out" Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-sbg-black/40 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="bg-sbg-white text-sbg-black text-[10px] font-bold tracking-widest uppercase px-4 py-2 border border-sbg-black select-none">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product metadata */}
      <div className="space-y-1 pl-1">
        <h3 className="text-xs font-semibold tracking-wider text-sbg-black uppercase group-hover:underline decoration-1 underline-offset-4">
          {title}
        </h3>
        <p className="text-xs tracking-wider text-sbg-grey font-medium">
          {formatPrice(price.amount, price.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
