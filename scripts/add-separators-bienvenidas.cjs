// Script: añade separador --- a las lecciones de bienvenida (-l0) de B0 a B10
// Divide en 2 segmentos:
//   Seg 1: hook + qué vas a aprender
//   Seg 2: temas adicionales / por qué importa para Europa + reflexión de práctica
// NO se modifica ninguna palabra del contenido.

const fs   = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../src/content/m1/index.json')
const data     = JSON.parse(fs.readFileSync(filePath, 'utf8'))

// Para cada lección -l0, definimos el texto exacto (inicio de párrafo)
// ANTES del cual se inserta el separador ---
const SPLIT_BEFORE = {
  "m1-b0-l0":  "Para trabajar en IA en Europa en 2026",
  "m1-b1-l0":  "También vas a entender qué son los Foundation Models",
  "m1-b2-l0":  "Al terminar este bloque, podrás leer documentación",
  "m1-b3-l0":  "Al terminar este bloque, tendrás un mapa mental",
  "m1-b4-l0":  "Terminarás el bloque con un framework concreto",
  "m1-b5-l0":  "Al terminar este bloque, podrás diseñar",
  "m1-b6-l0":  "Al terminar, sabrás exactamente",
  "m1-b7-l0":  "Terminarás con evaluación continua",
  "m1-b8-l0":  "Terminarás con una perspectiva práctica",
  "m1-b9-l0":  "En Europa, este bloque ya no es opcional",
  "m1-b10-l0": "Al terminar este bloque, tendrás un mapa completo",
}

let procesadas = 0
let errores    = 0

for (const bloque of data.bloques) {
  for (const leccion of bloque.lecciones) {
    const splitMarker = SPLIT_BEFORE[leccion.id]
    if (!splitMarker) continue

    const explicacion = leccion?.contenido?.teoria?.explicacion
    if (!explicacion) {
      console.error(`✗ ${leccion.id} — sin campo explicacion`)
      errores++
      continue
    }

    // Verificar que ya no tiene separadores
    if (explicacion.includes('\n\n---\n\n')) {
      console.log(`↷ ${leccion.id} — ya tiene separador, omitido`)
      continue
    }

    // Dividir en párrafos y localizar el índice de corte
    const parrafos = explicacion.split('\n\n')
    const splitIdx = parrafos.findIndex(p => p.trimStart().startsWith(splitMarker))

    if (splitIdx === -1) {
      console.error(`✗ ${leccion.id} — no se encontró marker: "${splitMarker.substring(0, 50)}"`)
      errores++
      continue
    }

    if (splitIdx === 0) {
      console.error(`✗ ${leccion.id} — el marker está en el primer párrafo, no hay seg1`)
      errores++
      continue
    }

    const seg1 = parrafos.slice(0, splitIdx).join('\n\n')
    const seg2 = parrafos.slice(splitIdx).join('\n\n')

    leccion.contenido.teoria.explicacion = `${seg1}\n\n---\n\n${seg2}`

    const w1 = seg1.split(/\s+/).filter(Boolean).length
    const w2 = seg2.split(/\s+/).filter(Boolean).length
    console.log(`✓ ${leccion.id} — seg1: ${w1}w | seg2: ${w2}w`)
    procesadas++
  }
}

if (errores === 0) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
  console.log(`\n✓ ${procesadas} lecciones de bienvenida segmentadas. Guardado.`)
} else {
  console.error(`\n✗ No se guardó — ${errores} errores encontrados. Revisar markers.`)
  process.exit(1)
}
