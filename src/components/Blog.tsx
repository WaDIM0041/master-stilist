type Post = {
  title: string;
  href: string;
  img: string;
  date: string;
  tag: string;
  excerpt: string;
};

const POSTS: Post[] = [
  {
    title: "Осенняя капсула: гардероб, в котором каждое утро есть что надеть",
    href: "/blog/osennyaya-kapsula-kak-sobrat-garderob-v-kotorom-kazhdoe-utro-est-chto-nadet",
    img: "/static/site/img/blog-osen.jpg",
    date: "25 августа 2026",
    tag: "Сезон",
    excerpt: "Немного вещей, которые дружат между собой — и осень становится проще.",
  },
  {
    title: "Кривое зеркало: почему мы годами выбираем не своё",
    href: "/blog/krivoe-zerkalo-pochemu-my-godami-vybiraem-ne-svoe",
    img: "/static/site/img/blog-krivoe.jpg",
    date: "18 июля 2026",
    tag: "Гардероб и жизнь",
    excerpt: "Почему годами покупаем не своё — и как это наконец заметить.",
  },
  {
    title: "Что подарить той, у кого будто бы всё есть",
    href: "/blog/chto-podarit-toy-u-kogo-budto-by-vse-est",
    img: "/static/site/img/blog-podarok.jpg",
    date: "12 июля 2026",
    tag: "Гардероб и жизнь",
    excerpt: "Подарок, который точно пригодится — и попадёт в человека.",
  },
];

export default function Blog() {
  return (
    <section id="journal" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-ink/45" data-reveal>09 / Журнал</p>
            <h2
              className="display mt-5 text-4xl sm:text-5xl lg:text-6xl"
              data-reveal
            >
              Заметки <em className="italic">о стиле</em>
            </h2>
          </div>
          <a
            href="/blog/"
            className="label text-[10px] text-ink/50 underline decoration-ink/30 underline-offset-8 transition-colors hover:text-ink hover:decoration-ink"
            data-reveal
            aria-label="Все записи журнала"
          >
            все записи →
          </a>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3" data-reveal-group>
          {POSTS.map((post) => (
            <a key={post.href} href={post.href} className="group block">
              <div className="overflow-hidden border border-lined">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="mono-media aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:[filter:none]"
                />
              </div>
              <p className="label mt-5 text-[9px] text-ink/40">
                {post.date} · {post.tag}
              </p>
              <h3 className="display mt-3 text-2xl italic leading-tight transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-deep sm:text-[1.7rem]">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {post.excerpt}
              </p>
              <span className="label mt-5 inline-flex items-center gap-3 text-[9px] text-gold-deep/80 transition-colors group-hover:text-gold-deep">
                читать
                <span className="h-px w-8 bg-gold-deep/40 transition-all duration-500 group-hover:w-14 group-hover:bg-gold-deep" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
