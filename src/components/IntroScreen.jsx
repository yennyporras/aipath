import { useState, useRef } from "react"

const BLOCK_ICONS_BG = [
  "from-cyan-500/15 to-cyan-600/5",
  "from-sky-500/15 to-sky-600/5",
  "from-teal-500/15 to-teal-600/5",
  "from-blue-500/15 to-blue-600/5",
  "from-cyan-500/15 to-cyan-600/5",
  "from-emerald-500/15 to-emerald-600/5",
  "from-teal-500/15 to-teal-600/5",
  "from-sky-500/15 to-sky-600/5",
  "from-cyan-500/15 to-cyan-600/5",
]

export default function IntroScreen({ modulo, progreso, onSelectBlock, onVolverAcademy, mostrarProyectoCert = false }) {
  const bloques = modulo.bloques
  const completadas = progreso.leccionesCompletadas || []
  const fasesProyecto = progreso.fasesProyecto || []
  const certAprobada = progreso.certificacionAprobada || false
  const todas = bloques.flatMap(b => b.lecciones)
  const totalDone = todas.filter(l => completadas.includes(l.id)).length
  const totalLecciones = todas.length

  const todosBloquesCompletos = bloques.every(b => b.lecciones.every(l => completadas.includes(l.id)))
  const tieneBossBattle = !!modulo.boss_battle
  const bossBattleAprobado = completadas.includes("m1-boss-battle")

  const [toastVisible, setToastVisible] = useState(false)
  const toastTimerRef = useRef(null)

  function mostrarToastBloqueado() {
    setToastVisible(true)
    clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000)
  }

  function bloqueDesbloqueado(bi) {
    if (bi === 0) return true
    return bloques[bi - 1].lecciones.every(l => completadas.includes(l.id))
  }

  return (
    <div className="w-full max-w-2xl lg:max-w-4xl mx-auto px-2 relative z-10">
      {/* Volver a academia — solo móvil */}
      {onVolverAcademy && (
        <button
          onClick={onVolverAcademy}
          className="lg:hidden text-xs mb-4 flex items-center gap-1 transition-colors animate-reveal min-h-[44px] -mx-2 px-2"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
        >
          ← Todos los módulos
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8 lg:mb-6">
        <div className="animate-reveal mb-5 lg:hidden">
          <div className="aipath-logo justify-center">
            <span className="logo-text">AI</span>
            <span className="logo-accent">Path</span>
          </div>
        </div>
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] animate-reveal"
          style={{ color: "var(--color-text-muted)", animationDelay: "80ms" }}>
          {modulo.id ? `Módulo ${modulo.numero ?? ""}` : "Módulo"}
        </p>
        <h2 className="font-display text-3xl font-extrabold mt-2 animate-reveal"
          style={{ animationDelay: "120ms", color: "#06B6D4" }}>
          {modulo.title || modulo.titulo}
        </h2>
        <p className="text-sm mt-2 animate-reveal" style={{ color: "var(--color-text-secondary)", animationDelay: "160ms" }}>
          {modulo.descripcion || "Tu ruta al dominio de la Inteligencia Artificial"}
        </p>
      </div>

      {/* Progress */}
      <div className="max-w-md mx-auto surface rounded-2xl p-5 mb-8 animate-reveal" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>Progreso</span>
          <span className="font-display text-xs font-bold" style={{ color: "#06B6D4" }}>{totalDone}/{todas.length}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${todas.length > 0 ? (totalDone / todas.length) * 100 : 0}%` }} />
        </div>
        <div className="flex justify-between mt-2.5" style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>
          <span style={{ color: "#F59E0B" }}>{progreso.xpTotal || 0} XP</span>
          <span>Nivel {Math.floor((progreso.xpTotal || 0) / 300) + 1}</span>
        </div>
      </div>

      {/* Block grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger">
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
              onClick={() => { if (!unlocked) { mostrarToastBloqueado(); return } onSelectBlock(bloque) }}
              disabled={false}
              className={`animate-reveal text-left h-[120px] lg:h-[130px] flex items-center gap-4 p-4 lg:p-5 ${
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
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{ll.length} lecciones</span>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>·</span>
                  <span style={{ fontSize: "12px", color: "#F59E0B" }}>{xpTotal} XP</span>
                </div>
                {unlocked && (
                  <div className="progress-bar mt-2.5">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
              <span style={{ fontSize: "11px", color: complete ? "#10B981" : "#06B6D4" }}>
                {complete ? "✓" : unlocked ? "→" : ""}
              </span>
            </button>
          )
        })}
      </div>

      {/* Boss Battle — M1 */}
      {tieneBossBattle && totalLecciones > 0 && (
        <button
          onClick={() => todosBloquesCompletos && onSelectBlock({ id: "boss_battle" })}
          disabled={!todosBloquesCompletos}
          className={`animate-reveal w-full text-left flex items-center gap-4 p-4 mt-3 rounded-2xl transition-all ${
            todosBloquesCompletos
              ? "surface-interactive cursor-pointer"
              : "opacity-40 cursor-not-allowed border border-white/4"
          }`}
          style={{
            animationDelay: `${240 + bloques.length * 80}ms`,
            ...(todosBloquesCompletos && !bossBattleAprobado
              ? { border: "1px solid rgba(245,158,11,0.25)", boxShadow: "0 0 24px rgba(245,158,11,0.08)" }
              : {}),
            ...(bossBattleAprobado
              ? { border: "1px solid rgba(6,182,212,0.25)" }
              : {})
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: bossBattleAprobado ? "rgba(6,182,212,0.15)" : "rgba(245,158,11,0.15)" }}
          >
            {!todosBloquesCompletos ? "🔒" : bossBattleAprobado ? "🏆" : "⚔️"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-bold" style={{ color: bossBattleAprobado ? "#06B6D4" : "#F59E0B" }}>
              Boss Battle: M1 Master
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>20 preguntas · 45 min</span>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>·</span>
              <span style={{ fontSize: "12px", color: "#F59E0B" }}>500 XP</span>
            </div>
            {!todosBloquesCompletos && (
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                Completa todos los bloques para desbloquear
              </p>
            )}
            {bossBattleAprobado && (
              <p style={{ fontSize: "12px", color: "#06B6D4", marginTop: "4px" }}>✓ Superado</p>
            )}
          </div>
          <span style={{ fontSize: "11px", color: bossBattleAprobado ? "#06B6D4" : "#F59E0B" }}>
            {bossBattleAprobado ? "✓" : todosBloquesCompletos ? "→" : ""}
          </span>
        </button>
      )}

      {/* Proyecto Final — solo M4 */}
      {mostrarProyectoCert && totalLecciones > 0 && (
        <button
          onClick={() => todosBloquesCompletos && onSelectBlock({ id: "proyecto_final" })}
          disabled={!todosBloquesCompletos}
          className={`animate-reveal w-full text-left flex items-center gap-4 p-4 mt-3 rounded-2xl transition-all ${
            todosBloquesCompletos
              ? "surface-interactive cursor-pointer"
              : "opacity-40 cursor-not-allowed border border-white/4"
          }`}
          style={{ animationDelay: `${240 + bloques.length * 80}ms` }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: "rgba(6,182,212,0.12)" }}
          >
            {!todosBloquesCompletos ? "🔒" : fasesProyecto.length === 5 ? "✅" : "🛠️"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-bold" style={{ color: fasesProyecto.length === 5 ? "#06B6D4" : "var(--color-text-primary)" }}>
              Proyecto Final
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>5 fases · 10h</span>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>·</span>
              <span style={{ fontSize: "12px", color: "#F59E0B" }}>500 XP</span>
            </div>
            {todosBloquesCompletos && (
              <div className="progress-bar mt-2.5">
                <div className="progress-bar-fill" style={{ width: `${(fasesProyecto.length / 5) * 100}%` }} />
              </div>
            )}
          </div>
          <span style={{ fontSize: "11px", color: fasesProyecto.length === 5 ? "#10B981" : "#06B6D4" }}>
            {fasesProyecto.length === 5 ? "✓" : todosBloquesCompletos ? "→" : ""}
          </span>
        </button>
      )}

      {/* Certificación Final — solo M4 */}
      {mostrarProyectoCert && totalLecciones > 0 && (
        <button
          onClick={() => todosBloquesCompletos && onSelectBlock({ id: "certificacion_final" })}
          disabled={!todosBloquesCompletos}
          className={`animate-reveal w-full text-left flex items-center gap-4 p-4 mt-3 rounded-2xl transition-all ${
            todosBloquesCompletos
              ? "surface-interactive cursor-pointer"
              : "opacity-40 cursor-not-allowed border border-white/4"
          }`}
          style={{ animationDelay: `${240 + (bloques.length + 1) * 80}ms` }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: "rgba(245,158,11,0.12)" }}
          >
            {!todosBloquesCompletos ? "🔒" : certAprobada ? "🎓" : "📝"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-bold" style={{ color: certAprobada ? "#F59E0B" : "var(--color-text-primary)" }}>
              Certificación M4
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>60 preguntas · 90 min</span>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>·</span>
              <span style={{ fontSize: "12px", color: "#F59E0B" }}>1000 XP</span>
            </div>
            {certAprobada && (
              <p style={{ fontSize: "12px", color: "#F59E0B", marginTop: "4px" }}>
                ✓ Certificada
              </p>
            )}
          </div>
          <span style={{ fontSize: "11px", color: certAprobada ? "#F59E0B" : "#06B6D4" }}>
            {certAprobada ? "✓" : todosBloquesCompletos ? "→" : ""}
          </span>
        </button>
      )}

      {mostrarProyectoCert && certAprobada && (
        <div className="surface rounded-2xl p-6 mt-8 text-center max-w-md mx-auto animate-scale-in"
          style={{ border: "1px solid rgba(245,158,11,0.3)", boxShadow: "0 0 32px rgba(245,158,11,0.1)" }}>
          <p className="text-4xl mb-2">🏆</p>
          <p className="font-display text-lg font-bold" style={{ color: "#F59E0B" }}>¡M4 completado y certificado!</p>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
            Eres Prompt Engineer Profesional AIPath
          </p>
        </div>
      )}

      {/* Toast — bloque bloqueado */}
      {toastVisible && (
        <div
          className="fixed left-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-medium text-center"
          style={{
            bottom: 88,
            transform: "translateX(-50%)",
            background: "#1E1E35",
            border: "1px solid rgba(6,182,212,0.25)",
            color: "var(--color-text-primary)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            maxWidth: 320,
            width: "calc(100% - 48px)",
            pointerEvents: "none",
          }}
        >
          Completa el bloque anterior para desbloquear este contenido
        </div>
      )}
    </div>
  )
}
