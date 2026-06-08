import React from "react";
import { Metadata } from "next";
import { shopifyFetch, MOCK_COLLECTION } from "@/lib/shopify";
import { GET_COLLECTION_QUERY } from "@/lib/queries";
import ShopClient from "@/components/product/ShopClient";
import { Product } from "@/types/shopify";

export const metadata: Metadata = {
  title: "Shop All | Styled by Gloria",
  description: "Browse our signature body-type-intentional collections. Find pieces designed to celebrate your silhouette.",
};

export default async function ShopPage() {
  let products: Product[] = [];

  try {
    const data = await shopifyFetch<{
      collection: {
        products: {
          edges: {
            node: Product;
          }[];
        };
      } | null;
    }>(GET_COLLECTION_QUERY, {
      handle: "frontpage", // or default handle
    });

    if (data?.collection?.products?.edges) {
      products = data.collection.products.edges.map((e) => e.node);
    }
  } catch (err) {
    console.error("Error fetching shop page collections:", err);
  }

  // Fallback to mock collection products if empty
  if (products.length === 0) {
    products = MOCK_COLLECTION.products.edges.map((e) => e.node as unknown as Product);
  }

  return (
    <div className="bg-sbg-white min-h-screen">
      <ShopClient initialProducts={products} />
    </div>
  );
}
