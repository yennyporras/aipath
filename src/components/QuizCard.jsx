import { useState } from "react"

const PRAISE = ["¡Exacto!", "¡Correcto!", "¡Bien pensado!", "¡Perfecto!", "¡Excelente!", "¡Así se hace!", "¡Genial!"]

export default function QuizCard({ pregunta, indice, totalPreguntas, onAnswer, rachaActual }) {
  const [sel, setSel] = useState(null)
  const [showXP, setShowXP] = useState(false)
  const answered = sel !== null
  const correct = sel === pregunta.correcta

  function pick(i) {
    if (answered) return
    setSel(i)
    onAnswer(i === pregunta.correcta)
    if (i === pregunta.correcta) {
      setShowXP(true)
      setTimeout(() => setShowXP(false), 1400)
    }
  }

  const num = (indice || 0) + 1
  const pct = (num / totalPreguntas) * 100
  const labels = ["A", "B", "C", "D"]

  return (
    <div className="w-full max-w-lg mx-auto relative">
      {showXP && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="font-display animate-float-xp inline-block text-xl font-bold text-gradient">+30 XP</span>
        </div>
      )}

      <div className={`surface p-6 transition-all duration-300 ${
        answered && !correct ? "animate-shake" : ""
      } ${answered && correct ? "animate-pulse-green" : ""} ${
        rachaActual >= 3 && !answered ? "border-gradient active" : ""
      }`}>
        {/* Progress */}
        <div className="quiz-progress mb-5">
          <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
            Pregunta <span className="font-display font-bold" style={{ color: "var(--color-text-primary)" }}>{num}</span> de {totalPreguntas}
          </span>
          {rachaActual >= 3 && (
            <span className="text-[10px] font-bold text-amber-400 animate-scale-in"
              style={{ background: "rgba(251,191,36,0.1)", padding: "2px 8px", borderRadius: "99px" }}>
              🔥 {rachaActual}x
            </span>
          )}
        </div>

        <h2 className="font-display text-lg font-bold leading-relaxed mb-6"
          style={{ color: "var(--color-text-primary)" }}>
          {pregunta.pregunta}
        </h2>

        <div className="flex flex-col gap-2.5 stagger">
          {pregunta.opciones.map((opt, i) => {
            let borderC = "var(--color-border)"
            let bgC = "transparent"
            let textC = "var(--color-text-secondary)"
            let labelBg = "rgba(255,255,255,0.04)"
            let labelC = "var(--color-text-muted)"

            if (answered) {
              if (i === pregunta.correcta) {
                borderC = "rgba(16,185,129,0.5)"; bgC = "rgba(16,185,129,0.06)"
                textC = "#6EE7B7"; labelBg = "rgba(16,185,129,0.15)"; labelC = "#6EE7B7"
              } else if (i === sel) {
                borderC = "rgba(239,68,68,0.5)"; bgC = "rgba(239,68,68,0.06)"
                textC = "#FCA5A5"; labelBg = "rgba(239,68,68,0.15)"; labelC = "#FCA5A5"
              } else {
                borderC = "rgba(255,255,255,0.03)"; textC = "var(--color-text-muted)"
                labelBg = "rgba(255,255,255,0.02)"; labelC = "rgba(255,255,255,0.15)"
              }
            }

            return (
              <button key={i} onClick={() => pick(i)} disabled={answered}
                className={`option-btn animate-reveal w-full text-left px-4 py-3.5 flex items-start gap-3`}
                style={{ borderColor: borderC, background: bgC, animationDelay: `${i * 60}ms` }}>
                <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: labelBg, color: labelC }}>
                  {labels[i]}
                </span>
                <span className="text-sm leading-relaxed pt-0.5" style={{ color: textC }}>{opt}</span>
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="animate-reveal mt-5 p-4 rounded-xl"
            style={{
              background: correct ? "rgba(16,185,129,0.06)" : "rgba(245,158,11,0.06)",
              border: `1px solid ${correct ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)"}`,
              animationDelay: "0ms"
            }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{correct ? "✅" : "💡"}</span>
              <p className="font-display text-sm font-bold" style={{ color: correct ? "#6EE7B7" : "#FBBF24" }}>
                {correct ? PRAISE[(indice || 0) % PRAISE.length] : "Casi — recuerda esto:"}
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {pregunta.explicacion_profunda}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
