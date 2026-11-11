# Project Architecture & Developer Guide - Aurod An-Nidhomiyyah

Dokumen ringkasan arsitektur ini dibuat sebagai panduan cepat pengembang (AI maupun human developer) agar proses pemeliharaan dan revisi fitur dapat langsung tertuju ke file yang relevan tanpa perlu memindai ulang seluruh direktori proyek.

---

## 1. Tech Stack Utama

| Lapisan | Teknologi | Keterangan |
|---|---|---|
| **Core Framework** | **React Native (v0.81.4)** + **React (v19.1.0)** | Base framework aplikasi mobile & web |
| **App Platform** | **Expo (SDK 54)** + **Expo Router (v6.0.8)** | File-based routing, native bridge, build system |
| **Language** | **TypeScript (v5.9.2)** | Strict typing lintas komponen dan data kitab |
| **Platform Target** | **Mobile-First Web (PWA)** + **Android/iOS** | Static export Metro (`output: "static"`), Service Worker offline caching |
| **Typography & Icons** | `@expo-google-fonts/amiri`, `lucide-react-native` | Tipografi Arab standar mushaf dan ikon modern |
| **State & Storage** | **React Context API** + `@react-native-async-storage/async-storage` | State global tema/font lokal tanpa dependensi backend eksternal |
| **Build Tools** | **Metro Bundler**, **EAS Build** (`eas.json`) | Build pipeline native & PWA |

---

## 2. Struktur Folder Penting

```text
aurod/
├── app/                          # Routing halaman (Expo Router file-based)
│   ├── _layout.tsx               # Root Layout (font loading, ThemeProvider, SafeAreaProvider, Stack)
│   ├── +html.tsx                 # Master template HTML PWA (meta viewport, lang, PWA manifest)
│   ├── +not-found.tsx            # Halaman 404
│   ├── index.tsx                 # Beranda (HeroKubah, PrayerTimes, Menu Utama, Info Pesantren)
│   ├── yasin.tsx                 # Bacaan Yasin Fadhilah (83 ayat + 5 sisipan doa + quick jump)
│   ├── aurod.tsx                 # Bacaan Aurod An-Nidhomiyyah (Pembukaan, Aurod I-III, Hailalah, Sanad)
│   ├── tawassul.tsx              # Bacaan Hadiah Fatihah / Tawassul Masyayikh
│   └── tahlil.tsx                # Susunan Tahlil lengkap + Doa Penutup
│
├── components/                   # Komponen antarmuka (Reusable UI)
│   ├── AppShell.tsx              # Wrapper layout responsif (maxWidth 480px beranda, 680px bacaan)
│   ├── Navbar.tsx                # Header navigasi atas + tombol kembali + toggle tema & Aa font
│   ├── Footer.tsx                # Footer info pondok, hak cipta, dan link sanad
│   ├── HeroKubah.tsx             # Card kubah emerald: countdown salat berikutnya, tanggal Hijriyah & Pasaran
│   ├── PrayerTimes.tsx           # Strip 5 waktu salat ringkas di beranda (touchable ke detail)
│   ├── PrayerDetailModal.tsx     # Modal detail 8 waktu salat (Imsak, Subuh, Terbit, Dhuha, dll) + navigasi tanggal
│   ├── ReadingSettingsModal.tsx  # Popover Aa untuk slider ukuran font (18-40px), toggle Latin, toggle terjemahan
│   ├── TasbihModal.tsx           # Counter tasbih digital interaktif (terhubung ke target hitungan wirid)
│   └── PwaInstallModal.tsx       # Banner / prompt instalasi PWA ke layar utama
│
├── constants/                    # Single source of truth untuk konten data & konfigurasi
│   ├── theme.ts                  # Palet warna dual-mode (Light/Dark WCAG AA), spacing, shadows, typography
│   ├── aurodData.ts              # Data teks Arab, latin, terjemah Aurod An-Nidhomiyyah & Silsilah Sanad
│   ├── yasinData.ts              # Data teks Arab, latin, terjemah Yasin Fadhilah & 5 Sisipan Doa
│   ├── tawassulData.ts           # Data teks Arab, latin, terjemah Tawassul
│   ├── tahlilData.ts             # Data teks Arab, latin, terjemah Tahlil lengkap
│   └── tubanPrayerSchedule2026.ts# Data jadwal salat acuan Kemenag Kab. Tuban tahun 2026
│
├── contexts/
│   └── ThemeContext.tsx          # Context pengatur Tema (dark/light), fontSize, showTranslation, showLatin
│
├── utils/                        # Engine komputasi offline & helper
│   ├── prayerTimes.ts            # Kalkulasi waktu salat astronomis real-time + fallback jadwal Tuban
│   ├── locationService.ts        # Geolocation wrapper (GPS native / navigator.geolocation) + default Tuban
│   ├── hijriDate.ts              # Konversi penanggalan Hijriyah
│   ├── pasaranJawa.ts            # Kalkulasi siklus 5 hari pasaran Jawa (Legi, Pahing, Pon, Wage, Kliwon)
│   └── repeatTarget.ts           # Parser target dzikir dari label bacaan (e.g. "7x", "41x", "100x")
│
├── hooks/
│   ├── usePwaInstall.ts          # Hook deteksi dan pemicu instalasi PWA (beforeinstallprompt)
│   └── useFrameworkReady.ts      # Hook inisialisasi framework
│
├── public/                       # Aset publik statis untuk Web/PWA (manifest.json, sw.js, icons)
├── assets/images/                # Aset gambar lokal (icon, favicon, placeholder pesantren)
├── app.json                      # Konfigurasi project Expo, bundle id, PWA output
└── eas.json                      # Konfigurasi build cloud EAS
```

---

## 3. Lokasi Konfigurasi Database & API

1. **Database / Backend**:
   - **Arsitektur**: Aplikasi ini **100% Client-Side Offline-First** (Static Site / Serverless PWA).
   - **Cloud Database**: **TIDAK ADA**. Paket `@supabase/supabase-js` pada `package.json` adalah artefak bawaan starter kit dan **tidak digunakan/tidak ada koneksi aktif**.
   - **Penyimpanan Lokal (Persistence)**: Menggunakan `@react-native-async-storage/async-storage` via [`contexts/ThemeContext.tsx`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/contexts/ThemeContext.tsx).
     - Kunci tersimpan: `theme` (`'light'` | `'dark'`), `fontSize` (number `18-40`), `showTranslation` (boolean), `showLatin` (boolean).

2. **API & Layanan Eksternal**:
   - **API Konten / Kitab**: **Tidak ada**. Seluruh naskah tersimpan lokal di [`constants/*Data.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/constants/).
   - **API Jadwal Salat**: **Tidak memanggil API pihak ketiga**. Waktu salat dikalkulasi langsung di perangkat pengguna secara matematis-astronomis di [`utils/prayerTimes.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/utils/prayerTimes.ts) dengan acuan tabel lokal di [`constants/tubanPrayerSchedule2026.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/constants/tubanPrayerSchedule2026.ts).
   - **API Lokasi**: Menggunakan sensor perangkat lokal melalui [`utils/locationService.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/utils/locationService.ts) (Web Geolocation API atau `expo-location`). Fallback koordinat default terkunci ke Tuban (`lat: -6.8976, lng: 112.0478`).
   - **Konfigurasi Build & Environment**: Seluruh setelan aplikasi dikelola di [`app.json`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/app.json) dan [`eas.json`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/eas.json). Tidak ada file `.env` rahasia yang wajib disediakan untuk menjalankan aplikasi.

---

## 4. Aturan Penting Pengerjaan Revisi (Fast Track Guide)

Gunakan daftar ini agar revisi berikutnya dapat langsung dieksekusi tanpa perlu membaca seluruh berkas:

### A. Integritas Konten Kitab (Aturan Paling Sakral)
- **Dilarang keras mengubah harakat, memotong ayat, atau meringkas teks Arab** di [`constants/yasinData.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/constants/yasinData.ts), [`constants/aurodData.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/constants/aurodData.ts), [`constants/tawassulData.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/constants/tawassulData.ts), maupun [`constants/tahlilData.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/constants/tahlilData.ts) kecuali atas instruksi eksplisit perbaikan naskah dari munjiz/pesantren.
- Semua teks Arab **wajib** menyertakan style `writingDirection: 'rtl'` dan `fontFamily: 'Amiri_400Regular'` (atau `Amiri_700Bold`). Teks terjemahan/Latin **wajib** `writingDirection: 'ltr'`.

### B. Standar Tampilan & Layout Mobile-First
- **AppShell Constraint**:
  - Halaman Beranda (`app/index.tsx`): dibatasi `maxWidth: 480` agar proporsional di tablet/desktop.
  - Halaman Bacaan (`yasin.tsx`, `aurod.tsx`, dll.): dibatasi `maxWidth: 680` agar baris bacaan nyaman dibaca.
- **Lebar Layar Kritis**: Selalu uji kompatibilitas pada viewport sempit **320px - 360px** (mis. iPhone SE / Android compact). Jangan gunakan padding berlebih atau teks uppercase panjang pada strip waktu salat.
- **Konsistensi Tema**: Gunakan token warna dari [`constants/theme.ts`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/constants/theme.ts) melalui `useTheme()`. Jangan menulis hex color acak secara hardcoded di dalam komponen.

### C. Panduan Navigasi Perubahan Cepat (Quick Dispatch)

| Jika Ingin Mengubah... | Langsung Buka File... |
|---|---|
| **Koreksi Teks Wirid / Sisipan Doa / Terjemahan** | `constants/<namaFitur>Data.ts` |
| **Tata Letak / Tampilan Halaman Bacaan** | `app/<namaFitur>.tsx` dan `components/Navbar.tsx` |
| **Slider Ukuran Font / Toggle Latin & Terjemah** | `components/ReadingSettingsModal.tsx` & `contexts/ThemeContext.tsx` |
| **Perilaku Hitungan Dzikir (Tasbih Digital)** | `components/TasbihModal.tsx` & `utils/repeatTarget.ts` |
| **Hero Kubah, Hitung Mundur Salat, Pasaran Jawa** | `components/HeroKubah.tsx`, `utils/prayerTimes.ts`, `utils/pasaranJawa.ts` |
| **Modal Detail Jadwal Salat (8 Waktu)** | `components/PrayerDetailModal.tsx` |
| **Menu Utama Beranda & Profil Pesantren** | `app/index.tsx` |
| **Warna, Spacing, dan Gaya Global** | `constants/theme.ts` |
| **Pengaturan Web PWA (Nama App, Icon, Service Worker)** | `app/+html.tsx`, `public/manifest.json`, `public/sw.js`, `app.json` |

### D. Performa & Pencegahan Bug
- **Timer & Countdown**: Hitung mundur detik hanya boleh dijalankan di komponen leaf ([`components/HeroKubah.tsx`](file:///L:/5.%20PONDOK%20NIDOMIYYYAH/3.%20KASAN/APLIKASI%20AUROD/AUROD%20CODEBASE/aurod/components/HeroKubah.tsx)) dan **wajib** dibersihkan dengan `clearInterval` saat unmount untuk mencegah memory leak.
- **PWA Build Test**: Untuk memvalidasi build web/PWA lokal, jalankan perintah `npm run build:web` atau `npx expo export -p web`.
