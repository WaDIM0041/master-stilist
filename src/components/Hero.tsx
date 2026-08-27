import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MEDIA } from "../data/content";
import { scrollToSection } from "../lib/scroll";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-video]",
        { scale: 1.12, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 2, ease: "power2.out" },
        0
      )
        .fromTo(
          "[data-hero-line] > span",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.3, stagger: 0.14 },
          0.3
        )
        .fromTo(
          "[data-hero-fade]",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 },
          0.9
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex h-svh min-h-[640px] flex-col overflow-hidden"
    >
      {/* Кинематографичный видеоряд (лёгкий, 1080p) */}
      <div data-hero-video className="absolute inset-0 will-change-transform">
        {videoOk ? (
          <video
            className="mono-media h-full w-full object-cover"
            src={MEDIA.heroVideo}
            poster={MEDIA.heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={() => setVideoOk(false)}
          />
        ) : (
          <img
            src={MEDIA.heroPoster}
            alt=""
            aria-hidden="true"
            className="mono-media h-full w-full object-cover"
          />
        )}
      </div>

      {/* Тёмный градиент + тёплое золотое свечение */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/55" />
      <div
        className="hero-glow pointer-events-none absolute -bottom-[22%] -left-[12%] h-[55vh] w-[55vw] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,164,92,0.26), rgba(201,164,92,0) 65%)",
        }}
      />
      <div
        className="hero-glow pointer-events-none absolute -right-[15%] top-[-15%] h-[40vh] w-[35vw] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(138,109,59,0.2), rgba(138,109,59,0) 65%)",
        }}
      />
      <div className="grain-bg pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

      {/* Контент */}
      <div className="relative z-10 mt-auto w-full px-5 pb-8 md:px-10 md:pb-10">
        <div data-hero-fade className="mb-6 flex items-center justify-between md:mb-10">
          <p className="label flex items-center gap-3 text-paper/75">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
            Digital-платформа стиля
          </p>
          <p className="label hidden text-paper/50 sm:block">
            Москва · Online · с 2021
          </p>
        </div>

        <h1 className="display text-[13.5vw] leading-[0.93] sm:text-[11vw] lg:text-[8.6vw]">
          <span data-hero-line className="mask-line">
            <span>Стиль — это</span>
          </span>
          <span data-hero-line className="mask-line">
            <span>
              <em className="gold-text italic">система.</em> Мы её
            </span>
          </span>
          <span data-hero-line className="mask-line">
            <span className="italic text-gold-soft/90">расшифровываем.</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-fade
            className="max-w-md text-sm leading-relaxed text-paper/70 md:text-base"
          >
            Экспресс-анализ цветотипа за десять секунд, персональные разборы
            для частных клиентов — и цифровой инструмент для профессионалов
            индустрии красоты.
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection("#express")}
              className="label border border-gold/70 px-7 py-4 text-[10px] text-gold-bright transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            >
              Пройти экспресс-анализ
            </button>
            <button
              onClick={() => scrollToSection("#pricing")}
              className="label px-2 py-4 text-[10px] text-paper/60 underline decoration-paper/30 underline-offset-8 transition-colors hover:text-gold-soft hover:decoration-gold"
            >
              Смотреть тарифы
            </button>
          </div>
        </div>

        {/* Нижняя панель */}
        <div
          data-hero-fade
          className="mt-10 grid grid-cols-2 gap-6 border-t border-gold/25 pt-5 md:mt-14 md:grid-cols-4"
        >
          {[
            ["10 сек", "экспресс-анализ"],
            ["4 000+", "разборов с 2021"],
            ["4.9", "средняя оценка"],
            ["24 ч", "срок полного разбора"],
          ].map(([v, l]) => (
            <div key={l} className="flex flex-col gap-1">
              <span className="display gold-text text-2xl italic md:text-3xl">
                {v}
              </span>
              <span className="label text-[9px] text-paper/45">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Приглашение к скроллу */}
      <button
        data-hero-fade
        onClick={() => scrollToSection("#express")}
        className="label absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] text-gold/70 transition-colors hover:text-gold-bright md:right-8 md:block"
        aria-label="Прокрутить вниз"
      >
        скролл ↓
      </button>
    </section>
  );
}
