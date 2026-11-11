export type PasaranType = 'Legi' | 'Pahing' | 'Pon' | 'Wage' | 'Kliwon';

const PASARAN_CYCLE: PasaranType[] = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

const REFERENCE_UTC_MS = Date.UTC(2024, 0, 1);
const REFERENCE_PASARAN: PasaranType = 'Pahing';
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function getPasaran(date: Date): PasaranType {
  // Compare local calendar dates in UTC midnight so 00:00-06:59 WIB never shifts to yesterday.
  const currentUtcMs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const diffInDays = Math.round((currentUtcMs - REFERENCE_UTC_MS) / MS_PER_DAY);

  const referenceIndex = PASARAN_CYCLE.indexOf(REFERENCE_PASARAN);
  const currentIndex = (referenceIndex + diffInDays) % 5;

  const normalizedIndex = currentIndex < 0 ? currentIndex + 5 : currentIndex;

  return PASARAN_CYCLE[normalizedIndex];
}

export function getIndonesianDayName(date: Date): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return days[date.getDay()];
}

export function getFullDayName(date: Date): string {
  const dayName = getIndonesianDayName(date);
  const pasaran = getPasaran(date);
  return `${dayName} ${pasaran}`;
}
