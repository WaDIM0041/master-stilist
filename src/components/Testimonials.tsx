import { TESTIMONIALS } from "../data/content";
import { spotMove } from "../lib/spot";

export default function Testimonials() {
  const [main, ...rest] = TESTIMONIALS;
  return (
    <section className="relative bg-ink/85 text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-gold/80" data-reveal>07 / Отзывы</p>
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

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* Главная цитата */}
          <figure className="lg:col-span-7" data-reveal>
            <span className="display block text-8xl italic leading-none text-gold/35">
              «
            </span>
            <blockquote className="display -mt-6 max-w-2xl text-3xl italic leading-snug text-paper/90 sm:text-4xl">
              {main.quote}
            </blockquote>
            <figcaption className="label mt-8 flex items-center gap-4 text-paper/50">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold-soft">{main.name}</span> · {main.meta}
            </figcaption>
          </figure>

          {/* Дополнительные */}
          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
            {rest.map((t, i) => (
              <figure
                key={t.name}
                onMouseMove={spotMove}
                className="spot sweep border border-line p-6 transition-colors duration-500 hover:border-gold/30"
                data-reveal
                data-delay={String(0.1 * (i + 1))}
              >
                <span className="display block text-4xl italic leading-none text-gold/40">
                  «
                </span>
                <blockquote className="mt-3 text-sm leading-relaxed text-paper/70">
                  {t.quote}
                </blockquote>
                <figcaption className="label mt-5 text-[9px] text-paper/45">
                  <span className="text-gold-soft/90">{t.name}</span> · {t.meta}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
