"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  values: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

// Map color names to beautiful brand hex codes
const COLOR_SWATCH_MAP: Record<string, string> = {
  black: "#0A0A0A",
  red: "#8C1B1B", // Premium dark crimson red
  "baby blue": "#ABC5D9", // Editorial soft baby blue
  blue: "#ABC5D9",
  onyx: "#0A0A0A",
  crimson: "#8C1B1B",
  french: "#ABC5D9"
};

export default function VariantSelector({
  values,
  selectedValue,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-sbg-black">
          Color
        </span>
        <span className="text-xs tracking-wider text-sbg-grey uppercase">
          {selectedValue}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {values.map((value) => {
          const normalizedColor = value.toLowerCase();
          const swatchColor = COLOR_SWATCH_MAP[normalizedColor] || "#E0E0E0";
          const isSelected = selectedValue === value;

          return (
            <button
              key={value}
              onClick={() => onChange(value)}
              className={cn(
                "relative h-8 w-8 rounded-full border border-sbg-border transition-all duration-300 focus:outline-none",
                isSelected
                  ? "ring-2 ring-offset-2 ring-sbg-black scale-105"
                  : "hover:scale-105"
              )}
              style={{ backgroundColor: swatchColor }}
              title={value}
              aria-label={`Select color ${value}`}
              type="button"
            >
              {isSelected && (
                <span className="absolute inset-0 rounded-full border border-sbg-white pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
