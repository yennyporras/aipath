import { useState, useEffect } from "react"
import Header from "./components/Header"
import XPBar from "./components/XPBar"
import QuizCard from "./components/QuizCard"
import IntroScreen from "./components/IntroScreen"
import BlockLessons from "./components/BlockLessons"
import ResultsScreen from "./components/ResultsScreen"
import moduleData from "./content/m4-completo.json"

const STORAGE_KEY = "aipath_progreso_v2"

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

function todasLasLecciones() {
  return moduleData.bloques.flatMap(b => b.lecciones)
}

export default function App() {
  // Pantallas: intro (bloques) | lessons (lecciones de un bloque) | quiz | results
  const [pantalla, setPantalla] = useState("intro")
  const [bloqueActual, setBloqueActual] = useState(null)
  const [leccionActual, setLeccionActual] = useState(null)

  const [preguntaActual, setPreguntaActual] = useState(0)
  const [xpSesion, setXpSesion] = useState(0)
  const [respondidas, setRespondidas] = useState(0)
  const [correctas, setCorrectas] = useState(0)
  const [rachaActual, setRachaActual] = useState(0)

  const [progreso, setProgreso] = useState(() => cargarProgreso())
  const [rachaRota, setRachaRota] = useState(false)

  useEffect(() => {
    const { rachaDiaria, rachaRota: rota } = calcularRachaDiaria(progreso)
    if (rachaDiaria !== progreso.rachaDiaria) {
      setProgreso(prev => ({ ...prev, rachaDiaria }))
    }
    setRachaRota(rota)
  }, [])

  function handleSelectBlock(bloque) {
    setBloqueActual(bloque)
    setPantalla("lessons")
  }

  function handleVolverBloques() {
    setPantalla("intro")
    setBloqueActual(null)
  }

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
    const todas = todasLasLecciones()
    const preguntas = leccionActual.contenido.verificacion
    const minAprobacion = Math.ceil(preguntas.length * 0.7)
    if (correctas >= minAprobacion) {
      const idx = todas.findIndex(l => l.id === leccionActual.id)
      if (idx < todas.length - 1) {
        handleSelectLesson(todas[idx + 1])
        return
      }
    }
    // Volver a la lista de lecciones del bloque actual
    if (bloqueActual) {
      setPantalla("lessons")
      setLeccionActual(null)
    } else {
      setPantalla("intro")
      setLeccionActual(null)
    }
  }

  const preguntas = leccionActual?.contenido?.verificacion || []
  const todas = todasLasLecciones()
  const hayNextLesson = leccionActual
    ? todas.findIndex(l => l.id === leccionActual.id) < todas.length - 1
    : false

  return (
    <div className="min-h-dvh text-white flex flex-col items-center p-5 pb-16 bg-animated">
      {/* Header — en todo excepto bloques */}
      {pantalla !== "intro" && (
        <>
          <Header rachaDiaria={progreso.rachaDiaria} rachaActual={rachaActual} />
          <XPBar xp={(progreso.xpTotal || 0) + xpSesion} rachaActual={rachaActual} />
        </>
      )}

      {/* Pantalla de bloques */}
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
            onSelectBlock={handleSelectBlock}
          />
        </div>
      )}

      {/* Pantalla de lecciones de un bloque */}
      {pantalla === "lessons" && bloqueActual && (
        <div className="w-full animate-fade-in">
          <BlockLessons
            bloque={bloqueActual}
            todasLecciones={todas}
            progreso={progreso}
            onSelectLesson={handleSelectLesson}
            onVolver={handleVolverBloques}
          />
        </div>
      )}

      {/* Quiz */}
      {pantalla === "quiz" && leccionActual && (
        <div className="w-full animate-fade-in">
          <div className="max-w-lg mx-auto mb-4">
            <button
              onClick={() => { setPantalla("lessons"); setLeccionActual(null) }}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-2 flex items-center gap-1"
            >
              ← Volver a lecciones
            </button>
            <p className="text-sm font-medium text-gray-400">{leccionActual.titulo}</p>
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

      {/* Resultados */}
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
