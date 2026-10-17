"use client";

import { formatPrice } from "@/data/menu";

const TAG_STYLE = {
  "best seller": "bg-lime text-void",
  cheapest: "bg-cream text-void",
  popular: "bg-lime text-void",
  new: "border border-lime text-lime",
};

/**
 * Kartu produk. `index` dipakai sebagai nomor besar di kartu.
 */
export default function MenuCard({ item, index = 0, onSelect, className = "" }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group hover-lift relative flex flex-col border border-line bg-panel ${className}`}
    >
      {/* Image + fallback gradient */}
      <div className="relative aspect-4/3 overflow-hidden bg-gradient-to-br from-line via-panel-2 to-void">
        <img
          src={item.img}
          alt={item.name}
          className="img-zoom h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Big number watermark */}
        <span className="pointer-events-none absolute -bottom-3 left-2 display text-[5rem] leading-none text-void/60 select-none">
          {num}
        </span>

        {item.tag && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 font-mono text-[9px] font-bold tracking-widest uppercase ${
              TAG_STYLE[item.tag] || "border border-line text-cream"
            }`}
          >
            {item.tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-lg leading-tight">{item.name}</h3>
          <span className="shrink-0 font-mono text-sm font-bold text-lime">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-2 flex-1 font-mono text-[11px] leading-relaxed text-mute">
          {item.desc}
        </p>

        <button
          type="button"
          onClick={() => onSelect?.(item)}
          className="mt-5 w-full border border-line py-2.5 font-mono text-[10px] font-bold tracking-widest text-cream uppercase transition-colors hover:border-lime hover:bg-lime hover:text-void"
        >
          + Tambah
        </button>
      </div>
    </article>
  );
}