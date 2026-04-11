// Script: reestructura B1, B2, B3 — 3 segmentos por lección, max 5 segs
// Estrategia:
//   B1 l1-l10: splitUntilUnder(100) en cada seg existente + fix LATAM l10
//   B2 l0,l1,l2: splitUntilUnder(100) (tienen varios párrafos)
//   B2 l3-l10:   split en 3 segs por conteo de oraciones + fix LATAM l6/l9
//   B3 l0,l1,l2: splitUntilUnder(100) (tienen varios párrafos)
//   B3 l3-l10:   split en 3 segs por conteo de oraciones + fix LATAM l6
//   l0 bienvenidas: mantener 2 segs (splitUntilUnder para segs >100w)
//   l11 recaps: sin cambios

const fs   = require('fs')
const path = require('path')

const SEP       = '\n\n---\n\n'
const MAX_WORDS = 100
const filePath  = path.join(__dirname, '../src/content/m1/index.json')
const data      = JSON.parse(fs.readFileSync(filePath, 'utf8'))

function wc(t) { return t.split(/\s+/).filter(Boolean).length }

// ── splitUntilUnder: divide recursivamente en párrafos hasta ≤ MAX_WORDS ──
function splitSegment(text) {
  const paras = text.split('\n\n')
  if (paras.length <= 1) return [text]
  let bestI = 1, bestMax = Infinity
  for (let i = 1; i < paras.length; i++) {
    const p1 = paras.slice(0, i).join('\n\n')
    const p2 = paras.slice(i).join('\n\n')
    const mx = Math.max(wc(p1), wc(p2))
    if (mx < bestMax) { bestMax = mx; bestI = i }
  }
  return [paras.slice(0, bestI).join('\n\n'), paras.slice(bestI).join('\n\n')]
}

function splitUntilUnder(text) {
  if (wc(text) <= MAX_WORDS) return [text]
  const [a, b] = splitSegment(text)
  if (a === text) return [text]           // párrafo único — no se puede dividir
  return [...splitUntilUnder(a), ...splitUntilUnder(b)]
}

// ── splitIntoThree: divide texto de párrafo único en 3 partes por oraciones ──
// Busca los puntos de corte más cercanos a 1/3 y 2/3 del total de palabras.
function splitIntoThree(text) {
  // Divide el texto en oraciones aproximadas por ". " o ".\n"
  const sentenceRe = /(?<=[.!?])\s+/g
  const sentences  = text.split(sentenceRe).filter(Boolean)
  if (sentences.length < 3) return [text]   // fallback: párrafo demasiado corto

  const total = wc(text)
  const t1    = total / 3
  const t2    = (2 * total) / 3

  let cum = 0, cut1 = -1, cut2 = -1

  for (let i = 0; i < sentences.length; i++) {
    cum += wc(sentences[i])
    if (cut1 === -1 && cum >= t1) cut1 = i
    if (cut2 === -1 && cum >= t2) { cut2 = i; break }
  }

  // Asegurar cut1 < cut2 y ambos válidos
  if (cut1 === -1) cut1 = Math.floor(sentences.length / 3)
  if (cut2 === -1 || cut2 <= cut1) cut2 = cut1 + Math.max(1, Math.floor((sentences.length - cut1) / 2))
  if (cut2 >= sentences.length) cut2 = sentences.length - 1
  if (cut1 >= cut2) cut1 = cut2 - 1
  if (cut1 < 0) cut1 = 0

  const seg1 = sentences.slice(0, cut1 + 1).join(' ')
  const seg2 = sentences.slice(cut1 + 1, cut2 + 1).join(' ')
  const seg3 = sentences.slice(cut2 + 1).join(' ')

  return [seg1, seg2, seg3].filter(Boolean)
}

// ── Correcciones LATAM ─────────────────────────────────────────────────────
// Formato: { leccionId: [[buscar, reemplazar], ...] }
const LATAM_FIXES = {
  // B1 l10 — Capa 5 LATAM
  'm1-b1-l10': [
    [
      'En LATAM, la oportunidad está en construir estas aplicaciones verticales para mercados locales donde los grandes jugadores globales no están adaptados.',
      'En Europa, la oportunidad está en construir estas aplicaciones verticales para mercados y sectores regulados donde los grandes jugadores globales no están completamente adaptados.',
    ],
    [
      'Para AI Engineers en LATAM: Las mejores oportunidades están en la Capa 5 (aplicaciones verticales), usando las Capas 2 y 3 como infraestructura. No necesitas competir con los grandes laboratorios — construyes sobre su trabajo para resolver problemas específicos de tu mercado.',
      'Para AI Engineers en Europa: Las mejores oportunidades están en la Capa 5 (aplicaciones verticales), usando las Capas 2 y 3 como infraestructura. No necesitas competir con los grandes laboratorios — construyes sobre su trabajo para resolver problemas específicos de tu sector o país.',
    ],
  ],
  // B2 l6 — RAG LATAM
  'm1-b2-l6': [
    [
      'Para una empresa en LATAM con documentación interna, facturas, contratos o manuales, RAG + embeddings es probablemente la implementación de IA de mayor ROI posible: permite que el equipo haga preguntas en lenguaje natural y obtenga respuestas precisas de la documentación interna en segundos.',
      'Para una empresa con documentación interna, facturas, contratos o manuales, RAG + embeddings es probablemente la implementación de IA de mayor ROI posible: permite que el equipo haga preguntas en lenguaje natural y obtenga respuestas precisas de la documentación interna en segundos.',
    ],
  ],
  // B2 l9 — MSE ejemplo pesos colombianos
  'm1-b2-l9': [
    [
      'Si predices precio de 100,000 pesos cuando el real es 150,000, el error cuadrado es (50,000)^2.',
      'Si predices precio de 100,000 euros cuando el real es 150,000, el error cuadrado es (50,000)^2.',
    ],
  ],
  // B3 l6 — contratos colombianos
  'm1-b3-l6': [
    [
      'un modelo jurídico entrenado con miles de contratos y fallos judiciales colombianos',
      'un modelo jurídico entrenado con miles de contratos y jurisprudencia europea',
    ],
  ],
}

