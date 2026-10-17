import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section className="on-dark grain relative overflow-hidden">
      <div className="paper-tooth absolute inset-0 opacity-[0.35]" />

      <div className="relative mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <Reveal from="up">
          <p className="eyebrow text-amber-lt">Nikmati kopi di Bytebrew</p>
        </Reveal>

        <Reveal from="up" delay={80}>
          <h2 className="display mt-5 max-w-[18ch] text-[clamp(2.25rem,7vw,5.5rem)] text-cream">
            Rencanakan kunjungan Anda.
          </h2>
        </Reveal>

        <Reveal from="up" delay={160}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Reservasi
            </Link>
            <Link href="/menu" className="btn btn-outline">
              Lihat menu
            </Link>
          </div>
        </Reveal>

        <Reveal from="up" delay={220}>
          <p className="mt-10 max-w-md text-sm leading-relaxed text-cream-2">
            Untuk rombongan lebih dari enam orang, silakan hubungi kami
            melalui WhatsApp terlebih dahulu. Kapasitas tempat terbatas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
