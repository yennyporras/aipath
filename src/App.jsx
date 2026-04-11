import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./components/Header"
import AIPathLogo from "./components/AIPathLogo"
import XPBar from "./components/XPBar"
import QuizCard from "./components/QuizCard"
import AcademyScreen from "./components/AcademyScreen"
import IntroScreen from "./components/IntroScreen"
import BlockLessons from "./components/BlockLessons"
import ResultsScreen from "./components/ResultsScreen"
import TeoriaScreen from "./components/TeoriaScreen"
import PracticaScreen from "./components/PracticaScreen"
import LoginScreen from "./components/LoginScreen"
import ProyectoScreen from "./components/ProyectoScreen"
import CertificacionScreen from "./components/CertificacionScreen"
import InstallBanner from "./components/InstallBanner"
import { usePWAInstall } from "./hooks/usePWAInstall"

// Módulos con contenido disponible — import estático (Vite los bundlea)
import m4Data from "./content/m4-completo.json"
import m1Data from "./content/m1/index.json"

const MODULO_DATA = { m4: m4Data, m1: m1Data }

const STORAGE_KEY = "aipath_progreso_v2"
const SESSION_KEY = "aipath_session"
const INSTALL_DISMISSED_KEY = "aipath_install_dismissed"

function cargarProgreso() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (!guardado) return {
      xpTotal: 0, rachaDiaria: 1, badges: [],
      leccionesCompletadas: [], ultimaSesion: null,
      fasesProyecto: [], certificacionAprobada: false
    }
    return { fasesProyecto: [], certificacionAprobada: false, ...JSON.parse(guardado) }
  } catch {
    return {
      xpTotal: 0, rachaDiaria: 1, badges: [],
      leccionesCompletadas: [], ultimaSesion: null,
      fasesProyecto: [], certificacionAprobada: false
    }
  }
}

function guardarProgreso(datos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
}

function calcularRachaDiaria(progreso) {
  if (!progreso.ultimaSesion) return { rachaDiaria: 1, rachaRota: false }
  const hoy = new Date().toDateString()
  if (progreso.ultimaSesion === hoy) return { rachaDiaria: progreso.rachaDiaria, rachaRota: false }
  const ayer = new Date()
  ayer.setDate(ayer.getDate() - 1)
  if (progreso.ultimaSesion === ayer.toDateString()) return { rachaDiaria: progreso.rachaDiaria + 1, rachaRota: false }
  return { rachaDiaria: 1, rachaRota: progreso.rachaDiaria > 1 }
}

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
}

