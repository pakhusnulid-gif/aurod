import { TUBAN_PRAYER_SCHEDULE_2026 } from '../constants/tubanPrayerSchedule2026';

export interface PrayerTimesResult {
  imsak: string;
  fajr: string;
  sunrise: string;
  dhuha: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  source: 'kemenag-tuban-2026' | 'astronomical' | 'fallback';
}

export interface NextPrayerCountdown {
  name: string;
  time: string;
  remainingSeconds: number;
  countdownText: string;
}

const TUBAN_LAT = -6.8976;
const TUBAN_LNG = 112.0478;

const DMath = {
  dtr: (d: number) => (d * Math.PI) / 180.0,
  rtd: (r: number) => (r * 180.0) / Math.PI,
  sin: (d: number) => Math.sin(DMath.dtr(d)),
  cos: (d: number) => Math.cos(DMath.dtr(d)),
  tan: (d: number) => Math.tan(DMath.dtr(d)),
  arcsin: (d: number) => DMath.rtd(Math.asin(d)),
  arccos: (d: number) => DMath.rtd(Math.acos(d)),
  arctan: (d: number) => DMath.rtd(Math.atan(d)),
  arccot: (x: number) => DMath.rtd(Math.atan(1 / x)),
  arctan2: (y: number, x: number) => DMath.rtd(Math.atan2(y, x)),
  fixAngle: (a: number) => DMath.fix(a, 360),
  fixHour: (a: number) => DMath.fix(a, 24),
  fix: (a: number, b: number) => {
    a = a - b * Math.floor(a / b);
    return a < 0 ? a + b : a;
  },
};

function julianDay(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    B -
    1524.5
  );
}

function sunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = DMath.fixAngle(357.529 + 0.98560028 * D);
  const q = DMath.fixAngle(280.459 + 0.98564736 * D);
  const L = DMath.fixAngle(q + 1.915 * DMath.sin(g) + 0.020 * DMath.sin(2 * g));

  const e = 23.439 - 0.00000036 * D;
  const RA = DMath.arctan2(DMath.cos(e) * DMath.sin(L), DMath.cos(L)) / 15.0;
  const eqT = q / 15.0 - DMath.fixHour(RA);
  const decl = DMath.arcsin(DMath.sin(e) * DMath.sin(L));

  return { declination: decl, equation: eqT };
}

function midDay(jd: number, time: number): number {
  const eqT = sunPosition(jd + time).equation;
  return DMath.fixHour(12 - eqT);
}

function sunAngleTime(
  angle: number,
  time: number,
  direction: number,
  jd: number,
  lat: number
): number {
  const decl = sunPosition(jd + time).declination;
  const noon = midDay(jd, time);
  const t =
    (1 / 15) *
    DMath.arccos(
      (-DMath.sin(angle) - DMath.sin(decl) * DMath.sin(lat)) /
        (DMath.cos(decl) * DMath.cos(lat))
    );
  return noon + direction * t;
}

function asrTime(time: number, factor: number, jd: number, lat: number): number {
  const decl = sunPosition(jd + time).declination;
  const angle = -DMath.arccot(factor + DMath.tan(Math.abs(lat - decl)));
  return sunAngleTime(angle, time, 1, jd, lat);
}

