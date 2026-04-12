import { useState, useCallback, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ── Fecha de hoy ────────────────────────────────────────────────────────────
const HOY = new Date()
const FECHA_STR = `${HOY.getFullYear()}-${String(HOY.getMonth() + 1).padStart(2, "0")}-${String(HOY.getDate()).padStart(2, "0")}`
const CACHE_KEY = `aipath_explorar_${FECHA_STR}`
const REFLEXION_KEY = `aipath_reflexion_${FECHA_STR}`
const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY

// ── Pool completo de herramientas (14) ──────────────────────────────────────
const HERRAMIENTAS_POOL = {
  claude: {
    nombre: "Claude",
    tagline: "Asistente IA para análisis y escritura profunda",
    url: "https://claude.ai",
    caso_uso: "Analiza contratos, redacta informes técnicos y razona sobre problemas complejos con profundidad.",
    icono: "🤖",
  },
  cursor: {
    nombre: "Cursor",
    tagline: "Editor de código con IA integrada en todo el proyecto",
    url: "https://cursor.sh",
    caso_uso: "Escribe, refactoriza y depura código en cualquier lenguaje con contexto de todo tu repositorio.",
    icono: "⌨️",
  },
  perplexity: {
    nombre: "Perplexity",
    tagline: "Búsqueda IA con fuentes verificadas en tiempo real",
    url: "https://perplexity.ai",
    caso_uso: "Investiga mercados, competidores o tendencias con respuestas que citan fuentes verificables.",
    icono: "🔍",
  },
  midjourney: {
    nombre: "Midjourney",
    tagline: "Generación de imágenes de calidad profesional",
    url: "https://midjourney.com",
    caso_uso: "Crea imágenes para presentaciones, campañas y branding de nivel profesional en minutos.",
    icono: "🎨",
  },
  notion: {
    nombre: "Notion AI",
    tagline: "Workspace con IA integrada en tu base de conocimiento",
    url: "https://notion.so",
    caso_uso: "Resume reuniones, crea documentación y organiza proyectos con IA que conoce tu wiki.",
    icono: "📝",
  },
  elevenlabs: {
    nombre: "ElevenLabs",
    tagline: "Síntesis de voz realista en cualquier idioma",
    url: "https://elevenlabs.io",
    caso_uso: "Convierte guiones en narración profesional para cursos, podcasts y asistentes de voz.",
    icono: "🎙️",
  },
  runway: {
    nombre: "Runway",
    tagline: "Generación y edición de video con IA generativa",
    url: "https://runwayml.com",
    caso_uso: "Genera clips de video, elimina fondos y edita producciones audiovisuales a partir de texto.",
    icono: "🎬",
  },
  langchain: {
    nombre: "LangChain",
    tagline: "Framework para construir aplicaciones con LLMs",
    url: "https://langchain.com",
    caso_uso: "Construye cadenas de IA, agentes autónomos y sistemas RAG listos para producción.",
    icono: "⛓️",
  },
  huggingface: {
    nombre: "HuggingFace",
    tagline: "Hub de modelos open-source más grande del mundo",
    url: "https://huggingface.co",
    caso_uso: "Descarga, prueba y despliega miles de modelos de IA sin infraestructura propia.",
    icono: "🤗",
  },
  ollama: {
    nombre: "Ollama",
    tagline: "Modelos LLM corriendo localmente en tu máquina",
    url: "https://ollama.ai",
    caso_uso: "Usa Llama, Mistral y otros modelos potentes sin enviar datos a la nube.",
    icono: "🦙",
  },
  mistral: {
    nombre: "Mistral AI",
    tagline: "Modelos open-source europeos de alto rendimiento",
    url: "https://mistral.ai",
    caso_uso: "Modelos europeos con licencia Apache 2.0, ideales para compliance GDPR.",
    icono: "🌬️",
  },
  copilot: {
    nombre: "GitHub Copilot",
    tagline: "Autocompletado de código con IA en tu IDE",
    url: "https://github.com/features/copilot",
    caso_uso: "Genera funciones completas, tests y documentación al vuelo mientras escribes código.",
    icono: "✈️",
  },
  gamma: {
    nombre: "Gamma",
    tagline: "Presentaciones profesionales generadas con IA",
    url: "https://gamma.app",
    caso_uso: "Crea decks, documentos y páginas web desde un prompt en segundos.",
    icono: "📊",
  },
  descript: {
    nombre: "Descript",
    tagline: "Edición de video y podcast editando solo el texto",
    url: "https://descript.com",
    caso_uso: "Edita audio y video simplemente borrando palabras del transcript como en un editor de texto.",
    icono: "✂️",
  },
}

// ── Contenido fallback (si la API falla o no hay key) ──────────────────────
const FALLBACK = {
  concepto: {
    titulo: "Chain-of-Thought Prompting",
    emoji: "🧠",
    definicion_corta: "técnica que hace razonar al modelo paso a paso antes de responder",
    por_que_importa:
      "Mejora la precisión hasta un 40% en tareas de lógica y análisis con solo cambiar cómo formulas la instrucción.",
    explicacion:
      "Chain-of-Thought (CoT) instruye al modelo a mostrar su razonamiento intermedio antes de dar la respuesta final. Al pedirle que descomponga el problema en pasos visibles, comete menos errores en lógica, matemáticas y análisis complejos. En 2026 es la base de la mayoría de técnicas de prompting profesional. Actívalo con frases como 'piensa paso a paso' o mostrando ejemplos con razonamiento explícito.",
  },
  datos_curiosos: [
    { dato: "Con 'Think step by step', GPT-3 mejoró su precisión matemática un 40% sin ningún reentrenamiento.", emoji: "📈" },
    { dato: "Un LLM sin CoT falla el 60% de los acertijos de física básica que un estudiante de secundaria resuelve.", emoji: "🔬" },
    { dato: "Google Brain acuñó el término Chain-of-Thought en 2022 con un paper de solo 3 páginas.", emoji: "📄" },
    { dato: "CoT reduce alucinaciones en razonamiento multi-paso hasta un 35% en benchmarks estándar.", emoji: "🛡️" },
    { dato: "El 92% de los ingenieros de IA senior usan alguna variante de CoT en sus prompts de producción.", emoji: "💼" },
  ],
  reflexion: {
    pregunta:
      "¿En cuál de tus tareas actuales podrías aplicar razonamiento paso a paso para obtener respuestas de IA más precisas y verificables?",
    pista: "Piensa en análisis, reportes técnicos o decisiones con múltiples variables.",
  },
  herramientas_ids: ["claude", "cursor", "perplexity", "notion", "langchain"],
  noticias: [
    {
      titulo: "Claude 4 establece nuevos récords en benchmarks de razonamiento complejo",
      resumen:
        "Anthropic lanzó Claude Opus 4 y Sonnet 4 con mejoras significativas en razonamiento multi-paso, superando a GPT-4.5 en SWE-bench y GPQA.",
      categoria: "LLMs",
      relevancia_europa:
        "Cumple con GDPR al no almacenar conversaciones por defecto y con sede europea disponible.",
    },
    {
      titulo: "EU AI Act: nuevas obligaciones para sistemas de alto riesgo desde agosto 2026",
      resumen:
        "La regulación europea exige auditorías, transparencia y gestión de riesgos para IA usada en RRHH, crédito y salud.",
      categoria: "Regulación",
      relevancia_europa:
        "Afecta directamente a empresas europeas que usan IA en toma de decisiones sobre personas.",
    },
    {
      titulo: "Mistral-3: el modelo open-source europeo que compite con Llama 4",
      resumen:
        "Mistral AI presentó su modelo más capaz con licencia Apache 2.0, entrenado íntegramente en Europa con liderazgo en idiomas europeos.",
      categoria: "Open Source",
      relevancia_europa:
        "Soberanía de datos total: infraestructura 100% europea, sin dependencia de proveedores estadounidenses.",
    },
  ],
}

// ── Concepto base del día (seed por día de semana) ──────────────────────────
const DIA_SEMANA = new Date(FECHA_STR).getDay()
const CONCEPTOS_SEED = [
  "RAG (Retrieval-Augmented Generation)",
  "Agentes de IA autónomos",
  "Fine-tuning vs Prompting",
  "Embeddings y búsqueda semántica",
  "Temperatura y parámetros de inferencia",
  "Chain-of-Thought Prompting",
  "Prompt Injection y seguridad en LLMs",
]
const CONCEPTO_BASE = CONCEPTOS_SEED[DIA_SEMANA]

function parseAPIResponse(texto) {
  const str = texto.trim()
  const jsonStr = str.startsWith("{") ? str : str.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
  return JSON.parse(jsonStr)
}

// ── Claude API — llamada 1: concepto + datos_curiosos + reflexion ────────────
async function llamarClaudeAPIPrimario(fechaStr) {
  if (!API_KEY) return null

  const prompt = `Hoy es ${fechaStr}. Genera contenido educativo diario sobre IA para una profesional que estudia para trabajar en Europa como AI Engineer y Consultant.

Concepto base del día: "${CONCEPTO_BASE}"

Responde SOLO con JSON válido (sin texto adicional, sin bloques markdown, sin \`\`\`):
{
  "concepto": {
    "titulo": "nombre técnico del concepto",
    "emoji": "1 emoji representativo",
    "definicion_corta": "qué es en máximo 20 palabras claras",
    "por_que_importa": "por qué importa profesionalmente en máximo 30 palabras",
    "explicacion": "explicación de 80-100 palabras: qué es, cómo funciona, cuándo usarlo en contexto profesional europeo"
  },
  "datos_curiosos": [
    {"dato": "dato sorprendente y poco conocido en 1 oración impactante", "emoji": "emoji"},
    {"dato": "dato sorprendente relacionado con el concepto", "emoji": "emoji"},
    {"dato": "dato sorprendente relacionado con el concepto", "emoji": "emoji"},
    {"dato": "dato sorprendente relacionado con el concepto", "emoji": "emoji"},
    {"dato": "dato sorprendente relacionado con el concepto", "emoji": "emoji"}
  ],
  "reflexion": {
    "pregunta": "pregunta profunda para reflexión personal, orientada a mercado laboral europeo y carrera en IA",
    "pista": "pista de aproximadamente 10 palabras para ayudar a responder"
  }
}`

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }],
    }),
  })

  if (!resp.ok) throw new Error(`API error ${resp.status}`)
  const data = await resp.json()
  return parseAPIResponse(data.content[0].text)
}

