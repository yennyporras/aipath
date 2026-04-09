// IntroScreen — pantalla de inicio con info del módulo, stats y botón para iniciar
export default function IntroScreen({ modulo, xpGuardado, nivelGuardado, onStart }) {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-2">
      {/* Ícono del módulo */}
      <div className="animate-scale-in mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl glow-purple">
          🎯
        </div>
      </div>

      {/* Info del módulo */}
      <p
        className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-3 animate-slide-up"
        style={{ animationDelay: "100ms" }}
      >
        Módulo 4
      </p>
      <h2
        className="text-3xl font-bold text-gradient mb-3 animate-slide-up"
        style={{ animationDelay: "150ms" }}
      >
        {modulo.title}
      </h2>
      <p
        className="text-lg text-gray-300 mb-2 animate-slide-up"
        style={{ animationDelay: "200ms" }}
      >
        {modulo.technique}
      </p>
      <p
        className="text-xs text-gray-600 mb-8 animate-slide-up"
        style={{ animationDelay: "250ms" }}
      >
        Fuente: {modulo.source}
      </p>

      {/* Stats del módulo */}
      <div
        className="glass-strong rounded-2xl p-6 w-full mb-6 animate-slide-up"
        style={{ animationDelay: "300ms" }}
      >
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-white">7</p>
            <p className="text-xs text-gray-500 mt-1">preguntas</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-2xl font-bold text-white">+210</p>
            <p className="text-xs text-gray-500 mt-1">XP máx</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-2xl font-bold text-white">🏅</p>
            <p className="text-xs text-gray-500 mt-1">badge</p>
          </div>
        </div>
      </div>

      {/* Progreso guardado */}
      {xpGuardado > 0 && (
        <div
          className="glass rounded-xl px-4 py-3 w-full mb-6 text-left flex items-center gap-3 animate-slide-up"
          style={{ animationDelay: "350ms" }}
        >
          <span className="text-lg">📊</span>
          <div>
            <p className="text-sm text-gray-300">
              Progreso guardado: <span className="text-blue-400 font-semibold">{xpGuardado} XP</span> · Nivel {nivelGuardado}
            </p>
          </div>
        </div>
      )}

      {/* Descripción */}
      <p
        className="text-sm text-gray-400 mb-10 leading-relaxed max-w-sm animate-slide-up"
        style={{ animationDelay: "380ms" }}
      >
        Aprende la primera técnica de Anthropic para escribir prompts efectivos.
        Sé claro, sé directo, obtén mejores resultados.
      </p>

      {/* Botón iniciar */}
      <button
        onClick={onStart}
        className="btn-primary px-10 py-4 rounded-2xl text-lg font-bold text-white animate-slide-up animate-pulse-glow"
        style={{ animationDelay: "420ms" }}
      >
        Iniciar lección
      </button>
    </div>
  )
}
