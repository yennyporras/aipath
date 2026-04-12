import { lazy, Suspense } from "react"
import AIPathLogo from "./AIPathLogo"

const PomodoroTimer = lazy(() => import("./PomodoroTimer"))

export default function Header({ rachaDiaria, rachaActual, installButton, onVolverAInicio, onPomodoroXp, onPomodoroBadge }) {
  return (
    <header className="w-full max-w-lg lg:max-w-none mx-auto flex justify-between items-center mb-5 animate-reveal"
      style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
      <button
        onClick={onVolverAInicio}
        className="flex items-center p-0"
        style={{ background: "none", border: "none", cursor: "pointer" }}
        aria-label="Volver al inicio"
      >
        <AIPathLogo size="sm" />
      </button>
      <div className="flex items-center gap-2">
        {installButton && <div className="hidden lg:block">{installButton}</div>}
        {/* Timer Pomodoro */}
        <Suspense fallback={null}><PomodoroTimer onXpGanado={onPomodoroXp} onBadgeDesbloqueado={onPomodoroBadge} /></Suspense>
        <div className={`surface flex items-center gap-2 px-3 py-1.5 rounded-full ${rachaActual >= 3 ? "glow-streak" : ""}`}>
          <span className="text-sm">{rachaActual >= 3 ? "🔥" : "⚡"}</span>
          <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
            {rachaDiaria} {rachaDiaria === 1 ? "día" : "días"}
          </span>
          {rachaActual >= 3 && (
            <span className="text-[10px] font-bold animate-scale-in" style={{ color: "#F97316" }}>{rachaActual}x</span>
          )}
        </div>
      </div>
    </header>
  )
}
