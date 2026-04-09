export default function Header({ streak }) {
  return (
    <header className="w-full max-w-2xl mx-auto flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-blue-400">AIPath</h1>
      <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full">
        <span className="text-lg">🔥</span>
        <span className="text-sm font-medium text-gray-300">
          {streak} {streak === 1 ? "día" : "días"}
        </span>
      </div>
    </header>
  )
}
