import { MEDIA, SERVICES } from "../data/content";
import { useModal } from "./Modal";
import { spotMove } from "../lib/spot";

/**
 * Тарифная сетка в формате строгого прайс-листа премиум-бренда:
 * матовое стекло, золотые волосяные линии, переливы на цифрах.
 */
export default function Pricing() {
  const { open } = useModal();

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-graphite/90 text-paper"
    >
      {/* Фоновая фактура льна */}
      <img
        src={MEDIA.pricingBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="mono-media absolute inset-0 h-full w-full object-cover opacity-[0.10]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/95 via-transparent to-graphite/95" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-gold/80" data-reveal>08 / Тарифы</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Стоимость — <em className="gold-text italic">как на этикетке</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <p className="max-w-md text-sm leading-relaxed text-paper/60 lg:mt-12" data-reveal>
              Цена фиксируется после брифа и не меняется в процессе работы.
              Без таймеров, «горящих» скидок и других лишних эмоций — только
              список услуг и цифры рядом с ними.
            </p>
          </div>
        </div>

        {/* Стеклянный прайс-лист с золотыми волосяными рамками */}
        <div
          className="mt-16 border border-gold/20 bg-white/[0.045] backdrop-blur-xl"
          data-reveal
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gold/15 px-6 py-5 md:px-9">
            <p className="label text-[9px] text-gold/70">
              прайс-лист · действует бессрочно
            </p>
            <p className="label text-[9px] text-gold/70">
              оплата после согласования брифа
            </p>
          </div>

          <ul>
            {SERVICES.map((s) => (
              <li key={s.id} className="border-b border-gold/10 last:border-b-0">
                <button
                  onClick={() => open(s.id)}
                  onMouseMove={spotMove}
                  className="spot sweep group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-1 px-6 py-6 text-left transition-colors duration-300 hover:bg-white/[0.05] md:px-9 md:py-7"
                >
                  <span className="label col-span-2 text-[9px] text-gold/50 transition-colors group-hover:text-gold md:col-span-1">
                    {s.num}
                  </span>
                  <span className="col-span-10 text-base font-medium tracking-wide text-paper/90 md:col-span-6">
                    {s.title}
                    {s.note && (
                      <span className="label ml-3 hidden text-[8px] text-gold/50 lg:inline">
                        {s.note}
                      </span>
                    )}
                  </span>
                  <span className="display gold-text col-span-8 text-2xl italic md:col-span-3 md:text-3xl">
                    {s.price}
                  </span>
                  <span className="label col-span-4 text-right text-[9px] text-gold/60 transition-colors duration-300 group-hover:text-gold-bright md:col-span-2">
                    выбрать →
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-gold/15 px-6 py-5 md:px-9">
            <p className="text-xs leading-relaxed text-paper/45">
              Сертификаты — 6 месяцев. Для семейного формата действует скидка
              на каждого следующего участника.
            </p>
            <p className="label text-[9px] text-gold/50">
              Гайд по колористике для мастеров — бесплатно
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
