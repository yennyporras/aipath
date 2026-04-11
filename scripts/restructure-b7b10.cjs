/**
 * Reestructura B7-B10 de M1 en segmentos conceptuales (igual que B0-B6).
 *
 * Estructura objetivo por lección regular:
 *   Seg 1 — EL CONCEPTO: explicación pura, 60-80w
 *   Seg 2 — EL EJEMPLO: caso europeo concreto, 60-80w
 *   Seg 3 — LA CONEXIÓN: impacto en carrera Europa, 40-60w
 *   Separador: \n\n---\n\n · Máximo 5 segmentos
 *
 * Reglas:
 *   - Cero referencias LATAM → solo europeo/global
 *   - No cambiar contenido — solo reorganizar (+ fix LATAM)
 *   - analogia NO va en explicacion — campo aparte
 *   - l0 (bienvenida): 2 segmentos máximo
 *   - recapitulacion: solo fix LATAM, mantener estructura
 */

const fs = require('fs');

// ─── Sustituciones LATAM → Europa (para referencias aisladas) ────────────────
const LATAM_SUBS = [
  // Pares específicos primero (más largos primero para evitar conflictos)
  [/realidad económica de LATAM donde importar hardware tiene sobrecostos del 20-60%/gi,
   'realidad económica en ciertos mercados europeos donde las restricciones de supply chain elevan costos'],
  [/Realidad práctica para developers en Colombia\/LATAM: importar hardware de EE\.UU\. agrega 20-35% de aranceles más IVA\. Una RTX 4090 que cuesta [^.]+\./gi,
   'Realidad práctica para developers en Europa: los precios de hardware GPU son más uniformes gracias al mercado único europeo, aunque la disponibilidad varía entre países.'],
  [/para los developers en Colombia\/LATAM/gi, 'para los developers en Europa'],
  [/Para el consultor en LATAM/gi, 'Para el consultor en Europa'],
  [/Para LLMs y proyectos de IA en LATAM/gi, 'Para LLMs y proyectos de IA en Europa'],
  [/para fintechs en LATAM/gi, 'para fintechs en Europa'],
  [/en Colombia y LATAM/gi, 'en Europa'],
  [/startups? LATAM/gi, 'startups europeas'],
  [/Para retailers LATAM/gi, 'Para retailers europeos'],
  [/developers LATAM/gi, 'developers europeos'],
  [/developer LATAM/gi, 'developer europeo'],
  [/ecosistema LATAM/gi, 'ecosistema europeo'],
  [/mercados de LATAM/gi, 'mercados europeos'],
  [/contexto latinoamericano/gi, 'contexto europeo'],
  [/contexto de LATAM/gi, 'contexto europeo'],
  [/región latinoamericana/gi, 'región europea'],
  [/español latinoamericano/gi, 'plurilingüismo europeo'],
  [/médicos latinos/gi, 'médicos europeos'],

  // Entidades regulatorias colombianas → equivalentes europeos
  [/Superfinanciera Colombia exige/gi, 'EBA (European Banking Authority) exige'],
  [/\(Superfinanciera Colombia[^)]*\)/gi, '(bajo supervisión de la EBA y reguladores nacionales)'],
  [/gestión de facturación electrónica \(DIAN\)/gi, 'gestión de facturación electrónica (bajo normativa EU VAT)'],
  [/procesos de contratación pública de Secop/gi, 'procesos de contratación pública del TED (Tenders Electronic Daily) europeo'],
  [/normativa SARLAFT para prevención de lavado de activos/gi, 'normativa AML/KYC (Anti-Money Laundering Directive) europea'],
  [/proceso de declaración de renta en Colombia/gi, 'proceso de declaración fiscal en países como Alemania o España'],
  [/la DIAN/gi, 'la AEAT (Agencia Tributaria) o HMRC'],
  [/proyectos como el de Minsalud con IA para radiología/gi, 'proyectos como los del NHS en UK con IA para radiología'],

  // Ciudades / países
  [/en Bogotá/gi, 'en Berlín'],
  [/colombianos?/gi, 'europeos'],
  [/colombiana/gi, 'europea'],
  [/latinoameric[ao]s?/gi, 'europeos'],
  [/latinoamericanas?/gi, 'europeas'],
  [/América Latina/gi, 'Europa'],
  [/en LATAM/gi, 'en Europa'],
  [/de LATAM/gi, 'de Europa'],
  [/LATAM/gi, 'Europa'],
  [/Colombia/gi, 'Alemania'],
  [/México/gi, 'Francia'],
  [/Argentina/gi, 'España'],
  [/Brasil/gi, 'Países Bajos'],
  [/Chile/gi, 'Suecia'],
];

