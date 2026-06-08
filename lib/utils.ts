import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: string | number, currencyCode: string = "CAD") {
  const parsed = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currencyCode,
  }).format(parsed);
}
