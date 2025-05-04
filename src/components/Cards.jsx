

export default function Card({ card, isFlipped, onClick }) {
    return (
        <div
  className="w-full aspect-square max-w-[65px] sm:max-w-[80px] md:max-w-[90px] lg:max-w-[100px] perspective cursor-pointer"
  onClick={onClick}
>
        <div
          className={`w-full h-full transition-transform duration-500 transform-style preserve-3d relative ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute w-full h-full bg-white/70 border border-blue-300 rounded-xl flex items-center justify-center text-3xl font-semibold backface-hidden">
  ❓
</div>
<div className="absolute w-full h-full bg-blue-100/80 border border-blue-400 rounded-xl flex items-center justify-center text-3xl font-semibold transform rotate-y-180 backface-hidden">
  {card.icon}
</div>
        </div>
      </div>
    );
  }
  
