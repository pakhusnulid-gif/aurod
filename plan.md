# Implementation Plan & Responsive Audit - Aurod An-Nidhomiyyah

## 1. Status Saat Ini (Baseline)
Perbaikan fondasi dan anti-slop telah diselesaikan dan di-push pada commit `b0440d5`:
- Perbaikan bug kalkulasi jadwal salat (`utils/prayerTimes.ts`) sehingga menghitung waktu astronomis nyata sesuai koordinat dan tanggal (tidak lagi jatuh ke data fallback statis).
- Perbaikan bug Pasaran Jawa dini hari `00:00 - 06:59 WIB` (`utils/pasaranJawa.ts`).
- Perbaikan memory leak `setInterval` di `components/PrayerTimes.tsx` serta guard async di `components/DigitalClock.tsx`.
- Penyeragaman palet warna dual-mode WCAG AA, penghapusan emoji UI dan warna AI-purple `#7c3aed`, perbaikan typo `Aurod An-Nidhomiyyah`, serta penskalaan dinamis `lineHeight` pada halaman bacaan.

---

## 2. Audit Detail Responsivitas Mobile-First (Kondisi Kode Sekarang)

| Area & File | Kondisi Saat Ini | Dampak di Mobile (`320px - 430px`) & Desktop | Solusi Terukur |
|---|---|---|---|
| **Tinggi Fold Beranda** (`app/index.tsx`, `DigitalClock.tsx`, `PrayerTimes.tsx`) | Header (`Amalan Santri`), Jam `56px`, Tanggal, Hijriyah, Lokasi, dan Strip Salat memakan ~`400px` sebelum kartu menu muncul. | Di layar `360x640` atau `375x667` (iPhone SE), baris kedua menu (`Tawassul`, `Tahlil`) terpotong di bawah lipatan layar (*below the fold*). | Gabungkan lokasi, waktu salat berikutnya + countdown, dan kalender ke dalam **Hero Card Kubah** kompak (~`170-190px`), dan rapikan `gridCard` (`minHeight: 112px`) agar seluruh 4 menu tampil penuh tanpa scroll. |
| **Kepadatan Strip 5 Waktu Salat** (`components/PrayerTimes.tsx`) | 5 kolom sejajar di dalam `padding: spacing.lg` (`24px` x 2). Pada lebar `320px`, sisa lebar per kartu hanya ~`51px`. | Kata `MAGHRIB` / `DZUHUR` (`10px` uppercase) berisiko terbungkus 2 baris atau mepet tepi saat `fontScale` sistem > `1.0`. | Gunakan `paddingHorizontal: spacing.md` (`16px`), hilangkan `textTransform: 'uppercase'` pada label panjang atau gunakan Title Case (`Subuh`, `Dzuhur`, `Ashar`, `Maghrib`, `Isya`), dan batasi `maxFontSizeMultiplier={1.2}`. |
| **Judul Navbar di Lebar `320px`** (`components/Navbar.tsx`) | `leftSection` dan `rightSection` mengunci `44px` x 2 + padding `32px`, menyisakan `200px` untuk judul `19px` (`numberOfLines={1}`). | Judul `"Aurod An-Nidhomiyyah"` bisa terpotong `...` pada layar `320px` atau jika pengguna memakai ukuran font sistem besar. | Tambahkan `adjustsFontSizeToFit` / `minimumFontScale={0.85}` pada `title` dan sesuaikan ukuran font responsif. |
| **Ketidaksinkronan `maxWidth` Antar Komponen** (`Navbar.tsx`, `index.tsx`, `FontSizeSlider.tsx`, layar bacaan) | `Navbar` & layar bacaan memakai `720px`, `HomeScreen` & `Footer` memakai `520px`, sedangkan `FontSizeSlider` memakai `480px`. | Di tablet/desktop web (`>= 768px`), batas kanan tombol tema di `Navbar` tidak sejajar dengan tepi kartu beranda, dan area kosong kiri/kanan terasa sangat luas. | Standarisasi **Mobile-First App Shell**: `480px` terpusat untuk beranda (serta `Navbar` beranda) dan `680px` untuk halaman bacaan. |
| **Double Padding di Kotak Sisipan** (`app/yasin.tsx`) | `content` memiliki padding `24px`, dan `sisipanContainer` menambah padding `24px` lagi (`96px` total inset kiri-kanan). | Di ponsel `360px`, teks Arab dalam kotak sisipan hanya menyisakan lebar `264px`, sehingga kalimat cepat terpotong saat ukuran huruf `32-40px`. | Kurangi padding layar bacaan di mobile menjadi `16px` (`spacing.md`) dan padding `sisipanContainer` menjadi `16px` di layar `< 480px`. |
| **Slider Ukuran Huruf Permanen** (`components/FontSizeSlider.tsx`) | Diposisikan `absolute` di bagian bawah layar setiap halaman bacaan. | Menutup ~`84-100px` area bacaan di bawah dan memakan ~`14%` ruang vertikal di HP `640px`. | Pindahkan pemicu ke tombol `Aa` di `Navbar` untuk membuka bottom sheet / popover pengatur huruf. |
| **Arah Bidi Eksplisit (`RTL`/`LTR`)** (`yasin.tsx`, `aurod.tsx`, `tawassul.tsx`, `tahlil.tsx`) | Hanya mengandalkan `textAlign: 'right'` tanpa `writingDirection`. | Tanda kurung dan angka pengulangan Arab (`×٣`, `( ... ) ×١٤`) bisa berbalik posisi pada beberapa versi Android WebView / browser. | Tambahkan `writingDirection: 'rtl'` pada semua style teks Arab dan `writingDirection: 'ltr'` pada teks terjemahan/Latin. |
| **Touch Target Link Footer** (`components/Footer.tsx`) | `<TouchableOpacity>` membungkus teks `11px` tanpa tinggi minimal atau `hitSlop`. | Tinggi area sentuh hanya ~`16px`, di bawah standar minimum aksesibilitas `44x44px`. | Tambahkan `minHeight: 44`, `justifyContent: 'center'`, atau `hitSlop` yang memadai. |
| **Layar Blank Sebelum Font Dimuat** (`app/_layout.tsx`) | `if (!fontsLoaded && !fontError) return null;` memblokir render seluruh UI sampai font selesai dimuat. | Pada koneksi seluler lambat di web PWA, layar tetap kosong sebelum JS/font siap. | Gunakan timeout fallback yang aman untuk splash/font dan siapkan `app/+html.tsx` untuk metadata dasar (`lang="id"`, `<title>`, link manifest). |

