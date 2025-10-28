import React from 'react';

interface Notification {
  id: number;
  type: 'warning' | 'alert' | 'report';
  icon: string;
  mainMessage: string;
  subMessage: string;
  date: string;
  isNew?: boolean;
}

const NotificationItem: React.FC<{ notification: Notification; onDelete: (id: number) => void }> = ({ notification, onDelete }) => {
  const [translateX, setTranslateX] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  
  const deleteButtonWidth = 80;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const currentX = e.targetTouches[0].clientX;
    const diff = touchStart - currentX;
    
    if (diff > 0) {
      // 왼쪽으로 드래그
      const newTranslateX = Math.min(diff, deleteButtonWidth);
      setTranslateX(newTranslateX);
    } else {
      // 오른쪽으로 드래그
      setTranslateX(0);
    }
  };

  const onTouchEnd = () => {
    if (touchStart === null) return;
    
    const finalTranslate = translateX;
    if (finalTranslate > deleteButtonWidth / 2) {
      // 절반 이상 드래그했으면 완전히 열림
      setTranslateX(deleteButtonWidth);
    } else {
      // 절반 이하면 닫음
      setTranslateX(0);
    }
    
    setTouchStart(null);
  };

  const handleDelete = () => {
    onDelete(notification.id);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-600">
      {/* 전체 컨텐츠 래퍼 */}
      <div
        className="relative flex transition-transform"
        style={{ transform: `translateX(-${translateX}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* 알림 컨텐츠 */}
        <div
          className={`flex-shrink-0 p-4 ${
            notification.isNew ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-700'
          }`}
          style={{ width: '100%' }}
        >
          <div className="flex gap-4">
            {/* 아이콘 */}
            <div className="flex-shrink-0">
              <img
                src={notification.icon}
                alt="Doori"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* 텍스트 */}
            <div className="flex-1 min-w-0">
              <p className="text-[1.125rem] font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {notification.mainMessage}
              </p>
              <p className="text-[0.875rem] text-gray-600 dark:text-gray-400 mb-2">
                {notification.subMessage}
              </p>
              <p className="text-[0.75rem] text-gray-400 dark:text-gray-500 text-right">
                {notification.date}
              </p>
            </div>
          </div>
        </div>

        {/* 삭제 버튼 */}
        <div 
          className="flex-shrink-0 flex items-center justify-center bg-red-500"
          style={{ width: `${deleteButtonWidth}px` }}
        >
          <button
            onClick={handleDelete}
            className="text-white"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
