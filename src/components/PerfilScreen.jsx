import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Usuarios demo base — siempre presentes en el ranking
const DEMO_RANKING = [
  { email: "team@aipath.app",         nombre: "AIPath Team", xp: 4850, racha: 47 },
  { email: "demo@estratek.com.co",    nombre: "Demo User",   xp: 2340, racha: 12 },
  { email: "admin@estratek.com.co",   nombre: "Admin",       xp: 1980, racha: 8  },
]

const STORAGE_KEY_PREFIX = "aipath_progreso_"
const USERS_KEY = "aipath_users"

function emailToKey(email) {
  return `${STORAGE_KEY_PREFIX}${email.replace(/[@.]/g, "_")}`
}

function getProgresoUsuario(email) {
  try {
    const raw = localStorage.getItem(emailToKey(email))
    if (!raw) return { xp: 0, racha: 0 }
    const data = JSON.parse(raw)
    return { xp: data.xpTotal || 0, racha: data.rachaDiaria || 0 }
  } catch {
    return { xp: 0, racha: 0 }
  }
}

function buildRanking(sessionEmail) {
  // 1. Usuarios registrados reales en localStorage
  let realUsers = []
  try {
    realUsers = JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
  } catch { realUsers = [] }

  // Emails demo fijos para no duplicar
  const demoEmails = new Set(DEMO_RANKING.map(u => u.email))

  // Paola también es un usuario especial hardcodeado — obtener su progreso real
  const specialEmails = ["paola@estratek.com.co", "equipo@estratek.com.co"]
  const specialUsers = specialEmails.map(email => {
    const { xp, racha } = getProgresoUsuario(email)
    const nombre = email === "paola@estratek.com.co" ? "Paola" : "Equipo"
    return { email, nombre, xp, racha }
  })

  // Usuarios registrados reales (sin los que ya están en demo o special)
  const extraUsers = realUsers
    .filter(u => !demoEmails.has(u.email) && !specialEmails.includes(u.email))
    .map(u => {
      const { xp, racha } = getProgresoUsuario(u.email)
      const nombre = u.nombre || u.email.split("@")[0]
      return { email: u.email, nombre, xp, racha }
    })

  // Combinar: demos fijos + especiales + reales
  const todos = [
    ...DEMO_RANKING,
    ...specialUsers,
    ...extraUsers,
  ]

  // Asegurar que el usuario actual esté (aunque tenga 0 XP)
  const yaEsta = todos.some(u => u.email === sessionEmail)
  if (!yaEsta && sessionEmail) {
    const { xp, racha } = getProgresoUsuario(sessionEmail)
    todos.push({ email: sessionEmail, nombre: sessionEmail.split("@")[0], xp, racha })
  }

  // Ordenar descendente por XP
  return todos.sort((a, b) => b.xp - a.xp)
}

const MEDAL = ["🥇", "🥈", "🥉"]

export default function PerfilScreen({ session, progreso, onLogout }) {
  const xpTotal    = progreso?.xpTotal || 0
  const nivel      = Math.floor(xpTotal / 300) + 1
  const racha      = progreso?.rachaDiaria || 1
  const completadas = (progreso?.leccionesCompletadas || []).length

  const inicial = session?.nombre?.[0]?.toUpperCase() || session?.email?.[0]?.toUpperCase() || "U"
  const emailActual = session?.email || ""

  const [ranking, setRanking] = useState([])

  useEffect(() => {
    setRanking(buildRanking(emailActual))
  }, [emailActual, xpTotal])

  const top10 = ranking.slice(0, 10)
  const posActual = ranking.findIndex(u => u.email === emailActual)
  const enTop10 = posActual >= 0 && posActual < 10

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
          className="rounded-2xl p-4 flex items-center justify-between mb-6"
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

        {/* ── RANKING GLOBAL ── */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🏆</span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Ranking Global XP
            </h3>
          </div>

          <div className="flex flex-col gap-1.5">
            {top10.map((usuario, idx) => {
              const esActual = usuario.email === emailActual
              return (
                <motion.div
                  key={usuario.email}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                  style={{
                    background: esActual
                      ? "rgba(6,182,212,0.12)"
                      : "var(--color-bg-elevated)",
                    border: esActual
                      ? "1px solid rgba(6,182,212,0.4)"
                      : "1px solid transparent",
                  }}
                >
                  {/* Posición / medalla */}
                  <span className="w-6 text-center text-sm font-bold shrink-0"
                    style={{ color: idx < 3 ? undefined : "var(--color-text-muted)" }}>
                    {idx < 3 ? MEDAL[idx] : `#${idx + 1}`}
                  </span>

                  {/* Nombre */}
                  <span
                    className="flex-1 text-sm font-semibold truncate"
                    style={{ color: esActual ? "#06B6D4" : "var(--color-text-primary)" }}
                  >
                    {usuario.nombre}
                    {esActual && (
                      <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: "rgba(6,182,212,0.2)", color: "#06B6D4" }}>
                        tú
                      </span>
                    )}
                  </span>

                  {/* Racha */}
                  <span className="text-xs shrink-0" style={{ color: "#F97316" }}>
                    🔥 {usuario.racha}d
                  </span>

                  {/* XP */}
                  <span
                    className="text-sm font-extrabold shrink-0 w-16 text-right"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}
                  >
                    {usuario.xp.toLocaleString()}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Usuario actual fuera del top 10 */}
          {!enTop10 && posActual >= 0 && (
            <>
              <div className="my-3 flex items-center gap-2">
                <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
                <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>tu posición</span>
                <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
              </div>
              <div
                className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                style={{
                  background: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.4)",
                }}
              >
                <span className="w-6 text-center text-sm font-bold shrink-0"
                  style={{ color: "var(--color-text-muted)" }}>
                  #{posActual + 1}
                </span>
                <span className="flex-1 text-sm font-semibold truncate" style={{ color: "#06B6D4" }}>
                  {ranking[posActual]?.nombre}
                  <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(6,182,212,0.2)", color: "#06B6D4" }}>
                    tú
                  </span>
                </span>
                <span className="text-xs shrink-0" style={{ color: "#F97316" }}>
                  🔥 {ranking[posActual]?.racha}d
                </span>
                <span
                  className="text-sm font-extrabold shrink-0 w-16 text-right"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}
                >
                  {ranking[posActual]?.xp.toLocaleString()}
                </span>
              </div>
            </>
          )}
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
