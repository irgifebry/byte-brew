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
          tidak terkunci di opacity 0. Event-nya ikut dispatched supaya
          observer reveal yang sudah terpasang ikut memicu.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('intro-done')){d.classList.add('intro-done');window.dispatchEvent(new Event('intro:done'));}},9000)`,
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
