// src/components/AboutScreen.jsx
import { personalData } from "../data/personalData";

export default function AboutScreen({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">ℹ️ About the Game</h1>
        <p className="text-gray-800 mb-4">
          This is a memory match game designed to improve your focus and short-term memory.
          Select the difficulty and theme of your choice from the main screen and start matching identical cards.
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Each game starts with a timer and tracks your moves.</li>
          <li>Try to finish with minimum moves and in the shortest time.</li>
          <li>Difficulty levels control how many card pairs are displayed.</li>
          <li>Different themes offer unique sets of icons!</li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-600 mt-6 mb-3">👨‍💻 Developer</h2>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={personalData.profile}
            alt={personalData.name}
            className="w-28 h-28 object-cover rounded-full border-4 border-indigo-300"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{personalData.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{personalData.designation}</p>
            <p className="text-sm text-gray-600">{personalData.description}</p>
            <div className="mt-3 text-sm">
              <p>📍 {personalData.address}</p>
              <p>📧 <a href={`mailto:${personalData.email}`} className="text-blue-600 underline">{personalData.email}</a></p>
              <p>📞 {personalData.phone}</p>
              <p>🔗 <a href={personalData.github} target="_blank" className="text-blue-600 underline">GitHub</a> | 
                <a href={personalData.linkedIn} target="_blank" className="text-blue-600 underline ml-2">LinkedIn</a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            🔙 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
