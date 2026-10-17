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

    // Reduced motion → langsung tampil
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
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

    // Safety net: kalau observer tidak pernah trigger (mis. container
    // punya transform / overflow aneh), tampilkan setelah 2.5 detik
    // supaya konten tidak pernah hilang permanen.
    const failsafe = setTimeout(() => {
      setVisible(true);
      obs.disconnect();
    }, 2500);

    return () => {
      clearTimeout(failsafe);
      obs.disconnect();
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