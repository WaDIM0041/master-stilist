import { useEffect } from "react";
import { ModalProvider } from "./components/Modal";
import { initSmoothScroll } from "./lib/scroll";
import { useReveals } from "./lib/reveal";
import Aurora from "./components/Aurora";
import GoldDust from "./components/GoldDust";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Express from "./components/Express";
import Services from "./components/Services";
import Process from "./components/Process";
import BeforeAfter from "./components/BeforeAfter";
import About from "./components/About";
import PaletteLab from "./components/PaletteLab";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Blog from "./components/Blog";
import Partnership from "./components/Partnership";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";

const MARQUEE_ITEMS = [
  "Персональный разбор",
  "Цветотип",
  "Капсула гардероба",
  "Колористика",
  "Гайд для мастеров",
  "Семейный формат",
  "Сертификаты",
  "«Льняной путь»",
];

export default function App() {
  useEffect(() => {
    initSmoothScroll();
  }, []);
  useReveals();

  return (
    <ModalProvider>
      {/* Живой фон: золотые авроры + шёлк */}
      <Aurora />
      {/* Мерцающая золотая пыль */}
      <GoldDust />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Marquee items={MARQUEE_ITEMS} tone="dark" />
          <Express />
          <Services />
          <Process />
          <BeforeAfter />
          <About />
          <PaletteLab />
          <Testimonials />
          <Pricing />
          <Blog />
          <Partnership />
        </main>
        <Footer />
      </div>

      {/* Плавающая кнопка заявки */}
      <FloatingCTA />

      {/* Плёночное зерно поверх всего */}
      <div
        aria-hidden="true"
        className="grain-bg pointer-events-none fixed inset-0 z-[120] opacity-[0.05] mix-blend-overlay"
      />
    </ModalProvider>
  );
}
