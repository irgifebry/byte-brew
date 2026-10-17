# BYTE//BREW — Coffee Shop Website

> **Theme:** Startup agency / Gen-Z builder culture
> **Tagline:** `LOW-LEVEL SYSTEMS. HIGH CAFFEINE.`
> **Stack:** Next.js (App Router) + Tailwind CSS
> **Status:** Disetujui, siap implementasi
> **Hero footage:** `footage_hero.mp4` — dokumenter asli kedai BYTE//BREW

---

## 1. Keputusan Desain

| Aspek | Pilihan |
|---|---|
| Nama | **BYTE//BREW** |
| Tagline | Low-level systems. High caffeine. |
| Copywriting | English tech (`we ship caffeine, not code`) |
| Palet | Dark `#0A0A0A` + neon lime `#C6F24E` |
| Struktur | Multi-page |
| Data menu | Fiktif (harga realistis 15k–45k) |
| Gambar | Unsplash eksternal + CSS gradient fallback |
| Interaksi khas | Brutalis retro confirm dialog |
| Framework | Next.js App Router + Tailwind CSS |

### Nama & Alternatif yang Pertimbangkan

| # | Nama | Tagline | Alasan |
|---|---|---|---|
| 1 | **BYTE//BREW** ✅ | Low-level, high caffeine | Vibe agency-tech paling kuat,Fsalate untuk logo pixel/mono |
| 2 | Bootstrap Brew | Ship your day, one cup at a time. | Kuat secara startup, mudah diingat |
| 3 | Sprint Latte | Finish fast. Sip slow. | Playful, sangat Gen-Z |
| 4 | Steep & Ship | Brew it. Ship it. | Anti-mainstream, rebellious |
| 5 | Kopi Pivot | Change the blend, not the grind. | Bagus untuk menu seasonal |
| 6 | Kopi MVP | Minimum blend, maximum impact. | Lucu, pendek untuk logo |

---

## 2. Struktur File

```
Website Coffee Shop/
├── footage_hero.mp4            # aset existing → dipakai di hero
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.js
├── jsconfig.json
├── public/
│   ├── footage_hero.mp4        # dipindah dari root
│   ├── hero-poster.jpg         # frame t=1s dari video
│   ├── still-beans.jpg         # frame t=1s → section manifesto
│   ├── still-tamping.jpg       # frame t=4s → about
│   └── still-pour.jpg          # frame t=7s → about/gallery
├── src/
│   ├── app/
│   │   ├── layout.jsx              # <head>, font loader, Navbar + Footer
│   │   ├── globals.css             # tokens, grain texture, marquee keyframes
│   │   ├── page.jsx                # HOME
│   │   ├── menu/page.jsx           # MENU
│   │   ├── about/page.jsx          # ABOUT / SPACE
│   │   └── contact/page.jsx        # KONTAK + maps
│   ├── components/
│   │   ├── Navbar.jsx              # sticky, blur on scroll, mobile drawer
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx                # video bg + headline + CTAs
│   │   ├── Ticker.jsx              # marquee infinite
│   │   ├── Manifesto.jsx
│   │   ├── MenuCard.jsx            # produk + harga
│   │   ├── SpaceGallery.jsx
│   │   ├── Testimonials.jsx
│   │   ├── RetroDialog.jsx         # confirm dialog brutalist
│   │   └── Reveal.jsx              # scroll reveal (IntersectionObserver)
│   └── data/
│       └── menu.js                 # 11 item fiktif, 3 kategori
```

---

## 3. Isi Tiap Halaman

### `/` — Home

| # | Section | Detail |
|---|---|---|
| 1 | **Hero** | `footage_hero.mp4` loop muted autoplay (dokumenter kedai), overlay gradient + vignette, headline `LOW-LEVEL SYSTEMS. HIGH CAFFEINE.`, subcopy, CTA `view menu` / `book a table` |
| 2 | **Ticker** | Marquee infinite: `SPECIALTY GRIND ☕ SHIP DAILY ☕ OPEN LATE ☕` |
| 3 | **Manifesto** | "We don't run a café. We ship caffeine." + stat counter (48K cups, 4.9★, 3 yrs, 12 blends) + still frame dari footage |
| 4 | **Featured menu** | 4 kartu produk |
| 5 | **Space gallery** | 4 foto Unsplash + caption |
| 6 | **Testimoni** | 3 quote pendek |
| 7 | **CTA banner** | "your next sprint starts here" |

### `/menu`

- 3 kategori: **Signature** / **Cold Brew** / **Not-Coffee**
- 11 item fiktif lengkap dengan harga
- Tombol `add to cart` (visual only) + `reserve`

### `/about`

