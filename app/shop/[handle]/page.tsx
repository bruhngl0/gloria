import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT_QUERY } from "@/lib/queries";
import { Product } from "@/types/shopify";
import ProductDetails from "@/components/product/ProductDetails";

interface PageProps {
  params: Promise<{ handle: string }>;
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  try {
    const data = await shopifyFetch<{ product: Product | null }>(GET_PRODUCT_QUERY, {
      handle,
    });

    if (!data?.product) {
      return {
        title: "Product Not Found | Styled by Gloria",
      };
    }

    const title = `${data.product.title} | Styled by Gloria`;
    const cleanDescription = data.product.descriptionHtml
      .replace(/<[^>]*>/g, "") // Strip HTML tags for clean search description
      .slice(0, 150)
      .trim();

    return {
      title,
      description: cleanDescription || `Shop the ${data.product.title} at Styled by Gloria.`,
      openGraph: {
        title,
        description: cleanDescription,
        type: "website",
      },
    };
  } catch (err) {
    console.error("Error generating product metadata:", err);
    return {
      title: "Shop Product | Styled by Gloria",
    };
  }
}

// Server Page Component
export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  
  let product: Product | null = null;
  try {
    const data = await shopifyFetch<{ product: Product | null }>(GET_PRODUCT_QUERY, {
      handle,
    });
    product = data?.product || null;
  } catch (err) {
    console.error("Error fetching product data:", err);
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-sbg-white min-h-screen">
      <ProductDetails product={product} />
    </div>
  );
}
