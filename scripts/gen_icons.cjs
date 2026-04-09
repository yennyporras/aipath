/**
 * Genera iconos PNG para PWA en pure Node.js sin dependencias externas
 * Fondo: #00D4AA (turquesa Estratek), texto: "EIA" negro bold centrado
 */
const fs = require('fs');
const zlib = require('zlib');

// CRC32 para PNG
function buildCrcTable() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  return table;
}
const CRC_TABLE = buildCrcTable();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.allocUnsafe(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 0);
  return Buffer.concat([len, typeBytes, data, crcBuf]);
}

// Pixel font 5x5 para E, I, A
const GLYPHS = {
  E: [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]],
  I: [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
  A: [[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
};

function generateIconPNG(size) {
  const [bgR, bgG, bgB] = [0x00, 0xD4, 0xAA]; // #00D4AA
  const [fgR, fgG, fgB] = [0x0A, 0x0A, 0x0A]; // #0A0A0A

  // Crear buffer RGBA (usaremos RGB en PNG)
  const pixels = new Uint8Array(size * size * 3);

  // Llenar fondo turquesa
  for (let i = 0; i < size * size; i++) {
    pixels[i * 3]     = bgR;
    pixels[i * 3 + 1] = bgG;
    pixels[i * 3 + 2] = bgB;
  }

  // Calcular escala del texto
  // "EIA" = 3 caracteres * 5px + 2 gaps * 2px = 19px ancho total, 5px alto
  const TEXT = ['E', 'I', 'A'];
  const GAP = 2; // px entre letras (en píxeles del glifo)
  const totalGlyphW = TEXT.length * 5 + (TEXT.length - 1) * GAP;
  const totalGlyphH = 5;

  // Queremos que el texto ocupe ~50% del ancho del icono
  const scale = Math.max(1, Math.floor(size * 0.50 / totalGlyphW));
  const textW = totalGlyphW * scale;
  const textH = totalGlyphH * scale;

  const startX = Math.floor((size - textW) / 2);
  const startY = Math.floor((size - textH) / 2);

  // Dibujar cada letra
  let curX = startX;
  for (const char of TEXT) {
    const glyph = GLYPHS[char];
    for (let gy = 0; gy < 5; gy++) {
      for (let gx = 0; gx < 5; gx++) {
        if (glyph[gy][gx]) {
          // Dibujar bloque scale x scale
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const px = curX + gx * scale + sx;
              const py = startY + gy * scale + sy;
              if (px >= 0 && px < size && py >= 0 && py < size) {
                const idx = (py * size + px) * 3;
                pixels[idx]     = fgR;
                pixels[idx + 1] = fgG;
                pixels[idx + 2] = fgB;
              }
            }
          }
        }
      }
    }
    curX += (5 + GAP) * scale;
  }

  // Construir PNG
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  // Raw image data: filter(1) + RGB(3) per pixel per row
  const rowSize = 1 + size * 3;
  const raw = Buffer.alloc(rowSize * size);
  for (let y = 0; y < size; y++) {
    raw[y * rowSize] = 0; // filtro None
    for (let x = 0; x < size; x++) {
      const pSrc = (y * size + x) * 3;
      const pDst = y * rowSize + 1 + x * 3;
      raw[pDst]     = pixels[pSrc];
      raw[pDst + 1] = pixels[pSrc + 1];
      raw[pDst + 2] = pixels[pSrc + 2];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 6 });

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

const sizes = [72, 96, 128, 144, 152, 384];
for (const size of sizes) {
  const png = generateIconPNG(size);
  fs.writeFileSync(`public/icon-${size}.png`, png);
  console.log(`✓ icon-${size}.png (${png.length} bytes)`);
}
console.log('Todos los iconos generados.');
