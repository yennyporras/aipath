export default function TeoriaScreen({ leccion, onContinuar, onVolver }) {
  const t = leccion.contenido.teoria

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <button onClick={onVolver}
        className="text-xs mb-4 flex items-center gap-1 transition-colors"
        style={{ color: "var(--color-text-muted)" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
      >
        ← Volver a lecciones
      </button>

      <div className="surface p-6 flex flex-col gap-5">
        {/* Header */}
        <div>
          <span className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "var(--color-accent-primary)" }}>
            Teoría
          </span>
          <h2 className="font-display text-xl font-bold mt-1"
            style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
            {leccion.titulo}
          </h2>
        </div>

        {/* Explicación */}
        <div className="animate-reveal" style={{ animationDelay: "80ms" }}>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", lineHeight: "1.8" }}>
            {t.explicacion}
          </p>
        </div>

        {/* Analogía */}
        {t.analogia && (
          <div className="animate-reveal rounded-xl p-4"
            style={{
              animationDelay: "160ms",
              background: "rgba(99,102,241,0.05)",
              borderLeft: "3px solid rgba(99,102,241,0.5)"
            }}>
            <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
              style={{ color: "var(--color-accent-primary)" }}>
              💡 Analogía
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t.analogia}
            </p>
          </div>
        )}

        {/* Ejemplo malo vs bueno */}
        {t.ejemplo_malo && t.ejemplo_bueno && (
          <div className="animate-reveal flex flex-col gap-2" style={{ animationDelay: "240ms" }}>
            <p className="text-xs font-bold tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
              Ejemplos
            </p>
            <div className="rounded-xl p-3.5"
              style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#FCA5A5" }}>❌ Incorrecto</p>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                {t.ejemplo_malo}
              </p>
            </div>
            <div className="rounded-xl p-3.5"
              style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#6EE7B7" }}>✅ Correcto</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                {t.ejemplo_bueno}
              </p>
            </div>
          </div>
        )}

        {/* Por qué importa */}
        {t.por_que_importa && (
          <div className="animate-reveal rounded-xl p-4"
            style={{
              animationDelay: "280ms",
              background: "rgba(139,92,246,0.05)",
              border: "1px solid rgba(139,92,246,0.15)"
            }}>
            <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
              style={{ color: "var(--color-accent-secondary)" }}>
              🎯 Por qué importa
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t.por_que_importa}
            </p>
          </div>
        )}

        {/* Tip profesional */}
        {t.tip_profesional && (
          <div className="animate-reveal rounded-xl p-4"
            style={{
              animationDelay: "320ms",
              background: "rgba(245,158,11,0.05)",
              border: "1px solid rgba(245,158,11,0.15)"
            }}>
            <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
              style={{ color: "#F59E0B" }}>
              ⚡ Tip profesional
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t.tip_profesional}
            </p>
          </div>
        )}

        {/* CTA */}
        <button onClick={onContinuar}
          className="btn-primary w-full py-3.5 text-sm animate-reveal"
          style={{ animationDelay: "400ms" }}>
          Entendido, al quiz →
        </button>
      </div>
    </div>
  )
}
