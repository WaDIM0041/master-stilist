import { useEffect, useRef, useState } from "react";
import { EXPRESS_SAMPLES, type ExpressResult } from "../data/content";
import { useModal } from "./Modal";
import LiquidImage from "./LiquidImage";

const STEPS = [
  { num: "01", title: "Калибровка фото", hint: "экспозиция · баланс" },
  { num: "02", title: "Считывание тонов", hint: "кожа · волосы · глаза" },
  { num: "03", title: "Определение цветотипа", hint: "4 сезона · 12 типов" },
  { num: "04", title: "Сборка карты стиля", hint: "палитра · контраст · металл" },
];

const READOUT_LABELS = ["Тон кожи", "Румянец", "Губы", "Волосы"];
const STEP_AT = [0.02, 0.28, 0.55, 0.82];
const DURATION = 10000;

/** Снятие усреднённых цветов с портрета в заданных точках */
function sampleColors(src: string): Promise<string[]> {
  const FALLBACK = ["#B99484", "#A9766A", "#8C5B4F", "#3E2E28"];
  return new Promise((resolve) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = 64;
        c.height = 80;
        const ctx = c.getContext("2d");
        if (!ctx) return resolve(FALLBACK);
        ctx.drawImage(im, 0, 0, 64, 80);
        const pts: [number, number][] = [
          [32, 24],
          [24, 42],
          [36, 54],
          [18, 10],
        ];
        resolve(
          pts.map(([x, y]) => {
            const d = ctx.getImageData(x, y, 1, 1).data;
            return (
              "#" +
              [d[0], d[1], d[2]]
                .map((v) => v.toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase()
            );
          })
        );
      } catch {
        resolve(FALLBACK);
      }
    };
    im.onerror = () => resolve(FALLBACK);
    im.src = src;
  });
}

const randomHex = () =>
  "#" +
  Array.from({ length: 6 }, () =>
    "0123456789ABCDEF"[Math.floor(Math.random() * 16)]
  ).join("");

type Phase = "idle" | "run" | "done";

