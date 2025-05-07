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
  const [bg, setBg] = useState("/bg.png");

  const [displayTime, setDisplayTime] = useState(0);
  const [displayMoves, setDisplayMoves] = useState(0);

  const timerRef = useRef(null);

  const [bestTime, setBestTime] = useState(() =>
    Number(localStorage.getItem(bestTimeKey)) || null
  );
  const [bestMoves, setBestMoves] = useState(() =>
    Number(localStorage.getItem(bestMovesKey)) || null
  );

  // Background Responsive
  useEffect(() => {
    const updateBg = () => {
      setBg(window.innerWidth < 768 ? "/mobile-bg.png" : "/bg.png");
    };
    updateBg();
    window.addEventListener("resize", updateBg);
    return () => window.removeEventListener("resize", updateBg);
  }, []);

  // Load and shuffle cards
  useEffect(() => {
    const themedCards = getCardsByTheme(theme).slice(0, totalUniqueCards);
    setCards(shuffle(themedCards));
  }, [theme, totalUniqueCards]);

  // Timer Start
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Animate score display
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime((prev) => (prev < time ? prev + 1 : prev));
      setDisplayMoves((prev) => (prev < moves ? prev + 1 : prev));
    }, 30);
    return () => clearInterval(interval);
  }, [time, moves]);

  // Handle Flip Logic
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

  // Win Detection
  useEffect(() => {
    if (matched.length === totalUniqueCards) {
      clearInterval(timerRef.current);
      setGameWon(true);

      const storedTime = Number(localStorage.getItem(bestTimeKey));
      const storedMoves = Number(localStorage.getItem(bestMovesKey));

      const noBestYet = !storedTime && !storedMoves;

      const isBetter =
        moves < storedMoves ||
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
    setDisplayTime(0);
    setDisplayMoves(0);
    setGameWon(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-8 px-4"
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div className="text-center space-y-2 mb-6">
        <img src="/logo.png" alt="Game Logo" className="w-48 mx-auto mb-2 drop-shadow-lg" />
        <p className="text-sm text-white font-medium">Difficulty: {difficulty} | Theme: {theme}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/80 border border-white/60 backdrop-blur-md rounded-xl shadow-xl px-6 py-4 max-w-2xl mx-auto text-sm text-gray-800 font-medium">
          <span>⏳ Time: {displayTime}s</span>
          <span>🎯 Moves: {displayMoves}</span>
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
        className="flex mt-4 mx-auto px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        🔙 Back
      </button>

      {gameWon && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div
      className="bg-white/80 backdrop-blur-lg border border-white rounded-2xl text-center shadow-2xl p-8 space-y-4 max-w-sm mx-auto transform transition-all duration-500 scale-100 animate-pop"
    >
      <h2 className="text-2xl font-bold text-green-600">🎉 Congratulations!</h2>
      <p className="text-gray-800">You matched all pairs!</p>
      <p className="text-gray-700">⏳ Time: {time} sec</p>
      <p className="text-gray-700">🎯 Moves: {moves}</p>
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
