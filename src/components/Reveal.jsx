"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll reveal wrapper.
 * Menambahkan class `is-visible` saat elemen masuk viewport.
 *
 * @param {object} props
 * @param {"up"|"left"|"right"|"scale"} [props.from] arah masuk
 * @param {number}  [props.delay] delay dalam ms
 * @param {string}  [props.className]
 * @param {React.ReactNode} [props.children]
 */
export default function Reveal({
  from = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (el.parentElement?.closest("[data-reveal]")) {
      el.setAttribute("data-reveal-nested", "");
      setVisible(true);
      return;
    }

    let obs;
    let failsafe;
    const observe = () => {
      if (obs) return;
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      obs.observe(el);
      failsafe = window.setTimeout(() => {
        setVisible(true);
        obs.disconnect();
      }, 1200);
    };

    if (document.documentElement.classList.contains("intro-done")) observe();
    else window.addEventListener("intro:done", observe, { once: true });

    return () => {
      window.removeEventListener("intro:done", observe);
      window.clearTimeout(failsafe);
      obs?.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={from}
      className={`${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