export default function Express() {
  const { open } = useModal();
  const [sampleIdx, setSampleIdx] = useState(0);
  const [imgSrc, setImgSrc] = useState(EXPRESS_SAMPLES[0].img);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [readout, setReadout] = useState<string[]>(["——", "——", "——", "——"]);
  const [result, setResult] = useState<ExpressResult | null>(null);
  const rafRef = useRef(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadCount = useRef(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const sample = EXPRESS_SAMPLES[sampleIdx];

  // На мобильном портрет — над кнопками, поэтому при выборе образца
  // «поднимаем» экран к картинке, чтобы было видно скан и результат.
  const scrollToImage = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() =>
        imageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };

  const start = (src: string, res: ExpressResult) => {
    cancelAnimationFrame(rafRef.current);
    setImgSrc(src);
    setResult(res);
    setPhase("run");
    setProgress(0);
    setStepIdx(-1);
    setReadout(["——", "——", "——", "——"]);
  };

  /* Таймлайн анализа */
  useEffect(() => {
    if (phase !== "run") return;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min(1, (ts - startTs) / DURATION);
      setProgress(p);
      setStepIdx(STEP_AT.filter((t) => p >= t).length - 1);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("done");
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  /* Реальное считывание цвета с портрета + эффект «расшифровки» */
  useEffect(() => {
    if (phase !== "run") return;
    let real: string[] = [];
    sampleColors(imgSrc).then((hexes) => {
      real = hexes;
    });
    const iv = window.setInterval(() => {
      setReadout((prev) =>
        prev.map((_, i) =>
          real[i] && Math.random() > 0.72 ? real[i] : randomHex()
        )
      );
    }, 80);
    return () => window.clearInterval(iv);
  }, [phase, imgSrc]);

  useEffect(() => {
    if (phase === "done" && result) {
      sampleColors(imgSrc).then((hexes) => setReadout(hexes));
    }
  }, [phase, result, imgSrc]);

  // На мобильном после сканирования опускаем экран к готовому результату,
  // чтобы «пример — Мягкая осень» и палитра сразу были в поле зрения.
  useEffect(() => {
    if (phase !== "done") return;
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    const t = setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, [phase]);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const res = EXPRESS_SAMPLES[uploadCount.current % EXPRESS_SAMPLES.length].result;
    uploadCount.current += 1;
    start(url, res);
    e.target.value = "";
  };

  void progress;

  return (
    <section id="express" className="relative bg-graphite/85 text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Портрет со сканированием */}
          <div
            ref={imageRef}
            id="express-img"
            style={{ scrollMarginTop: "76px" }}
            className="lg:col-span-7"
            data-reveal
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/20 sm:aspect-[5/5]">
              <LiquidImage
                key={imgSrc}
                src={imgSrc}
                alt="Портрет для анализа цветотипа"
                className="absolute inset-0 h-full w-full"
                imgClassName="object-cover saturate-[0.85]"
                strength={0.9}
              />

              {/* Оверлей сканирования */}
              {phase === "run" && (
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute left-0 h-px w-full bg-gold-bright shadow-[0_0_30px_6px_rgba(212,175,106,0.45)]"
                    style={{ top: `${progress * 100}%` }}
                  />
                  <div
                    className="absolute left-0 h-16 w-full bg-gradient-to-b from-transparent via-gold/10 to-transparent"
                    style={{ top: `${Math.max(0, progress * 100 - 12)}%` }}
                  />
                  {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
                    (cls) => (
                      <span key={cls} className={`absolute h-5 w-5 border-gold/80 ${cls}`} />
                    )
                  )}
                  <span className="label absolute left-4 top-4 animate-blink text-[9px] text-gold-bright">
                    подбор · {Math.round(progress * 100)}%
                  </span>
                </div>
              )}

              {/* Лабораторные показания */}
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-6 gap-y-2 bg-gradient-to-t from-ink/90 to-transparent px-4 pb-4 pt-12">
                {READOUT_LABELS.map((l, i) => (
                  <div key={l} className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 border border-gold/50"
                      style={{
                        backgroundColor: phase === "idle" ? "transparent" : readout[i],
                      }}
                    />
                    <span className="label text-[9px] text-paper/60">{l}</span>
                    <span className="font-mono text-[10px] tracking-widest text-gold-soft">
                      {phase === "idle" ? "——" : readout[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="label mt-3 text-[9px] text-gold/50">
              рис. 01 — демо-режим. полный разбор выполняет стилист-колорист
            </p>
          </div>

          {/* Панель управления */}
          <div className="lg:col-span-5">
            <p className="label text-gold/80" data-reveal>01 / Цветотипы</p>
            <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl" data-reveal>
              Четыре цветотипа <em className="gold-text italic">на примере</em>
            </h2>
            <div className="gold-fade-h mt-6 w-28" data-reveal />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/65" data-reveal>
              Выбери образец — весну, лето, осень или зиму — и посмотри,
              как для этого колорита собирается палитра, контраст и
              металл. Видно, что даёт разбор и чем весна не зима.
            </p>

            {/* Образцы + загрузка */}
            <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal>
              {EXPRESS_SAMPLES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSampleIdx(i);
                    start(s.img, s.result);
                    scrollToImage();
                  }}
                  className={`group relative h-16 w-14 overflow-hidden border transition-colors ${
                    sampleIdx === i && phase === "idle"
                      ? "border-gold"
                      : "border-paper/25 hover:border-gold/60"
                  }`}
                  title={s.name}
                >
                  <img
                    src={s.thumb}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover saturate-[0.85]"
                  />
                  <span className="label absolute bottom-0.5 left-1 text-[7px] text-gold-bright">
                    0{i + 1}
                  </span>
                </button>
              ))}
              
            </div>

            {/* Таймер + шаги */}
            <div className="mt-9 border-t border-gold/15 pt-6" data-reveal>
              <div className="flex items-baseline justify-between">
                <span className="display gold-text text-3xl italic">
                  {Math.round(progress * 100)}%
                  <span className="text-lg text-paper/40"> палитра</span>
                </span>
                <span className="label text-gold/60">
                  {phase === "idle" ? "ожидание" : phase === "run" ? "анализ" : "готово"}
                </span>
              </div>
              <div className="mt-3 h-px w-full bg-paper/10">
                <div
                  className="h-px bg-gradient-to-r from-gold-deep via-gold to-gold-bright transition-[width] duration-150 ease-linear"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <ul className="mt-6 space-y-0">
                {STEPS.map((s, i) => {
                  const active = phase === "run" && stepIdx === i;
                  const done = phase === "done" || (phase === "run" && stepIdx > i);
                  return (
                    <li
                      key={s.num}
                      className={`flex items-center justify-between border-b border-line/60 py-3.5 transition-colors ${
                        active
                          ? "text-gold-bright"
                          : done
                            ? "text-gold-soft/80"
                            : "text-paper/35"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="label text-[9px]">{s.num}</span>
                        <span className="text-sm">{s.title}</span>
                      </div>
                      <span className="label text-[9px]">
                        {done ? "готово" : active ? s.hint : "—"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Результат */}
            {phase === "done" && result && (
              <div
                ref={resultRef}
                id="express-result"
                style={{ scrollMarginTop: "76px" }}
                className="sweep animate-rise mt-8 border border-gold/30 bg-smoke/70 p-6"
              >
                <div className="flex items-baseline justify-between">
                  <p className="label text-gold">Карта стиля · готово</p>
                  <p className="label text-[9px] text-paper/40">{result.code}</p>
                </div>
                <p className="display mt-3 text-4xl italic">{result.type}</p>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{result.desc}</p>

                <div className="mt-5 flex gap-1.5">
                  {result.palette.map((c, i) => (
                    <div
                      key={c.hex}
                      className="group relative h-12 flex-1 animate-rise outline outline-1 -outline-offset-1 outline-gold/20"
                      style={{ backgroundColor: c.hex, animationDelay: `${i * 70}ms` }}
                      title={`${c.name} · ${c.hex}`}
                    >
                      <span className="label absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[8px] text-gold-bright group-hover:block">
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between">
                    <span className="label text-paper/45">Контраст</span>
                    <span className="label text-[9px] text-gold-soft">{result.contrastLabel}</span>
                  </div>
                  <div className="mt-2 h-px w-full bg-paper/10">
                    <div
                      className="h-px bg-gradient-to-r from-gold-deep via-gold to-gold-bright transition-all duration-1000 ease-out"
                      style={{ width: `${result.contrast}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="label border border-gold/25 px-3 py-2 text-[9px] text-gold-soft/90">
                    Металл: {result.metal}
                  </span>
                  <span className="label border border-paper/20 px-3 py-2 text-[9px] text-paper/70">
                    Избегать: {result.avoid}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => open("personal")}
                    className="label border border-gold/70 px-6 py-3.5 text-[10px] text-gold-bright transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    Получить полный разбор — 1 490 ₽
                  </button>
                  <button
                    onClick={() => setPhase("idle")}
                    className="label px-3 py-3.5 text-[10px] text-paper/50 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-gold-soft"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            )}

            {phase === "idle" && (
              <button
                onClick={() => {
                  start(sample.img, sample.result);
                  scrollToImage();
                }}
                className="label mt-9 w-full border border-gold/70 py-5 text-[10px] text-gold-bright transition-all duration-300 hover:bg-gold hover:text-ink"
                data-reveal
              >
                Посмотреть пример — {sample.name}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
