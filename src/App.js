// src/App.jsx
import { useEffect, useState, useRef } from 'react';
import Card from './components/Cards';
import { cardsArray } from './data/cards';
import './index.css';

function shuffle(array) {
  const doubled = [...array, ...array]; // duplicate cards
  return doubled
    .map(card => ({ ...card, uuid: Math.random() })) // add uuid for uniqueness
    .sort(() => 0.5 - Math.random());
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);
  const [gameWon, setGameWon] = useState(false);

  const [bestTime, setBestTime] = useState(() => {
    return Number(localStorage.getItem("bestTime")) || null;
  });
  const [bestMoves, setBestMoves] = useState(() => {
    return Number(localStorage.getItem("bestMoves")) || null;
  });


  // Shuffle cards on initial render
  useEffect(() => {
    setCards(shuffle(cardsArray));
  }, []);


  // Check if two cards are flipped, if so, add to matched or reset flipped and Count moves
  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(m => m + 1); // ✅ increment moves
      const [first, second] = flipped;

      if (cards[first].icon === cards[second].icon) {
        setMatched([...matched, cards[first].icon]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped, cards, matched]);


  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current); // cleanup on unmount
  }, []);

  //  win Screen
  useEffect(() => {
    if (matched.length === cardsArray.length) {
      clearInterval(timerRef.current);
      setGameWon(true); // ✅ trigger overlay
    }
  }, [matched]);


  const handleClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index)) {
      setFlipped([...flipped, index]);
    }
  };

  const handleReset = () => {
    setCards(shuffle(cardsArray));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    clearInterval(timerRef.current); // stop old timer
    setTime(0);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    setGameWon(false);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 py-8 px-4">
      <div className="text-center space-y-2 mb-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 leading-none inline-block">
  MEMORY MATCH
</h1>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg px-4 py-3 text-sm sm:text-base mt-4 max-w-xl mx-auto text-center">
  <span className="font-medium text-blue-800">⏳ Time: {time}s</span>
  <span className="font-medium text-blue-800">🎯 Moves: {moves}</span>
  <span className="font-medium text-green-700">🏆 Best Time: {bestTime ?? "--"}</span>
  <span className="font-medium text-green-700">💡 Best Moves: {bestMoves ?? "--"}</span>
</div>

        {/* <button
          onClick={handleReset}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          🔁 Reset Game
        </button> */}
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto px-2 justify-items-center">


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


      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white/60 backdrop-blur-lg border border-white rounded-lg text-center shadow-xl p-8 space-y-4 max-w-sm mx-auto">
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
            {((!bestTime || time < bestTime) && (!bestMoves || moves < bestMoves)) && (
  <>
    {setBestTime(time)}
    {setBestMoves(moves)}
    {localStorage.setItem("bestTime", time)}
    {localStorage.setItem("bestMoves", moves)}
  </>
)}

          </div>
        </div>
      )}

      

    </div>
  );
}
