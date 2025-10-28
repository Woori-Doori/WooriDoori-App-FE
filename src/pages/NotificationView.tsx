import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultDiv from '@/components/default/DefaultDiv';
import NavBar from '@/components/default/NavBar';
import NotificationItem from '@/components/noti/Notification';
import { img } from '@/assets/img';

interface Notification {
  id: number;
  type: 'warning' | 'alert' | 'report';
  icon: string;
  mainMessage: string;
  subMessage: string;
  date: string;
  isNew?: boolean;
}

const NotificationView: React.FC = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      type: 'warning',
      icon: img.doori_face3,
      mainMessage: '두리에게 변화가 생겼어요 👀',
      subMessage: '목표 금액의 50%를 초과했습니다. 소비에 유의해주세요.',
      date: '10월 1일',
      isNew: true
    },
    {
      id: 2,
      type: 'warning',
      icon: img.doori_face3,
      mainMessage: '두리에게 변화가 생겼어요 👀',
      subMessage: '목표 금액의 75%를 초과했습니다. 소비 계획을 다시 확인해주세요.',
      date: '10월 1일',
      isNew: true
    },
    {
      id: 3,
      type: 'alert',
      icon: img.doori_angry,
      mainMessage: '두리가 화났어요!!',
      subMessage: '목표 금액의 100%를 달성했습니다. 더이상의 소비를 지양해주세요.',
      date: '10월 1일',
      isNew: true
    },
    {
      id: 4,
      type: 'alert',
      icon: img.doori_annoyed,
      mainMessage: '저희는 더이상 두리를 말릴 수 없습니다.',
      subMessage: '목표 금액의 100%를 초과했습니다. 두리가 당신에게 실망했습니다.',
      date: '10월 1일'
    },
    {
      id: 5,
      type: 'report',
      icon: img.doori_report,
      mainMessage: '두리가 6월 소비 리포트를 가져왔습니다.',
      subMessage: '한 달간 소비 내역을 확인하세요.',
      date: '10월 1일'
    }
  ]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const newNotificationsCount = notifications.filter(n => n.isNew).length;

  return (
    <>
      <DefaultDiv isPadding={false}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 sticky top-0 z-10">
          <button onClick={handleBackClick} className="text-2xl cursor-pointer">
            ←
          </button>
          <h1 className="text-3xl font-bold dark:text-white">알림</h1>
          <div className="flex items-center gap-3">
            {notificationsEnabled ? (
              <button onClick={toggleNotifications} className="cursor-pointer">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            ) : (
              <button onClick={toggleNotifications} className="cursor-pointer">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 pb-24">
        {newNotificationsCount === 0 && notifications.length > 0 && (
          <div className="text-center py-8">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              새로운 알림이 없어요.
            </p>
          </div>
        )}

        {/* 알림 목록 */}
        {notifications.length > 0 && (
          <div className="space-y-4 p-6">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <img
              src={img.doori_normal}
              alt="Doori"
              className="w-24 h-24 object-contain mb-6"
            />
            <p className="text-xl text-gray-500 dark:text-gray-400 text-center">
              알림이 없습니다.
            </p>
          </div>
        )}
      </div>
      <NavBar />
      </DefaultDiv>
    </>
  );
};

export default NotificationView;

