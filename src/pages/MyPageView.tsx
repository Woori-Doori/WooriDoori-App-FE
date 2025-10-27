import React from 'react';
import DefaultDiv from '@/components/default/DefaultDiv';
import { img } from '@/assets/img';

const MyPageView: React.FC = () => {
  const menuItems = [
    { title: '메인 화면', icon: '>' },
    { title: '소비 내역 (일기)', icon: '>' },
    { title: '소비 내역 (캘린더)', icon: '>' },
    { title: '카드 관리', icon: '>' },
    { title: '카드 추천', icon: '>' },
    { title: '달성도', icon: '>' },
    { title: '목표 수정', icon: '>' },
    { title: '카테고리별 사용 금액 상세', icon: '>' },
  ];

  return (
    <DefaultDiv>
      {/* 헤더 - 설정 아이콘 */}
      <div className="flex justify-end w-full pt-4 pb-2">
        <img
          src={img.settingIcon}
          alt="설정"
          className="w-6 h-6"
        />
      </div>

      {/* 사용자 프로필 섹션 */}
      <div className="flex items-center gap-4 mb-8">
        {/* 프로필 이미지 */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          {/* 프로필 이미지가 없을 때 기본 아이콘 또는 빈 원 */}
        </div>
        
        {/* 사용자 정보 */}
        <div className="flex-1">
          <h1 className="text-[1.8rem] font-bold text-gray-900 mb-1">
            석기시대님
          </h1>
          <p className="text-[1.2rem] text-gray-500">
            안녕하세요 오늘도 이용해주셔서 감사해요
          </p>
        </div>
      </div>

      {/* 메뉴 섹션 */}
      <div className="w-full">
        <h2 className="text-[1.6rem] font-bold text-gray-900 mb-4">
          메뉴
        </h2>
        
        {/* 메뉴 리스트 */}
        <div className="bg-gray-50 rounded-xl p-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 px-4 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span className="text-[1.4rem] text-gray-700">
                {item.title}
              </span>
              <span className="text-[1.2rem] text-gray-400">
                {item.icon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DefaultDiv>
  );
};

export default MyPageView;
