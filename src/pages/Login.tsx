
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (accessKey.length !== 14) {
      setError("Access key must be exactly 14 characters.");
      return;
    }

    setError("");
    localStorage.setItem('isAuthenticated', 'true');
    toast({
      title: "Access Granted",
      description: `Welcome! Redirecting to dashboard...`,
    });
    // Redirect to dashboard instead of alert
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Login with Access Key</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-300">Access Key</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Enter your 14-char access key"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded transition duration-200"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
