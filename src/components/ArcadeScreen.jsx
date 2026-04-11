import { motion } from "framer-motion"

const juegos = [
  { nombre: "Verdadero o Falso", emoji: "⚡" },
  { nombre: "Conexión Rápida",   emoji: "🔗" },
  { nombre: "Completa el Concepto", emoji: "✏️" },
  { nombre: "Ordena los Pasos",  emoji: "📋" },
  { nombre: "Batalla de Conceptos", emoji: "⚔️" },
  { nombre: "Speed Cards",       emoji: "🃏" },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ArcadeScreen() {
  return (
    <div className="w-full max-w-lg mx-auto px-4 pb-8">

      {/* Encabezado */}
      <motion.div
        className="pt-6 pb-5 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-5xl mb-2">🕹️</div>
        <h1
          className="text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif", color: "var(--color-accent-primary)" }}
        >
          Arcade
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Pon a prueba lo que sabes
        </p>
      </motion.div>

      {/* Grid 2×3 */}
      <div className="grid grid-cols-2 gap-3">
        {juegos.map((juego, i) => (
          <motion.div
            key={juego.nombre}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col gap-3 rounded-2xl p-4"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Badge NUEVO */}
            <span
              className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(245,158,11,0.18)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.35)" }}
            >
              NUEVO
            </span>

            {/* Emoji + nombre */}
            <div>
              <span style={{ fontSize: 24 }}>{juego.emoji}</span>
              <p
                className="text-sm font-semibold mt-1 leading-tight"
                style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}
              >
                {juego.nombre}
              </p>
            </div>

            {/* XP */}
            <p className="text-xs font-bold" style={{ color: "#F59E0B" }}>+15 XP</p>

            {/* Botón Jugar */}
            <button
              className="w-full text-sm font-semibold py-1.5 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{
                background: "var(--color-accent-primary)",
                color: "#fff",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Jugar
            </button>
          </motion.div>
        ))}
      </div>

      {/* Daily Challenge */}
      <motion.div
        className="mt-5 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(245,158,11,0.06) 100%)",
          border: "1px solid rgba(245,158,11,0.35)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontSize: 22 }}>☀️</span>
          <span
            className="text-base font-extrabold"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}
          >
            Daily Challenge
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Nuevo reto cada día a medianoche
        </p>
        <button
          className="mt-3 w-full text-sm font-semibold py-2 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{
            background: "rgba(245,158,11,0.22)",
            color: "#F59E0B",
            border: "1px solid rgba(245,158,11,0.45)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Aceptar reto · +30 XP
        </button>
      </motion.div>

      {/* Streak Defender */}
      <motion.div
        className="mt-3 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.06) 100%)",
          border: "1px solid rgba(249,115,22,0.35)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontSize: 22 }}>🔥</span>
          <span
            className="text-base font-extrabold"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#F97316" }}
          >
            Streak Defender
          </span>
        </div>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Salva tu racha en 2 minutos
        </p>
        <button
          className="mt-3 w-full text-sm font-semibold py-2 rounded-xl transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{
            background: "rgba(249,115,22,0.22)",
            color: "#F97316",
            border: "1px solid rgba(249,115,22,0.45)",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Defender racha · +10 XP
        </button>
      </motion.div>

    </div>
  )
}
