import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Tentang Bytebrew",
  description:
    "Kenali Bytebrew, kedai kopi di Senopati yang berdiri sejak 2023.",
};

const VALUES = [
  {
    title: "Menjaga kualitas",
    body: "Kami menggunakan biji single origin dan me-roast dalam batch kecil setiap minggu. Batch yang tidak memenuhi standar rasa tidak kami jual.",
    points: ["Biji single origin", "Batch maksimal 8 kg", "Dites setiap pagi"],
  },
  {
    title: "Biji kopi segar",
    body: "Biji digiling saat pesanan masuk, bukan disimpan dalam keadaan sudah digiling. Tanggal roasting juga tersedia jika Anda ingin mengetahuinya.",
    points: ["Digiling saat pesanan", "Tanggal roasting tersedia", "Baik dipakai 21 hari"],
  },
  {
    title: "Ruang untuk berkumpul",
    body: "Bytebrew menjadi tempat bagi pelanggan untuk bertemu dan menikmati kopi. Kami mengadakan acara kopi setiap Jumat malam, sesi cupping setiap dua minggu, serta refill chai gratis.",
    points: ["Cupping setiap 2 minggu", "Acara kopi setiap Jumat", "Refill chai gratis"],
  },
];

const TIMELINE = [
  {
    year: "2023",
    text: "Bytebrew dibuka dengan empat meja, satu grinder, dan satu mesin espresso.",
  },
  {
    year: "2024",
    text: "Kami menambahkan cold brew, mesin espresso kedua, dan enam meja sehingga total menjadi sepuluh meja.",
  },
  {
    year: "2025",
    text: "Kami mulai membeli biji secara langsung dari dua kebun di Etiopia dan satu kebun di Sumatra.",
  },
  {
    year: "2026",
    text: "Bytebrew kini memiliki empat belas meja. Bar dibuka untuk umum setiap Jumat malam.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* --- Header --- */}
      <section className="relative overflow-hidden border-b border-line bg-paper-2 pt-32 pb-14 md:pt-44 md:pb-24">
        <div className="paper-tooth absolute inset-0 opacity-60" />

        <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
          <p className="eyebrow flex items-center gap-3 text-amber-dp">
            <span className="inline-block h-px w-8 bg-amber" />
            Tentang kami
          </p>
          <h1 className="display mt-5 max-w-[16ch] text-[clamp(2.5rem,8vw,6rem)] text-ink">
            Berawal dari kedai kecil dengan satu grinder.
          </h1>
        </div>
      </section>

      {/* --- Story --- */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:grid-cols-12 md:gap-10 md:py-28">
          <div className="md:col-span-5">
            <Reveal from="left">
              <figure className="overflow-hidden rounded-2xl">
                <img
                  src="/still-tamping.jpg"
                  alt="Barista sedang menamping kopi di portafilter"
                  className="aspect-4/5 w-full object-cover"
                />
              </figure>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:pl-4">
            <Reveal from="up">
              <p className="eyebrow text-amber-dp">Cerita singkat</p>
            </Reveal>

            <Reveal from="up" delay={80}>
              <p className="display mt-5 text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight text-ink">
                Kami ingin menyajikan kopi berkualitas dengan harga wajar
                dan layanan yang efisien.
              </p>
            </Reveal>

            <Reveal from="up" delay={140}>
              <div className="mt-8 max-w-xl space-y-4 text-[0.95rem] leading-relaxed text-ink-2 md:text-base">
                <p>
                  Bytebrew didirikan pada 2023 oleh dua orang yang tertarik
                  pada kopi dan proses penyeduhannya. Kedai ini bermula
                  dengan empat meja, satu grinder, dan satu mesin espresso.
                </p>
                <p>
                  Kami melihat bahwa kopi berkualitas sering kali disajikan
                  dengan harga tinggi atau waktu tunggu yang lama. Karena
                  itu, kami membangun tempat yang menyajikan kopi berkualitas
                  dengan harga wajar dan layanan yang efisien.
                </p>
                <p>
                  Kami percaya kopi yang baik perlu disajikan dengan mutu
                  yang konsisten. Prinsip itu tetap kami jaga hingga kini.
                </p>
              </div>
            </Reveal>

            <Reveal from="up" delay={200}>
              <Link href="/menu" className="btn btn-primary mt-10">
                Lihat menu
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Values --- */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <Reveal from="up">
            <p className="eyebrow flex items-center gap-3 text-amber-dp">
              <span className="inline-block h-px w-8 bg-amber" />
              Cara kami bekerja
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} from="up" delay={i * 110}>
                <article className="hover-lift flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                  <h2 className="display text-2xl text-ink">{v.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2">
                    {v.body}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-line pt-4">
                    {v.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-[13px] text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                        />
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
      <section className="bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <Reveal from="up">
            <p className="eyebrow flex items-center gap-3 text-amber-dp">
              <span className="inline-block h-px w-8 bg-amber" />
              Sejarah
            </p>
          </Reveal>

          <div className="mt-12 border-t border-line">
            {TIMELINE.map((t, i) => (
              <Reveal
                key={t.year}
                from="up"
                delay={i * 80}
                className="grid gap-3 border-b border-line py-7 md:grid-cols-[8rem_1fr] md:gap-10"
              >
                <span className="display text-2xl text-amber-dp md:text-3xl">
                  {t.year}
                </span>
                <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink-2">
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
