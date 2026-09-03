import { useRef, useState } from "react";
import { SEASON_SUBTYPES } from "../data/content";
import { useModal } from "./Modal";

const SEASON_ORDER = ["Весна", "Лето", "Осень", "Зима"] as const;

/**
 * Палитры внешности — 12 сезонных подтипов. Единственный раздел с цветом.
 * На мобильном при выборе подтипа взгляд «проваливается» в раскладку цвета.
 */
export default function PaletteLab() {
  const { open } = useModal();
  const [activeId, setActiveId] = useState("summer-soft");
  const paletteRef = useRef<HTMLDivElement>(null);
  const palette =
    SEASON_SUBTYPES.find((p) => p.id === activeId) ?? SEASON_SUBTYPES[0];

  const select = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() =>
        paletteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        {/* Заголовок */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-gold-deep" data-reveal>06 / Колористика</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Палитры <em className="italic text-gold-deep">внешности</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <p
              className="max-w-md text-sm leading-relaxed text-ink/60 lg:mt-12"
              data-reveal
            >
              Двенадцать колоритов — по три внутри каждого сезона. Выбери подтип
              и смотри, какая палитра, контраст и металл тебе к лицу. Это
              единственное место, где мы позволяем себе цвет.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Селектор: 12 подтипов, сгруппированы по сезонам */}
          <div className="lg:col-span-5" data-reveal>
            {SEASON_ORDER.map((season) => (
              <div key={season} className="mb-6">
                <p className="label mb-3 text-[10px] text-ink/40">{season}</p>
                <div className="flex flex-wrap gap-2">
                  {SEASON_SUBTYPES.filter((p) => p.season === season).map((p) => {
                    const on = activeId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => select(p.id)}
                        aria-pressed={on}
                        className={`label rounded-full border px-4 py-2.5 text-[10px] transition-all duration-300 ${
                          on
                            ? "border-gold-deep bg-gold-deep text-paper"
                            : "border-lined text-ink/60 hover:border-gold-deep/50 hover:text-ink"
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Подсказка на мобильном */}
            <p className="label mt-1 text-[9px] text-ink/35 lg:hidden">
              нажми подтип — палитра появится ниже ↓
            </p>

            <button
              onClick={() => open("personal")}
              className="label mt-6 w-full border border-gold-deep/60 py-4 text-[10px] text-gold-deep transition-colors duration-300 hover:bg-gold-deep hover:text-paper"
              data-reveal
            >
              Определить свой колорит
            </button>
          </div>

          {/* Активная палитра */}
          <div
            className="lg:col-span-6 lg:col-start-7"
            ref={paletteRef}
            style={{ scrollMarginTop: "88px" }}
          >
            <div key={palette.id} className="animate-rise">
              <div className="flex items-baseline justify-between">
                <p className="label text-ink/45">{palette.code}</p>
                <p className="label text-[9px] text-ink/40">
                  {palette.colors.length} оттенков
                </p>
              </div>
              <p className="display mt-3 text-3xl italic sm:text-4xl">
                {palette.name}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
                {palette.desc}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {palette.colors.map((c, i) => (
                  <div
                    key={c.hex + i}
                    className="flex flex-col items-stretch gap-2 text-left"
                    style={{
                      animation: `rise 0.6s cubic-bezier(0.22,0.61,0.36,1) ${i * 50}ms both`,
                    }}
                    title={`${c.name} · ${c.hex}`}
                  >
                    <span
                      className="aspect-square w-full border border-ink/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="label text-[8px] leading-tight text-ink/55">
                      {c.name}
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-ink/35">
                      {c.hex}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-px border border-lined bg-lined sm:grid-cols-3">
                {[
                  ["Контраст", palette.contrast],
                  ["Металл", palette.metal],
                  ["Избегать", palette.avoid],
                ].map(([t, v]) => (
                  <div key={t} className="bg-paper p-5">
                    <p className="label text-[9px] text-ink/40">{t}</p>
                    <p
                      className={`display mt-2 text-xl italic ${
                        t === "Металл" ? "text-gold-deep" : "text-ink"
                      }`}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
