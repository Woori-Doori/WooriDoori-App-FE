import { img } from "@/assets/img";

interface HeaderBarProps {
  title: string;
  isShowBack?: boolean;
  isShowClose?: boolean;
  isShowSetting?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  onClickSetting?: () => void;
  className?: string;
  isMainTitle?: boolean
}

const HeaderBar = ({
  title,
  isShowBack = false,
  isShowClose = true,
  isShowSetting = false,
  onBack,
  onClose,
  onClickSetting,
  className = "",
  isMainTitle = false
}: HeaderBarProps) => {
  return (
    <header
      className={`
        fixed top-0 left-1/2 transform -translate-x-1/2
        flex items-center justify-between
        w-full h-[6rem] max-w-[400px]
        px-5 bg-white
        z-1
        pt-[env(safe-area-inset-top)]
        ${className}
      `}
    >
      {/* 왼쪽: 뒤로가기 버튼 */}
      {isShowBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로가기"
          className="flex-1 max-w-10 h-full flex items-center justify-center"
        >
          <img src={img.Vector} alt="뒤로가기" className="object-contain w-15 h-6" />
        </button>
      )}

      {/* 가운데: 타이틀 */}
      <h1 className={`
        flex-2 ${isMainTitle ? 'text-[2rem] text-start' : 'text-[1.7rem] text-center'}  font-semibold text-gray-900 truncate
        `}>
        {title}
      </h1>

      {/* 오른쪽: 닫기 버튼 */}
      {isShowClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex justify-end max-w-10 pr-1"
        >
          <img src={img.BsX} alt="닫기" className="object-contain w-10 h-10" />
        </button>
      )}


      {/* 오른쪽: 닫기 버튼 */}
      {isShowSetting && (
        <button
          type="button"
          onClick={onClickSetting}
          aria-label="설정"
          className="flex-1 flex justify-center max-w-10 pr-2"
        >
          <img src={img.settingIcon} alt="설정" className="object-contain w-7 h-7" />
        </button>
      )}



    </header>
  );
};

export default HeaderBar;