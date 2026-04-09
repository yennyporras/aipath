// BlockLessons — lista de lecciones de un bloque específico con botón volver
export default function BlockLessons({ bloque, todasLecciones, progreso, onSelectLesson, onVolver }) {
  const completadas = progreso.leccionesCompletadas || []
  const lecciones = bloque.lecciones
  const completadasBloque = lecciones.filter(l => completadas.includes(l.id)).length
  const xpBloque = lecciones.reduce((s, l) => s + l.xp, 0)

  function estaDesbloqueada(leccionId) {
    const idx = todasLecciones.findIndex(l => l.id === leccionId)
    if (idx === 0) return true
    return completadas.includes(todasLecciones[idx - 1].id)
  }

  return (
    <div className="w-full max-w-lg mx-auto relative z-10">
      {/* Header del bloque */}
      <button
        onClick={onVolver}
        className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-4 flex items-center gap-1.5 animate-slide-down"
      >
        ← Volver a bloques
      </button>

      <div className="glass-strong rounded-2xl p-5 mb-5 animate-slide-up">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl shrink-0">
            {bloque.icon}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-100">{bloque.nombre}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{bloque.descripcion}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-gray-500">
          <span>{completadasBloque}/{lecciones.length} completadas</span>
          <span>·</span>
          <span>{xpBloque} XP disponibles</span>
        </div>
        <div className="progress-thick mt-3">
          <div className="progress-thick-fill" style={{ width: `${lecciones.length > 0 ? (completadasBloque / lecciones.length) * 100 : 0}%` }} />
        </div>
      </div>

      {/* Lista de lecciones */}
      <div className="flex flex-col gap-2">
        {lecciones.map((leccion, i) => {
          const completada = completadas.includes(leccion.id)
          const desbloqueada = estaDesbloqueada(leccion.id)
          const tipoIcon = leccion.tipo === "practica" ? "🔬" : leccion.tipo === "evaluacion" ? "📝" : "📖"

          return (
            <button
              key={leccion.id}
              onClick={() => desbloqueada && onSelectLesson(leccion)}
              disabled={!desbloqueada}
              className={`animate-slide-up w-full text-left rounded-xl px-4 py-3.5 flex items-center gap-3 transition-all duration-200 ${
                desbloqueada
                  ? completada
                    ? "glass border border-green-500/15 hover:border-green-500/30"
                    : "glass-card cursor-pointer"
                  : "opacity-40 cursor-not-allowed bg-white/2 border border-white/4 rounded-xl"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 ${
                completada ? "bg-green-500/15" : desbloqueada ? "bg-blue-500/10" : "bg-white/3"
              }`}>
                {completada ? "✅" : desbloqueada ? tipoIcon : "🔒"}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${desbloqueada ? "text-gray-200" : "text-gray-600"}`}>
                  {leccion.titulo}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] ${desbloqueada ? "text-gray-500" : "text-gray-700"}`}>
                    {leccion.duracion_min} min
                  </span>
                  <span className="text-[10px] text-gray-700">·</span>
                  <span className={`text-[10px] ${desbloqueada ? "text-blue-400/70" : "text-gray-700"}`}>
                    {leccion.xp} XP
                  </span>
                  {leccion.tipo !== "leccion" && (
                    <>
                      <span className="text-[10px] text-gray-700">·</span>
                      <span className="text-[10px] text-purple-400/70">
                        {leccion.tipo === "practica" ? "Laboratorio" : "Evaluación"}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span className={`text-xs shrink-0 ${completada ? "text-green-500" : desbloqueada ? "text-gray-600" : ""}`}>
                {completada ? "✓" : desbloqueada ? "→" : ""}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
