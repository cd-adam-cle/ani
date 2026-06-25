import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn helper: merge conditional + Tailwind classes without conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
