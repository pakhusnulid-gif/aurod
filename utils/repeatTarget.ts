/** Extracts numeric repetition counts (e.g. "33x", "(100x)") from instruction text. */
export function parseRepeatTarget(value: string | number | undefined): number | null {
  if (typeof value === 'number') {
    return value > 1 ? value : null;
  }
  if (!value) return null;

  const matches = Array.from(value.matchAll(/(\d+)\s*[x×]/gi));
  if (matches.length === 0) return null;

  const numbers = matches
    .map((m) => parseInt(m[1], 10))
    .filter((n) => Number.isFinite(n) && n > 1);

  if (numbers.length === 0) return null;

  if (value.toLowerCase().includes('atau')) {
    return Math.max(...numbers);
  }
  return numbers[0];
}

