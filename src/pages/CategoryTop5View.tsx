import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultDiv from '@/components/default/DefaultDiv';
import Header from '@/components/default/Header';
import '@/styles/category/animations.css';

// 필요한 이미지만 import
import bubbleImg from '@/assets/bubble.png';
import dooriBubbleImg from '@/assets/doori/doori_bubble.png';
import entertainmentImg from '@/assets/entertainment.png';
import trafficImg from '@/assets/traffic.png';
import foodImg from '@/assets/food.png';
import shoppingImg from '@/assets/shopping.png';
import educationImg from '@/assets/education.png';
import travelImg from '@/assets/travel.png';
import hospitalImg from '@/assets/hospital.png';
import transferImg from '@/assets/transfer.png';
import phoneIconImg from '@/assets/phone.png';
import martImg from '@/assets/mart.png';
import residenceImg from '@/assets/residence.png';
import etcImg from '@/assets/etc.png';

const CategoryTop5View = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 12개 카테고리 데이터 (소비 리포트와 동일하게)
  const categories = [
    { id: 'entertainment', name: '술/유흥', icon: entertainmentImg, color: '#FF6B6B' },
    { id: 'transport', name: '교통/자동차', icon: trafficImg, color: '#3ACFA3' },
    { id: 'food', name: '식비', icon: foodImg, color: '#FF8353' },
    { id: 'shopping', name: '쇼핑/마트', icon: shoppingImg, color: '#6B5DD3' },
    { id: 'education', name: '교육', icon: educationImg, color: '#6E6E6E' },
    { id: 'travel', name: '여행', icon: travelImg, color: '#4ECDC4' },
    { id: 'hospital', name: '병원', icon: hospitalImg, color: '#45B7D1' },
    { id: 'transfer', name: '이체', icon: transferImg, color: '#96CEB4' },
    { id: 'communication', name: '통신', icon: phoneIconImg, color: '#FECA57' },
    { id: 'convenience', name: '편의점/마트', icon: martImg, color: '#FFB347' },
    { id: 'housing', name: '주거', icon: residenceImg, color: '#87CEEB' },
    { id: 'etc', name: '기타', icon: etcImg, color: '#C4C4C4' },
  ];

  // 가맹점 데이터 (일단 임시로 둠)
  const merchantData: Record<string, Array<{name: string, logo: string | any, amount: string}>> = {
    entertainment: [
      { name: 'CGV', logo: '🎬', amount: '35,000원' },
      { name: '롯데시네마', logo: '🎭', amount: '28,000원' },
      { name: '메가박스', logo: '🎪', amount: '25,000원' },
      { name: '넷플릭스', logo: '📺', amount: '15,000원' },
      { name: '왓챠', logo: '🎞️', amount: '12,000원' },
    ],
    transport: [
      { name: '지하철', logo: '🚇', amount: '35,000원' },
      { name: '버스', logo: '🚌', amount: '28,000원' },
      { name: '택시', logo: '🚕', amount: '45,000원' },
      { name: '카카오택시', logo: '🚗', amount: '38,000원' },
      { name: '우버', logo: '🚙', amount: '30,000원' },
    ],
    food: [
      { name: '스타벅스', logo: '☕', amount: '45,000원' },
      { name: '메가커피', logo: '🥤', amount: '32,000원' },
      { name: '투썸플레이스', logo: '🍰', amount: '28,000원' },
      { name: '맥도날드', logo: '🍔', amount: '25,000원' },
      { name: '롯데리아', logo: '🍟', amount: '22,000원' },
    ],
    shopping: [
      { name: '롯데마트', logo: '🛒', amount: '120,000원' },
      { name: '이마트', logo: '🛍️', amount: '95,000원' },
      { name: '쿠팡', logo: '📦', amount: '78,000원' },
      { name: '11번가', logo: '🛒', amount: '65,000원' },
      { name: 'G마켓', logo: '🛒', amount: '52,000원' },
    ],
    education: [
      { name: '교보문고', logo: '📚', amount: '85,000원' },
      { name: '영진닷컴', logo: '📖', amount: '72,000원' },
      { name: '알라딘', logo: '📕', amount: '68,000원' },
      { name: '예스24', logo: '📗', amount: '55,000원' },
      { name: '인터파크', logo: '📘', amount: '42,000원' },
    ],
    travel: [
      { name: '아고다', logo: '✈️', amount: '150,000원' },
      { name: '부킹닷컴', logo: '🏨', amount: '135,000원' },
      { name: '에어비앤비', logo: '🏠', amount: '120,000원' },
      { name: '야놀자', logo: '🏖️', amount: '105,000원' },
      { name: '여기어때', logo: '🌴', amount: '95,000원' },
    ],
    hospital: [
      { name: '서울대병원', logo: '🏥', amount: '85,000원' },
      { name: '삼성서울병원', logo: '🏥', amount: '78,000원' },
      { name: '세브란스병원', logo: '🏥', amount: '72,000원' },
      { name: '강남세브란스', logo: '🏥', amount: '68,000원' },
      { name: '서울아산병원', logo: '🏥', amount: '65,000원' },
    ],
    transfer: [
      { name: '토스', logo: '💳', amount: '200,000원' },
      { name: '카카오뱅크', logo: '🏦', amount: '180,000원' },
      { name: '네이버페이', logo: '💰', amount: '165,000원' },
      { name: '페이코', logo: '💸', amount: '150,000원' },
      { name: '삼성페이', logo: '💎', amount: '135,000원' },
    ],
    communication: [
      { name: 'SKT', logo: '📱', amount: '85,000원' },
      { name: 'KT', logo: '📞', amount: '78,000원' },
      { name: 'LG U+', logo: '📲', amount: '72,000원' },
      { name: '알뜰폰', logo: '📟', amount: '45,000원' },
      { name: 'MVNO', logo: '📠', amount: '38,000원' },
    ],
    convenience: [
      { name: 'CU', logo: '🏪', amount: '25,000원' },
      { name: 'GS25', logo: '🏬', amount: '22,000원' },
      { name: '세븐일레븐', logo: '🏪', amount: '20,000원' },
      { name: '미니스톱', logo: '🏪', amount: '18,000원' },
      { name: '이마트24', logo: '🏪', amount: '15,000원' },
    ],
    housing: [
      { name: '월세', logo: '🏠', amount: '500,000원' },
      { name: '관리비', logo: '🏢', amount: '80,000원' },
      { name: '전기세', logo: '⚡', amount: '45,000원' },
      { name: '가스비', logo: '🔥', amount: '35,000원' },
      { name: '수도세', logo: '💧', amount: '25,000원' },
    ],
    etc: [
      { name: '기타1', logo: '📦', amount: '30,000원' },
      { name: '기타2', logo: '📦', amount: '25,000원' },
      { name: '기타3', logo: '📦', amount: '20,000원' },
      { name: '기타4', logo: '📦', amount: '15,000원' },
      { name: '기타5', logo: '📦', amount: '10,000원' },
    ],
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate(-1);
    }
  };

  const selectedCategoryData = selectedCategory ? categories.find(cat => cat.id === selectedCategory) : null;
  const selectedMerchants = selectedCategory ? merchantData[selectedCategory] : [];

  return (
    <DefaultDiv>
      <Header
        title={selectedCategory ? `${selectedCategoryData?.name} TOP 5` : "소비 카테고리"}
        showBack={true}
        showClose={false}
        onBack={handleBack}
      />

      <div className="flex overflow-hidden flex-col h-screen">
        {!selectedCategory ? (
          // 카테고리 선택 화면
            <div className="flex-1 px-6 pt-32">
            <div className="mb-12 text-center">
              <h2 className="text-[1.8rem] font-semibold text-gray-700 mb-2">
                두리님의 한 달 소비를
              </h2>
              <p className="text-[1.8rem] font-semibold text-gray-700">
                카테고리별로 정리했어요
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm transition-shadow cursor-pointer hover:shadow-md"
                >
                  <div className="flex justify-center items-center mb-3 w-16 h-16">
                    <img 
                      src={category.icon} 
                      alt={category.name} 
                      className={`${category.id === 'etc' ? 'w-8 h-2' : 'w-8 h-8'}`} 
                    />
                  </div>
                  <span className="text-[1.1rem] font-medium text-gray-700 text-center">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ) : (
          // 가맹점 TOP 5 화면 (비눗방울과 공룡)
          <div className="relative h-full">
            {/* 비눗방울들 */}
            <div className="absolute inset-0">
              {selectedMerchants.map((merchant, index) => {
                const sizes = ['w-[22rem] h-[22rem]', 'w-[18rem] h-[18rem]', 'w-[15rem] h-[15rem]', 'w-[12rem] h-[12rem]', 'w-[8rem] h-[8rem]'];
                const positions = [
                  { left: '-5%', top: '7%' },
                  { left: '47%', top: '7%' },
                  { left: '50%', top: '26%' },
                  { left: '17%', top: '32%' },
                  { left: '44%', top: '42%' }
                ];
                const randomSize = sizes[index % sizes.length];
                const position = positions[index % positions.length];
                
                return (
                  <div
                    key={index}
                    className="absolute animate-float"
                    style={{
                      left: position.left,
                      top: position.top,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    <div 
                      className={`relative bg-center bg-no-repeat bg-cover ${randomSize}`}
                      style={{
                        backgroundImage: `url(${bubbleImg})`
                      }}
                    >
                      <div className="flex absolute inset-0 justify-center items-center">
                        {typeof merchant.logo === 'string' ? (
                          <div className="text-5xl">{merchant.logo}</div>
                        ) : (
                          <img 
                            src={merchant.logo} 
                            alt={merchant.name} 
                            className="object-contain w-40 h-40" 
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 공룡 캐릭터 */}
            <div className="fixed right-8 bottom-8 z-10">
              <div className="relative">
                <img
                  src={dooriBubbleImg}
                  alt="두리"
                  className="object-contain w-64 h-64"
                />
                {/* 장식용 비눗방울들 */}
                <div className="absolute -top-0 -left-0 w-[1.7rem] h-[1.7rem]">
                  <img src={bubbleImg} alt="비눗방울" className="object-contain w-full h-full" />
                </div>
                <div className="absolute -top-10 -left-8 w-[2.3rem] h-[2.3rem]">
                  <img src={bubbleImg} alt="비눗방울" className="object-contain w-full h-full" />
                </div>
                <div className="absolute -top-24 -left-4 w-[3.3rem] h-[3.3rem]">
                  <img src={bubbleImg} alt="비눗방울" className="object-contain w-full h-full" />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </DefaultDiv>
  );
};

export default CategoryTop5View;
