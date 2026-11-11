# Wireframes - Aurod An-Nidhomiyyah (Mobile-First)

Dokumen ini memetakan tata letak antarmuka **target redesign** (terinspirasi struktur visual **NU Online** yang hangat dan fungsional) untuk layar ponsel (`360x640` hingga `430x932`) serta adaptasinya di desktop web (`>= 768px`).

---

## 1. Beranda (Home Screen)

### A. Tampilan Mobile (`360px - 430px`) - Prioritas Above the Fold
Target: Jam/Next Prayer, Lokasi, Strip Jadwal Salat, dan seluruh 4 Menu Utama terlihat langsung saat aplikasi dibuka tanpa harus scroll.

```text
+--------------------------------------+
|  [Logo] Aurod An-Nidhomiyyah   [Sun] |  <- Compact Navbar (56px + safeAreaTop)
+--------------------------------------+
|  /================================\  |  <- Hero Kubah Emerald + Foto Pesantren
|  |  [Pin] Tuban, Jawa Timur       |  |     (Overlay gradasi emerald #047857->#065F46)
|  |                                |  |
|  |  Menuju Ashar                  |  |
|  |  14:36 WIB                     |  |  <- Jam / Waktu Salat Berikutnya (32px Bold)
|  |  -02:18:10                     |  |  <- Countdown real-time (tabular-nums)
|  |                                |  |
|  |  Rabu Pahing, 11 November 2026 |  |  <- Kalender Masehi + Pasaran Jawa
|  |  2 Jumadil Akhir 1448 H        |  |  <- Kalender Hijriyah
|  \______/                  \______/  |  <- Lengkung Kubah / Arch lembut
+--------------------------------------+
| +----------------------------------+ |
| | Subuh  Dzuhur [Ashar] Maghrib Isya| |  <- Card Strip Jadwal Salat (tap -> Detail)
| | 03:42  11:16  14:36   17:28  18:41| |     Padding dalam hemat agar muat di 320px
| |              Lihat 8 waktu >     | |
| +----------------------------------+ |
|                                      |
|  AMALAN UTAMA                        |
|  +----------------+ +--------------+ |
|  | (Icon)         | | (Icon)       | |  <- Grid 2x2 Kompak (height ~112px/card)
|  | Yasin Fadhilah | | Aurod        | |     Terlihat penuh di 360x640 & 375x667!
|  | 83 Ayat & Doa  | | Wirid Harian | |
|  +----------------+ +--------------+ |
|  +----------------+ +--------------+ |
|  | (Icon)         | | (Icon)       | |
|  | Tawassul       | | Tahlil       | |
|  | Kirimkan Doa   | | Majelis Doa  | |
|  +----------------+ +--------------+ |
|                                      |
|  PESANTREN & SANAD                   |  <- Bagian Editorial ala NU Online Headline
|  +----------------------------------+ |
|  | [Foto]  Silsilah Sanad Aurod     | |  <- Thumbnail foto Pengasuh (64x64px)
|  |  64x64  KH. Ahmad Musyaffa' >    | |     Tap -> langsung ke bagian Sanad
|  +----------------------------------+ |
|  +----------------------------------+ |
|  | [Foto]  Ponpes An-Nidhomiyyah    | |  <- Thumbnail foto Pondok (64x64px)
|  |  64x64  Hailalah Jum'at Ba'da Ashar| |   Info rutinan & profil singkat
|  +----------------------------------+ |
|                                      |
|  ----------------------------------  |
|        Aurod An-Nidhomiyyah         |
|  Pondok Pesantren An-Nidhomiyyah     |
|     Dikembangkan oleh pakhusnul.id   |  <- Touch target >= 44px
+--------------------------------------+
```

### B. Adaptasi Desktop Web (`>= 768px`)
Di desktop, aplikasi tidak lagi menyebar elemen ke pinggir layar `1440px`, melainkan memakai **Mobile-First App Frame** terpusat:

```text
+-----------------------------------------------------------------------+
|                    (Latar luar netral lembut)                         |
|               +---------------------------------------+               |
|               |  [Logo] Aurod An-Nidhomiyyah   [Sun]  |               |
|               |=======================================|               |
|               |        Hero Kubah + Jadwal Salat      |               |
|               |        Grid 2x2 Menu Amalan         |               |
|               |        Kartu Pesantren & Sanad      |               |
|               |        Footer                       |               |
|               +---------------------------------------+               |
|                      maxWidth: 480px - 520px                          |
+-----------------------------------------------------------------------+
```

---

## 2. Detail Jadwal Salat (Bottom Sheet / Modal Screen - Gaya NU Online)

Terbuka saat mengetuk Hero Card atau tombol `"Lihat 8 waktu >"` di beranda.

