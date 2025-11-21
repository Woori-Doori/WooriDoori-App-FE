import { useLocation } from 'react-router-dom';
import { CardManagement } from '@/components/admin/management/CardManagement';
import { UserManagement } from '@/components/admin/management/UserManagement';
import { BehaviorAnalysis } from '@/components/admin/management/BehaviorAnalysis';
import { DashboardContent } from '@/components/admin/dashboard/DashboardContent';

const AdminView = () => {
  const location = useLocation();

  const renderContent = () => {
    if (location.pathname.includes('/cards')) {
      return (
        <div className="w-full bg-white dark:bg-[#000000]">
          <div className="p-6">
            <CardManagement />
          </div>
        </div>
      );
    }
    if (location.pathname.includes('/users')) {
      return (
        <div className="w-full bg-white dark:bg-[#000000]">
          <div className="p-6">
            <UserManagement />
          </div>
        </div>
      );
    }
    if (location.pathname.includes('/behavior')) {
      return (
        <div className="w-full bg-white dark:bg-[#000000]">
          <div className="p-6">
            <BehaviorAnalysis />
          </div>
        </div>
      );
    }
    return (
      <div className="w-full bg-white dark:bg-[#000000]">
        <div className="p-6">
          <DashboardContent />
        </div>
      </div>
    );
  };

  return renderContent();
};

export default AdminView;

