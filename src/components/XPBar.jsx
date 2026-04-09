export default function XPBar({ xp }) {
  const xpPorNivel = 300
  const nivel = Math.floor(xp / xpPorNivel) + 1
  const xpActual = xp % xpPorNivel
  const progreso = (xpActual / xpPorNivel) * 100

  return (
    <div className="w-full max-w-lg mx-auto mb-5 animate-reveal" style={{ animationDelay: "80ms" }}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] font-semibold" style={{ color: "var(--color-accent-blue)" }}>
          Nivel {nivel}
        </span>
        <span className="text-[11px] tabular-nums" style={{ color: "var(--color-text-muted)" }}>
          {xpActual} / {xpPorNivel} XP
        </span>
      </div>
      <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div className="xp-bar-fill h-2" style={{ width: `${progreso}%` }} />
      </div>
    </div>
  )
}
