const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../src/content/m1/index.json')
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

// ── 1. Eliminar duplicado vacío en B1 (índice 4, id m1-b1-l3 con 44 palabras) ──
const b1 = data.bloques[1]
const before = b1.lecciones.length
b1.lecciones = b1.lecciones.filter((l, i) => {
  const words = (l.contenido?.teoria?.explicacion || '').split(' ').length
  // Eliminar si es duplicado: mismo id m1-b1-l3 Y tiene <100 palabras
  if (l.id === 'm1-b1-l3' && words < 100) {
    console.log(`  ❌ Eliminando duplicado vacío B1[${i}]: ${l.id} (${words}w)`)
    return false
  }
  return true
})
console.log(`B1: ${before} → ${b1.lecciones.length} lecciones`)

// ── 2. Expandir B0 lecciones con <200 palabras ──
const EXPANSIONES = {
  'm1-b0-l1': ` La diferencia entre este momento y los anteriores ciclos de hype en IA es estructural, no superficial. Anteriormente, la IA requería equipos de científicos de datos, infraestructura millonaria y meses de desarrollo para proyectos específicos. Hoy, un profesional con conocimiento básico de APIs puede construir en una tarde lo que habría costado $500,000 y 18 meses en 2018. Esto democratiza el poder de transformación: ya no es solo para corporaciones multinacionales con presupuestos de I+D masivos. En Colombia y LATAM, esto significa que una empresa de 10 personas puede competir con las capacidades de análisis y automatización de una multinacional con 10,000 empleados. La pregunta ya no es si tu empresa debería adoptar IA, sino qué tan rápido puedes construir la capacidad interna para hacerlo antes que tu competencia directa.`,
  'm1-b0-l2': ` Para entender hacia dónde vamos, el patrón histórico es claro: cada vez que una nueva tecnología reduce drásticamente el costo de una tarea cognitiva, los profesionales que se adaptan primero capturan el valor desproporcionado. Los contadores que aprendieron Excel en 1985 no perdieron su trabajo — se convirtieron en analistas financieros más productivos y mejor pagados. Los diseñadores que aprendieron Photoshop en 1994 no fueron reemplazados — multiplicaron su producción. La IA de 2026 sigue exactamente ese patrón: quienes la dominen no serán reemplazados, sino que se convertirán en los profesionales de mayor demanda de la próxima década en cualquier industria.`,
  'm1-b0-l3': ` El punto más importante para comunicar a stakeholders escépticos es este: los inviernos de IA anteriores ocurrieron porque la tecnología prometía más de lo que podía entregar con la infraestructura disponible. Hoy la situación es inversa — la tecnología está entregando resultados prácticos medibles, y la infraestructura (internet de alta velocidad, cloud computing, smartphones) ya está desplegada globalmente. El riesgo de un nuevo invierno no viene de limitaciones técnicas sino de regulación o de una pérdida de confianza masiva — ambos escenarios son posibles pero no probables en el corto plazo dado el ritmo actual de adopción empresarial real con ROI documentado.`,
  'm1-b0-l4': ` Lo que hace este análisis de impacto económico especialmente relevante para LATAM es el efecto de arbitraje. Las herramientas de IA tienen precios denominados en dólares pero los costos laborales que reemplazan están en pesos, reales o soles. Esto crea una ecuación donde el ROI de implementar IA es proporcionalmente mayor que en economías desarrolladas. Un sistema de atención al cliente con IA que cuesta $200/mes puede reemplazar trabajo que en Colombia cuesta $800/mes, pero el mismo sistema en Estados Unidos reemplaza trabajo que cuesta $4,000/mes. El ROI existe en ambos casos, pero el punto de equilibrio se alcanza mucho más rápido en LATAM.`,
  'm1-b0-l6': ` La clave para navegar la adopción de IA en tu organización no es esperar a tener toda la infraestructura perfecta — es identificar el primer caso de uso donde el ROI es obvio y ejecutar. Las empresas que lideran en adopción de IA no empezaron con grandes transformaciones digitales; empezaron con un problema pequeño y doloroso que la IA resolvía claramente. Luego escalaron desde ese primer éxito. Este patrón de 'victoria rápida → escalar' es consistente en todos los sectores y tamaños de empresa, desde startups hasta corporaciones.`
}

const b0 = data.bloques[0]
b0.lecciones.forEach(l => {
  if (EXPANSIONES[l.id]) {
    const before = (l.contenido.teoria.explicacion || '').split(' ').length
    l.contenido.teoria.explicacion += EXPANSIONES[l.id]
    const after = l.contenido.teoria.explicacion.split(' ').length
    console.log(`  ✅ ${l.id}: ${before}w → ${after}w`)
  }
})

// ── 3. Verificar estado final ──
console.log('\n=== VERIFICACIÓN FINAL ===')
data.bloques.forEach((bloque, bi) => {
  const underThreshold = bloque.lecciones.filter(l => {
    const words = (l.contenido?.teoria?.explicacion || '').split(' ').length
    return words < 200
  })
  if (underThreshold.length > 0) {
    console.log(`B${bi} ${bloque.id}: ${underThreshold.length} lecciones <200w:`)
    underThreshold.forEach(l => {
      const w = (l.contenido?.teoria?.explicacion || '').split(' ').length
      console.log(`  ⚠️  ${l.id} - ${w}w`)
    })
  } else {
    const realCount = bloque.lecciones.filter(l => (l.contenido?.teoria?.explicacion || '').split(' ').length > 100).length
    console.log(`B${bi} ${bloque.id}: ✅ ${bloque.lecciones.length} lecciones (${realCount} con contenido real)`)
  }
})

// ── 4. Guardar ──
fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
console.log('\n✅ m1/index.json actualizado')
