export default function BlockLessons({ bloque, todasLecciones, progreso, onSelectLesson, onVolver }) {
  const completadas = progreso.leccionesCompletadas || []
  const lecciones = bloque.lecciones
  const done = lecciones.filter(l => completadas.includes(l.id)).length
  const xpTotal = lecciones.reduce((s, l) => s + l.xp, 0)

  function estaDesbloqueada(leccionId) {
    const idx = todasLecciones.findIndex(l => l.id === leccionId)
    if (idx === 0) return true
    return completadas.includes(todasLecciones[idx - 1].id)
  }

  return (
    <div className="w-full max-w-lg mx-auto relative z-10">
      <button onClick={onVolver}
        className="text-xs font-medium mb-4 flex items-center gap-1.5 animate-reveal transition-colors min-h-[44px] -mx-2 px-2"
        style={{ color: "var(--color-text-muted)" }}
        onMouseEnter={e => e.target.style.color = "var(--color-text-secondary)"}
        onMouseLeave={e => e.target.style.color = "var(--color-text-muted)"}>
        ← Bloques
      </button>

      {/* Block header */}
      <div className="surface rounded-2xl p-5 mb-5 animate-reveal">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/15 to-purple-500/10 flex items-center justify-center text-3xl shrink-0">
            {bloque.icon}
          </div>
          <div>
            <h2 className="font-display text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
              {bloque.nombre}
            </h2>
            <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px" }}>
              {bloque.descripcion}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3" style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
          <span>{done}/{lecciones.length} completadas</span>
          <span>·</span>
          <span>{xpTotal} XP</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${lecciones.length > 0 ? (done / lecciones.length) * 100 : 0}%` }} />
        </div>
      </div>

      {/* Lessons */}
      <div className="flex flex-col gap-2 stagger">
        {lecciones.map((leccion, i) => {
          const completada = completadas.includes(leccion.id)
          const desbloqueada = estaDesbloqueada(leccion.id)
          const icon = leccion.tipo === "practica" ? "🔬" : leccion.tipo === "evaluacion" ? "📝" : "📖"

          return (
            <button
              key={leccion.id}
              onClick={() => desbloqueada && onSelectLesson(leccion)}
              disabled={!desbloqueada}
              className={`animate-reveal w-full text-left flex items-center gap-3 p-3.5 ${
                desbloqueada
                  ? completada
                    ? "surface border-green-500/15"
                    : "surface-interactive cursor-pointer"
                  : "opacity-35 cursor-not-allowed border border-white/4 rounded-2xl"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                style={{ background: completada ? "rgba(16,185,129,0.1)" : desbloqueada ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)" }}>
                {completada ? "✅" : desbloqueada ? icon : "🔒"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate"
                  style={{ color: desbloqueada ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                  {leccion.titulo}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{leccion.duracion_min} min</span>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>·</span>
                  <span style={{ fontSize: "12px", color: desbloqueada ? "var(--color-accent-blue)" : "var(--color-text-muted)" }}>{leccion.xp} XP</span>
                  {leccion.tipo !== "leccion" && (
                    <>
                      <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>·</span>
                      <span style={{ fontSize: "12px", color: "#0891B2" }}>
                        {leccion.tipo === "practica" ? "Lab" : "Eval"}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <span style={{ fontSize: "11px", color: completada ? "#10B981" : desbloqueada ? "var(--color-text-muted)" : "transparent" }}>
                {completada ? "✓" : "→"}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
