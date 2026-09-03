import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  SERVICES,
  type ServiceCategory,
} from "../data/content";
import { useModal } from "./Modal";

type Filter = "all" | ServiceCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Всё предложение" },
  { id: "private", label: "Частный разбор" },
  { id: "pro", label: "Мастерам" },
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
            <p className="label text-gold-deep" data-reveal>02 / Предложение</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Форматы <em className="italic text-gold-deep">разбора</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <p
              className="max-w-md text-sm leading-relaxed text-ink/60 lg:mt-12"
              data-reveal
            >
              Для частных клиентов, семей и профессионалов индустрии — в одном
              окне. Стоимость и формат указаны честно, без «звёздочек» и скрытых
              условий.
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

        {/* Фото-карточки форматов */}
        <div key={filter} className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {list.map((s, i) => (
            <article
              key={s.id}
              onClick={() => open(s.id)}
              className="group cursor-pointer"
              data-reveal
              style={{ animation: `rise 0.7s cubic-bezier(0.22,0.61,0.36,1) ${i * 70}ms both` }}
            >
              <div className="relative overflow-hidden border border-lined transition-colors duration-500 group-hover:border-gold-deep/40">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-top"
                  style={{
                    transformOrigin: "50% 18%",
                    animation: `kenburns ${15 + (i % 3) * 3}s ease-in-out ${(i % 4) * 0.7}s infinite alternate`,
                  }}
                />
                <span className="label absolute right-4 top-4 bg-paper/85 px-2.5 py-1.5 text-[9px] text-ink/75 backdrop-blur-sm">
                  {s.price}
                </span>
              </div>

              <p className="label mt-5 text-[9px] text-gold-deep">
                {s.num} · {CATEGORY_LABELS[s.cat]}
              </p>
              <h3 className="display mt-2 text-2xl leading-tight transition-colors duration-300 group-hover:text-gold-deep md:text-[2rem]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/60">
                {s.desc}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <span className="label border border-ink/25 px-5 py-3 text-[9px] transition-colors duration-200 group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-paper">
                  Выбрать →
                </span>
                {s.note && (
                  <span className="label text-[9px] text-ink/40">{s.note}</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="label mt-10 text-[9px] text-ink/40" data-reveal>
          нажми на карточку — откроется заявка, тариф подставится автоматически
        </p>
      </div>
    </section>
  );
}
