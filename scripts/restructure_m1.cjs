const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../src/content/m1/index.json')
const old = JSON.parse(fs.readFileSync(filePath, 'utf8'))

// Extraer todas las lecciones reales del JSON actual
const reales = {}
old.bloques.forEach(b => {
  b.lecciones.forEach(l => {
    const words = (l.contenido?.teoria?.explicacion || '').split(' ').length
    if (words > 150) reales[l.id] = JSON.parse(JSON.stringify(l))
  })
})
console.log('Lecciones reales encontradas:', Object.keys(reales).length)

// ── Función para crear slot vacío ─────────────────────────────────────
function slot(id, titulo, bloque, xp = 50) {
  return {
    id,
    titulo,
    bloque,
    tipo: "leccion",
    duracion_min: 20,
    xp,
    contenido: {
      teoria: {
        explicacion: "PENDIENTE DE GENERAR",
        analogia: "",
        ejemplo_malo: "",
        ejemplo_bueno: "",
        por_que_importa: "",
        tip_profesional: ""
      },
      verificacion: [],
      practica: {
        tipo: "caso_real",
        contexto: "",
        instruccion: "",
        input_malo: "",
        pista: "",
        solucion: "",
        criterios_de_exito: []
      },
      conexion: {
        siguiente_concepto: "",
        por_que_importa_despues: ""
      }
    }
  }
}

// ── Función para reusar lección real con nuevo ID/bloque si cambia ────
function real(oldId, newId, bloque) {
  const l = reales[oldId]
  if (!l) { console.error('⚠️  No encontrada:', oldId); return slot(newId, '?', bloque) }
  const copy = JSON.parse(JSON.stringify(l))
  copy.id = newId
  copy.bloque = bloque
  return copy
}

// ── NUEVA ESTRUCTURA M1 — 11 bloques, 110 lecciones ──────────────────

