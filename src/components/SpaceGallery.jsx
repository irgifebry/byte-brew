import Reveal from "./Reveal";

const SPACES = [
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
    alt: "Barista menuang air panas ke filter pour-over di brew bar",
    label: "Bar kopi",
    note: "Lihat proses penyeduhan dari dekat.",
    size: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80",
    alt: "Meja kayu bulat dengan french press dan cangkir di dekat jendela",
    label: "Meja bersama",
    note: "Tersedia untuk hingga empat orang.",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    alt: "Tiga tangan memegang cangkir kopi bersulang",
    label: "Pelanggan tetap",
    note: "Acara kopi diadakan setiap Jumat malam.",
    size: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80",
    alt: "Lampu gantung hangat di interior kedai",
    label: "Menjelang malam",
    note: "Buka hingga pukul 22.00.",
    size: "wide",
  },
];

export default function SpaceGallery() {
  return (
    <section className="border-b border-line bg-paper-2">
      <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal from="up">
              <p className="eyebrow flex items-center gap-3 text-amber-dp">
                <span className="inline-block h-px w-8 bg-amber" />
                Tempat kami
              </p>
            </Reveal>
            <Reveal from="up" delay={80}>
              <h2 className="display mt-5 text-[clamp(2rem,5vw,3.75rem)] text-ink">
                Ruang nyaman untuk menikmati kopi.
              </h2>
            </Reveal>
          </div>

          <Reveal from="right" delay={140}>
            <p className="max-w-xs text-sm leading-relaxed text-ink-2">
              Area bar dekat jendela menjadi salah satu tempat yang nyaman.
              Suasana biasanya lebih ramai pada sore hari.
            </p>
          </Reveal>
        </div>

        {/* Grid asimetris */}
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {SPACES.map((s, i) => {
            const span =
              s.size === "tall"
                ? "md:col-span-2 md:row-span-2"
                : s.size === "wide"
                  ? "md:col-span-2"
                  : "md:col-span-1";

            return (
              <Reveal
                key={s.label}
                from="scale"
                delay={i * 90}
                className={`group relative overflow-hidden rounded-2xl ${span}`}
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
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="display text-lg text-cream">{s.label}</p>
                  <p className="mt-0.5 text-[13px] text-cream-2">{s.note}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
