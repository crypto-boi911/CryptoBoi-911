
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  // Temporarily disable admin protection for rebuild
  return <>{children}</>;
};

export default AdminProtectedRoute;
