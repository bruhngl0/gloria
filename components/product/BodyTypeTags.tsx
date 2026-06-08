"use client";

import React from "react";

interface BodyTypeTagsProps {
  metafieldValue?: string | null;
}

export default function BodyTypeTags({ metafieldValue }: BodyTypeTagsProps) {
  let bodyTypes: string[] = [];

  if (metafieldValue) {
    try {
      bodyTypes = JSON.parse(metafieldValue);
    } catch {
      // If it's not a JSON array, try splitting by comma
      if (typeof metafieldValue === "string") {
        bodyTypes = metafieldValue
          .replace(/[\[\]"]/g, "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
  }

  if (bodyTypes.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-sbg-black block">
        Works beautifully for
      </span>
      <div className="flex flex-wrap gap-2">
        {bodyTypes.map((type) => (
          <span
            key={type}
            className="inline-block bg-sbg-hover text-sbg-grey text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 border border-sbg-border/30"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
