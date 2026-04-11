import { useState } from "react"

const REPORTS_KEY = "aipath_reports"
const SESSION_KEY = "aipath_session"

export default function ReportButton({ leccionId }) {
  const [open, setOpen] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [enviado, setEnviado] = useState(false)

  function handleEnviar() {
    if (!mensaje.trim()) return
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}")
      const reports = JSON.parse(localStorage.getItem(REPORTS_KEY) || "[]")
      reports.push({
        usuario: session.email || "anónimo",
        leccion_id: leccionId,
        mensaje: mensaje.trim(),
        timestamp: new Date().toISOString()
      })
      localStorage.setItem(REPORTS_KEY, JSON.stringify(reports))
    } catch {}
    setEnviado(true)
    setTimeout(() => {
      setOpen(false)
      setEnviado(false)
      setMensaje("")
    }, 2000)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Reportar un problema"
        className="fixed z-40 flex items-center justify-center w-9 h-9 rounded-full transition-opacity opacity-40 hover:opacity-80"
        style={{
          bottom: "5rem",
          right: "1rem",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)"
        }}
      >
        <span style={{ fontSize: "14px", lineHeight: 1 }}>🚩</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div
            className="surface rounded-2xl p-5 w-full max-w-sm"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {!enviado ? (
              <>
                <p className="text-sm font-bold mb-1 text-white">Reportar un problema</p>
                <p className="text-xs mb-3 truncate" style={{ color: "var(--color-text-muted)" }}>
                  {leccionId}
                </p>
                <textarea
                  value={mensaje}
                  onChange={e => setMensaje(e.target.value.slice(0, 200))}
                  placeholder="Describe el problema brevemente..."
                  rows={3}
                  autoFocus
                  className="w-full rounded-xl text-sm px-3 py-2.5 outline-none resize-none"
                  style={{
                    background: "var(--color-bg-elevated)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)"
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(6,182,212,0.5)"}
                  onBlur={e => e.target.style.borderColor = "var(--color-border)"}
                />
                <p className="text-xs text-right mt-1 mb-3" style={{ color: "var(--color-text-muted)" }}>
                  {mensaje.length}/200
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-text-muted)" }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleEnviar}
                    disabled={!mensaje.trim()}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-opacity"
                    style={{
                      background: "var(--color-accent-primary)",
                      color: "#0a0a12",
                      opacity: !mensaje.trim() ? 0.4 : 1
                    }}
                  >
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 py-3">
                <span className="text-2xl">✅</span>
                <p className="text-sm font-bold text-white">Gracias, lo revisaremos pronto</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
