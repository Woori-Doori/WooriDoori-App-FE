import React from 'react';

interface CardProps {
  rank: number;
  title: string;
  subtitle: string;
  buttonText: string;
  cardImageSrc: string;
  buttonOnClick: () => void;
}

const Card: React.FC<CardProps> = ({ rank ,title, subtitle, cardImageSrc }) => {
  return (
    <div className="flex gap-6 items-center">
      <img 
        src={cardImageSrc} 
        alt="card" 
        className="object-contain w-32 h-auto card-rotate-3d flex-shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = cardImageSrc;
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-start">
          {rank === 1 ? (
            <h1 className='text-[1.8rem] text-[#8BC34A] font-extrabold mb-2'>{rank}위</h1>
          ) : (
            <h1 className='text-[1.5rem] text-[#8BC34A] font-bold mb-1.5'>{rank}위</h1>
          )}
          <h2 className={`${rank === 1 ? 'text-[1.6rem] mb-3' : 'text-[1.4rem] mb-2'} font-semibold text-gray-900 whitespace-pre-line leading-tight`}>{title}</h2>
          <p className={`${rank === 1 ? 'text-[1.1rem]' : 'text-[1rem]'} text-gray-600 leading-relaxed line-clamp-2`}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;