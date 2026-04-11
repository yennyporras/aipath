import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "../utils/sounds"

const TIPO_LABELS = {
  reescribir: "Reescribe el prompt",
  completar:  "Completa el prompt",
  identificar:"Identifica el problema",
  caso_real:  "Caso real"
}

const sectionVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function PracticaScreen({ leccion, onSiguiente }) {
  const [verSolucion, setVerSolucion] = useState(false)
  const p = leccion.contenido.practica

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
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

        {/* Pista — accordion */}
        <AnimatePresence>
          {p.pista && !verSolucion && (
            <motion.div
              key="pista"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-xl p-3.5"
                style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}>
                <p className="text-xs font-bold mb-1" style={{ color: "#F59E0B" }}>💡 Pista</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {p.pista}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solución — accordion */}
        <AnimatePresence>
          {verSolucion && (
            <motion.div
              key="solucion"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden flex flex-col gap-3"
            >
              <div className="rounded-xl p-4"
                style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <p className="text-xs font-bold mb-2 tracking-wide uppercase"
                  style={{ color: "var(--color-success)" }}>
                  ✅ Solución modelo
                </p>
                <p className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                  {p.solucion}
                </p>
              </div>

              {p.criterios_de_exito?.length > 0 && (
                <div className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)" }}>
                  <p className="text-xs font-bold mb-2 tracking-wide uppercase"
                    style={{ color: "var(--color-text-muted)" }}>
                    Criterios de éxito
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {p.criterios_de_exito.map((c, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.25 }}
                      >
                        <span style={{ color: "var(--color-success)", marginTop: "2px" }}>✓</span>
                        {c}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Acciones */}
        <motion.div
          custom={4} variants={sectionVariants} initial="hidden" animate="visible"
          className="flex flex-col gap-2.5"
        >
          {!verSolucion && (
            <motion.button
              onClick={() => { playSound("click"); setVerSolucion(true) }}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ border: "1px solid rgba(6,182,212,0.4)", color: "#06B6D4", background: "rgba(6,182,212,0.06)" }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(6,182,212,0.06)"}
            >
              Ver solución
            </motion.button>
          )}
          <motion.button
            onClick={() => { playSound("click"); onSiguiente() }}
            className="btn-primary w-full font-bold"
            style={{ minHeight: 56, fontSize: 16, marginBottom: 8 }}
            whileTap={{ scale: 0.97 }}
          >
            Siguiente lección →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
