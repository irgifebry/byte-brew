"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Beranda", index: "01" },
  { href: "/menu", label: "Menu", index: "02" },
  { href: "/about", label: "Tentang", index: "03" },
  { href: "/contact", label: "Kontak", index: "04" },
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

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-void/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-1.5">
            <span className="display text-lg tracking-tight text-cream transition-colors group-hover:text-lime md:text-xl">
              BYTE<span className="text-lime">//</span>BREW
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative px-3 py-2 font-mono text-xs tracking-wider uppercase transition-colors ${
                    isActive(l.href)
                      ? "text-lime"
                      : "text-mute hover:text-cream"
                  }`}
                >
                  <span className="mr-1.5 text-[10px] opacity-50">{l.index}</span>
                  {l.label}
                  {isActive(l.href) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-lime" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden border border-lime px-4 py-2 font-mono text-[11px] font-bold tracking-wider text-lime uppercase transition-all hover:bg-lime hover:text-void md:inline-block"
            >
              Pesan meja
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line md:hidden"
            >
              <span
                className={`block h-px w-4 bg-cream transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-4 bg-cream transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
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
          className={`absolute inset-0 bg-void/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 border-b border-line bg-void px-5 pb-8 pt-24 transition-transform duration-400 ease-out ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul className="space-y-1">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{ transitionDelay: open ? `${i * 50 + 100}ms` : "0ms" }}
                  className={`flex items-baseline gap-4 border-b border-line py-4 transition-all duration-300 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  } ${isActive(l.href) ? "text-lime" : "text-cream"}`}
                >
                  <span className="font-mono text-[10px] text-mute">{l.index}</span>
                  <span className="display text-3xl">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-6 block border border-lime bg-lime px-4 py-3 text-center font-mono text-xs font-bold tracking-wider text-void uppercase"
          >
            Pesan meja
          </Link>
        </div>
      </div>
    </>
  );
}