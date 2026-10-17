import Link from "next/link";
import { INFO } from "@/data/menu";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
];

export default function Footer() {
  return (
    <footer className="on-dark border-t border-line-dk">
      {/* Oversized wordmark */}
      <div className="overflow-hidden px-5 py-10 md:px-8">
        <p className="display translate-y-[0.12em] text-center text-[16vw] leading-none text-cream/10 select-none">
          Bytebrew
        </p>
      </div>

      <div className="mx-auto grid max-w-[1240px] gap-10 border-t border-line-dk px-5 py-12 md:grid-cols-4 md:px-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="display text-2xl text-cream">Bytebrew</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream-2">
            {INFO.tagline}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line-dk px-3 py-1.5 text-xs font-medium text-cream-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-lt" />
            Buka setiap hari
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className="eyebrow mb-4 text-cream-2/70">Halaman</p>
          <ul className="space-y-2">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-cream-2 transition-colors hover:text-amber-lt"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="eyebrow mb-4 text-cream-2/70">Jam buka</p>
          <ul className="space-y-2 text-sm">
            {INFO.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="text-cream-2">{h.day}</span>
                <span className="price text-cream">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col gap-3 border-t border-line-dk px-5 py-5 text-xs text-cream-2/80 md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} Bytebrew — Seluruh hak cipta dilindungi</p>
        <div className="flex flex-wrap gap-4">
          {INFO.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="transition-colors hover:text-amber-lt"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}