import { useState, useEffect } from "react"
import Header from "./components/Header"
import XPBar from "./components/XPBar"
import QuizCard from "./components/QuizCard"
import IntroScreen from "./components/IntroScreen"
import ResultsScreen from "./components/ResultsScreen"
import moduleData from "./content/m4-prompt-engineering.json"

// ── Persistencia en localStorage ──
const STORAGE_KEY = "aipath_progreso"

function cargarProgreso() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (!guardado) return { xpTotal: 0, rachaDiaria: 1, badges: [], leccionesCompletadas: [], ultimaSesion: null }
    return JSON.parse(guardado)
  } catch {
    return { xpTotal: 0, rachaDiaria: 1, badges: [], leccionesCompletadas: [], ultimaSesion: null }
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

export default function App() {
  // ── Estado de navegación ──
  const [pantalla, setPantalla] = useState("intro") // intro | quiz | results
  const [leccionActual, setLeccionActual] = useState(null)

  // ── Estado del quiz ──
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [xpSesion, setXpSesion] = useState(0)
  const [respondidas, setRespondidas] = useState(0)
  const [correctas, setCorrectas] = useState(0)
  const [rachaActual, setRachaActual] = useState(0)

  // ── Progreso persistente ──
  const [progreso, setProgreso] = useState(() => cargarProgreso())
  const [rachaRota, setRachaRota] = useState(false)

  // Calcular racha diaria al cargar
  useEffect(() => {
    const { rachaDiaria, rachaRota: rota } = calcularRachaDiaria(progreso)
    if (rachaDiaria !== progreso.rachaDiaria) {
      setProgreso(prev => ({ ...prev, rachaDiaria }))
    }
    setRachaRota(rota)
  }, [])

  // ── Handlers ──
  function handleSelectLesson(leccion) {
    setLeccionActual(leccion)
    setPantalla("quiz")
    setPreguntaActual(0)
    setXpSesion(0)
    setRespondidas(0)
    setCorrectas(0)
    setRachaActual(0)
    setRachaRota(false)
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
    const preguntas = leccionActual.questions
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(prev => prev + 1)
    } else {
      // Guardar progreso
      const nuevoProgreso = { ...progreso }
      nuevoProgreso.xpTotal = (nuevoProgreso.xpTotal || 0) + xpSesion
      nuevoProgreso.ultimaSesion = new Date().toDateString()

      // Marcar lección como completada si aprobó (70%+)
      if (correctas >= 5) {
        if (!nuevoProgreso.leccionesCompletadas.includes(leccionActual.id)) {
          nuevoProgreso.leccionesCompletadas = [...nuevoProgreso.leccionesCompletadas, leccionActual.id]
        }
        if (!nuevoProgreso.badges.includes(leccionActual.id)) {
          nuevoProgreso.badges = [...nuevoProgreso.badges, leccionActual.id]
        }
      }

      guardarProgreso(nuevoProgreso)
      setProgreso(nuevoProgreso)
      setPantalla("results")
    }
  }

  function handleReintentar() {
    setPreguntaActual(0)
    setXpSesion(0)
    setRespondidas(0)
    setCorrectas(0)
    setRachaActual(0)
    setPantalla("quiz")
  }

  function handleVolver() {
    // Si aprobó y hay siguiente lección, ir a ella directamente
    if (correctas >= 5) {
      const lecciones = moduleData.lessons
      const idx = lecciones.findIndex(l => l.id === leccionActual.id)
      if (idx < lecciones.length - 1) {
        handleSelectLesson(lecciones[idx + 1])
        return
      }
    }
    setPantalla("intro")
    setLeccionActual(null)
  }

  // ── Render ──
  const preguntas = leccionActual?.questions || []
  const hayNextLesson = leccionActual
    ? moduleData.lessons.findIndex(l => l.id === leccionActual.id) < moduleData.lessons.length - 1
    : false

  return (
    <div className="min-h-dvh text-white flex flex-col items-center p-5 pb-16">
      {/* Header y XP — durante quiz y resultados */}
      {pantalla !== "intro" && (
        <>
          <Header rachaDiaria={progreso.rachaDiaria} rachaActual={rachaActual} />
          <XPBar xp={(progreso.xpTotal || 0) + xpSesion} rachaActual={rachaActual} />
        </>
      )}

      {/* Pantalla de inicio — lista de lecciones */}
      {pantalla === "intro" && (
        <div className="flex-1 w-full py-4">
          {rachaRota && (
            <div className="glass rounded-xl px-4 py-3 max-w-lg mx-auto mb-6 flex items-center gap-3 animate-slide-down">
              <span className="text-lg">😢</span>
              <p className="text-sm text-gray-400">Tu racha se rompió. ¡Hoy empieza una nueva!</p>
            </div>
          )}
          <IntroScreen
            modulo={moduleData}
            progreso={progreso}
            onSelectLesson={handleSelectLesson}
          />
        </div>
      )}

      {/* Pantalla del quiz */}
      {pantalla === "quiz" && leccionActual && (
        <div className="w-full animate-fade-in">
          {/* Título de la técnica */}
          <div className="max-w-lg mx-auto mb-4">
            <button
              onClick={() => { setPantalla("intro"); setLeccionActual(null) }}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors mb-2 flex items-center gap-1"
            >
              ← Volver al módulo
            </button>
            <p className="text-sm font-medium text-gray-400">
              <span className="text-gray-600">T{leccionActual.number}</span> {leccionActual.technique}
            </p>
          </div>

          <QuizCard
            key={`${leccionActual.id}-${preguntaActual}`}
            pregunta={preguntas[preguntaActual]}
            totalPreguntas={preguntas.length}
            onAnswer={handleResponder}
            rachaActual={rachaActual}
          />
          {respondidas > preguntaActual && (
            <div className="flex justify-center mt-5 animate-slide-up">
              <button
                onClick={handleSiguiente}
                className="btn-primary px-8 py-3.5 rounded-xl text-sm font-bold text-white"
              >
                {preguntaActual < preguntas.length - 1 ? "Siguiente pregunta →" : "Ver resultados ✨"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pantalla de resultados */}
      {pantalla === "results" && leccionActual && (
        <div className="flex-1 flex items-center w-full animate-fade-in">
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
    </div>
  )
}
