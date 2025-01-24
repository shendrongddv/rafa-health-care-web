import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToInitials = (name: string): string => {
  return name
    .split(" ") // Split the name into parts
    .map((part) => part[0].toUpperCase()) // Take the first letter of each part and capitalize it
    .join(""); // Join the letters
};
