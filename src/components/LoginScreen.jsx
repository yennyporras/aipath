import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import AIPathLogo from "./AIPathLogo"
import { initAudio, playSound } from "../utils/sounds"

const USUARIOS_DEMO = [
  { email: "demo@aipath.app",  password: "demo1234",  nombre: "Demo User",  rol: "estudiante" },
  { email: "admin@aipath.app", password: "admin1234", nombre: "Admin",      rol: "admin" },
  { email: "paola@aipath.app", password: "paola1234", nombre: "Paola",      rol: "admin" },
  { email: "ai@aipath.app",    password: "aipath2026",nombre: "AI Learner", rol: "estudiante" },
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

// Partículas flotantes con canvas
function ParticlesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // 20 partículas índigo pequeñas
    const particles = Array.from({ length: 20 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      r:  1 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o:  0.15 + Math.random() * 0.3,
    }))

    let raf
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99,102,241,${p.o})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

export default function LoginScreen({ onLogin }) {
  const [tab, setTab]         = useState("login")
  const [email, setEmail]     = useState("")
  const [password, setPass]   = useState("")
  const [showPass, setShow]   = useState(false)
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    initAudio()
    setError("")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const user = findUser(email, password)
      if (user) {
        playSound("unlock")
        localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, nombre: user.nombre, rol: user.rol || "estudiante" }))
        onLogin(user.email)
      } else {
        playSound("incorrect")
        setError("Credenciales incorrectas. Prueba demo@aipath.app / demo1234")
      }
    }, 600)
  }

  function handleRegister(e) {
    e.preventDefault()
    initAudio()
    setError("")
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return }
    if (USUARIOS_DEMO.find(u => u.email === email)) { setError("Ese email ya está registrado."); return }
    const users = getUsers()
    if (users.find(u => u.email === email)) { setError("Ese email ya está registrado."); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      playSound("unlock")
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, { email, password }]))
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email }))
      onLogin(email)
    }, 600)
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-5 relative"
      style={{ background: "var(--color-bg-base)" }}>
      <ParticlesCanvas />

      <div className="w-full max-w-sm flex flex-col items-center gap-8 relative" style={{ zIndex: 1 }}>

        {/* Logo animado */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AIPathLogo size="lg" showTagline={true} />
        </motion.div>

        {/* Card animada */}
        <motion.div
          className="surface w-full rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: "1px solid var(--color-border)" }}>
            {["login", "register"].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); playSound("click") }}
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
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs leading-relaxed rounded-lg px-3 py-2"
                style={{ color: "#FCA5A5", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary btn-primary-pulse w-full py-3.5 text-sm mt-1"
              style={{ opacity: loading ? 0.7 : 1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => playSound("click")}
            >
              {loading ? "Verificando..." : tab === "login" ? "Entrar →" : "Crear cuenta →"}
            </motion.button>
          </form>
        </motion.div>

        <motion.p
          className="text-center"
          style={{ fontSize: "10px", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          AIPATH · Tu ruta completa en IA
        </motion.p>
      </div>
    </div>
  )
}
