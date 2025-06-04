
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ProductsTable from "./pages/ProductsTable";
import Dashboard from "./pages/Dashboard";
import BankLogs from "./pages/BankLogs";
import CardsLinkables from "./pages/CardsLinkables";
import PayPalLogs from "./pages/PayPalLogs";
import CashAppLogs from "./pages/CashAppLogs";
import Tools from "./pages/Tools";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminContent from "./pages/AdminContent";
import AdminLogs from "./pages/AdminLogs";
import AdminMessages from "./pages/AdminMessages";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-cyber-dark">
          <Routes>
            {/* Routes without Navbar/Footer */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/bank-logs" element={
              <ProtectedRoute>
                <BankLogs />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/cards" element={
              <ProtectedRoute>
                <CardsLinkables />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/paypal" element={
              <ProtectedRoute>
                <PayPalLogs />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/cashapp" element={
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
            <Route path="/dashboard/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/support" element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
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
            <Route path="/admin/content" element={
              <AdminProtectedRoute>
                <AdminContent />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/logs" element={
              <AdminProtectedRoute>
                <AdminLogs />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <AdminProtectedRoute>
                <AdminMessages />
              </AdminProtectedRoute>
            } />
            
            {/* Routes with Navbar/Footer */}
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/products-table" element={
                    <ProtectedRoute>
                      <ProductsTable />
                    </ProtectedRoute>
                  } />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
