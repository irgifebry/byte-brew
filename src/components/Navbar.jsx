"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Background blur + border muncul saat scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup drawer saat pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll saat drawer terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Hero di beranda itu gelap (video), jadi navbar harus pakai teks terang
  // selama belum di-scroll dan drawer masih tertutup. Setelah di-scroll
  // navbar dapat latar krem, jadi kembali ke teks gelap.
  const onDark = pathname === "/" && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : onDark
              ? "border-b border-transparent"
              : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2">
            <span
              className={`display text-xl tracking-tight transition-colors md:text-2xl ${
                onDark ? "text-cream" : "text-ink"
              }`}
            >
              Bytebrew
            </span>
            <span
              className={`hidden text-[11px] font-medium tracking-wide transition-colors sm:inline ${
                onDark ? "text-cream-2" : "text-ink-3"
              }`}
            >
              coffee
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive(l.href)
                      ? onDark
                        ? "bg-cream text-espresso"
                        : "bg-espresso text-cream"
                      : onDark
                        ? "text-cream-2 hover:bg-white/10 hover:text-cream"
                        : "text-ink-2 hover:bg-paper-2 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={`btn hidden md:inline-flex ${
                onDark ? "border border-cream text-cream hover:bg-cream hover:text-espresso" : "btn-primary"
              }`}
            >
              Reservasi
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Buka menu navigasi"
              aria-expanded={open}
              className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border transition-colors md:hidden ${
                onDark ? "border-cream/40 bg-espresso/30" : "border-line bg-card"
              }`}
            >
              <span
                className={`block h-[1.5px] w-4 rounded-full transition-transform duration-300 ${
                  onDark ? "bg-cream" : "bg-ink"
                } ${
                  open ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 rounded-full transition-transform duration-300 ${
                  onDark ? "bg-cream" : "bg-ink"
                } ${
                  open ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-espresso/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 rounded-b-3xl bg-paper px-5 pt-24 pb-8 shadow-xl transition-transform duration-400 ease-out ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul className="space-y-1">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{ transitionDelay: open ? `${i * 50 + 100}ms` : "0ms" }}
                  className={`block rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  } ${
                    isActive(l.href)
                      ? "bg-espresso text-cream"
                      : "bg-card text-ink"
                  }`}
                >
                  <span className="display text-2xl">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-primary mt-6 w-full">
            Reservasi
          </Link>
        </div>
      </div>
    </>
  );
}
