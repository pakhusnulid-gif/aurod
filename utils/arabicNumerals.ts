/**
 * Helper to convert standard digits (0-9) to Eastern Arabic-Indic numerals (٠-٩)
 */
export function toArabicDigits(num: number | string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit, 10)]);
}
