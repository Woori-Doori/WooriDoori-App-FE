import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultDiv from '@/components/default/DefaultDiv';
import { img } from '@/assets/img';

const MyPageView: React.FC = () => {
  const navigate = useNavigate();
  
  // localStorage에서 사용자 정보 가져오기
  const getUserName = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.name || '사용자';
    }
    return '석기'; // 기본값
  };
  
  const userName = getUserName();
  
  const menuItems = [
    { title: '메인 화면', icon: '>', path: '/home' },
    { title: '소비 일기', icon: '>', path: '/calendar/diary' },
    { title: '소비 내역', icon: '>', path: '/calendar' },
    { title: '카드 관리', icon: '>', path: '/card' },
    { title: '카드 살펴보기', icon: '>', path: '/card-recommend' },
    { title: '목표 관리', icon: '>', path: '/goal/achievementHistory' },
    { title: '목표 수정', icon: '>', path: '/goal/editGoal' },
  ];

  return (
    <DefaultDiv isHome={true} isBottomNav={true}>
      {/* 헤더 - 설정 아이콘 */}
      <div className="flex justify-end pt-4 pb-2 w-full">
        <button
          onClick={() => navigate('/userinfo')}
          className="p-2 rounded-lg transition-colors hover:bg-gray-100"
        >
          <img
            src={img.settingIcon}
            alt="설정"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* 사용자 프로필 섹션 */}
      <div className="flex gap-4 items-center mb-24">
        {/* 프로필 이미지 */}
        <div className="flex overflow-hidden justify-center items-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
          <img
            src={img.doori_favicon}
            alt="프로필"
            className="object-contain w-12 h-12"
          />
        </div>
        
        {/* 사용자 정보 */}
        <div className="flex-1">
          <h1 className="text-[1.8rem] font-bold text-gray-900 mb-1">
            {userName}님
          </h1>
          <p className="text-[1.2rem] text-gray-600">
            안녕하세요. 오늘도 이용해주셔서 감사해요.
          </p>
        </div>
      </div>

      {/* 메뉴 섹션 */}
      <div className="mb-8 w-full">
        <div className="bg-white border border-gray-200 rounded-[1.6rem] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* 제목 */}
        <h2 className="text-[1.6rem] font-bold text-gray-900 mb-4">메뉴</h2>
        <hr className="border-gray-200 mb-4" />
        
        {/* 메뉴 리스트 */}
        <div className="divide-y divide-gray-100">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path, { state: { from: 'mypage' } })}
                className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors"
              >
                <span className="text-[1.35rem] text-gray-700">{item.title}</span>
                <img
                  src={img.grayCheckRightIcon}
                  alt=">"
                  className="w-[1.2rem] h-[1.2rem] opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultDiv>
  );
};

export default MyPageView;
