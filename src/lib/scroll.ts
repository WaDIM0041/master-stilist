import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Инициализация единого экземпляра Lenis, синхронизированного с GSAP ticker */
export function initSmoothScroll(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    touchMultiplier: 1.4,
  });
  lenis.on("scroll", () => ScrollTrigger.update());
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Программный скролл к секции по селектору */
export function scrollToSection(selector: string) {
  if (lenis) {
    lenis.scrollTo(selector, { duration: 1.5, offset: 0 });
  } else {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  }
}