---

## 3. Rencana Pengembangan Bertahap

### Fase 1: Perbaikan Responsivitas Mobile-First & Aksesibilitas
1. Seragamkan `maxWidth` shell (`480px` beranda, `680px` bacaan) dan gunakan padding horizontal `16px` di mobile (`useWindowDimensions()`).
2. Rapikan `Navbar` (`minimumFontScale`, tombol `Aa` untuk layar bacaan) dan pindahkan `FontSizeSlider` menjadi modal/sheet yang dipanggil tombol `Aa`.
3. Perbaiki `PrayerTimes` label agar aman di `320px`, tambahkan `writingDirection: 'rtl'` / `'ltr'` di seluruh halaman bacaan, dan perbesar touch target tautan `Footer` ke `>= 44px`.

### Fase 2: Redesign UI ala NU Online & Integrasi Aset Pesantren
1. Tambahkan **Hero Kubah Emerald** di `app/index.tsx` memakai foto pesantren ber-overlay gradasi emerald, logo pesantren, lokasi, dan **Countdown Waktu Salat Berikutnya** (update tiap detik hanya di komponen countdown).
2. Tambahkan kalkulasi `imsak` (`Subuh - 10 menit`) dan `dhuha` (`Terbit + 28 menit` / ketinggian matahari 4.5°) di `utils/prayerTimes.ts`, lalu buat modal/halaman **Detail Jadwal Salat (8 waktu)** dengan navigasi tanggal.
3. Tambahkan bagian **Pesantren & Sanad** di beranda yang menampilkan foto Pengasuh/Munjiz (mengarah ke Silsilah Sanad) serta foto Pondok Pesantren An-Nidhomiyyah (info rutinan Hailalah Jum'at).

### Fase 3: Peningkatan Pengalaman Bacaan Santri
1. Tambahkan **Quick Jump Chips** (navigasi bagian horizontal) pada `Yasin Fadhilah` dan `Aurod`.
2. Tambahkan **Tasbih Dzikir Mini** yang muncul saat mengetuk badge pengulangan (`7x`, `33x`, `41x`, `100x`, `313x`, `500x`, `1000x`).
3. Tambahkan switch tampilan `Tampilkan Terjemahan / Latin` yang tersimpan di `ThemeContext`.

### Fase 4: Kebersihan Teknis & Pengujian Lintas Ukuran Layar
1. Tambahkan `app/+html.tsx` agar HTML statis PWA membawa `<html lang="id">`, `<title>Aurod An-Nidhomiyyah</title>`, dan `<link rel="manifest">`.
2. Audit dan hapus file/dependency yang tidak terpakai (`app/index.web.css`, serta evaluasi penghapusan `@supabase/supabase-js`, `@lucide/lab`, `expo-camera`, `react-native-webview` dari `package.json`).
3. Uji visual menyeluruh pada viewport `320x568`, `360x640`, `375x812`, `430x932`, `768x1024`, dan `1280x800` dalam mode terang & gelap serta mode offline PWA.

---

## 4. Aset yang Perlu Disiapkan Pemilik Proyek
- `assets/images/logo-pesantren.png` - Logo Pondok Pesantren An-Nidhomiyyah (PNG transparan, min `512x512px`).
- `assets/images/pesantren-hero.jpg` - Foto gedung/masjid Pondok Pesantren An-Nidhomiyyah (landscape `16:9` / `4:3`, min `1200x800px`, dioptimasi `< 250 KB` WebP/JPG).
- `assets/images/pengasuh.jpg` - Foto Pengasuh / Munjiz untuk kartu Silsilah Sanad (rasio `1:1` atau `4:5`, min `600x600px`, `< 150 KB`).
- `assets/images/majelis-rutinan.jpg` *(opsional)* - Foto kegiatan majelis/santri untuk kartu Jadwal Hailalah Jum'at (`16:9`, `< 200 KB`).

