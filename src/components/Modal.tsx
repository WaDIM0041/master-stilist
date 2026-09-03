import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { CONTACTS, SERVICES } from "../data/content";
import { getLenis } from "../lib/scroll";

interface ModalContextValue {
  open: (serviceId?: string) => void;
}

const ModalContext = createContext<ModalContextValue>({ open: () => {} });
export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const open = useCallback((id?: string) => {
    if (id) setServiceId(id);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Блокировка скролла + анимация появления
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      if (panelRef.current && backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3 }
        );
        gsap.fromTo(
          panelRef.current,
          { y: 28, autoAlpha: 0, scale: 0.98 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" }
        );
      }
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];

  const message =
    `Заявка с сайта master-stilist\n` +
    `Предложение: ${service.title} — ${service.price}\n` +
    `Имя: ${name.trim() || "—"}\n` +
    `Контакт: ${contact.trim() || "—"}\n` +
    (comment.trim() ? `Комментарий: ${comment.trim()}\n` : "") +
    `\nПрошу связаться со мной.`;
  const enc = encodeURIComponent(message);

  const channels = [
    { label: "Telegram", href: `${CONTACTS.telegram}?text=${enc}` },
    { label: "ВКонтакте", href: CONTACTS.vk },
    { label: "MAX", href: CONTACTS.max },
  ];

  return (
    <ModalContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Форма заявки"
        >
          <div
            ref={backdropRef}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={close}
          />
          <div
            ref={panelRef}
            className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto border border-gold/30 bg-paper text-ink"
            data-lenis-prevent
          >
            <div className="flex items-start justify-between border-b border-lined px-6 py-5 md:px-8">
              <div>
                <p className="label text-ink/45">Заявка · отвечаем за час</p>
                <h3 className="display mt-2 text-3xl italic">Оставить запрос</h3>
              </div>
              <button
                onClick={close}
                className="label mt-1 text-ink/50 transition-colors hover:text-ink"
                aria-label="Закрыть"
              >
                Закрыть ×
              </button>
            </div>

            <div className="px-6 py-6 md:px-8">
              <p className="label mb-3 text-ink/45">Предложение</p>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`label border px-3 py-2 text-[9px] transition-colors duration-200 ${
                      s.id === serviceId
                        ? "border-gold-deep bg-gold-deep text-paper"
                        : "border-ink/20 text-ink/70 hover:border-gold-deep hover:text-ink"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-baseline justify-between border border-gold-deep/30 px-4 py-3">
                <span className="label text-ink/50">{service.title}</span>
                <span className="display text-2xl italic text-gold-deep">{service.price}</span>
              </div>

              <div className="mt-6 grid gap-5">
                <label className="block">
                  <span className="label text-ink/45">Имя</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться"
                    className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
                  />
                </label>
                <label className="block">
                  <span className="label text-ink/45">Телефон или Telegram</span>
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+7 ··· ··· ·· ··  или @username"
                    className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
                  />
                </label>
                <label className="block">
                  <span className="label text-ink/45">Комментарий</span>
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Срочность, событие, пожелания"
                    className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
                  />
                </label>
              </div>

              <p className="label mt-7 mb-3 text-ink/45">Отправить через</p>
              <div className="grid grid-cols-3 gap-2">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label border border-ink/30 py-3.5 text-center text-[10px] transition-colors duration-200 hover:border-gold-deep hover:bg-gold-deep hover:text-paper"
                  >
                    {c.label}
                  </a>
                ))}
              </div>

              <p className="mt-5 text-xs leading-relaxed text-ink/45">
                Выбранный тариф и параметры подставятся в сообщение автоматически.
                Работаем ежедневно, 10:00–20:00 МСК. Нажимая кнопку, вы
                соглашаетесь с обработкой персональных данных.
              </p>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
