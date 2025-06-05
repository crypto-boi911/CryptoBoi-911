
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
      const adminToken = localStorage.getItem('adminToken');
      const expectedToken = import.meta.env.VITE_ADMIN_TOKEN || 'admin-token-2024';
      
      console.log('AdminProtectedRoute check:', {
        isAdminAuthenticated,
        adminToken,
        expectedToken,
        tokenMatch: adminToken === expectedToken
      });
      
      const authorized = isAdminAuthenticated && adminToken === expectedToken;
      setIsAuthorized(authorized);
      setIsChecking(false);

      if (!authorized) {
        console.log('Admin access denied, will redirect to login');
      } else {
        console.log('Admin access granted');
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-light">Checking authorization...</div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtectedRoute;
