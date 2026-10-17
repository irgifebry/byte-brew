import Link from "next/link";
import { INFO } from "@/data/menu";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      {/* Oversized wordmark */}
      <div className="overflow-hidden border-b border-line px-5 py-10 md:px-8">
        <p className="display translate-y-[0.14em] text-center text-[16vw] leading-none text-line-2 select-none">
          BYTE//BREW
        </p>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-12 md:grid-cols-4 md:px-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="display text-xl">
            BYTE<span className="text-lime">//</span>BREW
          </p>
          <p className="mt-2 max-w-xs font-mono text-xs leading-relaxed text-mute">
            {INFO.tagline}
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-widest text-mute uppercase">
            <span className="mr-2 inline-block h-1.5 w-1.5 bg-lime align-middle" />
            Buka setiap hari
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className="eyebrow mb-4 text-lime-dim">Navigasi</p>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Beranda" },
              { href: "/menu", label: "Menu" },
              { href: "/about", label: "Tentang" },
              { href: "/contact", label: "Kontak" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-mono text-xs text-mute transition-colors hover:text-lime"
                >
                  /{l.label.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="eyebrow mb-4 text-lime-dim">Jam buka</p>
          <ul className="space-y-2 font-mono text-xs">
            {INFO.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="text-cream">{h.day}</span>
                <span className="text-mute">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col gap-3 border-t border-line px-5 py-5 font-mono text-[10px] tracking-wider text-mute uppercase md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} BYTE//BREW — Seluruh hak cipta dilindungi</p>
        <div className="flex flex-wrap gap-4">
          {INFO.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="transition-colors hover:text-lime"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}