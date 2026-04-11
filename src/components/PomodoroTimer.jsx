/**
 * PomodoroTimer — Sistema Pomodoro C1-C6
 * Botón circular en header + modal microjuego Verdadero/Falso
 *
 * FLUJO: 25min trabajo → microjuego 5min → x3 → descanso largo 15min
 * BADGES: "Pomodoro Perfecto" (sin pausar) · "Maratonista" (4 seguidos)
 */

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "../utils/sounds"
import { getTrueFalseQuestions, getProgressiveQuestions } from "../arcade/questionBank"

// ── Constantes de tiempo ──────────────────────────────────────────────
const DURACION_TRABAJO   = 25 * 60  // 25 minutos
const DURACION_DESCANSO  = 15 * 60  // 15 minutos largo
const DURACION_MICROJUEGO = 5 * 60  // 5 minutos (conteo visual)

// ── Claves localStorage ───────────────────────────────────────────────
const KEY_DATOS   = "pomodoro_datos"
const KEY_TIMER   = "pomodoro_timer_estado"

function cargarDatos() {
  try {
    const hoy = new Date().toDateString()
    const guardado = JSON.parse(localStorage.getItem(KEY_DATOS) || "{}")
    if (guardado.fecha !== hoy) {
      return { fecha: hoy, pomodoros_hoy: 0, pomodoro_streak: guardado.pomodoro_streak || 0, errores_historicos: guardado.errores_historicos || 0, intentos_historicos: guardado.intentos_historicos || 0 }
    }
    return { fecha: hoy, pomodoros_hoy: 0, pomodoro_streak: 0, errores_historicos: 0, intentos_historicos: 0, ...guardado }
  } catch {
    return { fecha: new Date().toDateString(), pomodoros_hoy: 0, pomodoro_streak: 0, errores_historicos: 0, intentos_historicos: 0 }
  }
}

function guardarDatos(datos) {
  localStorage.setItem(KEY_DATOS, JSON.stringify({ ...datos, fecha: new Date().toDateString() }))
}

/* Persiste estado del timer para que sobreviva navegación entre pantallas */
function cargarEstadoTimer() {
  try {
    const guardado = JSON.parse(localStorage.getItem(KEY_TIMER) || "null")
    if (!guardado || guardado.estado === "inactivo") return null
    // Calcular tiempo real transcurrido si estaba corriendo
    if (guardado.estado === "trabajo" && !guardado.pausado) {
      const transcurrido = Math.floor((Date.now() - guardado.timestamp) / 1000)
      const restante = Math.max(0, guardado.tiempoRestante - transcurrido)
      if (restante === 0) return null // ya terminó mientras no estaba montado
      return { ...guardado, tiempoRestante: restante }
    }
    return guardado
  } catch { return null }
}

function guardarEstadoTimer(estado, tiempoRestante, pausado, pomodorosEnCiclo, pausadoEnSesion) {
  localStorage.setItem(KEY_TIMER, JSON.stringify({
    estado, tiempoRestante, pausado, pomodorosEnCiclo, pausadoEnSesion,
    timestamp: Date.now(),
  }))
}

function limpiarEstadoTimer() {
  localStorage.removeItem(KEY_TIMER)
}

// ── Notificación del navegador ────────────────────────────────────────
function enviarNotificacion(titulo, cuerpo) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(titulo, { body: cuerpo, icon: "/icons/icon-192.png" })
  }
}

function pedirPermiso() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().catch(() => {})
  }
}

// ── Formato mm:ss ─────────────────────────────────────────────────────
function formatTiempo(seg) {
  const m = Math.floor(seg / 60).toString().padStart(2, "0")
  const s = (seg % 60).toString().padStart(2, "0")
  return `${m}:${s}`
}

// ═══════════════════════════════════════════════════════════════════════
// MICROJUEGO: Verdadero/Falso simplificado (5 preguntas rápidas)
// ═══════════════════════════════════════════════════════════════════════
const TIEMPO_PREGUNTA = 8

