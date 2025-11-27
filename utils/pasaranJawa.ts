export type PasaranType = 'Legi' | 'Pahing' | 'Pon' | 'Wage' | 'Kliwon';

const PASARAN_CYCLE: PasaranType[] = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

const REFERENCE_DATE = new Date('2024-01-01');
const REFERENCE_PASARAN: PasaranType = 'Pahing';

export function getPasaran(date: Date): PasaranType {
  const referenceTime = REFERENCE_DATE.getTime();
  const currentTime = date.getTime();

  const diffInMs = currentTime - referenceTime;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

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
