"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  // Hero memakai file video yang sama dengan IntroScreen. Kalau keduanya
  // diputar bersamaan, browser.decode() dua kali untuk file yang sama →
  // frame dropped dan videonya sendiri yang terasa tersendat.
  //
  // Karena itu video hero TIDAK autoplay dan tidak main selama intro.
  // Urutannya (lihat IntroScreen):
  //   1. `intro:prepare` → hero MENYEEK ke frame terakhir intro, lalu diam.
  //      Overlay masih opaque, jadi proses seek/paint terjadi di belakang
  //      layar — saat terlihat nanti, frame yang benar sudah terpaint.
  //   2. `intro:reveal` → overlay sudah hilang dari DOM, baru `play()`.
  //      Playback mulai dari frame yang sejak tadi dipegang, jadi potongannya
  //      frame-exact: video tidak mundur maupun maju.
  //
  // PENTING: `intro:done` TIDAK boleh menyalakan video di sini. Event itu
  // artinya "UI boleh muncul", dan ia juga dipakai jaring pengaman di
  // layout.jsx. Dulu jaring itu tembus di detik ke-4 — mendahului hold
  // intro (3960ms, baru mulai begitu frame pertama benar-benar tampil,
  // jadi berakhir sekitar detik ke-4.0-an) — dan hero yang dinyalakan dari
  // sana main dari detik 0 sementara intro masih beku di detik 4: video
  // mundur ~1-2 detik tepat saat UI baru muncul.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Reduced motion: andalkan `poster` untuk frame pertama, jangan putar loop.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let armed = false; // frame intro sudah dipegang (seek selesai)
    let syncing = false; // seek sedang berjalan
    let started = false; // playback sudah / sedang berjalan
    let detachSeek = () => {};

    // Seek ke frame terakhir intro, lalu video tetap DIAM di sana sampai
    // `intro:reveal`. Semua pekerjaan berat selesai di belakang overlay
    // yang masih opaque, jadi tidak ada apa pun yang terlihat melompat.
    const arm = () => {
      if (armed || syncing || started) return;

      const t = Number(document.documentElement.dataset.introTime);
      // Tidak ada intro yang jalan (mis. navigasi balik ke beranda, atau
      // intro gagal total) → tidak ada posisi untuk disinkronkan.
      if (!Number.isFinite(t) || t <= 0.05) {
        armed = true;
        return;
      }
      // Sudah di posisi yang benar → frame itu sudah terpaint, tidak
      // perlu seek (seek yang tidak perlu tetap bisa berkedip).
      if (Math.abs(v.currentTime - t) <= 0.02) {
        armed = true;
        return;
      }

      syncing = true;
      const onSeeked = () => {
        syncing = false;
        armed = true;
        detachSeek();
      };
      detachSeek = () => v.removeEventListener("seeked", onSeeked);
      v.addEventListener("seeked", onSeeked);
      try {
        v.currentTime = t;
      } catch {
        // Seek ditolak browser: playback tetap jalan, hanya tidak presisi.
        onSeeked();
      }
    };

    const start = () => {
      if (started) return;
      started = true;
      detachSeek();
      const p = v.play();
      if (p?.catch) p.catch(() => {});
    };

    // `intro:prepare`: buffer sudah siap (preload=auto), jadi seek bisa
    // langsung jalan. Kalau belum, tunggu data pertama — bukan sampai
    // overlay hilang, karena itu memunculkan frame basi saat transisi.
    const onPrepare = () => {
      if (v.readyState >= 1) arm();
      else v.addEventListener("loadedmetadata", arm, { once: true });
    };

    // `intro:reveal`: overlay sudah dicopot → hero lanjut dari frame yang
    // dipegang. Kalau `intro:prepare` somehow kelewat, arm() di sini
    // tetap benar karena `introTime` masih tersimpan di <html>.
    const onReveal = () => {
      if (!armed) arm();
      start();
    };

    window.addEventListener("intro:prepare", onPrepare);
    window.addEventListener("intro:reveal", onReveal);
    // Jaring pengaman di layout.jsx: intro tidak pernah jalan sama sekali.
    // Tidak ada frame untuk disinkronkan, jadi video main dari nol.
    window.addEventListener("intro:failed", onReveal);

    // Intro sudah lewat sebelum hero mount (mis. navigasi balik ke
    // beranda)? Tidak ada overlay yang menutup → aman langsung main.
    if (
      document.documentElement.classList.contains("intro-done") &&
      !document.querySelector(".intro-screen")
    ) {
      start();
    }

    return () => {
      detachSeek();
      v.removeEventListener("loadedmetadata", arm);
      window.removeEventListener("intro:prepare", onPrepare);
      window.removeEventListener("intro:reveal", onReveal);
      window.removeEventListener("intro:failed", onReveal);
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
