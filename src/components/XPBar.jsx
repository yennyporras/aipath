export default function XPBar({ xp }) {
  const xpPerLevel = 100
  const level = Math.floor(xp / xpPerLevel) + 1
  const currentXP = xp % xpPerLevel
  const progress = (currentXP / xpPerLevel) * 100

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-blue-400">
          Nivel {level}
        </span>
        <span className="text-sm text-gray-400">
          {currentXP} / {xpPerLevel} XP
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
