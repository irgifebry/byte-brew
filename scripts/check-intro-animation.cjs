const fs = require("node:fs");
const intro = fs.readFileSync("src/components/IntroScreen.jsx", "utf8");
const reveal = fs.readFileSync("src/components/Reveal.jsx", "utf8");
const hero = fs.readFileSync("src/components/Hero.jsx", "utf8");
const layout = fs.readFileSync("src/app/layout.jsx", "utf8");
const css = fs.readFileSync("src/app/globals.css", "utf8");

if (!intro.includes('classList.add("intro-done")')) {
  throw new Error("Intro must unlock UI animations after playback");
}
if (!intro.includes('new Event("intro:done")')) {
  throw new Error("Intro must signal completion before revealing UI");
}
if (!reveal.includes('addEventListener("intro:done"')) {
  throw new Error("Reveal observers must wait for intro completion");
}
if (!reveal.includes('data-reveal-nested')) {
  throw new Error("Nested reveal wrappers must not animate independently");
}
if (!css.includes('html.intro-done.js [data-reveal]:not([data-reveal-nested])')) {
  throw new Error("Reveal animations must wait until intro ends");
}
if (!css.includes("@keyframes reveal-slide-up")) {
  throw new Error("UI components need slide-up animation");
}
if (css.includes("@media (prefers-reduced-motion: reduce)")) {
  throw new Error("Animations must not be disabled by reduced-motion preference");
}
if (reveal.includes("prefers-reduced-motion")) {
  throw new Error("Reveal must not disable motion based on reduced-motion preference");
}

/* Video hero harus lanjut dari frame terakhir intro, bukan dari nol.
   `intro:done` hanya berarti "UI boleh muncul" (dan juga dipancarkan
   jaring pengaman di layout.jsx), jadi hero tidak boleh menyalakan
   playback dari sana — itu bikin video mundur ~1-2 detik di tengah
   transisi. */
if (!hero.includes('window.addEventListener("intro:prepare"')) {
  throw new Error("Hero must wait for intro:prepare before syncing its video");
}
if (!hero.includes('window.addEventListener("intro:reveal"')) {
  throw new Error("Hero must start playback on intro:reveal, not before");
}
if (/addEventListener\("intro:done",\s*(onReveal|onReady|start|arm)\)/.test(hero)) {
  throw new Error("intro:done must not start hero playback (it fires before the intro ends)");
}
if (!hero.includes("dataset.introTime")) {
  throw new Error("Hero must continue from the intro's frozen frame, not from 0");
}

/* Jaring pengaman layout.jsx harus lewat setelah hold intro (3960ms)
   selesai, kalau tidak ia memotong transisi di tengah jalan. */
const failsafe = layout.match(/setTimeout\(function\(\)\{[\s\S]*?\},(\d+)\)/);
if (!failsafe) {
  throw new Error("Layout failsafe must stay in place");
}
if (Number(failsafe[1]) <= 3960) {
  throw new Error(
    `Layout failsafe (${failsafe[1]}ms) fires before the intro hold (3960ms) ends`
  );
}
if (!layout.includes("intro:failed")) {
  throw new Error("Layout failsafe must signal intro:failed instead of hijacking playback");
}

/* Node yang dirender React (`.intro-screen`) tidak boleh dicabut dari DOM
   lewat `remove()` / removeChild di luar React. Kalau dipaksa, reconcile
   berikutnya memanggil removeChild pada node yang sudah tidak lagi anak
   dari body → NotFoundError. Set class, jangan remove. */
for (const [name, src] of [["layout.jsx", layout], ["IntroScreen.jsx", intro], ["Hero.jsx", hero]]) {
  if (/\.remove\(\)|removeChild\(/.test(src)) {
    throw new Error(
      `${name} must not remove React-owned DOM nodes directly (use a class, let React unmount)`
    );
  }
}

console.log("PASS intro-gated slide-up UI animations");
