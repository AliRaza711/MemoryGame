// src/components/BestScoresScreen.jsx
const difficulties = ["Easy", "Medium", "Hard", "Difficult"];

export default function BestScoresScreen({ onBack }) {
  const handleResetScores = () => {
    difficulties.forEach((level) => {
      localStorage.removeItem(`bestTime-${level}`);
      localStorage.removeItem(`bestMoves-${level}`);
    });
    // Refresh page or force re-render
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">🏅 Best Scores</h1>

        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-indigo-600 font-semibold">
              <th className="px-4">Difficulty</th>
              <th className="px-4">Best Time (s)</th>
              <th className="px-4">Best Moves</th>
            </tr>
          </thead>
          <tbody>
            {difficulties.map((level) => {
              const time = localStorage.getItem(`bestTime-${level}`) ?? "--";
              const moves = localStorage.getItem(`bestMoves-${level}`) ?? "--";
              return (
                <tr key={level} className="text-gray-700">
                  <td className="px-4 py-2">{level}</td>
                  <td className="px-4 py-2">{time}</td>
                  <td className="px-4 py-2">{moves}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            🔙 Back to Start
          </button>

          <button
            onClick={handleResetScores}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🗑️ Reset All Scores
          </button>
        </div>
      </div>
    </div>
  );
}
