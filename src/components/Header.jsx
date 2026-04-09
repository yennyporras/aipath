// Header — muestra logo AIPath y racha diaria con efecto visual según momentum
export default function Header({ rachaDiaria, rachaActual }) {
  return (
    <header className="w-full max-w-lg mx-auto flex justify-between items-center mb-5 animate-slide-down">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-black tracking-tight glow-blue">
          AI
        </div>
        <h1 className="text-xl font-bold text-gradient">AIPath</h1>
      </div>

      {/* Racha diaria con glow cuando hay momentum */}
      <div
        className={`glass flex items-center gap-2 px-3.5 py-2 rounded-full transition-all duration-500 ${
          rachaActual >= 3 ? "glow-streak" : ""
        }`}
      >
        <span className="text-base">
          {rachaActual >= 3 ? "🔥" : "✨"}
        </span>
        <span className="text-sm font-medium text-gray-300">
          {rachaDiaria} {rachaDiaria === 1 ? "día" : "días"}
        </span>
        {rachaActual >= 3 && (
          <span className="text-xs font-bold text-amber-400 animate-scale-in">
            {rachaActual}x
          </span>
        )}
      </div>
    </header>
  )
}
