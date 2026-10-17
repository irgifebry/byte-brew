import { JetBrains_Mono, Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  // Ganti ke domain asli saat website dipublikasikan
  metadataBase: new URL("https://bytebrew.id"),
  title: {
    default: "BYTE//BREW — Kopi pilihan, di-roast setiap hari.",
    template: "%s // BYTE//BREW",
  },
  description:
    "Kedai kopi pilihan di Senopati, Jakarta Selatan. Biji di-roast dalam batch kecil setiap minggu dan diseduh saat pesanan masuk.",
  keywords: [
    "specialty coffee",
    "coffee shop Jakarta",
    "cold brew",
    "manual brew",
    "BYTE BREW",
  ],
  openGraph: {
    title: "BYTE//BREW — Kopi pilihan, di-roast setiap hari.",
    description: "Kedai kopi pilihan di Senopati, Jakarta Selatan.",
    type: "website",
    images: ["/hero-poster.jpg"],
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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
        className={`${spaceGrotesk.variable} ${jetbrains.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}