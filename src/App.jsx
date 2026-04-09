import { useState, useEffect } from "react"
import Header from "./components/Header"
import XPBar from "./components/XPBar"
import QuizCard from "./components/QuizCard"
import IntroScreen from "./components/IntroScreen"
import ResultsScreen from "./components/ResultsScreen"
import moduleData from "./content/m4-prompt-engineering.json"

// Clave para localStorage
const STORAGE_KEY = "aipath_progreso"

// Carga el progreso guardado o devuelve valores por defecto
function cargarProgreso() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (!guardado) return null
    return JSON.parse(guardado)
  } catch {
    return null
  }
}

// Guarda el progreso en localStorage
function guardarProgreso(datos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
}

// Calcula la racha diaria comparando fechas
function calcularRachaDiaria(progreso) {
  if (!progreso) return { rachaDiaria: 0, rachaRota: false }

  const hoy = new Date().toDateString()
  const ultimaSesion = progreso.ultimaSesion

  if (ultimaSesion === hoy) {
    return { rachaDiaria: progreso.rachaDiaria, rachaRota: false }
  }

  const ayer = new Date()
  ayer.setDate(ayer.getDate() - 1)

  if (ultimaSesion === ayer.toDateString()) {
    return { rachaDiaria: progreso.rachaDiaria + 1, rachaRota: false }
  }

  // Pasó más de un día — racha se rompe
  return { rachaDiaria: 1, rachaRota: progreso.rachaDiaria > 1 }
}

export default function App() {
  const [pantalla, setPantalla] = useState("intro") // intro | quiz | results
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [xpSesion, setXpSesion] = useState(0)
  const [respondidas, setRespondidas] = useState(0)
  const [correctas, setCorrectas] = useState(0)
  const [rachaActual, setRachaActual] = useState(0) // racha de aciertos consecutivos en esta sesión

  // Progreso persistente
  const [xpTotal, setXpTotal] = useState(0)
  const [rachaDiaria, setRachaDiaria] = useState(1)
  const [badges, setBadges] = useState([])
  const [rachaRota, setRachaRota] = useState(false)

  const preguntas = moduleData.questions

  // Cargar progreso al iniciar
  useEffect(() => {
    const progreso = cargarProgreso()
    if (progreso) {
      setXpTotal(progreso.xpTotal || 0)
      setBadges(progreso.badges || [])
      const { rachaDiaria: racha, rachaRota: rota } = calcularRachaDiaria(progreso)
      setRachaDiaria(racha)
      setRachaRota(rota)
    }
  }, [])

  function handleIniciar() {
    setPantalla("quiz")
    setRachaRota(false)
  }

  function handleResponder(esCorrecto) {
    if (esCorrecto) {
      setXpSesion((prev) => prev + 30)
      setCorrectas((prev) => prev + 1)
      setRachaActual((prev) => prev + 1)
    } else {
      setRachaActual(0)
    }
    setRespondidas((prev) => prev + 1)
  }

  function handleSiguiente() {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual((prev) => prev + 1)
    } else {
      // Guardar progreso al terminar
      const nuevoXpTotal = xpTotal + xpSesion
      const nuevoBadges = [...badges]
      if (correctas >= 5 && !badges.includes("prompt-claro")) {
        nuevoBadges.push("prompt-claro")
      }

      guardarProgreso({
        xpTotal: nuevoXpTotal,
        rachaDiaria,
        badges: nuevoBadges,
        ultimaSesion: new Date().toDateString(),
      })

      setXpTotal(nuevoXpTotal)
      setBadges(nuevoBadges)
      setPantalla("results")
    }
  }

  function handleReintentar() {
    setPantalla("intro")
    setPreguntaActual(0)
    setXpSesion(0)
    setRespondidas(0)
    setCorrectas(0)
    setRachaActual(0)
  }

  const nivelActual = Math.floor(xpTotal / 210) + 1

  return (
    <div className="min-h-dvh text-white flex flex-col items-center p-5 pb-16">
      {/* Header y XP bar — solo durante el quiz */}
      {pantalla === "quiz" && (
        <>
          <Header rachaDiaria={rachaDiaria} rachaActual={rachaActual} />
          <XPBar xp={xpTotal + xpSesion} rachaActual={rachaActual} />
        </>
      )}

      {/* Pantalla de inicio */}
      {pantalla === "intro" && (
        <div className="flex-1 flex items-center w-full">
          <div className="w-full">
            {/* Aviso de racha rota */}
            {rachaRota && (
              <div className="glass rounded-xl px-4 py-3 max-w-lg mx-auto mb-6 flex items-center gap-3 animate-slide-down">
                <span className="text-lg">😢</span>
                <p className="text-sm text-gray-400">
                  Tu racha se rompió. ¡Hoy empieza una nueva!
                </p>
              </div>
            )}
            <IntroScreen
              modulo={moduleData}
              xpGuardado={xpTotal}
              nivelGuardado={nivelActual}
              onStart={handleIniciar}
            />
          </div>
        </div>
      )}

      {/* Pantalla del quiz */}
      {pantalla === "quiz" && (
        <div className="w-full animate-fade-in">
          <QuizCard
            key={preguntaActual}
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
                {preguntaActual < preguntas.length - 1
                  ? "Siguiente pregunta →"
                  : "Ver resultados ✨"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pantalla de resultados */}
      {pantalla === "results" && (
        <div className="flex-1 flex items-center w-full animate-fade-in">
          <ResultsScreen
            correctas={correctas}
            totalPreguntas={preguntas.length}
            xp={xpSesion}
            onRestart={handleReintentar}
          />
        </div>
      )}
    </div>
  )
}
