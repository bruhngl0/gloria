"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  values: string[];
  selectedValue: string;
  availableSizes: string[]; // List of sizes that are available for the currently selected color
  onChange: (value: string) => void;
  onSizeGuideOpen: () => void;
}

export default function SizeSelector({
  values,
  selectedValue,
  availableSizes,
  onChange,
  onSizeGuideOpen,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-sbg-black">
          Size
        </span>
        <button
          onClick={onSizeGuideOpen}
          className="text-xs tracking-wider text-sbg-grey hover:text-sbg-black underline underline-offset-4 transition-colors uppercase"
          type="button"
        >
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const isAvailable = availableSizes.includes(value);
          const isSelected = selectedValue === value;

          return (
            <button
              key={value}
              disabled={!isAvailable}
              onClick={() => isAvailable && onChange(value)}
              className={cn(
                "h-11 min-w-[3rem] px-4 border text-xs font-semibold tracking-wider uppercase transition-all duration-300 focus:outline-none flex items-center justify-center relative",
                isSelected
                  ? "border-sbg-black bg-sbg-black text-sbg-white"
                  : isAvailable
                  ? "border-sbg-border bg-sbg-white text-sbg-black hover:border-sbg-black"
                  : "border-sbg-border/40 bg-sbg-offwhite text-sbg-grey/40 cursor-not-allowed line-through"
              )}
              aria-label={`Select size ${value}${!isAvailable ? " (Out of stock)" : ""}`}
              type="button"
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
