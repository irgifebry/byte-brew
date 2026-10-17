"use client";

import { useEffect, useRef } from "react";

/**
 * Dialog konfirmasi sederhana untuk aksi yang belum punya backend
 * (tambah pesanan, kirim booking).
 */
export default function OrderDialog({
  open,
  onClose,
  title = "Pesanan dicatat",
  itemName,
  price,
  children,
}) {
  const panelRef = useRef(null);

  // Esc untuk tutup + lock scroll
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-espresso/45 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="animate-dialog-in w-full max-w-md rounded-2xl border border-line bg-card p-6 shadow-2xl outline-none md:p-7"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-2 text-xl">
          ☕
        </span>

        <h2 className="display mt-4 text-2xl text-ink">{title}</h2>

        {itemName && (
          <div className="mt-4 flex items-baseline justify-between rounded-xl bg-paper-2 px-4 py-3">
            <span className="text-sm font-semibold text-ink">{itemName}</span>
            {price && <span className="price text-ink">{price}</span>}
          </div>
        )}

        <div className="mt-4 space-y-2 text-sm leading-relaxed text-ink-2">
          {children || (
            <p>
              Pemesanan online belum tersedia. Silakan datang ke kedai atau
              hubungi kami melalui telepon dan Instagram.
            </p>
          )}
        </div>

        <div className="mt-7 flex gap-3">
          <button type="button" onClick={onClose} className="btn btn-outline flex-1">
            Tutup
          </button>
          <a href="/contact" className="btn btn-primary flex-1">
            Reservasi
          </a>
        </div>
      </div>
    </div>
  );
}
