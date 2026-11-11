# Design System - Aurod An-Nidhomiyyah

## 1. Filosofi Visual
Sistem desain **Aurod An-Nidhomiyyah** menggabungkan kesederhanaan bacaan kitab yang tenang (*calm reading utility*) dengan kehangatan identitas pesantren Nahdliyin (terinspirasi struktur visual aplikasi **NU Online**):
- **Khidmat & Mudah Dibaca:** Teks Arab menggunakan huruf `Amiri` dengan ruang vertikal lega (`1.85x`) agar harakat tidak bertabrakan.
- **Bernuansa Arsitektur Islami:** Menggunakan lengkung kubah/arch lembut pada Hero beranda dan pola garis tepi halus sebagai aksen, bukan dekorasi berlebihan yang mengganggu konsentrasi dzikir.
- **Mobile-First Sejati:** Semua metrik jarak, ukuran tombol, dan tipografi dikalibrasi untuk penggunaan satu tangan di layar `360px - 430px`.

## 2. Token Warna (`constants/theme.ts`)

### Mode Terang (Light Mode - Default Siang)
| Token | Hex | Peran & Rasio Kontras |
|---|---|---|
| `background` | `#F8FAF9` | Latar utama halaman (off-white lembut, menghindari silau `#FFFFFF`) |
| `surface` | `#ECFDF5` | Permukaan navbar, highlight lembut |
| `card` | `#FCFDFC` | Permukaan kartu menu & kontainer |
| `primary` | `#047857` | Warna utama merek (Emerald pesantren), rasio `5.23:1` di atas `#F8FAF9` |
| `primaryDark` | `#065F46` | Gradasi akhir Hero kubah & state aktif |
| `onPrimary` | `#F8FAF9` | Teks/ikon di atas `primary` (`5.23:1`) |
| `text` | `#1E293B` | Teks utama Arab & judul (`13.96:1` di atas `#F8FAF9`) |
| `textSecondary` | `#475569` | Subjudul, metadata, arti bacaan (`7.23:1` di atas `#F8FAF9`) |
| `border` | `#D1DBD6` | Garis pemisah tipis & tepi kartu |
| `shadow` | `#064E3B` | Bayangan bernuansa emerald (bukan `#000000`) |
| `accentGold` *(rencana Fase 2)* | `#B45309` | Aksen halus garis lengkung kubah / penanda waktu salat aktif |

### Mode Gelap (Dark Mode - Nyaman Malam/Subuh)
| Token | Hex | Peran & Rasio Kontras |
|---|---|---|
| `background` | `#0F172A` | Latar utama gelap (deep slate) |
| `surface` | `#1E293B` | Permukaan navbar & kartu sekunder |
| `card` | `#1E293B` | Permukaan kartu |
| `primary` | `#34D399` | Emerald terang untuk teks/ikon aktif (`9.29:1` di atas `#0F172A`) |
| `primaryDark` | `#10B981` | Aksen tombol & highlight |
| `onPrimary` | `#062E22` | Teks gelap kontras tinggi di atas tombol/pill `primary` |
| `text` | `#F1F5F9` | Teks utama (`16.30:1` di atas `#0F172A`) |
| `textSecondary` | `#94A3B8` | Teks sekunder (`6.96:1` di atas `#0F172A`) |
| `border` | `#334155` | Garis batas lembut antar kartu |
| `shadow` | `#020617` | Bayangan gelap |

### Token Semantik Callout & Badge (Dual-Mode)
- **Callout Sisipan / Catatan:** Light (`#ECFDF5` / border `#10B981` / teks `#065F46`), Dark (`#064E3B` / border `#10B981` / teks `#A7F3D0`).
- **Badge Pengulangan (Success):** Light (`#ECFDF5` / `#6EE7B7` / `#065F46`), Dark (`#022C22` / `#059669` / `#6EE7B7`).
- **Badge Instruksi (Warning):** Light (`#FEF3C7` / `#F59E0B` / `#92400E`), Dark (`#451A03` / `#D97706` / `#FDE68A`).
- **Badge Wirid (Info):** Light (`#EFF6FF` / `#93C5FD` / `#1E40AF`), Dark (`#172554` / `#3B82F6` / `#BFDBFE`).
- **Badge Parsial (Neutral):** Light (`#F1F5F9` / `#CBD5E1` / `#334155`), Dark (`#1E293B` / `#475569` / `#CBD5E1`).
- **Hero Overlay Scrim *(rencana Fase 2)*:** Gradasi `rgba(4, 120, 87, 0.88)` ke `rgba(6, 95, 70, 0.94)` di atas foto pesantren agar teks putih `#F8FAF9` selalu terbaca jelas tanpa bergantung pada kecerahan foto.

