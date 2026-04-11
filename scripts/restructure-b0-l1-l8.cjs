// Script: reestructura B0 l1-l8 en exactamente 3 segmentos conceptuales
// Seg 1 — EL CONCEPTO: explicación pura del tema
// Seg 2 — EL EJEMPLO: caso concreto / hitos / números reales
// Seg 3 — LA CONEXIÓN: por qué importa para la carrera / Europa
// No se modifica ninguna palabra del contenido.

const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../src/content/m1/index.json')
const data     = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const SEP = '\n\n---\n\n'

// Plan de fusión para cada lección:
// Cada entrada indica cómo agrupar los segmentos actuales en 3.
// El valor es un array de arrays: [[índices seg1], [índices seg2], [índices seg3]]
const PLAN = {
  'l1': [[0],    [1],    [2, 3]],
  'l2': [[0, 1], [2],    [3]],
  'l3': [[0],    [1],    [2, 3]],
  'l4': [[0],    [1, 2], [3]],
  // l5 ya tiene 3 segs correctos — sin cambios
  'l6': [[0, 1], [2],    [3]],
  // l7 ya tiene 3 segs correctos — sin cambios
  'l8': [[0],    [1, 2], [3]],
}

const b0 = data.bloques.find(b => b.id === 'm1-b0')

for (const leccion of b0.lecciones) {
  const match = leccion.id.match(/m1-b0-(l[1-8])$/)
  if (!match) continue

  const lKey = match[1]
  const plan = PLAN[lKey]

  if (!plan) {
    // l5 y l7: verificar que ya tienen 3 segs, reportar y seguir
    const exp  = leccion.contenido?.teoria?.explicacion || ''
    const segs = exp.split(SEP)
    console.log(`↷ ${leccion.id} — ya tiene ${segs.length} segs, sin cambios`)
    continue
  }

  const exp  = leccion.contenido?.teoria?.explicacion || ''
  const segs = exp.split(SEP)

  if (segs.length !== 4) {
    console.error(`✗ ${leccion.id} — esperaba 4 segs, tiene ${segs.length}`)
    continue
  }

  // Fusionar según el plan
  const nuevoSegs = plan.map(indices =>
    indices.map(i => segs[i].trim()).join('\n\n')
  )

  leccion.contenido.teoria.explicacion = nuevoSegs.join(SEP)

  const palabras = nuevoSegs.map(s => s.split(/\s+/).filter(Boolean).length)
  console.log(
    `✓ ${leccion.id} — 3 segs: ` +
    `Seg1=${palabras[0]}w | Seg2=${palabras[1]}w | Seg3=${palabras[2]}w`
  )
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
console.log('\n✓ Guardado.')