// ── Cursor personalizado (solo desktop con hover) ────────────────────
function CustomCursor() {
  const cursorRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px"
        cursorRef.current.style.top  = e.clientY + "px"
      }
    }
    const over = (e) => {
      const el = e.target
      const interactive = el.closest("button, a, input, [role='button'], label")
      setHovering(!!interactive)
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovering ? "hovering" : ""}`}
    />
  )
}

// ── Overlay milestone XP (cada 500 XP) ──────────────────────────────
function XPMilestoneOverlay({ xp, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="surface rounded-2xl px-10 py-8 flex flex-col items-center gap-3"
        style={{ border: "1px solid rgba(6,182,212,0.5)", boxShadow: "0 0 60px rgba(6,182,212,0.25)" }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="text-5xl"
          animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🎯
        </motion.div>
        <p className="font-display text-2xl font-extrabold text-gradient"
          style={{ fontFamily: "'Outfit', sans-serif" }}>
          ¡{xp.toLocaleString()} XP!
        </p>
        <p className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--color-text-muted)" }}>
          Milestone alcanzado
        </p>
      </motion.div>
    </motion.div>
  )
}

// ── Sidebar desktop ──────────────────────────────────────────────────
function Sidebar({ progreso, moduloData, bloqueActual, leccionActual, onNavBloque, onVolverAcademy }) {
  const session = getSession()
  const completadas = progreso.leccionesCompletadas || []
  const nivel = Math.floor((progreso.xpTotal || 0) / 300) + 1
  const bloques = moduloData?.bloques || []
  const totalLecciones = bloques.reduce((s, b) => s + b.lecciones.length, 0)
  const totalDone = completadas.filter(id => bloques.some(b => b.lecciones.some(l => l.id === id))).length

  return (
    <aside
      className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 h-screen sticky top-0 overflow-y-auto py-6 px-4"
      style={{ borderRight: "1px solid var(--color-border)" }}
    >
      {/* Logo AIPath — vuelve a academy */}
      <button onClick={onVolverAcademy} className="mb-8 text-left">
        <div className="aipath-logo">
          <span className="logo-text">AI</span>
          <span className="logo-accent">Path</span>
        </div>
      </button>

      {/* Usuario */}
      <div className="glass rounded-xl p-3 mb-6 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: "var(--color-accent-primary)", color: "#ffffff" }}
        >
          {session?.nombre?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {session?.nombre || session?.email?.split("@")[0] || "Usuario"}
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Nivel {nivel}</p>
        </div>
      </div>

      {/* Progreso del módulo activo */}
      {moduloData && (
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: "var(--color-text-muted)" }}>{moduloData.title || moduloData.titulo}</span>
            <span style={{ color: "var(--color-accent-blue)" }}>{totalDone}/{totalLecciones}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${totalLecciones > 0 ? (totalDone / totalLecciones) * 100 : 0}%` }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: "var(--color-text-muted)" }}>
            {progreso.xpTotal || 0} XP total · Racha {progreso.rachaDiaria} día{progreso.rachaDiaria !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Nav de bloques */}
      {moduloData && (
        <nav className="flex-1 space-y-1">
          <button
            onClick={onVolverAcademy}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs mb-2 transition-all"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            ← Todos los módulos
          </button>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-2 px-3"
            style={{ color: "var(--color-text-muted)" }}>
            Bloques
          </p>
          {bloques.map(bloque => {
            const done = bloque.lecciones.filter(l => completadas.includes(l.id)).length
            const complete = done === bloque.lecciones.length && bloque.lecciones.length > 0
            const activo = bloqueActual?.id === bloque.id ||
              (leccionActual && bloque.lecciones.some(l => l.id === leccionActual.id))

            return (
              <button
                key={bloque.id}
                onClick={() => onNavBloque(bloque)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs"
                style={{
                  background: activo ? "rgba(6,182,212,0.1)" : "transparent",
                  color: activo ? "var(--color-accent-primary)" : complete ? "var(--color-text-secondary)" : "var(--color-text-muted)",
                  borderLeft: activo ? "2px solid var(--color-accent-primary)" : "2px solid transparent"
                }}
              >
                <span className="shrink-0">{complete ? "✓" : bloque.icon}</span>
                <span className="truncate">{bloque.nombre}</span>
                <span className="ml-auto shrink-0" style={{ color: "var(--color-text-muted)" }}>
                  {done}/{bloque.lecciones.length}
                </span>
              </button>
            )
          })}
        </nav>
      )}
    </aside>
  )
}

