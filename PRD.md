# Product Requirements Document (PRD) - Aurod An-Nidhomiyyah

## 1. Ringkasan Produk
**Aurod An-Nidhomiyyah** adalah aplikasi bacaan ibadah harian dan jadwal salat berbasis mobile-first (Expo React Native + Web PWA) untuk santri, alumni, dan jamaah **Pondok Pesantren An-Nidhomiyyah, Tuban**.

Aplikasi ini menyediakan akses cepat dan offline terhadap bacaan inti pesantren:
- **Yasin Fadhilah** (83 ayat lengkap beserta 5 sisipan doa, sholawat, dan wirid pengulangan)
- **Aurod An-Nidhomiyyah** (Pembukaan, Aurod I-III, Sholawat Fatih, Hailalah Jum'at, Doa, dan Silsilah Sanad)
- **Tawassul** (bacaan hadiah Fatihah khususon sanad Thoriqoh & Muallif)
- **Tahlil** (susunan Majelis Tahlil lengkap hingga doa penutup)
- **Waktu & Kalender Ibadah** (jam lokal, hari + Pasaran Jawa, tanggal Hijriyah, dan jadwal salat Tuban/lokasi perangkat)

## 2. Latar Belakang & Masalah Saat Ini
Berdasarkan audit kode aktual dan perbandingan dengan standar UI aplikasi keagamaan populer seperti **NU Online**:
1. **Tampilan Beranda Terlalu Polos (Plain):** Saat ini beranda hanya menampilkan jam angka besar di latar polos, 5 teks waktu salat tanpa kartu/ikon, dan 4 kartu menu generik. Identitas visual pesantren dan nuansa arsitektur Islami Nusantara belum terasa.
2. **Kurang Efisien di Layar HP Kecil (`320px - 375px`):** Susunan vertikal header, jam, tanggal, dan jadwal salat memakan ~400px tinggi layar sebelum kartu menu muncul, sehingga separuh menu utama terpotong di bawah lipatan layar (*below the fold*) pada layar `360x640` atau `375x667`.
3. **Jadwal Salat Kurang Informatif:** Belum menampilkan hitung mundur (*countdown*) menuju waktu salat berikutnya, belum ada waktu `Imsak`, `Terbit`, dan `Dhuha`, serta belum mendukung layar detail jadwal salat.
4. **Halaman Bacaan Panjang Belum Punya Navigasi Cepat & Penghitung Dzikir:** Yasin Fadhilah (89 blok ayat/sisipan) dan Aurod memiliki instruksi pengulangan (`7x`, `33x`, `41x`, `100x`, `313x`, `500x`, `1000x`), namun belum ada *quick jump* antar bagian atau penghitung tasbih digital.
5. **Kontrol Ukuran Huruf Menutupi Konten:** `FontSizeSlider` yang mengambang permanen di bagian bawah menutup baris terbawah teks Arab selama membaca.

## 3. Target Pengguna & Persona
1. **Santri Muqim & Alumni Pesantren:** Menggunakan HP Android kelas menengah/entry (`360px - 412px`), membaca wirid pagi/petang, malam Jum'at, atau saat safar. Butuh loading instan, mode gelap nyaman di mata saat malam, dan dukungan offline penuh.
2. **Jamaah Majelis & Pengurus Pondok:** Mengikuti pembacaan Yasin Fadhilah, Tahlil, dan Hailalah Jum'at ba'da Ashar bersama-sama. Butuh huruf Arab besar dan jelas, mudah lompat ke bagian doa/sisipan, serta acuan jadwal salat Tuban.

## 4. Ruang Lingkup Produk
### In-Scope (Fokus Utama)
- Pengalaman bacaan kitab/amalan yang autentik, akurat harakatnya, dan bebas gangguan.
- Identitas visual pesantren yang hangat, religius, dan khas Nahdliyin (terinspirasi struktur Hero Kubah + Jadwal Salat ala NU Online).
- Kemampuan offline-first (PWA Service Worker & bundle statis).
- Fitur bantu ibadah ringan: kalkulasi jadwal salat + countdown, kalender Hijriyah + Pasaran Jawa, pengatur ukuran huruf, toggle terjemah/latin, dan penghitung dzikir (tasbih digital).

### Non-Goals (Tidak Termasuk)
- Portal berita umum, artikel opini, atau feed media sosial eksternal.
- Akun login, database cloud user, atau sistem donasi/pembayaran online (tidak memerlukan backend).
- Mengubah atau meringkas teks Arab, doa, maupun silsilah sanad asli di `constants/*Data.ts`.

## 5. Kebutuhan Fungsional (Functional Requirements)

| ID | Fitur | Deskripsi Kebutuhan | Prioritas |
|---|---|---|---|
| **FR-01** | Hero Kubah & Waktu Salat Beranda | Header atas bergaya kubah/arch bernuansa emerald dengan siluet/foto pesantren ber-overlay, menampilkan lokasi, waktu salat berikutnya + *countdown* detik/menit, serta tanggal Masehi, Pasaran Jawa, dan Hijriyah dalam satu kesatuan ringkas. | P0 |
| **FR-02** | Strip & Detail Jadwal Salat | Di beranda tampil 5 waktu salat utama dalam kartu kompak yang aman untuk lebar `320px`. Ketuk kartu/tombol jadwal untuk membuka layar/sheet detail 8 waktu (`Imsak`, `Subuh`, `Terbit`, `Dhuha`, `Dzuhur`, `Ashar`, `Maghrib`, `Isya`) beserta navigasi tanggal. | P1 |
| **FR-03** | Menu Utama Above-the-Fold | 4 menu inti (`Yasin Fadhilah`, `Aurod`, `Tawassul`, `Tahlil`) tertata rapi dan langsung terlihat penuh tanpa perlu scroll di viewport `375x667`. | P0 |
| **FR-04** | Kartu Identitas Pesantren & Pengasuh | Bagian editorial ringkas di bawah menu utama yang menampilkan kartu **Profil & Silsilah Sanad** (foto Pengasuh/Munjiz) dan **Jadwal Rutinan Pesantren** (foto Pondok Pesantren An-Nidhomiyyah, Hailalah Jum'at Ba'da Ashar). | P1 |
| **FR-05** | Toolbar Bacaan Non-Intrusif | Mengganti `FontSizeSlider` yang selalu menempel di bawah menjadi tombol `Aa` di `Navbar` yang membuka popover/sheet pengatur ukuran huruf (`18-40px`) dan opsi tampilan (tampilkan/sembunyikan terjemahan atau latin). | P0 |
| **FR-06** | Navigasi Lompat Bagian (Quick Jump) | Chip horizontal di bawah `Navbar` pada halaman `Yasin Fadhilah` (Ayat 1, Sisipan 1-5, Ayat 38, 58, 81) dan `Aurod` (Pembukaan, Aurod I-III, Hailalah, Sanad) agar santri cepat berpindah bagian. | P1 |
| **FR-07** | Penghitung Dzikir / Tasbih Mini | Ketuk badge pengulangan (`7x`, `33x`, `41x`, `100x`, `313x`, `500x`, `1000x`) untuk membuka/mengaktifkan counter ketuk layar dengan target hitungan otomatis dan tombol reset. | P2 |
| **FR-08** | Dual-Mode Theme & PWA Offline | Toggle mode Terang/Gelap persisten di `AsyncStorage` (serta sinkron dengan `<StatusBar>` dan `<meta name="theme-color">`), dukungan instalasi PWA + cache offline Service Worker. | P0 |

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **Mobile-First:** Layout didesain utama untuk lebar `320px - 430px`. Pada layar tablet/desktop (`>= 768px`), aplikasi menggunakan kontainer terpusat (`maxWidth: 480px` untuk beranda dan `maxWidth: 680px` untuk halaman bacaan) agar proporsi tetap rapi dan tidak meluber ke layar lebar.
- **Aksesibilitas:** Rasio kontras minimal WCAG AA (`>= 4.5:1` teks normal, `>= 3:1` komponen besar), ukuran area sentuh minimal `44x44px`, tidak memblokir zoom pada web viewport, serta pemisahan arah teks eksplisit (`writingDirection: 'rtl'` pada Arab dan `'ltr'` pada Latin/Indonesia).
- **Integritas Konten Kitab:** Seluruh teks Arab, ayat Al-Qur'an, terjemahan doa, dan silsilah sanad di `constants/` harus terjaga 100% sesuai naskah sumber.
- **Performa:** Tidak ada layout shift saat jadwal salat dimuat (`CLS ~ 0`), tidak ada kebocoran interval/listener saat berpindah halaman.

## 7. Kebutuhan Aset dari Pemilik Pesantren
Untuk menghilangkan kesan polos dan memperkuat karakter Islami pesantren, aset berikut perlu disiapkan:
1. **Logo / Lambang Pondok Pesantren An-Nidhomiyyah** (PNG transparan / SVG, minimal `512x512px`).
2. **Foto Gedung / Masjid / Kompleks Pondok Pesantren An-Nidhomiyyah** (landscape `16:9` atau `4:3`, resolusi minimal `1200x800px`, pencahayaan baik untuk backdrop Hero dan kartu Profil Pondok).
3. **Foto Pengasuh / Munjiz (KH. Ahmad Musyaffa' atau Pengasuh Pondok)** (portrait/square `1:1` atau `4:5`, resolusi minimal `600x600px`, untuk kartu Silsilah Sanad & Tentang Pesantren).
4. **Opsional - Foto Suasana Majelis / Rutinan Santri** (landscape `16:9`, resolusi minimal `1200x675px`, untuk kartu Jadwal Hailalah Jum'at & Tahlil).

