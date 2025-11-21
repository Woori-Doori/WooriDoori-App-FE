import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute;

