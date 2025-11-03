import React, { useState, useEffect } from "react";

interface MainBannerProps {
  consumPercent: number;         // 소비율 (예: 80)
  remainDays: number;      // 달성하기까지 남은 일수
  progressColor?: string;  // 진행바 색상
  bgColor?: string;        // 배경색
  bgImage?: string;        // 배경 이미지 (선택)
  className? : string;
}

const MainBanner: React.FC<MainBannerProps> = ({
  consumPercent,
  remainDays,
  progressColor = "#FFD84D",
  bgColor = "#4C8B73",
  bgImage,
  className,
}) => {
  const percent = consumPercent;
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // 첫 로딩 시 바로 흔들림
    setShake(true);
    const timeout = setTimeout(() => setShake(false), 1000);

    // 10초마다 흔들림
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`w-full h-[15rem] rounded-xl p-5 text-white flex flex-col justify-center ${className}`}
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      {/* 진행 바 */}
      <div className="mb-3">
        <div className="w-1/2 mt-3 bg-gray-300/40 rounded-full h-5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${percent}%`, backgroundColor: progressColor }}
          ></div>
        </div>
      </div>

      {/* 퍼센트 및 문구 */}
      <div className="flex flex-col">
        <div className="font-bold flex items-end gap-2">
          <span
            className={`text-[4rem] leading-none ${
              shake ? "diagonal-shake" : ""
            }`}
          >
            {percent}%
          </span>
          <span className="text-[2rem] mb-3 leading-none">소비!</span>
        </div>

        <p className="text-[1.3rem] ml-4 mt-5 opacity-80 font-medium whitespace-pre-line">
          지금 속도면 이번달 소비는 <br />
          <span className="text-[1.35rem] text-[#FFD84D] font-bold">
            {remainDays}일
          </span>{" "}
          뒤에 <span className="text-[1.3rem] font-semibold">100%</span>가 됩니다!
        </p>
      </div>
    </div>
  );
};

export default MainBanner;