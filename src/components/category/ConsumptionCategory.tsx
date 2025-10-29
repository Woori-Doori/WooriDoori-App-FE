interface ConsumptionCategoryProps {
    iconSrc: string;
    label: string;
    percentage: string;
    amount: string;
    bgColor?: string;
    isBorder? : boolean;
}

const ConsumptionCategory = ({
    iconSrc,
    label,
    percentage,
    amount,
    bgColor = "bg-gray-100", // 기본 배경
    isBorder = true,
}: ConsumptionCategoryProps) => {
    return (
        <div className={`flex items-center justify-between flex-1 w-full px-8 py-4 ${isBorder ? 'border-b border-gray-100' : ''}`}>
            {/* 왼쪽: 아이콘 + 텍스트 */}
            <div className="flex gap-8 items-center">
                {/* ✅ 아이콘 영역 */}
                <div
                    className={`flex justify-center items-center w-16 h-16 rounded-full ${bgColor} shrink-0`}
                >
                    <img
                        src={iconSrc}
                        alt={label}
                        className="object-scale-down p-1 w-10 h-10"
                    />
                </div>

                {/* ✅ 텍스트 정보 */}
                <div className="flex flex-col items-start">
                    <span className="text-gray-900 text-[1.4rem]">{label}</span>
                    <span className="text-gray-400 text-[1.1rem]">{percentage}</span>
                </div>
            </div>

            {/* 오른쪽: 금액 */}
            {amount && (
                <div className="pr-3 text-right">
                    <span className="text-gray-900 text-[1.5rem]">{amount}</span>
                </div>
            )}
        </div>
    );
};
export default ConsumptionCategory;
