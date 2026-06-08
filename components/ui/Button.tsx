import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export default function Button({
  className,
  variant = "primary",
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center border text-xs font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed py-4 px-6";

  const variants = {
    primary:
      "border-sbg-black bg-sbg-black text-sbg-white hover:bg-sbg-white hover:text-sbg-black focus:ring-1 focus:ring-sbg-black",
    secondary:
      "border-sbg-black bg-sbg-white text-sbg-black hover:bg-sbg-black hover:text-sbg-white focus:ring-1 focus:ring-sbg-black",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
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
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
