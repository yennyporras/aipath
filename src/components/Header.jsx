export default function Header({ rachaDiaria, rachaActual, installButton }) {
  return (
    <header className="w-full max-w-lg lg:max-w-none mx-auto flex justify-between items-center mb-5 animate-reveal"
      style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
      <div className="aipath-logo">
        <span className="logo-text">AI</span>
        <span className="logo-accent">Path</span>
      </div>
      <div className="flex items-center gap-2">
        {installButton && <div className="hidden lg:block">{installButton}</div>}
        <div className={`surface flex items-center gap-2 px-3 py-1.5 rounded-full ${rachaActual >= 3 ? "glow-streak" : ""}`}>
          <span className="text-sm">{rachaActual >= 3 ? "🔥" : "⚡"}</span>
          <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
            {rachaDiaria} {rachaDiaria === 1 ? "día" : "días"}
          </span>
          {rachaActual >= 3 && (
            <span className="text-[10px] font-bold text-amber-400 animate-scale-in">{rachaActual}x</span>
          )}
        </div>
      </div>
    </header>
  )
}
