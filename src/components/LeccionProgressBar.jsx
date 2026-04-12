// Barra de progreso de lección: 4 pasos (Teoría → Quiz → Práctica → Resultado)
// paso: 0=Teoría, 1=Quiz, 2=Práctica, 3=Resultado
export default function LeccionProgressBar({ paso }) {
  const pasos = ["Teoría", "Quiz", "Práctica", "Resultado"]
  return (
    <div className="flex items-center gap-0.5 mb-4 w-full">
      {pasos.map((nombre, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div
            className="w-full rounded-full transition-all duration-400"
            style={{ height: "6px", background: i <= paso ? "#06B6D4" : "rgba(255,255,255,0.08)" }}
          />
          <span className="text-[10px] mt-0.5 font-medium"
            style={{ color: i === paso ? "#06B6D4" : "rgba(255,255,255,0.2)" }}>
            {nombre}
          </span>
        </div>
      ))}
    </div>
  )
}
