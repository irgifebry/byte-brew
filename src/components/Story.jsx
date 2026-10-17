"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const STATS = [
    { value: 48, suffix: "K", label: "Minuman terjual" },
  { value: 4.9, suffix: "/5", label: "Rating pelanggan", decimals: 1 },
    { value: 3, suffix: " tahun", label: "Beroperasi sejak" },
  { value: 11, suffix: "", label: "Varian kopi" },
];

/**
 * Angka berhitung naik saat masuk viewport.
 *
 * Nilai awal = nilai akhir, bukan 0, supaya kalau JS gagal / dimatikan
 * angkanya tetap benar (fail-safe). Animasi tetap jalan karena usEffect
 * langsung setVal(0) sebelum observer-armed.
 */
function CountUp({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      return;
    }

    // Mulai dari nol supaya angka benar-benar terlihat berhitung naik
    setVal(0);

    let raf;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const dur = 1400;
        const start = performance.now();

        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          // easeOutExpo
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setVal(to * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        obs.unobserve(el);
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => {
      obs.unobserve(el);
      cancelAnimationFrame(raf);
    };
  }, [to]);

  const shown = decimals ? val.toFixed(decimals) : Math.round(val);

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

export default function Story() {
  return (
    <section className="relative border-b border-line bg-paper">
      {/* Seam: menyatukan hero (espresso, video) dengan section krem ini.

          Sebelumnya transisi ditangani box-shadow yang soar ke atas:
          gelap menumpuk di atas gelap, lalu dipotong garis lurus —
          justru emphasizing kontrasnya. Sekarang diganti gradien yang
          larut dari warna section di atas ke warna section ini, jadi
          kedua blok terbaca sebagai satu permukaan.

          Panjang seam (h-28 / h-44) sengaja lebih pendek dari padding
          atas (pt-36 / pt-56): teks eyebrow selalu mulai setelah
          gradasi selesai, jadi tidak pernah duduk di bagian yang masih
          gelap dan kontrasnya tetap terjaga. */}
      <div className="seam-to-paper pointer-events-none absolute inset-x-0 top-0 h-28 md:h-44" />

      {/* `relative` wajib: tanpa itu, div ini dipaint SEBELUM lapisan
          seam (elemen positioned menang atas in-flow), dan gradasinya
          akan menutupi isi section. */}
      <div className="relative mx-auto max-w-[1240px] px-5 pt-36 pb-20 md:px-8 md:pt-56 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* --- Text --- */}
          <div className="md:col-span-7">
            <Reveal from="up">
              <p className="eyebrow flex items-center gap-3 text-amber-dp">
                <span className="inline-block h-px w-8 bg-amber" />
                Tentang kami
              </p>
            </Reveal>

            <Reveal from="up" delay={80}>
              <h2 className="display mt-6 text-[clamp(2rem,5vw,3.75rem)] text-ink">
                Batch kecil, diracik dengan konsisten.
              </h2>
            </Reveal>

            <Reveal from="up" delay={140}>
              <div className="mt-6 max-w-xl space-y-4 text-[0.95rem] leading-relaxed text-ink-2 md:text-base">
                <p>
                  Semua biji berasal dari kebun yang kami kenal, bukan dari
                  pusat distribusi. Kami me-roast maksimal 8 kilogram per
                  batch. Jika hasilnya tidak sesuai standar, batch tersebut
                  tidak kami jual.
                </p>
                <p>
                  Biji digiling saat pesanan masuk, bukan sekaligus pada pagi
                  hari. Kami juga menjelaskan setiap pilihan menu dengan
                  bahasa yang mudah dipahami.
                </p>
              </div>
            </Reveal>

            <Reveal from="up" delay={200}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Batch kecil", "Single origin", "Cupping terbuka"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-medium text-ink-2"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* --- Stills dari footage kedai --- */}
          <div className="md:col-span-5 md:pl-6">
            <Reveal from="right" delay={120}>
              <div className="grid grid-cols-2 gap-3">
                <figure className="group relative col-span-2 overflow-hidden rounded-2xl">
                  <img
                    src="/still-tamping.jpg"
                    alt="Barista menamping espresso di portafilter mesin"
                    className="img-zoom aspect-video w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-espresso/70 px-3 py-1.5 text-[11px] font-medium text-cream backdrop-blur-sm">
                    18 gram biji kopi ditakar untuk setiap seduhan
                  </figcaption>
                </figure>

                <figure className="group overflow-hidden rounded-2xl">
                  <img
                    src="/still-pour.jpg"
                    alt="Susu dituang membentuk latte art di cangkir"
                    className="img-zoom aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </figure>

                <figure className="group overflow-hidden rounded-2xl">
                  <img
                    src="/still-beans.jpg"
                    alt="Biji kopi jatuh slow motion"
                    className="img-zoom aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </div>
            </Reveal>
          </div>
        </div>

        {/* --- Stats --- */}
        <div className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              from="up"
              delay={i * 90}
              className="border-b border-line px-2 py-8 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <p className="display text-[clamp(2rem,5vw,3.25rem)] text-ink">
                <CountUp
                  to={s.value}
                  decimals={s.decimals}
                  suffix={s.suffix || s.suffixText || ""}
                />
              </p>
              <p className="mt-1.5 text-sm text-ink-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
