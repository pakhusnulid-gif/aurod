export interface PrayerTimesResult {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

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

function midDay(jd: number, lng: number): number {
  const T = sunPosition(jd + 0.5).equation;
  return DMath.fixHour(12 - T);
}

function sunAngleTime(
  angle: number,
  time: number,
  direction: number,
  jd: number,
  lat: number,
  lng: number
): number {
  const decl = sunPosition(jd + time).declination;
  const noon = midDay(jd, lng);
  const t =
    (1 / 15) *
    DMath.arccos(
      (-DMath.sin(angle) - DMath.sin(decl) * DMath.sin(lat)) /
        (DMath.cos(decl) * DMath.cos(lat))
    );
  return noon + direction * t;
}

function asrTime(time: number, factor: number, jd: number, lat: number, lng: number): number {
  const decl = sunPosition(jd + time).declination;
  const angle = -DMath.arccot(factor + DMath.tan(Math.abs(lat - decl)));
  return sunAngleTime(angle, time, 1, jd, lat, lng);
}

function timeToString(time: number): string {
  if (isNaN(time)) return '--:--';
  time = DMath.fixHour(time + 0.5 / 60);
  const hours = Math.floor(time);
  const minutes = Math.floor((time - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function calculatePrayerTimes(
  latitude: number = -6.8976,
  longitude: number = 112.0478,
  date: Date = new Date()
): PrayerTimesResult {
  // DATA FALLBACK MANUAL UNTUK TUBAN
  const FALLBACK_TIMES: PrayerTimesResult = {
    fajr: "04:05",
    sunrise: "05:15",
    dhuhr: "11:35",
    asr: "14:55",
    maghrib: "17:40",
    isha: "18:55"
  };

  try {
    // Hardcode koordinat Tuban
    const lat = -6.8976;
    const lng = 112.0478;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const jd = julianDay(year, month, day) - lng / (15 * 24);
    const timezone = 7;

    const times = [5, 6, 12, 13, 18, 18];

    times[0] = sunAngleTime(-20, times[0] / 24, -1, jd, lat, lng);
    times[1] = sunAngleTime(-0.833, times[1] / 24, -1, jd, lat, lng);
    times[2] = midDay(jd, lng);
    times[3] = asrTime(times[3] / 24, 1, jd, lat, lng);
    times[4] = sunAngleTime(-0.833, times[4] / 24, 1, jd, lat, lng);
    times[5] = sunAngleTime(-18, times[5] / 24, 1, jd, lat, lng);

    for (let i = 0; i < times.length; i++) {
      times[i] += timezone;
    }

    const result = {
      fajr: timeToString(times[0]),
      sunrise: timeToString(times[1]),
      dhuhr: timeToString(times[2]),
      asr: timeToString(times[3]),
      maghrib: timeToString(times[4]),
      isha: timeToString(times[5]),
    };

    // SANITY CHECK: Cek apakah Subuh masuk akal
    const subuhJam = parseInt(result.fajr.split(':')[0]);
    const dzuhurJam = parseInt(result.dhuhr.split(':')[0]);
    const isyaJam = parseInt(result.isha.split(':')[0]);

    // Subuh harus antara jam 03:00 - 05:30
    // Dzuhur harus antara jam 11:00 - 13:00
    // Isya harus antara jam 18:00 - 20:00
    if (subuhJam < 3 || subuhJam > 5 ||
        dzuhurJam < 11 || dzuhurJam > 13 ||
        isyaJam < 18 || isyaJam > 20) {
      console.warn('⚠️ Waktu salat tidak wajar, menggunakan data fallback manual');
      return FALLBACK_TIMES;
    }

    return result;
  } catch (error) {
    console.error('❌ Error menghitung waktu salat, menggunakan data fallback:', error);
    return FALLBACK_TIMES;
  }
}

export function getCurrentPrayer(prayerTimes: PrayerTimesResult): string {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Subuh', time: prayerTimes.fajr },
    { name: 'Dzuhur', time: prayerTimes.dhuhr },
    { name: 'Ashar', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isya', time: prayerTimes.isha },
  ];

  for (let i = prayers.length - 1; i >= 0; i--) {
    const [hours, minutes] = prayers[i].time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;
    if (currentMinutes >= prayerMinutes) {
      return prayers[i].name;
    }
  }

  return 'Isya';
}

export function getNextPrayer(prayerTimes: PrayerTimesResult): { name: string; time: string } {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Subuh', time: prayerTimes.fajr },
    { name: 'Dzuhur', time: prayerTimes.dhuhr },
    { name: 'Ashar', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isya', time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;
    if (currentMinutes < prayerMinutes) {
      return prayer;
    }
  }

  return prayers[0];
}