function timeToString(time: number): string {
  if (isNaN(time)) return '--:--';
  time = DMath.fixHour(time + 0.5 / 60);
  const hours = Math.floor(time);
  const minutes = Math.floor((time - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function formatDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function isTubanCoordinates(latitude: number, longitude: number): boolean {
  return (
    Math.abs(latitude - TUBAN_LAT) < 0.2 &&
    Math.abs(longitude - TUBAN_LNG) < 0.2
  );
}

function computeSunriseTime(latitude: number, longitude: number, date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const jd = julianDay(year, month, day) - longitude / (15 * 24);
  const timezone = -date.getTimezoneOffset() / 60;
  const offset = timezone - longitude / 15;
  const sunriseHour = sunAngleTime(0.833, 6 / 24, -1, jd, latitude) + offset;
  return timeToString(sunriseHour);
}

export function calculatePrayerTimes(
  latitude: number = TUBAN_LAT,
  longitude: number = TUBAN_LNG,
  date: Date = new Date()
): PrayerTimesResult {
  const FALLBACK_TIMES: PrayerTimesResult = {
    imsak: '03:55',
    fajr: '04:05',
    sunrise: '05:15',
    dhuha: '05:40',
    dhuhr: '11:35',
    asr: '14:55',
    maghrib: '17:40',
    isha: '18:55',
    source: 'fallback',
  };

  try {
    const dateKey = formatDateKey(date);
    if (isTubanCoordinates(latitude, longitude)) {
      const tubanEntry = TUBAN_PRAYER_SCHEDULE_2026[dateKey];
      if (tubanEntry) {
        return {
          imsak: tubanEntry[0],
          fajr: tubanEntry[1],
          sunrise: computeSunriseTime(TUBAN_LAT, TUBAN_LNG, date),
          dhuha: tubanEntry[2],
          dhuhr: tubanEntry[3],
          asr: tubanEntry[4],
          maghrib: tubanEntry[5],
          isha: tubanEntry[6],
          source: 'kemenag-tuban-2026',
        };
      }
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const jd = julianDay(year, month, day) - longitude / (15 * 24);
    const timezone = -date.getTimezoneOffset() / 60;
    const offset = timezone - longitude / 15;

    let times = [5, 6, 6, 12, 13, 18, 18];

    // Two iterations refine solar declination for each prayer hour.
    for (let pass = 0; pass < 2; pass++) {
      times = [
        sunAngleTime(20, times[0] / 24, -1, jd, latitude),
        sunAngleTime(0.833, times[1] / 24, -1, jd, latitude),
        sunAngleTime(-4.5, times[2] / 24, -1, jd, latitude),
        midDay(jd, times[3] / 24),
        asrTime(times[4] / 24, 1, jd, latitude),
        sunAngleTime(0.833, times[5] / 24, 1, jd, latitude),
        sunAngleTime(18, times[6] / 24, 1, jd, latitude),
      ];
    }

    // Standard Kemenag RI ~2 minute ihtiyat safety margin for calculated fallback.
    const ihtiyat = 2 / 60;
    const fajrHours = times[0] + offset + ihtiyat;
    const imsakHours = fajrHours - 10 / 60;

    const result: PrayerTimesResult = {
      imsak: timeToString(imsakHours),
      fajr: timeToString(fajrHours),
      sunrise: timeToString(times[1] + offset),
      dhuha: timeToString(times[2] + offset + ihtiyat),
      dhuhr: timeToString(times[3] + offset + ihtiyat),
      asr: timeToString(times[4] + offset + ihtiyat),
      maghrib: timeToString(times[5] + offset + ihtiyat),
      isha: timeToString(times[6] + offset + ihtiyat),
      source: 'astronomical',
    };

    const subuhJam = parseInt(result.fajr.split(':')[0], 10);
    const dzuhurJam = parseInt(result.dhuhr.split(':')[0], 10);
    const isyaJam = parseInt(result.isha.split(':')[0], 10);

    if (
      Number.isNaN(subuhJam) ||
      Number.isNaN(dzuhurJam) ||
      Number.isNaN(isyaJam) ||
      subuhJam < 3 ||
      subuhJam > 6 ||
      dzuhurJam < 11 ||
      dzuhurJam > 14 ||
      isyaJam < 17 ||
      isyaJam > 21
    ) {
      return FALLBACK_TIMES;
    }

    return result;
  } catch (error) {
    console.error('Error menghitung waktu salat, menggunakan data fallback:', error);
    return FALLBACK_TIMES;
  }
}

function parseMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return -1;
  return hours * 60 + minutes;
}

export function getCurrentPrayer(prayerTimes: PrayerTimesResult, now: Date = new Date()): string {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Subuh', time: prayerTimes.fajr },
    { name: 'Dzuhur', time: prayerTimes.dhuhr },
    { name: 'Ashar', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isya', time: prayerTimes.isha },
  ];

  for (let i = prayers.length - 1; i >= 0; i--) {
    const prayerMinutes = parseMinutes(prayers[i].time);
    if (prayerMinutes >= 0 && currentMinutes >= prayerMinutes) {
      return prayers[i].name;
    }
  }

  return 'Isya';
}

export function getNextPrayer(
  prayerTimes: PrayerTimesResult,
  now: Date = new Date()
): { name: string; time: string } {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Subuh', time: prayerTimes.fajr },
    { name: 'Dzuhur', time: prayerTimes.dhuhr },
    { name: 'Ashar', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isya', time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    const prayerMinutes = parseMinutes(prayer.time);
    if (prayerMinutes >= 0 && currentMinutes < prayerMinutes) {
      return prayer;
    }
  }

  return prayers[0];
}

export function getNextPrayerCountdown(
  prayerTimes: PrayerTimesResult,
  now: Date = new Date(),
  latitude: number = TUBAN_LAT,
  longitude: number = TUBAN_LNG
): NextPrayerCountdown {
  const currentSeconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const prayers = [
    { name: 'Subuh', time: prayerTimes.fajr },
    { name: 'Dzuhur', time: prayerTimes.dhuhr },
    { name: 'Ashar', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isya', time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    const prayerMinutes = parseMinutes(prayer.time);
    if (prayerMinutes >= 0 && currentSeconds < prayerMinutes * 60) {
      const remainingSeconds = prayerMinutes * 60 - currentSeconds;
      return {
        name: prayer.name,
        time: prayer.time,
        remainingSeconds,
        countdownText: formatCountdown(remainingSeconds),
      };
    }
  }

  // After Isya, count down to tomorrow's Subuh.
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTimes = calculatePrayerTimes(latitude, longitude, tomorrow);
  const fajrMinutes = parseMinutes(tomorrowTimes.fajr);
  const remainingSeconds =
    fajrMinutes >= 0 ? 24 * 3600 - currentSeconds + fajrMinutes * 60 : 0;

  return {
    name: 'Subuh',
    time: tomorrowTimes.fajr,
    remainingSeconds,
    countdownText: formatCountdown(remainingSeconds),
  };
}

function formatCountdown(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(clamped / 3600);
  const mins = Math.floor((clamped % 3600) / 60);
  const secs = clamped % 60;
  return `-${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
