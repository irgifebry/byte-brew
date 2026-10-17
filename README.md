# BYTE//BREW

> Low-level systems. High caffeine.

Website coffee shop bertema **startup agency / Gen-Z builder culture**.
Dark `#0A0A0A` + neon lime `#C6F24E`, tipografi brutalis, motion berbasis scroll.

Rancangan lengkap ada di [`PLAN.md`](./PLAN.md).

---

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
```

Produksi:

```bash
npm run build
npm run start
```

Butuh **Node 18+** (dibangun & dites di Node 26).

---

## Halaman

| Route | Isi |
|---|---|
| `/` | Hero (video), ticker, manifesto + statistik, featured menu, galeri, testimoni, CTA |
| `/menu` | 11 item, 3 kategori + filter tab |
| `/about` | Story, values, changelog |
| `/contact` | Alamat, jam buka, form booking, peta |

---

## Struktur

```
src/
├── app/
│   ├── layout.jsx          # fonts, metadata, Navbar + Footer
│   ├── globals.css         # design tokens, grain, marquee, reveal
│   ├── page.jsx            # HOME
│   ├── menu/page.jsx
│   ├── about/page.jsx
│   └── contact/
│       ├── page.jsx        # server — hanya metadata
│       └── ContactClient.jsx  # client — form + peta
├── components/             # Hero, Ticker, Manifesto, MenuCard,
│                           # SpaceGallery, Testimonials, CtaBanner,
│                           # Navbar, Footer, RetroDialog, Reveal
└── data/menu.js            # ← GANTI DATA MENU DI SINI
```

---

## Yang perlu kamu ganti sebelum live

| Apa | Di mana |
|---|---|
| **Data menu, harga, alamat, jam buka, email/telepon** | `src/data/menu.js` → `ITEMS` & `INFO` |
| **Domain untuk metadata / OG** | `src/app/layout.jsx` → `metadataBase` |
| **Koordinat peta** | `src/app/contact/ContactClient.jsx` → `MAPS_EMBED` |
| **Link sosial** | `src/data/menu.js` → `INFO.socials` |
| **Foto produk & galeri** | `src/data/menu.js` → `img`, `src/components/SpaceGallery.jsx` |

Belum ada backend. Tombol *Add to order* dan *Submit booking* sengaja
menampilkan dialog retro alih-alih mengirim data.

---

## Aset

- `public/footage_hero.mp4` — video hero (1280×720, 10 detik, 3 shot: biji jatuh / tamping espresso / pour latte)
- `public/hero-poster.jpg`, `still-beans.jpg`, `still-tamping.jpg`, `still-pour.jpg` — frame still dari video tersebut
- Foto produk & galeri: Unsplash (link eksternal, butuh internet)

Regenerasi still frame dari video:

```bash
ffmpeg -ss 1 -i footage_hero.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 public/hero-poster.jpg -y
ffmpeg -ss 4 -i footage_hero.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 public/still-tamping.jpg -y
ffmpeg -ss 7 -i footage_hero.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 public/still-pour.jpg -y
```

---

## Catatan aksesibilitas

- Menghormati `prefers-reduced-motion` (video berhenti loop, animasi dimatikan)
- Scroll reveal **fail-safe**: kalau JS mati/nonaktif, konten tetap tampil normal
- `<video>` punya `muted` + `playsInline` agar autoplay tidak diblokir mobile
- Dialog punya `role="alertdialog"`, bisa ditutup `Esc`, dan mengunci scroll
- Fokus terlihat (outline lime) untuk navigasi keyboard