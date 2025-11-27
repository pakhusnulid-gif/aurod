export interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  dayName: string;
}

const HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  'Rabiul Awal',
  'Rabiul Akhir',
  'Jumadil Awal',
  'Jumadil Akhir',
  'Rajab',
  "Sya'ban",
  'Ramadhan',
  'Syawwal',
  'Dzulqadah',
  'Dzulhijjah',
];

const ARABIC_DAYS = [
  'Al-Ahad',
  'Al-Ithnayn',
  'Ath-Thulatha',
  "Al-Arbi'a",
  'Al-Khamis',
  "Al-Jumu'ah",
  'As-Sabt',
];

export function gregorianToHijri(date: Date): HijriDate {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
    Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4) +
    day - 32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) +
    (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
  const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
    (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const hijriMonth = Math.floor((24 * l3) / 709);
  const hijriDay = l3 - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * n + j - 30;

  const dayOfWeek = date.getDay();

  return {
    day: hijriDay,
    month: hijriMonth,
    year: hijriYear,
    monthName: HIJRI_MONTHS[hijriMonth - 1] || '',
    dayName: ARABIC_DAYS[dayOfWeek],
  };
}

export function formatHijriDate(hijri: HijriDate): string {
  return `${hijri.day} ${hijri.monthName} ${hijri.year} H`;
}
