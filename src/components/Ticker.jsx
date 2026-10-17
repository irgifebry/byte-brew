/**
 * Infinite marquee.
 * `items` di-render dua kali agar loop seamless (translate -50%).
 */
export default function Ticker({
  items = [],
  speed = "normal",
  className = "",
}) {
  if (!items.length) return null;

  const run = items.map((t, i) => (
    <span key={i} className="flex shrink-0 items-center">
      <span className="px-6 whitespace-nowrap">{t}</span>
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-amber opacity-70"
      />
    </span>
  ));

  return (
    <div
      className={`marquee-track overflow-hidden border-y border-line bg-paper-2 py-3.5 ${className}`}
    >
      <div
        className={`flex w-max ${
          speed === "fast" ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        <div className="flex shrink-0 eyebrow text-ink-2">{run}</div>
        <div className="flex shrink-0 eyebrow text-ink-2">{run}</div>
      </div>
    </div>
  );
}