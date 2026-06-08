import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ProductDetailsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16 bg-sbg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Left Column: Image Gallery Placeholder */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
          <Skeleton className="aspect-[3/4] w-full border border-sbg-border" />
          <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-x-visible w-full md:w-20 shrink-0 select-none pb-2 md:pb-0">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] w-20 border border-sbg-border md:w-full shrink-0" />
            ))}
          </div>
        </div>

        {/* Right Column: Details Placeholder */}
        <div className="lg:col-span-5 flex flex-col space-y-8 pb-24 md:pb-0">
          <div className="space-y-4">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-4.5 w-24" />
          </div>

          {/* Body Type tags */}
          <div className="flex flex-wrap gap-2 py-4 border-t border-b border-sbg-border/60">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-5 w-16" />
            ))}
          </div>

          {/* Color swatches */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <div className="flex gap-2.5">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-5.5 w-5.5 rounded-full" />
              ))}
            </div>
          </div>

          {/* Size options */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-7 w-9" />
              ))}
            </div>
          </div>

          {/* Add to cart CTA */}
          <Skeleton className="h-11 w-full" />

          {/* Description */}
          <div className="space-y-3 pt-6 border-t border-sbg-border/60">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>

          {/* Accordion list */}
          <div className="space-y-2 border-t border-sbg-border/60 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-sbg-border/60">
                <Skeleton className="h-4.5 w-32" />
                <Skeleton className="h-4 w-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
