import { motion } from "framer-motion"
import { playSound } from "../utils/sounds"

const sectionVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function TeoriaScreen({ leccion, onContinuar, onVolver }) {
  const t = leccion.contenido.teoria

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <button onClick={() => { playSound("click"); onVolver() }}
        className="text-xs mb-4 flex items-center gap-1 transition-colors"
        style={{ color: "var(--color-text-muted)" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
      >
        ← Volver a lecciones
      </button>

      <div className="surface p-6 flex flex-col gap-5">
        {/* Header */}
        <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible">
          <span className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#06B6D4" }}>
            Teoría
          </span>
          <h2 className="font-display text-xl font-bold mt-1"
            style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
            {leccion.titulo}
          </h2>
        </motion.div>

        {/* Explicación */}
        <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", lineHeight: "1.8" }}>
            {t.explicacion}
          </p>
        </motion.div>

        {/* Analogía */}
        {t.analogia && (
          <motion.div
            custom={2} variants={sectionVariants} initial="hidden" animate="visible"
            className="rounded-xl p-4"
            style={{ background: "rgba(6,182,212,0.05)", borderLeft: "3px solid rgba(6,182,212,0.5)" }}
          >
            <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
              style={{ color: "#06B6D4" }}>
              💡 Analogía
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t.analogia}
            </p>
          </motion.div>
        )}

        {/* Ejemplo malo vs bueno */}
        {t.ejemplo_malo && t.ejemplo_bueno && (
          <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
              Ejemplos
            </p>
            <div className="rounded-xl p-3.5"
              style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#FCA5A5" }}>❌ Incorrecto</p>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                {t.ejemplo_malo}
              </p>
            </div>
            <div className="rounded-xl p-3.5"
              style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#6EE7B7" }}>✅ Correcto</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                {t.ejemplo_bueno}
              </p>
            </div>
          </motion.div>
        )}

        {/* Por qué importa */}
        {t.por_que_importa && (
          <motion.div
            custom={4} variants={sectionVariants} initial="hidden" animate="visible"
            className="rounded-xl p-4"
            style={{ background: "rgba(8,145,178,0.05)", border: "1px solid rgba(8,145,178,0.15)" }}
          >
            <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
              style={{ color: "#0891B2" }}>
              🎯 Por qué importa
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t.por_que_importa}
            </p>
          </motion.div>
        )}

        {/* Tip profesional */}
        {t.tip_profesional && (
          <motion.div
            custom={5} variants={sectionVariants} initial="hidden" animate="visible"
            className="rounded-xl p-4"
            style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}
          >
            <p className="text-xs font-bold mb-1.5 tracking-wide uppercase" style={{ color: "#F59E0B" }}>
              ⚡ Tip profesional
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t.tip_profesional}
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.button
          custom={6} variants={sectionVariants} initial="hidden" animate="visible"
          onClick={() => { playSound("click"); onContinuar() }}
          className="btn-primary w-full py-3.5 text-sm"
          whileTap={{ scale: 0.97 }}
        >
          Entendido, al quiz →
        </motion.button>
      </div>
    </motion.div>
  )
}
