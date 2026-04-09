import { useState } from "react"

const DEMO_USER = { email: "demo@estratek.com.co", password: "demo1234" }
const USERS_KEY = "aipath_users"
const SESSION_KEY = "aipath_session"

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") } catch { return [] }
}

export default function LoginScreen({ onLogin }) {
  const [tab, setTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const isDemoUser = email === DEMO_USER.email && password === DEMO_USER.password
      const users = getUsers()
      const found = users.find(u => u.email === email && u.password === password)
      if (isDemoUser || found) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ email }))
        onLogin(email)
      } else {
        setError("Credenciales incorrectas. Prueba demo@estratek.com.co / demo1234")
      }
    }, 600)
  }

  function handleRegister(e) {
    e.preventDefault()
    setError("")
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return }
    if (email === DEMO_USER.email) { setError("Ese email ya está registrado."); return }
    const users = getUsers()
    if (users.find(u => u.email === email)) { setError("Ese email ya está registrado."); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const updated = [...users, { email, password }]
      localStorage.setItem(USERS_KEY, JSON.stringify(updated))
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email }))
      onLogin(email)
    }, 600)
  }

  const accentTeal = "#00D4AA"

  return (
    <div className="min-h-dvh flex items-center justify-center p-5"
      style={{ background: "#080810" }}>
      <div className="w-full max-w-sm flex flex-col items-center gap-6">

        {/* Logo + badge */}
        <div className="flex flex-col items-center gap-3">
          <img src="/etk-logo-white.png" alt="Estratek" className="h-10 object-contain" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
            style={{
              color: accentTeal,
              border: `1px solid rgba(0,212,170,0.3)`,
              background: "rgba(0,212,170,0.06)"
            }}>
            ● ESTRATEK IA ACADEMY
          </span>
        </div>

        {/* Subtitle */}
        <p className="font-display text-xs font-bold tracking-[0.3em] uppercase text-center"
          style={{ color: accentTeal }}>
          DIAGNÓSTICO DE INNOVACIÓN
        </p>

        {/* Card */}
        <div className="surface w-full rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: "1px solid var(--color-border)" }}>
            {["login", "register"].map(t => (
              <button key={t} onClick={() => { setTab(t); setError("") }}
                className="flex-1 py-3.5 text-xs font-bold tracking-wide uppercase transition-all"
                style={{
                  color: tab === t ? accentTeal : "var(--color-text-muted)",
                  borderBottom: tab === t ? `2px solid ${accentTeal}` : "2px solid transparent",
                  background: "transparent"
                }}>
                {t === "login" ? "Iniciar sesión" : "Registrarse"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={tab === "login" ? handleLogin : handleRegister}
            className="flex flex-col gap-4 p-6">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wide uppercase"
                style={{ color: "var(--color-text-muted)" }}>Email</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m2 7 10 7 10-7"/>
                  </svg>
                </span>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-xl text-sm pl-10 pr-4 py-3 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)"
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(0,212,170,0.5)"}
                  onBlur={e => e.target.style.borderColor = "var(--color-border)"}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wide uppercase"
                style={{ color: "var(--color-text-muted)" }}>Contraseña</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input type={showPass ? "text" : "password"} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl text-sm pl-10 pr-10 py-3 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)"
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(0,212,170,0.5)"}
                  onBlur={e => e.target.style.borderColor = "var(--color-border)"}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs transition-colors"
                  style={{ color: showPass ? accentTeal : "var(--color-text-muted)" }}>
                  {showPass ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs leading-relaxed rounded-lg px-3 py-2"
                style={{
                  color: "#FCA5A5",
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.15)"
                }}>
                {error}
              </p>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 text-sm mt-1"
              style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Verificando..." : tab === "login" ? "Entrar →" : "Crear cuenta →"}
            </button>

            {/* Links */}
            <div className="flex justify-between">
              <button type="button" className="text-xs transition-colors"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={e => e.currentTarget.style.color = accentTeal}
                onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}>
                ¿Olvidaste tu contraseña?
              </button>
              <button type="button" className="text-xs transition-colors"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={e => e.currentTarget.style.color = accentTeal}
                onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}>
                Soporte técnico
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center"
          style={{ fontSize: "10px", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}>
          ESTRATEK.COM.CO · ESTRATEK S.A.S. · MEDELLÍN, COLOMBIA
        </p>
      </div>
    </div>
  )
}
