import { PROCESS_STEPS } from "../data/content";
import { spotMove } from "../lib/spot";

export default function Process() {
  return (
    <section id="process" className="relative bg-ink/85 text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-gold/80" data-reveal>03 / Метод</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Три шага <em className="gold-text italic">до результата</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <p
              className="max-w-md text-sm leading-relaxed text-paper/60 lg:mt-12"
              data-reveal
            >
              Никакого алгоритма — только внимательный взгляд. Я смотрю твои
              фото сама, вручную, вещь за вещью, поэтому разбор читается как
              рекомендация человека, а не распечатка калькулятора.
            </p>
          </div>
        </div>

        <div
          className="mt-16 grid gap-px border border-gold/15 bg-gold/15 md:mt-20 md:grid-cols-3"
          data-reveal-group
        >
          {PROCESS_STEPS.map((s) => (
            <div
              key={s.num}
              onMouseMove={spotMove}
              className="spot sweep group relative flex min-h-[320px] flex-col justify-between bg-ink/90 p-7 transition-colors duration-500 hover:bg-smoke/90 md:min-h-[380px] md:p-9"
            >
              <div className="flex items-baseline justify-between">
                <span className="display text-6xl italic text-gold/20 transition-colors duration-500 group-hover:text-gold md:text-7xl">
                  {s.num}
                </span>
                <span className="label text-[9px] text-gold/50 transition-colors group-hover:text-gold-soft">
                  {s.time}
                </span>
              </div>
              <div>
                <h3 className="display text-3xl italic md:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
                  {s.text}
                </p>
                <span className="mt-6 block h-px w-0 bg-gradient-to-r from-gold-deep to-gold-bright transition-all duration-700 ease-out group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