const bloques = [

  // B0 — Historia y contexto — 8 lecciones (6 reales + 2 nuevas)
  {
    id: "m1-b0", numero: 0,
    nombre: "Historia y contexto",
    icon: "📜",
    lecciones: [
      real("m1-b0-l1", "m1-b0-l1", 0),
      real("m1-b0-l2", "m1-b0-l2", 0),
      real("m1-b0-l3", "m1-b0-l3", 0),
      real("m1-b0-l4", "m1-b0-l4", 0),
      real("m1-b0-l5", "m1-b0-l5", 0),
      real("m1-b0-l6", "m1-b0-l6", 0),
      slot("m1-b0-l7", "Mitos y realidades sobre la IA en 2026", 0),
      slot("m1-b0-l8", "Cómo aprender IA de forma efectiva: el método que funciona", 0),
    ]
  },

  // B1 — El mapa completo de IA — 10 lecciones (4 reales + 6 nuevas)
  {
    id: "m1-b1", numero: 1,
    nombre: "El mapa completo de IA",
    icon: "🗺️",
    lecciones: [
      real("m1-b1-l1", "m1-b1-l1", 1),
      real("m1-b1-l2", "m1-b1-l2", 1),
      real("m1-b1-l3", "m1-b1-l3", 1),
      real("m1-b1-l4", "m1-b1-l4", 1),
      slot("m1-b1-l5", "IA estrecha vs IA general vs superinteligencia", 1),
      slot("m1-b1-l6", "IA simbólica vs conexionista: dos filosofías enfrentadas", 1),
      slot("m1-b1-l7", "Modelos discriminativos vs generativos: qué diferencia hay", 1),
      slot("m1-b1-l8", "Multimodalidad: texto, imagen, audio, video y código unidos", 1),
      slot("m1-b1-l9", "Agentes autónomos: la nueva frontera de la IA", 1),
      slot("m1-b1-l10", "El mapa visual del ecosistema completo de IA en 2026", 1),
    ]
  },

  // B2 — Matemáticas que sí necesitas — 10 lecciones (2 reales + 8 nuevas)
  {
    id: "m1-b2", numero: 2,
    nombre: "Matemáticas que sí necesitas",
    icon: "📐",
    lecciones: [
      real("m1-b2-l1", "m1-b2-l1", 2),
      real("m1-b2-l2", "m1-b2-l2", 2),
      slot("m1-b2-l3", "Matrices y operaciones clave para IA", 2),
      slot("m1-b2-l4", "Probabilidad y estadística esencial para ML", 2),
      slot("m1-b2-l5", "Funciones, derivadas y gradiente descendente sin dolor", 2),
      slot("m1-b2-l6", "Embeddings: cómo los números representan significado", 2),
      slot("m1-b2-l7", "Similitud coseno y búsqueda semántica", 2),
      slot("m1-b2-l8", "Softmax, sigmoid y funciones de activación", 2),
      slot("m1-b2-l9", "Loss functions: cómo sabe el modelo que se equivocó", 2),
      slot("m1-b2-l10", "Backpropagation: cómo aprende una red neuronal", 2),
    ]
  },

  // B3 — Cómo funciona un LLM por dentro — 10 lecciones (2 reales + 8 nuevas)
  {
    id: "m1-b3", numero: 3,
    nombre: "Cómo funciona un LLM por dentro",
    icon: "⚙️",
    lecciones: [
      real("m1-b3-l1", "m1-b3-l1", 3),
      real("m1-b3-l2", "m1-b3-l2", 3),
      slot("m1-b3-l3", "Tokenización: cómo el modelo lee y divide el texto", 3),
      slot("m1-b3-l4", "Atención y self-attention: el mecanismo que lo hace funcionar", 3),
      slot("m1-b3-l5", "Preentrenamiento: cómo aprende el modelo base", 3),
      slot("m1-b3-l6", "Fine-tuning e instruction tuning: hacer el modelo útil", 3),
      slot("m1-b3-l7", "RLHF: cómo se alinea el modelo con valores humanos", 3),
      slot("m1-b3-l8", "Temperatura, top-p y parámetros de generación", 3),
      slot("m1-b3-l9", "Ventana de contexto: qué es y por qué importa", 3),
      slot("m1-b3-l10", "Alucinaciones: por qué ocurren y cómo mitigarlas", 3),
    ]
  },

  // B4 — Tipos de modelos — 10 lecciones (todas nuevas)
  {
    id: "m1-b4", numero: 4,
    nombre: "Tipos de modelos",
    icon: "🤖",
    lecciones: [
      slot("m1-b4-l1", "Modelos de lenguaje: GPT, Claude, Gemini, LLaMA comparados", 4),
      slot("m1-b4-l2", "Modelos de imagen: Stable Diffusion, DALL-E, Midjourney, Flux", 4),
      slot("m1-b4-l3", "Modelos de audio y voz: Whisper, ElevenLabs, Suno", 4),
      slot("m1-b4-l4", "Modelos de video: Sora, Runway, Kling, HeyGen", 4),
      slot("m1-b4-l5", "Modelos de código: Copilot, Claude Code, Cursor, Devin", 4),
      slot("m1-b4-l6", "Modelos de embeddings y búsqueda semántica", 4),
      slot("m1-b4-l7", "Modelos multimodales: visión + lenguaje + acción", 4),
      slot("m1-b4-l8", "Modelos de razonamiento: o1, DeepSeek R1, Gemini Thinking", 4),
      slot("m1-b4-l9", "Open source vs propietarios: trade-offs reales", 4),
      slot("m1-b4-l10", "Cómo elegir el modelo correcto para cada tarea", 4),
    ]
  },

  // B5 — Datos: el combustible — 10 lecciones (1 real + 9 nuevas)
  {
    id: "m1-b5", numero: 5,
    nombre: "Datos: el combustible",
    icon: "🛢️",
    lecciones: [
      real("m1-b4-l1", "m1-b5-l1", 5),  // "Por qué los datos importan más que el modelo"
      slot("m1-b5-l2", "Tipos de datos: estructurados, texto, imagen, audio, video", 5),
      slot("m1-b5-l3", "Cómo se recopilan datos de entrenamiento a escala", 5),
      slot("m1-b5-l4", "Calidad vs cantidad: el dilema del dataset", 5),
      slot("m1-b5-l5", "Data augmentation y técnicas de enriquecimiento", 5),
      slot("m1-b5-l6", "Bases de datos vectoriales: Pinecone, Weaviate, pgvector", 5),
      slot("m1-b5-l7", "RAG: Retrieval Augmented Generation explicado desde cero", 5),
      slot("m1-b5-l8", "Privacidad, GDPR y datos sensibles en IA", 5),
      slot("m1-b5-l9", "Datasets públicos: Hugging Face, Kaggle, Common Crawl", 5),
      slot("m1-b5-l10", "Cómo preparar tus propios datos para entrenar con IA", 5),
    ]
  },

  // B6 — El ecosistema actual completo — 10 lecciones (todas nuevas)
  {
    id: "m1-b6", numero: 6,
    nombre: "El ecosistema actual completo",
    icon: "🌐",
    lecciones: [
      slot("m1-b6-l1", "Anthropic, OpenAI, Google, Meta: los jugadores que mandan", 6),
      slot("m1-b6-l2", "Startups de IA que están cambiando industrias en 2026", 6),
      slot("m1-b6-l3", "Herramientas no-code de IA: Make, Zapier, n8n", 6),
      slot("m1-b6-l4", "IDEs con IA: Cursor, Windsurf, GitHub Copilot comparados", 6),
      slot("m1-b6-l5", "Frameworks: LangChain, LlamaIndex, CrewAI, AutoGen", 6),
      slot("m1-b6-l6", "APIs de IA: cuándo usarlas y cómo elegir la correcta", 6),
      slot("m1-b6-l7", "Cloud de IA: AWS Bedrock, Google Vertex, Azure OpenAI", 6),
      slot("m1-b6-l8", "Comunidades: Hugging Face, Discord, X/Twitter de IA", 6),
      slot("m1-b6-l9", "Newsletters, podcasts y fuentes confiables para mantenerte al día", 6),
      slot("m1-b6-l10", "Framework para evaluar nuevas herramientas de IA", 6),
    ]
  },

  // B7 — Evaluación y métricas — 8 lecciones (1 real + 7 nuevas)
  {
    id: "m1-b7", numero: 7,
    nombre: "Evaluación y métricas",
    icon: "📊",
    lecciones: [
      real("m1-b6-l1", "m1-b7-l1", 7),  // "Cómo se mide si un modelo es bueno"
      slot("m1-b7-l2", "Benchmarks clave: MMLU, HumanEval, HellaSwag, LMSYS Arena", 7),
      slot("m1-b7-l3", "Precisión, recall y F1: métricas de clasificación", 7),
      slot("m1-b7-l4", "BLEU, ROUGE y métricas para texto generado", 7),
      slot("m1-b7-l5", "Evaluación humana vs automática: trade-offs", 7),
      slot("m1-b7-l6", "Cómo evaluar LLMs en tu caso de uso específico", 7),
      slot("m1-b7-l7", "Overfitting, underfitting y generalización", 7),
      slot("m1-b7-l8", "Red teaming: cómo probar los límites de un modelo", 7),
    ]
  },

  // B8 — Infraestructura y compute — 8 lecciones (todas nuevas)
  {
    id: "m1-b8", numero: 8,
    nombre: "Infraestructura y compute",
    icon: "🖥️",
    lecciones: [
      slot("m1-b8-l1", "GPUs vs CPUs vs TPUs: qué hardware necesita la IA", 8),
      slot("m1-b8-l2", "Cómo funciona el entrenamiento distribuido a escala", 8),
      slot("m1-b8-l3", "Cloud computing para IA: costos reales y opciones", 8),
      slot("m1-b8-l4", "Inferencia: cómo ejecutar modelos en producción", 8),
      slot("m1-b8-l5", "Cuantización y optimización de modelos para reducir costos", 8),
      slot("m1-b8-l6", "Edge AI: IA en dispositivos sin necesidad de internet", 8),
      slot("m1-b8-l7", "Latencia, throughput y escalabilidad en sistemas de IA", 8),
      slot("m1-b8-l8", "Costo por token: cómo calcular el ROI de tus llamadas API", 8),
    ]
  },

  // B9 — Ética, sesgos y regulación — 8 lecciones (1 real + 7 nuevas)
  {
    id: "m1-b9", numero: 9,
    nombre: "Ética, sesgos y regulación",
    icon: "⚖️",
    lecciones: [
      real("m1-b7-l1", "m1-b9-l1", 9),  // "Sesgos en IA y cómo mitigarlos"
      slot("m1-b9-l2", "IA responsable: principios y frameworks internacionales", 9),
      slot("m1-b9-l3", "Regulación global: EU AI Act, Executive Order, China", 9),
      slot("m1-b9-l4", "Privacidad y vigilancia masiva: los riesgos reales", 9),
      slot("m1-b9-l5", "Derechos de autor e IA generativa: el debate legal", 9),
      slot("m1-b9-l6", "Desinformación, deepfakes y manipulación a escala", 9),
      slot("m1-b9-l7", "IA Safety: alineación y riesgos a largo plazo", 9),
      slot("m1-b9-l8", "Cómo tomar decisiones éticas al implementar IA en tu empresa", 9),
    ]
  },

  // B10 — IA por industria — 10 lecciones (1 real + 9 nuevas)
  {
    id: "m1-b10", numero: 10,
    nombre: "IA por industria",
    icon: "🏭",
    lecciones: [
      real("m1-b5-l1", "m1-b10-l1", 10),  // "Salud: diagnóstico e imagen médica"
      slot("m1-b10-l2", "Legal: contratos, due diligence y compliance con IA", 10),
      slot("m1-b10-l3", "Finanzas: detección de fraude, análisis y trading algorítmico", 10),
      slot("m1-b10-l4", "Marketing: contenido, personalización y analytics con IA", 10),
      slot("m1-b10-l5", "Educación: tutoría personalizada y evaluación automática", 10),
      slot("m1-b10-l6", "Manufactura: quality control y predictive maintenance", 10),
      slot("m1-b10-l7", "Retail: recomendaciones, inventory y supply chain", 10),
      slot("m1-b10-l8", "Recursos Humanos: reclutamiento, evaluación y retención", 10),
      slot("m1-b10-l9", "IA para pymes en LATAM: casos de uso con ROI real", 10),
      slot("m1-b10-l10", "Cómo identificar oportunidades de IA en cualquier empresa", 10),
    ]
  },

  // B11 — Carrera y ecosistema profesional — 8 lecciones (1 real + 7 nuevas)
  {
    id: "m1-b11", numero: 11,
    nombre: "Carrera y ecosistema profesional",
    icon: "🎯",
    lecciones: [
      real("m1-b7-l2", "m1-b11-l1", 11),  // "Los 6 roles de carrera en IA y tu ruta personalizada"
      slot("m1-b11-l2", "AI Engineer vs Data Scientist vs ML Engineer: diferencias reales", 11),
      slot("m1-b11-l3", "Consultor de IA: el perfil más demandado en LATAM", 11),
      slot("m1-b11-l4", "Cómo construir tu portafolio de IA desde cero", 11),
      slot("m1-b11-l5", "LinkedIn y visibilidad como experto en IA", 11),
      slot("m1-b11-l6", "Salarios y mercado laboral de IA en LATAM 2026", 11),
      slot("m1-b11-l7", "Cómo conseguir tus primeros clientes como consultor de IA", 11),
      slot("m1-b11-l8", "Plan de 6 meses para ser referente en IA desde cero", 11),
    ]
  },
]

