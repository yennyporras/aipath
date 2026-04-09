// Colores únicos por bloque
const BLOCK_COLORS = [
  { bg: "from-blue-500/20 to-blue-600/10", text: "text-blue-400" },
  { bg: "from-indigo-500/20 to-indigo-600/10", text: "text-indigo-400" },
  { bg: "from-violet-500/20 to-violet-600/10", text: "text-violet-400" },
  { bg: "from-purple-500/20 to-purple-600/10", text: "text-purple-400" },
  { bg: "from-fuchsia-500/20 to-fuchsia-600/10", text: "text-fuchsia-400" },
  { bg: "from-cyan-500/20 to-cyan-600/10", text: "text-cyan-400" },
]

// IntroScreen — SOLO muestra los bloques como cards compactas (sin lecciones)
export default function IntroScreen({ modulo, progreso, onSelectBlock }) {
  const bloques = modulo.bloques
  const completadas = progreso.leccionesCompletadas || []
  const todasLecciones = bloques.flatMap(b => b.lecciones)
  const totalLecciones = todasLecciones.length
  const totalCompletadas = completadas.length

  // Un bloque está desbloqueado si es el primero o todas las lecciones del anterior están completadas
  function bloqueDesbloqueado(bi) {
    if (bi === 0) return true
    return bloques[bi - 1].lecciones.every(l => completadas.includes(l.id))
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center px-2 relative z-10">
      {/* Logo + título */}
      <div className="text-center mb-6">
        <div className="animate-scale-in mb-4">
          <img src="/etk-logo-white.png" alt="Estratek IA Academy" className="h-14 w-auto mx-auto drop-shadow-lg" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400/80 mb-1.5 animate-slide-up" style={{ animationDelay: "80ms" }}>
          Módulo 4
        </p>
        <h2 className="text-2xl font-extrabold text-gradient mb-1 animate-slide-up" style={{ animationDelay: "120ms" }}>
          {modulo.title}
        </h2>
        <p className="text-sm text-gray-400 animate-slide-up" style={{ animationDelay: "160ms" }}>
          Tu ruta al dominio de la Inteligencia Artificial
        </p>
      </div>

      {/* Progreso general compacto */}
      <div className="w-full max-w-lg glass-strong rounded-2xl p-4 mb-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-200">Progreso</span>
          <span className="text-xs font-bold text-gradient">{totalCompletadas} / {totalLecciones} lecciones</span>
        </div>
        <div className="progress-thick">
          <div className="progress-thick-fill" style={{ width: `${totalLecciones > 0 ? (totalCompletadas / totalLecciones) * 100 : 0}%` }} />
        </div>
        <div className="flex justify-between text-[11px] text-gray-500 mt-2">
          <span>{progreso.xpTotal || 0} XP</span>
          <span>Nivel {Math.floor((progreso.xpTotal || 0) / 300) + 1}</span>
        </div>
      </div>

      {/* Grid de bloques — 1 col mobile, 2 col desktop */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bloques.map((bloque, bi) => {
          const lecciones = bloque.lecciones
          const completadasBloque = lecciones.filter(l => completadas.includes(l.id)).length
          const bloqueCompleto = completadasBloque === lecciones.length && lecciones.length > 0
          const desbloqueado = bloqueDesbloqueado(bi)
          const colors = BLOCK_COLORS[bi % BLOCK_COLORS.length]
          const xpBloque = lecciones.reduce((s, l) => s + l.xp, 0)
          const progressPct = lecciones.length > 0 ? (completadasBloque / lecciones.length) * 100 : 0

          return (
            <button
              key={bloque.id}
              onClick={() => desbloqueado && onSelectBlock(bloque)}
              disabled={!desbloqueado}
              className={`animate-slide-up text-left rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-300 ${
                desbloqueado
                  ? "glass-card cursor-pointer"
                  : "opacity-40 cursor-not-allowed bg-white/2 border border-white/4 rounded-2xl"
              } ${bloqueCompleto ? "border-green-500/20" : ""}`}
              style={{ animationDelay: `${240 + bi * 60}ms` }}
            >
              {/* Ícono */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-2xl shrink-0`}>
                {!desbloqueado ? "🔒" : bloqueCompleto ? "✅" : bloque.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${bloqueCompleto ? "text-green-400" : desbloqueado ? "text-gray-100" : "text-gray-600"}`}>
                  {bloque.nombre}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-500">{lecciones.length} lecciones</span>
                  <span className="text-[10px] text-gray-700">·</span>
                  <span className={`text-[10px] ${colors.text}`}>{xpBloque} XP</span>
                </div>
                {/* Mini barra de progreso */}
                {desbloqueado && (
                  <div className="w-full bg-white/5 rounded-full h-1 mt-2 overflow-hidden">
                    <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
                  </div>
                )}
              </div>

              {/* Flecha / estado */}
              <span className={`text-xs shrink-0 ${bloqueCompleto ? "text-green-500" : desbloqueado ? "text-gray-600" : "text-gray-800"}`}>
                {bloqueCompleto ? "✓" : desbloqueado ? "→" : ""}
              </span>
            </button>
          )
        })}
      </div>

      {totalCompletadas === totalLecciones && totalLecciones > 0 && (
        <div className="glass-strong rounded-2xl p-6 mt-6 text-center w-full max-w-lg animate-scale-in">
          <p className="text-4xl mb-2">🏆</p>
          <p className="text-lg font-bold text-gradient">¡Módulo completado!</p>
          <p className="text-xs text-gray-500 mt-1">Dominaste Prompt Engineering Profesional</p>
        </div>
      )}
    </div>
  )
}
