const BLOCK_ICONS_BG = [
  "from-blue-500/15 to-blue-600/5",
  "from-indigo-500/15 to-indigo-600/5",
  "from-violet-500/15 to-violet-600/5",
  "from-purple-500/15 to-purple-600/5",
  "from-cyan-500/15 to-cyan-600/5",
  "from-emerald-500/15 to-emerald-600/5",
]

export default function IntroScreen({ modulo, progreso, onSelectBlock }) {
  const bloques = modulo.bloques
  const completadas = progreso.leccionesCompletadas || []
  const todas = bloques.flatMap(b => b.lecciones)
  const totalDone = completadas.length

  function bloqueDesbloqueado(bi) {
    if (bi === 0) return true
    return bloques[bi - 1].lecciones.every(l => completadas.includes(l.id))
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 relative z-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="animate-reveal mb-5">
          <img src="/etk-logo-white.png" alt="Estratek IA Academy" className="h-14 w-auto mx-auto opacity-90" />
        </div>
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] animate-reveal"
          style={{ color: "var(--color-text-muted)", animationDelay: "80ms" }}>
          Módulo 4
        </p>
        <h2 className="font-display text-3xl font-extrabold text-gradient mt-2 animate-reveal"
          style={{ animationDelay: "120ms" }}>
          {modulo.title}
        </h2>
        <p className="text-sm mt-2 animate-reveal" style={{ color: "var(--color-text-secondary)", animationDelay: "160ms" }}>
          Tu ruta al dominio de la Inteligencia Artificial
        </p>
      </div>

      {/* Progress */}
      <div className="max-w-md mx-auto surface rounded-2xl p-5 mb-8 animate-reveal" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>Progreso</span>
          <span className="font-display text-xs font-bold text-gradient">{totalDone}/{todas.length}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${todas.length > 0 ? (totalDone / todas.length) * 100 : 0}%` }} />
        </div>
        <div className="flex justify-between mt-2.5" style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>
          <span>{progreso.xpTotal || 0} XP</span>
          <span>Nivel {Math.floor((progreso.xpTotal || 0) / 300) + 1}</span>
        </div>
      </div>

      {/* Block grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger">
        {bloques.map((bloque, bi) => {
          const ll = bloque.lecciones
          const done = ll.filter(l => completadas.includes(l.id)).length
          const complete = done === ll.length && ll.length > 0
          const unlocked = bloqueDesbloqueado(bi)
          const xpTotal = ll.reduce((s, l) => s + l.xp, 0)
          const pct = ll.length > 0 ? (done / ll.length) * 100 : 0

          return (
            <button
              key={bloque.id}
              onClick={() => unlocked && onSelectBlock(bloque)}
              disabled={!unlocked}
              className={`animate-reveal text-left h-[120px] flex items-center gap-4 p-4 ${
                unlocked
                  ? "surface-interactive cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              } ${!unlocked ? "border border-white/4 rounded-2xl" : ""} ${complete ? "border-green-500/20" : ""}`}
              style={{ animationDelay: `${240 + bi * 80}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${BLOCK_ICONS_BG[bi % BLOCK_ICONS_BG.length]} flex items-center justify-center text-2xl shrink-0`}>
                {!unlocked ? "🔒" : complete ? "✅" : bloque.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-bold truncate" style={{ color: complete ? "#10B981" : "var(--color-text-primary)" }}>
                  {bloque.nombre}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>{ll.length} lecciones</span>
                  <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>·</span>
                  <span style={{ fontSize: "10px", color: "var(--color-accent-blue)" }}>{xpTotal} XP</span>
                </div>
                {unlocked && (
                  <div className="progress-bar mt-2.5">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
              <span style={{ fontSize: "11px", color: complete ? "#10B981" : "var(--color-text-muted)" }}>
                {complete ? "✓" : unlocked ? "→" : ""}
              </span>
            </button>
          )
        })}
      </div>

      {totalDone === todas.length && todas.length > 0 && (
        <div className="surface rounded-2xl p-6 mt-8 text-center max-w-md mx-auto animate-scale-in">
          <p className="text-4xl mb-2">🏆</p>
          <p className="font-display text-lg font-bold text-gradient">¡Módulo completado!</p>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
            Dominaste Prompt Engineering Profesional
          </p>
        </div>
      )}
    </div>
  )
}
