import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  SERVICES,
  type ServiceCategory,
} from "../data/content";
import { useModal } from "./Modal";
import { spotMove } from "../lib/spot";

type Filter = "all" | ServiceCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Все услуги" },
  { id: "private", label: "Частный разбор" },
  { id: "pro", label: "Для мастеров" },
  { id: "family", label: "Семейный формат" },
];

export default function Services() {
  const { open } = useModal();
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(
    () => (filter === "all" ? SERVICES : SERVICES.filter((s) => s.cat === filter)),
    [filter]
  );

  return (
    <section id="services" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        {/* Заголовок секции */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-gold-deep" data-reveal>02 / Услуги</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Единый <em className="italic text-gold-deep">каталог</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <p
              className="max-w-md text-sm leading-relaxed text-ink/60 lg:mt-12"
              data-reveal
            >
              Для частных клиентов, семей и профессионалов индустрии — в одном
              окне. Выберите направление: стоимость и формат указаны честно,
              без «звёздочек» и скрытых условий.
            </p>
          </div>
        </div>

        {/* Фильтры */}
        <div
          className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-3 border-y border-lined py-4"
          data-reveal
        >
          {FILTERS.map((f) => {
            const count =
              f.id === "all"
                ? SERVICES.length
                : SERVICES.filter((s) => s.cat === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`label border px-4 py-2.5 text-[9px] transition-colors duration-200 ${
                  filter === f.id
                    ? "border-gold-deep bg-gold-deep text-paper"
                    : "border-ink/20 text-ink/60 hover:border-gold-deep hover:text-ink"
                }`}
              >
                {f.label} · {count}
              </button>
            );
          })}
        </div>

        {/* Карточки услуг */}
        <div key={filter}>
          {list.map((s, i) => (
            <article
              key={s.id}
              onClick={() => open(s.id)}
              onMouseMove={spotMove}
              className="spot sweep group relative grid cursor-pointer grid-cols-12 gap-x-6 gap-y-4 border-b border-lined py-8 transition-colors duration-300 hover:bg-paper2/70 md:py-10"
              style={{ animation: `rise 0.7s cubic-bezier(0.22,0.61,0.36,1) ${i * 60}ms both` }}
            >
              <div className="col-span-3 md:col-span-1">
                <span className="label text-ink/35 transition-colors duration-300 group-hover:text-gold-deep">
                  {s.num}
                </span>
              </div>
              <div className="col-span-9 md:col-span-4">
                <h3 className="display text-2xl leading-tight transition-transform duration-300 group-hover:translate-x-1 md:text-[1.9rem]">
                  {s.title}
                </h3>
                <p className="label mt-2.5 text-[9px] text-ink/40 transition-colors group-hover:text-gold-deep">
                  {CATEGORY_LABELS[s.cat]}
                </p>
              </div>
              <p className="col-span-12 text-sm leading-relaxed text-ink/60 md:col-span-4 md:pl-4">
                {s.desc}
              </p>
              <div className="col-span-12 flex items-end justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:justify-between">
                <div className="md:text-right">
                  <p className="display text-2xl italic transition-colors duration-300 group-hover:text-gold-deep md:text-3xl">
                    {s.price}
                  </p>
                  {s.note && (
                    <p className="label mt-1.5 text-[9px] text-ink/40">{s.note}</p>
                  )}
                </div>
                <span className="label border border-ink/25 px-4 py-2.5 text-[9px] transition-colors duration-200 group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-paper">
                  Выбрать →
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="label mt-6 text-[9px] text-ink/40" data-reveal>
          нажав на строку, вы перейдёте к заявке — тариф подставится
          автоматически
        </p>
      </div>
    </section>
  );
}
