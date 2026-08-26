interface Props {
  items: string[];
  tone?: "dark" | "light";
  className?: string;
}

/** Бесконечная редакционная бегущая строка */
export default function Marquee({ items, tone = "dark", className = "" }: Props) {
  const border = tone === "dark" ? "border-line" : "border-lined";
  return (
    <div className={`overflow-hidden border-y ${border} py-4 md:py-5 ${className}`}>
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <span key={i} className="mx-5 flex items-baseline gap-5 md:mx-8 md:gap-8">
                <span className="display text-xl italic md:text-3xl">{item}</span>
                <span
                  className={`label ${
                    tone === "dark" ? "text-gold/75" : "text-gold-deep/60"
                  }`}
                >
                  /{String(i + 1).padStart(2, "0")}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
