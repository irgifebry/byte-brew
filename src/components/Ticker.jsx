/**
 * Infinite marquee ticker.
 * `items` di-render dua kali agar loop seamless (translate -50%).
 */
export default function Ticker({
  items = [],
  speed = "normal",
  className = "",
  separator = "//",
}) {
  if (!items.length) return null;

  const run = items.map((t, i) => (
    <span key={i} className="flex shrink-0 items-center">
      <span className="px-5 whitespace-nowrap">{t}</span>
      <span className="text-lime">{separator}</span>
    </span>
  ));

  return (
    <div className={`marquee-track overflow-hidden border-y border-line py-3 ${className}`}>
      <div
        className={`flex w-max ${
          speed === "fast" ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        <div className="flex shrink-0 font-mono text-[11px] tracking-[0.2em] text-mute uppercase">
          {run}
        </div>
        <div className="flex shrink-0 font-mono text-[11px] tracking-[0.2em] text-mute uppercase">
          {run}
        </div>
      </div>
    </div>
  );
}