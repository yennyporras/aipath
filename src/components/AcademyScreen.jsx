import academyIndex from "../content/academy-index.json"

const NIVEL_COLORS = {
  "Principiante": "#10B981",
  "Intermedio":   "#3B82F6",
  "Técnico":      "#8B5CF6",
  "Avanzado":     "#EF4444",
  "Estratégico":  "#F59E0B",
  "Todos":        "#00D4AA",
}

export default function AcademyScreen({ progreso, onSelectModulo }) {
  const completadas = progreso.leccionesCompletadas || []

  // Solo M1 y M4 tienen contenido real; el resto está "próximamente"
  const DISPONIBLES = ["m1", "m4"]

  return (
    <div className="w-full max-w-4xl mx-auto px-2 relative z-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="animate-reveal mb-5">
          <img
            src="/etk-logo-white.png"
            alt="Estratek IA Academy"
            className="h-14 w-auto mx-auto opacity-90"
          />
        </div>
        <p
          className="font-display text-[11px] font-bold uppercase tracking-[0.3em] animate-reveal"
          style={{ color: "var(--color-text-muted)", animationDelay: "80ms" }}
        >
          Estratek IA Academy
        </p>
        <h2
          className="font-display text-3xl font-extrabold text-gradient mt-2 animate-reveal"
          style={{ animationDelay: "120ms" }}
        >
          Tu ruta completa en IA
        </h2>
        <p
          className="text-sm mt-2 animate-reveal"
          style={{ color: "var(--color-text-secondary)", animationDelay: "160ms" }}
        >
          10 módulos · 780+ lecciones · De cero a experto
        </p>
      </div>

      {/* Stats globales */}
      <div
        className="max-w-lg mx-auto surface rounded-2xl p-5 mb-8 animate-reveal grid grid-cols-3 gap-4 text-center"
        style={{ animationDelay: "200ms" }}
      >
        <div>
          <p className="text-lg font-bold text-gradient">{completadas.length}</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Lecciones</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient">{progreso.xpTotal || 0}</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>XP total</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient">
            {Math.floor((progreso.xpTotal || 0) / 300) + 1}
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Nivel</p>
        </div>
      </div>

      {/* Grid de módulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {academyIndex.modulos.map((modulo, mi) => {
          const disponible = DISPONIBLES.includes(modulo.id)
          const esMiPropio = modulo.id === "m4"
          // Contar lecciones completadas de este módulo
          const doneCount = completadas.filter(id => id.startsWith(modulo.id + "-") || (esMiPropio && !id.startsWith("m"))).length

          return (
            <button
              key={modulo.id}
              onClick={() => disponible && onSelectModulo(modulo)}
              disabled={!disponible}
              className={`animate-reveal text-left flex flex-col gap-3 p-4 rounded-2xl transition-all ${
                disponible
                  ? "surface-interactive cursor-pointer"
                  : "opacity-40 cursor-not-allowed border border-white/4"
              }`}
              style={{ animationDelay: `${240 + mi * 60}ms` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: disponible ? `${modulo.color}18` : "rgba(255,255,255,0.04)" }}
                >
                  {disponible ? modulo.icon : "🔒"}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: `${NIVEL_COLORS[modulo.nivel] || "#00D4AA"}18`,
                      color: NIVEL_COLORS[modulo.nivel] || "#00D4AA"
                    }}
                  >
                    {modulo.nivel?.toUpperCase()}
                  </span>
                  {!disponible && (
                    <span className="text-[9px]" style={{ color: "var(--color-text-muted)" }}>
                      Próximamente
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-display text-xs font-bold leading-tight" style={{ color: disponible ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                  M{modulo.numero} — {modulo.titulo}
                </p>
                <p className="text-[11px] mt-1 leading-relaxed line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
                  {modulo.descripcion}
                </p>
              </div>

              {/* Footer stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>
                    {modulo.total_lecciones} lecciones
                  </span>
                  <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>·</span>
                  <span style={{ fontSize: "10px", color: modulo.color || "var(--color-accent-blue)" }}>
                    {modulo.xp_total?.toLocaleString()} XP
                  </span>
                </div>
                {disponible && (
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>→</span>
                )}
              </div>

              {/* Progress bar — solo si disponible */}
              {disponible && (
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${modulo.total_lecciones > 0 ? (doneCount / modulo.total_lecciones) * 100 : 0}%`,
                      background: `linear-gradient(90deg, ${modulo.color || "var(--color-accent-blue)"}, ${modulo.color || "var(--color-accent-green)"}88)`
                    }}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>

      <p
        className="text-center mt-8 text-xs animate-reveal"
        style={{ color: "var(--color-text-muted)", animationDelay: "800ms" }}
      >
        Nuevos módulos se activan cada semana
      </p>
    </div>
  )
}
