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

/* ─── Flashcards del juego 6 ─── */
const FLASHCARDS_SPEED = [
  { termino: "LLM",         definicion: "Modelo de lenguaje entrenado con grandes volúmenes de texto para generar texto" },
  { termino: "Prompt",      definicion: "Instrucción o contexto que guía la respuesta de un modelo de IA" },
  { termino: "Fine-tuning", definicion: "Reentrenar un modelo base con datos específicos de un dominio" },
  { termino: "RAG",         definicion: "Combinar búsqueda de documentos con generación de texto del LLM" },
  { termino: "Token",       definicion: "Unidad mínima de texto que procesa un modelo de lenguaje" },
  { termino: "Temperature", definicion: "Parámetro que controla la creatividad/aleatoriedad del output" },
  { termino: "Zero-shot",   definicion: "Pedir al modelo una tarea sin dar ejemplos previos" },
  { termino: "EU AI Act",   definicion: "Regulación europea que clasifica sistemas de IA por nivel de riesgo" },
]

const XP_POR_SABIA   = 2
const XP_BONUS_SPEED = 15
const TIEMPO_TOTAL_SPEED = 180 // 3 minutos

/* ─── Componente del juego Speed Cards ─── */
function SpeedCardsGame({ onSalir, onXpGanado }) {
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
    if (indice === FLASHCARDS_SPEED.length - 1) {
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

  const card       = FLASHCARDS_SPEED[Math.min(indice, FLASHCARDS_SPEED.length - 1)]
  const sabiasCount = resultados.filter(Boolean).length
  const mins = Math.floor(tiempo / 60)
  const secs = tiempo % 60
  const tiempoStr  = `${mins}:${String(secs).padStart(2, "0")}`
  const colorTiempo = tiempo > 60 ? "#00D4AA" : tiempo > 30 ? "#F59E0B" : "#EF4444"

  /* ── Pantalla de resultado ── */
  if (fase === "resultado") {
    const xpTotal  = sabiasCount * XP_POR_SABIA + XP_BONUS_SPEED
    const perfecta = sabiasCount === FLASHCARDS_SPEED.length

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
            {sabiasCount === FLASHCARDS_SPEED.length ? "🏆" : sabiasCount >= 5 ? "👍" : "💪"}
          </div>

          <h2
            className="text-2xl font-extrabold text-center"
            style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
          >
            {sabiasCount === FLASHCARDS_SPEED.length
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
          animate={{ width: `${(indice / FLASHCARDS_SPEED.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Contador y pista */}
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          Card {indice + 1} de {FLASHCARDS_SPEED.length}
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

/* ─── Datos del juego 5 — Batalla de Conceptos ─── */
const PARES_BATALLA = [
  { concepto: "Overfitting",      opciones: ["Modelo memoriza datos de entrenamiento",         "Modelo generaliza bien a datos nuevos"],      correcta: 0 },
  { concepto: "Zero-shot",        opciones: ["El modelo necesita 100 ejemplos",                 "El modelo resuelve sin ejemplos previos"],     correcta: 1 },
  { concepto: "Embedding",        opciones: ["Representación numérica de texto",                "Técnica para comprimir imágenes"],             correcta: 0 },
  { concepto: "RLHF",             opciones: ["Entrenar con feedback humano",                    "Red neuronal de alta frecuencia"],             correcta: 0 },
  { concepto: "Hallucination",    opciones: ["El modelo genera info falsa con confianza",       "El modelo rechaza responder preguntas"],       correcta: 0 },
  { concepto: "Context window",   opciones: ["Interfaz gráfica del modelo",                    "Texto máximo que procesa el modelo"],          correcta: 1 },
  { concepto: "Chain of thought", opciones: ["Cadena de modelos en serie",                     "Prompts que piden razonamiento paso a paso"],  correcta: 1 },
  { concepto: "Transformer",      opciones: ["Arquitectura base de LLMs modernos",              "Técnica de compresión de datos"],              correcta: 0 },
]

const TIEMPO_BATALLA    = 6
const XP_POR_BATALLA    = 2
const XP_BONUS_BATALLA  = 20

/* ─── Componente del juego Batalla de Conceptos ─── */
function BatallaConceptosGame({ onSalir, onXpGanado }) {
  const [indice,    setIndice]    = useState(0)
  const [tiempo,    setTiempo]    = useState(TIEMPO_BATALLA)
  const [seleccion, setSeleccion] = useState(null)   // índice elegido | null
  const [correctas, setCorrectas] = useState(0)
  const [fase,      setFase]      = useState("jugando") // "jugando" | "feedback" | "vs" | "resultado"
  const [resultados, setResultados] = useState([])
  const timerRef = useRef(null)

  const par    = PARES_BATALLA[indice]
  const esUltima = indice === PARES_BATALLA.length - 1

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
            Ronda {indice + 2} de {PARES_BATALLA.length}
          </p>
        </motion.div>
      </div>
    )
  }

  /* ── Pantalla de resultado final ── */
  if (fase === "resultado") {
    const total    = resultados.filter(Boolean).length
    const pct      = (total / PARES_BATALLA.length) * 100
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
              {total}<span className="text-2xl" style={{ color: "var(--color-text-secondary)" }}>/{PARES_BATALLA.length}</span>
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
          {indice + 1}/{PARES_BATALLA.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-accent-primary)" }}
          animate={{ width: `${(indice / PARES_BATALLA.length) * 100}%` }}
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
const FRASES_CONCEPTO = [
  {
    partes: ["El ", "___", " es la unidad mínima de texto que procesa un LLM"],
    correcta: "token",
    opciones: ["token", "párrafo", "byte", "carácter"],
  },
  {
    partes: ["Un prompt de ", "___", " incluye ejemplos antes de la pregunta"],
    correcta: "few-shot",
    opciones: ["few-shot", "zero-shot", "fine-tuning", "RAG"],
  },
  {
    partes: ["El EU AI Act clasifica los sistemas de IA por nivel de ", "___"],
    correcta: "riesgo",
    opciones: ["riesgo", "coste", "velocidad", "precisión"],
  },
  {
    partes: ["El ", "___", " permite al modelo acceder a información externa actualizada"],
    correcta: "RAG",
    opciones: ["RAG", "RLHF", "fine-tuning", "embedding"],
  },
  {
    partes: ["La ", "___", " controla qué tan creativo o predecible es el output del modelo"],
    correcta: "temperature",
    opciones: ["temperature", "topP", "frecuencia", "longitud"],
  },
  {
    partes: ["Claude fue creado por ", "___"],
    correcta: "Anthropic",
    opciones: ["Anthropic", "OpenAI", "Google", "Meta"],
  },
  {
    partes: ["El ", "___", " es cuando el modelo aprende de feedback humano sobre sus respuestas"],
    correcta: "RLHF",
    opciones: ["RLHF", "RAG", "fine-tuning", "prompting"],
  },
  {
    partes: ["Un modelo ", "___", " puede procesar texto e imágenes simultáneamente"],
    correcta: "multimodal",
    opciones: ["multimodal", "generativo", "supervisado", "base"],
  },
]

const TIEMPO_CONCEPTO   = 10
const XP_POR_CONCEPTO   = 2
const XP_BONUS_CONCEPTO = 20

/* ─── Componente del juego Completa el Concepto ─── */
function CompletaConceptoGame({ onSalir, onXpGanado }) {
  const [indice,    setIndice]    = useState(0)
  const [tiempo,    setTiempo]    = useState(TIEMPO_CONCEPTO)
  const [seleccion, setSeleccion] = useState(null) // string | null
  const [correctas, setCorrectas] = useState(0)
  const [fase,      setFase]      = useState("jugando") // "jugando" | "feedback" | "resultado"
  const [resultados, setResultados] = useState([])
  const timerRef = useRef(null)

  const frase   = FRASES_CONCEPTO[indice]
  const esUltima = indice === FRASES_CONCEPTO.length - 1

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
    const pct     = (total / FRASES_CONCEPTO.length) * 100
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
              {total}<span className="text-2xl" style={{ color: "var(--color-text-secondary)" }}>/{FRASES_CONCEPTO.length}</span>
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
          {indice + 1}/{FRASES_CONCEPTO.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-accent-primary)" }}
          animate={{ width: `${(indice / FRASES_CONCEPTO.length) * 100}%` }}
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
    if (indice === 2) setJuegoActivo("completa-concepto")
    if (indice === 4) setJuegoActivo("batalla-conceptos")
    if (indice === 5) setJuegoActivo("speed-cards")
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
                background: (i === 0 || i === 2 || i === 4 || i === 5) ? "var(--color-accent-primary)" : "var(--color-border)",
                color: (i === 0 || i === 2 || i === 4 || i === 5) ? "#fff" : "var(--color-text-secondary)",
                fontFamily: "'Outfit', sans-serif",
                cursor: (i === 0 || i === 2 || i === 4 || i === 5) ? "pointer" : "not-allowed",
                opacity: (i === 0 || i === 2 || i === 4 || i === 5) ? 1 : 0.5,
              }}
            >
              {(i === 0 || i === 2 || i === 4 || i === 5) ? "Jugar" : "Pronto"}
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
