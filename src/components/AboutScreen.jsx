import { personalData } from "../data/personalData";

export default function AboutScreen({ onBack }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url('${window.innerWidth < 768 ? '/mobile-bg.png' : '/bg.png'}')` }}
    >
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
        
        {/* Developer First */}
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">👨‍💻 Developer</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
          <img
            src={personalData.profile}
            alt={personalData.name}
            className="w-35 h-35 object-cover rounded-full border-4 border-indigo-300 shadow-md"
          />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800">{personalData.name}</h3>
            <p className="text-sm text-gray-700 mb-1">{personalData.designation}</p>
            <p className="text-sm text-gray-600 mb-2">{personalData.description}</p>
            <div className="text-sm space-y-1">
              <p>📍 {personalData.address}</p>
              <p>📧 <a href={`mailto:${personalData.email}`} className="text-blue-600 underline">{personalData.email}</a></p>
              <p>📞 {personalData.phone}</p>
              <p>
                🔗 <a href={personalData.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">GitHub</a> | 
                <a href={personalData.linkedIn} target="_blank" rel="noreferrer" className="text-blue-600 underline ml-2">LinkedIn</a>
              </p>
            </div>
          </div>
        </div>

        {/* Game Info */}
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-4">ℹ️ About the Game</h1>
        <p className="text-gray-800 mb-4 text-justify">
          This memory match game is designed to enhance your focus, attention span, and short-term memory.
          It features multiple themes, difficulty levels, and a real-time scoring system for competitive fun!
        </p>

        <div className="bg-white/60 border border-indigo-100 rounded-lg p-4 shadow-inner">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">🎮 How to Play</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
            <li>Choose a difficulty and a theme from the home screen.</li>
            <li>Flip cards to find matching pairs.</li>
            <li>Complete the game using the fewest moves and shortest time.</li>
            <li>Try different themes like Sports, Flags, or Technology!</li>
            <li>Your best scores are saved per difficulty level.</li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          >
            🔙 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
