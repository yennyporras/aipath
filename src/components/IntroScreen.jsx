// IntroScreen — pantalla principal con lista de lecciones, progreso del módulo y selección
export default function IntroScreen({ modulo, progreso, onSelectLesson }) {
  const lecciones = modulo.lessons
  const completadas = progreso.leccionesCompletadas || []
  const totalCompletadas = completadas.length

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-2">
      {/* Header del módulo */}
      <div className="text-center mb-6">
        <div className="animate-scale-in mb-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl glow-purple mx-auto">
            🧩
          </div>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-2 animate-slide-up" style={{ animationDelay: "80ms" }}>
          Módulo 4
        </p>
        <h2 className="text-2xl font-bold text-gradient mb-1 animate-slide-up" style={{ animationDelay: "120ms" }}>
          {modulo.title}
        </h2>
        <p className="text-xs text-gray-500 animate-slide-up" style={{ animationDelay: "160ms" }}>
          {modulo.source}
        </p>
      </div>

      {/* Barra de progreso del módulo */}
      <div className="w-full glass-strong rounded-2xl p-4 mb-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-300">Progreso del módulo</span>
          <span className="text-xs font-bold text-blue-400">{totalCompletadas} / {lecciones.length}</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden mb-2">
          <div
            className="xp-bar-fill h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${(totalCompletadas / lecciones.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>{progreso.xpTotal || 0} XP total</span>
          <span>Nivel {Math.floor((progreso.xpTotal || 0) / 210) + 1}</span>
        </div>
      </div>

      {/* Lista de lecciones */}
      <div className="w-full flex flex-col gap-2.5">
        {lecciones.map((leccion, i) => {
          const completada = completadas.includes(leccion.id)
          const anteriorCompletada = i === 0 || completadas.includes(lecciones[i - 1].id)
          const desbloqueada = i === 0 || anteriorCompletada
          const badgeObtenido = (progreso.badges || []).includes(leccion.id)

          return (
            <button
              key={leccion.id}
              onClick={() => desbloqueada && onSelectLesson(leccion)}
              disabled={!desbloqueada}
              className={`animate-slide-up w-full text-left rounded-xl p-4 flex items-center gap-4 transition-all duration-200 ${
                desbloqueada
                  ? completada
                    ? "glass-strong border border-green-500/20 hover:border-green-500/40"
                    : "glass-strong hover:bg-white/8 hover:translate-x-1 cursor-pointer"
                  : "bg-white/2 opacity-40 cursor-not-allowed"
              }`}
              style={{ animationDelay: `${240 + i * 60}ms` }}
            >
              {/* Ícono */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                completada
                  ? "bg-green-500/15"
                  : desbloqueada
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                  : "bg-white/5"
              }`}>
                {completada ? "✅" : desbloqueada ? leccion.icon : "🔒"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold truncate ${
                    desbloqueada ? "text-gray-200" : "text-gray-600"
                  }`}>
                    {leccion.number}. {leccion.technique}
                  </p>
                </div>
                <p className={`text-xs mt-0.5 truncate ${
                  desbloqueada ? "text-gray-500" : "text-gray-700"
                }`}>
                  {leccion.description}
                </p>
              </div>

              {/* Estado / XP / Badge */}
              <div className="shrink-0 text-right">
                {completada ? (
                  <div className="flex flex-col items-end gap-0.5">
                    {badgeObtenido && (
                      <span className="text-[10px] font-bold text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded-full">
                        {leccion.badge}
                      </span>
                    )}
                    <span className="text-[10px] text-green-500">completada</span>
                  </div>
                ) : desbloqueada ? (
                  <span className="text-xs text-gray-500">+210 XP</span>
                ) : (
                  <span className="text-xs text-gray-700">bloqueada</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Mensaje si completó todo */}
      {totalCompletadas === lecciones.length && (
        <div className="glass-strong rounded-2xl p-5 mt-6 text-center w-full animate-scale-in">
          <p className="text-3xl mb-2">🏆</p>
          <p className="text-sm font-bold text-gradient">¡Módulo completado!</p>
          <p className="text-xs text-gray-500 mt-1">Dominaste las 9 técnicas de Anthropic</p>
        </div>
      )}
    </div>
  )
}
