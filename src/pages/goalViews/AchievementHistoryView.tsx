import { useEffect, useState } from "react";
import { apiList } from "@/api/apiList";
import { useNavigate, useLocation } from "react-router-dom";
import DefaultDiv from "@/components/default/DefaultDiv";
import DefaultButton from "@/components/button/DefaultButton";
import BottomButtonWrapper from "@/components/button/BottomButtonWrapper";
import BenefitChart from "@/components/chart/BenefitChart";
import { useUserStore } from "@/stores/useUserStore";

export default function AchievementHistoryView() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "home";

  const { userInfo, isLoggedIn } = useUserStore();
  const userName = isLoggedIn && userInfo?.name ? userInfo.name : "사용자";

  const handleClose = () => {
    if (from === "mypage") navigate("/mypage");
    else navigate("/home");
  };

  const [historyList, setHistoryList] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    apiList.goalhistory
      .getGoalHistory()
      .then((goalList) => {
        setHistoryList(goalList); // 백엔드 GetGoalDto 그대로 넣기
      })
      .catch((err) => {
        console.error("목표 히스토리 조회 실패:", err);
        alert("목표 히스토리를 불러오지 못했습니다.");
      });
  }, []);

  // ⭐ 리스트용 최신순 정렬 배열
  const sortedList = [...historyList].sort((a, b) => {
    const dateA = new Date(a.goalStartDate);
    const dateB = new Date(b.goalStartDate);
    return dateB.getTime() - dateA.getTime(); // 최신 → 과거
  });

  // ⭐ 차트용 데이터(원래 순서 유지)
  const benefitData =
    historyList.length > 0
      ? historyList.map((item) => {
          const dateStr = item.goalStartDate ?? "";
          const monthNum = Number(dateStr.slice(5, 7)) || 1;

          return {
            month: `${monthNum}월`,
            benefit: item.goalScore ?? 0,
          };
        })
      : [];

  return (
    <DefaultDiv
      isHeader={true}
      title="목표 관리 기록"
      isShowBack={false}
      isShowClose={true}
      isShowSetting={false}
      onClose={handleClose}
      isMainTitle={false}
      isBottomNav={true}
      className="overflow-hidden"
    >
      <div className="flex overflow-hidden flex-col h-full min-h-0">
        {/* 혜택 그래프 - 상단 고정 */}
        <div className="flex-shrink-0 px-6 pt-4 pb-4">
          {benefitData.length > 0 && (
            <BenefitChart
              data={benefitData}
              currentMonthIndex={benefitData.length - 1}
              userName={userName}
            />
          )}
          <div className="flex-shrink-0 mx-6 border-t border-gray-200"></div>
        </div>

        {/* 달성도 카드 목록 - 스크롤 가능 */}
        <div className="overflow-y-auto flex-1 px-6 pt-4 pb-56 min-h-0 -webkit-overflow-scrolling-touch">
          <div className="flex flex-col gap-6">
            {sortedList.map((a, i) => (
              <div
                key={i}
                className={`
                  w-full rounded-2xl p-4 transition-all relative
                  ${
                    selectedItem === a
                      ? "border-2 border-[#8BC34A] shadow-md"
                      : "border border-transparent"
                  }
                  bg-white hover:bg-gray-50
                `}
              >
                <button
                  onClick={() => setSelectedItem(a)}
                  className="w-full text-left"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-[1.3rem] text-gray-500">
                        {a.goalStartDate?.slice(0, 7).replace("-", ".")}
                      </p>
                      <p className="text-[1.4rem] font-medium text-gray-700">
                        {a.previousGoalMoney}만원 쓰기
                      </p>

                      {/* 진행바 */}
                      <div className="w-full bg-[#FFFCD9] h-[0.8rem] rounded-full mt-3 flex items-center relative">
                        <div
                          className="h-[0.8rem] rounded-full bg-[#8BC34A]"
                          style={{
                            width: `${(a.goalIncome / a.previousGoalMoney)}%`,
                          }}
                        />
                        <span className="absolute right-0 text-[1.2rem] text-gray-500 font-medium translate-x-[130%]">
                          {Math.round(
                            a.goalIncome / a.previousGoalMoney
                          )}
                          %
                        </span>
                      </div>
                    </div>

                    <p className="text-[1.8rem] font-bold text-gray-900">
                      {a.goalScore ?? 0}점
                    </p>
                  </div>
                </button>
              </div>
            ))}

            {/* 선택 시 다음 버튼 */}
            {selectedItem && (
              <BottomButtonWrapper paddingBottom="pb-[9rem]">
                <DefaultButton
                  text="목표관리 확인하기"
                  onClick={() => {
                    const year = Number(selectedItem.goalStartDate.slice(0, 4));
                    const month = Number(selectedItem.goalStartDate.slice(5, 7));

                    navigate("/achievement/detail", {
                      state: {
                        year,
                        month,
                        from,
                        historyList: historyList, // 차트용은 원본 그대로
                      },
                    });
                  }}
                />
              </BottomButtonWrapper>
            )}
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
}
