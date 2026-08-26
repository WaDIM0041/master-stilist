/**
 * Живой анимированный фон: медленно дрейфующие золотые «авроры»
 * и вращающийся шёлковый конический градиент.
 * Виден сквозь полупрозрачные тёмные секции.
 */
export default function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-ink" />

      {/* Золотые дрейфующие массы */}
      <div
        className="aurora-a absolute -left-[15%] top-[-22%] h-[62vmax] w-[62vmax] rounded-full opacity-70 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,164,92,0.15), rgba(201,164,92,0) 65%)",
        }}
      />
      <div
        className="aurora-b absolute right-[-18%] top-[20%] h-[56vmax] w-[56vmax] rounded-full opacity-60 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(138,109,59,0.17), rgba(138,109,59,0) 65%)",
        }}
      />
      <div
        className="aurora-c absolute bottom-[-28%] left-[18%] h-[58vmax] w-[58vmax] rounded-full opacity-60 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(230,207,154,0.11), rgba(230,207,154,0) 60%)",
        }}
      />

      {/* Вращающийся «шёлк» */}
      <div
        className="silk absolute left-1/2 top-1/2 h-[85vmax] w-[85vmax] rounded-full opacity-30 blur-[90px]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(201,164,92,0.08) 60deg, transparent 135deg, rgba(201,164,92,0.06) 225deg, transparent 310deg)",
        }}
      />
    </div>
  );
}
