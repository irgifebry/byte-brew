"use client";

import { useMemo, useState } from "react";
import MenuCard from "@/components/MenuCard";
import OrderDialog from "@/components/OrderDialog";
import Reveal from "@/components/Reveal";
import { CATEGORIES, ITEMS, formatPrice } from "@/data/menu";

const TABS = [{ id: "all", label: "Semua" }, ...CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
}))];

export default function MenuPage() {
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);

  const shown = useMemo(
    () => (tab === "all" ? ITEMS : ITEMS.filter((i) => i.category === tab)),
    [tab]
  );

  const activeCat = CATEGORIES.find((c) => c.id === tab);
  const cheapest = Math.min(...ITEMS.map((i) => i.price));

  return (
    <>
      {/* --- Page header --- */}
      <section className="relative overflow-hidden border-b border-line bg-paper-2 pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="paper-tooth absolute inset-0 opacity-60" />

        <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
          <p className="eyebrow flex items-center gap-3 text-amber-dp">
            <span className="inline-block h-px w-8 bg-amber" />
            Daftar menu
          </p>
          <h1 className="display mt-5 text-[clamp(2.5rem,8vw,6rem)] text-ink">
            Pilih minuman yang Anda sukai.
          </h1>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink-2">
            Tersedia {ITEMS.length} pilihan menu, dengan harga mulai dari{" "}
            {formatPrice(cheapest)}. Jenis biji dapat berubah sesuai stok.
            Tanyakan kepada barista untuk mengetahui pilihan yang tersedia.
          </p>
        </div>
      </section>

      {/* --- Tabs --- */}
      <div className="sticky top-[65px] z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center gap-2 overflow-x-auto px-5 py-3 md:px-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? "bg-espresso text-cream"
                  : "bg-card text-ink-2 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}

          <span className="ml-auto hidden shrink-0 items-center pl-4 text-xs text-ink-2 md:flex">
            {shown.length} menu · mulai {formatPrice(cheapest)}
          </span>
        </div>
      </div>

      {/* --- Grid --- */}
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
        {activeCat && (
          <Reveal from="up">
            <p className="mb-10 max-w-lg text-[0.95rem] leading-relaxed text-ink-2">
              {activeCat.note}
            </p>
          </Reveal>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <Reveal key={item.id} from="up" delay={(i % 3) * 80}>
              <MenuCard
                item={item}
                onSelect={() => setSelected(item)}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>

        {/* Catatan */}
        <Reveal from="up" delay={120}>
          <div className="mt-14 grid gap-6 rounded-2xl border border-line bg-card p-6 md:grid-cols-2 md:p-8">
            <div>
              <h3 className="display text-lg text-ink">Informasi alergi</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Beberapa bahan dapat mengandung susu sapi, susu oat, atau
                kacang-kacangan. Hubungi barista sebelum memesan jika Anda
                memiliki alergi atau pantangan makanan.
              </p>
            </div>
            <div>
              <h3 className="display text-lg text-ink">Pilihan tambahan</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Extra shot dikenakan biaya Rp8k. Susu alternatif tersedia
                dengan tambahan Rp5k. Pilihan decaf tersedia tanpa biaya
                tambahan.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

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
