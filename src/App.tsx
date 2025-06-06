

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { useEffect } from "react";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PremiumBankLogs from "./pages/PremiumBankLogs";
import CCLinkable from "./pages/CCLinkable";
import PayPalLogs from "./pages/PayPalLogs";
import CashAppLogs from "./pages/CashAppLogs";
import Tools from "./pages/Tools";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Tickets from "./pages/Tickets";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminTickets from "./pages/AdminTickets";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";

const queryClient = new QueryClient();

// Smart redirect component for authenticated users
const AuthRedirect = () => {
  const { user, profile, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // Redirect admin users to admin dashboard
  if (profile?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  // For regular users, redirect to user dashboard
  return <Navigate to="/dashboard" replace />;
};

// Email confirmation success component
const EmailConfirmed = () => {
  const { user, profile, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && user) {
      const timer = setTimeout(() => {
        if (profile?.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, profile, isLoading]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Verifying email...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Show success message and redirect based on role
  return (
    <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-cyber text-cyber-blue">Email verified!</h1>
        <p className="text-cyber-light">Redirecting you to your dashboard...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-blue mx-auto"></div>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-cyber-dark">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Email confirmation route */}
              <Route path="/email-confirmed" element={<EmailConfirmed />} />
              
              {/* Protected user routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/premium-banklogs" element={
                <ProtectedRoute>
                  <PremiumBankLogs />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/cc-linkable" element={
                <ProtectedRoute>
                  <CCLinkable />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/paypal-logs" element={
                <ProtectedRoute>
                  <PayPalLogs />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/cashapp-logs" element={
                <ProtectedRoute>
                  <CashAppLogs />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/tools" element={
                <ProtectedRoute>
                  <Tools />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/orders" element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/tickets" element={
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <AdminProtectedRoute>
                  <AdminUsers />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <AdminProtectedRoute>
                  <AdminProducts />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <AdminProtectedRoute>
                  <AdminOrders />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/tickets" element={
                <AdminProtectedRoute>
                  <AdminTickets />
                </AdminProtectedRoute>
              } />
              
              {/* Fallback routes */}
              <Route path="/auth-redirect" element={<AuthRedirect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

