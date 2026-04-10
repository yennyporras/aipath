/**
 * Genera iconos PNG para AIPath usando solo Node.js built-ins
 * Fondo: #6366F1 (índigo), texto: "AI" blanco
 * Formato PNG mínimo válido generado manualmente con zlib
 */
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

// Colores
const BG  = { r: 0x63, g: 0x66, b: 0xF1, a: 0xFF } // #6366F1
const FG  = { r: 0xFF, g: 0xFF, b: 0xFF, a: 0xFF } // blanco

// ── Helpers PNG ────────────────────────────────────────────────────────
function u32BE(n) {
  const b = Buffer.alloc(4)
  b.writeUInt32BE(n >>> 0, 0)
  return b
}

function chunk(type, data) {
  const typeB  = Buffer.from(type, 'ascii')
  const crc    = crc32(Buffer.concat([typeB, data]))
  return Buffer.concat([u32BE(data.length), typeB, data, u32BE(crc)])
}

// CRC-32 table
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    t[i] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xFFFFFFFF
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xFF] ^ (c >>> 8)
  return (c ^ 0xFFFFFFFF) >>> 0
}

// Genera un PNG RGBA de tamaño sz×sz con fondo bg
// y letras "AI" centradas en color fg
function makePNG(sz, bg, fg) {
  // Construir array de píxeles RGBA
  const pixels = new Uint8Array(sz * sz * 4)
  // Rellenar con fondo
  for (let i = 0; i < sz * sz; i++) {
    pixels[i * 4 + 0] = bg.r
    pixels[i * 4 + 1] = bg.g
    pixels[i * 4 + 2] = bg.b
    pixels[i * 4 + 3] = bg.a
  }

  // Dibujar texto "AI" usando mapa de bits 5×7 escalado
  drawText(pixels, sz, fg, 'AI')

  // Construir IDAT (datos de imagen comprimidos)
  // Formato: por cada fila, byte de filtro 0 + datos RGBA
  const raw = Buffer.alloc(sz * (1 + sz * 4))
  for (let y = 0; y < sz; y++) {
    raw[y * (1 + sz * 4)] = 0 // filtro None
    for (let x = 0; x < sz; x++) {
      const pi = (y * sz + x) * 4
      const ri = y * (1 + sz * 4) + 1 + x * 4
      raw[ri + 0] = pixels[pi + 0]
      raw[ri + 1] = pixels[pi + 1]
      raw[ri + 2] = pixels[pi + 2]
      raw[ri + 3] = pixels[pi + 3]
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 6 })

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(sz, 0)    // width
  ihdr.writeUInt32BE(sz, 4)    // height
  ihdr[8]  = 8                  // bit depth
  ihdr[9]  = 6                  // color type: RGBA
  ihdr[10] = 0                  // compression
  ihdr[11] = 0                  // filter
  ihdr[12] = 0                  // interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]), // PNG signature
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// Mapa de bits 5 columnas × 7 filas para letras A e I
const GLYPHS = {
  'A': [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  'I': [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1],
  ],
}

function drawText(pixels, sz, fg, text) {
  const glyphW = 5, glyphH = 7
  const gap    = 2          // px entre letras
  const chars  = text.split('')
  const totalW = chars.length * glyphW + (chars.length - 1) * gap

  // Escalar el glifo al sz del icono
  // Escala: ocupa ~55% del ancho y ~55% del alto
  const scale  = Math.max(1, Math.floor(sz * 0.55 / totalW))
  const scaledW = totalW  * scale
  const scaledH = glyphH  * scale

  const startX = Math.floor((sz - scaledW) / 2)
  const startY = Math.floor((sz - scaledH) / 2)

  chars.forEach((ch, ci) => {
    const glyph  = GLYPHS[ch]
    if (!glyph) return
    const offsetX = startX + ci * (glyphW + gap) * scale

    for (let gy = 0; gy < glyphH; gy++) {
      for (let gx = 0; gx < glyphW; gx++) {
        if (!glyph[gy][gx]) continue
        // Dibujar bloque scale×scale
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const px = offsetX + gx * scale + sx
            const py = startY  + gy * scale + sy
            if (px < 0 || px >= sz || py < 0 || py >= sz) continue
            const idx = (py * sz + px) * 4
            pixels[idx + 0] = fg.r
            pixels[idx + 1] = fg.g
            pixels[idx + 2] = fg.b
            pixels[idx + 3] = fg.a
          }
        }
      }
    }
  })
}

// ── Generar todos los tamaños ──────────────────────────────────────────
const SIZES = [72, 96, 128, 144, 152, 192, 384, 512]
const outDir = path.join(__dirname, '..', 'public')

for (const sz of SIZES) {
  const png  = makePNG(sz, BG, FG)
  const file = path.join(outDir, `icon-${sz}.png`)
  fs.writeFileSync(file, png)
  console.log(`✓ icon-${sz}.png (${png.length} bytes)`)
}

// También un favicon SVG
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#6366F1"/>
  <text x="50" y="68" font-family="Arial Black,Arial,sans-serif" font-weight="900"
    font-size="44" fill="white" text-anchor="middle">AI</text>
</svg>`
fs.writeFileSync(path.join(outDir, 'favicon.svg'), svg)
console.log('✓ favicon.svg')
console.log('Todos los iconos generados.')
