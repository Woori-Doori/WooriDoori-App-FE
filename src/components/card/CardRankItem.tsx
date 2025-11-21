import { img } from "@/assets/img";
import React from "react";

interface CardRankItemProps {
    rank: number;               // 순위 (예: 2)
    title: string;              // 제목 (예: 카드의정석)
    subtitle: string;           // 부제목 (예: COOKIE CHECK)
    description?: string;       // 설명 (예: 네이버페이 1% 적립)
    imageSrc: string;           // 이미지 경로
    onClick?: () => void;       // 클릭 이벤트
}

const CardRankItem: React.FC<CardRankItemProps> = ({
    rank,
    title,
    subtitle,
    description,
    imageSrc,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className="flex justify-between items-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md hover:border-gray-200"
        >
            {/* 왼쪽 이미지 */}
            <img
                src={imageSrc}
                alt={title}
                className="object-contain flex-shrink-0 w-20 h-28 rounded-lg"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = imageSrc;
                }}
            />

            {/* 오른쪽 텍스트 */}
            <div className="flex-1 ml-5 min-w-0 text-start">
                <div className="text-[1.5rem] font-bold text-[#8BC34A] mb-1.5">{rank}위</div>
                <div className="text-[1.3rem] font-semibold text-gray-900 whitespace-pre-line mb-2 leading-tight">{title}</div>
                {subtitle && (
                    <div className="text-[1.2rem] font-normal text-gray-600 whitespace-pre-line mb-2">{subtitle}</div>
                )}
                {description && (
                    <div className="text-[1rem] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{description}</div>
                )}
            </div>

            {/* 화살표 아이콘 */}
            <img src={img.grayCheckRightIcon} alt=">" className="flex-shrink-0 ml-3 w-5 h-5 opacity-50" />
        </div>
    );
};

export default CardRankItem;
