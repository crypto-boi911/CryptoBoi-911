
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Dashboard redirect component
const DashboardRedirect = () => {
  const { user, profile, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-blue text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect admin users to admin panel
  if (profile?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  // For now, redirect regular users to products page since we don't have a dashboard yet
  return <Navigate to="/products" replace />;
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
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardRedirect />
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
                  <Orders />
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              
              {/* 404 route */}
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
