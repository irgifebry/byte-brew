import { Fraunces, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroScreen from "@/components/IntroScreen";
import "./globals.css";

// Fraunces = serif display. Axes SOFT & WONK bikin karakternya warm
// dan sedikit "handmade", bukan serif kaku ala corporate.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  // Ganti ke domain asli saat website dipublikasikan
  metadataBase: new URL("https://bytebrew.id"),
  title: {
    default: "BYTEBREW — Kopi berkualitas, di-roast setiap hari.",
    template: "%s // BYTEBREW",
  },
  description:
    "Kedai kopi spesialti di Senopati, Jakarta Selatan. Biji single origin di-roast dalam batch kecil setiap minggu dan digiling saat pesanan masuk.",
  keywords: [
    "specialty coffee",
    "coffee shop Jakarta",
    "senopati",
    "cold brew",
    "manual brew",
    "BYTEBREW",
  ],
  openGraph: {
    title: "BYTEBREW — Kopi berkualitas, di-roast setiap hari.",
    description: "Kedai kopi spesialti di Senopati, Jakarta Selatan.",
    type: "website",
    images: ["/hero-poster.jpg"],
  },
};

export const viewport = {
  themeColor: "#f6f1e7",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/*
          Set flag `js` SEBELUM paint pertama.
          Konten yang dianimasikan (navbar, hero, blok reveal) hanya
          disembunyikan kalau flag ini ada, jadi kalau JS gagal →
          halaman tetap tampil normal (fail-safe).

          Failsafe: kalau IntroScreen gagal hydrate atau video tidak
          pernah jalan, class `intro-done` tetap dipasang agar konten
          tidak terkunci di opacity 0.

          Angka ini HARUS jauh lebih besar dari hold intro (3960ms) yang
          baru mulai setelah frame pertama benar-benar tampil — hold
          intro berakhir sekitar detik ke-4.0-an. Failsafe yang tembus
          lebih dulu akan merusak transisi: video hero dinyalakan tanpa
          posisi untuk disinkronkan, lalu mundur ~1-2 detik tepat saat
          UI muncul. 6500ms memberi IntroScreen ruang menyelesaikan
          urutannya sendiri, dan hanya jalur benar-benar gagal yang
          menyentuhnya.

          Overlay TIDAK BOLEH dicopot di sini. Node `.intro-screen`
          milik React; kalau kita `remove()` sendiri, reconcile
          berikutnya (hydrasi yang telat, `setDone`, atau navigasi)
          memanggil removeChild pada node yang sudah tidak lagi anak
          dari body → NotFoundError: "The node to be removed is not a
          child of this node". Cukup diberi class `intro-screen-leaving`
          (opacity 0 + pointer-events: none, sudah ada di CSS) supaya
          tidak memblokir halaman; IntroScreen yang mencopotnya sendiri
          lewat state React kalau sempat hydrate.

          Event yang dipancarkan: `intro:done` untuk observer reveal,
          `intro:failed` untuk hero (main dari nol, tanpa sinkronisasi).
          `intro:done` sengaja tidak lagi menyalakan video hero.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');setTimeout(function(){var d=document.documentElement;if(d.classList.contains('intro-done'))return;d.classList.add('intro-done');var s=document.querySelector('.intro-screen');if(s)s.classList.add('intro-screen-leaving');window.dispatchEvent(new Event('intro:done'));window.dispatchEvent(new Event('intro:failed'));},6500)`,
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${manrope.variable} antialiased`}
      >
        <IntroScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