function fixLATAM(text) {
  let result = text;
  for (const [pattern, replacement] of LATAM_SUBS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

// ─── Contenido hardcodeado para B10-l7 y B10-l10 (completamente LATAM) ───────
// Estructura: 3 segmentos separados por \n\n---\n\n

const HARDCODED = {
  'm1-b10-l7': {
    titulo: 'Startups de IA en Europa: casos reales 2026',
    explicacion: `El ecosistema de startups de IA en Europa en 2026 es el más dinámico fuera de EE.UU., con casos de éxito que demuestran que es posible construir empresas de IA globalmente competitivas respetando regulaciones estrictas. Entender estos casos no es solo inspiración — es el mapa de modelos de negocio que funcionan en el contexto europeo.

---

En fintech, N26 (Alemania) usa ML para scoring crediticio sin historial bancario tradicional, atendiendo a 8 millones de clientes en toda Europa. Klarna (Suecia) aplica IA en su sistema BNPL para evaluar riesgo en tiempo real. En salud, Babylon Health (UK) usa IA para triaje médico. Mistral AI (Francia) construyó un LLM europeo competitivo con OpenAI, respetando el EU AI Act desde su diseño. En logística, Sennder (Alemania) usa IA para matching de carga y optimización de rutas en toda Europa.

---

Los patrones comunes de éxito incluyen: enfoque en nichos regulados donde la expertise legal es barrera de entrada, uso del mercado único europeo de 450 millones de personas como ventaja de escala, y construcción de confianza mediante transparencia y cumplimiento del RGPD. Como developer, entender qué startups europeas están contratando y qué habilidades buscan define tu posicionamiento.`,
  },

  'm1-b10-l10': {
    titulo: 'Oportunidades únicas para developers europeos de IA',
    explicacion: `Ser un developer de IA en Europa en 2026 no es una desventaja — es una posición con ventajas específicas que los developers de Silicon Valley no tienen. La expertise en RGPD, EU AI Act y regulación sectorial europea es una barrera de entrada real que convierte el conocimiento local en activo competitivo.

---

Tres ventajas concretas: Primero, expertise regulatoria. El developer europeo que entiende el EU AI Act, el RGPD y las directivas sectoriales (MiFID II en finanzas, MDR en salud) puede construir sistemas de IA compliance-by-design que ningún competitor americano puede replicar sin años de presencia local. Segundo, acceso a datos únicos: historiales clínicos del NHS, registros de propiedad alemanes, datos de Eurostat — datasets que no están en ningún modelo global. Tercero, mercados infraatendidos: muchas pymes europeas saben que "deben hacer algo con IA" pero no tienen ni los recursos ni los conocimientos para implementarla.

---

Los developers europeos que se posicionan como expertos de IA en sectores verticales hoy — salud, legal, sector público, manufactura — tienen una ventana de 3-5 años de ventaja antes de que el mercado madure. Construir esa reputación sectorial en Europa es más valioso que ser generalista, y la demanda de professionals bilingües (inglés + idioma local) con expertise en IA es alta y creciente.`,
  },
};

// ─── Función: contar palabras ──────────────────────────────────────────────────
function countWords(text) {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

// ─── Función: dividir texto en 3 segmentos ─────────────────────────────────────
// Seg 1: EL CONCEPTO (primer párrafo ~70w, máx 100w)
// Seg 2: EL EJEMPLO (párrafo más concreto/ejemplo)
// Seg 3: LA CONEXIÓN (último párrafo o por_que_importa)
function dividirEnSegmentos(explicacion, porQueImporta) {
  // Si ya tiene 3+ segmentos, solo limpiar LATAM
  const segsExistentes = explicacion.split(/\n\n---\n\n/);
  if (segsExistentes.length >= 3) {
    return segsExistentes.map(s => fixLATAM(s)).join('\n\n---\n\n');
  }

  // Dividir en párrafos (separados por \n\n)
  const parrafos = explicacion
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 20);

  if (parrafos.length === 0) return fixLATAM(explicacion);
  if (parrafos.length === 1) {
    // Texto monolítico: dividir por oraciones
    const oraciones = parrafos[0].split(/(?<=\.\s)/);
    const mitad = Math.floor(oraciones.length / 2);
    const seg1 = oraciones.slice(0, Math.max(2, mitad - 1)).join(' ').trim();
    const seg2 = oraciones.slice(Math.max(2, mitad - 1), mitad + 1).join(' ').trim();
    const seg3 = oraciones.slice(mitad + 1).join(' ').trim() || porQueImporta || seg1;
    return [seg1, seg2, seg3].filter(s => s.length > 10).map(fixLATAM).join('\n\n---\n\n');
  }

  // Seg 1: primer párrafo (máx 120 palabras)
  let seg1 = '';
  let i = 0;
  while (i < parrafos.length && countWords(seg1 + ' ' + parrafos[i]) < 120) {
    seg1 += (seg1 ? '\n\n' : '') + parrafos[i];
    i++;
    if (countWords(seg1) >= 60) break; // al menos 60 palabras
  }

  // Seg 2: párrafos del medio (los más concretos — buscar uno con números, nombres, "En [lugar]")
  const resto = parrafos.slice(i);
  const ejemploIdx = resto.findIndex(p =>
    /\d[\d.,]+%|€|\$|[A-Z][a-z]+\s+\(|^En |^Por ejemplo|^Caso |^Ejemplo/.test(p)
  );
  let seg2 = '';
  let k = ejemploIdx >= 0 ? ejemploIdx : 0;
  while (k < resto.length && countWords(seg2 + ' ' + resto[k]) < 150) {
    seg2 += (seg2 ? '\n\n' : '') + resto[k];
    k++;
    if (countWords(seg2) >= 60) break;
  }

  // Seg 3: LA CONEXIÓN - preferir por_que_importa, o últimos párrafos
  const ultimosParrafos = parrafos.slice(-2);
  let seg3 = porQueImporta && countWords(porQueImporta) >= 30
    ? porQueImporta
    : ultimosParrafos.join('\n\n');

  // Limpiar segmentos vacíos
  const segs = [seg1, seg2, seg3].filter(s => s && s.trim().length > 10);

  // Si solo tenemos 1 o 2 segmentos, ajustar
  if (segs.length < 2) {
    return fixLATAM(explicacion);
  }

  return segs.map(fixLATAM).join('\n\n---\n\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  console.log('Leyendo src/content/m1/index.json...');
  const raw = fs.readFileSync('src/content/m1/index.json', 'utf-8');
  const data = JSON.parse(raw);

  const resumen = [];

  for (let bn = 7; bn <= 10; bn++) {
    const bloque = data.bloques[bn];
    console.log(`\n=== BLOQUE ${bn}: ${bloque.nombre} (${bloque.lecciones.length} lecciones) ===`);

    bloque.lecciones = bloque.lecciones.map(leccion => {
      const exp = leccion.contenido && leccion.contenido.teoria && leccion.contenido.teoria.explicacion;
      if (!exp) {
        resumen.push({ id: leccion.id, tipo: leccion.tipo, segAntes: 0, segDespues: 0, fixLATAM: false, accion: 'sin_exp' });
        return leccion;
      }

      const segAntes = exp.split(/\n\n---\n\n/).length;
      const tieneLATAM = /LATAM|Colombia|México|Mexico|Argentina|América Latina|latinoamer|latinoameric|Costa Rica|Bogot[aá]|Medell[ií]n/i.test(exp);
      const porQueImporta = leccion.contenido.teoria.por_que_importa || '';

      let nuevaExp = exp;
      let accion = 'skip';

      // Caso: hardcodeado (B10-l7 y B10-l10)
      if (HARDCODED[leccion.id]) {
        nuevaExp = HARDCODED[leccion.id].explicacion;
        accion = 'hardcoded';
        // También actualizar título si cambió
        if (HARDCODED[leccion.id].titulo) {
          leccion = { ...leccion, titulo: HARDCODED[leccion.id].titulo };
        }
      }
      // Caso: bienvenida con 2 segs sin LATAM → skip
      else if (leccion.tipo === 'bienvenida' && segAntes >= 2 && !tieneLATAM) {
        accion = 'skip';
      }
      // Caso: bienvenida con LATAM → solo fix LATAM
      else if (leccion.tipo === 'bienvenida') {
        nuevaExp = segsExistentes => fixLATAM(exp);
        nuevaExp = fixLATAM(exp);
        accion = 'fix_latam';
      }
      // Caso: recapitulacion → solo fix LATAM
      else if (leccion.tipo === 'recapitulacion') {
        nuevaExp = fixLATAM(exp);
        accion = 'fix_latam_recap';
      }
      // Caso: leccion normal con 3+ segs sin LATAM → skip
      else if (segAntes >= 3 && !tieneLATAM) {
        accion = 'skip';
      }
      // Caso: leccion normal → dividir en segmentos + fix LATAM
      else {
        nuevaExp = dividirEnSegmentos(exp, porQueImporta);
        accion = tieneLATAM ? 'split+fix_latam' : 'split';
      }

      const segDespues = nuevaExp.split(/\n\n---\n\n/).length;

      const tieneLatamFinal = /LATAM|Colombia|México|Mexico|Argentina|América Latina|latinoamer|latinoameric|Costa Rica|Bogot[aá]|Medell[ií]n/i.test(nuevaExp);
      if (tieneLatamFinal) {
        console.warn(`  ⚠️  LATAM RESTANTE en ${leccion.id}: verificar manualmente`);
      }

      resumen.push({ id: leccion.id, tipo: leccion.tipo, segAntes, segDespues, fixLATAM: tieneLATAM, accion });
      console.log(`  ${accion === 'skip' ? '✓' : '→'} ${leccion.id} (${leccion.tipo}): ${segAntes}→${segDespues} segs [${accion}]${tieneLATAM ? ' ⚠️LATAM' : ''}`);

      return {
        ...leccion,
        contenido: {
          ...leccion.contenido,
          teoria: {
            ...leccion.contenido.teoria,
            explicacion: nuevaExp,
          },
        },
      };
    });
  }

  console.log('\nGuardando src/content/m1/index.json...');
  fs.writeFileSync('src/content/m1/index.json', JSON.stringify(data, null, 2), 'utf-8');

  // Limpiar archivo temporal si existe
  if (fs.existsSync('b7b10_content.json')) fs.unlinkSync('b7b10_content.json');

  // Tabla resumen
  console.log('\n=== TABLA RESUMEN ===');
  console.log('ID'.padEnd(18) + 'TIPO'.padEnd(16) + 'ANTES'.padEnd(7) + 'DESPUÉS'.padEnd(9) + 'FIX LATAM'.padEnd(12) + 'ACCIÓN');
  console.log('─'.repeat(80));
  resumen.forEach(r => {
    console.log(
      r.id.padEnd(18) +
      r.tipo.padEnd(16) +
      String(r.segAntes).padEnd(7) +
      String(r.segDespues).padEnd(9) +
      (r.fixLATAM ? '⚠️ sí' : 'no').padEnd(12) +
      r.accion
    );
  });

  const total = resumen.filter(r => r.accion !== 'skip').length;
  const fixes = resumen.filter(r => r.fixLATAM).length;
  console.log(`\n✅ Completado: ${total} lecciones procesadas · ${fixes} fixes LATAM aplicados`);
}

main();
