import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Label } from '@/components/admin/ui/label';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 이메일에서 username 추출 (admin@example.com -> admin)
    const username = formData.email.split('@')[0];
    const success = await login(username, formData.password);
    setIsLoading(false);

    if (success) {
      navigate('/admin');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="email" className="text-sm font-medium text-white">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-[#1a1a1a] border-[#2a2a2a] text-white h-11 placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="password" className="text-sm font-medium text-white">
          비밀번호
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="bg-[#1a1a1a] border-[#2a2a2a] text-white pr-10 h-11 placeholder:text-gray-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input
          type="checkbox"
          id="remember"
          className="w-4 h-4 rounded border-[#2a2a2a] bg-[#1a1a1a] text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
        />
        <Label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
          로그인 상태 유지
        </Label>
      </div>

      {error && (
        <div className="text-red-400 text-sm text-center pt-2">{error}</div>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
        disabled={isLoading}
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#2a2a2a]"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#0a0a0a] px-2 text-gray-500">또는 다음으로 계속</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="border-[#2a2a2a] hover:bg-[#1a1a1a] bg-transparent text-white"
          onClick={(e) => e.preventDefault()}
        >
          <img
            src="https://icon2.cleanpng.com/20180817/vog/8968d0640f2c4053333ce7334314ef83.webp"
            alt="AWS"
            className="w-5 h-5 mr-2 rounded-md"
          />
          AWS 계정으로 로그인
        </Button>
      </div>
    </form>
  );
}

