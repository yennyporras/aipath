import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "../utils/sounds"
import LeccionProgressBar from "./LeccionProgressBar"

const TIPO_LABELS = {
  reescribir: "Reescribe el prompt",
  completar:  "Completa el prompt",
  identificar:"Identifica el problema",
  caso_real:  "Caso real",
  reflexion:  "Reflexión"
}

const sectionVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function PracticaScreen({ leccion, onSiguiente }) {
  const [respuesta, setRespuesta] = useState("")
  const [verSolucion, setVerSolucion] = useState(false)
  const [pistaMostrada, setPistaMostrada] = useState(false)
  const [pistaDesplegada, setPistaDesplegada] = useState(false)
  const p = leccion.contenido.practica

  function handleVerPista() {
    playSound("click")
    setPistaMostrada(true)
    setPistaDesplegada(true)
  }

  function handleVerSolucion() {
    playSound("click")
    setVerSolucion(true)
  }

  function handleAutoevaluar(xpBase, paraRepasar = false) {
    playSound("click")
    // Si usó la pista, el máximo XP es 10
    const xpFinal = pistaMostrada ? Math.min(xpBase, 10) : xpBase
    onSiguiente(xpFinal, paraRepasar)
  }

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <LeccionProgressBar paso={2} />
      <div className="surface p-6 flex flex-col gap-5">
        {/* Header */}
        <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible">
          <span className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#06B6D4" }}>
            Práctica
          </span>
          <h2 className="font-display text-lg font-bold mt-1"
            style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
            {TIPO_LABELS[p.tipo] || p.tipo}
          </h2>
        </motion.div>

        {/* Contexto */}
        <motion.div
          custom={1} variants={sectionVariants} initial="hidden" animate="visible"
          className="rounded-xl p-4"
          style={{ background: "rgba(6,182,212,0.04)", borderLeft: "3px solid rgba(6,182,212,0.4)" }}
        >
          <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
            style={{ color: "var(--color-text-muted)" }}>Contexto</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {p.contexto}
          </p>
        </motion.div>

        {/* Instrucción */}
        <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
          <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
            {p.instruccion}
          </p>
        </motion.div>

        {/* Input malo */}
        {p.input_malo && (
          <motion.div
            custom={3} variants={sectionVariants} initial="hidden" animate="visible"
            className="rounded-xl p-3.5"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: "#FCA5A5" }}>❌ Enfoque incorrecto</p>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
              {p.input_malo}
            </p>
          </motion.div>
        )}

        {/* Textarea respuesta usuario */}
        {!verSolucion && (
          <motion.div custom={4} variants={sectionVariants} initial="hidden" animate="visible"
            className="flex flex-col gap-1.5">
            <textarea
              value={respuesta}
              onChange={e => setRespuesta(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              rows={4}
              className="w-full rounded-xl p-3.5 text-sm resize-none outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.6"
              }}
              onFocus={e => e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)"}
              onBlur={e => e.currentTarget.style.borderColor = "var(--color-border)"}
            />
            <p className="text-xs text-right" style={{ color: "var(--color-text-muted)" }}>
              {respuesta.length} caracteres
            </p>
          </motion.div>
        )}

        {/* Pista — botón opcional antes de ver solución */}
        <AnimatePresence>
          {p.pista && !verSolucion && (
            <motion.div
              key="pista-area"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden flex flex-col gap-2"
            >
              {!pistaDesplegada ? (
                <button
                  onClick={handleVerPista}
                  className="text-xs font-semibold py-2 px-3 rounded-lg transition-all text-left"
                  style={{ color: "#F59E0B", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
                >
                  ¿Necesitas una pista? 💡{pistaMostrada ? "" : " (reduce XP a +10)"}
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-3.5"
                  style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: "#F59E0B" }}>💡 Pista</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {p.pista}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón Ver solución modelo */}
        {!verSolucion && (
          <motion.div custom={5} variants={sectionVariants} initial="hidden" animate="visible">
            <motion.button
              onClick={handleVerSolucion}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ border: "1px solid rgba(6,182,212,0.4)", color: "#06B6D4", background: "rgba(6,182,212,0.06)" }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(6,182,212,0.06)"}
            >
              Ver solución modelo
            </motion.button>
          </motion.div>
        )}

        {/* Solución + criterios + autoevaluación */}
        <AnimatePresence>
          {verSolucion && (
            <motion.div
              key="solucion-area"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden flex flex-col gap-4"
            >
              {/* Solución con borde cyan */}
              <div className="rounded-xl p-4"
                style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.35)" }}>
                <p className="text-xs font-bold mb-2 tracking-wide uppercase"
                  style={{ color: "#06B6D4" }}>
                  ✅ Solución modelo
                </p>
                <p className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                  {p.solucion}
                </p>
              </div>

              {/* Criterios de éxito como checklist */}
              {p.criterios_de_exito?.length > 0 && (
                <div className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}>
                  <p className="text-xs font-bold mb-2.5 tracking-wide uppercase"
                    style={{ color: "var(--color-text-muted)" }}>
                    Criterios de éxito
                  </p>
                  <ul className="flex flex-col gap-2">
                    {p.criterios_de_exito.map((c, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.25 }}
                      >
                        <span style={{ color: "var(--color-success)", marginTop: "2px", flexShrink: 0 }}>✓</span>
                        {c}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Autoevaluación */}
              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-bold tracking-wide uppercase"
                  style={{ color: "var(--color-text-muted)" }}>
                  ¿Cómo te fue?{pistaMostrada && <span style={{ color: "#F59E0B" }}> (pista usada — XP máx. +10)</span>}
                </p>
                <motion.button
                  onClick={() => handleAutoevaluar(15)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-left flex items-center justify-between transition-all"
                  style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.25)", color: "var(--color-text-primary)" }}
                  whileTap={{ scale: 0.97 }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.06)"}
                >
                  <span>✅ Lo logré</span>
                  <span className="text-xs" style={{ color: "#10B981" }}>+{pistaMostrada ? 10 : 15} XP</span>
                </motion.button>
                <motion.button
                  onClick={() => handleAutoevaluar(8)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-left flex items-center justify-between transition-all"
                  style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", color: "var(--color-text-primary)" }}
                  whileTap={{ scale: 0.97 }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(245,158,11,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(245,158,11,0.06)"}
                >
                  <span>〜 Casi</span>
                  <span className="text-xs" style={{ color: "#F59E0B" }}>+8 XP</span>
                </motion.button>
                <motion.button
                  onClick={() => handleAutoevaluar(3, true)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-left flex items-center justify-between transition-all"
                  style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", color: "var(--color-text-primary)" }}
                  whileTap={{ scale: 0.97 }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.05)"}
                >
                  <span>❌ Necesito repasar</span>
                  <span className="text-xs" style={{ color: "#EF4444" }}>+3 XP</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
