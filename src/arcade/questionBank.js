/**
 * questionBank.js — Banco dinámico de preguntas del Arcade
 *
 * Auto-detecta todos los módulos disponibles en src/content/.
 * Cuando se agreguen M5, M7, M8, etc., solo hay que añadir el import
 * aquí y una entrada en MODULOS_DISPONIBLES. El código del Arcade
 * no necesita ningún cambio.
 */

// ─── Imports de módulos disponibles ──────────────────────────────────────────
import m1Data from '../content/m1/index.json'
import m4Data from '../content/m4-completo.json'
// Agregar aquí cuando estén listos:
// import m5Data from '../content/m5/index.json'
// import m7Data from '../content/m7/index.json'
// import m8Data from '../content/m8/index.json'

// ─── Registro de módulos ──────────────────────────────────────────────────────
const MODULOS_DISPONIBLES = [
  { id: 'm1', data: m1Data },
  { id: 'm4', data: m4Data },
  // { id: 'm5', data: m5Data },
  // { id: 'm7', data: m7Data },
  // { id: 'm8', data: m8Data },
]

// ─── Extractor de preguntas ───────────────────────────────────────────────────
// Recorre bloques > lecciones > verificacion[] y normaliza cada pregunta
function extraerDeModulo(data, moduloId) {
  const preguntas = []
  const bloques = data.bloques || []

  bloques.forEach((bloque, bloqueIndex) => {
    // Dificultad según posición del bloque (1-3)
    const dificultad = bloqueIndex <= 2 ? 1 : bloqueIndex <= 5 ? 2 : 3
    const lecciones = bloque.lecciones || []

    lecciones.forEach((leccion) => {
      const verificacion = leccion.contenido?.verificacion || []
      verificacion.forEach((q) => {
        // Ignorar preguntas incompletas
        if (!q.pregunta || !q.opciones || q.opciones.length < 2 || q.correcta === undefined) return

        preguntas.push({
          pregunta: q.pregunta,
          opciones: q.opciones,
          correcta_index: q.correcta,
          concepto_reforzado: q.concepto_reforzado || q.pregunta,
          explicacion: q.explicacion_profunda || '',
          modulo_id: moduloId,
          bloque_id: leccion.bloque ?? bloqueIndex,
          leccion_id: leccion.id || '',
          dificultad,
        })
      })
    })
  })

  return preguntas
}

// ─── Pool global único ────────────────────────────────────────────────────────
export const QUESTION_POOL = MODULOS_DISPONIBLES.flatMap(({ id, data }) =>
  extraerDeModulo(data, id)
)

// ─── Estadísticas (útil para debugging) ──────────────────────────────────────
export const BANK_STATS = {
  total: QUESTION_POOL.length,
  porModulo: MODULOS_DISPONIBLES.reduce((acc, { id }) => {
    acc[id] = QUESTION_POOL.filter((q) => q.modulo_id === id).length
    return acc
  }, {}),
  porDificultad: [1, 2, 3].reduce((acc, d) => {
    acc[d] = QUESTION_POOL.filter((q) => q.dificultad === d).length
    return acc
  }, {}),
}

// ─── Utilidades internas ──────────────────────────────────────────────────────

// Shuffle de Fisher-Yates determinístico con seed numérico
function shuffleConSeed(arr, seed) {
  let s = seed
  const rng = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0x100000000
  }
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Shuffle aleatorio de Fisher-Yates
function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Seed numérico basado en la fecha YYYYMMDD
function seedDeHoy() {
  const hoy = new Date()
  return hoy.getFullYear() * 10000 + (hoy.getMonth() + 1) * 100 + hoy.getDate()
}

// Registro en memoria de preguntas usadas en la sesión actual
// Se reinicia al recargar la página (sin localStorage para simplificar)
const usadasEnSesion = new Set()

function marcarUsadas(preguntas) {
  preguntas.forEach((q) => usadasEnSesion.add(`${q.modulo_id}-${q.leccion_id}-${q.pregunta.slice(0, 40)}`))
}

function claveUsada(q) {
  return `${q.modulo_id}-${q.leccion_id}-${q.pregunta.slice(0, 40)}`
}

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * n preguntas aleatorias sin repetir en la misma sesión de página.
 * Si el pool de no-usadas es insuficiente, recicla todas.
 */
export function getRandomQuestions(n = 10) {
  const disponibles = QUESTION_POOL.filter((q) => !usadasEnSesion.has(claveUsada(q)))
  const pool = disponibles.length >= n ? disponibles : QUESTION_POOL
  const seleccionadas = shuffle(pool).slice(0, n)
  marcarUsadas(seleccionadas)
  return seleccionadas
}

