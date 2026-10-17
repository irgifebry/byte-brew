"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Story from "@/components/Story";
import MenuCard from "@/components/MenuCard";
import SpaceGallery from "@/components/SpaceGallery";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import RetroDialog from "@/components/RetroDialog";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { FEATURED_IDS, ITEMS, formatPrice } from "@/data/menu";

const TICKER = [
  "Biji pilihan",
  "Roasting setiap hari",
  "Buka sampai malam",
  "Direct trade",
  "Batch kecil",
  "Boleh bawa laptop",
];

export default function Home() {
  const [dialog, setDialog] = useState(null);
  const featured = FEATURED_IDS.map((id) => ITEMS.find((i) => i.id === id)).filter(Boolean);

  return (
    <>
      <Hero />
      <Ticker items={TICKER} />

      <Story />

      {/* --- Featured menu --- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal from="up">
                <p className="eyebrow flex items-center gap-3 text-lime">
                  <span className="inline-block h-1.5 w-1.5 bg-lime" />
                  04 — Menu unggulan
                </p>
              </Reveal>
              <Reveal from="up" delay={80}>
                <h2 className="display mt-5 text-[clamp(2rem,5vw,4.25rem)]">
                  PALING
                  <br />
                  <span className="text-lime">LARIS DISERUPANI</span>
                </h2>
              </Reveal>
            </div>

            <Reveal from="right" delay={140}>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-xs font-bold tracking-wider uppercase transition-colors hover:border-lime hover:text-lime"
              >
                Lihat semua menu
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item, i) => (
              <Reveal key={item.id} from="up" delay={i * 90}>
                <MenuCard
                  item={item}
                  index={i}
                  onSelect={() =>
                    setDialog({
                      title: "TAMBAH KE PESANAN",
                      lines: [
                        `item: ${item.name}`,
                        `price: ${formatPrice(item.price)}`,
                        "",
                        "Pesanan belum bisa diproses online.",
                        "Silakan pesan langsung di tempat.",
                      ],
                    })
                  }
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SpaceGallery />
      <Testimonials />
      <CtaBanner />

      <RetroDialog
        open={!!dialog}
        onClose={() => setDialog(null)}
        title={dialog?.title}
        lines={dialog?.lines}
      />
    </>
  );
}