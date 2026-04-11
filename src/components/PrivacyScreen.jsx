import { useState } from "react"
import { motion } from "framer-motion"

export default function PrivacyScreen({ onVolver }) {
  const [eliminado, setEliminado] = useState(false)

  function handleEliminar() {
    if (window.confirm("¿Estás seguro? Se eliminarán todos tus datos de progreso y tendrás que volver a iniciar sesión.")) {
      localStorage.clear()
      setEliminado(true)
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col items-center p-5 pb-16"
      style={{ background: "var(--color-bg-base)" }}>

      <div className="w-full max-w-lg">

        {/* Cabecera */}
        <motion.div
          className="flex items-center gap-4 mb-8 mt-4"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={onVolver}
            className="text-xs flex items-center gap-1 transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
          >
            ← Volver
          </button>
          <div className="aipath-logo text-sm">
            <span className="logo-text">AI</span>
            <span className="logo-accent">Path</span>
          </div>
        </motion.div>

        <motion.div
          className="surface rounded-2xl p-6 flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {/* Título */}
          <div>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#06B6D4" }}>
              GDPR · Privacidad
            </span>
            <h1 className="font-display text-xl font-bold mt-1"
              style={{ color: "var(--color-text-primary)", fontFamily: "'Outfit', sans-serif" }}>
              Política de Privacidad
            </h1>
            <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
              Última actualización: abril 2026 · De acuerdo con el RGPD (UE) 2016/679
            </p>
          </div>

          {/* Sección: qué datos se recogen */}
          <Section titulo="1. Qué datos se recogen" icono="📋">
            <p>AIPath recoge únicamente los datos mínimos necesarios para el funcionamiento del servicio:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Email y contraseña</strong> — para identificarte como usuario</li>
              <li><strong>Progreso de aprendizaje</strong> — lecciones completadas, XP acumulado, racha diaria, badges</li>
              <li><strong>Configuración de sesión</strong> — idioma y preferencias de la app</li>
            </ul>
            <p className="mt-2">No se recogen datos biométricos, de localización, ni información de pago.</p>
          </Section>

          {/* Sección: dónde se guardan */}
          <Section titulo="2. Dónde se guardan tus datos" icono="💾">
            <p>
              Todos tus datos se almacenan <strong>exclusivamente en tu dispositivo</strong> mediante{" "}
              <code className="text-xs px-1 py-0.5 rounded" style={{ background: "rgba(6,182,212,0.1)", color: "#06B6D4" }}>
                localStorage
              </code>{" "}
              del navegador.
            </p>
            <p className="mt-2">
              <strong>No existen servidores externos</strong> que almacenen tu información.
              Tus datos no salen de tu dispositivo ni viajan por internet.
              Si borras los datos del navegador o cambias de dispositivo, el progreso se pierde.
            </p>
          </Section>

          {/* Sección: sin terceros */}
          <Section titulo="3. Sin terceros ni transferencias" icono="🔒">
            <p>AIPath <strong>no comparte, vende ni transfiere</strong> tus datos a terceros.</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Sin herramientas de analítica (Google Analytics, Mixpanel, etc.)</li>
              <li>Sin cookies de seguimiento</li>
              <li>Sin publicidad personalizada</li>
              <li>Sin integraciones con redes sociales que accedan a tus datos</li>
            </ul>
          </Section>

          {/* Sección: derechos RGPD */}
          <Section titulo="4. Tus derechos (RGPD)" icono="⚖️">
            <p>Bajo el Reglamento General de Protección de Datos (RGPD) tienes derecho a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Acceso</strong> — consultar qué datos tienes almacenados localmente</li>
              <li><strong>Rectificación</strong> — actualizar tu email desde la app</li>
              <li><strong>Supresión</strong> — eliminar todos tus datos (ver botón abajo)</li>
              <li><strong>Portabilidad</strong> — tus datos están en tu dispositivo, siempre accesibles</li>
              <li><strong>Oposición</strong> — dejar de usar la app en cualquier momento</li>
            </ul>
          </Section>

          {/* Sección: contacto */}
          <Section titulo="5. Contacto" icono="✉️">
            <p>Para cualquier consulta relacionada con privacidad o tus datos personales:</p>
            <a
              href="mailto:privacy@aipath.app"
              className="inline-block mt-2 text-sm font-semibold underline"
              style={{ color: "#06B6D4" }}
            >
              privacy@aipath.app
            </a>
            <p className="mt-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
              Responderemos en un plazo máximo de 30 días conforme al RGPD.
            </p>
          </Section>

          {/* Zona de peligro: eliminar datos */}
          <div className="rounded-xl p-4 mt-2"
            style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <p className="text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: "#FCA5A5" }}>
              ⚠️ Zona de eliminación
            </p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--color-text-muted)" }}>
              Al eliminar tus datos se borrará todo el progreso, XP, badges y sesión activa.
              Esta acción <strong style={{ color: "var(--color-text-secondary)" }}>no se puede deshacer</strong>.
            </p>

            {eliminado ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-lg px-4 py-3 text-center"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <p className="text-sm font-semibold" style={{ color: "#6EE7B7" }}>
                  ✓ Tus datos han sido eliminados
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                  Redirigiendo al inicio…
                </p>
              </motion.div>
            ) : (
              <button
                onClick={handleEliminar}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#FCA5A5"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.15)"
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.08)"
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"
                }}
              >
                Eliminar mis datos
              </button>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center mt-6 text-xs" style={{ color: "var(--color-text-muted)" }}>
          AIPath · academia gamificada de IA · privacy@aipath.app
        </p>
      </div>
    </div>
  )
}

// Componente auxiliar para cada sección
function Section({ titulo, icono, children }) {
  return (
    <div>
      <p className="text-sm font-bold mb-2 flex items-center gap-2"
        style={{ color: "var(--color-text-primary)" }}>
        <span>{icono}</span>
        {titulo}
      </p>
      <div className="text-sm leading-relaxed space-y-1.5"
        style={{ color: "var(--color-text-secondary)" }}>
        {children}
      </div>
    </div>
  )
}
