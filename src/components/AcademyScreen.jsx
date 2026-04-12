import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import academyIndex from "../content/academy-index.json"
import { playSound } from "../utils/sounds"

const NIVEL_COLORS = {
  "Principiante": "#10B981",
  "Intermedio":   "#06B6D4",
  "Técnico":      "#0891B2",
  "Avanzado":     "#EF4444",
  "Estratégico":  "#F59E0B",
  "Todos":        "#06B6D4",
}

const FASE_INFO = {
  1: { label: "Fase 1 — Funcional",         sub: "6 módulos · Prioridad máxima",      color: "#10B981" },
  2: { label: "Fase 2 — Sólida",            sub: "6 módulos · ML + Backend",          color: "#06B6D4" },
  3: { label: "Fase 3 — Referente Mundial", sub: "5 módulos · Arquitectura profunda",  color: "#F59E0B" },
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

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  }
  const cardVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  }

  // Calcular módulo a continuar
  const nextModulo = useMemo(() => {
    const available = modulos.filter(m => m.estado === "disponible")
    const started = available.find(m => {
      const done = completadas.filter(id => id.startsWith(m.id + "-")).length
      return done > 0 && done < m.lecciones_total
    })
    if (started) {
      const done = completadas.filter(id => id.startsWith(started.id + "-")).length
      return { modulo: started, pct: Math.round((done / started.lecciones_total) * 100), done }
    }
    const notStarted = available.find(m => completadas.filter(id => id.startsWith(m.id + "-")).length === 0)
    if (notStarted) return { modulo: notStarted, pct: 0, done: 0 }
    return null
  }, [completadas, modulos])

  return (
    <div className="w-full max-w-4xl mx-auto px-2 relative z-10">

      {/* 1 — Header compacto */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em]"
          style={{ color: "var(--color-text-muted)" }}>
          Academia de IA · Nivel Mundial
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-gradient mt-1"
          style={{ fontFamily: "'Outfit', sans-serif" }}>
          Tu ruta en IA
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          17 módulos · ~1,400 lecciones · De cero a referente mundial
        </p>
      </motion.div>

      {/* 2 — Card "Continúa aquí" — primer elemento interactivo */}
      {nextModulo && (
        <motion.div
          className="max-w-lg mx-auto mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={() => { playSound("unlock"); onSelectModulo(nextModulo.modulo) }}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-4 rounded-2xl transition-colors"
            style={{
              background: "rgba(6,182,212,0.07)",
              border: "1.5px solid rgba(6,182,212,0.4)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{nextModulo.modulo.icono}</span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: "#06B6D4" }}>
                    Continúa aquí →
                  </p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
                    M{nextModulo.modulo.numero} — {nextModulo.modulo.titulo}
                  </p>
                </div>
              </div>
              <span className="text-xl font-extrabold" style={{ color: "#06B6D4", fontFamily: "'Outfit', sans-serif" }}>
                {nextModulo.pct}%
              </span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: "6px", background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#06B6D4" }}
                initial={{ width: 0 }}
                animate={{ width: `${nextModulo.pct || 2}%` }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>
              {nextModulo.done} de {nextModulo.modulo.lecciones_total} lecciones completadas
            </p>
          </motion.button>
        </motion.div>
      )}

      {/* 3 — Stats globales */}
      <motion.div
        className="max-w-lg mx-auto surface rounded-2xl p-5 mb-2 grid grid-cols-4 gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}>
            <AnimatedNumber value={completadas.length} />
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Lecciones</p>
        </div>
        <div>
          <p className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}>
            <AnimatedNumber value={xpTotal} />
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>XP total</p>
        </div>
        <div>
          <p className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}>
            <AnimatedNumber value={nivel} duration={600} />
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Nivel</p>
        </div>
        <div>
          <p className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#F97316" }}>
            <AnimatedNumber value={progreso.rachaDiaria || 1} duration={600} />
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Racha</p>
        </div>
      </motion.div>

      {/* 4 — Countdown colapsado: 1 línea horizontal compacta */}
      <motion.p
        className="max-w-lg mx-auto text-center text-xs mb-8 py-1"
        style={{ color: "var(--color-text-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        ⏳{" "}
        <span style={{ color: "#F59E0B", fontWeight: 700 }}>{countdown.dias}</span> días ·{" "}
        <span style={{ color: "#F59E0B", fontWeight: 700 }}>{countdown.horas}</span>h ·{" "}
        <span style={{ color: "#F59E0B", fontWeight: 700 }}>{countdown.minutos}</span>min
        <span style={{ color: "#06B6D4" }}> — Meta Oct 2026</span>
      </motion.p>

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
                <span className="font-display text-xs font-bold uppercase tracking-[0.15em]"
                  style={{ color: info.color, fontFamily: "'Outfit', sans-serif" }}>
                  {info.label}
                </span>
                <span className="text-xs ml-2" style={{ color: "var(--color-text-muted)" }}>
                  · {info.sub}
                </span>
              </div>
              <div className="h-px flex-1" style={{ background: `${info.color}30` }} />
            </motion.div>

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
                      border: disponible ? `1px solid rgba(6,182,212,0.2)` : `1px solid var(--color-border)`
                    }}
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: disponible ? `${modulo.color}18` : "rgba(255,255,255,0.04)" }}>
                        {disponible ? modulo.icono : "🔒"}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: `${NIVEL_COLORS[modulo.nivel] || "#06B6D4"}18`,
                            color: NIVEL_COLORS[modulo.nivel] || "#06B6D4"
                          }}>
                          {modulo.nivel?.toUpperCase()}
                        </span>
                        {!disponible && (
                          <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                            Fase {modulo.fase} — Próximamente
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
                      <p className="text-xs mt-1 leading-relaxed line-clamp-2"
                        style={{ color: "var(--color-text-muted)" }}>
                        {modulo.descripcion}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                          {modulo.lecciones_total} lecciones
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>·</span>
                        <span style={{ fontSize: "12px", color: "#F59E0B" }}>
                          {modulo.xp_total?.toLocaleString()} XP
                        </span>
                      </div>
                      {disponible && (
                        <span style={{ fontSize: "11px", color: "#06B6D4" }}>→</span>
                      )}
                    </div>

                    {/* Progress con porcentaje */}
                    {disponible && (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                            {doneCount} / {modulo.lecciones_total}
                          </span>
                          <span className="text-[10px] font-bold" style={{ color: pct > 0 ? "#06B6D4" : "var(--color-text-muted)" }}>
                            {Math.round(pct)}%
                          </span>
                        </div>
                        <div className="w-full rounded-full overflow-hidden" style={{ height: "6px", background: "rgba(255,255,255,0.07)" }}>
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, background: "#06B6D4" }}
                          />
                        </div>
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
