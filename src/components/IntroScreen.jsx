"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video intro fullscreen sebelum UI muncul.
 *
 * Tiga hal yang bikin transisinya terasa kasar:
 * 1. Timer tetap 5 detik yang mulai dihitung sebelum frame pertama
 *    benar-benar dipaint → ada jeda gelap di awal.
 * 2. Overlay selesai dan elemen UI mulai pada frame yang sama →
 *    satu frame berat (style recalc besar + fade) jatuh tepat di
 *    pergantian yang paling terlihat.
 * 3. Video hero di belakang ikut memutar file yang sama → dua decoder
 *    berebut frame, jadi videonya sendiri ikut tersendat.
 *
 * Di sini: countdown mulai saat frame pertama tampil, video hero
 * diam selama intro, lalu fade overlay dan animasi UI dijalankan
 * barengan (bukan berurutan) dengan easing yang sama.
 */

// Cut point video ada di 3.958s (scene change). Countdown dibuat
// sedikit di atas itu supaya intro berhenti di batas shot, bukan di
// tengah gerakan.
const HOLD_MS = 3960;
const FADE_MS = 760;
// Jeda satu frame: memberi browser kesempatan menyelesaikan style
// recalc besar akibat class `intro-done` sebelum animasi mulai,
// supaya frame beratnya jatuh saat overlay masih diam.
const HANDOFF_GAP_MS = 64;
// Jeda kedua: memberi waktu hero menyelesaikan seek + mulai playback
// di frame yang sama dengan video intro, selagi overlay masih opaque.
const PRE_ROLL_MS = 240;
// Autoplay diblokir atau video gagal → jangan tahan user lebih dari ini.
// Ini batas waktu sampai video MULAI main, dihitung dari mount. Kalau
// frame pertama sudah tampil, timer ini dibatalkan dan hitungan hold
// penuh dimulai — tanpa itu, timer ini selalu duluan dan intro terpotong
// di detik ke-2.4.
const MAX_WAIT_MS = 2400;

export default function IntroScreen() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  // Dipakai handler onError di JSX, yang tidak punya akses ke closure effect.
  const leaveRef = useRef(() => {});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const timers = [];
    let started = false;
    let cancelled = false;
    let maxWaitTimer = 0;

    const beginLeave = () => {
      if (started || cancelled) return;
      started = true;

      // Bekukan frame terakhir supaya hero bisa melanjutkan dari detik
      // yang sama, bukan melompat balik ke awal.
      video.pause();
      document.documentElement.dataset.introTime = String(video.currentTime);

      // Tandai intro selesai lebih dulu: ini yang mengaktifkan aturan CSS
      // untuk animasi masuk. Style recalc-nya jatuh di frame yang tenang ini,
      // bukan di frame saat overlay sedang fade.
      document.documentElement.classList.add("intro-done");

      // Hero menyiapkan videonya dulu (seek ke frame terakhir + mulai
      // main) selagi overlay masih sepenuhnya opaque. Kalau urutannya
      // dibalik, video hero masih di frame 0 saat overlay sudah memudar
      // → lompatan gambar di tengah transisi.
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          // Video hero mulai zoom pelan (1.07 → 1) di balik dissolve.
          // Kelas ini hanya hidup selama intro berjalan.
          document.documentElement.classList.add("intro-rolling");
          window.dispatchEvent(new Event("intro:prepare"));
        }, HANDOFF_GAP_MS)
      );

      // Baru setelah hero siap: fade overlay dan animasi UI mulai
      // bersamaan. Dua video isinya sama, jadi yang terlihat adalah
      // crossfade ke hero yang sedang naik — satu gerakan tunggal.
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          root.classList.add("intro-screen-leaving");
          window.dispatchEvent(new Event("intro:done"));
        }, HANDOFF_GAP_MS + PRE_ROLL_MS)
      );

      // Copot overlay setelah fade selesai, saat tidak ada apa pun
      // yang bergerak lagi.
      timers.push(
        window.setTimeout(
          () => setDone(true),
          HANDOFF_GAP_MS + PRE_ROLL_MS + FADE_MS + 60
        )
      );
    };

    const beginHold = () => {
      if (started || cancelled) return;
      // Video sudah jalan → jaring pengaman tidak perlu lagi.
      window.clearTimeout(maxWaitTimer);
      timers.push(window.setTimeout(beginLeave, HOLD_MS));
    };

    leaveRef.current = beginLeave;

    // Jaring pengaman: kalau autoplay diblokir atau decode gagal,
    // video tidak akan pernah 답 `playing` — jangan menggantung di layar intro.
    maxWaitTimer = window.setTimeout(beginLeave, MAX_WAIT_MS);
    timers.push(maxWaitTimer);

    const play = video.play();
    if (play?.catch) play.catch(() => {});

    // Countdown hanya mulai setelah frame pertama benar-benar tampil,
    // supaya tidak ada jeda gelap di koneksi lambat.
    if (video.readyState >= 3) beginHold();
    else video.addEventListener("playing", beginHold, { once: true });

    // Video gagal load? Langsung lewat, jangan tampilkan kotak gelap.
    if (video.error) beginLeave();

    return () => {
      cancelled = true;
      leaveRef.current = () => {};
      video.removeEventListener("playing", beginHold);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="intro-screen" aria-hidden="true">
      <video
        ref={videoRef}
        className="intro-screen-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        onError={() => leaveRef.current()}
      >
        <source src="/footage_hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
