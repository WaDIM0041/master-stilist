import { useCallback, useRef, useState } from "react";
import { MEDIA } from "../data/content";
import { useModal } from "./Modal";

/**
 * Интерактивное сравнение: одна фотография в «чужой» гамме
 * и в палитре, собранной под цветотип клиента.
 */
export default function BeforeAfter() {
  const { open } = useModal();
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) update(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-gold-deep" data-reveal>04 / Практика</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Одна фотография — <em className="italic text-gold-deep">две гаммы</em>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-ink/60" data-reveal>
              Слева — цветовой баланс, который «съедает» кожу и добавляет
              усталости. Справа — гамма, приведённая к палитре клиента.
              Потяните ползунок и сравните.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12" data-reveal>
          {/* Слайдер сравнения */}
          <div className="lg:col-span-7">
            <div
              ref={wrapRef}
              className="relative aspect-[3/4] w-full touch-pan-y select-none overflow-hidden border border-lined sm:aspect-[4/4.4]"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stop}
              onPointerLeave={stop}
            >
              {/* ПОСЛЕ — гармоничная гамма */}
              <img
                src={MEDIA.beforeAfter}
                alt="Портрет в гармоничной палитре"
                draggable={false}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: "saturate(1.02) contrast(1.02)" }}
              />
              {/* ДО — «чужая» гамма, обрезана до позиции ползунка */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <img
                  src={MEDIA.beforeAfter}
                  alt="Портрет в негармоничной гамме"
                  draggable={false}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    filter:
                      "saturate(0.42) hue-rotate(-14deg) brightness(0.92) contrast(0.9)",
                  }}
                />
              </div>

              {/* Разделительная линия и ручка */}
              <div
                className="absolute inset-y-0 z-10 w-px bg-paper/90"
                style={{ left: `${pos}%` }}
              >
                <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-paper/80 bg-ink/55 font-mono text-[10px] tracking-widest text-paper backdrop-blur-sm">
                  ↔
                </span>
              </div>

              <span className="label absolute left-4 top-4 border border-paper/40 bg-ink/45 px-3 py-1.5 text-[9px] text-paper backdrop-blur-sm">
                до · чужая гамма
              </span>
              <span className="label absolute right-4 top-4 border border-paper/40 bg-ink/45 px-3 py-1.5 text-[9px] text-paper backdrop-blur-sm">
                после · палитра клиента
              </span>
            </div>
          </div>

          {/* Примечания */}
          <div className="flex flex-col justify-between lg:col-span-4 lg:col-start-9">
            <div className="space-y-7">
              {[
                [
                  "Правило трёх тонов",
                  "В кадре должно работать не больше трёх доминирующих цветов — и все они из вашей карты.",
                ],
                [
                  "Свет решает",
                  "Даже идеальная палитра ломается при жёлтой лампе. В разборе — шпаргалка по освещению.",
                ],
                [
                  "Ткань, а не оттенок",
                  "Один и тот же цвет на матовом льне и атласе читается по-разному. Учитываем текстуру.",
                ],
              ].map(([t, d]) => (
                <div key={t} className="border-t border-lined pt-5">
                  <h3 className="display text-2xl italic">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{d}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => open("personal")}
              className="label mt-10 w-full border border-gold-deep/60 py-4 text-[10px] text-gold-deep transition-colors duration-300 hover:bg-gold-deep hover:text-paper"
            >
              Хочу так же — персональный разбор
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
