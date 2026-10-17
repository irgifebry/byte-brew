import Reveal from "./Reveal";

const QUOTES = [
  {
    quote:
      "Tempat pertama yang minsumnya benar-benar enak, bukan cuma enak dilihat.",
    name: "Raka P.",
    role: "Pelanggan tetap",
    index: "01",
  },
  {
    quote:
      "Cold brew-nya beneran cold brew, bukan cokelat dingin. Jarang ada kedai yang begini.",
    name: "Nadia S.",
    role: "Designer",
    index: "02",
  },
  {
    quote:
      "Booking jam 8 pagi, tempatnya tenang, pulang dengan kepala lebih ringan.",
    name: "Dimas A.",
    role: "Guru",
    index: "03",
  },
];

export default function Testimonials() {
  return (
    <section className="border-b border-line bg-panel">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <Reveal from="up">
          <p className="eyebrow flex items-center gap-3 text-lime">
            <span className="inline-block h-1.5 w-1.5 bg-lime" />
            06 — Reviews
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.index} from="up" delay={i * 110}>
              <figure className="hover-lift relative flex h-full flex-col border border-line bg-void p-6">
                <span className="display text-5xl leading-none text-lime/20 select-none">
                  “
                </span>

                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-cream/85">
                  {q.quote}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-lime bg-lime/10 font-mono text-xs font-bold text-lime">
                    {q.name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-xs font-bold tracking-wider">
                      {q.name}
                    </span>
                    <span className="block truncate font-mono text-[10px] text-mute">
                      {q.role}
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-lime-dim">
                    [{q.index}]
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