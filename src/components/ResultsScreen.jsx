import { useState, useEffect } from "react"

function getMessage(pct) {
  if (pct === 100) return { emoji: "🏆", text: "¡Puntuación perfecta! Dominas este concepto." }
  if (pct >= 85)  return { emoji: "🌟", text: "¡Excelente! Casi perfecto." }
  if (pct >= 70)  return { emoji: "💪", text: "¡Aprobado! Ya entiendes los fundamentos." }
  return { emoji: "📚", text: "Buen intento. Repasa y vuelve más fuerte." }
}

function ProgressCircle({ pct }) {
  const r = 45, c = 2 * Math.PI * r
  const off = c - (pct / 100) * c
  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 circle-progress" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="5" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#gResult)" strokeWidth="5"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} className="animate-circle-fill" />
        <defs>
          <linearGradient id="gResult" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-extrabold">{pct}%</span>
        <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>aciertos</span>
      </div>
    </div>
  )
}

export default function ResultsScreen({ leccion, correctas, totalPreguntas, xp, onRestart, onVolver, hayNextLesson }) {
  const pct    = totalPreguntas > 0 ? Math.round((correctas / totalPreguntas) * 100) : 100
  const passed = totalPreguntas === 0 || correctas >= Math.ceil(totalPreguntas * 0.7)
  const msg    = getMessage(pct)

  const [xpAnim, setXpAnim] = useState(0)
  useEffect(() => {
    const steps = 40, duration = 1500
    const increment = xp / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= xp) { current = xp; clearInterval(timer) }
      setXpAnim(Math.round(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [xp])

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-2">
      {/* Partículas si aprobó */}
      {passed && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="absolute" style={{
              left: `${8 + Math.random() * 84}%`, top: "-2%",
              width: `${3 + Math.random() * 5}px`, height: `${3 + Math.random() * 5}px`,
              borderRadius: "2px",
              backgroundColor: ["#6366F1","#8B5CF6","#A78BFA","#F59E0B","#10B981"][i % 5],
              animation: `confetti-fall ${2.5 + Math.random() * 2.5}s ease-in ${Math.random() * 1.2}s forwards`,
            }} />
          ))}
        </div>
      )}

      <div className="surface rounded-2xl p-8 w-full relative z-10 animate-scale-in">
        <p className="text-5xl mb-3">{msg.emoji}</p>
        <h3 className="font-display text-2xl font-extrabold text-gradient mb-1"
          style={{ fontFamily: "'Outfit', sans-serif" }}>
          ¡Lección completada!
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>{msg.text}</p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mb-6 animate-reveal" style={{ animationDelay: "200ms" }}>
          <ProgressCircle pct={pct} />
          <div className="text-left">
            <p className="font-display text-3xl font-extrabold" style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}>
              +{xpAnim}
            </p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>XP ganados</p>
            <p className="text-sm mt-3" style={{ color: "var(--color-text-secondary)" }}>
              <span className="font-bold" style={{ color: "var(--color-text-primary)" }}>{correctas}</span> / {totalPreguntas} correctas
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className={`mb-6 animate-reveal ${passed ? "" : "opacity-40"}`} style={{ animationDelay: "400ms" }}>
          <div className={`surface rounded-2xl p-4 flex items-center gap-4 ${passed ? "glow-indigo" : ""}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${passed ? "animate-badge-unlock" : ""}`}
              style={{ background: passed ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "rgba(255,255,255,0.03)" }}>
              📖
            </div>
            <div className="text-left">
              <p className="font-display text-sm font-bold flex items-center gap-2"
                style={{ color: "var(--color-text-primary)" }}>
                {leccion.titulo}
                {passed && (
                  <span style={{ fontSize: "9px", fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.1)", padding: "2px 6px", borderRadius: "99px" }}>
                    APROBADO
                  </span>
                )}
              </p>
              <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                {leccion.duracion_min} min · {leccion.xp} XP
              </p>
              {!passed && (
                <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                  Necesitas 70%+ para aprobar
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-3 animate-reveal" style={{ animationDelay: "600ms" }}>
          <button onClick={onRestart}
            className="w-full px-5 py-3.5 rounded-xl text-sm font-semibold surface transition-all"
            style={{ color: "var(--color-text-secondary)" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = ""}>
            Intentar de nuevo
          </button>
          <button onClick={onVolver} className="btn-primary w-full px-5 py-3.5 text-sm font-semibold">
            {passed && hayNextLesson ? "Siguiente lección →" : "Volver"}
          </button>
        </div>
      </div>
    </div>
  )
}
