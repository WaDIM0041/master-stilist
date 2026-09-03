/* ─────────────────────────────────────────────
   Master Stilist — единый контент сайта
   ───────────────────────────────────────────── */

export const CONTACTS = {
  telegram: "https://t.me/masterstilist",
  whatsapp: "https://wa.me/79001234567",
  vk: "https://vk.me/masterstilist",
  email: "privet@master-stilist.ru",
  phone: "+7 900 123-45-67",
};

export type ServiceCategory = "private" | "family" | "pro";

export interface Service {
  id: string;
  num: string;
  cat: ServiceCategory;
  title: string;
  price: string;
  note?: string;
  desc: string;
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  private: "Частный разбор",
  family: "Семейный формат",
  pro: "Для мастеров",
};

export const SERVICES: Service[] = [
  {
    id: "personal",
    num: "001",
    cat: "private",
    title: "Персональный разбор стиля",
    price: "1 490 ₽",
    note: "стартовый тариф — 700 ₽",
    desc: "Полная карта стиля: цветотип, уровень контраста, силуэты, капсула из 30+ вещей и шопинг-лист. PDF-гид и поддержка стилиста 14 дней.",
  },
  {
    id: "men",
    num: "002",
    cat: "private",
    title: "Мужской разбор",
    price: "1 290 ₽",
    note: "гардероб и колористика",
    desc: "Мужской типаж без догадок: базовая капсула, деловой дресс-код, цветовые правила, которые работают в реальной жизни.",
  },
  {
    id: "event",
    num: "003",
    cat: "private",
    title: "Разбор под особый случай",
    price: "1 990 ₽",
    note: "два круга правок",
    desc: "Свадьба, съёмка, выпускной. Образ под дресс-код, площадку и освещение. Подбираем силуэт, ткань и палитру украшений.",
  },
  {
    id: "cert",
    num: "004",
    cat: "private",
    title: "Подарочный сертификат",
    price: "от 700 ₽",
    note: "срок действия — 6 месяцев",
    desc: "Электронный сертификат на любой разбор. Открыка, инструкция и передача получателю — в один клик.",
  },
  {
    id: "kids",
    num: "005",
    cat: "family",
    title: "Детский разбор",
    price: "от 490 ₽",
    note: "3–14 лет",
    desc: "Мягкий анализ цветотипа ребёнка: палитра для одежды, школьных фото и утренников. Без сложных терминов — с картинками.",
  },
  {
    id: "family",
    num: "006",
    cat: "family",
    title: "Семейный разбор",
    price: "от 1 490 ₽",
    note: "скидка на каждого следующего",
    desc: "Палитры и капсулы для всей семьи: от прогулок до семейной фотосессии. Общая карта цветов, в которых вы гармоничны вместе.",
  },
  {
    id: "pro",
    num: "007",
    cat: "pro",
    title: "Гайд по колористике — мастерам",
    price: "Бесплатно",
    note: "справочник для мастеров",
    desc: "Бесплатный справочник для мастеров: какие оттенки идут тёплому и холодному подтону, что освежает лицо, а что гасит. Открой, когда клиент спрашивает «какую блондинку».",
  },
  {
    id: "partner",
    num: "008",
    cat: "pro",
    title: "Лён для дома в вашей палитре",
    price: "Бесплатный подбор",
    note: "вместе с «Льняной путь»",
    desc: "Вместе с мастерской натурального льна «Льняной путь» подбираю домашний текстиль — в оттенках, которые работают на тебя.",
  },
];

/* ── Палитры внешности ── */

export interface PaletteColor {
  hex: string;
  name: string;
}

export interface SeasonPalette {
  id: string;
  name: string;
  code: string;
  desc: string;
  colors: PaletteColor[];
  contrast: string;
  metal: string;
  avoid: string;
}

