
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  const adminToken = localStorage.getItem('adminToken');
  const expectedToken = import.meta.env.VITE_ADMIN_TOKEN || 'admin-token-2024';
  
  if (!isAdminAuthenticated || adminToken !== expectedToken) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtectedRoute;
