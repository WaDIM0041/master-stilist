import { CONTACTS, SERVICES } from "../data/content";
import { scrollToSection } from "../lib/scroll";
import { useModal } from "./Modal";

const NAV = [
  { label: "Цветотипы", href: "#express" },
  { label: "Предложение", href: "#services" },
  { label: "Метод", href: "#process" },
  { label: "Обо мне", href: "#about" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Журнал", href: "#journal" },
];

export default function Footer() {
  const { open } = useModal();

  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-ink/90 text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 md:px-10 md:pt-28">
        {/* Верхний ряд */}
        <div className="grid gap-12 pb-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label text-gold/70">Связь</p>
            <div className="gold-fade-h mt-4 w-20" />
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-paper/75 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold-soft hover:decoration-gold"
              >
                Telegram — @Tanyahoney
              </a>
              <a
                href={CONTACTS.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-paper/75 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold-soft hover:decoration-gold"
              >
                ВКонтакте — Молоко и мёд
              </a>
              <a
                href={CONTACTS.max}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-paper/75 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold-soft hover:decoration-gold"
              >
                MAX
              </a>
            </div>
            <button
              onClick={() => open()}
              className="label mt-8 border border-gold/60 px-6 py-3.5 text-[10px] text-gold-soft transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            >
              Оставить заявку
            </button>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <p className="label text-gold/70">Навигация</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollToSection(l.href)}
                    className="text-sm text-paper/65 transition-colors hover:text-gold-soft"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <p className="label text-gold/70">Предложение</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => open(s.id)}
                    className="text-left text-sm text-paper/65 transition-colors hover:text-gold-soft"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Гигантский контурный логотип цвета золота */}
        <button
          onClick={() => scrollToSection("#top")}
          className="display gold-hollow block w-full select-none whitespace-nowrap pb-6 text-left text-[13.5vw] italic leading-[0.9]"
          aria-label="Наверх"
        >
          master·stilist
        </button>

        {/* Нижняя строка */}
        <div className="flex flex-col gap-3 border-t border-gold/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-[9px] text-gold/50">
            © 2025 master stilist · стиль как система
          </p>
          <p className="label text-[9px] text-gold/50">
            разбор стиля · колористика · капсула
          </p>
          <button
            onClick={() => scrollToSection("#top")}
            className="label w-fit text-[9px] text-gold/60 transition-colors hover:text-gold-bright"
          >
            наверх ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
