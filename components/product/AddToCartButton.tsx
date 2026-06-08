"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  onClick: () => Promise<boolean>;
  disabled?: boolean;
}

export default function AddToCartButton({
  onClick,
  disabled = false,
}: AddToCartButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleAddToCart = async () => {
    if (disabled || status !== "idle") return;

    setStatus("loading");
    const isSuccess = await onClick();

    if (isSuccess) {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    } else {
      setStatus("idle");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-sbg-white border-t border-sbg-border md:relative md:bottom-auto md:left-auto md:right-auto md:p-0 md:border-t-0 md:bg-transparent md:z-auto">
      <button
        type="button"
        disabled={disabled || status === "loading"}
        onClick={handleAddToCart}
        className={cn(
          "w-full inline-flex items-center justify-center border text-xs font-bold uppercase tracking-widest transition-all duration-300 py-4 px-6 focus:outline-none focus:ring-1 focus:ring-sbg-black select-none",
          status === "success"
            ? "border-green-700 bg-green-700 text-sbg-white"
            : "border-sbg-black bg-sbg-black text-sbg-white hover:bg-sbg-white hover:text-sbg-black disabled:opacity-50 disabled:bg-sbg-black disabled:text-sbg-white disabled:hover:bg-sbg-black"
        )}
      >
        {status === "loading" && (
          <span className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-sbg-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Adding...</span>
          </span>
        )}

        {status === "success" && (
          <span className="flex items-center justify-center space-x-2">
            <Check className="h-4 w-4 stroke-[2.5]" />
            <span>Added to Bag</span>
          </span>
        )}

        {status === "idle" && <span>Add to Cart</span>}
      </button>
    </div>
  );
}
