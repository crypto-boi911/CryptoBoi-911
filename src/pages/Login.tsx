
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessKey || accessKey.length < 8) {
      setError("Please enter a valid access key.");
      return;
    }

    if (!username || username.trim().length < 3) {
      setError("Please enter a valid username.");
      return;
    }

    setError("");
    setIsLoading(true);
    
    try {
      const { error } = await signIn(username, accessKey);
      
      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('Invalid login credentials')) {
          setError("Invalid username or access key. Please check your credentials.");
        } else {
          setError(error.message || "Login failed");
        }
        setIsLoading(false);
        return;
      }

      toast({
        title: "Access Granted",
        description: `Welcome back, ${username}! Redirecting to dashboard...`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
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
          <h2 className="text-2xl font-bold text-cyber-blue flex-1 text-center">Login with Access Key</h2>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-cyber-light">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-cyber-gray border border-cyber-blue/30 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-cyber-light">Access Key</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-cyber-gray border border-cyber-blue/30 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Enter your access key"
              disabled={isLoading}
              required
            />
            <p className="text-xs text-cyber-light/60 mt-1">
              This is the secure key generated during signup
            </p>
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
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-dark"></div>
                Logging in...
              </div>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

        <p className="text-cyber-light/70 text-sm text-center mt-4">
          Don't have an access key yet?{" "}
          <button
            onClick={() => navigate('/get-started')}
            className="text-cyber-blue hover:text-cyber-blue/80 underline font-medium"
            disabled={isLoading}
          >
            Generate one here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
