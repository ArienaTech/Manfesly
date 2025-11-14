import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

export function getEmotionLabel(score: number): string {
  if (score <= 2) return 'Very Low';
  if (score <= 4) return 'Low';
  if (score <= 6) return 'Moderate';
  if (score <= 8) return 'Good';
  return 'Excellent';
}

export function getEmotionColor(score: number): string {
  if (score <= 2) return 'text-red-500';
  if (score <= 4) return 'text-orange-500';
  if (score <= 6) return 'text-yellow-500';
  if (score <= 8) return 'text-green-500';
  return 'text-primary-600';
}
