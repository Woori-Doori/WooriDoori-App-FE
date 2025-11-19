import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultDiv from "@/components/default/DefaultDiv";
import Title2 from "@/components/title/Title2";
import SubText from "@/components/text/SubText";
import GoalInput from "@/components/input/GoalInput";
import DefaultButton from "@/components/button/DefaultButton";
import BottomButtonWrapper from "@/components/button/BottomButtonWrapper";
import check from "@/assets/check2.png";
import { apiList } from "@/api/apiList";
import { useCookieManager } from "@/hooks/useCookieManager";

const { getCookies } = useCookieManager();

// 문자열 → 숫자 변환
function parseAmountToNumber(v: string | number | null) {
  if (v === null || v === undefined) return 0;
  const s = String(v).replace(/,/g, "").trim();
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

export default function GoalEditView() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1(수입 수정) → 2(목표 수정) → 3(완료)

  const [incomeText, setIncomeText] = useState("");
  const [goalText, setGoalText] = useState("");

  const incomeNum = useMemo(() => parseAmountToNumber(incomeText), [incomeText]);
  const goalNum = useMemo(() => parseAmountToNumber(goalText), [goalText]);

  const [currentGoal, setCurrentGoal] = useState<any>(null); // 현재 목표 전체 저장
  const [serverMsg, setServerMsg] = useState("");   // 서버 메시지 저장 (다음 달 목표 등록 / 수정 등)

  // ---------------------------------------------
  // 🔥 1) 현재 목표 불러오기 (GET /goal/current)
  // ---------------------------------------------
    useEffect(() => {
    const { accessToken } = getCookies();
    console.log("🍪 현재 accessToken:", accessToken);

    try {
      const decoded = JSON.parse(atob(accessToken.split(".")[1]));
      console.log("🧩 JWT payload:", decoded);
    } catch (e) {
      console.log("❌ JWT decode 실패:", e);
    }

    const fetchGoal = async () => {
      try {
        const res = await apiList.goal.getCurrentGoal();
        const data = res.data?.resultData;


        console.log("📥 현재 목표 데이터:", data);
        console.log("서버 원본 응답:", res.data);


        if (!data) return;

        // ⭐ 반드시 서버 필드 이름이랑 일치해야 함
        setCurrentGoal({
          goalJob: data.goalJob,
          goalStartDate: data.goalStartDate,
          essentialCategories: data.essentialCategories ?? [], // ⭐ null 대비
          goalIncome: data.goalIncome,
          previousGoalMoney: data.previousGoalMoney,
        });

        setIncomeText(data.goalIncome ?? "");
        setGoalText(String(data.previousGoalMoney ?? ""));
      } catch (err) {
        console.error("❌ 현재 목표 조회 실패:", err);
        alert("기존 목표 정보를 불러오지 못했습니다.");
      }
    };

    fetchGoal();
  }, []);

  const isValidStep = useMemo(() => {
    if (step === 1 && incomeNum <= 0) return false;
    if (step === 2 && goalNum <= 0) return false;
    return true;
  }, [step, incomeNum, goalNum]);

  // ---------------------------------------------
  // 🔥 2) 목표 수정 요청 (PUT /goal/setgoal)
  // ---------------------------------------------
  const submitGoalEdit = async () => {
    if (!currentGoal) {
      alert("기존 목표 정보를 불러오지 못했습니다.");
      return false;
    }

    // ⭐ PUT은 모든 필드를 보내야 DTO 바인딩 성공
    const payload = {
      goalJob: currentGoal.goalJob,
      goalStartDate: currentGoal.goalStartDate,
      essentialCategories: currentGoal.essentialCategories ?? [], // ⭐ null 방지

      goalIncome: incomeNum.toString(),
      previousGoalMoney: goalNum,
    };

    console.log("📤 최종 수정 payload:", payload);

    try {
      const res = await apiList.goal.setGoal(payload);

      const msg = res.data?.resultMsg;
      if (msg) setServerMsg(msg);

      return true;
    } catch (err) {
      console.error("❌ 목표 수정 실패:", err);
      alert("목표 수정 요청 중 오류가 발생했습니다.");
      return false;
    }
  };


  const handleNext = async () => {
    if (!isValidStep) return;

    if (step === 2) {
      const ok = await submitGoalEdit();  // ✅ 성공 여부 확인
      if (!ok) return;                    // ❌ 실패하면 다음 단계로 안 감
    }

    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setIncomeText("");
    setGoalText("");
    // ✅ 홈으로 이동
    navigate("/");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    } else {
      // 첫 단계일 경우 뒤로가기 버튼이 안보이므로 여기 안들어옴
    }
  };
  const handleClose = () => {
    if (window.history.length > 1) {
      navigate(-1); // 🔙 브라우저 히스토리 기준으로 한 단계 뒤로
    } else {
      navigate("/home"); // 🔁 혹시나 히스토리가 없으면 홈으로
    }
  };

  return (
    <DefaultDiv
      isHeader={true}
      title="목표 금액 수정"
      // ✅ 첫 페이지(step === 1)에서는 뒤로가기 버튼 숨김
      isShowBack={step !== 1}
      isShowClose={true}
      isShowSetting={false}
      onBack={handleBack}
      onClose={handleClose}
      isMainTitle={false}
    >
      {/* STEP 1: 수입 수정 */}
      {step === 1 && (
        <div className="flex flex-col px-6 pt-16 pb-10 h-full">
          <div className="text-left mt-[3rem]">
            <Title2 text="석기시대님의 수입은" />
            <Title2 text="어느정도이신가요?" />
            <div className="mt-[2rem]">
              <SubText text="실제 수령하는 금액 기준으로 입력 부탁드려요." />
            </div>
          </div>

          <div className="mt-[5rem]">
            <GoalInput
              value={incomeText}
              onChange={setIncomeText}
              placeholder="0"
            />
          </div>

          <BottomButtonWrapper>
            <DefaultButton text="다음" disabled={!isValidStep} onClick={handleNext} />
          </BottomButtonWrapper>
        </div>
      )}

      {/* STEP 2: 목표 금액 수정 */}
      {step === 2 && (
        <div className="flex flex-col px-6 pt-16 pb-10 h-full">
          <div className="text-left mt-[3rem]">
            <Title2 text="목표 금액을 수정해주세요." />
            <div className="mt-[2rem]">
              <SubText text="변경된 목표 금액은 다음 달부터 적용됩니다." />
            </div>
          </div>

          <div className="mt-[7rem]">
            <GoalInput
              value={goalText}
              onChange={setGoalText}
              placeholder="0"
            />
          </div>

          <BottomButtonWrapper>
            <DefaultButton text="다음" disabled={!isValidStep} onClick={handleNext} />
          </BottomButtonWrapper>
        </div>
      )}

      {/* STEP 3: 완료 화면 */}
      {step === 3 && (
        <div className="flex flex-col items-center px-4 h-full">
          <div className="flex flex-col items-center justify-center h-[50%]">
            {/* 체크 아이콘 */}
            <div className="w-[10rem] h-[10rem] flex items-center translate-y-[11rem]">
              <img
                src={check}
                alt="완료 체크"
                className="w-[10rem] h-[10rem] object-contain"
              />
            </div>

            {/* 완료 텍스트 */}
            <div className="mt-[13rem] text-center">
              <Title2 text={serverMsg || "목표 금액을 수정했어요"} />
              <SubText
                text="수정된 목표 금액은 다음 달부터 적용됩니다."
                className="mt-[1.2rem]"
              />
            </div>
          </div>


          {/* 수입 / 목표 요약 */}
          <div className="w-[85%] mt-[24rem] flex flex-col gap-[1rem] mx-auto fixed bottom-[12.5rem]">
            <div className="flex justify-between">
              <span className="text-[#A1A1A1] text-[1.3rem]">한달 내 수입</span>
              <span className="text-[#4D4D4D] font-semibold text-[1.5rem]">
                {incomeNum.toLocaleString()} 만원
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A1A1A1] text-[1.3rem]">목표 금액</span>
              <span className="text-[#4D4D4D] font-semibold text-[1.5rem]">
                {goalNum.toLocaleString()} 만원
              </span>
            </div>
          </div>

          <BottomButtonWrapper>
            <DefaultButton text="확인" onClick={handleRestart} />
          </BottomButtonWrapper>
        </div>
      )}
    </DefaultDiv>
  );
}
