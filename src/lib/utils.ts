import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatPrice(price: string): string {
  return price;
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Open':
      return 'text-green-600 bg-green-100';
    case 'Filling Fast':
      return 'text-orange-600 bg-orange-100';
    case 'Waitlist':
      return 'text-yellow-600 bg-yellow-100';
    case 'Closed':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-600 bg-green-100';
    case 'Moderate':
      return 'text-yellow-600 bg-yellow-100';
    case 'Challenging':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'Wildlife':
      return 'text-emerald-600 bg-emerald-100';
    case 'Cultural':
      return 'text-purple-600 bg-purple-100';
    case 'Adventure':
      return 'text-blue-600 bg-blue-100';
    case 'Unique':
      return 'text-amber-600 bg-amber-100';
    case 'Nature':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}