// ── Verificar totales ─────────────────────────────────────────────────
const total = bloques.reduce((s, b) => s + b.lecciones.length, 0)
const realesEnNuevo = bloques.reduce((s, b) =>
  s + b.lecciones.filter(l => l.contenido.teoria.explicacion !== 'PENDIENTE DE GENERAR').length, 0)
console.log(`Total lecciones: ${total} (esperado: 110)`)
console.log(`Lecciones reales preservadas: ${realesEnNuevo} (esperado: 19)`)
bloques.forEach(b => {
  const r = b.lecciones.filter(l => l.contenido.teoria.explicacion !== 'PENDIENTE DE GENERAR').length
  console.log(`  ${b.id}: ${b.lecciones.length} lecciones (${r} reales)`)
})

if (total !== 110) { console.error('❌ Total incorrecto'); process.exit(1) }
if (realesEnNuevo !== 19) { console.error('❌ Reales perdidas'); process.exit(1) }

// ── Construir nuevo JSON ──────────────────────────────────────────────
const nuevo = {
  id: "m1",
  numero: 1,
  title: "Fundamentos de IA",
  titulo: "Fundamentos de IA",
  descripcion: "Historia, mapa, matemáticas, LLMs, tipos de modelos, ecosistema, ética y carrera en IA.",
  icon: "🧠",
  bloques
}

fs.writeFileSync(filePath, JSON.stringify(nuevo, null, 2))
console.log('\n✅ m1/index.json reestructurado: 11 bloques, 110 lecciones')
