// src/components/Cards.jsx
export default function Card({ card, isFlipped, onClick }) {
  return (
    <div
      className="w-full aspect-square max-w-[65px] sm:max-w-[80px] md:max-w-[90px] lg:max-w-[100px] cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Back of the card */}
        <div className="absolute w-full h-full bg-[#34D1BF] border-4 border-white rounded-2xl shadow-md flex items-center justify-center text-3xl font-semibold backface-hidden">
          ❓
        </div>

        {/* Front of the card */}
        <div className="absolute w-full h-full bg-[#34D1BF] border-4 border-white rounded-2xl shadow-md flex items-center justify-center text-3xl font-semibold transform rotate-y-180 backface-hidden">
          {card.icon}
        </div>
      </div>
    </div>
  );
}
