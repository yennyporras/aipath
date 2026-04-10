import { useState, useEffect } from "react"
import academyIndex from "../content/academy-index.json"

const NIVEL_COLORS = {
  "Principiante": "#10B981",
  "Intermedio":   "#3B82F6",
  "Técnico":      "#8B5CF6",
  "Avanzado":     "#EF4444",
  "Estratégico":  "#F59E0B",
  "Todos":        "#6366F1",
}

const FASE_INFO = {
  1: { label: "Fase 1 — Funcional",         sub: "6 módulos · Prioridad máxima",      color: "#10B981" },
  2: { label: "Fase 2 — Sólida",            sub: "6 módulos · ML + Backend",          color: "#3B82F6" },
  3: { label: "Fase 3 — Referente Mundial", sub: "5 módulos · Arquitectura profunda",  color: "#8B5CF6" },
}

// Calcula días/horas/minutos hasta el objetivo
function calcularCountdown() {
  const target = new Date("2026-10-31T23:59:59")
  const diff = target - new Date()
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0 }
  return {
    dias:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutos: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
  }
}

export default function AcademyScreen({ progreso, onSelectModulo }) {
  const completadas = progreso.leccionesCompletadas || []
  const modulos     = academyIndex.modulos
  const fases       = [1, 2, 3]

  const xpTotal = progreso.xpTotal || 0
  const nivel   = Math.floor(xpTotal / 300) + 1

  const [countdown, setCountdown] = useState(calcularCountdown)

  useEffect(() => {
    const id = setInterval(() => setCountdown(calcularCountdown()), 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto px-2 relative z-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="animate-reveal mb-6">
          <div className="aipath-logo justify-center" style={{ fontSize: "32px" }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "36px", color: "#F8F8FF" }}>AI</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "36px", color: "#6366F1" }}>Path</span>
          </div>
        </div>
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] animate-reveal"
          style={{ color: "var(--color-text-muted)", animationDelay: "80ms" }}>
          Academia de IA · Nivel Mundial
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-gradient mt-2 animate-reveal"
          style={{ animationDelay: "120ms", fontFamily: "'Outfit', sans-serif" }}>
          Tu ruta en IA
        </h2>
        <p className="text-sm mt-2 animate-reveal"
          style={{ color: "var(--color-text-secondary)", animationDelay: "160ms" }}>
          17 módulos · ~1,400 lecciones · De cero a referente mundial
        </p>
      </div>

      {/* Stats globales */}
      <div className="max-w-lg mx-auto surface rounded-2xl p-5 mb-4 animate-reveal grid grid-cols-4 gap-4 text-center"
        style={{ animationDelay: "200ms" }}>
        <div>
          <p className="text-lg font-bold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>{completadas.length}</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Lecciones</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>{xpTotal.toLocaleString()}</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>XP total</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>{nivel}</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Nivel</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>{progreso.rachaDiaria || 1}</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Racha</p>
        </div>
      </div>

      {/* Meta + Countdown */}
      <div className="max-w-lg mx-auto mb-8 animate-reveal" style={{ animationDelay: "240ms" }}>
        {/* Meta siempre visible */}
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: "#6366F1" }}>
          Meta: Referente en IA — Octubre 2026
        </p>
        {/* Contador regresivo */}
        <div className="surface rounded-2xl px-5 py-3 grid grid-cols-3 gap-2 text-center"
          style={{ border: "1px solid rgba(99,102,241,0.2)" }}>
          <div>
            <p className="text-2xl font-extrabold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {countdown.dias}
            </p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>días</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {countdown.horas}
            </p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>horas</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {countdown.minutos}
            </p>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>minutos</p>
          </div>
        </div>
      </div>

      {/* Módulos por fase */}
      {fases.map(faseKey => {
        const info = FASE_INFO[faseKey]
        const modulosFase = modulos.filter(m => m.fase === faseKey)

        return (
          <div key={faseKey} className="mb-8">
            {/* Separador de fase */}
            <div className="flex items-center gap-3 mb-4 animate-reveal">
              <div className="h-px flex-1" style={{ background: `${info.color}30` }} />
              <div className="text-center shrink-0">
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: info.color, fontFamily: "'Outfit', sans-serif" }}>
                  {info.label}
                </span>
                <span className="text-[10px] ml-2" style={{ color: "var(--color-text-muted)" }}>
                  · {info.sub}
                </span>
              </div>
              <div className="h-px flex-1" style={{ background: `${info.color}30` }} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {modulosFase.map((modulo, mi) => {
                const disponible = modulo.estado === "disponible"
                const doneCount  = completadas.filter(id => id.startsWith(modulo.id + "-")).length
                const pct        = modulo.lecciones_total > 0 ? (doneCount / modulo.lecciones_total) * 100 : 0

                return (
                  <button
                    key={modulo.id}
                    onClick={() => disponible && onSelectModulo(modulo)}
                    disabled={!disponible}
                    className={`animate-reveal text-left flex flex-col gap-3 p-4 rounded-2xl transition-all ${
                      disponible ? "surface-interactive cursor-pointer" : "cursor-not-allowed"
                    }`}
                    style={{
                      animationDelay: `${mi * 40}ms`,
                      opacity: disponible ? 1 : 0.45,
                      border: disponible ? `1px solid rgba(99,102,241,0.2)` : `1px solid var(--color-border)`
                    }}>

                    {/* Top */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: disponible ? `${modulo.color}18` : "rgba(255,255,255,0.04)" }}>
                        {disponible ? modulo.icono : "🔒"}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: `${NIVEL_COLORS[modulo.nivel] || "#6366F1"}18`,
                            color: NIVEL_COLORS[modulo.nivel] || "#6366F1"
                          }}>
                          {modulo.nivel?.toUpperCase()}
                        </span>
                        {!disponible && (
                          <span className="text-[9px]" style={{ color: "var(--color-text-muted)" }}>
                            Próximamente
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="font-display text-xs font-bold leading-tight"
                        style={{ color: disponible ? "var(--color-text-primary)" : "var(--color-text-muted)", fontFamily: "'Outfit', sans-serif" }}>
                        M{modulo.numero} — {modulo.titulo}
                      </p>
                      <p className="text-[11px] mt-1 leading-relaxed line-clamp-2"
                        style={{ color: "var(--color-text-muted)" }}>
                        {modulo.descripcion}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>
                          {modulo.lecciones_total} lecciones
                        </span>
                        <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>·</span>
                        <span style={{ fontSize: "10px", color: modulo.color || "#6366F1" }}>
                          {modulo.xp_total?.toLocaleString()} XP
                        </span>
                      </div>
                      {disponible && (
                        <span style={{ fontSize: "11px", color: "#6366F1" }}>→</span>
                      )}
                    </div>

                    {/* Progress */}
                    {disponible && (
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      <p className="text-center mt-4 mb-8 text-xs animate-reveal"
        style={{ color: "var(--color-text-muted)" }}>
        Nuevos módulos se activan cada semana · Meta: Octubre 2026
      </p>
    </div>
  )
}
