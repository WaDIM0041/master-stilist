import { TESTIMONIALS } from "../data/content";

/**
 * Отзывы клиенток — реальные, с фото «Было / Стало».
 * Тёмные карточки в цвет сайту; пара фото + цитата + имя и город.
 */
export default function Testimonials() {
  return (
    <section className="relative bg-ink/85 text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-gold/80" data-reveal>
              07 / Отзывы
            </p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Слова <em className="gold-text italic">клиентов</em>
            </h2>
          </div>
          <p className="label text-[9px] text-gold/70" data-reveal>
            честно · без накруток
          </p>
        </div>

        <div className="gold-fade-h mt-10" data-reveal />

        <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col border border-line bg-graphite/60 p-6 sm:p-7"
              data-reveal
            >
              <div className="grid grid-cols-2 gap-3">
                {([
                  ["Было", t.before],
                  ["Стало", t.after],
                ] as const).map(([tag, src]) => (
                  <div
                    key={tag}
                    className="relative aspect-[3/4] overflow-hidden border border-line bg-smoke"
                  >
                    <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-ink/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-gold-soft">
                      {tag}
                    </span>
                    <img
                      src={src}
                      alt={`${t.name} — ${tag}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <blockquote className="mt-6 text-[15px] leading-relaxed text-paper/75">
                <span className="display mr-1 align-[-6px] text-2xl italic text-gold/60">
                  «
                </span>
                {t.quote}
              </blockquote>

              <figcaption className="label mt-6 flex items-center gap-3 border-t border-line pt-5 text-[11px]">
                <span className="h-px w-8 shrink-0 bg-gold" />
                <span>
                  <span className="text-gold-soft">{t.name}</span>
                  <span className="text-paper/45"> · {t.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
