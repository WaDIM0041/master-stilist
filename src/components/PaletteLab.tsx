import { useState } from "react";
import { SEASON_PALETTES } from "../data/content";
import { useModal } from "./Modal";

/**
 * Палитры внешности — единственный раздел, где монохром
 * уступает место цвету: сезонные карты стиля.
 */
export default function PaletteLab() {
  const { open } = useModal();
  const [activeId, setActiveId] = useState("summer");
  const palette = SEASON_PALETTES.find((p) => p.id === activeId) ?? SEASON_PALETTES[1];

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
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
            <p className="max-w-md text-sm leading-relaxed text-ink/60 lg:mt-12" data-reveal>
              Четыре сезонных колорита — и двенадцать подтипов внутри них.
              Найдите тот, рядом с которым кожа светится, а не спорит. Это
              единственное место платформы, где мы позволяем себе цвет.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Переключатель сезонов */}
          <div className="lg:col-span-4">
            <ul className="border-t border-lined" data-reveal>
              {SEASON_PALETTES.map((p, i) => (
                <li key={p.id}>
                  <button
                    onClick={() => setActiveId(p.id)}
                    className={`group flex w-full items-baseline justify-between border-b border-lined py-5 text-left transition-all duration-300 ${
                      activeId === p.id ? "pl-4" : "hover:pl-2"
                    }`}
                  >
                    <span
                      className={`display text-4xl transition-colors duration-300 sm:text-5xl ${
                        activeId === p.id ? "italic text-ink" : "text-ink/35"
                      }`}
                    >
                      {p.name}
                    </span>
                    <span
                      className={`label text-[9px] transition-colors ${
                        activeId === p.id ? "text-ink/60" : "text-ink/30"
                      }`}
                    >
                      0{i + 1} · {p.code}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => open("personal")}
              className="label mt-8 w-full border border-gold-deep/60 py-4 text-[10px] text-gold-deep transition-colors duration-300 hover:bg-gold-deep hover:text-paper"
              data-reveal
            >
              Определить свой колорит
            </button>
          </div>

          {/* Активная палитра */}
          <div className="lg:col-span-7 lg:col-start-6">
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
                  <button
                    key={c.hex}
                    className="group/sw flex flex-col items-stretch gap-2 text-left"
                    style={{ animation: `rise 0.7s cubic-bezier(0.22,0.61,0.36,1) ${i * 60}ms both` }}
                    title={`${c.name} · ${c.hex}`}
                  >
                    <span
                      className="aspect-square w-full border border-ink/10 transition-transform duration-300 group-hover/sw:scale-[1.04]"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="label text-[8px] leading-tight text-ink/55">
                      {c.name}
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-ink/35">
                      {c.hex}
                    </span>
                  </button>
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
