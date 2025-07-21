import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, handling conflicts and merging Tailwind classes.
 * Uses clsx for conditional class joining and twMerge for Tailwind class conflict resolution.
 * @param inputs - Variadic array of ClassValue items (strings, arrays, objects)
 * @returns A single string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Determines the appropriate Tailwind background color class based on a percentage value.
 * The color gradient goes from green (high) to red (low) with intermediate amber/orange shades.
 * @param percentage - The percentage value (can be string or number)
 * @returns Tailwind background color class string
 * @example
 * percentageBGColor(85) // returns 'bg-green-500'
 * percentageBGColor('55') // returns 'bg-amber-400'
 */
export function percentageBGColor(percentage: string | number): string {
    if (typeof percentage === 'string') percentage = parseFloat(percentage);

    if (percentage > 80) return 'bg-green-500';
    else if (percentage > 60) return 'bg-green-400';
    else if (percentage > 40) return 'bg-amber-400';
    else if (percentage > 20) return 'bg-orange-400';
    else return 'bg-red-400';
}

/**
 * Determines the appropriate Tailwind background and border color classes based on a percentage value.
 * The color gradient goes from green (high) to red (low) with intermediate amber/orange shades.
 * Uses lighter background colors and matching borders for better visual hierarchy.
 * @param percentage - The percentage value (can be string or number)
 * @returns Tailwind background and border color class string
 * @example
 * percentageLightBGWithBorder(85) // returns 'bg-green-100 border-green-500'
 * percentageLightBGWithBorder('55') // returns 'bg-amber-100 border-amber-400'
 */
export function percentageLightBGWithBorder(percentage: string | number): string {
    if (typeof percentage === 'string') percentage = parseFloat(percentage);

    if (percentage > 80) return 'bg-green-100 text-gray-700 border-green-500 dark:bg-green-900/30 dark:text-gray-200 dark:border-green-600';
    else if (percentage > 60) return 'bg-green-50 text-gray-700 border-green-400 dark:bg-green-800/30 dark:text-gray-200 dark:border-green-500';
    else if (percentage > 40) return 'bg-amber-100 text-gray-700 border-amber-400 dark:bg-amber-900/30 dark:text-gray-200 dark:border-amber-500';
    else if (percentage > 20) return 'bg-orange-100 text-gray-700 border-orange-400 dark:bg-orange-900/30 dark:text-gray-200 dark:border-orange-500';
    else return 'bg-red-100 text-gray-700 border-red-400 dark:bg-red-900/30 dark:text-gray-200 dark:border-red-500';
}
