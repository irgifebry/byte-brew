const fs = require("node:fs");
const intro = fs.readFileSync("src/components/IntroScreen.jsx", "utf8");
const reveal = fs.readFileSync("src/components/Reveal.jsx", "utf8");
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
console.log("PASS intro-gated slide-up UI animations");
