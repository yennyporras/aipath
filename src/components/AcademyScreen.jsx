import academyIndex from "../content/academy-index.json"

const NIVEL_COLORS = {
  "Principiante": "#10B981",
  "Intermedio":   "#3B82F6",
  "Técnico":      "#8B5CF6",
  "Avanzado":     "#EF4444",
  "Estratégico":  "#F59E0B",
  "Todos":        "#00D4AA",
}

const FASE_LABELS = {
  1:             { label: "Fase 1",      color: "#10B981" },
  2:             { label: "Fase 2",      color: "#3B82F6" },
  3:             { label: "Fase 3",      color: "#A855F7" },
  "transversal": { label: "Transversal", color: "#F59E0B" },
}

export default function AcademyScreen({ progreso, onSelectModulo }) {
  const completadas = progreso.leccionesCompletadas || []

  const modulos = academyIndex.modulos
  const disponibles = modulos.filter(m => m.estado === "disponible").map(m => m.id)

  // Agrupar por fase para mostrar separadores
  const fases = [
    { key: 1, titulo: "Fase 1 — Funcional", subtitulo: "Prioridad máxima" },
    { key: 2, titulo: "Fase 2 — Sólida",    subtitulo: "Backend + ML clásico" },
    { key: 3, titulo: "Fase 3 — Referente", subtitulo: "Arquitectura profunda" },
    { key: "transversal", titulo: "Transversales", subtitulo: "Desde el inicio" },
  ]

  // XP y lecciones totales globales
  const xpTotal = progreso.xpTotal || 0
  const nivel = Math.floor(xpTotal / 300) + 1

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
          AIPath · Academia de IA
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
          17 módulos · ~1,400 lecciones · De cero a referente mundial
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
          <p className="text-lg font-bold text-gradient">{xpTotal.toLocaleString()}</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>XP total</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gradient">{nivel}</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Nivel</p>
        </div>
      </div>

      {/* Módulos agrupados por fase */}
      {fases.map(fase => {
        const modulosFase = modulos.filter(m => m.fase === fase.key)
        return (
          <div key={fase.key} className="mb-8">
            {/* Separador de fase */}
            <div className="flex items-center gap-3 mb-3 animate-reveal">
              <div
                className="h-px flex-1"
                style={{ background: `${FASE_LABELS[fase.key].color}40` }}
              />
              <div className="text-center">
                <span
                  className="font-display text-[10px] font-bold uppercase tracking-[0.2em] px-2"
                  style={{ color: FASE_LABELS[fase.key].color }}
                >
                  {fase.titulo}
                </span>
                <span
                  className="ml-2 text-[10px]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  · {fase.subtitulo}
                </span>
              </div>
              <div
                className="h-px flex-1"
                style={{ background: `${FASE_LABELS[fase.key].color}40` }}
              />
            </div>

            {/* Grid de módulos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {modulosFase.map((modulo, mi) => {
                const disponible = modulo.estado === "disponible"
                const doneCount = completadas.filter(id => id.startsWith(modulo.id + "-")).length
                const faseInfo = FASE_LABELS[modulo.fase]

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
                    style={{ animationDelay: `${mi * 50}ms` }}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: disponible ? `${modulo.color}18` : "rgba(255,255,255,0.04)" }}
                      >
                        {disponible ? modulo.icono : "🔒"}
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
                      <p
                        className="font-display text-xs font-bold leading-tight"
                        style={{ color: disponible ? "var(--color-text-primary)" : "var(--color-text-muted)" }}
                      >
                        M{modulo.numero} — {modulo.titulo}
                      </p>
                      <p
                        className="text-[11px] mt-1 leading-relaxed line-clamp-2"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {modulo.descripcion}
                      </p>
                    </div>

                    {/* Footer stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>
                          {modulo.lecciones_total} lecciones
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
                            width: `${modulo.lecciones_total > 0 ? (doneCount / modulo.lecciones_total) * 100 : 0}%`,
                            background: `linear-gradient(90deg, ${modulo.color || "var(--color-accent-blue)"}, ${modulo.color || "var(--color-accent-green)"}88)`
                          }}
                        />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      <p
        className="text-center mt-4 mb-8 text-xs animate-reveal"
        style={{ color: "var(--color-text-muted)" }}
      >
        Nuevos módulos se activan cada semana
      </p>
    </div>
  )
}
