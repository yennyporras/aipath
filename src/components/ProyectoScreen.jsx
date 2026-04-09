import { useState } from "react"
import moduleData from "../content/m4-completo.json"

const proyecto = moduleData.proyecto_final

export default function ProyectoScreen({ progreso, onFaseCompleta, onVolver }) {
  const fasesCompletadas = progreso.fasesProyecto || []
  const [faseAbierta, setFaseAbierta] = useState(null)
  const [confirmando, setConfirmando] = useState(null)

  const totalXpGanado = proyecto.fases
    .filter(f => fasesCompletadas.includes(f.id))
    .reduce((s, f) => s + f.xp, 0)

  const pctCompleto = Math.round((fasesCompletadas.length / proyecto.fases.length) * 100)

  function handleMarcarCompleta(fase) {
    setConfirmando(null)
    setFaseAbierta(null)
    onFaseCompleta(fase)
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-6 animate-fade-in">
      {/* Header */}
      <button
        onClick={onVolver}
        className="text-xs mb-6 flex items-center gap-1 transition-colors"
        style={{ color: "var(--color-text-muted)" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
      >
        ← Volver a bloques
      </button>

      {/* Título */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span
              className="text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block"
              style={{ background: "rgba(0,212,170,0.15)", color: "var(--color-accent-blue)" }}
            >
              PROYECTO FINAL M4
            </span>
            <h1 className="text-xl font-bold text-white leading-tight">
              {proyecto.titulo}
            </h1>
            <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
              {proyecto.descripcion}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="rounded-xl p-3 text-center" style={{ background: "var(--color-surface)" }}>
            <p className="text-lg font-bold" style={{ color: "var(--color-accent-blue)" }}>
              {totalXpGanado}/{proyecto.xp_total}
            </p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>XP ganados</p>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: "var(--color-surface)" }}>
            <p className="text-lg font-bold text-white">{proyecto.tiempo_estimado_horas}h</p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Estimado</p>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: "var(--color-surface)" }}>
            <p className="text-lg font-bold text-white">{fasesCompletadas.length}/{proyecto.fases.length}</p>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Fases</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>
            <span>Progreso del proyecto</span>
            <span>{pctCompleto}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--color-surface)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pctCompleto}%`, background: "var(--color-accent-blue)" }}
            />
          </div>
        </div>
      </div>

      {/* Fases */}
      <div className="space-y-3">
        {proyecto.fases.map((fase, idx) => {
          const completada = fasesCompletadas.includes(fase.id)
          const desbloqueada = idx === 0 || fasesCompletadas.includes(proyecto.fases[idx - 1].id)
          const abierta = faseAbierta === fase.id

          return (
            <div
              key={fase.id}
              className="glass rounded-2xl overflow-hidden transition-all duration-300"
              style={{ opacity: desbloqueada ? 1 : 0.5 }}
            >
              {/* Fase header */}
              <button
                onClick={() => desbloqueada && setFaseAbierta(abierta ? null : fase.id)}
                disabled={!desbloqueada}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                {/* Número / check */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: completada
                      ? "var(--color-accent-blue)"
                      : desbloqueada
                      ? "var(--color-surface)"
                      : "var(--color-border)",
                    color: completada ? "#0A0A0A" : "var(--color-text-secondary)"
                  }}
                >
                  {completada ? "✓" : fase.numero}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">
                    {fase.titulo}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    +{fase.xp} XP · {fase.entregables.length} entregables
                    {completada && " · Completada ✓"}
                    {!desbloqueada && " · Bloqueada"}
                  </p>
                </div>

                {desbloqueada && (
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {abierta ? "▲" : "▼"}
                  </span>
                )}
              </button>

              {/* Fase expandida */}
              {abierta && (
                <div className="px-4 pb-5 space-y-4 animate-fade-in">
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {fase.descripcion}
                  </p>

                  {/* Entregables */}
                  <div>
                    <p className="text-xs font-bold mb-2" style={{ color: "var(--color-accent-blue)" }}>
                      ENTREGABLES
                    </p>
                    <ul className="space-y-2">
                      {fase.entregables.map((e, i) => (
                        <li key={i} className="flex gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                          <span style={{ color: "var(--color-accent-blue)" }}>→</span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Criterios */}
                  <div>
                    <p className="text-xs font-bold mb-2" style={{ color: "var(--color-text-muted)" }}>
                      CRITERIOS DE EVALUACIÓN
                    </p>
                    <ul className="space-y-1">
                      {fase.criterios_evaluacion.map((c, i) => (
                        <li key={i} className="flex gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                          <span>☐</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recursos */}
                  {fase.recursos_recomendados?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold mb-2" style={{ color: "var(--color-text-muted)" }}>
                        RECURSOS
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {fase.recursos_recomendados.map((r, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-lg"
                            style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {!completada && (
                    confirmando === fase.id ? (
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => handleMarcarCompleta(fase)}
                          className="btn-primary flex-1 py-3 rounded-xl text-sm"
                        >
                          Sí, marcar como completa (+{fase.xp} XP)
                        </button>
                        <button
                          onClick={() => setConfirmando(null)}
                          className="px-4 py-3 rounded-xl text-sm"
                          style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmando(fase.id)}
                        className="btn-primary w-full py-3 rounded-xl text-sm mt-2"
                      >
                        Marcar fase como completada →
                      </button>
                    )
                  )}

                  {completada && (
                    <div
                      className="rounded-xl px-4 py-3 text-sm font-semibold text-center"
                      style={{ background: "rgba(0,212,170,0.1)", color: "var(--color-accent-blue)" }}
                    >
                      ✓ Fase completada · +{fase.xp} XP ganados
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Completado todo */}
      {fasesCompletadas.length === proyecto.fases.length && (
        <div
          className="glass rounded-2xl p-6 mt-6 text-center animate-fade-in"
          style={{ border: "1px solid rgba(0,212,170,0.4)" }}
        >
          <p className="text-3xl mb-3">🏆</p>
          <h2 className="text-lg font-bold text-white mb-2">¡Proyecto completado!</h2>
          <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
            Ganaste {proyecto.xp_total} XP. Ya puedes presentarte a la certificación final.
          </p>
          <button onClick={onVolver} className="btn-primary px-8 py-3 rounded-xl text-sm">
            Ir a certificación →
          </button>
        </div>
      )}
    </div>
  )
}
