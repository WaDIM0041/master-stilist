import { useEffect, useState } from "react";

/** Сквозная золотая «нить прогресса» — визуальный шлейф на каждом экране. */
export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const calc = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0);
    };
    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, []);

  const pct = `${(p * 100).toFixed(2)}%`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-[10px] top-0 z-[115] hidden h-screen w-px md:block"
    >
      {/* тонкий трек */}
      <div className="absolute inset-0 bg-gold/12" />
      {/* заполнение — сама «нить» */}
      <div
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-gold-soft via-gold to-gold-deep"
        style={{ height: pct }}
      />
      {/* светящаяся точка на текущем месте */}
      <div
        className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft shadow-[0_0_12px_3px_rgba(201,164,92,0.55)]"
        style={{ top: pct }}
      />
    </div>
  );
}
