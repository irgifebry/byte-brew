"use client";

import { formatPrice } from "@/data/menu";

/**
 * Kartu produk. Foto besar di atas, nama serif, tasting notes,
 * dan harga. Tidak ada nomor urut — itu terbaca seperti katalog teknis.
 */
export default function MenuCard({ item, onSelect, className = "" }) {
  return (
    <article
      className={`hover-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card ${className}`}
    >
      {/* Image + fallback */}
      <div className="relative aspect-4/3 overflow-hidden bg-paper-2">
        <img
          src={item.img}
          alt={item.name}
          className="img-zoom h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {item.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold text-espresso shadow-sm backdrop-blur-sm">
            {item.tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-lg text-ink">{item.name}</h3>
          <span className="price shrink-0 text-ink">{formatPrice(item.price)}</span>
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
          {item.desc}
        </p>

        {item.notes?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {item.notes.map((n) => (
              <li
                key={n}
                className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-medium text-ink-2"
              >
                {n}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => onSelect?.(item)}
          className="mt-5 w-full rounded-full border border-line py-2.5 text-sm font-semibold text-ink transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
        >
          Pilih menu ini
        </button>
      </div>
    </article>
  );
}
