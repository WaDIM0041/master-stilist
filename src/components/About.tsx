import { MEDIA } from "../data/content";
import LiquidImage from "./LiquidImage";

export default function About() {
  return (
    <section id="about" className="bg-graphite text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Портрет с WebGL-эффектом */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div data-reveal>
                <LiquidImage
                  src={MEDIA.aboutPortrait}
                  alt="Татьяна — стилист-колорист, основатель метода"
                  className="aspect-[4/5] w-full border border-line"
                  imgClassName="mono-media"
                  strength={1}
                />
                <div className="mt-3 flex items-baseline justify-between">
                  <p className="label text-[9px] text-paper/45">
                    Татьяна · стилист-колорист
                  </p>
                  <p className="label text-[9px] text-paper/45">осн. 2021</p>
                </div>
              </div>
              <p
                className="display mt-10 hidden max-w-xs text-2xl italic leading-snug text-gold-soft/90 lg:block"
                data-reveal
              >
                «Стиль — это грамматика. Я учу вас говорить на нём без
                ошибок.»
              </p>
            </div>
          </div>

          {/* История бренда */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label text-gold/80" data-reveal>05 / Бренд</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-[3.6rem]"
              data-reveal
            >
              Метод, <em className="gold-text italic">а не магия</em>
            </h2>

            <div className="mt-8 space-y-6 text-sm leading-relaxed text-paper/65 md:text-base" data-reveal>
              <p>
                Меня зовут Татьяна. Восемь лет я работаю стилистом-колористом:
                сначала — с моделями и съёмочными гардеробами, затем — с
                частными клиентами, которые приходили с одной и той же
                жалобой: «всё покупаю — и ничего не ношу».
              </p>
              <p>
                За это время я собрала собственную шкалу контраста и систему
                из двенадцати подтипов вместо привычных четырёх сезонов.
                Сегодня эту шкалу считает алгоритм платформы, но каждый вывод
                по-прежнему проходит мою проверку. Машина умеет считать
                пигмент кожи — чувство меры пока только у человека.
              </p>
              <p>
                Master Stilist вырос из частной практики в цифровую платформу:
                теперь метод работает для клиентов онлайн — и для мастеров
                индустрии красоты, которые запускают разборы под собственной
                маркой.
              </p>
            </div>

            {/* Показатели */}
            <div
              className="mt-12 grid grid-cols-3 gap-6 border-t border-gold/20 pt-8"
              data-reveal-group
            >
              {[
                ["8 лет", "частной практики"],
                ["4 000+", "разборов выдано"],
                ["40+", "мастеров на PRO"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="display gold-text text-3xl italic md:text-5xl">{v}</p>
                  <p className="label mt-2 text-[9px] text-paper/45">{l}</p>
                </div>
              ))}
            </div>

            <blockquote
              className="display mt-12 max-w-md text-2xl italic leading-snug text-gold-soft/90 lg:hidden"
              data-reveal
            >
              «Стиль — это грамматика. Я учу вас говорить на нём без ошибок.»
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
