import React from "react";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import FeaturedProductSection from "@/components/home/FeaturedProductSection";
import DifferenceSection from "@/components/home/DifferenceSection";
import ServicesTeaserSection from "@/components/home/ServicesTeaserSection";
import { shopifyFetch, MOCK_PRODUCT } from "@/lib/shopify";
import { GET_PRODUCT_QUERY } from "@/lib/queries";
import { Product } from "@/types/shopify";

export default async function Home() {
  let featuredProduct: Product = MOCK_PRODUCT as unknown as Product;

  try {
    const data = await shopifyFetch<{ product: Product | null }>(GET_PRODUCT_QUERY, {
      handle: "one-for-all-dress",
    });
    
    if (data?.product) {
      featuredProduct = data.product;
    }
  } catch (err) {
    console.error("Error fetching homepage featured product:", err);
  }

  return (
    <div className="bg-sbg-white min-h-screen">
      {/* 1. Hero Cover */}
      <HeroSection product={featuredProduct} />

      {/* 2. Typographic Brand Mission */}
      <MissionSection />

      {/* 3. Featured Single SKU Section */}
      <FeaturedProductSection product={featuredProduct} />

      {/* 4. Value Pillars */}
      <DifferenceSection />

      {/* 5. Consultation & Offerings Teaser */}
      <ServicesTeaserSection />
    </div>
  );
}
