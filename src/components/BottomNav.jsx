import { motion } from "framer-motion"

// SVG icons inline — no depende de librerías externas
function IconBook() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function IconGamepad() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <circle cx="15" cy="12" r="0.5" fill="currentColor" />
      <circle cx="18" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}

function IconCompass() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

const TABS = [
  { id: "academy",  label: "Estudiar", Icon: IconBook     },
  { id: "arcade",   label: "Arcade",   Icon: IconGamepad  },
  { id: "explorar", label: "Explorar", Icon: IconCompass  },
  { id: "perfil",   label: "Perfil",   Icon: IconUser     },
]

export default function BottomNav({ activo, onChange }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-40 flex items-center"
      style={{
        height: "60px",
        background: "var(--color-bg-surface, #0D0D14)",
        borderTop: "1px solid var(--color-border, #1E1E35)",
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActivo = activo === id

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
            style={{
              color: isActivo ? "#06B6D4" : "var(--color-text-muted, #6B7280)",
              height: "100%",
            }}
          >
            <motion.div
              animate={{ scale: isActivo ? 1.1 : 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <Icon />
            </motion.div>
            <span
              className="font-medium"
              style={{
                fontSize: "12px",
                color: isActivo ? "#06B6D4" : "var(--color-text-muted, #6B7280)",
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
