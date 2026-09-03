import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("ms_cookie_ok")) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  const accept = () => {
    try { localStorage.setItem("ms_cookie_ok", "1"); } catch { /* ignore */ }
    setShow(false);
  };
  return (
    <div className="fixed inset-x-0 bottom-0 z-[130] border-t border-gold/20 bg-ink/95 px-5 py-4 backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-paper/70">
          Мы используем cookie и Яндекс.Метрику, чтобы сайт работал и был удобнее.
          Продолжая пользоваться сайтом, вы соглашаетесь с этим и с{" "}
          <a href="/politika" className="text-gold-soft underline decoration-gold/40 underline-offset-2 hover:text-gold-bright">
            политикой конфиденциальности
          </a>.
        </p>
        <button
          onClick={accept}
          className="btn-gold-solid label shrink-0 rounded-full px-6 py-2.5 text-[10px]"
        >
          Хорошо
        </button>
      </div>
    </div>
  );
}
