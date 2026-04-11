import { motion } from "framer-motion"

export default function PerfilScreen({ session, progreso, onLogout }) {
  const xpTotal = progreso?.xpTotal || 0
  const nivel   = Math.floor(xpTotal / 300) + 1
  const racha   = progreso?.rachaDiaria || 1
  const completadas = (progreso?.leccionesCompletadas || []).length

  const inicial = session?.nombre?.[0]?.toUpperCase() || session?.email?.[0]?.toUpperCase() || "U"

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold mb-3"
            style={{ background: "var(--color-accent-primary)", color: "#ffffff" }}
          >
            {inicial}
          </div>
          <p className="text-xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {session?.nombre || session?.email?.split("@")[0] || "Usuario"}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            {session?.email}
          </p>
          {session?.rol === "admin" && (
            <span
              className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
              style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4" }}
            >
              Admin
            </span>
          )}
        </div>

        {/* Stats */}
        <div
          className="rounded-2xl p-5 grid grid-cols-3 gap-4 text-center mb-6"
          style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
        >
          <div>
            <p className="text-xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}>
              {nivel}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Nivel</p>
          </div>
          <div>
            <p className="text-xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}>
              {xpTotal.toLocaleString()}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>XP total</p>
          </div>
          <div>
            <p className="text-xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#F97316" }}>
              {racha}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Racha</p>
          </div>
        </div>

        {/* Lecciones completadas */}
        <div
          className="rounded-2xl p-4 flex items-center justify-between mb-8"
          style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <p className="text-sm font-semibold text-white">Lecciones completadas</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Sigue avanzando</p>
            </div>
          </div>
          <p className="text-2xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}>
            {completadas}
          </p>
        </div>

        {/* Cerrar sesión */}
        <motion.button
          onClick={onLogout}
          className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#EF4444",
          }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
        >
          Cerrar sesión
        </motion.button>
      </motion.div>
    </div>
  )
}
