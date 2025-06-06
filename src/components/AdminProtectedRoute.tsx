
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, getUserRole } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-light flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-blue"></div>
          Checking admin authorization...
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role in user_metadata
  const userRole = getUserRole();
  if (userRole !== 'admin') {
    // Redirect non-admin users to their dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtectedRoute;
