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
    <section className="grain relative flex min-h-[100svh] items-end overflow-hidden">
      {/* ---------- Video layer ---------- */}
      <div className="absolute inset-0">
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
            - Linear gradient: selalu ada, memberi kontras teks di bagian bawah.
            - Vignette: HANYA di layar besar. Di viewport portrait/mobile
              ellipse-nya menutup hampir seluruh frame sehingga footage
              jadi tidak kelihatan sama sekali. */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/25 to-void" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.7)_100%)] md:block" />
        {/* Di mobile, tambah sisi gelap tipis biar headline tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-r from-void/45 via-transparent to-void/20 md:hidden" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-32 pb-14 md:px-8 md:pb-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.25em] text-lime uppercase">
            Kopi pilihan // sejak 2023
          </span>
          <span className="hidden h-px flex-1 bg-lime/30 sm:block" />
        </div>

        <h1 className="display mt-5 max-w-[19ch] text-[clamp(2.75rem,10vw,9rem)]">
          KOPI PILIHAN,
          <br />
          <span className="text-lime">DIROAST</span>
          <br />
          SETIAP HARI<span className="cursor-block" />
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-sm leading-relaxed text-cream/70 md:text-base">
            Kopi pilihan yang di-roast dalam batch kecil, digiling
            saat pesanan masuk, dan selalu disajikan hangat.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="group border border-lime bg-lime px-6 py-3 font-mono text-xs font-bold tracking-wider text-void uppercase transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Lihat menu
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="border border-cream/30 px-6 py-3 font-mono text-xs font-bold tracking-wider text-cream uppercase transition-colors hover:border-cream"
            >
              Pesan meja
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-mute uppercase md:mt-16">
          <span className="inline-block h-8 w-px bg-lime/40" />
          Scroll ke bawah
        </div>
      </div>

      {/* Corner brackets */}
      <span className="pointer-events-none absolute top-24 right-6 hidden h-6 w-6 border-t border-r border-lime/40 lg:block" />
      <span className="pointer-events-none absolute bottom-8 left-6 hidden h-6 w-6 border-b border-l border-lime/40 lg:block" />
    </section>
  );
}