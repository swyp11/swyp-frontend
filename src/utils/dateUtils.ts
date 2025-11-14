/**
 * Calculate days remaining until wedding date
 * @param weddingDate - Wedding date in YYYY-MM-DD format
 * @returns Number of days remaining (positive for future, negative for past, 0 for today)
 */
export function calculateDaysUntilWedding(weddingDate?: string): number | null {
  if (!weddingDate) return null;

  try {
    const wedding = new Date(weddingDate);
    const today = new Date();

    // Reset time to 00:00:00 for accurate day calculation
    wedding.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = wedding.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  } catch (error) {
    console.error('Error calculating days until wedding:', error);
    return null;
  }
}

/**
 * Format D-Day display text
 * @param days - Number of days remaining
 * @returns Formatted D-Day text (e.g., "D-30", "D-Day", "결혼 100일")
 */
export function formatDDay(days: number | null): string {
  if (days === null) return '미설정';
  if (days === 0) return 'D-Day';
  if (days > 0) return `D-${days}`;

  // 결혼 후 경과일 계산
  const daysAfter = Math.abs(days);
  const years = Math.floor(daysAfter / 365);

  if (years >= 1) {
    return `결혼 ${years}주년`;
  }

  return `결혼 ${daysAfter}일`;
}
