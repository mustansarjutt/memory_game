import { useEffect, useState, useRef } from "react";
import { GAME_STATE, gridSize, randomInt, playSound } from "../utils/mgame";

function Game() {
  const [targetPattern, setTargetPattern] = useState([]);
  const [playerPattern, setPlayerPattern] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.IDLE);
  const [lastWrongIndex, setLastWrongIndex] = useState(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const score = JSON.parse(localStorage.getItem("highScore"));
    return score || 0;
  });

  const generateTargetPattern = () => {
    let n = randomInt(6, 9);
    let pattern = [];

    while (pattern.length < n) {
      let randIndex = randomInt(0, gridSize - 1);
      if (!pattern.includes(randIndex)) {
        pattern.push(randIndex);
      }
    }

    setTargetPattern(pattern);
  };

  const handlePlayerClicks = (index) => {
    if (gameState !== GAME_STATE.PLAYER) return;
    if (playerPattern.includes(index)) return;
    if (!targetPattern.includes(index)) {
      setLastWrongIndex(index);
      playSound("lose");
      setGameState(GAME_STATE.OVER);
      return;
    }
    playSound("click");
    setPlayerPattern((prev) => [...prev, index]);
  };

  const getBoxColor = (index) => {
    switch (gameState) {
      case GAME_STATE.SHOWING:
        return targetPattern.includes(index)
          ? "bg-cyan-400/60 ring-2 ring-cyan-300"
          : "bg-indigo-500/20";

      case GAME_STATE.PLAYER:
        if (playerPattern.includes(index))
          return "bg-emerald-500 ring-2 ring-emerald-300";

        if (lastWrongIndex === index) return "bg-red-500 ring-2 ring-red-400";

        return "bg-indigo-500/20";

      case GAME_STATE.OVER:
        if (lastWrongIndex === index) return "bg-red-500 ring-2 ring-red-400";

        if (targetPattern.includes(index))
          return "bg-indigo-500 ring-2 ring-indigo-300";

        return "bg-indigo-500/20";

      case GAME_STATE.WON:
        return targetPattern.includes(index)
          ? "bg-emerald-400 ring-2 ring-emerald-300 animate-pulse"
          : "bg-indigo-500/20";

      default:
        return "bg-indigo-500/20";
    }
  };

  const timeRef = useRef(null);
  const startGame = () => {
    generateTargetPattern();
    setGameState(GAME_STATE.SHOWING);
    timeRef.current = setTimeout(() => {
      setGameState(GAME_STATE.PLAYER);
    }, 2000);
  };
  const resetGame = () => {
    setLastWrongIndex(null);
    setPlayerPattern([]);
    setTargetPattern([]);
    clearTimeout(timeRef.current);
    timeRef.current = null;
    setGameState(GAME_STATE.IDLE);
  };
  const finishGame = () => {
    resetGame();
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
  };
  const startNextRound = () => {
    resetGame();
    startGame();
  };
  const startOver = () => {
    finishGame();
    startGame();
  };

  const handleGameButton = () => {
    if (gameState === GAME_STATE.IDLE) {
      startGame();
    } else {
      finishGame();
    }
  };

  useEffect(() => {
    if (
      gameState === GAME_STATE.PLAYER &&
      playerPattern.length === targetPattern.length
    ) {
      setScore((prev) => prev + 1);
      playSound("win");
      setGameState(GAME_STATE.WON);
    }
  }, [playerPattern, targetPattern, gameState]);
  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

  return (
    <div className="relative flex flex-col items-center gap-y-6 max-w-md mx-auto">
      {gameState !== GAME_STATE.IDLE && (
        <div className="flex gap-4 p-1.5 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full shadow-xl">
          <div className="px-5 py-1.5 rounded-full bg-white/5 border border-white/5 flex flex-col items-center min-w-20">
            <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold">
              Score
            </span>
            <span className="text-xl font-bold text-white leading-none">
              {score}
            </span>
          </div>
          <div className="px-5 py-1.5 rounded-full bg-white/5 border border-white/5 flex flex-col items-center min-w-20">
            <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold">
              Best
            </span>
            <span className="text-xl font-bold text-white leading-none">
              {highScore}
            </span>
          </div>
        </div>
      )}
      <div className="relative grid grid-cols-5 gap-3 md:p-5 p-3 bg-slate-900 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl">
        {Array.from({ length: gridSize }).map((_, index) => (
          <div
            key={index}
            onClick={() => handlePlayerClicks(index)}
            className={`md:w-16 md:h-16 h-10 w-10 rounded-xl border transition-all duration-200 ${getBoxColor(index) ? `${getBoxColor(index)} border-white/20` : "bg-white/5 border-white/5 hover:bg-white/10"} ${gameState === GAME_STATE.PLAYER ? "cursor-pointer active:scale-95" : "cursor-default"}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 w-full px-2">
        <button
          onClick={handleGameButton}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md transition-all duration-200 border ${gameState === GAME_STATE.IDLE ? "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500" : "bg-slate-800/65 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white"}`}
        >
          {gameState === GAME_STATE.IDLE ? "Start Game" : "End Game"}
        </button>
        {(gameState === GAME_STATE.WON || gameState === GAME_STATE.OVER) && (
          <button
            onClick={gameState === GAME_STATE.WON ? startNextRound : startOver}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm tracking-wide shadow-md transition-all duration-200 border animate-in fade-in slide-in-from-left-2 ${gameState === GAME_STATE.WON ? "bg-emerald-600/65 border-emerald-500 text-white hover:bg-emerald-500" : "bg-red-500/60 border-slate-700 text-white hover:bg-orange-500"}`}
          >
            {gameState === GAME_STATE.WON ? "Next Level" : "Try Again"}
          </button>
        )}
      </div>
      {(gameState === GAME_STATE.OVER || gameState === GAME_STATE.WON) && (
        <div
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border backdrop-blur-md ${gameState === GAME_STATE.WON ? "bg-emerald-500/10 border-emerald-500/10 text-emerald-400" : "bg-red-500/10 border-red-500/10 text-red-400"}`}
        >
          <span className="text-lg">
            {gameState === GAME_STATE.WON ? "🎉" : "💀"}
          </span>
          <p className="font-bold text-xs uppercase tracking-widest">
            {gameState === GAME_STATE.WON ? "Victory" : "Game Over"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Game;