```text
+--------------------------------------+
|  [X]   Jadwal Salat Tuban     [Kiblat]| <- Opsional / Lokasi info
+--------------------------------------+
|  /================================\  |
|  |  Tuban, Jawa Timur             |  |
|  |  Menuju Ashar 14:36 WIB        |  |
|  |  -02:18:10                     |  |
|  \================================/  |
|                                      |
|  +----------------------------------+ |
|  |  <   11 November 2026 M      >   | | <- Navigasi tanggal harian
|  |      2 Jumadil Akhir 1448 H      | |
|  +----------------------------------+ |
|                                      |
|  [Moon]  Imsak                 03:32 |
|  [Moon]  Subuh                 03:42 |
|  [Sun]   Terbit                05:04 |
|  [Sun]   Dhuha                 05:32 |
|  [Sun]   Dzuhur                11:16 |
| +----------------------------------+ |
| | [Sun]  Ashar (Berikutnya)   14:36| | <- Highlight kartu emerald lembut
| +----------------------------------+ |
|  [Sun]   Maghrib               17:28 |
|  [Moon]  Isya                  18:41 |
+--------------------------------------+
```

---

## 3. Halaman Bacaan (Yasin Fadhilah, Aurod, Tawassul, Tahlil)

### A. Tata Letak Mobile (`360px - 430px`)
Perubahan utama dari kondisi saat ini:
1. Padding horizontal halaman dikurangi dari `24px` ke `16px` agar teks Arab lebih lega.
2. `FontSizeSlider` tidak lagi menempel permanen menutup bagian bawah teks, diganti tombol `Aa` di Navbar yang membuka panel pengatur huruf + opsi tampilkan/sembunyikan terjemahan.
3. Bar chip horizontal di bawah Navbar (khusus `Yasin` & `Aurod`) untuk lompat cepat antar bagian.

```text
+--------------------------------------+
| [<]    Yasin Fadhilah    [Aa] [Moon] |  <- Navbar + tombol Pengaturan Baca [Aa]
+--------------------------------------+
| [Ayat 1] [Sisipan 1] [Ayat 38] [58] >|  <- Horizontal Scroll Chip (tinggi 44px)
+--------------------------------------+
|                يس                    |  <- Header Surat (Arab RTL)
|      Surat Yasin dengan Fadhilah     |
|   بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ    |
|                                      |
|  (9)                                 |  <- Badge nomor ayat (tabular-nums)
|  وَجَعَلْنَا مِنۢ بَيْنِ أَيْدِيهِمْ سَدًّا...  |  <- Teks Arab RTL, lineHeight 1.85x
|                                      |
|  +--------------------------------+  |
|  | [Repeat] Diulang 7x  | [Tasbih]|  |  <- Ketuk untuk buka Tasbih Counter 0/7
|  +--------------------------------+  |
|                                      |
|  +--------------------------------+  |  <- Kartu Sisipan (padding 16px, bukan 24px)
|  | [Down] Setelah Ayat 9          |  |
|  | Doa Nurul Sirri & Sholawat     |  |
|  | [Dibaca 3x]          [0/3]     |  |
|  | ...teks Arab...                |  |
|  | ...terjemahan Indonesia...     |  |
|  +--------------------------------+  |
|                                      |
|  (Teks bacaan penuh hingga ke bawah  |
|   tanpa terhalang slider permanen!)  |
+--------------------------------------+
```

### B. Popover / Bottom Sheet Kontrol Baca (`[Aa]` Ditekan)
```text
+--------------------------------------+
|  Pengaturan Bacaan               [X] |
|  Ukuran Huruf Arab & Latin           |
|  [A-]  ---------o---------  [A+] 26  |  <- Slider + tombol step +/- (44x44px)
|                                      |
|  Tampilkan Terjemahan / Arti   [ON]  |  <- Switch opsional
|  Tampilkan Teks Latin (Aurod)  [ON]  |  <- Switch opsional
+--------------------------------------+
```

### C. Widget Tasbih Mini (Muncul Hanya Saat Dipanggil dari Badge Pengulangan)
```text
+--------------------------------------+
|  Tasbih Dzikir (Ayat 58)   Target 313|
|     [ 042 / 313 ]      [Reset] [X]   |  <- Area ketuk besar (>= 56px) + haptic
+--------------------------------------+
```

---

## 4. Matriks Perilaku Responsif per Breakpoint

| Elemen | `320px - 374px` (Compact) | `375px - 479px` (Standard Mobile) | `>= 768px` (Tablet / Desktop) |
|---|---|---|---|
| **Container Shell** | Full width (`paddingHorizontal: 16`) | Full width (`paddingHorizontal: 16-20`) | Beranda `maxWidth: 480px`, Bacaan `maxWidth: 680px`, rata tengah |
| **Navbar Title** | `17-18px`, `minimumFontScale={0.85}` agar tidak terpotong | `19px` normal | `19px`, kontainer mengikuti lebar shell |
| **Strip 5 Waktu Salat** | Label ringkas (`Subuh`, `Dzuhur`, `Ashar`, `Maghrib`, `Isya`), padding `4px` | 5 kolom sejajar rapi dengan jarak `6px` | 5 kolom sejajar di dalam kartu `480px` |
| **Grid Menu Utama** | 2 kolom x 2 baris (`minHeight: 112px`) | 2 kolom x 2 baris (`minHeight: 120px`) | 2 kolom x 2 baris terpusat di shell `480px` |
| **Kotak Sisipan (Yasin)** | Margin vertikal `16px`, padding `16px` | Padding `16px - 20px` | Padding `24px`, lebar bacaan `<= 680px` |
| **Kontrol Ukuran Huruf** | Sheet/popover `Aa` dari Navbar | Sheet/popover `Aa` dari Navbar | Popover rapi sejajar kanan atas shell |

