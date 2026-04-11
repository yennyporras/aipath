import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "../utils/sounds"

// ── Tarjeta compartible Boss Battle ─────────────────────────────────
const BOSS_TOPICS = ["Fundamentos IA", "Machine Learning", "LLMs & Transformers", "Ética y Regulación", "IA en Producción"]

function getBossBadge(correctas) {
  if (correctas >= 18) return { label: "M1 Master", color: "#F59E0B" }
  if (correctas >= 15) return { label: "M1 Expert", color: "#06B6D4" }
  if (correctas >= 14) return { label: "M1 Aprobado", color: "#10B981" }
  return { label: "M1 — Sigue intentando", color: "#94A3B8" }
}

function BossBattleCard({ correctas, totalPreguntas, nombreUsuario, xp }) {
  const [copiado, setCopiado] = useState(false)
  const pct = totalPreguntas > 0 ? Math.round((correctas / totalPreguntas) * 100) : 0
  const badge = getBossBadge(correctas)
  const passed = correctas >= Math.ceil(totalPreguntas * 0.7)

  async function compartir() {
    const texto = `Acabo de completar el Boss Battle de Fundamentos de IA en AIPath con ${correctas}/${totalPreguntas}. ¿Te atreves? aipath-beta.vercel.app`
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AIPath — Boss Battle M1",
          text: texto,
          url: "https://aipath-beta.vercel.app"
        })
      } catch { /* usuario canceló */ }
    } else {
      try {
        await navigator.clipboard.writeText(texto)
        setCopiado(true)
        setTimeout(() => setCopiado(false), 3000)
      } catch { /* sin permisos de clipboard */ }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      style={{
        background: "#050508",
        border: "1px solid #1E1E35",
        borderRadius: 20,
        padding: "28px 24px 24px",
        marginTop: 20,
        width: "100%"
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 20 }}>
          <span style={{ color: "#06B6D4" }}>AI</span>
          <span style={{ color: "#e2e8f0" }}>Path</span>
        </span>
      </div>

      {/* Ícono estrella */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "rgba(245,158,11,0.15)",
          border: "2px solid rgba(245,158,11,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28
        }}>
          {passed ? "⭐" : "⚔️"}
        </div>
      </div>

      {/* Badge */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 700,
          color: badge.color,
          background: `${badge.color}18`,
          padding: "4px 12px", borderRadius: 99,
          border: `1px solid ${badge.color}40`
        }}>
          {badge.label}
        </span>
      </div>

      {/* Nombre */}
      <p style={{ textAlign: "center", fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 2 }}>
        {nombreUsuario}
      </p>
      <p style={{ textAlign: "center", fontSize: 11, color: "#64748B", marginBottom: 16 }}>
        Boss Battle — Fundamentos de IA
      </p>

      {/* Puntuación */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 24, marginBottom: 14,
        background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 0"
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 900, color: "#06B6D4", lineHeight: 1 }}>
            {correctas}/{totalPreguntas}
          </p>
          <p style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>respuestas</p>
        </div>
        <div style={{ width: 1, background: "#1E1E35" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 900, color: "#F59E0B", lineHeight: 1 }}>
            {pct}%
          </p>
          <p style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>precisión</p>
        </div>
        <div style={{ width: 1, background: "#1E1E35" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 900, color: "#10B981", lineHeight: 1 }}>
            +{passed ? xp : 0}
          </p>
          <p style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>XP</p>
        </div>
      </div>

      {/* Topic pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 16 }}>
        {BOSS_TOPICS.map(t => (
          <span key={t} style={{
            fontSize: 10, fontWeight: 600,
            color: "#94A3B8",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "3px 10px", borderRadius: 99
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* URL */}
      <p style={{ textAlign: "center", fontSize: 10, color: "#475569", marginBottom: 16 }}>
        aipath-beta.vercel.app
      </p>

      {/* Botón compartir */}
      <motion.button
        onClick={compartir}
        className="btn-primary w-full py-3 text-sm font-semibold"
        whileTap={{ scale: 0.97 }}
        style={{ borderRadius: 12 }}
      >
        {copiado ? "¡Copiado! Pégalo donde quieras 📋" : "Compartir logro"}
      </motion.button>
    </motion.div>
  )
}

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
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-extrabold" style={{ color: "#06B6D4" }}>{pct}%</span>
        <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>aciertos</span>
      </div>
    </div>
  )
}

