
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import UserProtectedRoute from "./components/UserProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-cyber-dark">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected user routes */}
                <Route path="/dashboard" element={
                  <UserProtectedRoute>
                    <Dashboard />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/premium-banklogs" element={
                  <UserProtectedRoute>
                    <PremiumBankLogs />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/cc-linkable" element={
                  <UserProtectedRoute>
                    <CCLinkable />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/paypal-logs" element={
                  <UserProtectedRoute>
                    <PayPalLogs />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/cashapp-logs" element={
                  <UserProtectedRoute>
                    <CashAppLogs />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/tools" element={
                  <UserProtectedRoute>
                    <Tools />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/cart" element={
                  <UserProtectedRoute>
                    <Cart />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/checkout" element={
                  <UserProtectedRoute>
                    <Checkout />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/orders" element={
                  <UserProtectedRoute>
                    <OrderHistory />
                  </UserProtectedRoute>
                } />
                <Route path="/dashboard/tickets" element={
                  <UserProtectedRoute>
                    <Tickets />
                  </UserProtectedRoute>
                } />
                
                {/* Fallback routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
