"use client";

import { useState } from "react";
import RetroDialog from "@/components/RetroDialog";
import Reveal from "@/components/Reveal";
import { INFO } from "@/data/menu";

// Google Maps `output=embed` memblokir framing (301 + X-Frame-Options),
// jadi pakai OpenStreetMap yang framable & tanpa API key.
// Link "Open in Maps" tetap arahkan ke Google Maps untuk navigasi.
const MAPS_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=106.8057%2C-6.2581%2C106.8177%2C-6.2461&layer=mapnik&marker=-6.2521%2C106.8117";

// Filter ini mengubah peta OSM yang terang -> tema gelap BYTE//BREW
const MAP_DARK = "invert(0.92) hue-rotate(180deg) saturate(0.55) brightness(0.92) contrast(1.05)";

export default function ContactClient() {
  const [dialog, setDialog] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", date: "", note: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setDialog({
      title: "PESANAN DITERIMA",
      lines: [
        `name: ${form.name || "(kosong)"}`,
        `email: ${form.email || "(kosong)"}`,
        `date: ${form.date || " ASAP "}`,
        "",
        "Pesanan belum bisa diproses online.",
        "Silakan hubungi kami langsung.",
      ],
    });
  };

  return (
    <>
      {/* --- Header --- */}
      <section className="grain relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="/still-beans.jpg"
            alt=""
            className="h-full w-full object-cover opacity-25"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/90 to-void" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="eyebrow flex items-center gap-3 text-lime">
            <span className="inline-block h-1.5 w-1.5 bg-lime" />
            [04] — Hubungi kami
          </p>
          <h1 className="display mt-5 text-[clamp(2.5rem,9vw,7.5rem)]">
            PESAN MEJA<span className="cursor-block" />
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
            Untuk grup di atas 6 orang, mampir dulu atau mention di DM
            ya — space kami kecil dan mejanya cepat penuh.
          </p>
        </div>
      </section>

      {/* --- Info + form --- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-12 md:gap-10 md:py-28">
          {/* Info */}
          <div className="md:col-span-5">
            <Reveal from="left">
              <p className="eyebrow text-lime-dim">Find us</p>
              <div className="mt-6 space-y-8">
                <div className="border-l-2 border-lime pl-4">
                  <p className="font-mono text-[10px] tracking-widest text-lime uppercase">
                    Address
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/80">
                    {INFO.address}
                  </p>
                </div>

                <div className="border-l-2 border-line pl-4">
                  <p className="font-mono text-[10px] tracking-widest text-mute uppercase">
                    Jam buka
                  </p>
                  <ul className="mt-2 space-y-2">
                    {INFO.hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex justify-between gap-4 font-mono text-xs"
                      >
                        <span className="text-cream/80">{h.day}</span>
                        <span className="text-lime">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-l-2 border-line pl-4">
                  <p className="font-mono text-[10px] tracking-widest text-mute uppercase">
                    Direct
                  </p>
                  <ul className="mt-2 space-y-1.5 font-mono text-xs">
                    <li>
                      <a
                        href={`mailto:${INFO.email}`}
                        className="text-cream/80 transition-colors hover:text-lime"
                      >
                        {INFO.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${INFO.phone.replace(/\s/g, "")}`}
                        className="text-cream/80 transition-colors hover:text-lime"
                      >
                        {INFO.phone}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <Reveal from="right" delay={100}>
              <form
                onSubmit={submit}
                className="grain relative border border-line bg-panel p-6 md:p-8"
              >
                <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-lime" />
                <span className="absolute -right-px -bottom-px h-4 w-4 border-r-2 border-b-2 border-lime" />

                <p className="eyebrow mb-8 text-lime">Booking form</p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="01 / Name" id="name">
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Nama kamu"
                      className="w-full border border-line bg-void px-4 py-3 font-mono text-xs text-cream outline-none transition-colors placeholder:text-mute/60 focus:border-lime"
                    />
                  </Field>

                  <Field label="02 / Email" id="email">
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@domain.com"
                      className="w-full border border-line bg-void px-4 py-3 font-mono text-xs text-cream outline-none transition-colors placeholder:text-mute/60 focus:border-lime"
                    />
                  </Field>

                  <Field label="03 / Date & time" id="date">
                    <input
                      id="date"
                      type="datetime-local"
                      required
                      value={form.date}
                      onChange={set("date")}
                      className="w-full border border-line bg-void px-4 py-3 font-mono text-xs text-cream outline-none transition-colors focus:border-lime"
                    />
                  </Field>

                  <Field label="04 / Headcount" id="headcount">
                    <select
                      id="headcount"
                      className="w-full border border-line bg-void px-4 py-3 font-mono text-xs text-cream outline-none transition-colors focus:border-lime"
                      defaultValue="2"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="05 / Note (optional)" id="note">
                      <textarea
                        id="note"
                        rows={4}
                        value={form.note}
                        onChange={set("note")}
                        placeholder="Anything we should know?"
                        className="w-full resize-none border border-line bg-void px-4 py-3 font-mono text-xs text-cream outline-none transition-colors placeholder:text-mute/60 focus:border-lime"
                      />
                    </Field>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full border-2 border-lime bg-lime px-6 py-4 font-mono text-xs font-bold tracking-widest text-void uppercase transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Kirim pesanan →
                </button>

                <p className="mt-4 font-mono text-[10px] text-mute">
                  Form ini belum terhubung ke sistem. Untuk memesan,
                  silakan hubungi kami lewat telepon atau Instagram.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Map --- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <Reveal from="up">
            <p className="eyebrow flex items-center gap-3 text-lime">
              <span className="inline-block h-1.5 w-1.5 bg-lime" />
              Location
            </p>
          </Reveal>

          <Reveal from="up" delay={80}>
            <div className="relative mt-8 aspect-video overflow-hidden border border-line bg-panel">
              {/* Fallback: tampil kalau iframe gagal load */}
              <div className="grid-lines absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <span className="display text-4xl text-lime">BYTE//BREW</span>
                <span className="font-mono text-[10px] tracking-widest text-mute">
                  {INFO.address}
                </span>
                <span className="font-mono text-[10px] text-mute">
                  Memuat peta&hellip;
                </span>
              </div>

              <iframe
                src={MAPS_EMBED}
                title="Lokasi BYTE//BREW — Senopati, Jakarta Selatan"
                className="relative h-full w-full border-0"
                style={{ filter: MAP_DARK }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal from="up" delay={140}>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-mute">
              <span>Senopati, Kebayoran Baru, Jakarta Selatan 12190</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(INFO.mapsQuery)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="border border-line px-3 py-1.5 text-cream transition-colors hover:border-lime hover:text-lime"
              >
                Open in Maps ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <RetroDialog
        open={!!dialog}
        onClose={() => setDialog(null)}
        title={dialog?.title}
        lines={dialog?.lines}
      />
    </>
  );
}

function Field({ label, id, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] tracking-widest text-mute uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}