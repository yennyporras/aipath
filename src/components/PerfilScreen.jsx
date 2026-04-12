import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Usuarios demo base — siempre presentes en el ranking
const DEMO_RANKING = [
  { email: "team@aipath.app",         nombre: "AIPath Team", xp: 4850, racha: 47 },
  { email: "paola@aipath.app",        nombre: "Paola Y.",    xp: 3200, racha: 28 },
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
  let realUsers = []
  try {
    realUsers = JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
  } catch { realUsers = [] }

  const demoEmails = new Set(DEMO_RANKING.map(u => u.email))

  const extraUsers = realUsers
    .filter(u => !demoEmails.has(u.email))
    .map(u => {
      const { xp, racha } = getProgresoUsuario(u.email)
      const nombre = u.nombre || u.email.split("@")[0]
      return { email: u.email, nombre, xp, racha }
    })

  const todos = [...DEMO_RANKING, ...extraUsers]

  const yaEsta = todos.some(u => u.email === sessionEmail)
  if (!yaEsta && sessionEmail) {
    const { xp, racha } = getProgresoUsuario(sessionEmail)
    todos.push({ email: sessionEmail, nombre: sessionEmail.split("@")[0], xp, racha })
  }

  return todos.sort((a, b) => b.xp - a.xp)
}

const MEDAL = ["🥇", "🥈", "🥉"]

/* ─── Badges conocidos ─── */
const BADGES_CONOCIDOS = [
  { id: "daily_master", emoji: "☀️", nombre: "Daily Master" },
  { id: "M1 Master",    emoji: "🧠", nombre: "M1 Master"    },
  { id: "M4 Master",    emoji: "🎯", nombre: "M4 Master"    },
  { id: "racha_7",      emoji: "🔥", nombre: "Racha 7 días" },
  { id: "racha_30",     emoji: "⚡", nombre: "Racha 30 días" },
  { id: "first_lesson", emoji: "🌱", nombre: "1ª Lección"   },
]

/* ─── Actividad últimos 7 días ─── */
function getUltimos7Dias() {
  let actividad = {}
  try {
    const raw = localStorage.getItem("aipath_actividad_diaria")
    actividad = raw ? JSON.parse(raw) : {}
  } catch {}

  const dias = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    const label = d.toLocaleDateString("es", { weekday: "short" }).slice(0, 2)
    dias.push({ key, xp: actividad[key] || 0, label, esHoy: i === 0 })
  }
  return dias
}

