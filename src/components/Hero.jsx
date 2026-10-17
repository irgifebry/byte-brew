"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Hormati prefers-reduced-motion → jangan autoplay, tapi tetap tampilkan frame pertama.
  //
  // PENTING: jangan andalkan event `canplay` saja. Kalau video selesai
  // di-cache dan `canplay` memicu sebelum React hydration, handler inline
  // akan terlewat → opacity tetap 0 → hero hitam selamanya.
  // Karena itu kita cek readyState secara langsung + pasang listener.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const mark = () => setLoaded(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      mark();
      return;
    }

    // Sudah siap sebelum listener terpasang? (cache hit / load cepat)
    if (v.readyState >= 3) mark();

    v.addEventListener("canplay", mark);
    v.addEventListener("playing", mark);

    const play = v.play();
    if (play?.catch) play.catch(() => {});

    return () => {
      v.removeEventListener("canplay", mark);
      v.removeEventListener("playing", mark);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-end shadow-[0_20px_80px_-10px_rgba(36,27,21,0.7)]">
      {/* ---------- Video layer ---------- */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          onCanPlay={() => setLoaded(true)}
          onPlaying={() => setLoaded(true)}
          // Kalau video gagal load, tetap tampilkan poster daripada kotak hitam
          onError={() => setLoaded(true)}
          aria-hidden="true"
        >
          <source src="/footage_hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay.
            Warna warm (amber), bukan hitam netral — biar footage-nya
            terasa seperti cahaya lampu kedai, bukan layar gelap.
            Vignette hanya di layar besar; di viewport portrait ellipse-nya
            menutup hampir seluruh frame. */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/25 to-espresso/95" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(36,27,21,0.65)_100%)] md:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/45 via-transparent to-transparent md:hidden" />
      </div>

      {/* ---------- Content ----------
          Jangan pakai class `.on-dark` di sini: class itu menyertakan
          `background-color` solid, yang akan menutupi video di belakangnya.
          Warna teks ditulis eksplisit. */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pt-32 pb-14 md:px-8 md:pb-20">
        <h1 className="display mt-5 max-w-[16ch] text-[clamp(2.75rem,9vw,7.5rem)] text-cream">
          Kopi berkualitas,
          <br />
          di-roast setiap hari.
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-[0.95rem] leading-relaxed text-cream-2 md:text-base">
            Biji single origin berasal dari kebun yang kami kenal. Kami
            me-roast dalam batch kecil setiap minggu, menggiling biji saat
            pesanan masuk, dan menyajikan minuman dalam waktu tiga menit.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="btn border border-cream bg-cream text-espresso hover:bg-amber-lt hover:border-amber-lt"
            >
              Lihat menu
            </Link>
            <Link
              href="/contact"
              className="btn border border-cream/40 text-cream hover:border-cream hover:bg-cream/10"
            >
              Reservasi
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex items-center gap-2 text-xs font-medium tracking-wide text-cream-2/70 md:mt-16">
          <span className="inline-block h-8 w-px bg-amber-lt/60" />
          Gulir untuk melihat lebih lanjut
        </div>
      </div>
    </section>
  );
}
