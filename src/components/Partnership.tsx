import { MEDIA } from "../data/content";
import { useModal } from "./Modal";
import LiquidImage from "./LiquidImage";

export default function Partnership() {
  const { open } = useModal();

  return (
    <section className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label text-gold/80" data-reveal>10 / Партнёрство</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-[3.8rem]"
              data-reveal
            >
              «Льняной <em className="gold-text italic">путь»</em>
            </h2>
            <div className="mt-8 max-w-lg space-y-5 text-sm leading-relaxed text-paper/65 md:text-base" data-reveal>
              <p>
                Совместная программа с брендами одежды из натуральных тканей.
                Каждая капсула коллекции проходит проверку палитрами наших
                клиентов: мы знаем, кому пойдёт terracotta, а кому — только
                мох.
              </p>
              <p>
                Бренды получают витрину внутри персональных разборов и
                аналитику спроса по оттенкам. Мастера — готовые материалы для
                клиентов. Клиенты — гардероб, который наконец выглядит
                как единое высказывание.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3" data-reveal>
              <button
                onClick={() => open("partner")}
                className="label border border-gold/70 px-7 py-4 text-[10px] text-gold-bright transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
              >
                Стать партнёром
              </button>
              <button
                onClick={() => open("pro")}
                className="label px-2 py-4 text-[10px] text-paper/60 underline decoration-paper/30 underline-offset-8 transition-colors hover:text-gold-soft hover:decoration-gold"
              >
                Для мастеров: STILIST PRO
              </button>
            </div>
          </div>

          <div className="lg:col-span-6" data-reveal>
            <LiquidImage
              src={MEDIA.linen}
              alt="Фактура натурального льна"
              className="aspect-[16/10] w-full border border-line"
              imgClassName="mono-media"
              strength={1.2}
            />
            <div className="mt-3 flex items-baseline justify-between">
              <p className="label text-[9px] text-paper/45">
                капсула «Льняной путь», весна
              </p>
              <p className="label text-[9px] text-paper/45">12 оттенков</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
