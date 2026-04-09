import { useState, useEffect } from "react"

function getMensaje(porcentaje) {
  if (porcentaje === 100) return { emoji: "🏆", texto: "¡Puntuación perfecta! Eres un master del prompting." }
  if (porcentaje >= 85) return { emoji: "🌟", texto: "¡Impresionante! Dominas esta técnica." }
  if (porcentaje >= 70) return { emoji: "💪", texto: "¡Muy bien! Ya entiendes los fundamentos." }
  return { emoji: "📚", texto: "Buen intento. Repasa y vuelve más fuerte." }
}

function CirculoProgreso({ porcentaje }) {
  const radio = 45
  const circunferencia = 2 * Math.PI * radio
  const offset = circunferencia - (porcentaje / 100) * circunferencia
  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 circle-progress" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radio} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle cx="50" cy="50" r={radio} fill="none" stroke="url(#gradient-result)" strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circunferencia} strokeDashoffset={offset} className="animate-circle-fill" />
        <defs>
          <linearGradient id="gradient-result" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white animate-count-up">{porcentaje}%</span>
        <span className="text-[10px] text-gray-500">aciertos</span>
      </div>
    </div>
  )
}

// ResultsScreen — adaptado a estructura m4-completo.json
export default function ResultsScreen({ leccion, correctas, totalPreguntas, xp, onRestart, onVolver, hayNextLesson }) {
  const porcentaje = Math.round((correctas / totalPreguntas) * 100)
  const minAprobacion = Math.ceil(totalPreguntas * 0.7)
  const badgeDesbloqueado = correctas >= minAprobacion
  const mensaje = getMensaje(porcentaje)

  const [xpAnimado, setXpAnimado] = useState(0)
  useEffect(() => {
    let actual = 0
    const paso = Math.max(1, Math.ceil(xp / 30))
    const intervalo = setInterval(() => {
      actual += paso
      if (actual >= xp) { actual = xp; clearInterval(intervalo) }
      setXpAnimado(actual)
    }, 40)
    return () => clearInterval(intervalo)
  }, [xp])

  const textoLinkedIn = encodeURIComponent(
    `Acabo de completar "${leccion.titulo}" en Estratek IA Academy con ${porcentaje}% de aciertos y ${xp} XP.\n\nAprendiendo Prompt Engineering Profesional.\n\n#EstrategiaIA #PromptEngineering #Antropic #EstrategiaDigital`
  )

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-2">
      {badgeDesbloqueado && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="absolute rounded-sm" style={{
              left: `${5 + Math.random() * 90}%`, top: `-3%`,
              width: `${4 + Math.random() * 6}px`, height: `${4 + Math.random() * 6}px`,
              backgroundColor: ["#3B82F6", "#8B5CF6", "#22d3ee", "#f59e0b", "#22c55e", "#ec4899"][i % 6],
              animation: `confetti-fall ${2 + Math.random() * 3}s ease-in ${Math.random() * 1.5}s forwards`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }} />
          ))}
        </div>
      )}

      <div className="glass-strong rounded-3xl p-8 w-full relative z-10 animate-scale-in">
        <p className="text-5xl mb-3">{mensaje.emoji}</p>
        <h3 className="text-2xl font-bold text-gradient mb-1">¡Lección completada!</h3>
        <p className="text-sm text-gray-400 mb-6">{mensaje.texto}</p>

        <div className="flex items-center justify-center gap-8 mb-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CirculoProgreso porcentaje={porcentaje} />
          <div className="text-left">
            <p className="text-3xl font-black text-gradient animate-count-up">+{xpAnimado}</p>
            <p className="text-xs text-gray-500 mt-1">XP ganados</p>
            <p className="text-sm text-gray-400 mt-3">
              <span className="text-white font-semibold">{correctas}</span> / {totalPreguntas} correctas
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className={`mb-6 animate-slide-up ${badgeDesbloqueado ? "" : "opacity-40"}`} style={{ animationDelay: "400ms" }}>
          <div className={`glass rounded-2xl p-4 flex items-center gap-4 ${badgeDesbloqueado ? "glow-purple" : ""}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
              badgeDesbloqueado ? "bg-gradient-to-br from-blue-500 to-purple-600 animate-badge-unlock" : "bg-white/5"
            }`}>
              {leccion.tipo === "practica" ? "🔬" : leccion.tipo === "evaluacion" ? "📝" : "📖"}
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-white flex items-center gap-2">
                {leccion.titulo}
                {badgeDesbloqueado && (
                  <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">APROBADO</span>
                )}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{leccion.duracion_min} min · {leccion.xp} XP</p>
              {!badgeDesbloqueado && (
                <p className="text-xs text-gray-600 mt-1">Necesitas 70%+ para aprobar y desbloquear la siguiente</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 animate-slide-up" style={{ animationDelay: "600ms" }}>
          {badgeDesbloqueado && (
            <a href={`https://www.linkedin.com/feed/?shareActive=true&text=${textoLinkedIn}`}
              target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#0A66C2] hover:bg-[#0077B5] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-lg hover:shadow-blue-900/30 text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Compartir en LinkedIn
            </a>
          )}
          <button onClick={onRestart}
            className="w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-300 glass hover:bg-white/8 transition-all">
            Intentar de nuevo
          </button>
          <button onClick={onVolver}
            className="btn-primary w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-white">
            {badgeDesbloqueado && hayNextLesson ? "Siguiente lección →" : "Volver al módulo"}
          </button>
        </div>
      </div>
    </div>
  )
}
