import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-lime">
      <div className="absolute inset-0 grid-lines opacity-20" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <Reveal from="up">
          <p className="font-mono text-[10px] tracking-[0.25em] text-void/60 uppercase">
            [07] — langkah berikutnya
          </p>
        </Reveal>

        <Reveal from="up" delay={80}>
          <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.25rem,8vw,7rem)] text-void">
            BOOK A TABLE
            <br />
            THIS WEEK<span className="cursor-block bg-void" />
          </h2>
        </Reveal>

        <Reveal from="up" delay={160}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="border-2 border-void bg-void px-7 py-3.5 font-mono text-xs font-bold tracking-wider text-lime uppercase transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book a table →
            </Link>
            <Link
              href="/menu"
              className="border-2 border-void px-7 py-3.5 font-mono text-xs font-bold tracking-wider text-void uppercase transition-colors hover:bg-void hover:text-lime"
            >
              See the menu
            </Link>
          </div>
        </Reveal>

        {/* Decorative code comment */}
        <p className="mt-14 font-mono text-[10px] text-void/40">
        </p>
      </div>
    </section>
  );
}