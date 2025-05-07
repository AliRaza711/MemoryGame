// src/components/GameBoard.jsx
import { useEffect, useState, useRef } from "react";
import Card from "./Cards";
import { getCardsByTheme } from "../data/themeCards";

function shuffle(array) {
  const doubled = [...array, ...array];
  return doubled
    .map((card) => ({ ...card, uuid: Math.random() }))
    .sort(() => 0.5 - Math.random());
}

export default function GameBoard({ difficulty, theme, onBack }) {
  const difficultyCount = {
    Easy: 2,
    Medium: 4,
    Hard: 6,
    Difficult: 8,
  };

  const totalUniqueCards = difficultyCount[difficulty];
  const bestTimeKey = `bestTime-${difficulty}`;
  const bestMovesKey = `bestMoves-${difficulty}`;

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const timerRef = useRef(null);

  const [bestTime, setBestTime] = useState(() =>
    Number(localStorage.getItem(bestTimeKey)) || null
  );
  const [bestMoves, setBestMoves] = useState(() =>
    Number(localStorage.getItem(bestMovesKey)) || null
  );

  useEffect(() => {
    const themedCards = getCardsByTheme(theme).slice(0, totalUniqueCards);
    setCards(shuffle(themedCards));
  }, [theme, totalUniqueCards]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = flipped;
      if (cards[first].icon === cards[second].icon) {
        setMatched([...matched, cards[first].icon]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped, cards, matched]);

  useEffect(() => {
    if (matched.length === totalUniqueCards) {
      clearInterval(timerRef.current);
      setGameWon(true);

      const storedTime = Number(localStorage.getItem(bestTimeKey));
      const storedMoves = Number(localStorage.getItem(bestMovesKey));

      const noBestYet = !storedTime && !storedMoves;

      const isBetter =
        (moves < storedMoves) ||
        (moves === storedMoves && time < storedTime) ||
        (time === storedTime && moves < storedMoves);

      if (noBestYet || isBetter) {
        setBestTime(time);
        setBestMoves(moves);
        localStorage.setItem(bestTimeKey, time);
        localStorage.setItem(bestMovesKey, moves);
      }
    }
  }, [matched, totalUniqueCards, time, moves, bestTimeKey, bestMovesKey]);

  const handleClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index)) {
      setFlipped([...flipped, index]);
    }
  };

  const handleReset = () => {
    const themedCards = getCardsByTheme(theme).slice(0, totalUniqueCards);
    setCards(shuffle(themedCards));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setGameWon(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 py-8 px-4">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-extrabold text-blue-600">MEMORY MATCH</h1>
        <p className="text-sm">Difficulty: {difficulty} | Theme: {theme}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg px-4 py-3 max-w-2xl mx-auto text-sm">
          <span>⏳ Time: {time}s</span>
          <span>🎯 Moves: {moves}</span>
          <span>🏆 Best Time: {bestTime ?? "--"}</span>
          <span>💡 Best Moves: {bestMoves ?? "--"}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(card.icon);
          return (
            <Card
              key={card.uuid}
              card={card}
              isFlipped={isFlipped}
              onClick={() => handleClick(index)}
            />
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="flex mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        🔙 Back
      </button>

      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white/70 backdrop-blur-lg border border-white rounded-lg text-center shadow-xl p-8 space-y-4 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-green-600">🎉 Congratulations!</h2>
            <p>You matched all pairs!</p>
            <p>⏳ Time: {time} sec</p>
            <p>🎯 Moves: {moves}</p>
            <button
              onClick={handleReset}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              🔁 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
