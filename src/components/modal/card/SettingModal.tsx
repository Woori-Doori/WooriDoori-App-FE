export const SettingModal = (
  {isOpen = false, onClickAdd, onClickEdit, onClose} :
  { isOpen?: boolean , 
    onClickAdd : React.MouseEventHandler<HTMLButtonElement> | undefined, 
    onClickEdit : React.MouseEventHandler<HTMLButtonElement> | undefined,
    onClose : ()=> void,
  }

) => {
  return (
    <div
      className={`
        z-50 fixed inset-0 justify-center items-end bg-black/40 transition-all duration-500 
        ${isOpen ? 'flex' : 'hidden'} 
        `
      }
      onClick={onClose}
    >
      <div
        className={`w-full max-w-[400px] h-[170px] bg-white rounded-t-3xl shadow-lg flex flex-col transform transition-transform duration-500 ease-out bottom-sheet
          ${isOpen ? 'active' : 'hide'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 회색 바 */}
        <div className="flex justify-center pt-[0.75rem]">
          <div className="w-[5rem] h-[0.5rem] bg-gray-300 rounded-lg" />
        </div>

        {/* 모달 제목 */}
        <div className="px-[1.5rem] py-[1.25rem]">
          <h2 className="text-[1.6rem] font-semibold text-gray-800 text-center">
            설정
          </h2>
        </div>

        {/* 버튼 영역 */}
        <div className="px-[1.5rem] pb-[1.5rem] mt-[1rem]">
          <div className="flex gap-[0.75rem]">
            <button
              onClick={onClickAdd}
              className="flex-1 py-[1rem] bg-gray-100 text-gray-800 text-[1.4rem] font-medium rounded-xl active:bg-gray-200"
            >
              카드 추가
            </button>
            <button
              onClick={onClickEdit}
              className="flex-1 py-[1rem] bg-gray-800 text-white text-[1.4rem] font-medium rounded-xl active:bg-gray-700"
            >
              카드 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}