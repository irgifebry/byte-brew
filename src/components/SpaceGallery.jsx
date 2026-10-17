import Reveal from "./Reveal";

const SPACES = [
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
    alt: "Barista menuang air panas ke filter pour-over di brew bar",
    code: "SP.01",
    label: "Bar brewing",
    note: "Bisa dilihat langsung.",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80",
    alt: "Meja kayu bulat dengan french press dan cangkir di dekat jendela",
    code: "SP.02",
    label: "Meja bersama",
    note: "8 colokan, tanpa batas waktu.",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    alt: "Tiga tangan memegang cangkir kopi bersulang",
    code: "SP.03",
    label: "Pelanggan tetap",
    note: "Open bar tiap Jumat.",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80",
    alt: "Lampu gantung di interior kedai dengan tulisan CAFE",
    code: "SP.04",
    label: "Setelah jam kerja",
    note: "Boleh membawa laptop sampai 21:00.",
    size: "wide",
  },
];

export default function SpaceGallery() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal from="up">
              <p className="eyebrow flex items-center gap-3 text-lime">
                <span className="inline-block h-1.5 w-1.5 bg-lime" />
                05 — Tempat kami
              </p>
            </Reveal>
            <Reveal from="up" delay={80}>
              <h2 className="display mt-5 text-[clamp(2rem,5vw,4.25rem)]">
                TEMPAT UNTUK
                <br />
                <span className="text-lime">BEKERJA LAMA</span>
              </h2>
            </Reveal>
          </div>

          <Reveal from="right" delay={140}>
            <p className="max-w-xs font-mono text-[11px] leading-relaxed text-mute">
              WiFi tersedia dari jam 7 pagi, dan colokan ada di
              setiap meja. Tidak ada yang perlu buru-buru.
            </p>
          </Reveal>
        </div>

        {/* Grid — asimetris, bukan grid 2x2 boring */}
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {SPACES.map((s, i) => {
            // Bento: kartu pertama besar 2x2, kartu terakhir melebar
            const span =
              s.size === "tall"
                ? "md:col-span-2 md:row-span-2"
                : s.size === "wide"
                  ? "md:col-span-2"
                  : "md:col-span-1";

            return (
              <Reveal
                key={s.code}
                from="scale"
                delay={i * 90}
                className={`group relative overflow-hidden border border-line ${span}`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className="img-zoom h-full min-h-52 w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-90" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <div>
                    <p className="font-mono text-[9px] tracking-widest text-lime">
                      {s.code}
                    </p>
                    <p className="display mt-1 text-lg leading-tight">
                      {s.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-mute">
                      {s.note}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-mute">
                    [{i + 1}/4]
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}