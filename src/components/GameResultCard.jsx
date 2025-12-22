function GameResultCard({ type, score, onClose }) {
  const isWin = type === "WIN";

  return (
    <div className="absolute top-0 flex items-center justify-center pointer-events-none">
      <div className="w-80 rounded-2xl bg-slate-900/90 backdrop-blur-m border border-indigo-500/40 px-2.5 py-2 shadow-2xl animate-scaleIn pointer-events-auto">
        <h2
          className={`text-xl font-bold mb-2 ${
            isWin ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isWin ? "🎉 You Won!" : "💀 Game Over"}
        </h2>

        <p className="text-slate-300 mb-4 text-sm">
          Score <span className="text-white font-semibold">{score}</span>
        </p>

        <button
          onClick={onClose}
          className={`w-full py-2 rounded-xl font-semibold transition-colors ${
            isWin
              ? "bg-emerald-500/20 hover:bg-emerald-600 text-emerald-300"
              : "bg-red-500/20 hover:bg-red-600 text-red-300"
          }`}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameResultCard;