"use client";

import { useMemo, useState } from "react";
import MenuCard from "@/components/MenuCard";
import RetroDialog from "@/components/RetroDialog";
import Reveal from "@/components/Reveal";
import { CATEGORIES, ITEMS, formatPrice } from "@/data/menu";

const TABS = [{ id: "all", label: "All", index: "00" }, ...CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
  index: c.index,
}))];

export default function MenuPage() {
  const [tab, setTab] = useState("all");
  const [dialog, setDialog] = useState(null);

  const shown = useMemo(
    () => (tab === "all" ? ITEMS : ITEMS.filter((i) => i.category === tab)),
    [tab]
  );

  const activeCat = CATEGORIES.find((c) => c.id === tab);
  const cheapest = Math.min(...ITEMS.map((i) => i.price));

  return (
    <>
      {/* --- Page header --- */}
      <section className="grain relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="/still-tamping.jpg"
            alt=""
            className="h-full w-full object-cover opacity-25"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/90 to-void" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="eyebrow flex items-center gap-3 text-lime">
            <span className="inline-block h-1.5 w-1.5 bg-lime" />
            [02] — Daftar menu
          </p>
          <h1 className="display mt-5 text-[clamp(2.5rem,9vw,7.5rem)]">
            THE MENU<span className="cursor-block" />
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/60">
            {ITEMS.length} varian tersedia. Harga dalam ribuan rupiah,
            sudah termasuk pajak. Stok habis biasanya sekitar jam 15:00.
          </p>
        </div>
      </section>

      {/* --- Tabs --- */}
      <div className="sticky top-[65px] z-30 border-b border-line bg-void/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-5 py-3 md:px-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 border px-4 py-2 font-mono text-[11px] font-bold tracking-wider uppercase transition-colors ${
                tab === t.id
                  ? "border-lime bg-lime text-void"
                  : "border-line text-mute hover:border-lime hover:text-lime"
              }`}
            >
              <span className="mr-1.5 opacity-60">{t.index}</span>
              {t.label}
            </button>
          ))}

          <span className="ml-auto hidden shrink-0 items-center pl-4 font-mono text-[11px] text-mute md:flex">
            {shown.length} menu — mulai {formatPrice(cheapest)}
          </span>
        </div>
      </div>

      {/* --- Grid --- */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        {activeCat && (
          <Reveal from="up">
            <p className="mb-10 max-w-lg border-l-2 border-lime pl-4 font-mono text-xs leading-relaxed text-mute">
              <span className="text-lime">{activeCat.note}</span>
            </p>
          </Reveal>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <Reveal key={item.id} from="up" delay={(i % 3) * 80}>
              <MenuCard
                item={item}
                index={ITEMS.indexOf(item)}
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

        {/* Note */}
        <Reveal from="up" delay={120}>
          <div className="mt-14 border border-line bg-panel p-6">
            <p className="font-mono text-[11px] leading-relaxed text-mute">
              <span className="mr-2 text-lime">&gt;</span>
              <span className="text-cream">Informasi alergi:</span> susu oat,
              susu sapi, dan kacang-kacangan mungkin ada di dalam. Tanyakan
              ke barista bila kamu perlu tahu.
              <br />
              <span className="mr-2 text-lime">&gt;</span>
              <span className="text-cream">Tambahan:</span> extra shot
              +8k, susu alternatif +5k, decaf gratis.
            </p>
          </div>
        </Reveal>
      </div>

      <RetroDialog
        open={!!dialog}
        onClose={() => setDialog(null)}
        title={dialog?.title}
        lines={dialog?.lines}
      />
    </>
  );
}