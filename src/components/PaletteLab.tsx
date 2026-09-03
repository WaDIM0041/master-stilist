import { useState } from "react";
import { SEASON_SUBTYPES } from "../data/content";
import { useModal } from "./Modal";

const SEASON_ORDER = ["Весна", "Лето", "Осень", "Зима"] as const;

/**
 * Палитры внешности — 12 сезонных подтипов.
 * Аккордеон: каждая кнопка открывает свою палитру прямо под собой —
 * одинаково на десктопе и на мобильном. Тёмный тон в цвет всему сайту,
 * на нём образцы цвета читаются ярче. При открытии подтип «проваливается»
 * под шапку, чтобы палитра сразу была в поле зрения.
 */
export default function PaletteLab() {
  const { open } = useModal();
  const [openId, setOpenId] = useState("spring-light");

  const toggle = (id: string) => {
    const next = openId === id ? "" : id;
    setOpenId(next);
    if (next && typeof window !== "undefined") {
      requestAnimationFrame(() =>
        document
          .getElementById(`sub-${id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };

  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        {/* Заголовок */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-[11px] text-gold" data-reveal>
              06 / Колористика
            </p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Палитры <em className="italic text-gold-soft">внешности</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <p
              className="max-w-md text-base leading-relaxed text-paper/65 lg:mt-12"
              data-reveal
            >
              Двенадцать колоритов — по три внутри каждого сезона. Нажми на свой
              подтип, и палитра раскроется прямо под ним: цвета, контраст и
              металл, что тебе к лицу.
            </p>
          </div>
        </div>

        {/* Аккордеон подтипов */}
        <div className="mx-auto mt-16 max-w-3xl" data-reveal>
          {SEASON_ORDER.map((season) => (
            <div key={season} className="mb-10">
              <p className="label mb-2 text-xs text-gold/70">{season}</p>

              {SEASON_SUBTYPES.filter((p) => p.season === season).map((p) => {
                const on = openId === p.id;
                return (
                  <div
                    key={p.id}
                    id={`sub-${p.id}`}
                    style={{ scrollMarginTop: "84px" }}
                    className={`border-b transition-colors duration-300 ${
                      on ? "border-gold/45" : "border-line"
                    }`}
                  >
                    <button
                      onClick={() => toggle(p.id)}
                      aria-expanded={on}
                      className="group flex w-full items-center gap-3.5 py-5 text-left"
                    >
                      {/* Левый акцент */}
                      <span
                        className={`h-6 w-[3px] shrink-0 rounded-full transition-colors duration-300 ${
                          on
                            ? "bg-gold"
                            : "bg-paper/15 group-hover:bg-gold/60"
                        }`}
                      />
                      {/* Название */}
                      <span
                        className={`label text-[15px] transition-colors duration-300 sm:text-base ${
                          on
                            ? "text-gold-soft"
                            : "text-paper group-hover:text-gold-soft"
                        }`}
                      >
                        {p.name}
                      </span>
                      {/* Мини-превью палитры */}
                      <span className="ml-auto flex items-center gap-1.5">
                        {p.colors.map((c) => (
                          <span
                            key={c.hex}
                            className="h-3.5 w-3.5 rounded-full border border-paper/15 sm:h-4 sm:w-4"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </span>
                      {/* Индикатор + / × */}
                      <span
                        className={`ml-1.5 shrink-0 text-xl leading-none transition-transform duration-300 ${
                          on
                            ? "rotate-45 text-gold"
                            : "text-paper/40 group-hover:text-gold"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {/* Раскрытая палитра — прямо под кнопкой */}
                    {on && (
                      <div className="animate-rise pb-12 pl-[18px] pr-1">
                        <div className="flex items-baseline justify-between">
                          <p className="label text-[11px] text-gold/75">
                            {p.code}
                          </p>
                          <p className="label text-[10px] text-paper/40">
                            {p.colors.length} оттенков
                          </p>
                        </div>
                        <p className="display mt-2 text-4xl italic sm:text-5xl">
                          {p.name}
                        </p>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/65">
                          {p.desc}
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-3.5 sm:grid-cols-6">
                          {p.colors.map((c, i) => (
                            <div
                              key={c.hex + i}
                              className="flex flex-col items-stretch gap-2 text-left"
                              style={{
                                animation: `rise 0.6s cubic-bezier(0.22,0.61,0.36,1) ${i * 50}ms both`,
                              }}
                              title={`${c.name} · ${c.hex}`}
                            >
                              <span
                                className="aspect-square w-full border border-paper/10"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="label text-[10px] leading-tight text-paper/70">
                                {c.name}
                              </span>
                              <span className="font-mono text-[10px] tracking-widest text-paper/40">
                                {c.hex}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
                          {[
                            ["Контраст", p.contrast],
                            ["Металл", p.metal],
                            ["Избегать", p.avoid],
                          ].map(([t, v]) => (
                            <div key={t} className="bg-graphite p-5">
                              <p className="label text-[10px] text-paper/45">
                                {t}
                              </p>
                              <p
                                className={`display mt-2 text-2xl italic ${
                                  t === "Металл" ? "text-gold-soft" : "text-paper"
                                }`}
                              >
                                {v}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <button
            onClick={() => open("personal")}
            className="label mt-6 w-full border border-gold/60 py-4 text-[11px] text-gold-soft transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            Определить свой колорит
          </button>
        </div>
      </div>
    </section>
  );
}
