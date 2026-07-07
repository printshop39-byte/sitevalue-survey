import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Indian Rupee formatting with lakh/crore compact notation.
export function formatCurrency(value: number, compact = false) {
  if (compact) {
    const abs = Math.abs(value);
    if (abs >= 1e7) return `₹${parseFloat((value / 1e7).toFixed(2))} Cr`;
    if (abs >= 1e5) return `₹${parseFloat((value / 1e5).toFixed(2))} L`;
    if (abs >= 1e3) return `₹${parseFloat((value / 1e3).toFixed(1))}K`;
    return `₹${value}`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, compact = false) {
  return new Intl.NumberFormat("en-IN", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
