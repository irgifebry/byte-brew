import Reveal from "./Reveal";

const QUOTES = [
  {
    quote:
      "Minumannya terasa nikmat, bukan hanya menarik dilihat.",
    name: "Raka P.",
  },
  {
    quote:
      "Cold brew-nya terasa autentik dan berbeda dari minuman cokelat dingin. Tidak banyak kedai yang menyajikannya seperti ini.",
    name: "Nadia S.",
  },
  {
    quote:
      "Saya memesan tempat pukul 8 pagi. Suasananya tenang dan membuat saya merasa lebih rileks.",
    name: "Dimas A.",
  },
];

export default function Testimonials() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <Reveal from="up">
          <p className="eyebrow flex items-center gap-3 text-amber-dp">
            <span className="inline-block h-px w-8 bg-amber" />
            Ulasan pelanggan
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} from="up" delay={i * 110}>
              <figure className="hover-lift flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                <span
                  aria-hidden="true"
                  className="display text-4xl leading-none text-amber"
                >
                  &ldquo;
                </span>

                <blockquote className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink">
                  {q.quote}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso text-xs font-semibold text-cream">
                    {q.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {q.name}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