// ── Claude API — llamada 2: herramientas_ids + noticias ──────────────────────
async function llamarClaudeAPIExtra(fechaStr) {
  if (!API_KEY) return null

  const poolIds = Object.keys(HERRAMIENTAS_POOL).join('", "')

  const prompt = `Hoy es ${fechaStr}. Para el concepto de IA "${CONCEPTO_BASE}", genera:

Responde SOLO con JSON válido (sin texto adicional, sin bloques markdown, sin \`\`\`):
{
  "herramientas_ids": ["5 ids seleccionados por relevancia al concepto, del pool: "${poolIds}"],
  "noticias": [
    {
      "titulo": "titular conciso de noticia real de IA relevante esta semana",
      "resumen": "2 líneas: qué pasó y por qué importa para profesionales",
      "categoria": "LLMs|Open Source|Regulación|Herramientas|Investigación|Negocio",
      "relevancia_europa": "1 oración sobre impacto concreto para profesionales en Europa"
    },
    {"titulo": "...", "resumen": "...", "categoria": "...", "relevancia_europa": "..."},
    {"titulo": "...", "resumen": "...", "categoria": "...", "relevancia_europa": "..."}
  ]
}`

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 700,
      messages: [{ role: "user", content: prompt }],
    }),
  })

  if (!resp.ok) throw new Error(`API error ${resp.status}`)
  const data = await resp.json()
  return parseAPIResponse(data.content[0].text)
}

