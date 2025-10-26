import Title1 from "../components/title/Title1";
import InputBox from "../components/input/InputBox";
import DefaultButton from "../components/button/DefaultButton";
import logo from "../assets/login/logo_login.png";
import DefaultDiv from "../components/default/DefaultDiv";

const LoginView = () => {
  return (
    <DefaultDiv>
      <div className="pt-[3rem] flex flex-col items-center">
        {/* 로고 */}
        <img
          src={logo}
          alt="login logo"
          className="w-[18rem] mb-[1.5rem] select-none"
        />

        {/* 타이틀 */}
        <div className="mb-[10rem]">
          <Title1 text="로그인" />
        </div>

        {/* 입력 영역 */}
        <div className="w-full mx-auto mb-[24rem] flex flex-col gap-[1rem] items-center">
          {/* 아이디 입력 */}
          <div className="w-full max-w-[33.5rem]">
            <InputBox placeholder="아이디를 입력해주세요" />
          </div>

          {/* 비밀번호 입력 */}
          <div className="relative w-full max-w-[33.5rem]">
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="w-full px-4 py-3 rounded-lg outline-none border border-gray-300 text-gray-800 bg-white focus:ring-green-300 transition"
            />

            {/* 아이디 / 비밀번호 찾기 */}
            <div className="absolute right-0 bottom-[-2.8rem] flex gap-[1.6rem] text-[1.2rem] text-gray-500">
              <a
                href="/find-id"
                className="hover:text-green-600 hover:underline transition"
              >
                아이디 찾기
              </a>
              <span>|</span>
              <a
                href="/find-password"
                className="hover:text-green-600 hover:underline transition"
              >
                비밀번호 찾기
              </a>
            </div>
          </div>
        </div>

        {/* 하단 회원가입 링크 */}
        <p className="text-[1rem] text-gray-500 mb-[1rem]">
          아직 회원이 아니신가요?{" "}
          <a
            href="/signup"
            className="text-green-600 font-medium hover:text-green-700 hover:underline transition"
          >
            회원가입하기
          </a>
        </p>

        {/* 로그인 버튼 */}
        <div className="w-full max-w-[33.5rem] mx-auto">
          <DefaultButton text="로그인" className="max-w-[33.5rem] w-full" />
        </div>
      </div>
    </DefaultDiv>
  );
};

export default LoginView;
