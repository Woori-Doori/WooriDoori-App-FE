import { LoginForm } from '@/components/admin/auth/LoginForm';
import { useEffect } from 'react';

const AdminLoginView = () => {
  useEffect(() => {
    // admin 로그인 페이지 진입 시 다크 모드 강제 활성화
    document.documentElement.classList.add('dark');
    return () => {
      // 페이지를 떠날 때는 원래 상태로 복원하지 않음 (다른 페이지에서도 다크 모드 유지)
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-3 text-center">WOORI DOORI</h1>
        <p className="text-gray-400 text-center mb-10">관리자 로그인</p>
        
        <div className="bg-[#0a0a0a] rounded-lg p-10 shadow-xl border border-[#1a1a1a]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginView;
