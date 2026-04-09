export default function TeoriaScreen({ leccion, onContinuar, onVolver }) {
  const t = leccion.contenido.teoria

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <button
        onClick={onVolver}
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
            style={{ color: "var(--color-accent-blue)" }}>
            Teoría
          </span>
          <h2 className="font-display text-xl font-bold mt-1"
            style={{ color: "var(--color-text-primary)" }}>
            {leccion.titulo}
          </h2>
        </div>

        {/* Explicación */}
        <div className="animate-reveal" style={{ animationDelay: "80ms" }}>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {t.explicacion}
          </p>
        </div>

        {/* Analogía */}
        {t.analogia && (
          <div className="animate-reveal rounded-xl p-4"
            style={{
              animationDelay: "160ms",
              background: "rgba(0,212,170,0.05)",
              border: "1px solid rgba(0,212,170,0.15)"
            }}>
            <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
              style={{ color: "var(--color-accent-blue)" }}>
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
            <p className="text-xs font-bold tracking-wide uppercase"
              style={{ color: "var(--color-text-muted)" }}>
              Ejemplos
            </p>
            <div className="rounded-xl p-3.5"
              style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#FCA5A5" }}>❌ Prompt vago</p>
              <p className="text-sm font-mono" style={{ color: "var(--color-text-secondary)" }}>
                {t.ejemplo_malo}
              </p>
            </div>
            <div className="rounded-xl p-3.5"
              style={{ background: "rgba(0,212,170,0.05)", border: "1px solid rgba(0,212,170,0.15)" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#6EE7B7" }}>✅ Prompt efectivo</p>
              <p className="text-sm font-mono leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {t.ejemplo_bueno}
              </p>
            </div>
          </div>
        )}

        {/* Tip profesional */}
        {t.tip_profesional && (
          <div className="animate-reveal rounded-xl p-4"
            style={{
              animationDelay: "320ms",
              background: "rgba(251,191,36,0.05)",
              border: "1px solid rgba(251,191,36,0.15)"
            }}>
            <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
              style={{ color: "#FBBF24" }}>
              ⚡ Tip profesional
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {t.tip_profesional}
            </p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onContinuar}
          className="btn-primary w-full py-3.5 text-sm animate-reveal"
          style={{ animationDelay: "400ms" }}
        >
          Entendido, vamos →
        </button>
      </div>
    </div>
  )
}
