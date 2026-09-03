/* ─────────────────────────────────────────────
   Master Stilist — единый контент сайта
   ───────────────────────────────────────────── */

export const CONTACTS = {
  telegram: "https://t.me/Tanyahoney",
  vk: "https://vk.ru/molokomyod",
  max: "https://max.ru/u/f9LHodD0cOLV1X5TekPA8-pMGhoFE84RmTxeP_3Tz9RiMUQRHnkBdeIsRMw",
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
  img: string;
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  private: "Частный разбор",
  family: "Семейный формат",
  pro: "Для мастеров",
};

export const SERVICES: Service[] = [
  {
    id: "personal",
    img: "/static/site/img/svc-personal.jpg",
    num: "001",
    cat: "private",
    title: "Персональный разбор стиля",
    price: "1 490 ₽",
    note: "стартовый тариф — 700 ₽",
    desc: "Полная карта стиля: цветотип, уровень контраста, силуэты, капсула из 30+ вещей и шопинг-лист. PDF-гид и поддержка стилиста 14 дней.",
  },
  {
    id: "men",
    img: "/static/site/img/svc-men.jpg",
    num: "002",
    cat: "private",
    title: "Мужской разбор",
    price: "1 290 ₽",
    note: "гардероб и колористика",
    desc: "Мужской типаж без догадок: базовая капсула, деловой дресс-код, цветовые правила, которые работают в реальной жизни.",
  },
  {
    id: "event",
    img: "/static/site/img/svc-event.jpg",
    num: "003",
    cat: "private",
    title: "Разбор под особый случай",
    price: "1 990 ₽",
    note: "два круга правок",
    desc: "Свадьба, съёмка, выпускной. Образ под дресс-код, площадку и освещение. Подбираем силуэт, ткань и палитру украшений.",
  },
  {
    id: "cert",
    img: "/static/site/img/svc-cert.jpg",
    num: "004",
    cat: "private",
    title: "Подарочный сертификат",
    price: "от 700 ₽",
    note: "срок действия — 6 месяцев",
    desc: "Электронный сертификат на любой разбор. Открыка, инструкция и передача получателю — в один клик.",
  },
  {
    id: "kids",
    img: "/static/site/img/svc-kids.jpg",
    num: "005",
    cat: "family",
    title: "Детский разбор",
    price: "от 490 ₽",
    note: "3–14 лет",
    desc: "Мягкий анализ цветотипа ребёнка: палитра для одежды, школьных фото и утренников. Без сложных терминов — с картинками.",
  },
  {
    id: "family",
    img: "/static/site/img/svc-family.jpg",
    num: "006",
    cat: "family",
    title: "Семейный разбор",
    price: "от 1 490 ₽",
    note: "скидка на каждого следующего",
    desc: "Палитры и капсулы для всей семьи: от прогулок до семейной фотосессии. Общая карта цветов, в которых вы гармоничны вместе.",
  },
  {
    id: "pro",
    img: "/static/site/img/svc-pro.jpg",
    num: "007",
    cat: "pro",
    title: "Гайд по колористике — мастерам",
    price: "Бесплатно",
    note: "справочник для мастеров",
    desc: "Бесплатный справочник для мастеров: какие оттенки идут тёплому и холодному подтону, что освежает лицо, а что гасит. Открой, когда клиент спрашивает «какую блондинку».",
  },
  {
    id: "partner",
    img: "/static/site/img/svc-partner.jpg",
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

const px = (id: number, _w: number, _h: number) =>
  `/static/site/img/${id}.jpg`;

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
    city: "Ростов-на-Дону",
    before: "/static/site/img/viktoria-before.jpg",
    after: "/static/site/img/viktoria-after.jpg",
    quote:
      "Не ожидала, что по фото можно так точно попасть. Татьяна разложила по полочкам, какие цвета у лица работают, а какие меня гасят. Особенно зашли волосы — сливовые пряди теперь моя любимая деталь. Открываю страницу перед каждой покупкой.",
  },
  {
    name: "Тамара",
    city: "Санкт-Петербург",
    before: "/static/site/img/tamara-before.jpg",
    after: "/static/site/img/tamara-after.jpg",
    quote:
      "Шла на разбор из любопытства, а получила инструкцию на каждый день. Перестала покупать вещи, которые потом просто висят. Очень тёплая подача — без давления и без «ты всё делаешь не так».",
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


/* ── 12 подтипов (сезон × 3) ── */
export interface SeasonSubtype extends SeasonPalette {
  season: string;
}

export const SEASON_SUBTYPES: SeasonSubtype[] = [
  { id: "spring-light", season: "Весна", name: "Светлая весна", code: "Spring · Light",
    desc: "Самый светлый и нежный из тёплых. База — крем и песок, акценты будто разбавлены молоком.",
    colors: [ {hex:"#EFE3C8",name:"Крем-брюле"},{hex:"#FAD0AE",name:"Персик"},{hex:"#C4E3C7",name:"Мятная зелень"},{hex:"#F3E08A",name:"Нежно-жёлтый"},{hex:"#FBA98C",name:"Светлый коралл"},{hex:"#9AD8D0",name:"Аквамарин"} ],
    contrast: "Мягкий", metal: "Светлое золото", avoid: "Чёрный, тёмные холодные" },
  { id: "spring-warm", season: "Весна", name: "Тёплая весна", code: "Spring · Warm",
    desc: "Чистое тёплое золото. Цвета спелые и солнечные, но не тёмные.",
    colors: [ {hex:"#E7C596",name:"Тёплый беж"},{hex:"#DFA23E",name:"Золото"},{hex:"#82B053",name:"Травяной"},{hex:"#FF7F50",name:"Коралл"},{hex:"#2FB6A8",name:"Тёплая бирюза"},{hex:"#A9713B",name:"Карамель"} ],
    contrast: "Средний", metal: "Жёлтое золото", avoid: "Пыльные, серые" },
  { id: "spring-bright", season: "Весна", name: "Яркая весна", code: "Spring · Bright",
    desc: "Тёплый, но контрастный и звонкий. Цвета чистые и сочные.",
    colors: [ {hex:"#12B3BF",name:"Бирюза"},{hex:"#F0453A",name:"Тёплый красный"},{hex:"#A6CE39",name:"Лайм"},{hex:"#FFC21A",name:"Солнечный жёлтый"},{hex:"#EF5DA8",name:"Тёплая фуксия"},{hex:"#2E6FE0",name:"Ярко-синий"} ],
    contrast: "Высокий", metal: "Яркое золото", avoid: "Приглушённые, дымчатые" },

  { id: "summer-light", season: "Лето", name: "Светлое лето", code: "Summer · Light",
    desc: "Прохладный и светлый. Пудра, дымка, холодные пастели.",
    colors: [ {hex:"#EAD7DE",name:"Пудра"},{hex:"#BCD4E6",name:"Голубой"},{hex:"#C9C3E0",name:"Лаванда"},{hex:"#BFE0D6",name:"Холодная мята"},{hex:"#D9B9C0",name:"Серо-розовый"},{hex:"#D6D8DC",name:"Светло-серый"} ],
    contrast: "Мягкий", metal: "Серебро", avoid: "Чёрный, оранжевый" },
  { id: "summer-cool", season: "Лето", name: "Холодное лето", code: "Summer · Cool",
    desc: "Прохладный со средним контрастом. Синева и фиолет в основе.",
    colors: [ {hex:"#7FA1C0",name:"Серо-голубой"},{hex:"#9A8FBF",name:"Лаванда"},{hex:"#B04A6E",name:"Холодный малиновый"},{hex:"#4E9E86",name:"Мягкий изумруд"},{hex:"#4C6B8A",name:"Серо-синий"},{hex:"#C48CA0",name:"Дымчатая роза"} ],
    contrast: "Средний", metal: "Серебро", avoid: "Тёплые, золотистые" },
  { id: "summer-soft", season: "Лето", name: "Мягкое лето", code: "Summer · Soft",
    desc: "Прохладный и приглушённый. Всё будто в лёгком тумане.",
    colors: [ {hex:"#A7A9AD",name:"Дымчатый серый"},{hex:"#C9A6AD",name:"Пыльная роза"},{hex:"#9FB0A0",name:"Шалфей"},{hex:"#8E7C8C",name:"Серо-сливовый"},{hex:"#7FA6A0",name:"Приглушённый бирюзовый"},{hex:"#C0C4C8",name:"Туман"} ],
    contrast: "Мягкий", metal: "Матовое серебро", avoid: "Яркие чистые цвета" },

  { id: "autumn-soft", season: "Осень", name: "Мягкая осень", code: "Autumn · Soft",
    desc: "Тёплый и приглушённый. Земля, шалфей, пыльная терракота.",
    colors: [ {hex:"#C7B299",name:"Тёплый беж"},{hex:"#8B9A6B",name:"Шалфей"},{hex:"#B0745B",name:"Пыльная терракота"},{hex:"#C7A24A",name:"Мягкая горчица"},{hex:"#6F9A94",name:"Пыльный бирюзовый"},{hex:"#7A5B45",name:"Какао"} ],
    contrast: "Мягкий — средний", metal: "Матовое золото", avoid: "Холодные яркие" },
  { id: "autumn-warm", season: "Осень", name: "Тёплая осень", code: "Autumn · Warm",
    desc: "Насыщенное тёплое золото. Горчица, ржавчина, мох, тыква.",
    colors: [ {hex:"#C8931F",name:"Горчица"},{hex:"#B5502A",name:"Ржавый"},{hex:"#6E7B33",name:"Олива"},{hex:"#D77A2B",name:"Тыква"},{hex:"#2E8B77",name:"Тёплый тил"},{hex:"#5C3A21",name:"Шоколад"} ],
    contrast: "Средний", metal: "Медь, бронза", avoid: "Серо-холодные пастели" },
  { id: "autumn-deep", season: "Осень", name: "Тёмная осень", code: "Autumn · Deep",
    desc: "Тёплый и глубокий, высокий контраст. Пряности и тёмное дерево.",
    colors: [ {hex:"#3E2A1E",name:"Тёмный шоколад"},{hex:"#6E2A2A",name:"Тёплый бордо"},{hex:"#4A5327",name:"Тёмная олива"},{hex:"#B85C1E",name:"Тёмная тыква"},{hex:"#1F5E52",name:"Тёмный тил"},{hex:"#9A6B1E",name:"Глубокое золото"} ],
    contrast: "Высокий", metal: "Тёмное золото, бронза", avoid: "Пыльные светлые пастели" },

  { id: "winter-bright", season: "Зима", name: "Яркая зима", code: "Winter · Bright",
    desc: "Холодный и максимально звонкий. Чистые электрик и фуксия.",
    colors: [ {hex:"#14161F",name:"Чёрно-синий"},{hex:"#FFFFFF",name:"Чистый белый"},{hex:"#0E63E8",name:"Электрик"},{hex:"#E01E7B",name:"Фуксия"},{hex:"#04B5C4",name:"Ярко-бирюзовый"},{hex:"#EDE84A",name:"Холодный лимон"} ],
    contrast: "Очень высокий", metal: "Серебро, хром", avoid: "Приглушённые, землистые" },
  { id: "winter-cool", season: "Зима", name: "Холодная зима", code: "Winter · Cool",
    desc: "Холодный и чистый. Снег, уголь, малина, синий.",
    colors: [ {hex:"#F5F7FA",name:"Снежно-белый"},{hex:"#2A2C31",name:"Угольный"},{hex:"#C61E5B",name:"Малиновый"},{hex:"#A9D2E6",name:"Ледяной голубой"},{hex:"#1E49C0",name:"Чистый синий"},{hex:"#0F7A5A",name:"Холодный изумруд"} ],
    contrast: "Высокий", metal: "Серебро", avoid: "Золотистые, тёплые" },
  { id: "winter-deep", season: "Зима", name: "Тёмная зима", code: "Winter · Deep",
    desc: "Холодный и глубокий. Чёрный, вино, изумруд, сапфир.",
    colors: [ {hex:"#111114",name:"Чёрный"},{hex:"#F2F4F7",name:"Ледяной белый"},{hex:"#6A1E3A",name:"Холодное вино"},{hex:"#0E6B4E",name:"Изумруд"},{hex:"#143A7A",name:"Сапфир"},{hex:"#C01E6B",name:"Холодная фуксия"} ],
    contrast: "Высокий", metal: "Серебро, платина", avoid: "Тёплые пыльные" },
];
