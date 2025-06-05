
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
      const adminSession = localStorage.getItem('adminSession');
      
      console.log('AdminProtectedRoute check:', {
        isAdminAuthenticated,
        adminToken,
        expectedToken,
        tokenMatch: adminToken === expectedToken,
        hasSession: !!adminSession
      });
      
      const authorized = isAdminAuthenticated && adminToken === expectedToken;
      
      // Update admin session with current timestamp
      if (authorized) {
        localStorage.setItem('adminSession', JSON.stringify({
          loginTime: new Date().toISOString(),
          lastActivity: new Date().toISOString()
        }));
      }
      
      setIsAuthorized(authorized);
      setIsChecking(false);

      if (!authorized) {
        console.log('Admin access denied, will redirect to login');
        // Clear any partial admin data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('adminSession');
      } else {
        console.log('Admin access granted');
      }
    };

    checkAuth();

    // Check auth state every 30 seconds for security
    const interval = setInterval(checkAuth, 30000);
    return () => clearInterval(interval);
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
