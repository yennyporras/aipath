// Script: corrige referencias LATAM → Europa y divide segmentos >100w en B0 l1-l8
// NO se modifica el contenido temático — solo sustituciones geográficas y splits.

const fs   = require('fs')
const path = require('path')

const SEP      = '\n\n---\n\n'
const MAX_WORDS = 100
const filePath = path.join(__dirname, '../src/content/m1/index.json')
const data     = JSON.parse(fs.readFileSync(filePath, 'utf8'))

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length
}

// Divide un segmento en dos en el mejor punto de párrafo.
// "Mejor" = minimiza la longitud del bloque más largo.
function splitSegment(text) {
  const paras = text.split('\n\n')
  if (paras.length <= 1) return [text]

  let bestI   = 1
  let bestMax = Infinity

  for (let i = 1; i < paras.length; i++) {
    const p1 = paras.slice(0, i).join('\n\n')
    const p2 = paras.slice(i).join('\n\n')
    const mx  = Math.max(wordCount(p1), wordCount(p2))
    if (mx < bestMax) {
      bestMax = mx
      bestI   = i
    }
  }
  return [
    paras.slice(0, bestI).join('\n\n'),
    paras.slice(bestI).join('\n\n'),
  ]
}

// Divide recursivamente hasta que ningún fragmento supere MAX_WORDS
function splitUntilUnder(text) {
  if (wordCount(text) <= MAX_WORDS) return [text]
  const [a, b] = splitSegment(text)
  // Si el split no redujo nada (single paragraph), devolver tal cual
  if (a === text) return [text]
  return [...splitUntilUnder(a), ...splitUntilUnder(b)]
}

// ─── Correcciones LATAM → Europa ──────────────────────────────────────────
// Clave: id de lección (lX). Valor: array de [buscar, reemplazar]
const LATAM_FIXES = {
  l1: [
    [
      'Para los profesionales en LATAM,',
      'Para los profesionales en Europa,',
    ],
    [
      'En Colombia y LATAM, esto significa',
      'En Europa, esto significa',
    ],
  ],
  l4: [
    // Seg2 — párrafo BID → Comisión Europea
    [
      'En LATAM específicamente: el BID estima que la IA podría añadir $1 trillion al PIB regional antes de 2030, con los mayores beneficios en Colombia, Brasil y México donde el costo laboral relativo hace el ROI de automatización especialmente atractivo.',
      'En Europa específicamente: la Comisión Europea estima que la IA podría añadir entre €2.7 y €4.4 billones al PIB europeo antes de 2030. Alemania, Francia y los países nórdicos lideran la adopción, mientras el sur y el este de Europa representan las mayores oportunidades de crecimiento.',
    ],
    // Seg3 — efecto arbitraje LATAM → efecto multiplicador Europa
    [
      'Lo que hace este análisis especialmente relevante para LATAM es el efecto de arbitraje. Las herramientas de IA tienen precios denominados en dólares pero los costos laborales que reemplazan están en pesos, reales o soles.',
      'Lo que hace este análisis especialmente relevante para Europa es el efecto multiplicador. Las herramientas de IA tienen precios denominados en dólares pero los beneficios se calculan en euros o monedas locales.',
    ],
    [
      'Un sistema de atención al cliente con IA que cuesta $200/mes puede reemplazar trabajo que en Colombia cuesta $800/mes, pero el mismo sistema en Estados Unidos reemplaza trabajo que cuesta $4,000/mes. El ROI existe en ambos casos, pero el punto de equilibrio se alcanza mucho más rápido en LATAM.',
      'Un sistema de atención al cliente con IA que cuesta $200/mes puede reemplazar trabajo que en España cuesta €800/mes y en Alemania €1,500/mes. En ambos casos el ROI es positivo, y los equipos con mayor costo por hora alcanzan el punto de equilibrio antes.',
    ],
  ],
  l6: [
    [
      "La pregunta que más escucho de profesionales en LATAM es:",
      "La pregunta que más escucho de profesionales es:",
    ],
  ],
  l8: [
    [
      'en el top 5% de practitioners en LATAM',
      'entre el top 5% de practitioners de su sector',
    ],
  ],
}

// ─── Procesar cada lección ────────────────────────────────────────────────
const b0 = data.bloques.find(b => b.id === 'm1-b0')

for (const leccion of b0.lecciones) {
  const match = leccion.id.match(/m1-b0-(l[1-8])$/)
  if (!match) continue
  const lKey = match[1]

  let text = leccion.contenido.teoria.explicacion

  // 1. Aplicar sustituciones LATAM
  const fixes = LATAM_FIXES[lKey]
  if (fixes) {
    for (const [from, to] of fixes) {
      if (text.includes(from)) {
        text = text.replace(from, to)
      } else {
        console.warn(`⚠  ${leccion.id}: texto LATAM no encontrado → "${from.substring(0, 60)}..."`)
      }
    }
  }

  // 2. Dividir segmentos >MAX_WORDS
  const segsAntes  = text.split(SEP)
  const segsDespues = segsAntes.flatMap(seg => splitUntilUnder(seg))

  leccion.contenido.teoria.explicacion = segsDespues.join(SEP)

  // Reporte
  const palabras  = segsDespues.map(s => wordCount(s))
  const hayLargos = palabras.filter(w => w > MAX_WORDS).length
  const icon      = hayLargos > 0 ? '⚠ ' : '✓ '
  console.log(
    `${icon}${leccion.id}  ${segsAntes.length}→${segsDespues.length} segs  ` +
    `[${palabras.join(', ')}]w`
  )
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
console.log('\n✓ Guardado.')
