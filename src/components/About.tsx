import { useState } from "react";
import { MEDIA } from "../data/content";
import LiquidImage from "./LiquidImage";

export default function About() {
  const [mono, setMono] = useState(true);

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
                  alt="Татьяна — автор проекта «Мастер-стилист»"
                  className="aspect-[4/5] w-full border border-line"
                  imgClassName={mono ? "mono-media" : ""}
                  strength={1}
                />
                <div className="mt-3 flex items-baseline justify-between">
                  <p className="label text-[9px] text-paper/45">
                    Татьяна · автор проекта
                  </p>
                  <p className="label text-[9px] text-paper/45">по фото · онлайн</p>
                </div>

                {/* Переключатель тона: Ч/Б ⇄ Цвет */}
                <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                  <span className="label text-[10px] text-paper/45">тон</span>
                  <div
                    className="flex items-center gap-2"
                    role="group"
                    aria-label="Тон фотографии"
                  >
                    <button
                      type="button"
                      onClick={() => setMono(true)}
                      aria-pressed={mono}
                      className={`label rounded-full border px-4 py-2 text-[11px] transition-all duration-200 ${
                        mono
                          ? "border-gold bg-gold text-ink"
                          : "border-paper/30 text-paper/60 hover:border-gold/60 hover:text-paper"
                      }`}
                    >
                      Ч/Б
                    </button>
                    <button
                      type="button"
                      onClick={() => setMono(false)}
                      aria-pressed={!mono}
                      className={`label rounded-full border px-4 py-2 text-[11px] transition-all duration-200 ${
                        !mono
                          ? "border-gold bg-gold text-ink"
                          : "border-paper/30 text-paper/60 hover:border-gold/60 hover:text-paper"
                      }`}
                    >
                      Цвет
                    </button>
                  </div>
                </div>
              </div>
              <p
                className="display mt-10 hidden max-w-xs text-2xl italic leading-snug text-gold-soft/90 lg:block"
                data-reveal
              >
                «Не волшебство. Метод, вкус и любовь к прекрасному.»
              </p>
            </div>
          </div>

          {/* История бренда */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label text-gold/80" data-reveal>05 / Обо мне</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-[3.6rem]"
              data-reveal
            >
              Метод, <em className="gold-text italic">а не магия</em>
            </h2>

            <div className="mt-8 space-y-6 text-sm leading-relaxed text-paper/65 md:text-base" data-reveal>
              <p>
                Скажу честно — это не волшебство. Я администрирую сайты и просто
                очень люблю всё красивое, всё, что касается образа и тела. И когда
                новый мир технологий открыл эту возможность, я не смогла пройти
                мимо.
              </p>
              <p>
                Имея вкус и любовь к прекрасному, я воплотила свою мечту —
                приручила инструмент, который показывает, каким может быть твой
                образ. Это не гадание, а спокойная, внимательная работа с цветом
                и линиями.
              </p>
              <p>
                И я хочу, чтобы каждый, кто мечтает увидеть себя новым — в образе
                или луке, о котором давно думал, — был чуть смелее. Закажи разбор
                и увидь себя таким, каким вижу тебя я.
              </p>
            </div>

            {/* Показатели */}
            <div
              className="mt-12 grid grid-cols-3 gap-6 border-t border-gold/20 pt-8"
              data-reveal-group
            >
              {[
                ["12", "сезонных типов"],
                ["1–3 дня", "на разбор"],
                ["по фото", "формат работы"],
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
              «Не волшебство. Метод, вкус и любовь к прекрасному.»
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
