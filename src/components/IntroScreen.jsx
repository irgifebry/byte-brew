"use client";

import { useEffect, useState } from "react";

export default function IntroScreen() {
  const [phase, setPhase] = useState("playing");

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setPhase("leaving"), 5000);
    const removeTimer = window.setTimeout(() => {
      document.documentElement.classList.add("intro-done");
      window.dispatchEvent(new Event("intro:done"));
      setPhase("done");
    }, 5900);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`intro-screen${phase === "leaving" ? " intro-screen-leaving" : ""}`}
      aria-hidden="true"
    >
      <video
        className="intro-screen-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
      >
        <source src="/footage_hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
