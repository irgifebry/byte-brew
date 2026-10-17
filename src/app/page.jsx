"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import MenuCard from "@/components/MenuCard";
import SpaceGallery from "@/components/SpaceGallery";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import OrderDialog from "@/components/OrderDialog";
import Reveal from "@/components/Reveal";
import { FEATURED_IDS, ITEMS, formatPrice } from "@/data/menu";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const featured = FEATURED_IDS.map((id) => ITEMS.find((i) => i.id === id)).filter(
    Boolean
  );

  return (
    <>
      <Hero />
      <Story />

      {/* --- Featured menu --- */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal from="up">
                <p className="eyebrow flex items-center gap-3 text-amber-dp">
                  <span className="inline-block h-px w-8 bg-amber" />
                  Menu unggulan
                </p>
              </Reveal>
              <Reveal from="up" delay={80}>
                <h2 className="display mt-5 text-[clamp(2rem,5vw,3.75rem)] text-ink">
                  Pilihan favorit pelanggan.
                </h2>
              </Reveal>
            </div>

            <Reveal from="right" delay={140}>
              <Link href="/menu" className="btn btn-outline">
                Lihat seluruh menu
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item, i) => (
              <Reveal key={item.id} from="up" delay={i * 90}>
                <MenuCard
                  item={item}
                  onSelect={() => setSelected(item)}
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

      <OrderDialog
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Pesanan belum tersedia online"
        itemName={selected?.name}
        price={selected ? formatPrice(selected.price) : null}
      />
    </>
  );
}
