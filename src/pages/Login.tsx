
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("Login temporarily disabled for rebuild");
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
            disabled={isLoading}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold text-cyber-blue flex-1 text-center">Login</h2>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-cyber-light">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-cyber-gray border border-cyber-blue/30 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
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
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-semibold rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-cyber-light/70 text-sm text-center mt-4">
          Don't have an account yet?{" "}
          <button
            onClick={() => navigate('/get-started')}
            className="text-cyber-blue hover:text-cyber-blue/80 underline font-medium"
            disabled={isLoading}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
