import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

/* ─── Afirmaciones del juego 1 ─── */
const AFIRMACIONES = [
  { texto: "GPT-4 es un modelo de lenguaje grande", respuesta: true },
  { texto: "El prompt engineering es una habilidad profesional", respuesta: true },
  { texto: "GDPR es una regulación europea de datos", respuesta: true },
  { texto: "Fine-tuning adapta un modelo a tareas específicas", respuesta: true },
  { texto: "Los tokens son unidades de texto que procesan los LLMs", respuesta: true },
  { texto: "Los LLMs entienden el texto igual que los humanos", respuesta: false },
  { texto: "Más parámetros siempre significa mejor rendimiento", respuesta: false },
  { texto: "El zero-shot requiere ejemplos en el prompt", respuesta: false },
  { texto: "Claude fue creado por OpenAI", respuesta: false },
  { texto: "El overfitting mejora la generalización del modelo", respuesta: false },
]

const TIEMPO_POR_PREGUNTA = 8
const XP_POR_CORRECTA = 1
const XP_BONUS_COMPLETAR = 15

/* ─── Partículas de confetti ─── */
function Confetti() {
  const colores = ["#00D4AA", "#F59E0B", "#F97316", "#818CF8", "#EC4899", "#34D399"]
  const particulas = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: colores[i % colores.length],
    x: Math.random() * 100,
    delay: Math.random() * 0.6,
    size: 6 + Math.random() * 8,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 50 }}>
      {particulas.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.x}%`,
            top: -20,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: 720, opacity: 0 }}
          transition={{ duration: 2.5 + Math.random(), delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  )
}

/* ─── Componente del juego Verdadero o Falso ─── */
function VerdaderoFalsoGame({ onSalir, onXpGanado }) {
  const [indice, setIndice] = useState(0)
  const [tiempo, setTiempo] = useState(TIEMPO_POR_PREGUNTA)
  const [seleccion, setSeleccion] = useState(null) // true | false | null
  const [correctas, setCorrectas] = useState(0)
  const [fase, setFase] = useState("jugando") // "jugando" | "feedback" | "resultado"
  const [resultados, setResultados] = useState([]) // array de booleans
  const timerRef = useRef(null)

  const pregunta = AFIRMACIONES[indice]
  const esUltima = indice === AFIRMACIONES.length - 1

  /* ── Timer ── */
  useEffect(() => {
    if (fase !== "jugando") return
    setTiempo(TIEMPO_POR_PREGUNTA)
    timerRef.current = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          // Tiempo agotado: cuenta como error
          procesarRespuesta(null)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, fase])

  function procesarRespuesta(valor) {
    clearInterval(timerRef.current)
    const esCorrecto = valor === pregunta.respuesta
    setSeleccion(valor)
    if (esCorrecto) setCorrectas((c) => c + 1)
    setResultados((r) => [...r, esCorrecto])
    setFase("feedback")

    // Avanzar después de 1.4 s
    setTimeout(() => {
      if (esUltima) {
        setFase("resultado")
        const totalCorrectas = esCorrecto ? correctas + 1 : correctas
        const xp = totalCorrectas * XP_POR_CORRECTA + XP_BONUS_COMPLETAR
        onXpGanado(xp)
      } else {
        setIndice((i) => i + 1)
        setSeleccion(null)
        setFase("jugando")
      }
    }, 1400)
  }

  /* ── Colores del timer ── */
  const pctTiempo = tiempo / TIEMPO_POR_PREGUNTA
  const colorTimer =
    pctTiempo > 0.5 ? "#00D4AA" : pctTiempo > 0.25 ? "#F59E0B" : "#EF4444"

  /* ── Pantalla de resultado final ── */
  if (fase === "resultado") {
    const totalCorrectas = resultados.filter(Boolean).length
    const pct = (totalCorrectas / AFIRMACIONES.length) * 100
    const ganarConfetti = totalCorrectas >= 8
    const xpTotal = totalCorrectas * XP_POR_CORRECTA + XP_BONUS_COMPLETAR

    return (
      <>
        {ganarConfetti && <Confetti />}
        <motion.div
          className="w-full max-w-lg mx-auto px-4 pb-8 pt-6 flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Emoji resultado */}
          <div style={{ fontSize: 64 }}>
            {totalCorrectas >= 8 ? "🏆" : totalCorrectas >= 5 ? "👍" : "💪"}
          </div>

          <h2
            className="text-2xl font-extrabold text-center"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
          >
            {totalCorrectas >= 8 ? "¡Excelente!" : totalCorrectas >= 5 ? "¡Bien hecho!" : "¡Sigue practicando!"}
          </h2>

          {/* Puntuación */}
          <div
            className="w-full rounded-2xl p-5 text-center"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
          >
            <p className="text-5xl font-extrabold" style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
              {totalCorrectas}<span className="text-2xl" style={{ color: "var(--color-text-secondary)" }}>/{AFIRMACIONES.length}</span>
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>respuestas correctas</p>

            {/* Barra de progreso */}
            <div className="mt-3 h-3 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--color-accent-primary)" }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* XP ganado */}
          <motion.div
            className="flex items-center gap-2 px-5 py-3 rounded-xl"
            style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.35)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span style={{ fontSize: 22 }}>⭐</span>
            <span className="font-bold text-lg" style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}>
              +{xpTotal} XP ganados
            </span>
          </motion.div>

          {/* Desglose */}
          <div className="w-full text-xs" style={{ color: "var(--color-text-secondary)" }}>
            <p className="text-center">{totalCorrectas} correctas × {XP_POR_CORRECTA} XP + {XP_BONUS_COMPLETAR} XP por completar</p>
          </div>

          {/* Botones */}
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={() => {
                setIndice(0)
                setCorrectas(0)
                setResultados([])
                setSeleccion(null)
                setFase("jugando")
              }}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 active:scale-95"
              style={{ background: "var(--color-accent-primary)", color: "#fff", fontFamily: "'Outfit', sans-serif" }}
            >
              Jugar de nuevo
            </button>
            <button
              onClick={onSalir}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-105 active:scale-95"
              style={{ background: "var(--color-bg-card)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)", fontFamily: "'Outfit', sans-serif" }}
            >
              Volver al Arcade
            </button>
          </div>
        </motion.div>
      </>
    )
  }

  /* ── Pantalla de juego ── */
  const estadoBoton = (valor) => {
    if (fase === "jugando") return "idle"
    if (seleccion === null) {
      // Tiempo agotado: resaltar la correcta
      return valor === pregunta.respuesta ? "correcta" : "idle"
    }
    if (valor === seleccion && valor === pregunta.respuesta) return "correcta"
    if (valor === seleccion && valor !== pregunta.respuesta) return "incorrecta"
    if (valor === pregunta.respuesta) return "correcta"
    return "idle"
  }

  const colorBoton = (estado) => {
    if (estado === "correcta") return { bg: "rgba(52,211,153,0.25)", border: "#34D399", color: "#34D399" }
    if (estado === "incorrecta") return { bg: "rgba(239,68,68,0.25)", border: "#EF4444", color: "#EF4444" }
    return { bg: "var(--color-bg-card)", border: "var(--color-border)", color: "var(--color-text-primary)" }
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8">
      {/* Header del juego */}
      <div className="pt-5 pb-4 flex items-center justify-between">
        <button
          onClick={onSalir}
          className="text-sm px-3 py-1.5 rounded-lg transition-all hover:brightness-110 active:scale-95"
          style={{ background: "var(--color-bg-card)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
        >
          ← Salir
        </button>
        <span
          className="text-base font-extrabold"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
        >
          ⚡ Verdadero o Falso
        </span>
        <span
          className="text-sm font-bold px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
        >
          {indice + 1}/{AFIRMACIONES.length}
        </span>
      </div>

      {/* Barra de progreso preguntas */}
      <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-accent-primary)" }}
          animate={{ width: `${((indice) / AFIRMACIONES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Timer circular + número */}
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
          <svg width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="36" cy="36" r="30" fill="none" stroke="var(--color-border)" strokeWidth="5" />
            <motion.circle
              cx="36" cy="36" r="30" fill="none"
              stroke={colorTimer}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 30}`}
              animate={{ strokeDashoffset: `${2 * Math.PI * 30 * (1 - tiempo / TIEMPO_POR_PREGUNTA)}` }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          </svg>
          <span
            className="absolute text-xl font-extrabold"
            style={{ fontFamily: "'Outfit', sans-serif", color: colorTimer }}
          >
            {tiempo}
          </span>
        </div>
      </div>

      {/* Tarjeta de afirmación */}
      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          className="rounded-2xl p-6 mb-6 text-center"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", minHeight: 130 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <p
            className="text-lg font-semibold leading-snug"
            style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}
          >
            {pregunta.texto}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Feedback inmediato */}
      <AnimatePresence>
        {fase === "feedback" && (
          <motion.div
            className="flex items-center justify-center gap-2 mb-4 py-2 rounded-xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: seleccion === pregunta.respuesta
                ? "rgba(52,211,153,0.15)"
                : "rgba(239,68,68,0.15)",
              border: `1px solid ${seleccion === pregunta.respuesta ? "#34D399" : "#EF4444"}`,
            }}
          >
            <span style={{ fontSize: 20 }}>
              {seleccion === pregunta.respuesta ? "✓" : seleccion === null ? "⏱️" : "✗"}
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: seleccion === pregunta.respuesta ? "#34D399" : "#EF4444" }}
            >
              {seleccion === null
                ? "¡Tiempo agotado!"
                : seleccion === pregunta.respuesta
                ? "¡Correcto! +1 XP"
                : `Incorrecto — era ${pregunta.respuesta ? "Verdadero" : "Falso"}`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones V / F */}
      <div className="grid grid-cols-2 gap-4">
        {[true, false].map((valor) => {
          const estado = estadoBoton(valor)
          const { bg, border, color } = colorBoton(estado)
          return (
            <motion.button
              key={String(valor)}
              onClick={() => fase === "jugando" && procesarRespuesta(valor)}
              disabled={fase !== "jugando"}
              className="py-5 rounded-2xl text-xl font-extrabold transition-all active:scale-95"
              style={{
                background: bg,
                border: `2px solid ${border}`,
                color,
                fontFamily: "'Outfit', sans-serif",
                cursor: fase === "jugando" ? "pointer" : "default",
              }}
              whileTap={fase === "jugando" ? { scale: 0.94 } : {}}
            >
              {valor ? "✓ Verdadero" : "✗ Falso"}
            </motion.button>
          )
        })}
      </div>

      {/* Marcador */}
      <div className="flex justify-center mt-5">
        <span
          className="text-sm font-semibold px-4 py-1.5 rounded-full"
          style={{ background: "rgba(0,212,170,0.12)", color: "var(--color-accent-primary)", border: "1px solid rgba(0,212,170,0.25)" }}
        >
          ✓ {correctas} correctas
        </span>
      </div>
    </div>
  )
}

/* ─── Grid de juegos ─── */
const juegos = [
  { nombre: "Verdadero o Falso", emoji: "⚡" },
  { nombre: "Conexión Rápida",   emoji: "🔗" },
  { nombre: "Completa el Concepto", emoji: "✏️" },
  { nombre: "Ordena los Pasos",  emoji: "📋" },
  { nombre: "Batalla de Conceptos", emoji: "⚔️" },
  { nombre: "Speed Cards",       emoji: "🃏" },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ─── Pantalla principal Arcade ─── */
export default function ArcadeScreen() {
  const [juegoActivo, setJuegoActivo] = useState(null) // null | "verdadero-falso"
  const [xpAcumulado, setXpAcumulado] = useState(0)

  function manejarJugar(indice) {
    if (indice === 0) setJuegoActivo("verdadero-falso")
    // Los demás juegos se añadirán después
  }

  function manejarXp(xp) {
    setXpAcumulado((prev) => prev + xp)
    // Guardar XP en localStorage
    try {
      const raw = localStorage.getItem("aipath_progreso_v2")
      const progreso = raw ? JSON.parse(raw) : {}
      progreso.xpTotal = (progreso.xpTotal || 0) + xp
      localStorage.setItem("aipath_progreso_v2", JSON.stringify(progreso))
    } catch (_) {}
  }

  /* ── Juego activo ── */
  if (juegoActivo === "verdadero-falso") {
    return (
      <VerdaderoFalsoGame
        onSalir={() => setJuegoActivo(null)}
        onXpGanado={manejarXp}
      />
    )
  }

  /* ── Lobby del Arcade ── */
  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8">

      {/* Encabezado */}
      <motion.div
        className="pt-6 pb-5 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-5xl mb-2">🕹️</div>
        <h1
          className="text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
        >
          Arcade
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Pon a prueba lo que sabes
        </p>
      </motion.div>

      {/* Grid 2×3 */}
      <div className="grid grid-cols-2 gap-3">
        {juegos.map((juego, i) => (
          <motion.div
            key={juego.nombre}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col gap-3 rounded-2xl p-4"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Badge NUEVO */}
            <span
              className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(245,158,11,0.18)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.35)" }}
            >
              NUEVO
            </span>

            {/* Emoji + nombre */}
            <div>
              <span style={{ fontSize: 24 }}>{juego.emoji}</span>
              <p
                className="text-sm font-semibold mt-1 leading-tight"
                style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}
              >
                {juego.nombre}
              </p>
            </div>

            {/* XP */}
            <p className="text-xs font-bold" style={{ color: "#F59E0B" }}>+15 XP</p>

            {/* Botón Jugar */}
            <button
              onClick={() => manejarJugar(i)}
              className="w-full text-sm font-semibold py-1.5 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{
                background: i === 0 ? "var(--color-accent-primary)" : "var(--color-border)",
                color: i === 0 ? "#fff" : "var(--color-text-secondary)",
                fontFamily: "'Outfit', sans-serif",
                cursor: i === 0 ? "pointer" : "not-allowed",
                opacity: i === 0 ? 1 : 0.5,
              }}
            >
              {i === 0 ? "Jugar" : "Pronto"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Daily Challenge */}
      <motion.div
        className="mt-5 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(245,158,11,0.06) 100%)",
          border: "1px solid rgba(245,158,11,0.35)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontSize: 22 }}>☀️</span>
          <span
            className="text-base font-extrabold"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}
          >
            Daily Challenge
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Nuevo reto cada día a medianoche
        </p>
        <button
          className="mt-3 w-full text-sm font-semibold py-2 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{
            background: "rgba(245,158,11,0.22)",
            color: "#F59E0B",
            border: "1px solid rgba(245,158,11,0.45)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Aceptar reto · +30 XP
        </button>
      </motion.div>

      {/* Streak Defender */}
      <motion.div
        className="mt-3 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.06) 100%)",
          border: "1px solid rgba(249,115,22,0.35)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontSize: 22 }}>🔥</span>
          <span
            className="text-base font-extrabold"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#F97316" }}
          >
            Streak Defender
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Salva tu racha en 2 minutos
        </p>
        <button
          className="mt-3 w-full text-sm font-semibold py-2 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{
            background: "rgba(249,115,22,0.22)",
            color: "#F97316",
            border: "1px solid rgba(249,115,22,0.45)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Defender racha · +10 XP
        </button>
      </motion.div>

    </div>
  )
}
