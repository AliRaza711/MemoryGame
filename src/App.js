// src/App.jsx
import { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";
import AboutScreen from "./components/AboutScreen";

const difficulties = ["Easy", "Medium", "Hard", "Difficult"];
const themes = ["Sport", "Flag", "Technology"];

export default function App() {
  const [screen, setScreen] = useState("start"); // 'start', 'game', 'about'
  const [difficulty, setDifficulty] = useState("Easy");
  const [theme, setTheme] = useState("Sport");

  const toggleDifficulty = () => {
    const next = (difficulties.indexOf(difficulty) + 1) % difficulties.length;
    setDifficulty(difficulties[next]);
  };

  const toggleTheme = () => {
    const next = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[next]);
  };

  return (
    <>
      {screen === "start" && (
        <StartScreen
          onPlay={() => setScreen("game")}
          onDifficulty={toggleDifficulty}
          difficulty={difficulty}
          onAbout={() => setScreen("about")}
          onTheme={toggleTheme}
          theme={theme}
        />
      )}

      {screen === "game" && (
        <GameBoard difficulty={difficulty} theme={theme} onBack={() => setScreen("start")} />
      )}

      {screen === "about" && (
        <AboutScreen onBack={() => setScreen("start")} />
      )}
    </>
  );
}
