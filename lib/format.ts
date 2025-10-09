/**
 * Format a score number to always show one decimal place
 * @param score - Number between 0 and 10
 * @returns Formatted string like "8.9" or "9.0"
 */
export function formatScore(score: number): string {
  return score.toFixed(1)
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Generate initials from a name or text
 */
export function getInitials(text: string): string {
  const words = text.trim().split(/\s+/)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0][0]?.toUpperCase() || '?'
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

