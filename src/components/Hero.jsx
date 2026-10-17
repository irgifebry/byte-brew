"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  // Hero memakai file video yang sama dengan IntroScreen. Kalau keduanya
  // diputar bersamaan, browser.decode() dua kali untuk file yang sama →
  // frame dropped dan videonya sendiri yang terasa tersendat.
  //
  // Karena itu video hero TIDAK autoplay: ia hanya buffering (preload),
  // lalu mulai main setelah `intro:done`, dengan currentTime disinkronkan
  // ke frame terakhir intro supaya transisinya nyambung, tidak melompat
  // balik ke detik 0.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Reduced motion: andalkan `poster` untuk frame pertama, jangan putar loop.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let started = false;
    const start = () => {
      if (started) return;
      started = true;

      // Lanjut dari frame terakhir intro, bukan dari detik 0.
      const t = Number(document.documentElement.dataset.introTime);
      if (Number.isFinite(t) && t > 0.05 && Math.abs(v.currentTime - t) > 0.2) {
        try {
          v.currentTime = t;
        } catch {
          /* seek ditolak browser — playback dari awal tetap jalan */
        }
      }
      const p = v.play();
      if (p?.catch) p.catch(() => {});
    };

    // `intro:prepare` dikirim lebih dulu, selagi overlay intro masih
    // opaque: video hero selesai bersiap sebelum fade dimulai.
    // `intro:done` hanya cadangan (mis. `intro:prepare` kelewat).
    const onReady = () => {
      // Data sudah ter-buffer (preload=auto), jadi playback mulai instan.
      if (v.readyState >= 2) start();
      else v.addEventListener("loadeddata", start, { once: true });
    };

    window.addEventListener("intro:prepare", onReady);
    window.addEventListener("intro:done", onReady);

    // Intro sudah lewat? (mis. navigasi balik ke beranda.)
    if (document.documentElement.classList.contains("intro-done")) onReady();

    return () => {
      v.removeEventListener("loadeddata", start);
      window.removeEventListener("intro:prepare", onReady);
      window.removeEventListener("intro:done", onReady);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-end shadow-[0_20px_80px_-10px_rgba(36,27,21,0.7)]">
      {/* ---------- Video layer ----------
          Tanpa `autoPlay`: playback dikontrol dari effect di atas.

          PENTING: layer ini tidak pernah semi-transparan. Dulu video
          di-fade dari opacity 0 → 1 bareng fade intro, padahal yang
          "tembus" dari layer itu adalah background `body` yang krem —
          makanya di tengah transisi muncul semboyan putih. Sekarang
          videonya selalu opaque (poster menutupi frame sebelum siap),
          dan yang bertransisi hanya overlay intro di atasnya.
          `bg-espresso` jadi jaring pengaman: kalau video gagal load,
          yang tampil tetap blok gelap, bukan kertas krem. */}
      <div className="absolute inset-0 overflow-hidden bg-espresso">
        <video
          ref={videoRef}
          className="hero-video h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
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
          Warna teks ditulis eksplisit.

          Koreografi masuk (semua mulai bareng fade video intro):
            1. Video hero zoom pelan 1.07 → 1 di balik dissolve
            2. Judul: dua baris naik dari balik mask, 40ms lalu 150ms
            3. Paragraf: 280ms
            4. Tombol: 380ms lalu 450ms
            5. Scroll hint: garisnya "menggambar" diri 560ms, teks 600ms
          Nada naik dari bawah terus-menerus, bukan lima efek terpisah. */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pt-32 pb-14 md:px-8 md:pb-20">
        <h1 className="display mt-5 max-w-[16ch] text-[clamp(2.75rem,9vw,7.5rem)] text-cream">
          <span className="intro-mask" style={{ "--intro-delay": "40ms" }}>
            <span className="intro-mask-in">Kopi berkualitas,</span>
          </span>
          <span className="intro-mask" style={{ "--intro-delay": "150ms" }}>
            <span className="intro-mask-in">di-roast setiap hari.</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p
            className="intro-mask max-w-md text-[0.95rem] leading-relaxed text-cream-2 md:text-base"
            style={{ "--intro-delay": "280ms" }}
          >
            <span className="intro-mask-in">
              Biji single origin berasal dari kebun yang kami kenal. Kami
              me-roast dalam batch kecil setiap minggu, menggiling biji saat
              pesanan masuk, dan menyajikan minuman dalam waktu tiga menit.
            </span>
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="intro-mask" style={{ "--intro-delay": "380ms" }}>
              <span className="intro-mask-in">
                <Link
                  href="/menu"
                  className="btn border border-cream bg-cream text-espresso hover:bg-amber-lt hover:border-amber-lt"
                >
                  Lihat menu
                </Link>
              </span>
            </span>
            <span className="intro-mask" style={{ "--intro-delay": "450ms" }}>
              <span className="intro-mask-in">
                <Link
                  href="/contact"
                  className="btn border border-cream/40 text-cream hover:border-cream hover:bg-cream/10"
                >
                  Reservasi
                </Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
