import { useState } from "react"

const USUARIOS_DEMO = [
  { email: "demo@estratek.com.co",   password: "demo1234",     nombre: "Demo User",       rol: "estudiante" },
  { email: "admin@estratek.com.co",  password: "admin1234",    nombre: "Administrador",   rol: "admin" },
  { email: "paola@estratek.com.co",  password: "paola1234",    nombre: "Paola",           rol: "admin" },
  { email: "equipo@estratek.com.co", password: "estratek2026", nombre: "Equipo Estratek", rol: "estudiante" },
]
const USERS_KEY   = "aipath_users"
const SESSION_KEY = "aipath_session"

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") } catch { return [] }
}

function findUser(email, password) {
  const demo = USUARIOS_DEMO.find(u => u.email === email && u.password === password)
  if (demo) return demo
  const found = getUsers().find(u => u.email === email && u.password === password)
  return found ? { ...found, rol: "estudiante" } : null
}

const ACCENT = "#6366F1"

export default function LoginScreen({ onLogin }) {
  const [tab, setTab]         = useState("login")
  const [email, setEmail]     = useState("")
  const [password, setPass]   = useState("")
  const [showPass, setShow]   = useState(false)
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)

  function handleLogin(e) {
    e.preventDefault(); setError(""); setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const user = findUser(email, password)
      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, nombre: user.nombre, rol: user.rol || "estudiante" }))
        onLogin(user.email)
      } else {
        setError("Credenciales incorrectas. Prueba demo@estratek.com.co / demo1234")
      }
    }, 600)
  }

  function handleRegister(e) {
    e.preventDefault(); setError("")
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return }
    if (USUARIOS_DEMO.find(u => u.email === email)) { setError("Ese email ya está registrado."); return }
    const users = getUsers()
    if (users.find(u => u.email === email)) { setError("Ese email ya está registrado."); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, { email, password }]))
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email }))
      onLogin(email)
    }, 600)
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-5"
      style={{ background: "var(--color-bg-base)" }}>
      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        {/* Logo AIPath */}
        <div className="flex flex-col items-center gap-4">
          <div className="aipath-logo">
            <span className="logo-text">AI</span>
            <span className="logo-accent">Path</span>
          </div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
            style={{ color: ACCENT, border: `1px solid rgba(99,102,241,0.3)`, background: "rgba(99,102,241,0.06)" }}>
            Academia de IA · Nivel Mundial
          </span>
        </div>

        {/* Card */}
        <div className="surface w-full rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: "1px solid var(--color-border)" }}>
            {["login", "register"].map(t => (
              <button key={t} onClick={() => { setTab(t); setError("") }}
                className="flex-1 py-3.5 text-xs font-bold tracking-wide uppercase transition-all"
                style={{
                  color: tab === t ? ACCENT : "var(--color-text-muted)",
                  borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent",
                  background: "transparent"
                }}>
                {t === "login" ? "Iniciar sesión" : "Registrarse"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={tab === "login" ? handleLogin : handleRegister}
            className="flex flex-col gap-4 p-6">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wide uppercase"
                style={{ color: "var(--color-text-muted)" }}>Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-xl text-sm px-4 py-3 outline-none transition-all"
                style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                onBlur={e => e.target.style.borderColor = "var(--color-border)"}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wide uppercase"
                style={{ color: "var(--color-text-muted)" }}>Contraseña</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} required value={password}
                  onChange={e => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl text-sm pl-4 pr-10 py-3 outline-none transition-all"
                  style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}
                  onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                  onBlur={e => e.target.style.borderColor = "var(--color-border)"}
                />
                <button type="button" onClick={() => setShow(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs transition-colors"
                  style={{ color: showPass ? ACCENT : "var(--color-text-muted)" }}>
                  {showPass ? "◉" : "○"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs leading-relaxed rounded-lg px-3 py-2"
                style={{ color: "#FCA5A5", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 text-sm mt-1"
              style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Verificando..." : tab === "login" ? "Entrar →" : "Crear cuenta →"}
            </button>
          </form>
        </div>

        <p className="text-center" style={{ fontSize: "10px", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}>
          AIPATH · Tu ruta completa en IA
        </p>
      </div>
    </div>
  )
}
