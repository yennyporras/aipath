// IntroScreen — pantalla principal Estratek IA Academy con bloques y lecciones
export default function IntroScreen({ modulo, progreso, onSelectLesson }) {
  const bloques = modulo.bloques
  const completadas = progreso.leccionesCompletadas || []

  // Aplanar todas las lecciones para calcular desbloqueo secuencial
  const todasLecciones = bloques.flatMap(b => b.lecciones)
  const totalLecciones = todasLecciones.length
  const totalCompletadas = completadas.length

  // Una lección está desbloqueada si es la primera o la anterior fue completada
  function estaDesbloqueada(leccionId) {
    const idx = todasLecciones.findIndex(l => l.id === leccionId)
    if (idx === 0) return true
    return completadas.includes(todasLecciones[idx - 1].id)
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-2">
      {/* Header de la academia */}
      <div className="text-center mb-6">
        <div className="animate-scale-in mb-4">
          <img src="/etk-logo-white.png" alt="Estratek IA Academy" className="h-14 w-auto mx-auto" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-2 animate-slide-up" style={{ animationDelay: "80ms" }}>
          Módulo 4 — {modulo.title}
        </p>
        <p className="text-lg text-gray-300 mb-1 animate-slide-up" style={{ animationDelay: "120ms" }}>
          Tu ruta al dominio de la Inteligencia Artificial
        </p>
        <p className="text-xs text-gray-600 animate-slide-up" style={{ animationDelay: "160ms" }}>
          {modulo.source}
        </p>
      </div>

      {/* Barra de progreso general */}
      <div className="w-full glass-strong rounded-2xl p-4 mb-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-300">Progreso del módulo</span>
          <span className="text-xs font-bold text-blue-400">{totalCompletadas} / {totalLecciones}</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden mb-2">
          <div
            className="xp-bar-fill h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${totalLecciones > 0 ? (totalCompletadas / totalLecciones) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>{progreso.xpTotal || 0} XP total</span>
          <span>Nivel {Math.floor((progreso.xpTotal || 0) / 300) + 1}</span>
        </div>
      </div>

      {/* Bloques y lecciones */}
      {bloques.map((bloque, bi) => {
        const leccionesBloque = bloque.lecciones
        const completadasBloque = leccionesBloque.filter(l => completadas.includes(l.id)).length

        return (
          <div key={bloque.id} className="w-full mb-5 animate-slide-up" style={{ animationDelay: `${240 + bi * 80}ms` }}>
            {/* Header del bloque */}
            <div className="flex items-center gap-3 mb-2.5 px-1">
              <span className="text-lg">{bloque.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-200">{bloque.nombre}</p>
                <p className="text-[10px] text-gray-600">{completadasBloque}/{leccionesBloque.length} completadas</p>
              </div>
              {completadasBloque === leccionesBloque.length && leccionesBloque.length > 0 && (
                <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">COMPLETO</span>
              )}
            </div>

            {/* Lecciones del bloque */}
            <div className="flex flex-col gap-1.5">
              {leccionesBloque.map(leccion => {
                const completada = completadas.includes(leccion.id)
                const desbloqueada = estaDesbloqueada(leccion.id)
                const badgeObtenido = (progreso.badges || []).includes(leccion.id)

                return (
                  <button
                    key={leccion.id}
                    onClick={() => desbloqueada && onSelectLesson(leccion)}
                    disabled={!desbloqueada}
                    className={`w-full text-left rounded-xl px-3.5 py-3 flex items-center gap-3 transition-all duration-200 ${
                      desbloqueada
                        ? completada
                          ? "glass border border-green-500/15 hover:border-green-500/30"
                          : "glass hover:bg-white/6 hover:translate-x-1 cursor-pointer"
                        : "bg-white/2 opacity-35 cursor-not-allowed"
                    }`}
                  >
                    {/* Ícono estado */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                      completada ? "bg-green-500/15 text-green-400" :
                      desbloqueada ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-gray-700"
                    }`}>
                      {completada ? "✅" : desbloqueada ? (leccion.tipo === "practica" ? "🔬" : leccion.tipo === "evaluacion" ? "📝" : "📖") : "🔒"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${desbloqueada ? "text-gray-300" : "text-gray-600"}`}>
                        {leccion.titulo}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] ${desbloqueada ? "text-gray-600" : "text-gray-800"}`}>
                          {leccion.duracion_min} min
                        </span>
                        {badgeObtenido && (
                          <span className="text-[10px] text-purple-400">badge</span>
                        )}
                      </div>
                    </div>

                    {/* XP */}
                    <span className={`text-[10px] shrink-0 ${
                      completada ? "text-green-500" : desbloqueada ? "text-gray-600" : "text-gray-800"
                    }`}>
                      {completada ? "✓" : `+${leccion.xp} XP`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Mensaje módulo completo */}
      {totalCompletadas === totalLecciones && totalLecciones > 0 && (
        <div className="glass-strong rounded-2xl p-5 mt-4 text-center w-full animate-scale-in">
          <p className="text-3xl mb-2">🏆</p>
          <p className="text-sm font-bold text-gradient">¡Módulo completado!</p>
          <p className="text-xs text-gray-500 mt-1">Dominaste Prompt Engineering Profesional</p>
        </div>
      )}
    </div>
  )
}
