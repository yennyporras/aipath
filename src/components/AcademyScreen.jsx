import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import academyIndex from "../content/academy-index.json"
import { playSound } from "../utils/sounds"

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

// Contador numérico animado
function AnimatedNumber({ value, duration = 1200 }) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    let start = 0
    const steps = 40
    const increment = value / steps
    const id = setInterval(() => {
      start += increment
      if (start >= value) { setDisplayed(value); clearInterval(id) }
      else setDisplayed(Math.round(start))
    }, duration / steps)
    return () => clearInterval(id)
  }, [value, duration])
  return <>{displayed.toLocaleString()}</>
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

  // Variantes para cascada de cards
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  }
  const cardVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 relative z-10">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-4">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: "var(--color-text-muted)" }}>
            Academia de IA · Nivel Mundial
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-gradient mt-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            Tu ruta en IA
          </h2>
          <p className="text-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
            17 módulos · ~1,400 lecciones · De cero a referente mundial
          </p>
        </div>
      </motion.div>

      {/* Stats globales */}
      <motion.div
        className="max-w-lg mx-auto surface rounded-2xl p-5 mb-4 grid grid-cols-4 gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="text-lg font-bold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <AnimatedNumber value={completadas.length} />
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Lecciones</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <AnimatedNumber value={xpTotal} />
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>XP total</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <AnimatedNumber value={nivel} duration={600} />
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Nivel</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <AnimatedNumber value={progreso.rachaDiaria || 1} duration={600} />
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Racha</p>
        </div>
      </motion.div>

      {/* Meta + Countdown */}
      <motion.div
        className="max-w-lg mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: "#6366F1" }}>
          Meta: Referente en IA — Octubre 2026
        </p>
        <div className="surface rounded-2xl px-5 py-3 grid grid-cols-3 gap-2 text-center"
          style={{ border: "1px solid rgba(99,102,241,0.2)" }}>
          {[
            { val: countdown.dias,    label: "días" },
            { val: countdown.horas,   label: "horas" },
            { val: countdown.minutos, label: "minutos" },
          ].map(({ val, label }) => (
            <motion.div
              key={label}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 58, ease: "easeInOut" }}
            >
              <p className="text-2xl font-extrabold text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {val}
              </p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Módulos por fase */}
      {fases.map((faseKey, fi) => {
        const info = FASE_INFO[faseKey]
        const modulosFase = modulos.filter(m => m.fase === faseKey)

        return (
          <div key={faseKey} className="mb-8">
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + fi * 0.1 }}
            >
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
            </motion.div>

            {/* Grid con stagger */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {modulosFase.map((modulo) => {
                const disponible = modulo.estado === "disponible"
                const doneCount  = completadas.filter(id => id.startsWith(modulo.id + "-")).length
                const pct        = modulo.lecciones_total > 0 ? (doneCount / modulo.lecciones_total) * 100 : 0

                return (
                  <motion.button
                    key={modulo.id}
                    variants={cardVariants}
                    onClick={() => {
                      if (!disponible) return
                      playSound("unlock")
                      onSelectModulo(modulo)
                    }}
                    disabled={!disponible}
                    whileHover={disponible ? { scale: 1.02, y: -2 } : {}}
                    whileTap={disponible ? { scale: 0.98 } : {}}
                    className={`text-left flex flex-col gap-3 p-4 rounded-2xl transition-colors ${
                      disponible ? "surface-interactive cursor-pointer" : "cursor-not-allowed"
                    }`}
                    style={{
                      opacity: disponible ? 1 : 0.45,
                      border: disponible ? `1px solid rgba(99,102,241,0.2)` : `1px solid var(--color-border)`
                    }}
                  >
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
                  </motion.button>
                )
              })}
            </motion.div>
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
