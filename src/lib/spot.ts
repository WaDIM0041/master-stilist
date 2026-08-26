import type { MouseEvent } from "react";

/**
 * Спецэффект блока: золотое свечение, следующее за курсором.
 * Используется вместе с CSS-классом `.spot` — записывает
 * позицию курсора в CSS-переменные без ре-рендера React.
 */
export function spotMove<T extends HTMLElement>(e: MouseEvent<T>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--sx", `${e.clientX - r.left}px`);
  el.style.setProperty("--sy", `${e.clientY - r.top}px`);
}