/**
 * Preguntas diarias con seed por fecha.
 * Devuelve exactamente las mismas preguntas durante todo el día.
 */
export function getDailyQuestions(n = 10) {
  const seed = seedDeHoy()
  const shuffled = shuffleConSeed(QUESTION_POOL, seed)
  return shuffled.slice(0, n)
}

/**
 * Preguntas progresivas que suben de dificultad según intentos previos.
 * intentos 0-2 → dificultad 1+
 * intentos 3-5 → dificultad 2+
 * intentos 6+  → dificultad 3
 */
export function getProgressiveQuestions(intentos = 0, n = 10) {
  const dificultadMinima = intentos <= 2 ? 1 : intentos <= 5 ? 2 : 3
  const filtradas = QUESTION_POOL.filter((q) => q.dificultad >= dificultadMinima)
  const pool = filtradas.length >= n ? filtradas : QUESTION_POOL
  return shuffle(pool).slice(0, n)
}

/**
 * Adapta preguntas de opción múltiple al formato Verdadero/Falso.
 * Para cada pregunta, elige aleatoriamente si mostrar la opción
 * correcta (→ Verdadero) o una incorrecta (→ Falso).
 *
 * Formato de salida: { texto: string, respuesta: boolean }
 */
export function getTrueFalseQuestions(n = 10) {
  // Tomar el doble para tener margen si alguna no es convertible
  const base = shuffle(QUESTION_POOL).slice(0, n * 2)
  const resultado = []

  for (const q of base) {
    if (resultado.length >= n) break
    const { concepto_reforzado, opciones, correcta_index } = q

    const usarCorrecta = Math.random() < 0.5

    if (usarCorrecta) {
      resultado.push({
        texto: `${concepto_reforzado}: ${opciones[correcta_index]}`,
        respuesta: true,
      })
    } else {
      const incorrectas = opciones.filter((_, i) => i !== correcta_index)
      if (incorrectas.length === 0) continue
      const incorrecta = incorrectas[Math.floor(Math.random() * incorrectas.length)]
      resultado.push({
        texto: `${concepto_reforzado}: ${incorrecta}`,
        respuesta: false,
      })
    }
  }

  return resultado.slice(0, n)
}

/**
 * Adapta preguntas al formato Speed Cards (término + definición).
 * termino   = concepto_reforzado
 * definicion = opción correcta
 *
 * Formato de salida: { termino: string, definicion: string }
 */
export function getFlashcardQuestions(n = 10) {
  return shuffle(QUESTION_POOL)
    .slice(0, n)
    .map((q) => ({
      termino: q.concepto_reforzado,
      definicion: q.opciones[q.correcta_index],
    }))
}

/**
 * Adapta preguntas al formato Batalla de Conceptos (concepto + 2 opciones).
 * Muestra la opción correcta vs una incorrecta aleatoria.
 * El orden de las opciones se mezcla aleatoriamente.
 *
 * Formato de salida: { concepto: string, opciones: [string, string], correcta: 0|1 }
 */
export function getBatallaQuestions(n = 10) {
  return shuffle(QUESTION_POOL)
    .slice(0, n)
    .map((q) => {
      const correcta = q.opciones[q.correcta_index]
      const incorrectas = q.opciones.filter((_, i) => i !== q.correcta_index)
      const incorrecta = incorrectas[Math.floor(Math.random() * incorrectas.length)]

      // Mezclar el orden aleatoriamente
      const [op0, op1] =
        Math.random() < 0.5 ? [correcta, incorrecta] : [incorrecta, correcta]

      return {
        concepto: q.concepto_reforzado,
        opciones: [op0, op1],
        correcta: op0 === correcta ? 0 : 1,
      }
    })
}

/**
 * Adapta preguntas al formato Completa el Concepto.
 * Usa la pregunta como contexto y presenta las opciones del banco.
 *
 * Formato de salida: { partes: [string, '___', string], correcta: string, opciones: string[] }
 */
export function getCompletaConceptoQuestions(n = 10) {
  // Limpiar signos de interrogación para convertir pregunta en contexto
  const limpiarPregunta = (texto) =>
    texto.replace(/^¿/, '').replace(/\?$/, '').trim()

  return shuffle(QUESTION_POOL)
    .slice(0, n)
    .map((q) => {
      const contexto = limpiarPregunta(q.pregunta)
      const correcta = q.opciones[q.correcta_index]
      const opciones = shuffle(q.opciones).slice(0, 4)

      // Asegurar que la correcta siempre esté en las opciones
      if (!opciones.includes(correcta)) {
        opciones[0] = correcta
      }

      return {
        partes: [`${contexto}: `, '___', ''],
        correcta,
        opciones,
      }
    })
}
