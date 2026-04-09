import { useState } from "react"

/**
 * Banner de instalación PWA
 * - Móvil/tablet: banner inferior deslizable
 * - Desktop: botón discreto (pasado como prop al Header)
 * Props: onInstall, onDismiss, isMobile
 */
export default function InstallBanner({ onInstall, onDismiss, isMobile }) {
  const [installing, setInstalling] = useState(false)

  async function handleInstall() {
    setInstalling(true)
    await onInstall()
    setInstalling(false)
  }

  if (!isMobile) {
    // Botón desktop discreto — se renderiza inline en el Header
    return (
      <button
        onClick={handleInstall}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
        style={{
          background: "rgba(0,212,170,0.1)",
          color: "var(--color-accent-blue)",
          border: "1px solid rgba(0,212,170,0.2)"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(0,212,170,0.18)"
          e.currentTarget.style.borderColor = "rgba(0,212,170,0.4)"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(0,212,170,0.1)"
          e.currentTarget.style.borderColor = "rgba(0,212,170,0.2)"
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        {installing ? "Instalando…" : "Instalar"}
      </button>
    )
  }

  // Banner móvil — fijo en la parte inferior
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
      style={{
        background: "rgba(8,8,16,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0,212,170,0.2)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)"
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
          style={{ background: "var(--color-accent-blue)" }}
        >
          <span style={{ color: "#0A0A0A", fontSize: "11px", fontWeight: 700 }}>EIA</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-tight">Instala la app</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Accede sin internet · sin barra del navegador
          </p>
        </div>
        <button
          onClick={handleInstall}
          disabled={installing}
          className="btn-primary px-4 py-2 rounded-xl text-xs shrink-0"
        >
          {installing ? "…" : "Instalar"}
        </button>
        <button
          onClick={onDismiss}
          className="p-1.5 shrink-0"
          style={{ color: "var(--color-text-muted)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
