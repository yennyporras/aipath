import { useState } from "react"
import Header from "./components/Header"
import XPBar from "./components/XPBar"
import QuizCard from "./components/QuizCard"
import moduleData from "./content/m4-prompt-engineering.json"

export default function App() {
  const [currentQ, setCurrentQ] = useState(0)
  const [xp, setXp] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = moduleData.questions

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      setXp((prev) => prev + 30)
      setCorrectCount((prev) => prev + 1)
    }
    setAnswered((prev) => prev + 1)
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1)
    } else {
      setFinished(true)
    }
  }

  function handleRestart() {
    setCurrentQ(0)
    setXp(0)
    setAnswered(0)
    setCorrectCount(0)
    setFinished(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      <Header streak={1} />
      <XPBar xp={xp} />

      <p className="text-sm text-gray-500 mb-1 max-w-2xl w-full">
        {moduleData.title}
      </p>
      <h2 className="text-md font-medium text-gray-300 mb-6 max-w-2xl w-full">
        {moduleData.technique}
      </h2>

      {!finished ? (
        <>
          <QuizCard
            key={currentQ}
            question={questions[currentQ]}
            onAnswer={handleAnswer}
          />
          {answered > currentQ && (
            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
            >
              {currentQ < questions.length - 1
                ? "Siguiente pregunta"
                : "Ver resultados"}
            </button>
          )}
        </>
      ) : (
        <div className="w-full max-w-2xl bg-gray-900 rounded-2xl p-8 text-center">
          <p className="text-4xl mb-4">
            {correctCount >= 6 ? "🏆" : correctCount >= 4 ? "💪" : "📚"}
          </p>
          <h3 className="text-2xl font-bold mb-2">¡Lección completada!</h3>
          <p className="text-gray-400 mb-4">
            Acertaste {correctCount} de {questions.length} preguntas
          </p>
          <p className="text-blue-400 font-semibold text-lg mb-6">
            +{correctCount * 30} XP ganados
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  )
}
