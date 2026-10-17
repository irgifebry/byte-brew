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
          CSS scroll-reveal hanya menyembunyikan elemen kalau flag ini ada,
          jadi kalau JS gagal → konten tetap tampil normal (fail-safe).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
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
