import { motion } from "framer-motion"

export default function ExplorarScreen() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-7xl mb-6">🧭</div>
        <h1
          className="text-3xl font-extrabold mb-3"
          style={{ fontFamily: "'Outfit', sans-serif", color: "#06B6D4" }}
        >
          Explorar
        </h1>
        <p className="text-base mb-2" style={{ color: "var(--color-text-secondary)" }}>
          Próximamente — en construcción
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Recursos, artículos y tendencias de IA curadas para ti
        </p>
      </motion.div>
    </div>
  )
}
