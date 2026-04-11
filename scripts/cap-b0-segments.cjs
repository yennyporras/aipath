// Script: consolida l7 y l8 de B0 a máximo 5 segmentos
// Fusiones elegidas por coherencia semántica, no por algoritmo.

const fs   = require('fs')
const path = require('path')

const SEP      = '\n\n---\n\n'
const filePath = path.join(__dirname, '../src/content/m1/index.json')
const data     = JSON.parse(fs.readFileSync(filePath, 'utf8'))

function wc(text) { return text.split(/\s+/).filter(Boolean).length }

// Plan: para cada lección, índices adyacentes a fusionar (base-0)
// Cada entrada de MERGES es una lista de grupos:
//   [[0,1], [2], [3], [4], [5,6]] → fusionar segs 0+1, luego 5+6
const MERGES = {
  'l7': [[0, 1], [2], [3], [4], [5, 6]],          // 7→5: intro+M1 | M2 | M3 | M4 | M5+M6
  'l8': [[0, 1], [2], [3, 4], [5, 6], [7]],        // 8→5: intro+vida | Capa1 | Capa2+3 | Proyecto+2080 | Velocidad
}

const b0 = data.bloques.find(b => b.id === 'm1-b0')

for (const leccion of b0.lecciones) {
  const match = leccion.id.match(/m1-b0-(l[78])$/)
  if (!match) continue
  const lKey = match[1]
  const plan = MERGES[lKey]

  const segsActuales = leccion.contenido.teoria.explicacion.split(SEP)
  const nuevosSegs = plan.map(indices =>
    indices.map(i => segsActuales[i].trim()).join('\n\n')
  )

  leccion.contenido.teoria.explicacion = nuevosSegs.join(SEP)

  const palabras = nuevosSegs.map(s => wc(s))
  console.log(`✓ ${leccion.id}  ${segsActuales.length}→${nuevosSegs.length} segs  [${palabras.join(', ')}]w`)
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
console.log('\n✓ Guardado.')
