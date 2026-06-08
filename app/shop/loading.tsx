import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16 bg-sbg-white min-h-screen">
      {/* Page Header */}
      <div className="text-center mb-10 flex flex-col items-center">
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-[1px] w-16" />
      </div>

      {/* Filter Bar */}
      <div className="border-t border-b border-sbg-border py-6 mb-12 flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex flex-wrap items-center gap-6">
          {/* Body Type */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-7.5 w-24" />
              ))}
            </div>
          </div>
          {/* Size */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-20" />
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-7.5 w-10" />
              ))}
            </div>
          </div>
          {/* Color */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-20" />
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-7.5 w-16" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-4">
            {/* Product Image */}
            <Skeleton className="aspect-[3/4] w-full border border-sbg-border" />
            {/* Title & Price */}
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
