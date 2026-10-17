"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const STATS = [
  { value: 48, suffix: "K", label: "Cangkir terjual", index: "01" },
  { value: 4.9, suffix: "★", label: "Rating rata-rata", index: "02", decimals: 1 },
  { value: 3, suffix: " tahun", label: "Sudah berjalan", index: "03" },
  { value: 12, suffix: "", label: "Varian kopi", index: "04" },
];

/** Angka berhitung naik saat masuk viewport. */
function CountUp({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      return;
    }

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
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-12 py-20 md:grid-cols-12 md:gap-10 md:py-28">
          {/* --- Text --- */}
          <div className="md:col-span-7">
            <Reveal from="up">
              <p className="eyebrow flex items-center gap-3 text-lime">
                <span className="inline-block h-1.5 w-1.5 bg-lime" />
                02 — Tentang kami
              </p>
            </Reveal>

            <Reveal from="up" delay={80}>
              <h2 className="display mt-6 text-[clamp(2rem,5vw,4.25rem)]">
                KOPI PILIHAN,
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">DI-ROAST</span>
                  <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-lime/25" />
                </span>
                <span className="cursor-block" />
                <br />
                SETIAP HARI
              </h2>
            </Reveal>

            <Reveal from="up" delay={160}>
              <div className="mt-8 max-w-xl space-y-4 text-sm leading-relaxed text-cream/60 md:text-base">
                <p>
                  Semua biji kami di-roast dalam batch kecil, maksimal
                  8 kilogram. Kalau satu batch rasanya meleset, batch itu
                  tidak kami jual.
                </p>
                <p>
                  Kami roasting dalam jumlah kecil, menyeduh langsung di tempat,
                  dan selalu tripping. Tidak ada istilah yang
                  membingungkan saat memesan.
                </p>
              </div>
            </Reveal>

            <Reveal from="up" delay={240}>
              <div className="mt-10 flex flex-wrap gap-3 font-mono text-[10px] tracking-widest uppercase">
                {["Batch kecil", "Direct trade", "Tanpa istilah rumit"].map((t) => (
                  <span
                    key={t}
                    className="border border-line px-3 py-1.5 text-mute transition-colors hover:border-lime hover:text-lime"
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
                <figure className="group relative col-span-2 overflow-hidden border border-line">
                  <img
                    src="/still-tamping.jpg"
                    alt="Barista tamping espresso di portafilter mesin"
                    className="img-zoom aspect-video w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void to-transparent px-3 pt-8 pb-2 font-mono text-[10px] tracking-wider text-cream uppercase">
                    [01] — tamping, 18 gram masuk
                  </figcaption>
                </figure>

                <figure className="group relative overflow-hidden border border-line">
                  <img
                    src="/still-pour.jpg"
                    alt="Susu dituang membentuk latte art di cangkir"
                    className="img-zoom aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </figure>

                <figure className="group relative overflow-hidden border border-line">
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
              key={s.index}
              from="up"
              delay={i * 90}
              className="border-b border-line px-2 py-8 md:border-r md:border-b-0 md:px-6 md:last:border-r-0"
            >
              <p className="font-mono text-[10px] text-lime-dim">{s.index}</p>
              <p className="display mt-2 text-[clamp(2.25rem,6vw,3.75rem)] text-lime">
                <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-widest text-mute uppercase">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}