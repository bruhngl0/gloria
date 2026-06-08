import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-sbg-white px-4 py-24 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="font-display text-8xl md:text-9xl font-extralight tracking-widest text-sbg-black select-none">
          404
        </h1>
        <div className="h-[1px] w-12 bg-sbg-black mx-auto" />
        <h2 className="font-display text-lg font-bold tracking-widest uppercase text-sbg-black">
          Page Not Found
        </h2>
        <p className="text-xs tracking-wider leading-relaxed text-sbg-grey uppercase">
          This page doesn't exist — but your perfect outfit does.
        </p>
        <div className="pt-6">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 border border-sbg-black text-xs font-bold uppercase tracking-widest bg-sbg-black text-sbg-white hover:bg-sbg-white hover:text-sbg-black transition-all duration-300 w-full"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
