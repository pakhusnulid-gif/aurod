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
- `public/icon-192.png` - Icon 192x192px
- `public/icon-512.png` - Icon 512x512px

## PENTING: Cara Deploy yang Benar

**❌ JANGAN deploy folder `public/`!**

**✅ Deploy folder `dist/` setelah build:**

```bash
# 1. Build aplikasi
npm run build:web

# 2. Copy file PWA ke dist
cp public/manifest.json dist/
cp public/sw.js dist/
cp public/icon-192.png dist/
cp public/icon-512.png dist/

# 3. Deploy folder dist/ ke Netlify/Vercel
```

### Setting Netlify:
- Build command: `npm run build:web && cp public/manifest.json public/sw.js public/*.png dist/`
- Publish directory: `dist`

## Testing PWA

1. Build: `npm run build:web`
2. Copy PWA files: `cp public/*.{json,js,png} dist/`
3. Serve: `npx serve dist`
4. Test di Chrome DevTools > Application > Manifest & Service Workers

## Deploy

Deploy folder **`dist/`** (bukan `public/`) ke hosting HTTPS:
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages
- Cloudflare Pages

HTTPS wajib untuk PWA!
