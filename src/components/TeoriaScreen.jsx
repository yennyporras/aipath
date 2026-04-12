import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "../utils/sounds"
import LeccionProgressBar from "./LeccionProgressBar"

// Divide el texto en segmentos conceptuales usando "---" como separador.
// Dentro de cada segmento, \n\n produce párrafos separados.
// Si no hay "---", todo el texto queda en un único segmento (fallback seguro).
function buildPages(texto) {
  if (!texto) return [[]]
  const segmentos = texto.split(/\n\s*---\s*\n/).map(s => s.trim()).filter(Boolean)
  if (segmentos.length === 0) return [[texto]]
  return segmentos.map(seg =>
    seg.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
  )
}

// Garantiza máximo MAX_SEGS segmentos fusionando los pares adyacentes más cortos.
// El segmento de Analogía (siempre el último, añadido aparte) no cuenta aquí.
const MAX_SEGS = 5
function limitPages(paginas) {
  if (paginas.length <= MAX_SEGS) return paginas
  let pages = paginas.map(segs => [...segs])
  while (pages.length > MAX_SEGS) {
    // Encontrar el par adyacente con menor suma de palabras
    let bestI = 0
    let bestSum = Infinity
    for (let i = 0; i < pages.length - 1; i++) {
      const sum = pages[i].join(" ").split(/\s+/).length +
                  pages[i + 1].join(" ").split(/\s+/).length
      if (sum < bestSum) { bestSum = sum; bestI = i }
    }
    pages = [
      ...pages.slice(0, bestI),
      [...pages[bestI], ...pages[bestI + 1]],
      ...pages.slice(bestI + 2),
    ]
  }
  return pages
}

// Barra de progreso de lección: 4 pasos

export default function TeoriaScreen({ leccion, onContinuar, onVolver }) {
  const t = leccion.contenido.teoria
  const [pagina, setPagina] = useState(0)

  // Resetear página al cambiar de lección
  useEffect(() => {
    setPagina(0)
  }, [leccion.id])

  const paginas      = useMemo(() => limitPages(buildPages(t.explicacion)), [t.explicacion])
  const numConceptos = paginas.length
  const tieneAnalogia = !!t.analogia

  // Total de pasos: segmentos de explicación + 1 si hay analogía
  const totalPaginas      = numConceptos + (tieneAnalogia ? 1 : 0)
  const esSegmentoAnalogia = tieneAnalogia && pagina === numConceptos
  const esUltimoConcepto   = pagina === numConceptos - 1
  const esUltima           = pagina === totalPaginas - 1

  function siguiente() {
    if (pagina < totalPaginas - 1) {
      playSound("click")
      setPagina(p => p + 1)
    }
  }

  function anterior() {
    if (pagina > 0) {
      playSound("click")
      setPagina(p => p - 1)
    }
  }

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <button onClick={() => { playSound("click"); onVolver() }}
        className="text-xs mb-2 flex items-center gap-1 transition-colors min-h-[44px] -mx-2 px-2"
        style={{ color: "var(--color-text-muted)" }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
      >
        ← Volver a lecciones
      </button>

      {/* Barra de progreso lección */}
      <LeccionProgressBar paso={0} />

      <div className="surface p-6 flex flex-col gap-5">
        {/* Encabezado */}
        <div>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#06B6D4" }}>
            Teoría
          </span>
          <h2 className="font-display text-xl font-bold mt-1"
            style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
            {leccion.titulo}
          </h2>
        </div>

        {/* Indicador de progreso con puntos navegables */}
        {totalPaginas > 1 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold"
              style={{ color: esSegmentoAnalogia ? "#F59E0B" : "#06B6D4" }}>
              {esSegmentoAnalogia
                ? "💡 Analogía"
                : `Concepto ${pagina + 1} de ${numConceptos}`}
            </span>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPaginas }, (_, i) => {
                const isAnalogiaPoint = tieneAnalogia && i === numConceptos
                const isActive = i === pagina
                const isPast   = i < pagina
                return (
                  <motion.button
                    key={i}
                    onClick={() => { playSound("click"); setPagina(i) }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width:  isActive ? "20px" : "8px",
                      height: "8px",
                      background: isActive
                        ? (isAnalogiaPoint ? "#F59E0B" : "#06B6D4")
                        : isPast
                          ? "transparent"
                          : "rgba(255,255,255,0.15)",
                      border: isActive
                        ? "none"
                        : isPast
                          ? `1.5px solid ${isAnalogiaPoint ? "#F59E0B" : "#06B6D4"}`
                          : "1.5px solid rgba(255,255,255,0.2)",
                      flexShrink: 0,
                    }}
                    aria-label={`Ir al ${isAnalogiaPoint ? "analogía" : `concepto ${i + 1}`}`}
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* Contenido principal — animado al cambiar de página */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pagina}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            {esSegmentoAnalogia ? (
              /* Segmento de analogía: card ámbar mejorada */
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(245,158,11,0.05)",
                  border: "2px solid rgba(245,158,11,0.55)",
                }}
              >
                <p className="font-bold mb-2 tracking-wide uppercase flex items-center gap-2"
                  style={{ color: "#F59E0B", fontSize: "11px" }}>
                  <span style={{ fontSize: "24px", lineHeight: 1 }}>💡</span>
                  <span>ANALOGÍA</span>
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {t.analogia}
                </p>
              </div>
            ) : (
              /* Segmentos de explicación */
              paginas[pagina].map((parrafo, i) => (
                <p key={i} className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)", lineHeight: "1.8" }}>
                  {parrafo}
                </p>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Extras: solo en el último segmento de explicación */}
        {esUltimoConcepto && (
          <>
            {/* Ejemplo malo vs bueno */}
            {t.ejemplo_malo && t.ejemplo_bueno && (
              <div className="flex flex-col gap-2">
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
              <div className="rounded-xl p-4"
                style={{ background: "rgba(8,145,178,0.05)", border: "1px solid rgba(8,145,178,0.15)" }}>
                <p className="text-xs font-bold mb-1.5 tracking-wide uppercase" style={{ color: "#0891B2" }}>
                  🎯 Por qué importa
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {t.por_que_importa}
                </p>
              </div>
            )}

            {/* Tip profesional */}
            {t.tip_profesional && (
              <div className="rounded-xl p-4"
                style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}>
                <p className="text-xs font-bold mb-1.5 tracking-wide uppercase" style={{ color: "#F59E0B" }}>
                  ⚡ Tip profesional
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {t.tip_profesional}
                </p>
              </div>
            )}
          </>
        )}

        {/* Navegación páginas */}
        <div className="flex items-center gap-2">
          {pagina > 0 && (
            <button
              onClick={anterior}
              className="px-4 py-3 text-sm rounded-xl shrink-0 transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)"
              }}
            >
              ← Anterior
            </button>
          )}
          {!esUltima ? (
            <motion.button
              onClick={siguiente}
              className="btn-primary flex-1 py-3 text-sm"
              whileTap={{ scale: 0.97 }}
            >
              Siguiente →
            </motion.button>
          ) : (
            <motion.button
              onClick={() => { playSound("click"); onContinuar() }}
              className="btn-primary flex-1 py-3.5 text-sm"
              whileTap={{ scale: 0.97 }}
            >
              Entendido, al quiz →
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