- Story Bytes & Brew
- **VALUES** — 3 kartu: `No shortcuts` / `Ship fresh` / `Build community`
- Galeri space — still frame dari footage kedai (tamping espresso, pour latte)

### `/contact`

- Alamat fiktif (Jakarta)
- Jam buka
- Peta OpenStreetMap embed (Google Maps `output=embed` diblokir framing) + CSS filter tema gelap
- Form (nama / email / date) yang memicu **RetroDialog**

---

## 4. Design System

### Warna

| Token | Hex | Pakai |
|---|---|---|
| `bg-void` | `#0A0A0A` | Background utama |
| `bg-panel` | `#111110` | Kartu / section |
| `fg-cream` | `#F5F5F0` | Teks utama |
| `accent-lime` | `#C6F24E` | Aksen, CTA, highlight |
| `accent-dim` | `#7A8F2E` | Aksen redup |
| `border` | `#262626` | Border tipis |

### Tipografi

| Font | Peran |
|---|---|
| **Space Grotesk** (700) | Heading — geometric, techy |
| **JetBrains Mono** | Label, eyebrow, angka |
| **Inter** | Body text |

### Motif Visual

- Grain overlay (SVG noise overlay)
- Hard border `1px solid #262626`
- Offset shadow `4px 4px 0 #C6F24E`
- Terminal cursor blink
- Corner brackets `//`
- Nomor besar sebagai elemen visual

### Motion

- Marquee infinite
- Scroll reveal (fade + slide)
- Hover lift
- Counter animasi
- Cursor glow

### Responsive

- Mobile-first
- Breakpoint: `md` / `lg`

---

## 5. Aset

| Aset | Sumber | Catatan |
|---|---|---|
| **Hero video** | **`footage_hero.mp4` — dokumenter asli kedai** | Taruh di `public/`, autoplay muted loop |
| Poster frame | Frame `t=1s` dari hero video | Cegah black flash saat load |
| Foto produk | Unsplash `images.unsplash.com` | `<img>` biasa + gradient fallback, 11 foto unik (sudah diverifikasi visual per item) |
| Foto space | Unsplash | idem |
| Grain texture | Inline SVG | Dibuat di CSS, tanpa file |

> Pakai `<img>` langsung (bukan `next/image`) supaya tidak perlu konfigurasi domain remote.

### 5.1 `footage_hero.mp4` — Footage Kedai

**Spesifikasi teknis:**

| Properti | Nilai |
|---|---|
| Resolusi | 1280 × 720 (16:9) |
| Durasi | 10.0 detik |
| Frame rate | 24 fps |
| Video codec | H.264 |
| Audio codec | AAC (di-mute saat playback) |
| Ukuran | 3.1 MB |
| Bitrate | ~2.5 Mbps |

**Isi visual — 3 shot berurutan:**

| Waktu | Shot | Deskripsi | Peran desain |
|---|---|---|---|
| `0:00 – 0:03` | **Biji jatuh** | Biji kopi jatuh slow-motion, backlit, sangat gelap, debu melayang | Shot pembuka — area gelap luas, **ideal untuk teks headline** |
| `0:03 – 0:07` | **Tamping espresso** | Tangan barista tamping di portafilter mesin espresso, bokeh kedai hangat di belakang | Shot humanoid — rasa manusa & proses |
| `0:07 – 0:10` | **Pour latte art** | Top-down, susu dituang membentuk latte art di cangkir, meja kayu | Shot payoff — detail produk, palet cream/kayu |

**Konsekuensi ke desain hero:**

1. **Kecerahan** — Video ini *gelap-dominan*. Lime `#C6F24E` dan teks cream kontras kuat tanpa overlay tebal.
2. **Overlay** — Gradient vertikal `rgba(10,10,10,0.55)` → `rgba(10,10,10,0.85)` + vignette. **Bukan** black solid, supaya detail kopi tetap terlihat.
3. **Posisi teks** — Shot pertama paling gelap. Headline di **kiri-tengah** dengan drop shadow minimal.
4. **Object-fit** — `object-cover` + `object-position: center` (16:9 vs mobile portrait akan ter-crop di tengah).
5. **Audio** — Wajib `muted` + `playsInline` agar autoplay tidak diblokir browser mobile.
6. **Poster** — Frame `t=1s` dipakai sebagai `poster` agar tidak ada black flash sebelum video siap.
7. **Reduced motion** — Hormati `prefers-reduced-motion`: video tidak auto-loop, tampil poster statis.
8. **Penggunaan ulang** — Shot yang sama dipotong jadi still frame untuk section **Manifesto** dan **About** (konsistensi visual antar section).

