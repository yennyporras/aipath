import { motion } from "framer-motion"

// Tips rotativos — uno por día según fecha
const TIPS = [
  "Los mejores prompts tienen contexto, objetivo y formato claro.",
  "Chain-of-Thought mejora un 40% la precisión en tareas complejas.",
  "Un token ≈ 0.75 palabras. Cada token cuenta en la API.",
  "Few-shot learning: 3 ejemplos pueden reemplazar miles de datos de entrenamiento.",
  "RAG combina la memoria del LLM con tu base de datos privada.",
  "El system prompt define el rol; el user prompt define la tarea.",
  "Temperatura 0 = determinista. Temperatura 1 = creativo.",
  "Claude Sonnet procesa 200,000 tokens — una novela completa.",
  "Los agentes autónomos pueden encadenar herramientas sin intervención humana.",
  "La IA generativa predice el siguiente token más probable, no 'piensa'.",
  "Structured outputs garantizan respuestas JSON válidas sin parseo frágil.",
  "El contexto al inicio y al final del prompt recibe más atención del modelo.",
]

function getSaludo() {
  const hora = new Date().getHours()
  if (hora >= 6  && hora < 12) return "Buenos días"
  if (hora >= 12 && hora < 19) return "Buenas tardes"
  if (hora >= 19)               return "Buenas noches"
  return "Hola, noctámbulo/a"   // 0-6h
}

function getTipDelDia() {
  const seed = new Date().toDateString()
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return TIPS[hash % TIPS.length]
}

const OPCIONES = [
  {
    id: "estudiar",
    icon: "📚",
    titulo: "Estudiar",
    desc: "Continúa donde lo dejaste",
    tab: "academy",
  },
  {
    id: "jugar",
    icon: "🎮",
    titulo: "Jugar",
    desc: "Pon a prueba lo que sabes",
    tab: "arcade",
  },
  {
    id: "practicar",
    icon: "⚡",
    titulo: "Practicar",
    desc: "Reto diario de hoy",
    tab: "arcade",
  },
  {
    id: "explorar",
    icon: "🧭",
    titulo: "Explorar",
    desc: "Conceptos y noticias IA",
    tab: "explorar",
  },
]

export default function WelcomeScreen({ nombre, rachaDiaria, onSelect }) {
  const saludo = getSaludo()
  const tip = getTipDelDia()
  const primerNombre = nombre?.split(" ")[0] || nombre || "Paola"

  return (
    <motion.div
      className="min-h-dvh flex flex-col items-center justify-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="w-full max-w-md">

        {/* Saludo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-8"
        >
          <p
            className="text-3xl font-extrabold mb-2"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#fff" }}
          >
            {saludo}, {primerNombre} 👋
          </p>
          <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
            ¿Qué quieres hacer hoy?
          </p>
        </motion.div>

        {/* Racha */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          {rachaDiaria > 0 ? (
            <>
              <span className="text-xl">🔥</span>
              <span className="text-sm font-semibold" style={{ color: "#F97316" }}>
                {rachaDiaria} {rachaDiaria === 1 ? "día" : "días"} seguidos
              </span>
            </>
          ) : (
            <>
              <span className="text-xl">✨</span>
              <span className="text-sm font-semibold" style={{ color: "var(--color-text-secondary)" }}>
                ¡Hoy empieza tu racha!
              </span>
            </>
          )}
        </motion.div>

        {/* Cards 2×2 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {OPCIONES.map((op, i) => (
            <motion.button
              key={op.id}
              onClick={() => onSelect(op.tab)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.07 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl p-5 text-left transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(6,182,212,0.1)"
                e.currentTarget.style.borderColor = "rgba(6,182,212,0.35)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
              }}
            >
              <span className="text-3xl block mb-2">{op.icon}</span>
              <p
                className="font-bold text-sm text-white"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {op.titulo}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {op.desc}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Tip del día */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl px-4 py-3 text-sm"
          style={{
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <span className="font-semibold" style={{ color: "#A78BFA" }}>
            💡 Tip del día —{" "}
          </span>
          <span style={{ color: "var(--color-text-secondary)" }}>{tip}</span>
        </motion.div>

      </div>
    </motion.div>
  )
}