// ── Aplicar fixes LATAM a un texto ────────────────────────────────────────
function applyLatamFixes(leccionId, text) {
  const fixes = LATAM_FIXES[leccionId]
  if (!fixes) return text
  for (const [from, to] of fixes) {
    if (text.includes(from)) {
      text = text.replace(from, to)
    } else {
      console.warn(`  ⚠  LATAM fix no encontrado en ${leccionId}: "${from.substring(0, 50)}..."`)
    }
  }
  return text
}

// ── Procesar un bloque ─────────────────────────────────────────────────────
function procesarBloque(bloque) {
  for (const leccion of bloque.lecciones) {
    const isL0      = leccion.id.endsWith('-l0')
    const isRecap   = /-(l11|recap|bienvenida)$/.test(leccion.id)
    const exp       = leccion?.contenido?.teoria?.explicacion
    if (!exp) continue

    // l11 (recap): sin cambios
    if (isRecap && !isL0) {
      console.log(`  ↷ ${leccion.id} — recap, sin cambios`)
      continue
    }

    // Aplicar LATAM fixes primero
    let texto = applyLatamFixes(leccion.id, exp)

    const segsAntes = texto.split(SEP)

    let segsDespues

    if (isL0) {
      // Bienvenidas: splitUntilUnder para cualquier seg >100w, max 2 segs
      segsDespues = segsAntes.flatMap(s => splitUntilUnder(s))
      // Cap a 2 segs para bienvenidas
      if (segsDespues.length > 2) {
        // Fusionar los del medio hasta quedar en 2
        while (segsDespues.length > 2) {
          // Fusionar el par con menor suma
          let bestI = 0, bestSum = Infinity
          for (let i = 0; i < segsDespues.length - 1; i++) {
            const sum = wc(segsDespues[i]) + wc(segsDespues[i + 1])
            if (sum < bestSum) { bestSum = sum; bestI = i }
          }
          segsDespues = [
            ...segsDespues.slice(0, bestI),
            segsDespues[bestI] + '\n\n' + segsDespues[bestI + 1],
            ...segsDespues.slice(bestI + 2),
          ]
        }
      }
    } else if (segsAntes.length === 1 && segsAntes[0].split('\n\n').length === 1) {
      // Párrafo único — split en 3 por oraciones
      segsDespues = splitIntoThree(segsAntes[0])
    } else {
      // Múltiples párrafos o múltiples segs — splitUntilUnder
      segsDespues = segsAntes.flatMap(s => splitUntilUnder(s))
    }

    // Post-proceso: cualquier seg >200w que sea párrafo único → split por oraciones
    segsDespues = segsDespues.flatMap(s => {
      if (wc(s) > 200 && s.split('\n\n').length === 1) {
        return splitIntoThree(s)
      }
      return [s]
    })

    // Limpiar segmentos vacíos
    segsDespues = segsDespues.map(s => s.trim()).filter(Boolean)

    leccion.contenido.teoria.explicacion = segsDespues.join(SEP)

    const palabras  = segsDespues.map(s => wc(s))
    const largos    = palabras.filter(w => w > MAX_WORDS).length
    const icon      = largos > 0 ? '⚠ ' : '✓ '
    const latamTag  = LATAM_FIXES[leccion.id] ? ' [LATAM✓]' : ''
    console.log(
      `  ${icon}${leccion.id}  ${segsAntes.length}→${segsDespues.length} segs  ` +
      `[${palabras.join(', ')}]w${latamTag}`
    )
  }
}

// ── Ejecutar ───────────────────────────────────────────────────────────────
for (const bid of ['m1-b1', 'm1-b2', 'm1-b3']) {
  const bloque = data.bloques.find(b => b.id === bid)
  if (!bloque) { console.error(`✗ Bloque ${bid} no encontrado`); continue }
  console.log(`\n=== ${bid} ===`)
  procesarBloque(bloque)
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
console.log('\n✓ Guardado.')
