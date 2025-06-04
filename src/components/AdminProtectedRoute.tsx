
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  const adminToken = localStorage.getItem('adminToken');
  const expectedToken = import.meta.env.VITE_ADMIN_TOKEN || 'admin-token-2024';
  
  console.log('AdminProtectedRoute check:', {
    isAdminAuthenticated,
    adminToken,
    expectedToken,
    tokenMatch: adminToken === expectedToken
  });
  
  if (!isAdminAuthenticated || adminToken !== expectedToken) {
    console.log('Admin access denied, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log('Admin access granted');
  return <>{children}</>;
};

export default AdminProtectedRoute;
