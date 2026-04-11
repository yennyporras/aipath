import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import {
  getTrueFalseQuestions,
  getFlashcardQuestions,
  getBatallaQuestions,
  getCompletaConceptoQuestions,
  getConexionRapidaQuestions,
  getDailyQuestions,
  getProgressiveQuestions,
} from "../arcade/questionBank"

const TIEMPO_POR_PREGUNTA = 20
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

/* ─── Utilidad de shuffle local para los juegos ─── */
function shuffleArr(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ─── Utilidades Daily Challenge y Streak Defender ─── */
function getTodayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function cargarDailyState() {
  try {
    const raw = localStorage.getItem('aipath_daily_challenge')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function cargarProgreso() {
  try {
    const raw = localStorage.getItem('aipath_progreso_v2')
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function estudióHoyCheck() {
  const p = cargarProgreso()
  if (!p.ultimaSesion) return false
  return p.ultimaSesion === new Date().toDateString()
}

function segundosHastaMedianoche() {
  const ahora = new Date()
  const medianoche = new Date(ahora)
  medianoche.setHours(24, 0, 0, 0)
  return Math.floor((medianoche - ahora) / 1000)
}

function formatearConteo(segs) {
  const h = Math.floor(segs / 3600)
  const m = Math.floor((segs % 3600) / 60)
  const s = segs % 60
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function guardarXpProgreso(xp) {
  try {
    const raw = localStorage.getItem('aipath_progreso_v2')
    const progreso = raw ? JSON.parse(raw) : {}
    progreso.xpTotal = (progreso.xpTotal || 0) + xp
    localStorage.setItem('aipath_progreso_v2', JSON.stringify(progreso))
  } catch {}
}

/* ─── Secuencias hardcodeadas para Ordena los Pasos ─── */
const SECUENCIAS_ORDEN = [
  { titulo: "Entrenar un modelo de IA", pasos: ["Datos", "Preprocesar", "Entrenar", "Evaluar"] },
  { titulo: "RAG pipeline", pasos: ["Query", "Buscar", "Recuperar", "Generar"] },
  { titulo: "Prompt engineering", pasos: ["Contexto", "Instrucción", "Ejemplo", "Output"] },
  { titulo: "Fine-tuning", pasos: ["Base model", "Dataset", "Training", "Deploy"] },
  { titulo: "EU AI Act", pasos: ["Clasificar", "Evaluar riesgo", "Documentar", "Auditar"] },
  { titulo: "Proyecto de IA", pasos: ["Problema", "Datos", "Modelo", "Producción"] },
]

/* ─── Componente del juego Verdadero o Falso ─── */
function VerdaderoFalsoGame({ onSalir, onXpGanado }) {
  const [preguntas] = useState(() => getTrueFalseQuestions(10))
  const [indice, setIndice] = useState(0)
  const [tiempo, setTiempo] = useState(TIEMPO_POR_PREGUNTA)
  const [seleccion, setSeleccion] = useState(null) // true | false | null
  const [correctas, setCorrectas] = useState(0)
  const [fase, setFase] = useState("jugando") // "jugando" | "feedback" | "resultado"
  const [resultados, setResultados] = useState([]) // array de booleans
  const timerRef = useRef(null)

  const pregunta = preguntas[indice]
  const esUltima = indice === preguntas.length - 1

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
    const pct = (totalCorrectas / preguntas.length) * 100
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
              {totalCorrectas}<span className="text-2xl" style={{ color: "var(--color-text-secondary)" }}>/{preguntas.length}</span>
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
          {indice + 1}/{preguntas.length}
        </span>
      </div>

      {/* Barra de progreso preguntas */}
      <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-accent-primary)" }}
          animate={{ width: `${((indice) / preguntas.length) * 100}%` }}
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

const XP_POR_SABIA   = 2
const XP_BONUS_SPEED = 15
const TIEMPO_TOTAL_SPEED = 300 // 5 minutos

/* ─── Componente del juego Speed Cards ─── */
function SpeedCardsGame({ onSalir, onXpGanado }) {
  const [preguntas] = useState(() => getFlashcardQuestions(10))
  const [indice,    setIndice]    = useState(0)
  const [flipped,   setFlipped]   = useState(false)
  const [tiempo,    setTiempo]    = useState(TIEMPO_TOTAL_SPEED)
  const [fase,      setFase]      = useState("jugando") // "jugando" | "resultado"
  const [resultados, setResultados] = useState([])      // booleans: true = "lo sabía"
  const resultadosRef = useRef([])
  const xpFiredRef    = useRef(false)
  const timerRef      = useRef(null)

  /* ── sync ref + state juntos ── */
  function actualizarResultados(r) {
    resultadosRef.current = r
    setResultados(r)
  }

  function finalizarJuego(res) {
    clearInterval(timerRef.current)
    if (!xpFiredRef.current) {
      xpFiredRef.current = true
      const sabias = res.filter(Boolean).length
      onXpGanado(sabias * XP_POR_SABIA + XP_BONUS_SPEED)
    }
    setFase("resultado")
  }

  /* ── Timer total ── */
  useEffect(() => {
    if (fase !== "jugando") return
    timerRef.current = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          finalizarJuego(resultadosRef.current)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase])

  function responder(sabia) {
    const nuevos = [...resultadosRef.current, sabia]
    actualizarResultados(nuevos)
    if (indice === preguntas.length - 1) {
      finalizarJuego(nuevos)
    } else {
      setFlipped(false)
      setTimeout(() => setIndice((i) => i + 1), 160)
    }
  }

  function reiniciar() {
    xpFiredRef.current = false
    actualizarResultados([])
    setIndice(0)
    setFlipped(false)
    setTiempo(TIEMPO_TOTAL_SPEED)
    setFase("jugando")
  }

  const card       = preguntas[Math.min(indice, preguntas.length - 1)]
  const sabiasCount = resultados.filter(Boolean).length
  const mins = Math.floor(tiempo / 60)
  const secs = tiempo % 60
  const tiempoStr  = `${mins}:${String(secs).padStart(2, "0")}`
  const colorTiempo = tiempo > 60 ? "#00D4AA" : tiempo > 30 ? "#F59E0B" : "#EF4444"

  /* ── Pantalla de resultado ── */
  if (fase === "resultado") {
    const xpTotal  = sabiasCount * XP_POR_SABIA + XP_BONUS_SPEED
    const perfecta = sabiasCount === preguntas.length

    return (
      <>
        {perfecta && <Confetti />}
        <motion.div
          className="w-full max-w-lg mx-auto px-4 pb-8 pt-6 flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: 64 }}>
            {sabiasCount === preguntas.length ? "🏆" : sabiasCount >= 5 ? "👍" : "💪"}
          </div>

          <h2
            className="text-2xl font-extrabold text-center"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
          >
            {sabiasCount === preguntas.length
              ? "¡Las sabías todas!"
              : sabiasCount >= 5
              ? "¡Buen repaso!"
              : "¡Sigue practicando!"}
          </h2>

          {/* Stats */}
          <div
            className="w-full rounded-2xl p-5"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
          >
            <div className="flex justify-around text-center">
              <div>
                <p className="text-3xl font-extrabold" style={{ color: "#34D399", fontFamily: "'Outfit', sans-serif" }}>
                  {sabiasCount}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>Lo sabía</p>
              </div>
              <div style={{ width: 1, background: "var(--color-border)" }} />
              <div>
                <p className="text-3xl font-extrabold" style={{ color: "#EF4444", fontFamily: "'Outfit', sans-serif" }}>
                  {resultados.length - sabiasCount}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>A repasar</p>
              </div>
              <div style={{ width: 1, background: "var(--color-border)" }} />
              <div>
                <p className="text-3xl font-extrabold" style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}>
                  {resultados.length}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>Completadas</p>
              </div>
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

          <div className="w-full text-xs text-center" style={{ color: "var(--color-text-secondary)" }}>
            {sabiasCount} × {XP_POR_SABIA} XP + {XP_BONUS_SPEED} XP por completar
          </div>

          <div className="w-full flex flex-col gap-2">
            <button
              onClick={reiniciar}
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
  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8">
      {/* Header */}
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
          🃏 Speed Cards
        </span>
        {/* Timer total */}
        <motion.span
          className="text-sm font-bold px-3 py-1.5 rounded-lg"
          style={{
            background: `${colorTiempo}22`,
            color: colorTiempo,
            border: `1px solid ${colorTiempo}55`,
            fontFamily: "'Outfit', sans-serif",
            minWidth: 68,
            textAlign: "center",
          }}
          animate={{ scale: tiempo <= 10 ? [1, 1.12, 1] : 1 }}
          transition={{ duration: 0.4, repeat: tiempo <= 10 ? Infinity : 0 }}
        >
          ⏱ {tiempoStr}
        </motion.span>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-accent-primary)" }}
          animate={{ width: `${(indice / preguntas.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Contador y pista */}
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          Card {indice + 1} de {preguntas.length}
        </span>
        {!flipped && (
          <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Toca para ver la definición
          </span>
        )}
      </div>

      {/* ── Flashcard con flip 3D ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
        >
          <div
            style={{ perspective: "1200px", minHeight: 210 }}
            onClick={() => !flipped && setFlipped(true)}
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transformStyle: "preserve-3d",
                position: "relative",
                minHeight: 210,
                cursor: flipped ? "default" : "pointer",
              }}
              className="rounded-2xl"
            >
              {/* Cara frontal — Término */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  minHeight: 210,
                }}
                className="rounded-2xl p-6 flex flex-col items-center justify-center gap-3"
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: "rgba(0,212,170,0.12)", color: "var(--color-accent-primary)" }}
                >
                  Término
                </span>
                <p
                  className="text-3xl font-extrabold text-center"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-text-primary)" }}
                >
                  {card.termino}
                </p>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  Toca para revelar
                </p>
              </div>

              {/* Cara trasera — Definición */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: "linear-gradient(135deg, rgba(0,212,170,0.12) 0%, rgba(0,212,170,0.04) 100%)",
                  border: "1px solid rgba(0,212,170,0.38)",
                  minHeight: 210,
                }}
                className="rounded-2xl p-6 flex flex-col items-center justify-center gap-3"
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: "rgba(0,212,170,0.18)", color: "var(--color-accent-primary)" }}
                >
                  Definición
                </span>
                <p
                  className="text-center text-base font-semibold leading-snug"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-text-primary)" }}
                >
                  {card.definicion}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Botones — visibles sólo tras voltear */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            className="grid grid-cols-2 gap-3 mt-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => responder(false)}
              className="py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "2px solid rgba(239,68,68,0.5)",
                color: "#EF4444",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              ✗ Repasar
            </button>
            <button
              onClick={() => responder(true)}
              className="py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95"
              style={{
                background: "rgba(52,211,153,0.15)",
                border: "2px solid rgba(52,211,153,0.5)",
                color: "#34D399",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              ✓ Lo sabía +2
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marcador */}
      <div className="flex justify-center gap-3 mt-5">
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: "rgba(52,211,153,0.1)", color: "#34D399", border: "1px solid rgba(52,211,153,0.25)" }}
        >
          ✓ {sabiasCount} sabía
        </span>
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }}
        >
          ✗ {resultados.length - sabiasCount} repasar
        </span>
      </div>
    </div>
  )
}

const TIEMPO_BATALLA    = 20
const XP_POR_BATALLA    = 2
const XP_BONUS_BATALLA  = 20

/* ─── Componente del juego Batalla de Conceptos ─── */
function BatallaConceptosGame({ onSalir, onXpGanado }) {
  const [preguntas] = useState(() => getBatallaQuestions(10))
  const [indice,    setIndice]    = useState(0)
  const [tiempo,    setTiempo]    = useState(TIEMPO_BATALLA)
  const [seleccion, setSeleccion] = useState(null)   // índice elegido | null
  const [correctas, setCorrectas] = useState(0)
  const [fase,      setFase]      = useState("jugando") // "jugando" | "feedback" | "vs" | "resultado"
  const [resultados, setResultados] = useState([])
  const timerRef = useRef(null)

  const par    = preguntas[indice]
  const esUltima = indice === preguntas.length - 1

  /* ── Timer por ronda ── */
  useEffect(() => {
    if (fase !== "jugando") return
    setTiempo(TIEMPO_BATALLA)
    timerRef.current = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          procesarRespuesta(null)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, fase])

  function procesarRespuesta(idx) {
    clearInterval(timerRef.current)
    const esCorrecto = idx === par.correcta
    setSeleccion(idx)
    const nuevasCorrectas = esCorrecto ? correctas + 1 : correctas
    if (esCorrecto) setCorrectas(nuevasCorrectas)
    setResultados((r) => [...r, esCorrecto])
    setFase("feedback")

    setTimeout(() => {
      if (esUltima) {
        const xp = nuevasCorrectas * XP_POR_BATALLA + XP_BONUS_BATALLA
        onXpGanado(xp)
        setFase("resultado")
      } else {
        // Animación VS entre rondas
        setFase("vs")
        setTimeout(() => {
          setIndice((i) => i + 1)
          setSeleccion(null)
          setFase("jugando")
        }, 700)
      }
    }, 1100)
  }

  /* ── Color del timer ── */
  const pctTiempo  = tiempo / TIEMPO_BATALLA
  const colorTimer = pctTiempo > 0.5 ? "#00D4AA" : pctTiempo > 0.25 ? "#F59E0B" : "#EF4444"

  /* ── Estado visual de cada opción ── */
  function estadoOpcion(idx) {
    if (fase === "jugando") return "idle"
    if (seleccion === null) return idx === par.correcta ? "correcta" : "idle"
    if (idx === seleccion && idx === par.correcta)  return "correcta"
    if (idx === seleccion && idx !== par.correcta)  return "incorrecta"
    if (idx === par.correcta)                       return "correcta"
    return "idle"
  }

  function colorOpcion(estado) {
    if (estado === "correcta")   return { bg: "rgba(52,211,153,0.22)", border: "#34D399", color: "#34D399" }
    if (estado === "incorrecta") return { bg: "rgba(239,68,68,0.22)",  border: "#EF4444", color: "#EF4444" }
    return { bg: "var(--color-bg-card)", border: "var(--color-border)", color: "var(--color-text-primary)" }
  }

  /* ── Pantalla VS (transición entre rondas) ── */
  if (fase === "vs") {
    return (
      <div className="w-full max-w-lg mx-auto px-4 flex items-center justify-center" style={{ minHeight: 320 }}>
        <motion.div
          key="vs-flash"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1.15, opacity: 1 }}
          exit={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-center select-none"
        >
          <span
            className="font-extrabold"
            style={{ fontSize: 96, fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)", lineHeight: 1 }}
          >
            VS
          </span>
          <p className="text-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
            Ronda {indice + 2} de {preguntas.length}
          </p>
        </motion.div>
      </div>
    )
  }

  /* ── Pantalla de resultado final ── */
  if (fase === "resultado") {
    const total    = resultados.filter(Boolean).length
    const pct      = (total / preguntas.length) * 100
    const confetti = total >= 6
    const xpTotal  = total * XP_POR_BATALLA + XP_BONUS_BATALLA

    return (
      <>
        {confetti && <Confetti />}
        <motion.div
          className="w-full max-w-lg mx-auto px-4 pb-8 pt-6 flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: 64 }}>
            {total >= 7 ? "🏆" : total >= 5 ? "👍" : "💪"}
          </div>
          <h2
            className="text-2xl font-extrabold text-center"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
          >
            {total >= 7 ? "¡Dominas los conceptos!" : total >= 5 ? "¡Buen combate!" : "¡Sigue entrenando!"}
          </h2>

          {/* Puntuación */}
          <div
            className="w-full rounded-2xl p-5 text-center"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
          >
            <p className="text-5xl font-extrabold" style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
              {total}<span className="text-2xl" style={{ color: "var(--color-text-secondary)" }}>/{preguntas.length}</span>
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>definiciones correctas</p>
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
          <div className="text-xs text-center" style={{ color: "var(--color-text-secondary)" }}>
            {total} correctas × {XP_POR_BATALLA} XP + {XP_BONUS_BATALLA} XP por completar
          </div>

          {/* Botones */}
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={() => { setIndice(0); setCorrectas(0); setResultados([]); setSeleccion(null); setFase("jugando") }}
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
  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8">
      {/* Header */}
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
          ⚔️ Batalla de Conceptos
        </span>
        <span
          className="text-sm font-bold px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
        >
          {indice + 1}/{preguntas.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-accent-primary)" }}
          animate={{ width: `${(indice / preguntas.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Timer circular */}
      <div className="flex justify-center mb-5">
        <div className="relative flex items-center justify-center" style={{ width: 68, height: 68 }}>
          <svg width="68" height="68" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="34" cy="34" r="28" fill="none" stroke="var(--color-border)" strokeWidth="5" />
            <motion.circle
              cx="34" cy="34" r="28" fill="none"
              stroke={colorTimer}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              animate={{ strokeDashoffset: `${2 * Math.PI * 28 * (1 - tiempo / TIEMPO_BATALLA)}` }}
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

      {/* Card del concepto */}
      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          className="rounded-2xl p-6 mb-4 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,170,0.12) 0%, rgba(0,212,170,0.04) 100%)",
            border: "1px solid rgba(0,212,170,0.35)",
            minHeight: 110,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-accent-primary)" }}>
            Concepto
          </p>
          <p
            className="text-2xl font-extrabold"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-text-primary)" }}
          >
            {par.concepto}
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--color-text-secondary)" }}>
            ¿Cuál es la definición correcta?
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Separador VS */}
      <div className="flex items-center gap-3 mb-4 px-2">
        <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
        <span
          className="text-sm font-extrabold px-3 py-1 rounded-full"
          style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.35)", fontFamily: "'Outfit', sans-serif" }}
        >
          VS
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
      </div>

      {/* Opciones */}
      <div className="flex flex-col gap-3">
        {par.opciones.map((opcion, idx) => {
          const estado = estadoOpcion(idx)
          const { bg, border, color } = colorOpcion(estado)
          return (
            <motion.button
              key={idx}
              onClick={() => fase === "jugando" && procesarRespuesta(idx)}
              disabled={fase !== "jugando"}
              className="w-full py-5 px-5 rounded-2xl text-left font-semibold text-sm transition-all active:scale-95"
              style={{
                background: bg,
                border: `2px solid ${border}`,
                color,
                fontFamily: "'Outfit', sans-serif",
                cursor: fase === "jugando" ? "pointer" : "default",
                lineHeight: 1.4,
              }}
              whileTap={fase === "jugando" ? { scale: 0.97 } : {}}
            >
              <span
                className="inline-block w-6 h-6 rounded-full text-xs font-extrabold text-center mr-3 flex-shrink-0"
                style={{
                  background: estado === "correcta" ? "#34D399" : estado === "incorrecta" ? "#EF4444" : "var(--color-border)",
                  color: estado !== "idle" ? "#fff" : "var(--color-text-secondary)",
                  lineHeight: "24px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              {opcion}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {fase === "feedback" && (
          <motion.div
            className="flex items-center justify-center gap-2 mt-4 py-2 rounded-xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: (seleccion === null || seleccion !== par.correcta)
                ? "rgba(239,68,68,0.15)"
                : "rgba(52,211,153,0.15)",
              border: `1px solid ${(seleccion === null || seleccion !== par.correcta) ? "#EF4444" : "#34D399"}`,
            }}
          >
            <span style={{ fontSize: 18 }}>
              {seleccion === null ? "⏱️" : seleccion === par.correcta ? "✓" : "✗"}
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: (seleccion === null || seleccion !== par.correcta) ? "#EF4444" : "#34D399" }}
            >
              {seleccion === null
                ? "¡Tiempo agotado!"
                : seleccion === par.correcta
                ? `¡Correcto! +${XP_POR_BATALLA} XP`
                : `Incorrecto — era la opción ${String.fromCharCode(65 + par.correcta)}`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marcador */}
      <div className="flex justify-center mt-4">
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

/* ─── Datos del juego 3 — Completa el Concepto ─── */
const TIEMPO_CONCEPTO   = 25
const XP_POR_CONCEPTO   = 2
const XP_BONUS_CONCEPTO = 20

/* ─── Componente del juego Completa el Concepto ─── */
function CompletaConceptoGame({ onSalir, onXpGanado }) {
  const [preguntas] = useState(() => getCompletaConceptoQuestions(10))
  const [indice,    setIndice]    = useState(0)
  const [tiempo,    setTiempo]    = useState(TIEMPO_CONCEPTO)
  const [seleccion, setSeleccion] = useState(null) // string | null
  const [correctas, setCorrectas] = useState(0)
  const [fase,      setFase]      = useState("jugando") // "jugando" | "feedback" | "resultado"
  const [resultados, setResultados] = useState([])
  const timerRef = useRef(null)

  const frase   = preguntas[indice]
  const esUltima = indice === preguntas.length - 1

  /* ── Timer ── */
  useEffect(() => {
    if (fase !== "jugando") return
    setTiempo(TIEMPO_CONCEPTO)
    timerRef.current = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          procesarRespuesta(null)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, fase])

  function procesarRespuesta(opcion) {
    clearInterval(timerRef.current)
    const esCorrecto = opcion === frase.correcta
    setSeleccion(opcion)
    const nuevasCorrectas = esCorrecto ? correctas + 1 : correctas
    if (esCorrecto) setCorrectas(nuevasCorrectas)
    setResultados((r) => [...r, esCorrecto])
    setFase("feedback")

    setTimeout(() => {
      if (esUltima) {
        const xp = nuevasCorrectas * XP_POR_CONCEPTO + XP_BONUS_CONCEPTO
        onXpGanado(xp)
        setFase("resultado")
      } else {
        setIndice((i) => i + 1)
        setSeleccion(null)
        setFase("jugando")
      }
    }, 1300)
  }

  const pctTiempo  = tiempo / TIEMPO_CONCEPTO
  const colorTimer = pctTiempo > 0.5 ? "#00D4AA" : pctTiempo > 0.25 ? "#F59E0B" : "#EF4444"

  /* ── Estado visual por opción ── */
  function estadoOpcion(opcion) {
    if (fase === "jugando") return "idle"
    if (seleccion === null) return opcion === frase.correcta ? "correcta" : "idle"
    if (opcion === seleccion && opcion === frase.correcta)  return "correcta"
    if (opcion === seleccion && opcion !== frase.correcta)  return "incorrecta"
    if (opcion === frase.correcta)                          return "correcta"
    return "idle"
  }

  function colorOpcion(estado) {
    if (estado === "correcta")   return { bg: "rgba(52,211,153,0.22)", border: "#34D399", color: "#34D399" }
    if (estado === "incorrecta") return { bg: "rgba(239,68,68,0.22)",  border: "#EF4444", color: "#EF4444" }
    return { bg: "var(--color-bg-card)", border: "var(--color-border)", color: "var(--color-text-primary)" }
  }

  /* ── Resultado final ── */
  if (fase === "resultado") {
    const total   = resultados.filter(Boolean).length
    const pct     = (total / preguntas.length) * 100
    const confetti = total >= 6
    const xpTotal = total * XP_POR_CONCEPTO + XP_BONUS_CONCEPTO

    return (
      <>
        {confetti && <Confetti />}
        <motion.div
          className="w-full max-w-lg mx-auto px-4 pb-8 pt-6 flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: 64 }}>
            {total >= 7 ? "🏆" : total >= 5 ? "👍" : "💪"}
          </div>

          <h2
            className="text-2xl font-extrabold text-center"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
          >
            {total >= 7 ? "¡Conceptos dominados!" : total >= 5 ? "¡Buen trabajo!" : "¡Sigue practicando!"}
          </h2>

          {/* Puntuación */}
          <div
            className="w-full rounded-2xl p-5 text-center"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
          >
            <p className="text-5xl font-extrabold" style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
              {total}<span className="text-2xl" style={{ color: "var(--color-text-secondary)" }}>/{preguntas.length}</span>
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>frases completadas</p>
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
          <div className="text-xs text-center" style={{ color: "var(--color-text-secondary)" }}>
            {total} correctas × {XP_POR_CONCEPTO} XP + {XP_BONUS_CONCEPTO} XP por completar
          </div>

          {/* Botones */}
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={() => { setIndice(0); setCorrectas(0); setResultados([]); setSeleccion(null); setFase("jugando") }}
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
  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8">
      {/* Header */}
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
          ✏️ Completa el Concepto
        </span>
        <span
          className="text-sm font-bold px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
        >
          {indice + 1}/{preguntas.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-accent-primary)" }}
          animate={{ width: `${(indice / preguntas.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Timer circular */}
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center justify-center" style={{ width: 68, height: 68 }}>
          <svg width="68" height="68" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="34" cy="34" r="28" fill="none" stroke="var(--color-border)" strokeWidth="5" />
            <motion.circle
              cx="34" cy="34" r="28" fill="none"
              stroke={colorTimer}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              animate={{ strokeDashoffset: `${2 * Math.PI * 28 * (1 - tiempo / TIEMPO_CONCEPTO)}` }}
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

      {/* Frase con hueco */}
      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          className="rounded-2xl p-6 mb-6 text-center"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            minHeight: 120,
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg font-semibold leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {frase.partes.map((parte, pi) =>
              parte === "___" ? (
                <span
                  key={pi}
                  className="font-extrabold px-2 py-0.5 rounded-lg mx-1"
                  style={{
                    color: "#F59E0B",
                    background: "rgba(245,158,11,0.15)",
                    border: "2px dashed rgba(245,158,11,0.5)",
                    fontSize: "1.15em",
                  }}
                >
                  ___
                </span>
              ) : (
                <span key={pi} style={{ color: "var(--color-text-primary)" }}>{parte}</span>
              )
            )}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Opciones 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        {frase.opciones.map((opcion) => {
          const estado = estadoOpcion(opcion)
          const { bg, border, color } = colorOpcion(estado)
          return (
            <motion.button
              key={opcion}
              onClick={() => fase === "jugando" && procesarRespuesta(opcion)}
              disabled={fase !== "jugando"}
              className="py-4 px-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 text-center"
              style={{
                background: bg,
                border: `2px solid ${border}`,
                color,
                fontFamily: "'Outfit', sans-serif",
                cursor: fase === "jugando" ? "pointer" : "default",
              }}
              whileTap={fase === "jugando" ? { scale: 0.94 } : {}}
            >
              {opcion}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {fase === "feedback" && (
          <motion.div
            className="flex items-center justify-center gap-2 mt-4 py-2 rounded-xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: (seleccion === null || seleccion !== frase.correcta)
                ? "rgba(239,68,68,0.15)"
                : "rgba(52,211,153,0.15)",
              border: `1px solid ${(seleccion === null || seleccion !== frase.correcta) ? "#EF4444" : "#34D399"}`,
            }}
          >
            <span style={{ fontSize: 18 }}>
              {seleccion === null ? "⏱️" : seleccion === frase.correcta ? "✓" : "✗"}
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: (seleccion === null || seleccion !== frase.correcta) ? "#EF4444" : "#34D399" }}
            >
              {seleccion === null
                ? "¡Tiempo agotado!"
                : seleccion === frase.correcta
                ? `¡Correcto! +${XP_POR_CONCEPTO} XP`
                : `Incorrecto — era "${frase.correcta}"`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marcador */}
      <div className="flex justify-center mt-4">
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

/* ─── Componente del juego Conexión Rápida ─── */
function ConexionRapidaGame({ onSalir, onXpGanado }) {
  const RONDAS = 8
  const TIEMPO_RONDA = 45

  function crearEstadoJuego() {
    const pares = getConexionRapidaQuestions(RONDAS * 4)
    const defsOrdenes = Array.from({ length: RONDAS }, (_, i) =>
      shuffleArr(pares.slice(i * 4, i * 4 + 4).map((p) => p.definicion))
    )
    return { pares, defsOrdenes }
  }

  const [estadoJuego, setEstadoJuego] = useState(crearEstadoJuego)
  const [ronda, setRonda] = useState(0)
  const [tiempo, setTiempo] = useState(TIEMPO_RONDA)
  const [terminoSel, setTerminoSel] = useState(null)
  const [conectados, setConectados] = useState(new Set())
  const [shake, setShake] = useState(false)
  const [fase, setFase] = useState("jugando")
  const [totalCorrectos, setTotalCorrectos] = useState(0)
  const timerRef = useRef(null)
  const rondaRef = useRef(0)
  const conectadosRef = useRef(new Set())
  const totalCorrectosRef = useRef(0)

  // Timer — se reinicia cuando cambia ronda o fase
  useEffect(() => {
    if (fase !== "jugando") return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          avanzarRonda()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [ronda, fase]) // eslint-disable-line react-hooks/exhaustive-deps

  function avanzarRonda() {
    const sig = rondaRef.current + 1
    if (sig >= RONDAS) {
      onXpGanado(totalCorrectosRef.current * 5 + 20)
      setFase("resultado")
    } else {
      rondaRef.current = sig
      conectadosRef.current = new Set()
      setConectados(new Set())
      setTerminoSel(null)
      setShake(false)
      setTiempo(TIEMPO_RONDA)
      setRonda(sig)
    }
  }

  function jugarDeNuevo() {
    const nuevoEstado = crearEstadoJuego()
    setEstadoJuego(nuevoEstado)
    rondaRef.current = 0
    conectadosRef.current = new Set()
    totalCorrectosRef.current = 0
    setRonda(0)
    setConectados(new Set())
    setTerminoSel(null)
    setShake(false)
    setTiempo(TIEMPO_RONDA)
    setTotalCorrectos(0)
    setFase("jugando")
  }

  function tapTermino(termino) {
    if (conectadosRef.current.has(termino)) return
    setTerminoSel((prev) => (prev === termino ? null : termino))
  }

  function tapDefinicion(definicion) {
    if (!terminoSel) return
    const pares = estadoJuego.pares.slice(rondaRef.current * 4, rondaRef.current * 4 + 4)
    const parCorrecto = pares.find((p) => p.termino === terminoSel)

    if (parCorrecto?.definicion === definicion) {
      const newSet = new Set([...conectadosRef.current, terminoSel])
      conectadosRef.current = newSet
      totalCorrectosRef.current += 1
      setConectados(new Set(newSet))
      setTotalCorrectos((t) => t + 1)
      setTerminoSel(null)
      if (newSet.size >= 4) {
        clearInterval(timerRef.current)
        setTimeout(avanzarRonda, 700)
      }
    } else {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setTerminoSel(null)
      }, 500)
    }
  }

  const paresRonda = estadoJuego.pares.slice(ronda * 4, ronda * 4 + 4)
  const defsOrden = estadoJuego.defsOrdenes[ronda] || []
  const tiempoRatio = tiempo / TIEMPO_RONDA
  const maxCorrectos = RONDAS * 4

  if (fase === "resultado") {
    const xp = totalCorrectosRef.current * 5 + 20
    return (
      <div className="w-full max-w-lg mx-auto px-4 pb-8 pt-8 flex flex-col items-center gap-6">
        {totalCorrectosRef.current >= maxCorrectos * 0.7 && <Confetti />}
        <div style={{ fontSize: 52 }}>{totalCorrectosRef.current >= 24 ? "🏆" : "✅"}</div>
        <h2
          className="text-2xl font-extrabold text-center"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
        >
          ¡Rondas completadas!
        </h2>
        <div
          className="rounded-2xl p-6 text-center w-full"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
        >
          <p className="text-4xl font-extrabold" style={{ color: "var(--color-accent-primary)" }}>
            {totalCorrectosRef.current}/{maxCorrectos}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            pares conectados correctamente
          </p>
          <p className="text-2xl font-bold mt-3" style={{ color: "#F59E0B" }}>
            +{xp} XP
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onSalir}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{
              background: "var(--color-border)",
              color: "var(--color-text-secondary)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Salir
          </button>
          <button
            onClick={jugarDeNuevo}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{
              background: "var(--color-accent-primary)",
              color: "#fff",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between pt-5 pb-3">
        <button
          onClick={onSalir}
          className="text-sm px-3 py-1.5 rounded-xl"
          style={{
            background: "var(--color-border)",
            color: "var(--color-text-secondary)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          ← Salir
        </button>
        <span className="text-sm font-semibold" style={{ color: "var(--color-text-secondary)" }}>
          Ronda {ronda + 1}/{RONDAS}
        </span>
        <span className="text-sm font-bold" style={{ color: "#F59E0B" }}>
          +{totalCorrectos * 5} XP
        </span>
      </div>

      {/* Barra de tiempo */}
      <div
        className="h-2 rounded-full mb-4 overflow-hidden"
        style={{ background: "var(--color-border)" }}
      >
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${tiempoRatio * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              tiempoRatio > 0.5 ? "#00D4AA" : tiempoRatio > 0.25 ? "#F59E0B" : "#EF4444",
          }}
        />
      </div>

      {/* Instrucción */}
      <p
        className="text-center text-sm font-bold mb-4"
        style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}
      >
        🔗 Conecta cada término con su definición
      </p>

      {/* Dos columnas */}
      <div className="grid grid-cols-2 gap-2">
        {/* Columna izquierda: términos */}
        <div className="flex flex-col gap-2">
          {paresRonda.map((par) => {
            const esSel = terminoSel === par.termino
            const esConectado = conectados.has(par.termino)
            return (
              <motion.button
                key={par.termino}
                onClick={() => tapTermino(par.termino)}
                animate={esSel && shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="min-h-[60px] px-2 py-2 rounded-xl text-[11px] leading-tight text-left"
                style={{
                  background: esConectado
                    ? "rgba(16,185,129,0.15)"
                    : esSel
                    ? "rgba(0,212,170,0.18)"
                    : "var(--color-bg-card)",
                  border: esConectado
                    ? "1.5px solid rgba(16,185,129,0.7)"
                    : esSel
                    ? "2px solid #00D4AA"
                    : "1px solid var(--color-border)",
                  color: esConectado ? "#10B981" : esSel ? "#00D4AA" : "var(--color-text-primary)",
                  cursor: esConectado ? "default" : "pointer",
                  fontWeight: esSel ? 700 : 500,
                  transition: "all 0.15s",
                }}
              >
                {esConectado && "✓ "}
                {par.termino}
              </motion.button>
            )
          })}
        </div>

        {/* Columna derecha: definiciones mezcladas */}
        <div className="flex flex-col gap-2">
          {defsOrden.map((def) => {
            const parConectado = paresRonda.find(
              (p) => conectados.has(p.termino) && p.definicion === def
            )
            return (
              <button
                key={def}
                onClick={() => tapDefinicion(def)}
                className="min-h-[60px] px-2 py-2 rounded-xl text-[11px] leading-tight text-left"
                style={{
                  background: parConectado ? "rgba(16,185,129,0.15)" : "var(--color-bg-card)",
                  border: parConectado
                    ? "1.5px solid rgba(16,185,129,0.7)"
                    : "1px solid var(--color-border)",
                  color: parConectado ? "#10B981" : "var(--color-text-secondary)",
                  cursor: parConectado ? "default" : "pointer",
                  transition: "all 0.15s",
                }}
              >
                {parConectado && "✓ "}
                {def}
              </button>
            )
          })}
        </div>
      </div>

      {/* Marcador inferior */}
      <div className="mt-4 flex justify-between px-1">
        <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {conectados.size}/4 pares
        </span>
        <span
          className="text-xs font-bold"
          style={{
            color:
              tiempoRatio > 0.5 ? "#00D4AA" : tiempoRatio > 0.25 ? "#F59E0B" : "#EF4444",
          }}
        >
          {tiempo}s
        </span>
      </div>
    </div>
  )
}

/* ─── Componente del juego Ordena los Pasos ─── */
function OrdenaPasosGame({ onSalir, onXpGanado }) {
  const TIEMPO_RONDA = 35

  const [ronda, setRonda] = useState(0)
  const [tiempo, setTiempo] = useState(TIEMPO_RONDA)
  const [seleccionados, setSeleccionados] = useState([])
  const [itemsMezclados] = useState(() =>
    SECUENCIAS_ORDEN.map((s) => shuffleArr([...s.pasos]))
  )
  const [correcto, setCorrecto] = useState(false)
  const [shake, setShake] = useState(false)
  const [correctas, setCorrectas] = useState(0)
  const [fase, setFase] = useState("jugando")
  const timerRef = useRef(null)
  const rondaRef = useRef(0)
  const correctasRef = useRef(0)

  // Timer — se pausa cuando la ronda está correcta
  useEffect(() => {
    if (fase !== "jugando" || correcto) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          avanzarRonda()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [ronda, fase, correcto]) // eslint-disable-line react-hooks/exhaustive-deps

  // Resetear estado al cambiar ronda
  useEffect(() => {
    setSeleccionados([])
    setCorrecto(false)
    setShake(false)
    setTiempo(TIEMPO_RONDA)
  }, [ronda])

  function avanzarRonda() {
    const sig = rondaRef.current + 1
    if (sig >= SECUENCIAS_ORDEN.length) {
      onXpGanado(correctasRef.current * 5 + 20)
      setFase("resultado")
    } else {
      rondaRef.current = sig
      setRonda(sig)
    }
  }

  function jugarDeNuevo() {
    rondaRef.current = 0
    correctasRef.current = 0
    setRonda(0)
    setCorrectas(0)
    setFase("jugando")
  }

  function tapPaso(paso) {
    if (seleccionados.includes(paso) || correcto || shake) return
    const nextIdx = seleccionados.length
    const secuencia = SECUENCIAS_ORDEN[rondaRef.current]

    if (paso === secuencia.pasos[nextIdx]) {
      const newSel = [...seleccionados, paso]
      setSeleccionados(newSel)
      if (newSel.length === 4) {
        clearInterval(timerRef.current)
        correctasRef.current += 1
        setCorrectas((c) => c + 1)
        setCorrecto(true)
        setTimeout(avanzarRonda, 1000)
      }
    } else {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setSeleccionados([])
      }, 600)
    }
  }

  const secuenciaActual = SECUENCIAS_ORDEN[ronda]
  const mezclados = itemsMezclados[ronda]
  const tiempoRatio = tiempo / TIEMPO_RONDA

  if (fase === "resultado") {
    const xp = correctasRef.current * 5 + 20
    return (
      <div className="w-full max-w-lg mx-auto px-4 pb-8 pt-8 flex flex-col items-center gap-6">
        {correctasRef.current >= 4 && <Confetti />}
        <div style={{ fontSize: 52 }}>{correctasRef.current >= 4 ? "🏆" : "✅"}</div>
        <h2
          className="text-2xl font-extrabold text-center"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
        >
          ¡Juego terminado!
        </h2>
        <div
          className="rounded-2xl p-6 text-center w-full"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
        >
          <p className="text-4xl font-extrabold" style={{ color: "var(--color-accent-primary)" }}>
            {correctasRef.current}/{SECUENCIAS_ORDEN.length}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            secuencias ordenadas correctamente
          </p>
          <p className="text-2xl font-bold mt-3" style={{ color: "#F59E0B" }}>
            +{xp} XP
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onSalir}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{
              background: "var(--color-border)",
              color: "var(--color-text-secondary)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Salir
          </button>
          <button
            onClick={jugarDeNuevo}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{
              background: "var(--color-accent-primary)",
              color: "#fff",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between pt-5 pb-3">
        <button
          onClick={onSalir}
          className="text-sm px-3 py-1.5 rounded-xl"
          style={{
            background: "var(--color-border)",
            color: "var(--color-text-secondary)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          ← Salir
        </button>
        <span className="text-sm font-semibold" style={{ color: "var(--color-text-secondary)" }}>
          {ronda + 1}/{SECUENCIAS_ORDEN.length}
        </span>
        <span className="text-sm font-bold" style={{ color: "#F59E0B" }}>
          {correctas} ✓
        </span>
      </div>

      {/* Barra de tiempo */}
      <div
        className="h-2 rounded-full mb-4 overflow-hidden"
        style={{ background: "var(--color-border)" }}
      >
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${tiempoRatio * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              tiempoRatio > 0.5 ? "#00D4AA" : tiempoRatio > 0.25 ? "#F59E0B" : "#EF4444",
          }}
        />
      </div>

      {/* Tarjeta de instrucción */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: "var(--color-text-secondary)" }}>
          Toca los pasos en el orden correcto:
        </p>
        <p
          className="text-base font-bold"
          style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}
        >
          {secuenciaActual.titulo}
        </p>
      </div>

      {/* Indicador de progreso */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {secuenciaActual.pasos.map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background:
                  i < seleccionados.length
                    ? correcto
                      ? "rgba(16,185,129,0.25)"
                      : "rgba(0,212,170,0.2)"
                    : "var(--color-border)",
                border:
                  i < seleccionados.length
                    ? correcto
                      ? "2px solid #10B981"
                      : "2px solid #00D4AA"
                    : "2px solid transparent",
                color:
                  i < seleccionados.length
                    ? correcto
                      ? "#10B981"
                      : "#00D4AA"
                    : "var(--color-text-secondary)",
                transition: "all 0.2s",
              }}
            >
              {i < seleccionados.length ? (correcto ? "✓" : i + 1) : i + 1}
            </div>
            {i < 3 && (
              <span style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* Opciones de pasos */}
      <motion.div
        className="flex flex-col gap-2"
        animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {mezclados.map((paso) => {
          const selIdx = seleccionados.indexOf(paso)
          const esSel = selIdx !== -1
          return (
            <button
              key={paso}
              onClick={() => tapPaso(paso)}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-left active:scale-95"
              style={{
                background: correcto && esSel
                  ? "rgba(16,185,129,0.18)"
                  : esSel
                  ? "rgba(0,212,170,0.14)"
                  : "var(--color-bg-card)",
                border: correcto && esSel
                  ? "2px solid #10B981"
                  : esSel
                  ? "2px solid #00D4AA"
                  : "1px solid var(--color-border)",
                color: correcto && esSel
                  ? "#10B981"
                  : esSel
                  ? "#00D4AA"
                  : "var(--color-text-primary)",
                cursor: esSel ? "default" : "pointer",
                transition: "all 0.15s",
              }}
            >
              {esSel ? `${selIdx + 1}. ` : ""}
              {paso}
            </button>
          )
        })}
      </motion.div>

      {/* Tiempo */}
      <p className="text-center mt-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>
        {tiempo}s
      </p>
    </div>
  )
}

/* ─── Daily Challenge Game ─── */
const XP_DAILY = 50
const TIEMPO_DAILY = 30

function DailyChallengeGame({ onSalir, onXpGanado, onCompletado }) {
  const [preguntas] = useState(() => getDailyQuestions(10))
  const [indice, setIndice] = useState(0)
  const [tiempo, setTiempo] = useState(TIEMPO_DAILY)
  const [seleccion, setSeleccion] = useState(null)
  const [correctas, setCorrectas] = useState(0)
  const [fase, setFase] = useState("jugando") // "jugando" | "feedback" | "resultado"
  const [resultados, setResultados] = useState([])
  const timerRef = useRef(null)

  const pregunta = preguntas[indice]
  const esUltima = indice === preguntas.length - 1

  useEffect(() => {
    if (fase !== "jugando") return
    setTiempo(TIEMPO_DAILY)
    timerRef.current = setInterval(() => {
      setTiempo((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          procesarRespuesta(-1) // tiempo agotado = fallo
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, fase])

  function procesarRespuesta(idx) {
    clearInterval(timerRef.current)
    const esCorrecto = idx === pregunta.correcta_index
    setSeleccion(idx)
    if (esCorrecto) setCorrectas((c) => c + 1)
    setResultados((r) => [...r, esCorrecto])
    setFase("feedback")

    setTimeout(() => {
      if (esUltima) {
        const total = esCorrecto ? correctas + 1 : correctas
        onXpGanado(XP_DAILY)
        onCompletado(total)
        setFase("resultado")
      } else {
        setIndice((i) => i + 1)
        setSeleccion(null)
        setFase("jugando")
      }
    }, 1400)
  }

  const pctTiempo = tiempo / TIEMPO_DAILY
  const colorTimer = pctTiempo > 0.5 ? "#F59E0B" : pctTiempo > 0.25 ? "#F97316" : "#EF4444"

  /* ── Pantalla de resultado ── */
  if (fase === "resultado") {
    const totalCorrectas = resultados.filter(Boolean).length
    const pct = (totalCorrectas / preguntas.length) * 100
    return (
      <>
        {totalCorrectas >= 7 && <Confetti />}
        <motion.div
          className="w-full max-w-lg mx-auto px-4 pb-8 pt-6 flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: 64 }}>
            {totalCorrectas >= 8 ? "🏆" : totalCorrectas >= 5 ? "⭐" : "💪"}
          </div>
          <h2 className="text-2xl font-extrabold text-center"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}
          >
            {totalCorrectas >= 8 ? "¡Daily Completado!" : totalCorrectas >= 5 ? "¡Buen trabajo!" : "¡Mañana lo rompes!"}
          </h2>
          <div className="w-full rounded-2xl p-5 text-center"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
          >
            <p className="text-5xl font-extrabold" style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
              {totalCorrectas}<span className="text-2xl" style={{ color: "var(--color-text-secondary)" }}>/{preguntas.length}</span>
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>respuestas correctas</p>
            <div className="mt-3 h-3 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
              <motion.div className="h-full rounded-full" style={{ background: "#F59E0B" }}
                initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
          <motion.div className="flex items-center gap-2 px-5 py-3 rounded-xl"
            style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.35)" }}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}
          >
            <span style={{ fontSize: 22 }}>⭐</span>
            <span className="font-bold text-lg" style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}>
              +{XP_DAILY} XP ganados
            </span>
          </motion.div>
          <button
            onClick={onSalir}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 active:scale-95"
            style={{ background: "rgba(245,158,11,0.22)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.45)", fontFamily: "'Outfit', sans-serif" }}
          >
            Volver al Arcade
          </button>
        </motion.div>
      </>
    )
  }

  /* ── Pantalla de juego ── */
  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onSalir}
          className="text-sm px-3 py-1.5 rounded-lg"
          style={{ background: "var(--color-bg-card)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)", fontFamily: "'Outfit', sans-serif" }}
        >
          ← Salir
        </button>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 18 }}>☀️</span>
          <span className="font-bold text-sm" style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}>Daily Challenge</span>
        </div>
        <span className="text-sm font-semibold" style={{ color: "var(--color-text-secondary)" }}>{indice + 1}/10</span>
      </div>

      {/* Barra de tiempo por pregunta */}
      <div className="h-2 rounded-full overflow-hidden mb-4" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: colorTimer }}
          animate={{ width: `${pctTiempo * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Pregunta */}
      <AnimatePresence mode="wait">
        <motion.div key={indice}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl p-5 mb-4"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
        >
          <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#F59E0B" }}>
            {pregunta.concepto_reforzado}
          </p>
          <p className="text-base font-semibold leading-snug"
            style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}
          >
            {pregunta.pregunta}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Opciones */}
      <div className="flex flex-col gap-2">
        {pregunta.opciones.map((op, i) => {
          let bg = "var(--color-bg-card)"
          let border = "1px solid var(--color-border)"
          let textColor = "var(--color-text-primary)"
          if (fase === "feedback") {
            if (i === pregunta.correcta_index) {
              bg = "rgba(0,212,170,0.18)"; border = "1px solid #00D4AA"; textColor = "#00D4AA"
            } else if (i === seleccion) {
              bg = "rgba(239,68,68,0.18)"; border = "1px solid #EF4444"; textColor = "#EF4444"
            }
          }
          return (
            <button
              key={i}
              onClick={() => fase === "jugando" && procesarRespuesta(i)}
              disabled={fase !== "jugando"}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:brightness-110"
              style={{ background: bg, border, color: textColor, fontFamily: "'Outfit', sans-serif", cursor: fase === "jugando" ? "pointer" : "default" }}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{op}
            </button>
          )
        })}
      </div>

      <p className="text-center mt-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>{tiempo}s</p>
    </div>
  )
}

/* ─── Streak Defender Game ─── */
const XP_STREAK = 20
const TIEMPO_STREAK_TOTAL = 180 // 3 minutos

function StreakDefenderGame({ onSalir, onXpGanado, racha, onSalvado, onRoto }) {
  const [preguntas] = useState(() => getProgressiveQuestions(racha, 5))
  const [indice, setIndice] = useState(0)
  const [tiempoTotal, setTiempoTotal] = useState(TIEMPO_STREAK_TOTAL)
  const [seleccion, setSeleccion] = useState(null)
  const [correctas, setCorrectas] = useState(0)
  const [fase, setFase] = useState("jugando") // "jugando" | "feedback" | "salvado" | "roto"
  const timerRef = useRef(null)
  const faseRef = useRef("jugando")
  faseRef.current = fase

  /* ── Timer global de 2 minutos ── */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTiempoTotal((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          if (faseRef.current !== "salvado") {
            setFase("roto")
            onRoto()
          }
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function procesarRespuesta(idx) {
    if (fase !== "jugando") return
    const esCorrecto = idx === preguntas[indice].correcta_index
    setSeleccion(idx)
    if (esCorrecto) setCorrectas((c) => c + 1)
    setFase("feedback")

    setTimeout(() => {
      if (indice >= preguntas.length - 1) {
        clearInterval(timerRef.current)
        setFase("salvado")
        onXpGanado(XP_STREAK)
        onSalvado()
      } else {
        setIndice((i) => i + 1)
        setSeleccion(null)
        setFase("jugando")
      }
    }, 900)
  }

  const pctTiempo = tiempoTotal / TIEMPO_STREAK_TOTAL
  const colorTimer = pctTiempo > 0.5 ? "#F97316" : pctTiempo > 0.25 ? "#F59E0B" : "#EF4444"

  /* ── Racha salvada ── */
  if (fase === "salvado") {
    return (
      <>
        <Confetti />
        <motion.div
          className="w-full max-w-lg mx-auto px-4 pb-8 pt-10 flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        >
          <div style={{ fontSize: 72 }}>🔥</div>
          <h2 className="text-3xl font-extrabold text-center"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#F97316" }}
          >
            ¡RACHA SALVADA!
          </h2>
          <p className="text-center text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Respondiste {correctas} de 5 preguntas.<br />
            Tu racha de {racha} días sigue viva. 💪
          </p>
          <motion.div
            className="flex items-center gap-2 px-5 py-3 rounded-xl"
            style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.35)" }}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}
          >
            <span style={{ fontSize: 22 }}>⭐</span>
            <span className="font-bold text-lg" style={{ color: "#F97316", fontFamily: "'Outfit', sans-serif" }}>
              +{XP_STREAK} XP ganados
            </span>
          </motion.div>
          <button
            onClick={onSalir}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 active:scale-95"
            style={{ background: "rgba(249,115,22,0.22)", color: "#F97316", border: "1px solid rgba(249,115,22,0.45)", fontFamily: "'Outfit', sans-serif" }}
          >
            Volver al Arcade
          </button>
        </motion.div>
      </>
    )
  }

  /* ── Racha rota ── */
  if (fase === "roto") {
    return (
      <motion.div
        className="w-full max-w-lg mx-auto px-4 pb-8 pt-10 flex flex-col items-center gap-5"
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
      >
        <div style={{ fontSize: 72 }}>💔</div>
        <h2 className="text-3xl font-extrabold text-center"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#EF4444" }}
        >
          Racha rota
        </h2>
        <p className="text-center text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Se acabó el tiempo. Tu racha de {racha} días se ha roto.<br />
          Mañana empiezas de nuevo. ¡Tú puedes!
        </p>
        <button
          onClick={onSalir}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 active:scale-95"
          style={{ background: "var(--color-bg-card)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)", fontFamily: "'Outfit', sans-serif" }}
        >
          Volver al Arcade
        </button>
      </motion.div>
    )
  }

  /* ── Juego ── */
  const pregunta = preguntas[indice]

  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={onSalir}
          className="text-sm px-3 py-1.5 rounded-lg"
          style={{ background: "var(--color-bg-card)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)", fontFamily: "'Outfit', sans-serif" }}
        >
          ← Salir
        </button>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 18 }}>🔥</span>
          <span className="font-bold text-sm" style={{ color: "#F97316", fontFamily: "'Outfit', sans-serif" }}>Defender Racha</span>
        </div>
        <span className="text-sm font-bold" style={{ color: colorTimer }}>{formatearConteo(tiempoTotal)}</span>
      </div>

      {/* Barra de tiempo total */}
      <div className="h-3 rounded-full overflow-hidden mb-4" style={{ background: "var(--color-border)" }}>
        <motion.div className="h-full rounded-full"
          style={{ background: colorTimer }}
          animate={{ width: `${pctTiempo * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Progreso */}
      <p className="text-xs text-center mb-4" style={{ color: "var(--color-text-secondary)" }}>
        Pregunta {indice + 1} de 5 · Racha actual: {racha} 🔥
      </p>

      {/* Pregunta */}
      <AnimatePresence mode="wait">
        <motion.div key={indice}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl p-5 mb-4"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
        >
          <p className="text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#F97316" }}>
            {pregunta.concepto_reforzado}
          </p>
          <p className="text-base font-semibold leading-snug"
            style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}
          >
            {pregunta.pregunta}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Opciones */}
      <div className="flex flex-col gap-2">
        {pregunta.opciones.map((op, i) => {
          let bg = "var(--color-bg-card)"
          let border = "1px solid var(--color-border)"
          let textColor = "var(--color-text-primary)"
          if (fase === "feedback") {
            if (i === pregunta.correcta_index) {
              bg = "rgba(0,212,170,0.18)"; border = "1px solid #00D4AA"; textColor = "#00D4AA"
            } else if (i === seleccion) {
              bg = "rgba(239,68,68,0.18)"; border = "1px solid #EF4444"; textColor = "#EF4444"
            }
          }
          return (
            <button
              key={i}
              onClick={() => procesarRespuesta(i)}
              disabled={fase !== "jugando"}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:brightness-110"
              style={{ background: bg, border, color: textColor, fontFamily: "'Outfit', sans-serif", cursor: fase === "jugando" ? "pointer" : "default" }}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>{op}
            </button>
          )
        })}
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
  const [juegoActivo, setJuegoActivo] = useState(null)
  const [xpAcumulado, setXpAcumulado] = useState(0)
  const [dailyState, setDailyState] = useState(() => cargarDailyState())
  const [rachaActual, setRachaActual] = useState(() => cargarProgreso().rachaDiaria || 0)
  const [estudióHoy, setEstudióHoy] = useState(() => estudióHoyCheck())
  const [countdown, setCountdown] = useState(() => segundosHastaMedianoche())

  // Countdown hasta medianoche (solo si daily completado hoy)
  const dailyCompletadoHoy = dailyState?.fecha === getTodayStr() && dailyState?.completado
  useEffect(() => {
    if (!dailyCompletadoHoy) return
    const interval = setInterval(() => setCountdown(segundosHastaMedianoche()), 1000)
    return () => clearInterval(interval)
  }, [dailyCompletadoHoy])

  function manejarJugar(indice) {
    if (indice === 0) setJuegoActivo("verdadero-falso")
    if (indice === 1) setJuegoActivo("conexion-rapida")
    if (indice === 2) setJuegoActivo("completa-concepto")
    if (indice === 3) setJuegoActivo("ordena-pasos")
    if (indice === 4) setJuegoActivo("batalla-conceptos")
    if (indice === 5) setJuegoActivo("speed-cards")
  }

  function manejarXp(xp) {
    setXpAcumulado((prev) => prev + xp)
    guardarXpProgreso(xp)
  }

  function manejarDailyCompletado(score) {
    const hoy = getTodayStr()
    const prev = cargarDailyState()
    // Calcular streak de daily challenge
    const ayer = (() => {
      const d = new Date(); d.setDate(d.getDate() - 1)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    })()
    let nuevoStreak = 1
    if (prev?.fecha === ayer) nuevoStreak = (prev.streakDays || 0) + 1
    else if (prev?.fecha === hoy) nuevoStreak = prev.streakDays || 1

    const newState = { fecha: hoy, completado: true, score, streakDays: nuevoStreak }
    // Badge "Daily Master" si 7 días seguidos
    if (nuevoStreak >= 7) {
      try {
        const raw = localStorage.getItem('aipath_progreso_v2')
        const p = raw ? JSON.parse(raw) : {}
        const badges = p.badges || []
        if (!badges.includes('daily_master')) {
          p.badges = [...badges, 'daily_master']
          localStorage.setItem('aipath_progreso_v2', JSON.stringify(p))
        }
      } catch {}
    }
    localStorage.setItem('aipath_daily_challenge', JSON.stringify(newState))
    setDailyState(newState)
    // Marcar sesión de hoy en progreso
    try {
      const raw = localStorage.getItem('aipath_progreso_v2')
      const p = raw ? JSON.parse(raw) : {}
      p.ultimaSesion = new Date().toDateString()
      localStorage.setItem('aipath_progreso_v2', JSON.stringify(p))
    } catch {}
    setEstudióHoy(true)
  }

  function manejarStreakSalvado() {
    try {
      const raw = localStorage.getItem('aipath_progreso_v2')
      const p = raw ? JSON.parse(raw) : {}
      p.ultimaSesion = new Date().toDateString()
      localStorage.setItem('aipath_progreso_v2', JSON.stringify(p))
    } catch {}
    setEstudióHoy(true)
  }

  function manejarStreakRoto() {
    try {
      const raw = localStorage.getItem('aipath_progreso_v2')
      const p = raw ? JSON.parse(raw) : {}
      p.rachaDiaria = 1
      p.ultimaSesion = new Date().toDateString()
      localStorage.setItem('aipath_progreso_v2', JSON.stringify(p))
    } catch {}
    setRachaActual(1)
    setEstudióHoy(true)
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

  if (juegoActivo === "completa-concepto") {
    return (
      <CompletaConceptoGame
        onSalir={() => setJuegoActivo(null)}
        onXpGanado={manejarXp}
      />
    )
  }

  if (juegoActivo === "batalla-conceptos") {
    return (
      <BatallaConceptosGame
        onSalir={() => setJuegoActivo(null)}
        onXpGanado={manejarXp}
      />
    )
  }

  if (juegoActivo === "speed-cards") {
    return (
      <SpeedCardsGame
        onSalir={() => setJuegoActivo(null)}
        onXpGanado={manejarXp}
      />
    )
  }

  if (juegoActivo === "conexion-rapida") {
    return (
      <ConexionRapidaGame
        onSalir={() => setJuegoActivo(null)}
        onXpGanado={manejarXp}
      />
    )
  }

  if (juegoActivo === "ordena-pasos") {
    return (
      <OrdenaPasosGame
        onSalir={() => setJuegoActivo(null)}
        onXpGanado={manejarXp}
      />
    )
  }

  if (juegoActivo === "daily-challenge") {
    return (
      <DailyChallengeGame
        onSalir={() => setJuegoActivo(null)}
        onXpGanado={manejarXp}
        onCompletado={manejarDailyCompletado}
      />
    )
  }

  if (juegoActivo === "streak-defender") {
    return (
      <StreakDefenderGame
        onSalir={() => setJuegoActivo(null)}
        onXpGanado={manejarXp}
        racha={rachaActual}
        onSalvado={manejarStreakSalvado}
        onRoto={manejarStreakRoto}
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
                background: "var(--color-accent-primary)",
                color: "#fff",
                fontFamily: "'Outfit', sans-serif",
                cursor: "pointer",
              }}
            >
              Jugar
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
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 22 }}>☀️</span>
            <span className="text-base font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}>
              Daily Challenge
            </span>
          </div>
          {dailyState?.streakDays > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(245,158,11,0.2)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.4)" }}
            >
              🔥 {dailyState.streakDays} días
            </span>
          )}
        </div>

        {dailyCompletadoHoy ? (
          <>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
              ✅ Completado hoy · {dailyState.score}/10 correctas
            </p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                Próximo reto en
              </p>
              <span className="text-sm font-bold" style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}>
                {formatearConteo(countdown)}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${((86400 - countdown) / 86400) * 100}%`,
                  background: "#F59E0B",
                  transition: "width 1s linear",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
              Nuevo reto cada día a medianoche · 10 preguntas
            </p>
            <button
              onClick={() => setJuegoActivo("daily-challenge")}
              className="mt-3 w-full text-sm font-semibold py-2 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{
                background: "rgba(245,158,11,0.22)",
                color: "#F59E0B",
                border: "1px solid rgba(245,158,11,0.45)",
                fontFamily: "'Outfit', sans-serif",
                cursor: "pointer",
              }}
            >
              Aceptar reto · +{XP_DAILY} XP
            </button>
          </>
        )}
      </motion.div>

      {/* Streak Defender — solo si hay racha activa */}
      {rachaActual > 0 && (
        <motion.div
          className="mt-3 rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: estudióHoy
              ? "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(249,115,22,0.03) 100%)"
              : "linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.06) 100%)",
            border: estudióHoy ? "1px solid rgba(249,115,22,0.2)" : "1px solid rgba(249,115,22,0.35)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span style={{ fontSize: 22 }}>{estudióHoy ? "✅" : "🔥"}</span>
            <span className="text-base font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#F97316" }}>
              Streak Defender
            </span>
            <span className="text-xs font-bold ml-auto" style={{ color: "#F97316" }}>
              {rachaActual} 🔥
            </span>
          </div>

          {estudióHoy ? (
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Tu racha está segura hoy. ¡Vuelve mañana!
            </p>
          ) : (
            <>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                ¡Salva tu racha de {rachaActual} días en 2 minutos!
              </p>
              <button
                onClick={() => setJuegoActivo("streak-defender")}
                className="mt-3 w-full text-sm font-semibold py-2 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{
                  background: "rgba(249,115,22,0.22)",
                  color: "#F97316",
                  border: "1px solid rgba(249,115,22,0.45)",
                  fontFamily: "'Outfit', sans-serif",
                  cursor: "pointer",
                }}
              >
                Defender racha · +{XP_STREAK} XP
              </button>
            </>
          )}
        </motion.div>
      )}

    </div>
  )
}
