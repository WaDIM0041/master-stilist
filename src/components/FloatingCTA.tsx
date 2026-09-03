import { useEffect, useState } from "react";
import { useModal } from "./Modal";

export default function FloatingCTA() {
  const { open } = useModal();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => open()}
      aria-label="Оставить заявку на разбор"
      className={`btn-gold-solid label fixed bottom-5 right-5 z-[110] rounded-full px-6 py-3.5 text-[10px] md:bottom-8 md:right-8 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      Хочу разбор
    </button>
  );
}
