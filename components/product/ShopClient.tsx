"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/shopify";
import { cn } from "@/lib/utils";
import ScrollReveal from "../ui/ScrollReveal";

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  // Filter States
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Filter Categories Options
  const bodyTypesList = ["All Body Types", "Hourglass", "Pear", "Rectangle", "Inverted Triangle", "Apple"];
  
  const sizesList = useMemo(() => {
    const sizes = new Set<string>();
    initialProducts.forEach((product) => {
      const sizeOpt = product.options?.find((o) => o.name === "Size");
      if (sizeOpt) {
        sizeOpt.values.forEach((v) => sizes.add(v));
      }
    });
    return sizes.size > 0 ? Array.from(sizes) : ["XS", "S", "M", "L", "XL"];
  }, [initialProducts]);

  const colorsList = useMemo(() => {
    const colors = new Set<string>();
    initialProducts.forEach((product) => {
      const colorOpt = product.options?.find((o) => o.name === "Color");
      if (colorOpt) {
        colorOpt.values.forEach((v) => colors.add(v));
      }
    });
    return colors.size > 0 ? Array.from(colors) : ["Black", "Red", "Baby Blue"];
  }, [initialProducts]);

  // Client Side Filtering Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Body Type Filter
      if (selectedBodyType && selectedBodyType !== "All Body Types") {
        try {
          const productBodyTypes = JSON.parse(product.metafield?.value || "[]") as string[];
          if (!productBodyTypes.includes(selectedBodyType)) {
            return false;
          }
        } catch {
          // Fallback if metafield is plain string
          const val = product.metafield?.value || "";
          if (!val.includes(selectedBodyType)) {
            return false;
          }
        }
      }

      // 2. Size Filter
      if (selectedSize) {
        const variants = product.variants?.edges || [];
        const hasSizeInStock = variants.some((v) => {
          const isSizeMatch = v.node.selectedOptions.some(
            (o) => o.name === "Size" && o.value === selectedSize
          );
          return isSizeMatch && v.node.availableForSale;
        });
        if (!hasSizeInStock) return false;
      }

      // 3. Color Filter
      if (selectedColor) {
        const variants = product.variants?.edges || [];
        const hasColorInStock = variants.some((v) => {
          const isColorMatch = v.node.selectedOptions.some(
            (o) => o.name === "Color" && o.value === selectedColor
          );
          return isColorMatch && v.node.availableForSale;
        });
        if (!hasColorInStock) return false;
      }

      return true;
    });
  }, [initialProducts, selectedBodyType, selectedSize, selectedColor]);

  const hasActiveFilters = !!(selectedBodyType || selectedSize || selectedColor);

  const resetFilters = () => {
    setSelectedBodyType(null);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-8 md:pb-16">
      {/* Page Header */}
      <ScrollReveal staggerChildren={0.1} className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[0.2em] text-sbg-black uppercase">
          Shop
        </h1>
        <div className="h-[1px] w-16 bg-sbg-black mx-auto mt-4 mb-8" />
      </ScrollReveal>

      {/* Horizontal Pill Filter Bar */}
      <ScrollReveal y={15} delay={0.1} className="border-t border-b border-sbg-border py-6 mb-12 space-y-6">
        {/* Filters Group */}
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-6">
            {/* Body Type Filter */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sbg-grey block">
                Filter by Body Type
              </span>
              <div className="flex flex-wrap gap-1.5">
                {bodyTypesList.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedBodyType(selectedBodyType === type ? null : type)}
                    className={cn(
                      "px-3 py-1.5 border text-[10px] font-semibold tracking-wider uppercase transition-all duration-300",
                      selectedBodyType === type
                        ? "border-sbg-black bg-sbg-black text-sbg-white"
                        : "border-sbg-border/60 bg-sbg-white text-sbg-black hover:border-sbg-black"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sbg-grey block">
                Filter by Size
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sizesList.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={cn(
                      "px-3 py-1.5 border text-[10px] font-semibold tracking-wider uppercase transition-all duration-300",
                      selectedSize === size
                        ? "border-sbg-black bg-sbg-black text-sbg-white"
                        : "border-sbg-border/60 bg-sbg-white text-sbg-black hover:border-sbg-black"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sbg-grey block">
                Filter by Color
              </span>
              <div className="flex flex-wrap gap-1.5">
                {colorsList.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                    className={cn(
                      "px-3 py-1.5 border text-[10px] font-semibold tracking-wider uppercase transition-all duration-300",
                      selectedColor === color
                        ? "border-sbg-black bg-sbg-black text-sbg-white"
                        : "border-sbg-border/60 bg-sbg-white text-sbg-black hover:border-sbg-black"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Action */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold tracking-widest text-sbg-black uppercase border-b border-sbg-black hover:opacity-80 pb-0.5 select-none self-end md:self-auto"
            >
              Clear Filters
            </button>
          )}
        </div>
      </ScrollReveal>

      {/* Grid container */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-sbg-border">
          <p className="text-sm tracking-wider text-sbg-grey uppercase font-display mb-2">
            No products match your current filters.
          </p>
          <button
            onClick={resetFilters}
            className="text-xs font-bold tracking-widest text-sbg-black uppercase underline underline-offset-4"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ScrollReveal staggerChildren={0.08} delay={0.2} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product) => {
            const variantNode = product.variants?.edges[0]?.node;
            const price = variantNode?.price || { amount: "185.00", currencyCode: "CAD" };
            const productImages = product.images?.edges.map((e) => e.node) || [];
            
            // Check if any variant is available for sale
            const isAvailable = product.variants?.edges.some((v) => v.node.availableForSale) ?? true;

            return (
              <ProductCard
                key={product.id}
                handle={product.handle}
                title={product.title}
                price={price}
                images={productImages}
                tags={product.tags || ["new"]}
                availableForSale={isAvailable}
              />
            );
          })}
        </ScrollReveal>
      )}
    </div>
  );
}
