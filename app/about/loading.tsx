import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <div className="bg-sbg-white min-h-screen">
      {/* Editorial Header Banner */}
      <Skeleton className="h-[40vh] md:h-[55vh] w-full border-b border-sbg-border" />

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <Skeleton className="h-3.5 w-24 mb-3" />
          <Skeleton className="h-10 w-[350px] mb-4" />
          <Skeleton className="h-[1px] w-16" />
        </div>

        {/* Two Column Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          {/* Left Column: Stylist Portrait */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <Skeleton className="aspect-[3/4] w-full max-w-md border border-sbg-border" />
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48 mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
              <div className="space-y-2 pt-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Skeleton className="h-6 w-56 mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-11/12" />
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement Block */}
        <div className="border border-sbg-border py-16 px-8 flex flex-col items-center max-w-4xl mx-auto mb-20 bg-sbg-offwhite space-y-4">
          <Skeleton className="h-3.5 w-36" />
          <div className="space-y-2.5 w-full flex flex-col items-center">
            <Skeleton className="h-4.5 w-5/6" />
            <Skeleton className="h-4.5 w-4/6" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-sbg-border/60 pt-16">
          <Skeleton className="h-12 w-full sm:w-60" />
          <Skeleton className="h-12 w-full sm:w-60" />
        </div>
      </div>
    </div>
  );
}