> Karena ini footage asli kedai, halaman **About** memakai frame-nya sebagai bukti "ini tempat kami, bukan mockup".

---

## 6. Data Menu Fiktif (draft)

### Signature
| Item | Deskripsi | Harga |
|---|---|---|
| `NULL//POUR` | Single origin, dark chocolate finish | 28k |
| `BYTE ESPRESSO` | Double shot, no compromise | 22k |
| `FLAT WHITE v2` | Microfoam, 180ml, tight pour | 32k |
| `FUNCTION CURLING` | Cortado, oat milk | 30k |

### Cold Brew
| Item | Deskripsi | Harga |
|---|---|---|
| `STATIC BREW` | 18-hour steep, nitro finish | 35k |
| `CACHE HIT` | Cold brew + vanilla, iced | 38k |
| `MERGE CONFLICT` | Cold brew + orange peel | 40k |

### Not-Coffee
| Item | Deskripsi | Harga |
|---|---|---|
| `RENDER MATCHA` | Ceremonial grade, oat milk | 38k |
| `DEBUG COCOA` | 70% dark, sea salt | 34k |
| `PLACEHOLDER TEA` | Jasmine green, yuzu | 30k |
| `HALF-LOAD CHAI` | Cardamom, house masala | 36k |

> Struktur final disimpan di `src/data/menu.js` supaya gampang diganti.

---

## 7. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| `npm install` gagal (tidak ada internet) | Fallback ke HTML statis |
| Unsplash rate-limit / offline | Gradient fallback + `onError` handler |
| Font Google tidak termuat | `next/font` self-host (build-time download) |
| Data menu masih fiktif | Terpusat di satu file, gampang di-update |

---

## 7.1 Keputusan Teknis Saat Implementasi

| Topik | Awalnya direncanakan | Jadi | Alasan |
|---|---|---|---|
| Peta | Google Maps embed | **OpenStreetMap** + CSS filter gelap | `output=embed` Google membalas **301** + `X-Frame-Options`, jadi iframe selalu kosong di browser |
| Scroll reveal | `opacity:0` langsung |-scoped ke `html.js` + safety timer | Kalau JS gagal, konten akan terkunci tak terlihat. Sekarang fail-safe |
| Foto menu | 12 ID Unsplash tebakan | 11 ID **sudah dicek satu per satu** | 6 dari 12 tebakan awal **tidak cocok** dengan produknya (mis. chai dapat paper cup di background kuning) |
| Hero video | andalkan event `canplay` | cek `readyState` + listener | `canplay` bisa memicu sebelum hydration → handler terlewat → hero hitam selamanya |

### Bug yang ditemukan & diperbaiki saat verifikasi

1. **Hero video tak terlihat di halaman kosong** — `canplay` memicu sebelum React hydration, jadi state `loaded` tak pernah true dan video `opacity: 0`. User dengan cache panas akan melihat hero hitam selamanya.
2. **Video tak terlihat di mobile** — vignette `radial-gradient` di viewport portrait menutup hampir seluruh frame. Sekarang vignette hanya di layar `md+`.
3. **Google Maps kosong** — lihat tabel di atas.
4. **Hydration mismatch** — inline script `classList.add('js')` vs `<html>` hasil SSR. Diperbaiki dengan `suppressHydrationWarning`.
5. **Foto produk tidak cocok** — 6 item salah, termasuk 3 item yang share 1 foto. Semua diganti & diverifikasi ulang.
6. **Label gallery tidak cocok** — "The long bench" memakai foto tanaman/jendela.

## 8. Checklist Implementasi

- [x] Init Next.js + Tailwind, config project
- [x] Pindahkan `footage_hero.mp4` ke `public/`
- [x] Extract still frames (`ffmpeg` @ t=1/4/7) → poster + section images
- [x] Setup design tokens di `globals.css` + `tailwind.config.js`
- [x] Font loader di `layout.jsx`
- [x] `Navbar` + `Footer` + layout wiring
- [x] `Hero` dengan video background
- [x] `Ticker` marquee
- [x] `Manifesto` + stat counter
- [x] `MenuCard` + featured section
- [x] `SpaceGallery`
- [x] `Testimonials`
- [x] CTA banner
- [x] Halaman `/menu`
- [x] Halaman `/about`
- [x] Halaman `/contact` + Maps embed + form
- [x] `RetroDialog` interaksi
- [x] `Reveal` scroll animation
- [x] Responsive pass (mobile / tablet / desktop)
- [x] Build check (`npm run build`) + preview

---

## 9. Navigasi

```
/          Home
/menu      Menu
/about     About
/contact   Contact
```

---

*Dokumen dibuat 17 Oktober 2026*