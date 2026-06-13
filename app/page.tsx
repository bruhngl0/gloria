import React from "react";
import CoverHeroSection from "@/components/home/CoverHeroSection";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import FabricSection from "@/components/home/FabricSection";
import FeaturedProductSection from "@/components/home/FeaturedProductSection";
import MethodologySection from "@/components/home/MethodologySection";
import InstagramSection from "@/components/home/InstagramSection";
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
      {/* 1. Cover Hero Spread */}
      <CoverHeroSection />

      {/* 2. Product Purchase Section (Moved Down) */}
      <div id="dress-showcase">
        <HeroSection product={featuredProduct} />
      </div>

      {/* 3. Typographic Brand Mission */}
      <MissionSection />

      {/* 3. Textile Craftsmanship */}
      <FabricSection />

      {/* 4. Featured Single SKU Section */}
      <FeaturedProductSection product={featuredProduct} />

      {/* 5. The Styling Methodology */}
      <MethodologySection />

      {/* 5.5. Curated Instagram Feed */}
      <InstagramSection />

      {/* 6. Value Pillars */}
      <DifferenceSection />

      {/* 7. Consultation & Offerings Teaser */}
      <ServicesTeaserSection />
    </div>
  );
}
