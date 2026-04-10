/**
 * AIPathLogo — Logo oficial SVG de AIPath
 * Concepto C: logo principal con ícono + wordmark
 * Concepto D: ícono solo para favicon/PWA
 */

const SIZES = {
  sm: { icon: 28, fontSize: 18, tagSize: 8 },
  md: { icon: 36, fontSize: 22, tagSize: 9 },
  lg: { icon: 48, fontSize: 30, tagSize: 11 },
}

// Concepto D: ícono cuadrado con "AI"
export function AIPathIcon({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="#6366F1" />
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fontFamily="'Outfit', Arial Black, sans-serif"
        fontWeight="900"
        fontSize="18"
        fill="white"
      >
        AI
      </text>
    </svg>
  )
}

// Concepto C: logo con ícono de nodos + wordmark
export default function AIPathLogo({
  size = "md",
  showTagline = false,
  iconOnly = false,
  className = "",
}) {
  const s = SIZES[size] || SIZES.md
  const iconSz = s.icon

  const icon = (
    <svg
      width={iconSz}
      height={iconSz}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {/* Fondo */}
      <rect
        width="40"
        height="40"
        rx="10"
        fill="#0D0D14"
        stroke="#6366F1"
        strokeWidth="1.5"
      />

      {/* Líneas verticales punteadas desde cada nodo */}
      <line x1="10" y1="28" x2="10" y2="34" stroke="#6366F1" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />
      <line x1="20" y1="18" x2="20" y2="34" stroke="#6366F1" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />
      <line x1="30" y1="28" x2="30" y2="34" stroke="#6366F1" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.5" />

      {/* Curva que conecta los nodos */}
      <path
        d="M13.5 28 Q20 18 26.5 28"
        stroke="#6366F1"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Nodos */}
      <circle cx="10" cy="28" r="3.5" fill="#8B5CF6" />
      <circle cx="20" cy="18" r="3.5" fill="#6366F1" />
      <circle cx="30" cy="28" r="3.5" fill="#8B5CF6" />

      {/* Puntos de brillo en los nodos */}
      <circle cx="18.8" cy="16.8" r="1" fill="white" fillOpacity="0.5" />
    </svg>
  )

  if (iconOnly) return icon

  return (
    <div
      className={`flex flex-col items-start gap-0.5 ${className}`}
      style={{ userSelect: "none" }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-0">
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: s.fontSize,
                color: "#F8F8FF",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              AI
            </span>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: s.fontSize,
                color: "#6366F1",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              Path
            </span>
          </div>
          {showTagline && (
            <span
              style={{
                fontSize: s.tagSize,
                color: "#5A5A7A",
                letterSpacing: "4px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              ACADEMIA DE IA
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
