import { useState, useEffect } from "react"

function getMessage(pct) {
  if (pct === 100) return { emoji: "🏆", text: "¡Puntuación perfecta! Eres un master del prompting." }
  if (pct >= 85) return { emoji: "🌟", text: "¡Impresionante! Dominas esta técnica." }
  if (pct >= 70) return { emoji: "💪", text: "¡Muy bien! Ya entiendes los fundamentos." }
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
            <stop offset="0%" stopColor="var(--color-accent-blue)" />
            <stop offset="100%" stopColor="var(--color-accent-green)" />
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
  const pct = Math.round((correctas / totalPreguntas) * 100)
  const passed = correctas >= Math.ceil(totalPreguntas * 0.7)
  const msg = getMessage(pct)

  // Animated XP counter: 0 → total in 1.5s
  const [xpAnim, setXpAnim] = useState(0)
  useEffect(() => {
    const duration = 1500
    const steps = 40
    const interval = duration / steps
    const increment = xp / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= xp) { current = xp; clearInterval(timer) }
      setXpAnim(Math.round(current))
    }, interval)
    return () => clearInterval(timer)
  }, [xp])

  const linkedIn = encodeURIComponent(
    `Completé "${leccion.titulo}" en Estratek IA Academy — ${pct}% de aciertos, ${xp} XP.\n\nPrompt Engineering Profesional.\n\n#EstrategiaIA #PromptEngineering #Anthropic`)

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-2">
      {/* Particles */}
      {passed && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="absolute" style={{
              left: `${8 + Math.random() * 84}%`, top: "-2%",
              width: `${3 + Math.random() * 5}px`, height: `${3 + Math.random() * 5}px`,
              borderRadius: "2px",
              backgroundColor: ["#3B82F6","#8B5CF6","#22d3ee","#10B981","#F59E0B"][i % 5],
              animation: `confetti-fall ${2.5 + Math.random() * 2.5}s ease-in ${Math.random() * 1.2}s forwards`,
            }} />
          ))}
        </div>
      )}

      <div className="surface rounded-2xl p-8 w-full relative z-10 animate-scale-in">
        <p className="text-5xl mb-3">{msg.emoji}</p>
        <h3 className="font-display text-2xl font-extrabold text-gradient mb-1">¡Lección completada!</h3>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>{msg.text}</p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mb-6 animate-reveal" style={{ animationDelay: "200ms" }}>
          <ProgressCircle pct={pct} />
          <div className="text-left">
            <p className="font-display text-3xl font-extrabold text-gradient">+{xpAnim}</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>XP ganados</p>
            <p className="text-sm mt-3" style={{ color: "var(--color-text-secondary)" }}>
              <span className="font-bold" style={{ color: "var(--color-text-primary)" }}>{correctas}</span> / {totalPreguntas} correctas
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className={`mb-6 animate-reveal ${passed ? "" : "opacity-40"}`} style={{ animationDelay: "400ms" }}>
          <div className={`surface rounded-2xl p-4 flex items-center gap-4 ${passed ? "glow-blue" : ""}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
              passed ? "animate-badge-unlock" : ""}`}
              style={{ background: passed ? "linear-gradient(135deg, #3B82F6, #8B5CF6)" : "rgba(255,255,255,0.03)" }}>
              {leccion.tipo === "practica" ? "🔬" : leccion.tipo === "evaluacion" ? "📝" : "📖"}
            </div>
            <div className="text-left">
              <p className="font-display text-sm font-bold flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                {leccion.titulo}
                {passed && (
                  <span style={{ fontSize: "9px", fontWeight: 700, color: "#6EE7B7", background: "rgba(16,185,129,0.1)", padding: "2px 6px", borderRadius: "99px" }}>
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

        {/* Actions */}
        <div className="flex flex-col gap-3 animate-reveal" style={{ animationDelay: "600ms" }}>
          {passed && (
            <a href={`https://www.linkedin.com/feed/?shareActive=true&text=${linkedIn}`}
              target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:translate-y-[-1px]"
              style={{ background: "#0A66C2" }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Compartir en LinkedIn
            </a>
          )}
          <button onClick={onRestart} className="w-full px-5 py-3.5 rounded-xl text-sm font-semibold surface transition-all hover:bg-white/6"
            style={{ color: "var(--color-text-secondary)" }}>
            Intentar de nuevo
          </button>
          <button onClick={onVolver} className="btn-primary w-full px-5 py-3.5 text-sm font-semibold text-white">
            {passed && hayNextLesson ? "Siguiente lección →" : "Volver"}
          </button>
        </div>
      </div>
    </div>
  )
}
