import { useState } from "react";
import DefaultDiv from "../components/default/DefaultDiv";
import DefaultButton from "../components/button/DefaultButton";
import Header from "../components/default/Header";
import image from "../assets/login/signUpImg.png";

const SignUpAgreementView = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [agreements, setAgreements] = useState({
    age: false,
    terms: false,
    privacy: false,
  });

  const handleAllCheck = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setAgreements({
      age: newState,
      terms: newState,
      privacy: newState,
    });
  };

  const handleCheck = (key: keyof typeof agreements) => {
    const updated = { ...agreements, [key]: !agreements[key] };
    setAgreements(updated);
    setAllChecked(Object.values(updated).every(Boolean));
  };

  return (
    <DefaultDiv>
  {/* ✅ 헤더를 DefaultDiv 테두리 안으로: transform 래퍼 */}
  <div className="max-w-[40rem] translate-x-0">
<Header
  title="회원가입"
  showBack
  showClose
  onBack={() => console.log("뒤로가기 클릭")}
  onClose={() => console.log("닫기 클릭")}
  className="mx-auto border-b-0"
/>
  </div>

  {/* ✅ 본문: 헤더 높이만큼 패딩 */}
  <div className="pt-[8rem] flex flex-col items-center">
    {/* 안내 문구 - 왼쪽 정렬 */}
    <div className="w-[34rem] text-left mb-[3rem]">
      <p className="text-[2rem] font-bold text-gray-800 leading-relaxed">
        아래 약관을 동의하신 후<br /> 다음을 눌러주세요.
      </p>
    </div>

        {/* 이미지 */}
        <img
          src={image}
          alt="회원가입 일러스트"
          className="w-[20rem] mb-[4rem] select-none"
        />

        {/* 전체 동의 + 약관 */}
        <div className="w-[34rem] text-left flex flex-col gap-[2rem] text-[1.5rem] text-gray-700 mb-[6rem]">
          {/* 전체 동의 */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={handleAllCheck}
          >
            <div className="flex items-center gap-[1rem]">
              <input
                type="checkbox"
                checked={allChecked}
                readOnly
                className="w-[1.8rem] h-[1.8rem] accent-green-500"
              />
              <span className="font-bold text-[1.8rem]">전체 동의</span>
            </div>
          </div>

          {/* 개별 약관 */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleCheck("age")}
          >
            <div className="flex items-center gap-[1.2rem]">
              <input
                type="checkbox"
                checked={agreements.age}
                readOnly
                className="w-[1.8rem] h-[1.8rem] accent-green-500"
              />
              <span>
                만 14세 이상 약관동의{" "}
                <span className="text-red-500">(필수)</span>
              </span>
            </div>
            <span className="text-gray-400 text-[1.2rem]">›</span>
          </div>

          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleCheck("terms")}
          >
            <div className="flex items-center gap-[1rem]">
              <input
                type="checkbox"
                checked={agreements.terms}
                readOnly
                className="w-[1.8rem] h-[1.8rem] accent-green-500"
              />
              <span>
                이용 약관동의 <span className="text-red-500">(필수)</span>
              </span>
            </div>
            <span className="text-gray-400 text-[1.2rem]">›</span>
          </div>

          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleCheck("privacy")}
          >
            <div className="flex items-center gap-[1rem]">
              <input
                type="checkbox"
                checked={agreements.privacy}
                readOnly
                className="w-[1.8rem] h-[1.8rem] accent-green-500"
              />
              <span>
                개인정보 약관동의 <span className="text-red-500">(필수)</span>
              </span>
            </div>
            <span className="text-gray-400 text-[1.2rem]">›</span>
          </div>
        </div>

        {/* 다음 버튼 */}
        <div className="w-[34rem] mx-auto flex justify-center">
          <DefaultButton text="다음" />
        </div>
      </div>
    </DefaultDiv>
  );
};

export default SignUpAgreementView;
