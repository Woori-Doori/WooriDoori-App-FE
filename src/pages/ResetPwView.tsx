import { img } from "@/assets/img";
import BackButton from "@/components/button/BackButton";
import DefaultButton from "@/components/button/DefaultButton";
import DefaultDiv from "@/components/default/DefaultDiv";
import InputBox from "@/components/input/InputBox";
import Title1 from "@/components/title/Title1";
import { useState } from "react";

const ResetPwView = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // ✅ 에러 메시지 상태

  // 이름과 아이디가 모두 입력되면 버튼 활성화
  const isFormValid = name.trim().length > 0 && id.trim().length > 0;

  const handleConfirm = () => {
    // 샘플 시나리오: 존재하지 않는 아이디
    if (id !== "$member_id") {
      setErrorMsg("존재하지 않는 아이디입니다.");
      return;
    }

    // 정상 시 로그인 페이지 이동
    window.location.href = "/newpw";
  };

  return (
    <DefaultDiv>
        <BackButton
            size={20}
            onClick={() => (window.location.href = "/login")}
        />

        <div className="h-8" />
        <img src={img.wooridoorilogo} alt="" className="w-60 mx-auto"/>
        <div className="h-8" />

      <Title1 text="비밀번호 찾기" />
      <div className="h-4" />
      <h3 className="text-center">
        임시 비밀번호를 발급받을 계정을 입력해주세요
      </h3>
      <div className="h-8" />

      <InputBox
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(n) => {
          setName(n.target.value);
          setErrorMsg(""); // 입력 시 메시지 초기화
        }}
      />

      <div className="h-8" />

      <InputBox
        placeholder="아이디를 입력해주세요"
        value={id}
        onChange={(i) => {
          setId(i.target.value);
          setErrorMsg(""); // 입력 시 메시지 초기화
        }}
      />

      {/* ✅ 샘플 에러 메시지 */}
      {errorMsg && <p className="text-red-500 mt-2 text-center">{errorMsg}</p>}

      <div className="h-72" />
      <div className="flex justify-center pt-4">
        <DefaultButton
          text="확인"
          disabled={!isFormValid}
          onClick={handleConfirm}
        />
      </div>
    </DefaultDiv>
  );
};

export default ResetPwView;
