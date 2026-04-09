import { useState } from "react"

export default function QuizCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const hasAnswered = selected !== null
  const isCorrect = selected === question.correct

  function handleSelect(index) {
    if (hasAnswered) return
    setSelected(index)
    onAnswer(index === question.correct)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl p-6">
      <p className="text-sm text-gray-500 mb-2">
        Pregunta {question.id} de 7
      </p>
      <h2 className="text-lg font-semibold text-gray-100 mb-5">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, i) => {
          let style = "border-gray-700 hover:border-gray-500 text-gray-300"
          if (hasAnswered) {
            if (i === question.correct) {
              style = "border-green-500 bg-green-500/10 text-green-300"
            } else if (i === selected) {
              style = "border-red-500 bg-red-500/10 text-red-300"
            } else {
              style = "border-gray-800 text-gray-600"
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={hasAnswered}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${style} ${
                !hasAnswered ? "cursor-pointer" : "cursor-default"
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {hasAnswered && (
        <div
          className={`mt-5 p-4 rounded-xl ${
            isCorrect
              ? "bg-green-500/10 border border-green-500/30"
              : "bg-red-500/10 border border-red-500/30"
          }`}
        >
          <p className="font-semibold mb-1">
            {isCorrect ? "✅ ¡Correcto! +30 XP" : "❌ Incorrecto"}
          </p>
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