function MicrojuegoVerdaderoFalso({ onTerminar, erroresHistoricos, intentosHistoricos }) {
  // Dificultad adaptativa: si tasa de error > 40%, usar preguntas progresivas
  const tasaError = intentosHistoricos > 0 ? erroresHistoricos / intentosHistoricos : 0
  const [preguntas] = useState(() =>
    tasaError > 0.4
      ? getProgressiveQuestions(Math.round(tasaError * 10), 10)
      : getTrueFalseQuestions(10)
  )

  const [indice, setIndice]       = useState(0)
  const [tiempo, setTiempo]       = useState(TIEMPO_PREGUNTA)
  const [seleccion, setSeleccion] = useState(null)
  const [correctas, setCorrectas] = useState(0)
  const [errores, setErrores]     = useState(0)
  const [fase, setFase]           = useState("jugando") // "jugando" | "feedback" | "resultado"
  const timerRef                  = useRef(null)

  const pregunta = preguntas[indice]
  const esUltima = indice === preguntas.length - 1

  /* Timer por pregunta */
  useEffect(() => {
    if (fase !== "jugando") return
    setTiempo(TIEMPO_PREGUNTA)
    timerRef.current = setInterval(() => {
      setTiempo(t => {
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

  function procesarRespuesta(valor) {
    clearInterval(timerRef.current)
    const esCorrecto = valor === pregunta.respuesta
    setSeleccion(valor)
    if (esCorrecto) {
      setCorrectas(c => c + 1)
      playSound("correct")
    } else {
      setErrores(e => e + 1)
      playSound("incorrect")
    }
    setFase("feedback")

    setTimeout(() => {
      if (esUltima) {
        setFase("resultado")
      } else {
        setIndice(i => i + 1)
        setSeleccion(null)
        setFase("jugando")
      }
    }, 1200)
  }

  const pctTiempo = tiempo / TIEMPO_PREGUNTA
  const colorTimer = pctTiempo > 0.5 ? "#06B6D4" : pctTiempo > 0.25 ? "#F59E0B" : "#EF4444"

  /* Pantalla resultado */
  if (fase === "resultado") {
    const xp = correctas * 2 + 10
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        <div style={{ fontSize: 48 }}>
          {correctas >= 8 ? "🏆" : correctas >= 5 ? "👍" : "💪"}
        </div>
        <h3 className="text-xl font-extrabold text-center" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}>
          {correctas >= 8 ? "¡Brillante!" : correctas >= 5 ? "¡Bien hecho!" : "¡Sigue así!"}
        </h3>
        <div className="w-full rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)" }}>
          <p className="text-3xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {correctas}<span className="text-lg" style={{ color: "var(--color-text-muted)" }}>/{preguntas.length}</span>
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>respuestas correctas</p>
          <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--color-accent-primary)" }}
              initial={{ width: 0 }}
              animate={{ width: `${(correctas / preguntas.length) * 100}%` }}
              transition={{ duration: 0.7 }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)" }}>
          <span>⭐</span>
          <span className="font-bold" style={{ color: "#F59E0B" }}>+{xp} XP</span>
        </div>
        <button
          onClick={() => onTerminar(xp, errores, preguntas.length)}
          className="btn-primary w-full py-3 text-sm font-semibold"
        >
          Iniciar siguiente Pomodoro 🍅
        </button>
      </div>
    )
  }

  /* Pantalla de pregunta */
  return (
    <div className="flex flex-col gap-4">
      {/* Progreso */}
      <div className="flex items-center justify-between text-xs" style={{ color: "var(--color-text-muted)" }}>
        <span>{indice + 1}/{preguntas.length}</span>
        <span style={{ color: colorTimer, fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>
          {tiempo}s
        </span>
      </div>
      {/* Barra de tiempo */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="h-full rounded-full transition-colors"
          style={{ width: `${(tiempo / TIEMPO_PREGUNTA) * 100}%`, background: colorTimer }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Pregunta */}
      <p className="text-sm font-semibold text-center leading-snug min-h-[48px]" style={{ color: "var(--color-text-primary)" }}>
        {pregunta?.pregunta}
      </p>

      {/* Botones V/F */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        {[
          { label: "Verdadero", valor: true, emoji: "✅" },
          { label: "Falso",     valor: false, emoji: "❌" },
        ].map(({ label, valor, emoji }) => {
          const esElegida = seleccion === valor
          const esCorrecta = fase === "feedback" && valor === pregunta?.respuesta
          const esIncorrecta = fase === "feedback" && esElegida && !esCorrecta
          return (
            <motion.button
              key={label}
              onClick={() => fase === "jugando" && procesarRespuesta(valor)}
              disabled={fase !== "jugando"}
              whileTap={{ scale: 0.95 }}
              className="py-3 rounded-xl font-bold text-sm transition-all"
              style={{
                background: esCorrecta
                  ? "rgba(16,185,129,0.25)"
                  : esIncorrecta
                  ? "rgba(239,68,68,0.25)"
                  : esElegida
                  ? "rgba(6,182,212,0.15)"
                  : "rgba(255,255,255,0.05)",
                border: esCorrecta
                  ? "1px solid #10B981"
                  : esIncorrecta
                  ? "1px solid #EF4444"
                  : "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                cursor: fase !== "jugando" ? "not-allowed" : "pointer",
              }}
            >
              {emoji} {label}
            </motion.button>
          )
        })}
      </div>

      {/* Explicación en feedback */}
      {fase === "feedback" && pregunta?.explicacion && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-center leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {pregunta.explicacion.slice(0, 100)}{pregunta.explicacion.length > 100 ? "…" : ""}
        </motion.p>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// MODAL MICROJUEGO
// ═══════════════════════════════════════════════════════════════════════
function ModalMicrojuego({ pomodoroNum, onTerminar, erroresHistoricos, intentosHistoricos }) {
  const [tiempoDescanso, setTiempoDescanso] = useState(DURACION_MICROJUEGO)
  const timerRef = useRef(null)

  /* Cuenta regresiva de 5 min (referencia visual) */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTiempoDescanso(t => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4"
      style={{ background: "rgba(0,0,0,0.88)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="surface rounded-2xl p-6 w-full max-w-sm"
        style={{ border: "1px solid rgba(6,182,212,0.4)", boxShadow: "0 0 40px rgba(6,182,212,0.15)" }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍅</span>
            <div>
              <p className="font-bold text-sm" style={{ color: "#06B6D4" }}>
                ¡Pomodoro {pomodoroNum} completado!
              </p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Juega 5 minutos · {formatTiempo(tiempoDescanso)} restantes
              </p>
            </div>
          </div>
        </div>

        <div className="my-3 h-px" style={{ background: "var(--color-border)" }} />

        {/* Juego */}
        <MicrojuegoVerdaderoFalso
          onTerminar={onTerminar}
          erroresHistoricos={erroresHistoricos}
          intentosHistoricos={intentosHistoricos}
        />
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// MODAL DESCANSO LARGO
// ═══════════════════════════════════════════════════════════════════════
function ModalDescansoLargo({ onTerminar }) {
  const [tiempo, setTiempo] = useState(DURACION_DESCANSO)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTiempo(t => {
        if (t <= 1) { clearInterval(timerRef.current); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4"
      style={{ background: "rgba(0,0,0,0.88)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="surface rounded-2xl p-8 w-full max-w-sm text-center"
        style={{ border: "1px solid rgba(245,158,11,0.4)", boxShadow: "0 0 40px rgba(245,158,11,0.12)" }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          className="text-6xl mb-3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ☕
        </motion.div>
        <h3 className="text-xl font-extrabold mb-1" style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}>
          ¡Descanso largo!
        </h3>
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
          Completaste 4 Pomodoros. Mereces 15 minutos.
        </p>
        <div className="text-4xl font-extrabold mb-6" style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B", fontVariantNumeric: "tabular-nums" }}>
          {formatTiempo(tiempo)}
        </div>
        <button onClick={onTerminar} className="btn-primary w-full py-3 text-sm font-semibold" style={{ background: "linear-gradient(135deg, #F59E0B, #F97316)" }}>
          Volver al trabajo 🍅
        </button>
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL: PomodoroTimer
// ═══════════════════════════════════════════════════════════════════════
export default function PomodoroTimer({ onXpGanado, onBadgeDesbloqueado }) {
  const [datos, setDatos] = useState(() => cargarDatos())

  // Restaurar estado persistido si existe
  const estadoInicial = cargarEstadoTimer()

  const [estado, setEstado]                     = useState(estadoInicial?.estado || "inactivo")
  const [tiempoRestante, setTiempoRestante]     = useState(estadoInicial?.tiempoRestante ?? DURACION_TRABAJO)
  const [pausado, setPausado]                   = useState(estadoInicial?.pausado ?? false)
  const [pomodorosEnCiclo, setPomodorosEnCiclo] = useState(estadoInicial?.pomodorosEnCiclo ?? 0)
  const [pausadoEnSesion, setPausadoEnSesion]   = useState(estadoInicial?.pausadoEnSesion ?? false)

  const timerRef  = useRef(null)
  const pausaRef  = useRef(estadoInicial?.pausado ?? false)
  // Refs para acceder a valores actuales en callbacks del timer
  const estadoRef           = useRef(estadoInicial?.estado || "inactivo")
  const pomodorosRef        = useRef(estadoInicial?.pomodorosEnCiclo ?? 0)
  const pausadoEnSesionRef  = useRef(estadoInicial?.pausadoEnSesion ?? false)

  // ── Sincronizar refs con estado ────────────────────────────────────
  useEffect(() => { pausaRef.current = pausado }, [pausado])
  useEffect(() => { estadoRef.current = estado }, [estado])
  useEffect(() => { pomodorosRef.current = pomodorosEnCiclo }, [pomodorosEnCiclo])
  useEffect(() => { pausadoEnSesionRef.current = pausadoEnSesion }, [pausadoEnSesion])

  // ── Persistir estado cada vez que cambia ──────────────────────────
  useEffect(() => {
    guardarEstadoTimer(estado, tiempoRestante, pausado, pomodorosEnCiclo, pausadoEnSesion)
  }, [estado, tiempoRestante, pausado, pomodorosEnCiclo, pausadoEnSesion])

  // ── Pedir permiso de notificaciones al montar ──────────────────────
  useEffect(() => { pedirPermiso() }, [])

  // ── Reanudar timer si venía corriendo (navegación entre pantallas) ─
  useEffect(() => {
    if (estadoInicial?.estado === "trabajo" && !estadoInicial?.pausado) {
      iniciarTimer(estadoInicial.tiempoRestante, alTerminarTrabajo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Timer principal ────────────────────────────────────────────────
  const iniciarTimer = useCallback((duracion, onFin) => {
    clearInterval(timerRef.current)
    setTiempoRestante(duracion)
    timerRef.current = setInterval(() => {
      if (pausaRef.current) return
      setTiempoRestante(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          onFin()
          return 0
        }
        return t - 1
      })
    }, 1000)
  }, [])

  // ── Cleanup al desmontar ───────────────────────────────────────────
  useEffect(() => () => clearInterval(timerRef.current), [])

  // ── Al terminar un Pomodoro de trabajo ────────────────────────────
  function alTerminarTrabajo() {
    clearInterval(timerRef.current)
    playSound("complete")
    enviarNotificacion("🍅 ¡Pomodoro completado!", "Juega 5 minutos para descansar.")

    // Usar refs para evitar stale closures
    const nuevosPomodoros = pomodorosRef.current + 1
    setPomodorosEnCiclo(nuevosPomodoros)
    pomodorosRef.current = nuevosPomodoros

    // Actualizar datos localStorage
    setDatos(prev => {
      const nuevoDatos = { ...prev, pomodoros_hoy: prev.pomodoros_hoy + 1 }
      guardarDatos(nuevoDatos)
      return nuevoDatos
    })

    // Badge "Pomodoro Perfecto" (no pausó en esta sesión)
    if (!pausadoEnSesionRef.current) {
      playSound("levelup")
      onBadgeDesbloqueado?.("Pomodoro Perfecto")
    }

    if (nuevosPomodoros >= 4) {
      setEstado("descanso_largo")
      estadoRef.current = "descanso_largo"
      playSound("levelup")
      onBadgeDesbloqueado?.("Maratonista")
    } else {
      setEstado("microjuego")
      estadoRef.current = "microjuego"
    }
  }

  // ── Al terminar el microjuego ──────────────────────────────────────
  function alTerminarMicrojuego(xp, erroresNuevos, intentosNuevos) {
    setDatos(prev => {
      const nuevoDatos = {
        ...prev,
        errores_historicos: (prev.errores_historicos || 0) + erroresNuevos,
        intentos_historicos: (prev.intentos_historicos || 0) + intentosNuevos,
      }
      guardarDatos(nuevoDatos)
      return nuevoDatos
    })
    onXpGanado?.(xp)
    setPausadoEnSesion(false)
    pausadoEnSesionRef.current = false
    setPausado(false)
    pausaRef.current = false
    setEstado("trabajo")
    estadoRef.current = "trabajo"
    iniciarTimer(DURACION_TRABAJO, alTerminarTrabajo)
  }

  // ── Al terminar el descanso largo ─────────────────────────────────
  function alTerminarDescansoLargo() {
    setPomodorosEnCiclo(0)
    pomodorosRef.current = 0
    setDatos(prev => {
      const nuevoDatos = { ...prev, pomodoro_streak: (prev.pomodoro_streak || 0) + 1 }
      guardarDatos(nuevoDatos)
      return nuevoDatos
    })
    setEstado("inactivo")
    estadoRef.current = "inactivo"
    setTiempoRestante(DURACION_TRABAJO)
    setPausado(false)
    limpiarEstadoTimer()
  }

  // ── Iniciar primer Pomodoro ────────────────────────────────────────
  function iniciarPomodoro() {
    if (estadoRef.current !== "inactivo") return
    setPomodorosEnCiclo(0)
    pomodorosRef.current = 0
    setPausadoEnSesion(false)
    pausadoEnSesionRef.current = false
    setPausado(false)
    pausaRef.current = false
    setEstado("trabajo")
    estadoRef.current = "trabajo"
    iniciarTimer(DURACION_TRABAJO, alTerminarTrabajo)
  }

  // ── Pausar / reanudar ─────────────────────────────────────────────
  function togglePausa() {
    if (estadoRef.current !== "trabajo") return
    if (!pausaRef.current) {
      setPausado(true)
      setPausadoEnSesion(true)
      pausadoEnSesionRef.current = true
    } else {
      setPausado(false)
    }
  }

  // ── Click en el botón ─────────────────────────────────────────────
  function handleClick() {
    playSound("click")
    if (estadoRef.current === "inactivo") {
      iniciarPomodoro()
    } else if (estadoRef.current === "trabajo") {
      togglePausa()
    }
  }

  // ── Color y texto del botón ───────────────────────────────────────
  const colorBoton =
    estado === "trabajo" && !pausado ? "#06B6D4"   // activo cyan
    : estado === "descanso_largo"    ? "#F59E0B"   // descanso amber
    : estado === "microjuego"        ? "#10B981"   // microjuego verde
    : "rgba(255,255,255,0.15)"                     // inactivo gris

  const textoBoton =
    estado === "inactivo"    ? "25:00"
    : estado === "microjuego" ? "🎮"
    : estado === "descanso_largo" ? "☕"
    : formatTiempo(tiempoRestante)

  const pct = estado === "trabajo" ? (tiempoRestante / DURACION_TRABAJO) : 1
  const radio = 16
  const circunferencia = 2 * Math.PI * radio

  return (
    <>
      {/* ── Botón circular ── */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        title={
          estado === "inactivo" ? "Iniciar Pomodoro 25min"
          : estado === "trabajo" ? (pausado ? "Reanudar" : "Pausar")
          : "Pomodoro activo"
        }
        className="relative flex items-center justify-center shrink-0"
        style={{
          width: 40, height: 40,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          border: "none",
          cursor: estado === "microjuego" || estado === "descanso_largo" ? "default" : "pointer",
        }}
      >
        {/* Anillo de progreso SVG */}
        <svg
          width="40"
          height="40"
          style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
        >
          {/* Fondo */}
          <circle cx="20" cy="20" r={radio} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          {/* Progreso */}
          {estado === "trabajo" && (
            <circle
              cx="20" cy="20" r={radio}
              fill="none"
              stroke={pausado ? "#6B7280" : colorBoton}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circunferencia}
              strokeDashoffset={circunferencia * (1 - pct)}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          )}
        </svg>

        {/* Texto central */}
        <span
          className="relative z-10 font-bold leading-none"
          style={{
            fontSize: estado === "inactivo" ? 8 : estado === "microjuego" || estado === "descanso_largo" ? 16 : 7,
            color: estado === "inactivo" ? "rgba(255,255,255,0.4)" : colorBoton,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.3px",
          }}
        >
          {textoBoton}
        </span>

        {/* Indicador de pausa */}
        {pausado && estado === "trabajo" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span style={{ fontSize: 10, color: "#6B7280" }}>⏸</span>
          </motion.div>
        )}
      </motion.button>

      {/* ── Modales ── */}
      <AnimatePresence>
        {estado === "microjuego" && (
          <ModalMicrojuego
            key="microjuego"
            pomodoroNum={pomodorosEnCiclo}
            onTerminar={alTerminarMicrojuego}
            erroresHistoricos={datos.errores_historicos || 0}
            intentosHistoricos={datos.intentos_historicos || 0}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {estado === "descanso_largo" && (
          <ModalDescansoLargo
            key="descanso"
            onTerminar={alTerminarDescansoLargo}
          />
        )}
      </AnimatePresence>
    </>
  )
}
