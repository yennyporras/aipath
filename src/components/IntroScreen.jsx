// Colores únicos por bloque
const BLOCK_COLORS = [
  { bg: "from-blue-500/20 to-blue-600/10", text: "text-blue-400", border: "border-blue-500/20" },
  { bg: "from-indigo-500/20 to-indigo-600/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  { bg: "from-violet-500/20 to-violet-600/10", text: "text-violet-400", border: "border-violet-500/20" },
  { bg: "from-purple-500/20 to-purple-600/10", text: "text-purple-400", border: "border-purple-500/20" },
  { bg: "from-fuchsia-500/20 to-fuchsia-600/10", text: "text-fuchsia-400", border: "border-fuchsia-500/20" },
  { bg: "from-cyan-500/20 to-cyan-600/10", text: "text-cyan-400", border: "border-cyan-500/20" },
  { bg: "from-emerald-500/20 to-emerald-600/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  { bg: "from-amber-500/20 to-amber-600/10", text: "text-amber-400", border: "border-amber-500/20" },
]

export default function IntroScreen({ modulo, progreso, onSelectLesson }) {
  const bloques = modulo.bloques
  const completadas = progreso.leccionesCompletadas || []
  const todasLecciones = bloques.flatMap(b => b.lecciones)
  const totalLecciones = todasLecciones.length
  const totalCompletadas = completadas.length

  function estaDesbloqueada(leccionId) {
    const idx = todasLecciones.findIndex(l => l.id === leccionId)
    if (idx === 0) return true
    return completadas.includes(todasLecciones[idx - 1].id)
  }

  // Determinar bloque activo (primer bloque con lecciones sin completar)
  function bloqueActivo() {
    for (const bloque of bloques) {
      const todas = bloque.lecciones.every(l => completadas.includes(l.id))
      if (!todas) return bloque.id
    }
    return null
  }
  const activoId = bloqueActivo()

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-2 relative z-10">
      {/* Logo + título */}
      <div className="text-center mb-8">
        <div className="animate-scale-in mb-5">
          <img src="/etk-logo-white.png" alt="Estratek IA Academy" className="h-16 w-auto mx-auto drop-shadow-lg" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400/80 mb-2 animate-slide-up" style={{ animationDelay: "80ms" }}>
          Módulo 4
        </p>
        <h2 className="text-2xl font-extrabold text-gradient mb-2 animate-slide-up" style={{ animationDelay: "120ms" }}>
          {modulo.title}
        </h2>
        <p className="text-sm text-gray-400 animate-slide-up" style={{ animationDelay: "160ms" }}>
          Tu ruta al dominio de la Inteligencia Artificial
        </p>
      </div>

      {/* Progreso general */}
      <div className="w-full glass-strong rounded-2xl p-5 mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-200">Progreso del módulo</span>
          <span className="text-xs font-bold text-gradient">{totalCompletadas} / {totalLecciones}</span>
        </div>
        <div className="progress-thick mb-3">
          <div className="progress-thick-fill" style={{ width: `${totalLecciones > 0 ? (totalCompletadas / totalLecciones) * 100 : 0}%` }} />
        </div>
        <div className="flex justify-between text-[11px] text-gray-500">
          <span>{progreso.xpTotal || 0} XP total</span>
          <span>Nivel {Math.floor((progreso.xpTotal || 0) / 300) + 1}</span>
        </div>
      </div>

      {/* Bloques */}
      {bloques.map((bloque, bi) => {
        const lecciones = bloque.lecciones
        const completadasBloque = lecciones.filter(l => completadas.includes(l.id)).length
        const bloqueCompleto = completadasBloque === lecciones.length && lecciones.length > 0
        const esActivo = bloque.id === activoId
        const colors = BLOCK_COLORS[bi % BLOCK_COLORS.length]
        const xpBloque = lecciones.reduce((s, l) => s + l.xp, 0)

        return (
          <div key={bloque.id} className="w-full mb-4 animate-slide-up" style={{ animationDelay: `${260 + bi * 70}ms` }}>
            {/* Card del bloque */}
            <div className={`glass-card rounded-2xl p-4 mb-2 ${esActivo ? "block-active animate-pulse-border" : ""} ${bloqueCompleto ? "border-green-500/20" : ""}`}>
              <div className="flex items-center gap-3.5">
                {/* Ícono grande */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-2xl shrink-0`}>
                  {bloqueCompleto ? "✅" : bloque.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${bloqueCompleto ? "text-green-400" : "text-gray-100"}`}>
                    {bloque.nombre}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">{bloque.descripcion}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-gray-600">{lecciones.length} lecciones</span>
                    <span className="text-[10px] text-gray-600">·</span>
                    <span className={`text-[10px] ${colors.text}`}>{xpBloque} XP</span>
                    <span className="text-[10px] text-gray-600">·</span>
                    <span className="text-[10px] text-gray-600">{completadasBloque}/{lecciones.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lecciones del bloque (colapsadas si no es activo, expandidas si es activo) */}
            {esActivo && (
              <div className="flex flex-col gap-1.5 pl-2 animate-fade-in">
                {lecciones.map(leccion => {
                  const completada = completadas.includes(leccion.id)
                  const desbloqueada = estaDesbloqueada(leccion.id)
                  const tipoIcon = leccion.tipo === "practica" ? "🔬" : leccion.tipo === "evaluacion" ? "📝" : "📖"

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
                          : "opacity-40 cursor-not-allowed"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                        completada ? "bg-green-500/15" : desbloqueada ? "bg-blue-500/10" : "bg-white/3"
                      }`}>
                        {completada ? "✅" : desbloqueada ? tipoIcon : "🔒"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium truncate ${desbloqueada ? "text-gray-300" : "text-gray-600"}`}>
                          {leccion.titulo}
                        </p>
                        <span className={`text-[10px] ${desbloqueada ? "text-gray-600" : "text-gray-800"}`}>
                          {leccion.duracion_min} min · {leccion.xp} XP
                        </span>
                      </div>
                      <span className={`text-[10px] shrink-0 ${completada ? "text-green-500" : desbloqueada ? "text-gray-600" : "text-gray-800"}`}>
                        {completada ? "✓" : desbloqueada ? "→" : ""}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {totalCompletadas === totalLecciones && totalLecciones > 0 && (
        <div className="glass-strong rounded-2xl p-6 mt-4 text-center w-full animate-scale-in">
          <p className="text-4xl mb-2">🏆</p>
          <p className="text-lg font-bold text-gradient">¡Módulo completado!</p>
          <p className="text-xs text-gray-500 mt-1">Dominaste Prompt Engineering Profesional</p>
        </div>
      )}
    </div>
  )
}
