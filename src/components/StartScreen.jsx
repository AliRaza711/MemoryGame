import { useEffect, useState } from "react";

export default function StartScreen({
  onPlay,
  onDifficulty,
  difficulty,
  onBestScores,
  onAbout,
  onTheme,
  theme,
}) {
  const [bg, setBg] = useState("/bg.png");

  useEffect(() => {
    const updateBg = () => {
      setBg(window.innerWidth < 768 ? "/mobile-bg.png" : "/bg.png");
    };
    updateBg();
    window.addEventListener("resize", updateBg);
    return () => window.removeEventListener("resize", updateBg);
  }, []);

  // Theme to Tailwind color mapping
  const themeColors = {
    Sport: { base: "bg-blue-600", hover: "hover:bg-blue-700" },
    Flag: { base: "bg-blue-600", hover: "hover:bg-blue-700" },
    Technology: { base: "bg-blue-600", hover: "hover:bg-blue-700" },
  };

  const activeColor = themeColors[theme] || themeColors["Sport"];
  const buttonClass = `w-64 px-6 py-3 rounded-md text-white font-semibold transition duration-200 shadow-md ${activeColor.base} ${activeColor.hover}`;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center space-y-6 text-center px-4"
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <img src="/logo.png" alt="Memory Game by Ali" className="w-56 h-auto mb-4 drop-shadow-lg" />

      <button onClick={onPlay} className={buttonClass}>
        ▶️ Play
      </button>

      <button onClick={onDifficulty} className={buttonClass}>
        🎯 Difficulty: {difficulty}
      </button>

      <button onClick={onTheme} className={buttonClass}>
        🎨 Theme: {theme}
      </button>

      <button onClick={onBestScores} className={buttonClass}>
        🏅 Best Scores
      </button>

      <button onClick={onAbout} className={buttonClass}>
        ℹ️ About
      </button>
    </div>
  );
}
