import { useState, useEffect } from "react"

// Badge de la Técnica 1
const BADGE = {
  nombre: "Prompt Claro",
  icono: "🎯",
  descripcion: "Dominas la Técnica 1: Sé claro y directo",
  requisito: 5, // mínimo 5/7 correctas (71%+)
}

// Mensajes según rendimiento
function getMensaje(porcentaje) {
  if (porcentaje === 100) return { emoji: "🏆", texto: "¡Puntuación perfecta! Eres un master del prompting." }
  if (porcentaje >= 85) return { emoji: "🌟", texto: "¡Impresionante! Dominas esta técnica." }
  if (porcentaje >= 70) return { emoji: "💪", texto: "¡Muy bien! Ya entiendes los fundamentos." }
  return { emoji: "📚", texto: "Buen intento. Repasa y vuelve más fuerte." }
}

// Círculo de progreso animado SVG
function CirculoProgreso({ porcentaje }) {
  const radio = 45
  const circunferencia = 2 * Math.PI * radio
  const offset = circunferencia - (porcentaje / 100) * circunferencia

  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 circle-progress" viewBox="0 0 100 100">
        {/* Fondo del círculo */}
        <circle cx="50" cy="50" r={radio} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        {/* Progreso */}
        <circle
          cx="50" cy="50" r={radio} fill="none"
          stroke="url(#gradient)" strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
          className="animate-circle-fill"
          style={{ "--circle-target": offset }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Porcentaje al centro */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white animate-count-up">{porcentaje}%</span>
        <span className="text-[10px] text-gray-500">aciertos</span>
      </div>
    </div>
  )
}

// ResultsScreen — pantalla de celebración con stats, badge y compartir
export default function ResultsScreen({ correctas, totalPreguntas, xp, onRestart }) {
  const porcentaje = Math.round((correctas / totalPreguntas) * 100)
  const badgeDesbloqueado = correctas >= BADGE.requisito
  const mensaje = getMensaje(porcentaje)

  // Contador animado de XP
  const [xpAnimado, setXpAnimado] = useState(0)
  useEffect(() => {
    let actual = 0
    const paso = Math.ceil(xp / 30)
    const intervalo = setInterval(() => {
      actual += paso
      if (actual >= xp) {
        actual = xp
        clearInterval(intervalo)
      }
      setXpAnimado(actual)
    }, 40)
    return () => clearInterval(intervalo)
  }, [xp])

  // Texto para compartir en LinkedIn
  const textoLinkedIn = encodeURIComponent(
    `Acabo de completar la lección "Sé Claro y Directo" en AIPath con ${porcentaje}% de aciertos y ${xp} XP.\n\nAprendiendo Prompt Engineering con las técnicas oficiales de Anthropic.\n\n#AIPath #PromptEngineering #IA #Anthropic`
  )

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-2">
      {/* Confetti */}
      {badgeDesbloqueado && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-sm"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `-3%`,
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                backgroundColor: ["#3B82F6", "#8B5CF6", "#22d3ee", "#f59e0b", "#22c55e", "#ec4899"][i % 6],
                animation: `confetti-fall ${2 + Math.random() * 3}s ease-in ${Math.random() * 1.5}s forwards`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Card principal de resultados */}
      <div className="glass-strong rounded-3xl p-8 w-full relative z-10 animate-scale-in">
        {/* Emoji y mensaje */}
        <p className="text-5xl mb-3">{mensaje.emoji}</p>
        <h3 className="text-2xl font-bold text-gradient mb-1">¡Lección completada!</h3>
        <p className="text-sm text-gray-400 mb-6">{mensaje.texto}</p>

        {/* Círculo de progreso + XP */}
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
        <div
          className={`mb-6 animate-slide-up ${badgeDesbloqueado ? "" : "opacity-40"}`}
          style={{ animationDelay: "400ms" }}
        >
          <div className={`glass rounded-2xl p-4 flex items-center gap-4 ${badgeDesbloqueado ? "glow-purple" : ""}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
              badgeDesbloqueado
                ? "bg-gradient-to-br from-blue-500 to-purple-600 animate-badge-unlock"
                : "bg-white/5"
            }`}>
              {BADGE.icono}
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-white flex items-center gap-2">
                {BADGE.nombre}
                {badgeDesbloqueado && (
                  <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">
                    DESBLOQUEADO
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{BADGE.descripcion}</p>
              {!badgeDesbloqueado && (
                <p className="text-xs text-gray-600 mt-1">
                  Necesitas {BADGE.requisito}+ correctas para desbloquear
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-3 animate-slide-up" style={{ animationDelay: "600ms" }}>
          {/* Compartir en LinkedIn */}
          {badgeDesbloqueado && (
            <a
              href={`https://www.linkedin.com/feed/?shareActive=true&text=${textoLinkedIn}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#0A66C2] hover:bg-[#0077B5] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-lg hover:shadow-blue-900/30 text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Compartir en LinkedIn
            </a>
          )}

          {/* Reintentar */}
          <button
            onClick={onRestart}
            className="btn-primary w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-white"
          >
            Intentar de nuevo
          </button>

          {/* Siguiente lección (próximamente) */}
          <button
            disabled
            className="w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-600 bg-white/3 border border-white/5 cursor-not-allowed"
          >
            Siguiente lección — próximamente
          </button>
        </div>
      </div>
    </div>
  )
}