export default function PerfilScreen({ session, progreso, onLogout }) {
  const xpTotal    = progreso?.xpTotal || 0
  const racha      = progreso?.rachaDiaria || 1
  const completadas = (progreso?.leccionesCompletadas || []).length
  const badgesGanados = progreso?.badges || []

  const inicial = session?.nombre?.[0]?.toUpperCase() || session?.email?.[0]?.toUpperCase() || "U"
  const emailActual = session?.email || ""

  const [ranking, setRanking] = useState([])
  const [loadingRanking, setLoadingRanking] = useState(true)
  const [dias7, setDias7] = useState(() => getUltimos7Dias())

  useEffect(() => {
    setRanking(buildRanking(emailActual))
    setLoadingRanking(false)
  }, [emailActual, xpTotal])

  // Refrescar gráfica cuando el componente está visible
  useEffect(() => {
    setDias7(getUltimos7Dias())
  }, [xpTotal])

  const top10 = ranking.slice(0, 10)
  const posActual = ranking.findIndex(u => u.email === emailActual)
  const enTop10 = posActual >= 0 && posActual < 10

  // XP máximo de los 7 días para escalar barras
  const maxXp7 = Math.max(...dias7.map(d => d.xp), 1)

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="rounded-full flex items-center justify-center text-2xl font-extrabold mb-3"
            style={{
              width: 64,
              height: 64,
              background: "var(--color-accent-primary)",
              color: "#ffffff",
              border: "2px solid #06B6D4",
              boxShadow: "0 0 0 4px rgba(6,182,212,0.15)",
            }}
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

        {/* Stats 2×2 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* XP Total */}
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
          >
            <p className="text-xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#F59E0B" }}>
              {xpTotal.toLocaleString()}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>XP Total</p>
          </div>

          {/* Lecciones completadas */}
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
          >
            <p className="text-xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}>
              {completadas}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Lecciones</p>
          </div>

          {/* Racha */}
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
          >
            <p className="text-xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#F97316" }}>
              {racha}🔥
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Racha días</p>
          </div>

          {/* Posición ranking */}
          <div
            className="rounded-2xl p-4 text-center"
            style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
          >
            {loadingRanking ? (
              <div className="skeleton rounded-lg h-7 mx-auto w-12" />
            ) : (
              <p className="text-xl font-extrabold" style={{ fontFamily: "'Outfit', sans-serif", color: "#34D399" }}>
                #{posActual >= 0 ? posActual + 1 : "—"}
              </p>
            )}
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>Ranking</p>
          </div>
        </div>

        {/* Gráfica actividad 7 días */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--color-text-muted)" }}>
            Actividad últimos 7 días
          </p>
          <div className="flex items-end justify-between gap-1.5" style={{ height: 56 }}>
            {dias7.map(dia => (
              <div key={dia.key} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm transition-all duration-500"
                  style={{
                    height: dia.xp > 0 ? Math.max(6, Math.round((dia.xp / maxXp7) * 48)) : 4,
                    background: dia.esHoy
                      ? "#06B6D4"
                      : dia.xp > 0
                      ? "rgba(6,182,212,0.45)"
                      : "var(--color-border)",
                    borderRadius: "3px 3px 0 0",
                  }}
                />
                <span
                  className="text-[9px] font-semibold capitalize"
                  style={{ color: dia.esHoy ? "#06B6D4" : "var(--color-text-muted)" }}
                >
                  {dia.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges 3×2 */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--color-text-muted)" }}>
            Badges
          </p>
          <div className="grid grid-cols-3 gap-3">
            {BADGES_CONOCIDOS.map(badge => {
              const ganado = badgesGanados.includes(badge.id)
              return (
                <div
                  key={badge.id}
                  className="flex flex-col items-center gap-1 rounded-xl p-3"
                  style={{
                    background: ganado ? "rgba(6,182,212,0.1)" : "var(--color-bg-elevated)",
                    border: ganado ? "1px solid rgba(6,182,212,0.3)" : "1px solid var(--color-border)",
                    opacity: ganado ? 1 : 0.45,
                  }}
                >
                  <span style={{ fontSize: 22, filter: ganado ? "none" : "grayscale(1)" }}>
                    {badge.emoji}
                  </span>
                  <span
                    className="text-[10px] font-semibold text-center leading-tight"
                    style={{ color: ganado ? "#06B6D4" : "var(--color-text-muted)" }}
                  >
                    {badge.nombre}
                  </span>
                </div>
              )
            })}
          </div>
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

          {/* Skeleton loader mientras carga */}
          {loadingRanking && (
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="skeleton rounded-xl h-10"
                  style={{ animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
          )}

          {/* Lista del ranking */}
          {!loadingRanking && (
            <>
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
                      <span className="w-6 text-center text-sm font-bold shrink-0"
                        style={{ color: idx < 3 ? undefined : "var(--color-text-muted)" }}>
                        {idx < 3 ? MEDAL[idx] : `#${idx + 1}`}
                      </span>

                      <span
                        className="flex-1 text-sm font-semibold truncate"
                        style={{ color: esActual ? "#06B6D4" : "var(--color-text-primary)" }}
                      >
                        {usuario.nombre}
                        {esActual && (
                          <span className="ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded"
                            style={{ background: "rgba(6,182,212,0.2)", color: "#06B6D4" }}>
                            tú
                          </span>
                        )}
                      </span>

                      <span className="text-xs shrink-0" style={{ color: "#F97316" }}>
                        🔥 {usuario.racha}d
                      </span>

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
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>tu posición</span>
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
                      <span className="ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded"
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
