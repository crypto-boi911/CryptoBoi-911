
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple hardcoded admin credentials for demo
    const adminEmail = "admin@example.com";
    const adminPassword = "password";

    if (email === adminEmail && password === adminPassword) {
      // Set admin authentication
      const adminToken = import.meta.env.VITE_ADMIN_TOKEN || 'admin-token-2024';
      localStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.setItem('adminToken', adminToken);
      localStorage.setItem('adminSession', JSON.stringify({
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        email: email
      }));

      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin panel!",
      });

      navigate('/admin/dashboard');
    } else {
      setError("Invalid email or password");
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cyber-dark">
      <div className="bg-cyber-darker border border-cyber-blue/20 rounded-xl p-8 w-full max-w-md shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-cyber-light hover:text-cyber-blue transition-colors duration-300 mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold text-cyber-blue flex-1 text-center">Admin Login</h2>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-cyber-light">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-cyber-gray border border-cyber-blue/30 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-cyber-light">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-cyber-gray border border-cyber-blue/30 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-semibold rounded transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Access Admin Panel'}
          </button>
        </form>

        <p className="text-cyber-light/70 text-sm text-center mt-4">
          Demo credentials: admin@example.com / password
        </p>
      </div>
    </div>
  );
}
