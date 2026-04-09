import { useState } from "react"

// Mensajes rotativos de refuerzo positivo
const MENSAJES_CORRECTO = [
  "¡Exacto!",
  "¡Correcto!",
  "¡Bien pensado!",
  "¡Perfecto!",
  "¡Excelente!",
  "¡Así se hace!",
  "¡Genial!",
]

// QuizCard — compatible con estructura m4-completo.json (verificacion[])
export default function QuizCard({ pregunta, indice, totalPreguntas, onAnswer, rachaActual }) {
  const [seleccion, setSeleccion] = useState(null)
  const [mostrarXP, setMostrarXP] = useState(false)
  const yaRespondio = seleccion !== null
  const esCorrecto = seleccion === pregunta.correcta

  function handleSeleccionar(i) {
    if (yaRespondio) return
    setSeleccion(i)
    const correcto = i === pregunta.correcta
    onAnswer(correcto)
    if (correcto) {
      setMostrarXP(true)
      setTimeout(() => setMostrarXP(false), 1400)
    }
  }

  const mensajeRefuerzo = MENSAJES_CORRECTO[(indice || 0) % MENSAJES_CORRECTO.length]
  const etiquetas = ["A", "B", "C", "D"]
  const numPregunta = (indice || 0) + 1

  return (
    <div className="w-full max-w-lg mx-auto relative">
      {mostrarXP && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="animate-float-xp inline-block text-2xl font-black text-gradient">+30 XP</span>
        </div>
      )}

      <div
        className={`glass-strong rounded-2xl p-6 transition-all duration-300 ${
          yaRespondio && !esCorrecto ? "animate-shake" : ""
        } ${yaRespondio && esCorrecto ? "animate-pulse-green" : ""} ${
          rachaActual >= 3 && !yaRespondio ? "border-gradient active" : ""
        }`}
      >
        {/* Barra de progreso */}
        <div className="flex items-center gap-1.5 mb-5">
          {Array.from({ length: totalPreguntas }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
                i < numPregunta - 1
                  ? "bg-gradient-to-r from-blue-500 to-purple-500"
                  : i === numPregunta - 1
                  ? "bg-blue-500"
                  : "bg-white/8"
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-gray-500 mb-2">Pregunta {numPregunta} de {totalPreguntas}</p>
        <h2 className="text-lg font-semibold text-gray-100 mb-6 leading-relaxed">{pregunta.pregunta}</h2>

        <div className="flex flex-col gap-3 stagger">
          {pregunta.opciones.map((opcion, i) => {
            let estiloOpcion = "border-white/8 text-gray-300"
            let estiloEtiqueta = "bg-white/5 text-gray-500"

            if (yaRespondio) {
              if (i === pregunta.correcta) {
                estiloOpcion = "border-green-500/50 bg-green-500/8 text-green-300 glow-green"
                estiloEtiqueta = "bg-green-500/20 text-green-400"
              } else if (i === seleccion) {
                estiloOpcion = "border-red-500/50 bg-red-500/8 text-red-300"
                estiloEtiqueta = "bg-red-500/20 text-red-400"
              } else {
                estiloOpcion = "border-white/4 text-gray-600"
                estiloEtiqueta = "bg-white/3 text-gray-700"
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSeleccionar(i)}
                disabled={yaRespondio}
                className={`option-btn animate-slide-up w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 ${estiloOpcion}`}
              >
                <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${estiloEtiqueta}`}>
                  {etiquetas[i]}
                </span>
                <span className="text-sm leading-relaxed pt-0.5">{opcion}</span>
              </button>
            )
          })}
        </div>

        {yaRespondio && (
          <div
            className={`mt-5 p-4 rounded-xl animate-slide-up ${
              esCorrecto
                ? "bg-green-500/8 border border-green-500/20"
                : "bg-amber-500/8 border border-amber-500/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{esCorrecto ? "✅" : "💡"}</span>
              <p className={`font-bold text-sm ${esCorrecto ? "text-green-400" : "text-amber-400"}`}>
                {esCorrecto ? mensajeRefuerzo : "Casi — esto es lo que necesitas recordar:"}
              </p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{pregunta.explicacion_profunda}</p>
          </div>
        )}
      </div>
    </div>
  )
}