## 3. Tipografi & Arah Teks (Bidi/RTL)

### Font Family
- **Arab:** `Amiri-Regular` (isi ayat/doa), `Amiri-Bold` (judul surat, basmalah, judul header).
- **UI & Terjemahan Latin:** System sans-serif default (`San Francisco` di iOS, `Roboto` di Android, sistem sans di web).

### Aturan Skala & Line Height
- **Ukuran Huruf Bacaan (User-Controlled):** `18px - 40px` (default `24px`, disimpan di `AsyncStorage`).
- **Teks Arab Utama:** `fontSize = base + 4` (Yasin/Aurod) atau `base` (Tawassul/Tahlil), `lineHeight = Math.round(size * 1.85)`, wajib `writingDirection: 'rtl'` dan `textAlign: 'right'`.
- **Teks Latin / Catatan:** `fontSize = Math.max(15, base - 2)`, `lineHeight = Math.round(size * 1.55)`, `writingDirection: 'ltr'`.
- **Teks Terjemahan / Arti:** `fontSize = Math.max(14, base - 4)`, `lineHeight = Math.round(size * 1.55)`, `writingDirection: 'ltr'`.
- **Angka Dinamis (Jam, Countdown, Jadwal Salat, Nomor Ayat, Tasbih):** Wajib memakai `fontVariant: ['tabular-nums']` agar angka tidak bergeser lebarnya saat detik/menit berubah.
- **Proteksi Font Scaling OS:** Elemen UI sempit seperti label jadwal salat (`10-11px`) dan badge footer memakai batas `maxFontSizeMultiplier={1.25}` agar tidak terpotong di layar `320px`.

## 4. Spasi, Sudut & Grid Responsif (Mobile-First)

### Skala Spasi (`spacing`)
- `xs: 4`, `sm: 8`, `md: 16`, `lg: 24`, `xl: 32`, `xxl: 48` (berbasis kelipatan `4px`).

### Skala Sudut (`borderRadius`)
- `sm: 8` (pill kecil / kartu waktu salat)
- `md: 12` (badge instruksi, tombol, modal pill)
- `lg: 16` (kartu menu, kartu sisipan, floating panel, kartu foto pesantren)
- `xl: 20` (lengkungan bawah Hero Kubah / sheet modal)
- `full: 9999` (badge nomor ayat, lingkaran ikon, tombol tasbih)

### Breakpoint & Perilaku Kontainer
| Tier Layar | Lebar Viewport | Padding Horizontal Utama | Perilaku Shell & Grid |
|---|---|---|---|
| **Compact Phone** | `320px - 374px` | `16px` (`spacing.md`) | Kolom tunggal penuh. Kartu jadwal salat memakai strip kompak atau 5 pill tanpa tepi berlebih. Padding dalam kotak sisipan `16px`. |
| **Standard Phone** | `375px - 479px` | `16px - 20px` | Kolom tunggal penuh. Grid menu `2x2` (atau `4` shortcut ringkas + 2 kartu info pesantren). Seluruh menu utama muat di atas lipatan layar. |
| **Phablet / Large Phone** | `480px - 767px` | `20px - 24px` | Kontainer beranda terpusat maksimal `480px`, bacaan maksimal `640px`. |
| **Tablet / Desktop Web** | `>= 768px` | `24px` | **Mobile-First App Shell:** Beranda terpusat dalam frame `maxWidth: 480px` (atau `520px` dengan border/elevasi halus di atas latar netral luar shell), dan halaman bacaan terpusat `maxWidth: 680px`. `Navbar`, konten, dan kontrol mengambang memakai lebar selaras agar tidak ada ikon terlempar ke tepi layar `1440px`. |

## 5. Ikonografi, Aset & Interaksi
- **Ikon:** Menggunakan satu keluarga `lucide-react-native` (`strokeWidth` seragam `1.75` untuk UI, `2.0` untuk ikon navigasi). Dilarang menggunakan emoji Unicode di komponen UI yang terlihat pengguna.
- **Touch Target:** Seluruh elemen interaktif (tombol navbar, kartu menu, tautan footer, chip navigasi ayat, tombol tasbih) wajib memiliki area sentuh minimal `44x44px` (via dimensi eksplisit atau `hitSlop`).
- **Safe Area:** Header atas dan kontrol bawah wajib memakai `useSafeAreaInsets()` agar tidak bertabrakan dengan notch/Dynamic Island atau gesture bar bawah HP.
- **Motion:** Halus dan bermakna (`MOTION_INTENSITY: 3`), fokus pada umpan balik sentuh (`activeOpacity: 0.75`), transisi drawer/sheet pengatur huruf, dan progres ring tasbih. Menghormati `prefers-reduced-motion`.

