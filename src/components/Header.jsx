export default function Header({ rachaDiaria, rachaActual }) {
  return (
    <header className="w-full max-w-lg mx-auto flex justify-between items-center mb-5 animate-reveal">
      <div className="flex items-center gap-2">
        <img src="/etk-logo-white.png" alt="Estratek IA Academy" className="h-8 w-auto opacity-90" />
      </div>
      <div className={`surface flex items-center gap-2 px-3 py-1.5 rounded-full ${rachaActual >= 3 ? "glow-streak" : ""}`}>
        <span className="text-sm">{rachaActual >= 3 ? "🔥" : "✨"}</span>
        <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
          {rachaDiaria} {rachaDiaria === 1 ? "día" : "días"}
        </span>
        {rachaActual >= 3 && (
          <span className="text-[10px] font-bold text-amber-400 animate-scale-in">{rachaActual}x</span>
        )}
      </div>
    </header>
  )
}
