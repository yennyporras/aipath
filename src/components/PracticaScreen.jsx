import { useState } from "react"

const TIPO_LABELS = {
  reescribir: "Reescribe el prompt",
  completar: "Completa el prompt",
  identificar: "Identifica el problema",
  caso_real: "Caso real"
}

export default function PracticaScreen({ leccion, onSiguiente }) {
  const [verSolucion, setVerSolucion] = useState(false)
  const p = leccion.contenido.practica

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="surface p-6 flex flex-col gap-5">
        {/* Header */}
        <div>
          <span className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "var(--color-accent-blue)" }}>
            Práctica
          </span>
          <h2 className="font-display text-lg font-bold mt-1"
            style={{ color: "var(--color-text-primary)" }}>
            {TIPO_LABELS[p.tipo] || p.tipo}
          </h2>
        </div>

        {/* Contexto */}
        <div className="animate-reveal rounded-xl p-4"
          style={{
            animationDelay: "80ms",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--color-border)"
          }}>
          <p className="text-xs font-bold mb-1.5 tracking-wide uppercase"
            style={{ color: "var(--color-text-muted)" }}>
            Contexto
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {p.contexto}
          </p>
        </div>

        {/* Instrucción */}
        <div className="animate-reveal" style={{ animationDelay: "160ms" }}>
          <p className="text-sm font-semibold leading-relaxed"
            style={{ color: "var(--color-text-primary)" }}>
            {p.instruccion}
          </p>
        </div>

        {/* Input malo */}
        {p.input_malo && (
          <div className="animate-reveal rounded-xl p-3.5"
            style={{
              animationDelay: "240ms",
              background: "rgba(239,68,68,0.05)",
              border: "1px solid rgba(239,68,68,0.15)"
            }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#FCA5A5" }}>❌ Prompt a mejorar</p>
            <p className="text-sm font-mono" style={{ color: "var(--color-text-secondary)" }}>
              {p.input_malo}
            </p>
          </div>
        )}

        {/* Pista */}
        {p.pista && !verSolucion && (
          <div className="animate-reveal rounded-xl p-3.5"
            style={{
              animationDelay: "320ms",
              background: "rgba(251,191,36,0.05)",
              border: "1px solid rgba(251,191,36,0.15)"
            }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#FBBF24" }}>💡 Pista</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {p.pista}
            </p>
          </div>
        )}

        {/* Solución (oculta hasta clic) */}
        {verSolucion && (
          <div className="animate-reveal flex flex-col gap-3" style={{ animationDelay: "0ms" }}>
            <div className="rounded-xl p-4"
              style={{
                background: "rgba(0,212,170,0.05)",
                border: "1px solid rgba(0,212,170,0.2)"
              }}>
              <p className="text-xs font-bold mb-2 tracking-wide uppercase"
                style={{ color: "var(--color-accent-blue)" }}>
                ✅ Solución modelo
              </p>
              <p className="text-sm font-mono leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}>
                {p.solucion}
              </p>
            </div>

            {p.criterios_de_exito && p.criterios_de_exito.length > 0 && (
              <div className="rounded-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--color-border)"
                }}>
                <p className="text-xs font-bold mb-2 tracking-wide uppercase"
                  style={{ color: "var(--color-text-muted)" }}>
                  Criterios de éxito
                </p>
                <ul className="flex flex-col gap-1.5">
                  {p.criterios_de_exito.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--color-text-secondary)" }}>
                      <span style={{ color: "var(--color-accent-blue)", marginTop: "2px" }}>✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-col gap-2.5 animate-reveal" style={{ animationDelay: "400ms" }}>
          {!verSolucion && (
            <button
              onClick={() => setVerSolucion(true)}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/6"
              style={{
                border: "1px solid var(--color-border-active)",
                color: "var(--color-accent-blue)",
                background: "rgba(0,212,170,0.05)"
              }}
            >
              Ver solución
            </button>
          )}
          <button
            onClick={onSiguiente}
            className="btn-primary w-full py-3.5 text-sm"
          >
            Siguiente lección →
          </button>
        </div>
      </div>
    </div>
  )
}