// ── App ──────────────────────────────────────────────────────────────
export default function App() {
  // Pantallas: login | academy | intro | lessons | teoria | quiz | practica | results | proyecto | certificacion
  const [pantalla, setPantalla] = useState(() => getSession() ? "academy" : "login")
  const [moduloActivo, setModuloActivo] = useState(null)   // objeto del academy-index
  const [moduloData, setModuloData] = useState(null)       // JSON del módulo cargado
  const [bloqueActual, setBloqueActual] = useState(null)
  const [leccionActual, setLeccionActual] = useState(null)

  const [preguntaActual, setPreguntaActual] = useState(0)
  const [preguntasQuiz, setPreguntasQuiz] = useState([])
  const [xpSesion, setXpSesion] = useState(0)
  const [respondidas, setRespondidas] = useState(0)
  const [correctas, setCorrectas] = useState(0)
  const [rachaActual, setRachaActual] = useState(0)

  const [progreso, setProgreso] = useState(() => cargarProgreso())
  const [rachaRota, setRachaRota] = useState(false)
  const [xpMilestone, setXpMilestone] = useState(null)
  const prevXpRef = useRef((cargarProgreso().xpTotal || 0))
  const [installDismissed, setInstallDismissed] = useState(
    () => localStorage.getItem(INSTALL_DISMISSED_KEY) === "1"
  )

  const { isInstallable, isInstalled, promptInstall } = usePWAInstall()
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024
  const mostrarBanner = isInstallable && !isInstalled && !installDismissed && pantalla !== "login"

  useEffect(() => {
    const { rachaDiaria, rachaRota: rota } = calcularRachaDiaria(progreso)
    if (rachaDiaria !== progreso.rachaDiaria) {
      setProgreso(prev => ({ ...prev, rachaDiaria }))
    }
    setRachaRota(rota)
  }, [])

  // Detectar milestone de XP cada 500
  useEffect(() => {
    const currentXP = progreso.xpTotal || 0
    const prev = prevXpRef.current
    const prevMilestone = Math.floor(prev / 500)
    const currMilestone = Math.floor(currentXP / 500)
    if (currMilestone > prevMilestone && currentXP > 0) {
      setXpMilestone(currMilestone * 500)
    }
    prevXpRef.current = currentXP
  }, [progreso.xpTotal])

  function handleDismissInstall() {
    setInstallDismissed(true)
    localStorage.setItem(INSTALL_DISMISSED_KEY, "1")
  }

  function shuffleArray(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function handleLogin() { setPantalla("academy") }

  // Seleccionar módulo desde AcademyScreen
  function handleSelectModulo(mod) {
    const data = MODULO_DATA[mod.id]
    if (!data) return
    setModuloActivo(mod)
    setModuloData(data)
    setBloqueActual(null)
    setLeccionActual(null)
    setPantalla("intro")
  }

  function handleVolverAcademy() {
    setPantalla("academy")
    setModuloActivo(null)
    setModuloData(null)
    setBloqueActual(null)
    setLeccionActual(null)
  }

  function handleSelectBlock(bloque) {
    if (bloque.id === "proyecto_final") { setPantalla("proyecto"); setBloqueActual(null); return }
    if (bloque.id === "certificacion_final") { setPantalla("certificacion"); setBloqueActual(null); return }
    setBloqueActual(bloque)
    setPantalla("lessons")
  }

  function handleVolverBloques() {
    setPantalla("intro")
    setBloqueActual(null)
  }

  function handleSelectLesson(leccion) {
    setLeccionActual(leccion)
    setPantalla("teoria")
    setPreguntaActual(0)
    setXpSesion(0)
    setRespondidas(0)
    setCorrectas(0)
    setRachaActual(0)
    setRachaRota(false)
  }

  function handleTeoriaOk() {
    const tieneQuiz = leccionActual?.contenido?.verificacion?.length > 0
    if (!tieneQuiz) {
      setPantalla(leccionActual?.contenido?.practica?.contexto ? "practica" : "results")
    } else {
      setPreguntasQuiz(shuffleArray(leccionActual.contenido.verificacion))
      setPantalla("quiz")
    }
  }

  function handleResponder(esCorrecto) {
    if (esCorrecto) {
      setXpSesion(prev => prev + 30)
      setCorrectas(prev => prev + 1)
      setRachaActual(prev => prev + 1)
    } else {
      setRachaActual(0)
    }
    setRespondidas(prev => prev + 1)
  }

  function handleSiguiente() {
    const preguntas = leccionActual.contenido.verificacion
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1)
    } else {
      const nuevoProgreso = { ...progreso }
      nuevoProgreso.xpTotal = (nuevoProgreso.xpTotal || 0) + xpSesion
      nuevoProgreso.ultimaSesion = new Date().toDateString()
      const minAprobacion = Math.ceil(preguntas.length * 0.7)
      if (correctas >= minAprobacion) {
        if (!nuevoProgreso.leccionesCompletadas.includes(leccionActual.id)) {
          nuevoProgreso.leccionesCompletadas = [...nuevoProgreso.leccionesCompletadas, leccionActual.id]
        }
        if (!nuevoProgreso.badges.includes(leccionActual.id)) {
          nuevoProgreso.badges = [...nuevoProgreso.badges, leccionActual.id]
        }
      }
      guardarProgreso(nuevoProgreso)
      setProgreso(nuevoProgreso)
      if (leccionActual.contenido.practica) {
        setPantalla("practica")
      } else {
        setPantalla("results")
      }
    }
  }

  function handlePracticaDone() { setPantalla("results") }

  function handleReintentar() {
    setPreguntaActual(0); setXpSesion(0); setRespondidas(0); setCorrectas(0); setRachaActual(0)
    setPreguntasQuiz(shuffleArray(leccionActual.contenido.verificacion))
    setPantalla("quiz")
  }

  function handleVolver() {
    if (!moduloData) { setPantalla("academy"); return }
    const todas = moduloData.bloques.flatMap(b => b.lecciones)
    const preguntas = leccionActual.contenido.verificacion
    const minAprobacion = Math.ceil(preguntas.length * 0.7)
    if (correctas >= minAprobacion) {
      const idx = todas.findIndex(l => l.id === leccionActual.id)
      if (idx < todas.length - 1) { handleSelectLesson(todas[idx + 1]); return }
    }
    if (bloqueActual) { setPantalla("lessons"); setLeccionActual(null) }
    else { setPantalla("intro"); setLeccionActual(null) }
  }

  function handleFaseProyectoCompleta(fase) {
    const nuevoProgreso = { ...progreso }
    if (!nuevoProgreso.fasesProyecto.includes(fase.id)) {
      nuevoProgreso.fasesProyecto = [...nuevoProgreso.fasesProyecto, fase.id]
      nuevoProgreso.xpTotal = (nuevoProgreso.xpTotal || 0) + fase.xp
    }
    guardarProgreso(nuevoProgreso)
    setProgreso(nuevoProgreso)
  }

  function handleCertAprobada() {
    const nuevoProgreso = { ...progreso }
    if (!nuevoProgreso.certificacionAprobada) {
      nuevoProgreso.certificacionAprobada = true
      nuevoProgreso.xpTotal = (nuevoProgreso.xpTotal || 0) + (m4Data.certificacion_final?.xp_aprobacion || 1000)
    }
    guardarProgreso(nuevoProgreso)
    setProgreso(nuevoProgreso)
  }

  const preguntas = preguntasQuiz.length > 0 ? preguntasQuiz : (leccionActual?.contenido?.verificacion || [])
  const todas = moduloData ? moduloData.bloques.flatMap(b => b.lecciones) : []
  const hayNextLesson = leccionActual && todas.length > 0
    ? todas.findIndex(l => l.id === leccionActual.id) < todas.length - 1
    : false

  const installButton = isInstallable && !isInstalled && !installDismissed
    ? <InstallBanner onInstall={promptInstall} onDismiss={handleDismissInstall} isMobile={false} />
    : null

  // ── LOGIN ──
  if (pantalla === "login") return (
    <>
      <CustomCursor />
      <LoginScreen onLogin={handleLogin} />
    </>
  )

  // ── ACADEMY (home) — sin sidebar ──
  if (pantalla === "academy") {
    return (
      <div className="min-h-dvh text-white flex flex-col items-center p-5 pb-16">
        <CustomCursor />
        <AnimatePresence>
          {xpMilestone && (
            <XPMilestoneOverlay xp={xpMilestone} onDone={() => setXpMilestone(null)} />
          )}
        </AnimatePresence>
        {/* Header simplificado en academy */}
        <div className="w-full max-w-4xl flex justify-between items-center mb-8 animate-reveal">
          <AIPathLogo size="sm" />
          <div className="flex items-center gap-3">
            {installButton}
            <div className="surface flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span className="text-sm">⚡</span>
              <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                {progreso.rachaDiaria} día{progreso.rachaDiaria !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <AcademyScreen progreso={progreso} onSelectModulo={handleSelectModulo} />
        </div>
        {mostrarBanner && isMobile && (
          <InstallBanner onInstall={promptInstall} onDismiss={handleDismissInstall} isMobile={true} />
        )}
      </div>
    )
  }

  // ── LAYOUT CON SIDEBAR (todas las pantallas dentro de un módulo) ──
  return (
    <div className="min-h-dvh text-white flex">
      <CustomCursor />
      <AnimatePresence>
        {xpMilestone && (
          <XPMilestoneOverlay xp={xpMilestone} onDone={() => setXpMilestone(null)} />
        )}
      </AnimatePresence>
      <Sidebar
        progreso={progreso}
        moduloData={moduloData}
        bloqueActual={bloqueActual}
        leccionActual={leccionActual}
        onNavBloque={handleSelectBlock}
        onVolverAcademy={handleVolverAcademy}
      />

      <main className="flex-1 flex flex-col items-center p-5 pb-20 lg:pb-8 overflow-y-auto">
        {/* Header mobile */}
        {pantalla !== "intro" && (
          <div className="w-full max-w-2xl lg:hidden">
            <Header rachaDiaria={progreso.rachaDiaria} rachaActual={rachaActual} installButton={installButton} onVolverAInicio={handleVolverAcademy} />
            <XPBar xp={(progreso.xpTotal || 0) + xpSesion} rachaActual={rachaActual} />
          </div>
        )}

        {/* Header desktop */}
        <div className="hidden lg:flex w-full max-w-3xl xl:max-w-4xl justify-between items-center mb-6">
          <div>
            {leccionActual && (
              <p className="text-sm font-semibold text-white">{leccionActual.titulo}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <XPBar xp={(progreso.xpTotal || 0) + xpSesion} rachaActual={rachaActual} />
            <div className={`surface flex items-center gap-2 px-3 py-1.5 rounded-full ${rachaActual >= 3 ? "glow-streak" : ""}`}>
              <span className="text-sm">{rachaActual >= 3 ? "🔥" : "✨"}</span>
              <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                {progreso.rachaDiaria} día{progreso.rachaDiaria !== 1 ? "s" : ""}
              </span>
            </div>
            {installButton}
          </div>
        </div>

        {/* ── PANTALLAS ── */}

        {pantalla === "intro" && moduloData && (
          <div className="flex-1 w-full py-4">
            {rachaRota && (
              <div className="glass rounded-xl px-4 py-3 max-w-2xl mx-auto mb-6 flex items-center gap-3 animate-slide-down">
                <span className="text-lg">😢</span>
                <p className="text-sm text-gray-400">Tu racha se rompió. ¡Hoy empieza una nueva!</p>
              </div>
            )}
            <IntroScreen
              modulo={moduloData}
              progreso={progreso}
              onSelectBlock={handleSelectBlock}
              onVolverAcademy={handleVolverAcademy}
              mostrarProyectoCert={moduloActivo?.id === "m4"}
            />
          </div>
        )}

        {pantalla === "lessons" && bloqueActual && (
          <div className="w-full max-w-2xl lg:max-w-3xl animate-fade-in">
            <BlockLessons
              bloque={bloqueActual}
              todasLecciones={todas}
              progreso={progreso}
              onSelectLesson={handleSelectLesson}
              onVolver={handleVolverBloques}
            />
          </div>
        )}

        {pantalla === "teoria" && leccionActual && (
          <div className="w-full max-w-2xl lg:max-w-3xl animate-fade-in">
            <TeoriaScreen
              leccion={leccionActual}
              onContinuar={handleTeoriaOk}
              onVolver={() => { setPantalla("lessons"); setLeccionActual(null) }}
            />
          </div>
        )}

        {pantalla === "quiz" && leccionActual && (
          <div className="w-full max-w-lg lg:max-w-2xl animate-fade-in">
            <div className="max-w-2xl mx-auto mb-4">
              <button
                onClick={() => setPantalla("teoria")}
                className="text-xs transition-colors mb-2 flex items-center gap-1"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
              >
                ← Volver a teoría
              </button>
              <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                {leccionActual.titulo}
              </p>
            </div>
            <QuizCard
              key={`${leccionActual.id}-${preguntaActual}`}
              pregunta={preguntas[preguntaActual]}
              indice={preguntaActual}
              totalPreguntas={preguntas.length}
              onAnswer={handleResponder}
              rachaActual={rachaActual}
            />
            {respondidas > preguntaActual && (
              <div className="flex justify-center mt-5 animate-slide-up">
                <button onClick={handleSiguiente} className="btn-primary px-8 py-3.5 rounded-xl text-sm">
                  {preguntaActual < preguntas.length - 1 ? "Siguiente pregunta →" : "Ver práctica ✨"}
                </button>
              </div>
            )}
          </div>
        )}

        {pantalla === "practica" && leccionActual && (
          <div className="w-full max-w-2xl lg:max-w-3xl animate-fade-in">
            <PracticaScreen leccion={leccionActual} onSiguiente={handlePracticaDone} />
          </div>
        )}

        {pantalla === "results" && leccionActual && (
          <div className="flex-1 flex items-center w-full max-w-lg lg:max-w-2xl animate-fade-in">
            <ResultsScreen
              leccion={leccionActual}
              correctas={correctas}
              totalPreguntas={preguntas.length}
              xp={xpSesion}
              onRestart={handleReintentar}
              onVolver={handleVolver}
              hayNextLesson={hayNextLesson}
            />
          </div>
        )}

        {pantalla === "proyecto" && (
          <div className="w-full max-w-2xl lg:max-w-3xl animate-fade-in">
            <ProyectoScreen
              progreso={progreso}
              onFaseCompleta={handleFaseProyectoCompleta}
              onVolver={() => setPantalla("intro")}
            />
          </div>
        )}

        {pantalla === "certificacion" && (
          <div className="w-full max-w-lg lg:max-w-2xl animate-fade-in">
            <CertificacionScreen
              progreso={progreso}
              onCertAprobada={handleCertAprobada}
              onVolver={() => setPantalla("intro")}
            />
          </div>
        )}
      </main>

      {mostrarBanner && isMobile && (
        <InstallBanner onInstall={promptInstall} onDismiss={handleDismissInstall} isMobile={true} />
      )}
    </div>
  )
}
