import Game from "./components/Game";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="w-full max-w-5xl backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl ring-1 ring-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px] rounded-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
          <header className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
              <span className="text-white">Memory</span>
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">
                {" "}
                Game
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Test your focus and memory in this interactive challenge.
            </p>
            <div className="inline-flex items-center justify-center px-3 py-1 mt-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium tracking-wide uppercase">
              React • Tailwind v4 • Vite
            </div>
          </header>
          <main className="group relative w-full max-w-3xl mx-auto min-h-125 h-auto flex flex-col items-center justify-center md:p-5 p-3">
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
              <Game />
            </div>
          </main>
        </div>
        <footer className="mt-8 text-center text-xs text-slate-600">
          Coded with ❤️ by <strong>Mustansar Jutt</strong>
        </footer>
      </div>
    </div>
  );
}

export default App;