export const SEASON_PALETTES: SeasonPalette[] = [
  {
    id: "spring",
    name: "Весна",
    code: "Spring · Light",
    desc: "Тёплый лучистый колорит. Кожа отдаёт персиковым, глаза — чайно-зелёным. Ваша база — крем вместо белого, песок вместо серого.",
    colors: [
      { hex: "#EFD9B4", name: "Крем-брюле" },
      { hex: "#D9A05B", name: "Шафран" },
      { hex: "#C4622D", name: "Терракота" },
      { hex: "#E89A7C", name: "Лосось" },
      { hex: "#7E8A4F", name: "Олива" },
      { hex: "#6B4A32", name: "Тёплый шоколад" },
    ],
    contrast: "Мягкий",
    metal: "Жёлтое золото",
    avoid: "Чистый чёрный у лица",
  },
  {
    id: "summer",
    name: "Лето",
    code: "Summer · Soft",
    desc: "Прохладный приглушённый колорит. Пыльные оттенки, дымчатые контрасты. Ваш серый — с голубизной, ваш красный — с фиолетовым подтоном.",
    colors: [
      { hex: "#C4A1A6", name: "Пыльная роза" },
      { hex: "#A397B8", name: "Лаванда" },
      { hex: "#8FA8BC", name: "Серо-голубой" },
      { hex: "#A9C3B4", name: "Мята" },
      { hex: "#9E4A56", name: "Малиновый" },
      { hex: "#9A9DA1", name: "Дымчатый серый" },
    ],
    contrast: "Мягкий — средний",
    metal: "Серебро",
    avoid: "Оранжевый, кирпичный",
  },
  {
    id: "autumn",
    name: "Осень",
    code: "Autumn · Deep",
    desc: "Насыщенный тёплый колорит. Кожа — золотистая, волосы — с рыжиной. Носите цвет спелого: горчицу, хну, мох, кирпич.",
    colors: [
      { hex: "#C99A2C", name: "Горчица" },
      { hex: "#A85A32", name: "Терракота" },
      { hex: "#D07B2E", name: "Тыква" },
      { hex: "#6A6B3A", name: "Мох" },
      { hex: "#4F5230", name: "Тёмная олива" },
      { hex: "#5C3A28", name: "Шоколад" },
    ],
    contrast: "Средний",
    metal: "Медь, бронза",
    avoid: "Холодный розовый",
  },
  {
    id: "winter",
    name: "Зима",
    code: "Winter · Clear",
    desc: "Высокий холодный контраст. Ваш чёрный — угольный, ваш белый — снежный. Акценты обязаны быть чистыми: ни пыли, ни дымки.",
    colors: [
      { hex: "#F4F4F2", name: "Снежный" },
      { hex: "#B3325F", name: "Фуксия" },
      { hex: "#2C4E9E", name: "Сапфир" },
      { hex: "#157A5B", name: "Изумруд" },
      { hex: "#6E1F33", name: "Бордо" },
      { hex: "#3A3C40", name: "Графит" },
    ],
    contrast: "Высокий",
    metal: "Серебро, белое золото",
    avoid: "Землистые оттенки",
  },
];

/* ── Экспресс-анализ: образцы ── */

export interface ExpressResult {
  type: string;
  code: string;
  desc: string;
  palette: PaletteColor[];
  contrast: number;
  contrastLabel: string;
  metal: string;
  avoid: string;
}

export interface ExpressSample {
  id: string;
  name: string;
  img: string;
  thumb: string;
  result: ExpressResult;
}

const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const EXPRESS_SAMPLES: ExpressSample[] = [
  {
    id: "spring",
    name: "Образец I",
    img: px(26614426, 1000, 1250),
    thumb: px(26614426, 200, 250),
    result: {
      type: "Светлая весна",
      code: "Spring · Light",
      desc: "Тёплый прозрачный колорит. База — кремовые и песочные тона, акценты — свежая зелень и шафран.",
      palette: SEASON_PALETTES[0].colors.slice(0, 6),
      contrast: 28,
      contrastLabel: "Мягкий",
      metal: "Жёлтое золото",
      avoid: "Чёрный у лица",
    },
  },
  {
    id: "summer",
    name: "Образец II",
    img: px(9836064, 1000, 1250),
    thumb: px(9836064, 200, 250),
    result: {
      type: "Мягкое лето",
      code: "Summer · Soft",
      desc: "Прохладный приглушённый колорит. Дымчатые контрасты и пыльные оттенки вместо чистых цветов.",
      palette: SEASON_PALETTES[1].colors.slice(0, 6),
      contrast: 36,
      contrastLabel: "Мягкий — средний",
      metal: "Серебро",
      avoid: "Оранжевый",
    },
  },
  {
    id: "autumn",
    name: "Образец III",
    img: px(20439913, 1000, 1250),
    thumb: px(20439913, 200, 250),
    result: {
      type: "Глубокая осень",
      code: "Autumn · Deep",
      desc: "Насыщенный тёплый колорит с золотистым подгоном кожи. Цвет спелого: горчица, хна, мох.",
      palette: SEASON_PALETTES[2].colors.slice(0, 6),
      contrast: 58,
      contrastLabel: "Средний",
      metal: "Медь, бронза",
      avoid: "Пастельный неон",
    },
  },
  {
    id: "winter",
    name: "Образец IV",
    img: px(7205433, 1000, 1250),
    thumb: px(7205433, 200, 250),
    result: {
      type: "Глубокая зима",
      code: "Winter · Clear",
      desc: "Высокий холодный контраст. Чистые акценты обязаны быть чистыми: ни пыли, ни дымки.",
      palette: SEASON_PALETTES[3].colors.slice(0, 6),
      contrast: 88,
      contrastLabel: "Высокий",
      metal: "Серебро, белое золото",
      avoid: "Землистые тона",
    },
  },
];

/* ── Медиа ── */

export const MEDIA = {
  heroVideo: "hero-video.mp4",
  heroPoster: "hero-poster.jpg",
  aboutPortrait: "about-portrait.jpg",
  aboutSecondary: px(36583147, 800, 1000),
  beforeAfter: px(18516756, 1000, 1500),
  linen: px(1487713, 1200, 800),
  pricingBg: px(4554339, 1600, 1000),
  posts: [
    {
      img: px(34094489, 1000, 750),
    },
    {
      img: px(18278383, 1000, 750),
    },
    {
      img: px(33401683, 1000, 750),
    },
  ],
};

/* ── Метод ── */

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Бриф",
    time: "10 минут",
    text: "Анкета: образ жизни, референсы, ограничения. Я берусь за разбор сразу, как получу фото и ответы.",
  },
  {
    num: "02",
    title: "Анализ",
    time: "1–3 дня",
    text: "Считываю цветотип, уровень контраста и пропорции — вручную и внимательно, вещь за вещью.",
  },
  {
    num: "03",
    title: "Карта стиля",
    time: "PDF-гид",
    text: "Палитра, капсула, правила сочетаний и шпаргалка для шопинга. Поддержка в мессенджере — четырнадцать дней.",
  },
];

/* ── Отзывы ── */

export const TESTIMONIALS = [
  {
    name: "Виктория",
    meta: "34 · персональный разбор",
    quote:
      "Разбор пришёл через сутки. Я собрала капсулу из вещей, которые уже лежали в шкафу, — и закрыла вопрос «нечего надеть». Экономия, если честно, — примерно три зарплаты в год.",
  },
  {
    name: "Тамара",
    meta: "52 · семейный формат",
    quote:
      "Купила разбор мужу и себе. Муж, человек, который «и так всё знает», теперь присылает мне фото из магазина на проверку. Тишина в доме — тоже результат.",
  },
];

/* ── Журнал ── */

export const POSTS = [
  {
    num: "01",
    date: "12.11.2025",
    tag: "Колористика",
    time: "6 мин",
    title: "Как носить чёрный, если он вас старит",
    excerpt:
      "Чёрный — не цвет, а отсутствие цвета. Для половины колоритов он работает как разрыв: разбираем, чем заменить, не теряя графичности.",
  },
  {
    num: "02",
    date: "28.10.2025",
    tag: "Гардероб",
    time: "8 мин",
    title: "Капсула из 12 вещей: метод трёх текстур",
    excerpt:
      "Почему сочетание матового, глянцевого и фактурного заменяет собой тридцать случайных покупок. Считаем на реальном примере.",
  },
  {
    num: "03",
    date: "15.10.2025",
    tag: "Тренды",
    time: "5 мин",
    title: "Почему тренды вам ничего не должны",
    excerpt:
      "Индивидуальная палитра первична, сезонная витрина — вторична. Как фильтровать тренды через свою карту стиля и не тратить деньги зря.",
  },
];
