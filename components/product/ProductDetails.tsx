"use client";

import React, { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery";
import VariantSelector from "./VariantSelector";
import SizeSelector from "./SizeSelector";
import SizeGuideModal from "./SizeGuideModal";
import BodyTypeTags from "./BodyTypeTags";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Product, ProductVariant } from "@/types/shopify";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Extract option definitions
  const colorOptions = product.options.find((o) => o.name === "Color")?.values || [];
  const sizeOptions = product.options.find((o) => o.name === "Size")?.values || [];

  // Active state choices
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const variantsList = product.variants?.edges || [];

  // Initialize selections
  useEffect(() => {
    if (colorOptions.length > 0) {
      setSelectedColor(colorOptions[0]);
    }
    if (sizeOptions.length > 0) {
      // Find first available size
      const firstAvailableSize = sizeOptions.find((size) => {
        const matchingVariant = variantsList.find((v) => {
          const opts = v.node.selectedOptions;
          const hasColor = opts.some((o) => o.name === "Color" && o.value === colorOptions[0]);
          const hasSize = opts.some((o) => o.name === "Size" && o.value === size);
          return hasColor && hasSize && v.node.availableForSale;
        });
        return !!matchingVariant;
      });
      setSelectedSize(firstAvailableSize || sizeOptions[0]);
    }
  }, [product]);

  // Sizing list available for the selected colorway
  const getAvailableSizesForColor = (color: string) => {
    return variantsList
      .filter((v) => {
        const opts = v.node.selectedOptions;
        const matchesColor = opts.some((o) => o.name === "Color" && o.value === color);
        return matchesColor && v.node.availableForSale;
      })
      .map((v) => {
        const sizeOpt = v.node.selectedOptions.find((o) => o.name === "Size");
        return sizeOpt ? sizeOpt.value : "";
      })
      .filter(Boolean);
  };

  const availableSizes = getAvailableSizesForColor(selectedColor);

  // When selectedColor changes, check if the currently selectedSize is still available in this colorway.
  // If not, automatically change the selectedSize to the first available size in this colorway.
  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    const newAvailableSizes = getAvailableSizesForColor(newColor);
    if (newAvailableSizes.length > 0 && !newAvailableSizes.includes(selectedSize)) {
      setSelectedSize(newAvailableSizes[0]);
    }
  };

  // Find the exact variant based on current choices
  const activeVariantEdge = variantsList.find((v) => {
    const opts = v.node.selectedOptions;
    const matchesColor = opts.some((o) => o.name === "Color" && o.value === selectedColor);
    const matchesSize = opts.some((o) => o.name === "Size" && o.value === selectedSize);
    return matchesColor && matchesSize;
  });
  
  const activeVariant: ProductVariant | undefined = activeVariantEdge?.node;

  // Add selected variant to cart
  const handleAddToCart = async (): Promise<boolean> => {
    if (!activeVariant) return false;
    return await addToCart(activeVariant.id, 1);
  };

  // Extract metafield body types
  const bodyTypesValue = product.metafield?.value;

  // Render all product images or fallback
  const productImages = product.images?.edges.map((e) => e.node) || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Left 55% Column: Image Gallery */}
        <ScrollReveal y={20} className="lg:col-span-7">
          <ImageGallery
            images={productImages}
            selectedImageUrl={activeVariant?.image?.url}
          />
        </ScrollReveal>

        {/* Right 45% Column: Sticky Product Info */}
        <ScrollReveal staggerChildren={0.08} delay={0.15} className="lg:col-span-5 flex flex-col space-y-8 pb-24 md:pb-0">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-sbg-grey uppercase block">
              Style Code: {product.handle === "one-for-all-dress" ? "SBG-D001" : "SBG-PIECE"}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-sbg-black uppercase leading-tight">
              {product.title}
            </h1>
            <p className="text-sm font-semibold tracking-wider text-sbg-black">
              {activeVariant
                ? formatPrice(activeVariant.price.amount, activeVariant.price.currencyCode)
                : formatPrice("185.00")}
            </p>
          </div>

          {/* Body Type Pill Tags */}
          <BodyTypeTags metafieldValue={bodyTypesValue} />

          {/* Color Selector */}
          {colorOptions.length > 0 && (
            <VariantSelector
              values={colorOptions}
              selectedValue={selectedColor}
              onChange={handleColorChange}
            />
          )}

          {/* Size Selector */}
          {sizeOptions.length > 0 && (
            <SizeSelector
              values={sizeOptions}
              selectedValue={selectedSize}
              availableSizes={availableSizes}
              onChange={setSelectedSize}
              onSizeGuideOpen={() => setSizeGuideOpen(true)}
            />
          )}

          {/* Add to Bag Button */}
          <AddToCartButton
            onClick={handleAddToCart}
            disabled={!activeVariant || !activeVariant.availableForSale}
          />

          {/* Editorial Description */}
          <div
            className="text-xs tracking-wider text-sbg-grey leading-relaxed space-y-4 border-t border-sbg-border pt-6 mt-4"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {/* Product Details Accordion */}
          <AccordionRoot type="single" collapsible className="w-full border-t border-sbg-border mt-8">
            <AccordionItem value="fabric-care">
              <AccordionTrigger>Fabric & Care</AccordionTrigger>
              <AccordionContent>
                {/* CLIENT COPY */}
                Heavyweight stretch crepe (280 g/m²). Composition: 58% spandex, 42% rayon. Offers high recovery and smoothing compression. Machine wash cold on gentle cycle, lay flat to dry. Do not bleach. Cool iron if needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping-returns">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                {/* CLIENT COPY */}
                Complimentary standard shipping on all orders over $150 CAD. Returns and exchanges are accepted within 14 days of delivery. Items must be in their original unworn condition with tags attached.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fit-advice">
              <AccordionTrigger>Fit & Construction Advice</AccordionTrigger>
              <AccordionContent>
                {/* CLIENT COPY */}
                Features a double-lined bodice for maximum smoothing and drape. The side ruching is highly adjustable: pull it tight to raise the hem and create dynamic draping, or loosen it for a longer, sleek columnar silhouette. Fits true to size; if you are in between sizes, choose your size based on your hip measurement.
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        </ScrollReveal>
      </div>

      {/* Size Guide Modal Overlay */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
