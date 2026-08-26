import { MEDIA, POSTS } from "../data/content";

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
            href="#journal"
            onClick={(e) => e.preventDefault()}
            className="label text-[10px] text-ink/50 underline decoration-ink/30 underline-offset-8 transition-colors hover:text-ink hover:decoration-ink"
            data-reveal
            aria-label="Все записи журнала"
          >
            все записи →
          </a>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3" data-reveal-group>
          {POSTS.map((post, i) => (
            <article key={post.num} className="group cursor-pointer">
              <div className="overflow-hidden border border-lined">
                <img
                  src={MEDIA.posts[i].img}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="mono-media aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <p className="label text-[9px] text-ink/40">
                  {post.date} · {post.tag}
                </p>
                <p className="label text-[9px] text-ink/40">{post.time} чтения</p>
              </div>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
