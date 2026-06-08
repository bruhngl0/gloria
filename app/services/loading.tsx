import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ServicesLoading() {
  return (
    <div className="bg-sbg-white min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section 1: Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <Skeleton className="h-3.5 w-32 mb-3" />
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-[1px] w-16 mb-6" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        {/* Section 2: Consultation CTA Box */}
        <div className="max-w-3xl mx-auto border border-sbg-black p-8 md:p-12 mb-20 text-center flex flex-col items-center space-y-6">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-8 w-80" />
          <div className="space-y-2 w-full flex flex-col items-center">
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
          <Skeleton className="h-4.5 w-16" />
          <Skeleton className="h-11 w-44" />
        </div>

        {/* Section 3: Service Cards */}
        <div className="mb-24">
          <div className="text-center mb-12 flex flex-col items-center">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-3 w-56" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-sbg-border p-8 md:p-10 flex flex-col space-y-8 bg-sbg-white">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-6.5 w-3/4" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-11/12" />
                    <Skeleton className="h-3 w-10/12" />
                  </div>
                </div>
                <Skeleton className="h-10.5 w-full pt-4 border-t border-sbg-border/60" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Stylist Bio */}
        <div className="border-t border-sbg-border pt-20 mb-16">
          <div className="text-center max-w-xl mx-auto mb-12 flex flex-col items-center">
            <Skeleton className="h-6.5 w-44 mb-2" />
            <Skeleton className="h-3 w-52" />
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex justify-center">
              <Skeleton className="aspect-square w-[280px] rounded-full border border-sbg-border" />
            </div>
            <div className="md:col-span-7 space-y-4 flex flex-col items-center md:items-start w-full">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-3 w-40" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
