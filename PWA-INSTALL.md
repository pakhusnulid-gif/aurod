# Cara Install Aplikasi PWA di HP

## Untuk Android (Chrome/Edge)

1. Buka website di Chrome atau Edge browser
2. Tekan tombol menu (⋮) di pojok kanan atas
3. Pilih **"Tambahkan ke layar utama"** atau **"Install app"**
4. Tekan **"Install"** atau **"Tambah"**
5. Aplikasi akan muncul di layar HP seperti aplikasi biasa

## Untuk iPhone/iPad (Safari)

1. Buka website di Safari browser
2. Tekan tombol **Share** (ikon kotak dengan panah ke atas)
3. Scroll ke bawah dan pilih **"Add to Home Screen"**
4. Ubah nama jika perlu, lalu tekan **"Add"**
5. Aplikasi akan muncul di home screen

## Fitur PWA

✅ Bisa diinstall seperti aplikasi native
✅ Bisa dibuka offline (setelah pertama kali dibuka)
✅ Tampil fullscreen tanpa address bar
✅ Icon di home screen
✅ Loading lebih cepat dengan caching

## File PWA yang Sudah Dibuat

- `public/manifest.json` - Konfigurasi PWA
- `public/sw.js` - Service Worker untuk offline support
- `public/index.html` - Landing page dengan instruksi install
- `public/icon-192.png` - Icon 192x192px
- `public/icon-512.png` - Icon 512x512px

## Testing PWA

1. Build aplikasi web: `npm run build:web`
2. Serve dari folder dist
3. Buka di browser HP untuk test instalasi
4. Check di Chrome DevTools > Application > Manifest & Service Workers

## Deploy

Deploy folder `public/` ke hosting yang support HTTPS:
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages
- Cloudflare Pages

HTTPS wajib untuk PWA!
