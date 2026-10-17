import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About",
  description:
    "Cerita BYTE//BREW: bagaimana kedai kopi 4 meja di Senopati tumbuh jadi tempat kerja favorit banyak orang.",
};

const VALUES = [
  {
    index: "01",
    title: "Tanpa jalan pintas",
    body: "Kami memakai biji single origin dan roasting dalam batch kecil setiap minggu. Kalau ada batch yang rasa-nya meleset, batch itu tidak kami jual.",
    points: ["Biji single origin", "Batch maksimal 8 kg", "Diuji setiap pagi"],
  },
  {
    index: "02",
    title: "Selalu segar",
    body: "Tidak ada biji yang duduk berhari-hari di etalase. Biji digiling saat pesanan masuk, dan tanggal roasting-nya kami catat kalau kamu mau tahu.",
    points: ["Digiling saat pesanan", "Tanggal roasting tersedia", "Baik dipakai dalam 21 hari"],
  },
  {
    index: "03",
    title: "Tempat berkumpul",
    body: "Tempat ini tumbuh bersama orang yang setiap hari datang ke sini. Open bar tiap Jumat malam, sesi cupping tiap dua minggu, dan chai gratis refill buat yang sedang dikejar tenggat.",
    points: ["Cupping tiap 2 minggu", "Open bar tiap Jumat", "Chai refill gratis"],
  },
];

const TIMELINE = [
  { year: "2023", text: "Buka pertama. 4 meja, satu grinder, dan satu mesin espresso yang suaranya paling keras di ruangan." },
  { year: "2024", text: "Tambah cold brew dan mesin kedua. Meja juga bertambah menjadi 10 buah." },
  { year: "2025", text: "Mulai belanja langsung ke dua kebun di Etiopia dan satu di Sumatra." },
  { year: "2026", text: "Sekarang 14 meja, open bar tiap Jumat, dan tidak ada rencana membuka cabang." },
];

export default function AboutPage() {
  return (
    <>
      {/* --- Header --- */}
      <section className="grain relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <img
            src="/still-pour.jpg"
            alt=""
            className="h-full w-full object-cover opacity-25"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/90 to-void" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="eyebrow flex items-center gap-3 text-lime">
            <span className="inline-block h-1.5 w-1.5 bg-lime" />
            [03] — Tentang kami
          </p>
          <h1 className="display mt-5 max-w-[15ch] text-[clamp(2.5rem,9vw,7.5rem)]">
            SELALU FRESH,
            <br />
            <span className="text-lime">SELALU HANGAT</span>
          </h1>
        </div>
      </section>

      {/* --- Story --- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-12 md:gap-10 md:py-28">
          <div className="md:col-span-5">
            <Reveal from="left">
              <figure className="relative border border-line">
                <img
                  src="/still-tamping.jpg"
                  alt="Barista sedang menamping kopi di portafilter"
                  className="aspect-4/5 w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 border-t border-line bg-void/85 px-4 py-3 font-mono text-[10px] tracking-wider text-mute uppercase backdrop-blur-sm">
                  [Fig.01] — 18g in, tamping dengan tenang
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:pl-4">
            <Reveal from="up">
              <p className="eyebrow text-lime-dim">Cerita singkat</p>
            </Reveal>

            <Reveal from="up" delay={80}>
              <p className="display mt-5 text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight">
                Bermula dari satu{" "}
                <span className="text-lime">mesin grinder yang rusak</span>.
              </p>
            </Reveal>

            <Reveal from="up" delay={140}>
              <div className="mt-8 max-w-xl space-y-4 text-sm leading-relaxed text-cream/65 md:text-base">
                <p>
                  BYTE//BREW dibuka tahun 2023 oleh dua orang yang jauh
                  lebih sering absen ngurus mesin daripada absen kantor.
                  Awalnya cuma 4 meja, satu grinder, dan satu mesin
                  espresso yang suaranya lebih keras daripada apa pun
                  yang ada di dalamnya.
                </p>
                <p>
                  Ide awalnya sederhana: banyak kedai kopi yang enak
                  tapi lambat dan mahal. Kami mau bikin tempat yang
                  mengutamakan satu hal &mdash; kopi yang enak, harga
                  wajar, dan tidak berlama-lama.
                </p>
                <p>
                  Dari situ kami belajar satu hal: kopi yang enak
                  harus bisa enak setiap hari. Itu yang kami
                  coba sampai sekarang.
                  coba지금.
                </p>
              </div>
            </Reveal>

            <Reveal from="up" delay={200}>
              <Link
                href="/menu"
                className="group mt-10 inline-flex items-center gap-2 border border-lime px-6 py-3 font-mono text-xs font-bold tracking-wider text-lime uppercase transition-colors hover:bg-lime hover:text-void"
              >
                Lihat menunya
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Values --- */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <Reveal from="up">
            <p className="eyebrow flex items-center gap-3 text-lime">
              <span className="inline-block h-1.5 w-1.5 bg-lime" />
              Prinsip kerja kami
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.index} from="up" delay={i * 110}>
                <article className="hover-lift flex h-full flex-col border border-line bg-void p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="display text-5xl text-lime/20">
                      {v.index}
                    </span>
                    <span className="font-mono text-[10px] text-lime-dim">
                      •
                    </span>
                  </div>

                  <h2 className="display mt-4 text-2xl">{v.title}</h2>
                  <p className="mt-3 flex-1 font-mono text-[11px] leading-relaxed text-mute">
                    {v.body}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-line pt-4">
                    {v.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-2 font-mono text-[10px] tracking-wide text-cream/75"
                      >
                        <span className="text-lime">&gt;</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Timeline --- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <Reveal from="up">
            <p className="eyebrow flex items-center gap-3 text-lime">
              <span className="inline-block h-1.5 w-1.5 bg-lime" />
              Sejarah
            </p>
          </Reveal>

          <div className="mt-12 border-t border-line">
            {TIMELINE.map((t, i) => (
              <Reveal
                key={t.year}
                from="up"
                delay={i * 80}
                className="group grid gap-3 border-b border-line py-7 md:grid-cols-[9rem_1fr] md:gap-10"
              >
                <span className="display text-2xl text-lime md:text-3xl">
                  {t.year}
                </span>
                <p className="max-w-2xl font-mono text-xs leading-relaxed text-cream/65 transition-colors group-hover:text-cream">
                  {t.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}