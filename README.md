# BYTEBREW

> Kopi pilihan, diroast setiap hari.

Website untuk kedai kopi spesialti **Bytebrew** di Senopati, Jakarta Selatan.

Tampilan sekarang: **kertas krem hangat + blok espresso gelap**, satu keluarga
tipografi **Outfit** (geometric sans, variable 100–900) untuk display dan body.
Tidak ada monospace, tidak ada numerasi seksi, tidak ada metafora kode.

Rancangan awal masih ada di [`PLAN.md`](./PLAN.md).

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
| `/` | Hero (video), ticker, cerita + statistik, menu unggulan, galeri, reviews, CTA |
| `/menu` | 11 item, 3 kategori + filter tab |
| `/about` | Cerita, cara kami kerja, sejarah |
| `/contact` | Alamat, jam buka, form booking, peta |

---

## Struktur

```
src/
├── app/
│   ├── layout.jsx          # fonts (Outfit), metadata, Navbar + Footer
│   ├── globals.css         # design tokens, tombol, card, marquee, reveal
│   ├── page.jsx            # HOME
│   ├── menu/page.jsx
│   ├── about/page.jsx
│   └── contact/
│       ├── page.jsx        # server — hanya metadata
│       └── ContactClient.jsx  # client — form + peta
├── components/             # Hero, Ticker, Story, MenuCard,
│                           # SpaceGallery, Testimonials, CtaBanner,
│                           # Navbar, Footer, OrderDialog, Reveal
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
| **`notes` tiap menu** (tasting notes) | `src/data/menu.js` → `ITEMS[].notes` |

Belum ada backend. Tombol *Tambah ke pesanan* dan *Kirim pesanan* sengaja
menampilkan dialog info alih-alih mengirim data.

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

- Semua kombinasi warna teks/latar utama sudah diuji kontrasnya
  (aksen terang memakai `#8A4520` = 6.3:1, aksen gelap `#E09A63` = 7.2:1)
- Navbar otomatis berubah terang/gelap di hero yang gelap
- Menghormati `prefers-reduced-motion` (video berhenti loop, animasi dimatikan)
- Scroll reveal **fail-safe**: kalau JS mati/nonaktif, konten tetap tampil normal
  dan angka statistik tetap menampilkan nilai sebenarnya
- `<video>` punya `muted` + `playsInline` agar autoplay tidak diblokir mobile
- Dialog bisa ditutup `Esc` dan mengunci scroll
- Fokus terlihat untuk navigasi keyboard