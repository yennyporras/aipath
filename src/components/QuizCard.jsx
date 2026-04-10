import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "../utils/sounds"

const PRAISE = ["¡Exacto!", "¡Correcto!", "¡Bien pensado!", "¡Perfecto!", "¡Excelente!", "¡Así se hace!", "¡Genial!"]

// Confetti de partículas pequeñas al acertar
function MiniConfetti() {
  const colors = ["#6366F1", "#8B5CF6", "#F59E0B", "#10B981", "#A78BFA"]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {Array.from({ length: 18 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top:  `${10 + Math.random() * 40}%`,
            width:  `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            background: colors[i % colors.length],
          }}
          initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          animate={{
            opacity: 0,
            y: -(40 + Math.random() * 60),
            x: (Math.random() - 0.5) * 80,
            scale: 0.3,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1 + Math.random() * 0.8, ease: "easeOut", delay: Math.random() * 0.3 }}
        />
      ))}
    </div>
  )
}

export default function QuizCard({ pregunta, indice, totalPreguntas, onAnswer, rachaActual }) {
  const [sel, setSel]           = useState(null)
  const [showXP, setShowXP]     = useState(false)
  const [showConfetti, setConf] = useState(false)
  const answered = sel !== null
  const correct  = sel === pregunta.correcta

  // Resetear estado cuando cambia la pregunta
  const prevIndice = useRef(indice)
  useEffect(() => {
    if (prevIndice.current !== indice) {
      setSel(null)
      setShowXP(false)
      setConf(false)
      prevIndice.current = indice
    }
  }, [indice])

  function pick(i) {
    if (answered) return
    setSel(i)
    const isCorrect = i === pregunta.correcta
    onAnswer(isCorrect)
    if (isCorrect) {
      playSound("correct")
      setShowXP(true)
      setConf(true)
      setTimeout(() => { setShowXP(false); setConf(false) }, 1600)
    } else {
      playSound("incorrect")
    }
  }

  const num    = (indice || 0) + 1
  const pct    = (num / totalPreguntas) * 100
  const labels = ["A", "B", "C", "D"]

  return (
    <div className="w-full max-w-lg mx-auto relative">
      {/* XP flotante */}
      <AnimatePresence>
        {showXP && (
          <motion.div
            className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -70, scale: 1.2 }}
            exit={{}}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <span className="font-display text-xl font-bold text-gradient">+30 XP</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card principal con animaciones de entrada/salida */}
      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className={`surface p-6 relative overflow-hidden ${
              rachaActual >= 3 && !answered ? "border-gradient active" : ""
            }`}
            animate={answered && !correct ? { x: [0, -8, 6, -4, 3, 0] } : {}}
            transition={answered && !correct ? { duration: 0.5, ease: "easeOut" } : {}}
          >
            {/* Confetti dentro del card */}
            {showConfetti && <MiniConfetti />}

            {/* Progress */}
            <div className="quiz-progress mb-5">
              <motion.div
                className="quiz-progress-fill"
                initial={{ width: `${((num - 1) / totalPreguntas) * 100}%` }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                Pregunta{" "}
                <span className="font-display font-bold" style={{ color: "var(--color-text-primary)" }}>{num}</span>
                {" "}de {totalPreguntas}
              </span>
              {rachaActual >= 3 && (
                <span className="text-[10px] font-bold text-amber-400 animate-scale-in"
                  style={{ background: "rgba(251,191,36,0.1)", padding: "2px 8px", borderRadius: "99px" }}>
                  🔥 {rachaActual}x
                </span>
              )}
            </div>

            <motion.h2
              className="font-display text-lg font-bold leading-relaxed mb-6"
              style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {pregunta.pregunta}
            </motion.h2>

            {/* Opciones en cascada */}
            <div className="flex flex-col gap-2.5">
              {pregunta.opciones.map((opt, i) => {
                let borderC = "var(--color-border)", bgC = "transparent"
                let textC = "var(--color-text-secondary)"
                let labelBg = "rgba(255,255,255,0.04)", labelC = "var(--color-text-muted)"

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
                  <motion.button
                    key={i}
                    onClick={() => pick(i)}
                    disabled={answered}
                    className="option-btn w-full text-left px-4 py-3.5 flex items-start gap-3"
                    style={{ borderColor: borderC, background: bgC }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    whileHover={!answered ? { x: 4 } : {}}
                  >
                    <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: labelBg, color: labelC }}>
                      {labels[i]}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5" style={{ color: textC }}>{opt}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 p-4 rounded-xl overflow-hidden"
                  style={{
                    background: correct ? "rgba(16,185,129,0.06)" : "rgba(245,158,11,0.06)",
                    border: `1px solid ${correct ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)"}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.span
                      className="text-base"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      {correct ? "✅" : "💡"}
                    </motion.span>
                    <p className="font-display text-sm font-bold"
                      style={{ color: correct ? "#6EE7B7" : "#FBBF24", fontFamily: "'Outfit', sans-serif" }}>
                      {correct ? PRAISE[(indice || 0) % PRAISE.length] : "Casi — recuerda esto:"}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {pregunta.explicacion_profunda}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