// ── Skeletons ───────────────────────────────────────────────────────────────

function SkeletonPulse({ className = "", style = {} }) {
  return (
    <div
      className={`rounded-lg animate-pulse ${className}`}
      style={{ background: "rgba(255,255,255,0.07)", ...style }}
    />
  )
}

function SkeletonConcepto() {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(6,182,212,0.25)" }}
    >
      <div className="flex items-start gap-3 mb-4">
        <SkeletonPulse style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
        <div className="flex-1 space-y-2">
          <SkeletonPulse style={{ height: 24, width: "60%" }} />
          <SkeletonPulse style={{ height: 14, width: "80%" }} />
        </div>
      </div>
      <SkeletonPulse style={{ height: 14, marginBottom: 8 }} />
      <SkeletonPulse style={{ height: 14, marginBottom: 8 }} />
      <SkeletonPulse style={{ height: 14, width: "70%", marginBottom: 20 }} />
      <SkeletonPulse style={{ height: 56, borderRadius: 12, marginBottom: 16 }} />
      <SkeletonPulse style={{ height: 42, borderRadius: 12 }} />
    </div>
  )
}

function SkeletonCard({ width = 260 }) {
  return (
    <div
      className="rounded-2xl p-4 border shrink-0"
      style={{
        width,
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <SkeletonPulse style={{ height: 40, width: 40, borderRadius: 8, marginBottom: 12 }} />
      <SkeletonPulse style={{ height: 13, marginBottom: 8 }} />
      <SkeletonPulse style={{ height: 13, marginBottom: 8 }} />
      <SkeletonPulse style={{ height: 13, width: "70%", marginBottom: 20 }} />
      <SkeletonPulse style={{ height: 34, borderRadius: 10 }} />
    </div>
  )
}

// ── Modal de compartir ──────────────────────────────────────────────────────

const REDES = [
  {
    id: "linkedin",
    nombre: "LinkedIn",
    icono: "💼",
    color: "#0077B5",
    bg: "rgba(0,119,181,0.12)",
    border: "rgba(0,119,181,0.35)",
  },
  {
    id: "twitter",
    nombre: "Twitter / X",
    icono: "✖️",
    color: "#1D9BF0",
    bg: "rgba(29,155,240,0.12)",
    border: "rgba(29,155,240,0.35)",
  },
  {
    id: "instagram",
    nombre: "Instagram / Threads",
    icono: "📸",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.12)",
    border: "rgba(225,48,108,0.35)",
  },
  {
    id: "whatsapp",
    nombre: "WhatsApp",
    icono: "💬",
    color: "#25D366",
    bg: "rgba(37,211,102,0.12)",
    border: "rgba(37,211,102,0.35)",
  },
]

function getTextos(tipo, datos) {
  if (tipo === "concepto") {
    const { titulo, definicion_corta, por_que_importa } = datos
    return {
      linkedin: `🧠 ${titulo}: ${definicion_corta}\n\n${por_que_importa}\n\nEl que entiende cómo funciona la IA tiene ventaja en cualquier industria.\n\n¿Ya sabes esto?\n👉 aipath-beta.vercel.app\n\n#InteligenciaArtificial #AIPath #FuturoDelTrabajo`,
      twitter: `Concepto IA que deberías conocer:\n\n${titulo}: ${definicion_corta}\n\n${por_que_importa}\n\naipath-beta.vercel.app 🧵 #IA #AIPath`,
      instagram: `${titulo}\n\n${definicion_corta}\n\n💡 ${por_que_importa}\n\nEl conocimiento de IA es el nuevo inglés.\naipath-beta.vercel.app`,
      whatsapp: `Hoy aprendí sobre IA:\n\n*${titulo}*: ${definicion_corta}\n\n${por_que_importa}\n\nLo estoy aprendiendo en: aipath-beta.vercel.app`,
    }
  }
  if (tipo === "dato") {
    const { dato, concepto_titulo } = datos
    return {
      linkedin: `💡 Dato que pocos conocen sobre IA:\n\n"${dato}"\n\n(Relacionado con ${concepto_titulo})\n\n¿Sabías esto?\n👉 aipath-beta.vercel.app\n\n#IA #AIPath #Tecnología`,
      twitter: `Dato IA poco conocido:\n\n"${dato}"\n\naipath-beta.vercel.app #IA #AIPath`,
      instagram: `Dato curioso sobre IA 👇\n\n"${dato}"\n\nMás datos en: aipath-beta.vercel.app`,
      whatsapp: `¿Sabías esto sobre IA?\n\n"${dato}"\n\nMás datos en: aipath-beta.vercel.app`,
    }
  }
  return { linkedin: "", twitter: "", instagram: "", whatsapp: "" }
}

function ShareModal({ tipo, datos, onClose }) {
  const textos = useMemo(() => getTextos(tipo, datos), [tipo, datos])
  const [copiado, setCopiado] = useState(null)

  const handleCopiar = useCallback(
    async (redId) => {
      try {
        await navigator.clipboard.writeText(textos[redId])
        setCopiado(redId)
        setTimeout(() => setCopiado(null), 2000)
      } catch {}
    },
    [textos]
  )

  const handleCompartir = useCallback(
    async (redId) => {
      const texto = textos[redId]
      if (navigator.share) {
        try {
          await navigator.share({ title: "AIPath", text: texto, url: "https://aipath-beta.vercel.app" })
        } catch {}
      } else {
        await handleCopiar(redId)
      }
    },
    [textos, handleCopiar]
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg rounded-2xl overflow-y-auto"
          style={{
            background: "#0f0f1a",
            border: "1px solid rgba(255,255,255,0.1)",
            maxHeight: "85dvh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabecera */}
          <div
            className="flex items-center justify-between px-5 py-4 sticky top-0 z-10"
            style={{ background: "#0f0f1a", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div>
              <p className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Compartir en redes
              </p>
              <h3
                className="text-base font-bold"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#fff" }}
              >
                {tipo === "concepto" ? datos.titulo : "Dato curioso de IA"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}
            >
              ✕
            </button>
          </div>

          {/* Cards por red */}
          <div className="p-4 space-y-3">
            {REDES.map((red) => (
              <div
                key={red.id}
                className="rounded-xl p-4 border"
                style={{ background: red.bg, borderColor: red.border }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{red.icono}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: "'Outfit', sans-serif", color: red.color }}
                  >
                    {red.nombre}
                  </span>
                </div>
                <p
                  className="text-xs leading-relaxed mb-3 whitespace-pre-line"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {textos[red.id]}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopiar(red.id)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    style={{
                      background:
                        copiado === red.id ? "rgba(0,212,170,0.2)" : "rgba(255,255,255,0.07)",
                      color: copiado === red.id ? "#00D4AA" : "rgba(255,255,255,0.7)",
                      border: `1px solid ${copiado === red.id ? "rgba(0,212,170,0.4)" : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {copiado === red.id ? "✅ Copiado" : "📋 Copiar texto"}
                  </button>
                  <button
                    onClick={() => handleCompartir(red.id)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    style={{ background: red.color, color: "#fff" }}
                  >
                    🔗 Compartir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Componente principal ────────────────────────────────────────────────────
export default function ExplorarScreen() {
  const [datosPrimarios, setDatosPrimarios] = useState(null)
  const [cargandoPrimarios, setCargandoPrimarios] = useState(true)
  const [datosExtra, setDatosExtra] = useState(null)
  const [cargandoExtra, setCargandoExtra] = useState(true)
  const [usandoFallback, setUsandoFallback] = useState(false)

  // Modal de compartir: { tipo: "concepto"|"dato", datos: {...} }
  const [modal, setModal] = useState(null)

  // Toast: aviso al abrir enlace externo
  const [toastVisible, setToastVisible] = useState(false)

  // Reflexión del día (guardada en localStorage)
  const reflexionInicial = useMemo(() => {
    try { return localStorage.getItem(REFLEXION_KEY) ?? "" } catch { return "" }
  }, [])
  const [reflexion, setReflexion] = useState(reflexionInicial)

  const guardarReflexion = useCallback((valor) => {
    setReflexion(valor)
    try { localStorage.setItem(REFLEXION_KEY, valor) } catch {}
  }, [])

  // Cargar datos al montar — dos llamadas paralelas independientes
  useEffect(() => {
    setUsandoFallback(false)

    // 1. Caché del día — si existe, hidrata ambos estados de golpe
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const c = JSON.parse(cached)
        setDatosPrimarios(c)
        setDatosExtra(c)
        setCargandoPrimarios(false)
        setCargandoExtra(false)
        return
      }
    } catch {}

    const fbPrim  = { concepto: FALLBACK.concepto, datos_curiosos: FALLBACK.datos_curiosos, reflexion: FALLBACK.reflexion }
    const fbExtra = { herramientas_ids: FALLBACK.herramientas_ids, noticias: FALLBACK.noticias }

    // 2. Llamada 1 — concepto + datos_curiosos + reflexion
    const promPrimario = llamarClaudeAPIPrimario(FECHA_STR)
      .then(r => {
        const resultado = r || fbPrim
        if (!r) setUsandoFallback(true)
        setDatosPrimarios(resultado)
        setCargandoPrimarios(false)
        return resultado
      })
      .catch(e => {
        console.warn("[ExplorarScreen] API primario falló:", e.message)
        setDatosPrimarios(fbPrim)
        setCargandoPrimarios(false)
        setUsandoFallback(true)
        return fbPrim
      })

    // 3. Llamada 2 — herramientas_ids + noticias
    const promExtra = llamarClaudeAPIExtra(FECHA_STR)
      .then(r => {
        const resultado = r || fbExtra
        if (!r) setUsandoFallback(true)
        setDatosExtra(resultado)
        setCargandoExtra(false)
        return resultado
      })
      .catch(e => {
        console.warn("[ExplorarScreen] API extra falló:", e.message)
        setDatosExtra(fbExtra)
        setCargandoExtra(false)
        setUsandoFallback(true)
        return fbExtra
      })

    // 4. Guardar caché completo una vez que ambas resuelvan
    Promise.all([promPrimario, promExtra]).then(([prim, extra]) => {
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ...prim, ...extra })) } catch {}
    })
  }, [])

  const abrirEnNuevaPestana = useCallback((url) => {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2800)
    window.open(url, "_blank", "noopener,noreferrer")
  }, [])

  // Resolver las 5 herramientas del día a partir de los IDs
  const herramientas = useMemo(() => {
    if (!datosExtra?.herramientas_ids) return []
    return datosExtra.herramientas_ids
      .map((id) => (HERRAMIENTAS_POOL[id] ? { id, ...HERRAMIENTAS_POOL[id] } : null))
      .filter(Boolean)
      .slice(0, 5)
  }, [datosExtra])

  return (
    <>
      {/* ── Toast: aviso nueva pestaña ─────────────────────────────────────── */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            key="toast-externa"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-1/2 z-50 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg"
            style={{
              transform: "translateX(-50%)",
              background: "rgba(15,15,26,0.95)",
              border: "1px solid rgba(6,182,212,0.4)",
              color: "#06B6D4",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
            }}
          >
            🔗 Abriendo en nueva pestaña para no perder tu progreso
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal de compartir ─────────────────────────────────────────────── */}
      {modal && (
        <ShareModal
          tipo={modal.tipo}
          datos={modal.datos}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── Aviso fallback ─────────────────────────────────────────────────── */}
      {usandoFallback && !cargandoPrimarios && !cargandoExtra && (
        <div
          className="mx-4 mb-4 rounded-xl px-4 py-3 text-xs"
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.25)",
            color: "#F59E0B",
          }}
        >
          ⚠️ Sin conexión con Claude API — mostrando contenido de ejemplo.
          Configura <code className="font-mono">VITE_CLAUDE_API_KEY</code> en{" "}
          <code className="font-mono">.env.local</code> para activar el contenido diario real.
        </div>
      )}

      <div className="w-full max-w-4xl mx-auto px-4 pb-6 space-y-10">

        {/* ═══════════════════════════════════════════════════════════════════
            SECCIÓN 1 — Concepto del día
        ════════════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💡</span>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}
            >
              Concepto del día
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold ml-1"
              style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4" }}
            >
              Cambia a medianoche
            </span>
          </div>

          {cargandoPrimarios ? (
            <SkeletonConcepto />
          ) : (
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(6,182,212,0.25)",
              }}
            >
              {/* Cabecera con emoji + título */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl leading-none">{datosPrimarios.concepto.emoji}</span>
                <div>
                  <h3
                    className="text-xl font-extrabold leading-tight"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "#fff" }}
                  >
                    {datosPrimarios.concepto.titulo}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "#06B6D4" }}>
                    {datosPrimarios.concepto.definicion_corta}
                  </p>
                </div>
              </div>

              {/* Explicación */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {datosPrimarios.concepto.explicacion}
              </p>

              {/* Por qué importa */}
              <div
                className="rounded-xl p-3 mb-5 text-sm"
                style={{
                  background: "rgba(0,212,170,0.08)",
                  borderLeft: "3px solid #00D4AA",
                }}
              >
                <span className="font-semibold" style={{ color: "#00D4AA" }}>
                  ✦ Por qué importa —{" "}
                </span>
                <span style={{ color: "var(--color-text-secondary)" }}>
                  {datosPrimarios.concepto.por_que_importa}
                </span>
              </div>

              <button
                onClick={() => setModal({ tipo: "concepto", datos: datosPrimarios.concepto })}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  color: "#fff",
                }}
              >
                🔗 Compartir este concepto
              </button>
            </div>
          )}
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECCIÓN 2 — 5 Datos curiosos del día (carrusel)
        ════════════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">⚡</span>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}
            >
              Datos curiosos
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold ml-1"
              style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
            >
              desliza →
            </span>
          </div>

          <div
            className="carousel-h flex gap-3 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {cargandoPrimarios
              ? [0, 1, 2, 3, 4].map((i) => <SkeletonCard key={i} width={240} />)
              : datosPrimarios.datos_curiosos.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="rounded-2xl p-4 border shrink-0 flex flex-col"
                    style={{
                      scrollSnapAlign: "start",
                      width: 240,
                      background: "rgba(245,158,11,0.06)",
                      borderColor: "rgba(245,158,11,0.2)",
                    }}
                  >
                    <span className="text-3xl mb-3">{d.emoji}</span>
                    <p
                      className="text-sm leading-relaxed flex-1 mb-4"
                      style={{ color: "rgba(255,255,255,0.82)" }}
                    >
                      {d.dato}
                    </p>
                    <button
                      onClick={() =>
                        setModal({
                          tipo: "dato",
                          datos: { dato: d.dato, concepto_titulo: datosPrimarios.concepto.titulo },
                        })
                      }
                      className="py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 mt-auto"
                      style={{
                        background: "rgba(245,158,11,0.15)",
                        color: "#F59E0B",
                        border: "1px solid rgba(245,158,11,0.3)",
                      }}
                    >
                      🔗 Compartir
                    </button>
                  </motion.div>
                ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECCIÓN 3 — Reflexión del día
        ════════════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🤔</span>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#8B5CF6" }}
            >
              Reflexión del día
            </h2>
          </div>

          {cargandoPrimarios ? (
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(139,92,246,0.2)",
              }}
            >
              <SkeletonPulse style={{ height: 16, marginBottom: 8 }} />
              <SkeletonPulse style={{ height: 16, width: "80%", marginBottom: 20 }} />
              <SkeletonPulse style={{ height: 96, borderRadius: 12 }} />
            </div>
          ) : (
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "rgba(139,92,246,0.06)",
                borderColor: "rgba(139,92,246,0.25)",
              }}
            >
              <p
                className="text-base font-semibold leading-relaxed mb-2"
                style={{ color: "#fff", fontFamily: "'Outfit', sans-serif" }}
              >
                {datosPrimarios.reflexion.pregunta}
              </p>
              <p className="text-xs mb-4" style={{ color: "rgba(139,92,246,0.75)" }}>
                💜 Pista: {datosPrimarios.reflexion.pista}
              </p>
              <textarea
                value={reflexion}
                onChange={(e) => guardarReflexion(e.target.value)}
                placeholder="Escribe tu reflexión aquí… se guarda automáticamente."
                rows={4}
                className="w-full rounded-xl p-3 text-sm resize-none outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: "1.65",
                  fontFamily: "inherit",
                }}
              />
              {reflexion.length > 0 && (
                <p
                  className="text-xs mt-2 text-right"
                  style={{ color: "rgba(139,92,246,0.55)" }}
                >
                  ✓ Guardado
                </p>
              )}
            </div>
          )}
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECCIÓN 4 — 5 Herramientas destacadas (carrusel)
        ════════════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🛠️</span>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}
            >
              Herramientas destacadas
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold ml-1"
              style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4" }}
            >
              desliza →
            </span>
          </div>

          <div
            className="carousel-h flex gap-3 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {cargandoExtra
              ? [0, 1, 2, 3, 4].map((i) => <SkeletonCard key={i} width={260} />)
              : herramientas.map((h, i) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="rounded-2xl p-4 border shrink-0 flex flex-col"
                    style={{
                      scrollSnapAlign: "start",
                      width: 260,
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Icono + nombre */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {h.icono}
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="text-sm font-extrabold leading-tight truncate"
                          style={{ fontFamily: "'Outfit', sans-serif", color: "#fff" }}
                        >
                          {h.nombre}
                        </h3>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "#06B6D4" }}>
                          {h.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Caso de uso */}
                    <p
                      className="text-xs leading-relaxed flex-1 mb-4"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {h.caso_uso}
                    </p>

                    <button
                      onClick={() => abrirEnNuevaPestana(h.url)}
                      className="flex items-center justify-center gap-1 w-full py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 mt-auto"
                      style={{
                        background: "rgba(6,182,212,0.12)",
                        color: "#06B6D4",
                        border: "1px solid rgba(6,182,212,0.3)",
                      }}
                    >
                      Explorar →
                    </button>
                  </motion.div>
                ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECCIÓN 5 — 3 Noticias IA del día (carrusel)
        ════════════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📰</span>
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}
            >
              Noticias IA
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
            >
              desliza →
            </span>
          </div>

          <div
            className="carousel-h flex gap-3 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {cargandoExtra
              ? [0, 1, 2].map((i) => <SkeletonCard key={i} width={280} />)
              : datosExtra.noticias.map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    className="rounded-2xl p-4 border shrink-0 flex flex-col"
                    style={{
                      scrollSnapAlign: "start",
                      width: 280,
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Categoría */}
                    <span
                      className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full mb-2"
                      style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4" }}
                    >
                      {n.categoria}
                    </span>

                    {/* Título */}
                    <h4
                      className="text-sm font-bold leading-snug mb-2"
                      style={{ color: "#fff", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {n.titulo}
                    </h4>

                    {/* Resumen */}
                    <p
                      className="text-xs leading-relaxed mb-3 flex-1"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {n.resumen}
                    </p>

                    {/* Relevancia Europa */}
                    {n.relevancia_europa && (
                      <div
                        className="rounded-lg px-3 py-2 mb-3 text-xs"
                        style={{
                          background: "rgba(0,212,170,0.07)",
                          borderLeft: "2px solid #00D4AA",
                        }}
                      >
                        <span style={{ color: "#00D4AA" }}>🇪🇺 </span>
                        <span style={{ color: "rgba(255,255,255,0.55)" }}>
                          {n.relevancia_europa}
                        </span>
                      </div>
                    )}

                    {/* Leer más → Google Search */}
                    <button
                      onClick={() =>
                        abrirEnNuevaPestana(
                          `https://www.google.com/search?q=${encodeURIComponent(n.titulo + " inteligencia artificial 2026")}`
                        )
                      }
                      className="py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 mt-auto"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      Leer más →
                    </button>
                  </motion.div>
                ))}
          </div>
        </motion.section>

      </div>
    </>
  )
}
