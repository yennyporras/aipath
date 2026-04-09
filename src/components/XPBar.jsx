// XPBar — barra de experiencia con nivel, progreso animado y indicador de racha
export default function XPBar({ xp, rachaActual }) {
  const xpPorNivel = 210 // 7 preguntas × 30 XP = 210 XP para subir de nivel
  const nivel = Math.floor(xp / xpPorNivel) + 1
  const xpActual = xp % xpPorNivel
  const progreso = (xpActual / xpPorNivel) * 100

  return (
    <div className="w-full max-w-lg mx-auto mb-5 animate-slide-down" style={{ animationDelay: "80ms" }}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
            Nivel {nivel}
          </span>
        </div>
        <span className="text-xs text-gray-500 tabular-nums">
          {xpActual} / {xpPorNivel} XP
        </span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
        <div
          className="xp-bar-fill h-2.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progreso}%` }}
        />
      </div>
    </div>
  )
}
