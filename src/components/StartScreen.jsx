// src/components/StartScreen.jsx
export default function StartScreen({ onPlay, onDifficulty, difficulty, onBestScores, onAbout, onTheme, theme }) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex flex-col items-center justify-center space-y-6 text-center px-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600">
          MEMORY MATCH
        </h1>
  
        <button onClick={onPlay} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ▶️ Play
        </button>
  
        <button onClick={onDifficulty} className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          🎯 Difficulty: {difficulty}
        </button>
  
        <button onClick={onTheme} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          🎨 Theme: {theme}
        </button>

        <button
  onClick={onBestScores}
  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
>
  🏅 Best Scores
</button>
  
        <button onClick={onAbout} className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          ℹ️ About
        </button>
      </div>
    );
  }
  