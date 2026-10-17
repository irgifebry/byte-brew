"use client";

import { useState } from "react";
import OrderDialog from "@/components/OrderDialog";
import Reveal from "@/components/Reveal";
import { INFO } from "@/data/menu";

// Google Maps `output=embed` memblokir framing (301 + X-Frame-Options),
// jadi pakai OpenStreetMap yang framable & tanpa API key.
// Link "Buka di Maps" tetap arahkan ke Google Maps untuk navigasi.
const MAPS_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=106.8057%2C-6.2581%2C106.8177%2C-6.2461&layer=mapnik&marker=-6.2521%2C106.8117";

// Filter: peta OSM terang -> nuansa hangat, biar nyambung sama blok gelap
const MAP_WARM = "sepia(0.35) saturate(1.15) contrast(0.94) brightness(1.02)";

export default function ContactClient() {
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    note: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setDialog(true);
  };

  return (
    <>
      {/* --- Header --- */}
      <section className="relative overflow-hidden border-b border-line bg-paper-2 pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="paper-tooth absolute inset-0 opacity-60" />

        <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
          <p className="eyebrow flex items-center gap-3 text-amber-dp">
            <span className="inline-block h-px w-8 bg-amber" />
            Kontak
          </p>
          <h1 className="display mt-5 text-[clamp(2.5rem,8vw,6rem)] text-ink">
            Kunjungi atau hubungi Bytebrew.
          </h1>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink-2">
            Untuk rombongan lebih dari enam orang, silakan hubungi kami
            melalui WhatsApp terlebih dahulu. Kapasitas tempat terbatas.
          </p>
        </div>
      </section>

      {/* --- Info + form --- */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:grid-cols-12 md:gap-10 md:py-28">
          {/* Info */}
          <div className="md:col-span-5">
            <Reveal from="left">
             <p className="eyebrow text-amber-dp">Lokasi dan informasi</p>
              <div className="mt-6 space-y-8">
                <div>
                  <p className="text-sm font-semibold text-ink">Alamat</p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">
                    {INFO.address}
                    <br />
                    Kebayoran Baru, Jakarta Selatan 12190
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">Jam buka</p>
                  <ul className="mt-1.5 space-y-2">
                    {INFO.hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex justify-between gap-4 text-[0.95rem]"
                      >
                        <span className="text-ink-2">{h.day}</span>
                        <span className="price text-ink">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                   <p className="text-sm font-semibold text-ink">Hubungi kami</p>
                  <ul className="mt-1.5 space-y-1.5 text-[0.95rem]">
                    <li>
                      <a
                        href={`mailto:${INFO.email}`}
                        className="text-ink-2 transition-colors hover:text-amber-dp"
                      >
                        {INFO.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${INFO.phone.replace(/\s/g, "")}`}
                        className="text-ink-2 transition-colors hover:text-amber-dp"
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
                className="rounded-2xl border border-line bg-card p-6 md:p-8"
              >
                <h2 className="display text-2xl text-ink">Form reservasi</h2>
                <p className="mt-2 text-sm text-ink-2">
                  Lengkapi informasi berikut untuk mengajukan reservasi.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field label="Nama" id="name">
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Masukkan nama Anda"
                      className="field"
                    />
                  </Field>

                  <Field label="Email" id="email">
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="nama@email.com"
                      className="field"
                    />
                  </Field>

                  <Field label="Tanggal dan waktu" id="date">
                    <input
                      id="date"
                      type="datetime-local"
                      required
                      value={form.date}
                      onChange={set("date")}
                      className="field"
                    />
                  </Field>

                  <Field label="Jumlah pengunjung" id="headcount">
                    <select
                      id="headcount"
                      className="field"
                      defaultValue="2"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} orang
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Catatan (opsional)" id="note">
                      <textarea
                        id="note"
                        rows={4}
                        value={form.note}
                        onChange={set("note")}
                        placeholder="Tuliskan preferensi meja atau informasi lain yang perlu kami ketahui."
                        className="field resize-none"
                      />
                    </Field>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-8 w-full">
                  Kirim permintaan reservasi
                </button>

                <p className="mt-4 text-xs leading-relaxed text-ink-3">
                  Form ini belum terhubung ke sistem reservasi. Untuk
                  mengajukan reservasi, hubungi kami melalui telepon atau
                  Instagram.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Map --- */}
      <section className="on-dark border-b border-line-dk">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <Reveal from="up">
            <p className="eyebrow text-amber-lt">Lokasi Bytebrew</p>
          </Reveal>

          <Reveal from="up" delay={80}>
            <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-line-dk bg-espresso-2">
              {/* Fallback kalau iframe gagal load */}
              <div className="paper-tooth absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <span className="display text-4xl text-cream">Bytebrew</span>
                <span className="text-sm text-cream-2">{INFO.address}</span>
                <span className="text-xs text-cream-2/60">Memuat peta…</span>
              </div>

              <iframe
                src={MAPS_EMBED}
                title={`Lokasi Bytebrew — ${INFO.address}`}
                className="relative h-full w-full border-0"
                style={{ filter: MAP_WARM }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal from="up" delay={140}>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-cream-2">
              <span>Senopati, Kebayoran Baru, Jakarta Selatan 12190</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(INFO.mapsQuery)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-line-dk px-4 py-2 text-cream transition-colors hover:border-amber-lt hover:text-amber-lt"
              >
                Buka di Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <OrderDialog open={dialog} onClose={() => setDialog(false)} title="Permintaan reservasi belum terkirim">
        <p>
          Terima kasih, {form.name || ""}. Permintaan Anda belum terkirim
          karena form ini belum terhubung ke sistem reservasi. Silakan
          hubungi kami melalui WhatsApp di {INFO.phone} untuk mengajukan
          reservasi.
        </p>
      </OrderDialog>
    </>
  );
}

function Field({ label, id, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-semibold text-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
