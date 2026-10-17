"use client";

import { useEffect, useRef } from "react";

/**
 * Brutalist retro confirm dialog — throwback ke dialog window 90-an.
 * Dipakai untuk booking / add-to-cart yang belum ada backend.
 */
export default function RetroDialog({
  open,
  onClose,
  title = "CONFIRM ACTION",
  lines = [],
  confirmLabel = "[ OK ]",
  cancelLabel = "[ CANCEL ]",
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
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
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
        className="animate-dialog-in grain relative w-full max-w-md border-2 border-lime bg-panel shadow-brutal-lg outline-none"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b-2 border-lime bg-lime px-4 py-2">
          <span className="font-mono text-xs font-bold tracking-widest text-void uppercase">
            {title}
          </span>
          <span className="font-mono text-xs font-bold text-void">_ □ ×</span>
        </div>

        {/* Body */}
        <div className="space-y-3 px-5 py-5 font-mono text-[13px] leading-relaxed text-cream">
          {lines.map((l, i) => (
            <p key={i}>
              <span className="mr-2 text-lime-dim">&gt;</span>
              {l}
            </p>
          ))}
          <p className="pt-1 text-mute">
            <span className="mr-2 text-lime-dim">&gt;</span>
            <span className="cursor-block" />
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-line px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs tracking-wider text-mute transition-colors hover:text-cream"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onClose?.();
            }}
            autoFocus
            className="border border-lime bg-lime px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-void transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}