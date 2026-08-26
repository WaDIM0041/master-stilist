import { useEffect, useRef } from "react";

/**
 * Золотая пыль: лёгкие мерцающие частицы, медленно
 * поднимающиеся по экрану. 2D-canvas, ~40 частиц.
 */
export default function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = Math.round(window.innerWidth * dpr);
      h = canvas.height = Math.round(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    interface P {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      ph: number;
      sp: number;
    }
    const N = 40;
    const ps: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (0.5 + Math.random() * 1.3) * dpr,
      vx: (Math.random() - 0.5) * 0.08 * dpr,
      vy: -(0.05 + Math.random() * 0.2) * dpr,
      ph: Math.random() * Math.PI * 2,
      sp: 0.4 + Math.random() * 0.8,
    }));

    let raf = 0;
    let t = 0;
    let running = true;

    const onVis = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;
        const tw = 0.5 + 0.5 * Math.sin(t * p.sp * 2 + p.ph);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 207, 154, ${0.04 + 0.15 * tw})`;
        ctx.fill();
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