// Confetti de 3s al aprobar
function ConfettiRain() {
  const colors = ["#06B6D4", "#0891B2", "#F59E0B", "#10B981", "#F97316", "#F472B6"]
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top:  "-2%",
            width:  `${3 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            background: colors[i % colors.length],
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: Math.random() > 0.5 ? 360 : -360,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay:    Math.random() * 1.2,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  )
}

export default function ResultsScreen({ leccion, correctas, totalPreguntas, xp, onRestart, onVolver, hayNextLesson, isBossBattle = false, nombreUsuario = "Estudiante" }) {
  const pct    = totalPreguntas > 0 ? Math.round((correctas / totalPreguntas) * 100) : 100
  const passed = totalPreguntas === 0 || correctas >= Math.ceil(totalPreguntas * 0.7)
  const msg    = getMessage(pct)

  const [xpAnim, setXpAnim] = useState(0)
  const soundFired = useRef(false)

  useEffect(() => {
    const steps = 40, duration = 1500
    const increment = xp / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= xp) { current = xp; clearInterval(timer) }
      setXpAnim(Math.round(current))
    }, duration / steps)

    if (!soundFired.current) {
      soundFired.current = true
      setTimeout(() => playSound(passed ? "complete" : "xp"), 300)
    }

    return () => clearInterval(timer)
  }, [xp, passed])

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-2">
      {passed && <ConfettiRain />}

      <motion.div
        className="surface rounded-2xl p-8 w-full relative z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-5xl mb-3"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}
        >
          {msg.emoji}
        </motion.p>

        <motion.h3
          className="font-display text-2xl font-extrabold mb-1"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          ¡Lección completada!
        </motion.h3>

        <motion.p
          className="text-sm mb-6"
          style={{ color: "var(--color-text-secondary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {msg.text}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-center gap-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <ProgressCircle pct={pct} />
          <div className="text-left">
            <motion.p
              className="font-display text-3xl font-extrabold"
              style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              +{xpAnim}
            </motion.p>
            <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>XP ganados</p>
            <p className="text-sm mt-3" style={{ color: "var(--color-text-secondary)" }}>
              <span className="font-bold" style={{ color: "var(--color-text-primary)" }}>{correctas}</span> / {totalPreguntas} correctas
            </p>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          className={`mb-6 ${passed ? "" : "opacity-40"}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: passed ? 1 : 0.4, scale: 1 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 250, damping: 18 }}
        >
          <div className={`surface rounded-2xl p-4 flex items-center gap-4 ${passed ? "glow-amber" : ""}`}>
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: passed ? "linear-gradient(135deg, #06B6D4, #F59E0B)" : "rgba(255,255,255,0.03)" }}
              initial={passed ? { scale: 0, rotate: -30 } : {}}
              animate={passed ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.55, type: "spring", stiffness: 350, damping: 12 }}
            >
              📖
            </motion.div>
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
        </motion.div>

        {/* Acciones */}
        <motion.div
          className="flex flex-col gap-3 pb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.35 }}
        >
          <button onClick={onRestart}
            className="w-full px-5 rounded-xl text-sm font-semibold surface transition-all"
            style={{ color: "var(--color-text-secondary)", minHeight: 48 }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = ""}>
            Intentar de nuevo
          </button>
          <motion.button
            onClick={() => { playSound("click"); onVolver() }}
            className="btn-primary w-full px-5 font-bold"
            style={{ minHeight: 56, fontSize: 16 }}
            whileTap={{ scale: 0.97 }}
          >
            {isBossBattle ? "Volver al módulo" : passed && hayNextLesson ? "Siguiente lección →" : "Volver"}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Tarjeta compartible — solo Boss Battle */}
      {isBossBattle && (
        <BossBattleCard
          correctas={correctas}
          totalPreguntas={totalPreguntas}
          nombreUsuario={nombreUsuario}
          xp={xp}
        />
      )}
    </div>
  )
}
