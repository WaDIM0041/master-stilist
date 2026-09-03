import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { scrollToSection } from "../lib/scroll";
import { useModal } from "./Modal";

const LINKS = [
  { label: "Цветотипы", href: "#express" },
  { label: "Предложение", href: "#services" },
  { label: "Метод", href: "#process" },
  { label: "Обо мне", href: "#about" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Журнал", href: "/blog/" },
];

export default function Nav() {
  const { open } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const go = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/") || href.startsWith("http")) {
      window.location.href = href;
      return;
    }
    scrollToSection(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (menuOpen) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        el.querySelectorAll("[data-menu-link]"),
        { y: 44, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.06, delay: 0.1 }
      );
    } else {
      gsap.to(el, {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/15 bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 text-paper md:px-10">
          <button
            onClick={() => go("#top")}
            className="font-serif text-2xl italic leading-none tracking-tight"
            aria-label="Master Stilist — наверх"
          >
            master<span className="text-gold">·</span>stilist
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="label relative text-[10px] text-paper/75 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-gold-soft hover:after:w-full"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => open()}
              className="btn-gold label hidden px-5 py-2.5 text-[10px] sm:block"
            >
              Оставить заявку
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="label text-[10px] text-paper/80 transition-colors hover:text-gold-soft lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Меню"
            >
              {menuOpen ? "Закрыть ×" : "Меню +"}
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] hidden flex-col justify-between bg-ink px-6 pb-10 pt-28"
        style={{ display: "none" }}
      >
        <div className="gold-fade-h absolute inset-x-6 top-24" />
        <nav className="flex flex-col gap-2" aria-label="Мобильная навигация">
          {LINKS.map((l, i) => (
            <button
              key={l.href}
              data-menu-link
              onClick={() => go(l.href)}
              className="display border-b border-line py-4 text-left text-4xl italic text-paper transition-colors hover:text-gold-soft"
            >
              <span className="label mr-4 align-middle text-gold/60">
                0{i + 1}
              </span>
              {l.label}
            </button>
          ))}
        </nav>
        <div data-menu-link className="flex flex-col gap-3">
          <button
            onClick={() => {
              setMenuOpen(false);
              open();
            }}
            className="label border border-gold/60 py-4 text-center text-gold-soft transition-colors hover:bg-gold hover:text-ink"
          >
            Оставить заявку
          </button>
          <p className="label text-center text-paper/40">
            10:00–20:00 МСК · онлайн
          </p>
        </div>
      </div>
    </>
  );
}
