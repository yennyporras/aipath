import { useState } from "react"
import moduleData from "../content/m4-completo.json"

const cert = moduleData.certificacion_final

const BLOQUE_LABELS = {
  B0: "Fundamentos", B1: "Técnicas esenciales", B2: "Estructuras avanzadas",
  B3: "Casos reales", B4: "Arquitecturas", B5: "Optimización",
  B6: "Seguridad y ética", B7: "Nivel profesional", B8: "Fronteras y futuro",
  INTEGRACION: "Integración"
}

export default function CertificacionScreen({ progreso, onCertAprobada, onVolver }) {
  const yaCertificado = progreso.certificacionAprobada
  const [fase, setFase] = useState("intro") // intro | examen | resultados
  const [indice, setIndice] = useState(0)
  const [seleccion, setSeleccion] = useState(null)
  const [respondida, setRespondida] = useState(false)
  const [correctas, setCorrectas] = useState(0)
  const [historial, setHistorial] = useState([]) // {correcta: bool, pregunta}

  const pregunta = cert.preguntas[indice]
  const total = cert.preguntas.length
  const minAprobacion = cert.min_aprobacion_num || Math.ceil(total * cert.min_aprobacion_pct / 100)

  function handleSeleccionar(idx) {
    if (respondida) return
    setSeleccion(idx)
    setRespondida(true)
    const esCorrecta = idx === pregunta.correcta
    if (esCorrecta) setCorrectas(prev => prev + 1)
    setHistorial(prev => [...prev, { correcta: esCorrecta, pregunta }])
  }

  function handleSiguiente() {
    if (indice < total - 1) {
      setIndice(prev => prev + 1)
      setSeleccion(null)
      setRespondida(false)
    } else {
      setFase("resultados")
      const aprobado = correctas + (seleccion === pregunta.correcta ? 1 : 0) >= minAprobacion
      // nota: correctas ya fue actualizado antes de este render
      if (aprobado) onCertAprobada()
    }
  }

  function handleReintentar() {
    setFase("examen")
    setIndice(0)
    setSeleccion(null)
    setRespondida(false)
    setCorrectas(0)
    setHistorial([])
  }

  const pct = Math.round((indice / total) * 100)

  // ── INTRO ──
  if (fase === "intro") {
    return (
      <div className="w-full max-w-lg mx-auto py-6 animate-fade-in">
        <button
          onClick={onVolver}
          className="text-xs mb-6 flex items-center gap-1 transition-colors"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
        >
          ← Volver a bloques
        </button>

        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-4xl mb-4">🎓</p>
          <span
            className="text-xs font-bold px-2 py-1 rounded-md mb-3 inline-block"
            style={{ background: "rgba(0,212,170,0.15)", color: "var(--color-accent-blue)" }}
          >
            CERTIFICACIÓN OFICIAL
          </span>
          <h1 className="text-xl font-bold text-white mb-3">{cert.titulo}</h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
            {cert.descripcion}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl p-3" style={{ background: "var(--color-surface)" }}>
              <p className="text-lg font-bold text-white">{total}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Preguntas</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: "var(--color-surface)" }}>
              <p className="text-lg font-bold text-white">{cert.min_aprobacion_pct}%</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Mínimo</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: "var(--color-surface)" }}>
              <p className="text-lg font-bold" style={{ color: "var(--color-accent-blue)" }}>
                {cert.xp_aprobacion}
              </p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>XP</p>
            </div>
          </div>

          <div
            className="rounded-xl p-4 mb-6 text-left"
            style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: "#FBBF24" }}>ANTES DE EMPEZAR</p>
            <ul className="space-y-1">
              {[
                `${cert.tiempo_estimado_min} minutos estimados`,
                `Necesitas ${minAprobacion}/${total} correctas para aprobar`,
                "Cada pregunta tiene solo una respuesta correcta",
                "Puedes reintentar si no apruebas",
              ].map((item, i) => (
                <li key={i} className="text-xs flex gap-2" style={{ color: "var(--color-text-muted)" }}>
                  <span style={{ color: "#FBBF24" }}>·</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {yaCertificado ? (
            <div>
              <div
                className="rounded-xl px-4 py-3 mb-4 text-sm font-semibold text-center"
                style={{ background: "rgba(0,212,170,0.1)", color: "var(--color-accent-blue)" }}
              >
                ✓ Ya tienes la certificación M4
              </div>
              <button
                onClick={() => setFase("examen")}
                className="w-full py-3 rounded-xl text-sm"
                style={{ background: "var(--color-surface)", color: "var(--color-text-secondary)" }}
              >
                Repasar el examen de todas formas
              </button>
            </div>
          ) : (
            <button
              onClick={() => setFase("examen")}
              className="btn-primary w-full py-3.5 rounded-xl text-sm"
            >
              Comenzar examen →
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── RESULTADOS ──
  if (fase === "resultados") {
    const totalCorrectas = historial.filter(h => h.correcta).length
    const pctObtenido = Math.round((totalCorrectas / total) * 100)
    const aprobado = totalCorrectas >= minAprobacion
    const incorrectas = historial.filter(h => !h.correcta)

    return (
      <div className="w-full max-w-lg mx-auto py-6 animate-fade-in">
        <div
          className="glass rounded-2xl p-6 text-center mb-6"
          style={aprobado ? { border: "1px solid rgba(0,212,170,0.4)" } : {}}
        >
          <p className="text-4xl mb-3">{aprobado ? "🏆" : "📚"}</p>
          <h2 className="text-xl font-bold text-white mb-1">
            {aprobado ? "¡Certificación aprobada!" : "Casi lo logras"}
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
            {aprobado
              ? `Obtuviste ${totalCorrectas}/${total} correctas. ¡Eres Prompt Engineer certificado M4!`
              : `Obtuviste ${totalCorrectas}/${total} correctas. Necesitabas ${minAprobacion}.`}
          </p>

          {/* Score ring visual */}
          <div className="flex justify-center mb-4">
            <div
              className="w-28 h-28 rounded-full flex flex-col items-center justify-center"
              style={{
                background: `conic-gradient(${aprobado ? "var(--color-accent-blue)" : "#F59E0B"} ${pctObtenido * 3.6}deg, var(--color-surface) 0deg)`,
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex flex-col items-center justify-center"
                style={{ background: "var(--color-bg)" }}
              >
                <p className="text-2xl font-bold text-white">{pctObtenido}%</p>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>score</p>
              </div>
            </div>
          </div>

          {aprobado && (
            <div
              className="rounded-xl px-4 py-3 mb-4 text-sm font-semibold"
              style={{ background: "rgba(0,212,170,0.1)", color: "var(--color-accent-blue)" }}
            >
              +{cert.xp_aprobacion} XP acreditados
            </div>
          )}

          <div className="flex gap-3">
            {!aprobado && (
              <button
                onClick={handleReintentar}
                className="btn-primary flex-1 py-3 rounded-xl text-sm"
              >
                Reintentar →
              </button>
            )}
            <button
              onClick={onVolver}
              className={`py-3 rounded-xl text-sm ${aprobado ? "btn-primary flex-1" : "px-6"}`}
              style={aprobado ? {} : { background: "var(--color-surface)", color: "var(--color-text-muted)" }}
            >
              {aprobado ? "Finalizar M4 ✓" : "Estudiar más"}
            </button>
          </div>
        </div>

        {/* Repaso de errores */}
        {incorrectas.length > 0 && (
          <div className="glass rounded-2xl p-5">
            <p className="text-sm font-bold text-white mb-4">
              Preguntas a repasar ({incorrectas.length})
            </p>
            <div className="space-y-4">
              {incorrectas.map((h, i) => (
                <div key={i} className="text-sm">
                  <p className="font-medium text-white mb-1">{h.pregunta.pregunta}</p>
                  <p
                    className="text-xs px-3 py-2 rounded-lg mb-1"
                    style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                  >
                    ✓ {h.pregunta.opciones[h.pregunta.correcta]}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {h.pregunta.explicacion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── EXAMEN ──
  return (
    <div className="w-full max-w-lg mx-auto py-6 animate-fade-in">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-surface)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: "var(--color-accent-blue)" }}
          />
        </div>
        <span className="text-xs font-medium whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>
          {indice + 1} / {total}
        </span>
      </div>

      {/* Bloque origen */}
      <div className="glass rounded-2xl p-5">
        <span
          className="text-xs px-2 py-0.5 rounded mb-3 inline-block"
          style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}
        >
          {BLOQUE_LABELS[pregunta.bloque_origen] || pregunta.bloque_origen}
        </span>

        <p className="text-base font-semibold text-white mb-5 leading-snug">
          {pregunta.pregunta}
        </p>

        <div className="space-y-2">
          {pregunta.opciones.map((op, idx) => {
            let bg = "var(--color-surface)"
            let border = "transparent"
            let color = "var(--color-text-secondary)"

            if (respondida) {
              if (idx === pregunta.correcta) {
                bg = "rgba(16,185,129,0.12)"
                border = "#10B981"
                color = "#10B981"
              } else if (idx === seleccion && idx !== pregunta.correcta) {
                bg = "rgba(239,68,68,0.1)"
                border = "#EF4444"
                color = "#EF4444"
              }
            } else if (seleccion === idx) {
              bg = "rgba(0,212,170,0.1)"
              border = "var(--color-accent-blue)"
              color = "var(--color-accent-blue)"
            }

            return (
              <button
                key={idx}
                onClick={() => handleSeleccionar(idx)}
                disabled={respondida}
                className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  color,
                }}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                {op}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {respondida && (
          <div
            className="mt-4 px-4 py-3 rounded-xl text-sm animate-fade-in"
            style={{
              background: seleccion === pregunta.correcta ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
              color: seleccion === pregunta.correcta ? "#10B981" : "#EF4444"
            }}
          >
            {seleccion === pregunta.correcta ? "✓ Correcto — " : "✗ Incorrecto — "}
            <span style={{ color: "var(--color-text-muted)" }}>{pregunta.explicacion}</span>
          </div>
        )}
      </div>

      {/* Siguiente */}
      {respondida && (
        <div className="flex justify-center mt-5 animate-slide-up">
          <button
            onClick={handleSiguiente}
            className="btn-primary px-8 py-3.5 rounded-xl text-sm"
          >
            {indice < total - 1 ? "Siguiente →" : "Ver resultados →"}
          </button>
        </div>
      )}
    </div>
  )
}
