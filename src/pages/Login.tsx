
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

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
    
    // Find the username associated with this access key
    const registrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
    const user = registrations.find((reg: any) => reg.accessKey === accessKey);
    const username = user ? user.username : `User_${accessKey.slice(0, 6)}`;
    
    // Update last login time for this user
    if (user) {
      user.lastLogin = new Date().toISOString();
      localStorage.setItem('userRegistrations', JSON.stringify(registrations));
    }
    
    // Store login credential
    const loginCredential = {
      username: username,
      accessCode: accessKey,
      timestamp: new Date().toISOString()
    };
    
    const existingCredentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
    existingCredentials.push(loginCredential);
    localStorage.setItem('userCredentials', JSON.stringify(existingCredentials));
    
    localStorage.setItem('isAuthenticated', 'true');
    toast({
      title: "Access Granted",
      description: `Welcome ${username}! Redirecting to dashboard...`,
    });
    
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate('/get-started');
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
          <h2 className="text-2xl font-bold text-cyber-blue flex-1 text-center">Login with Access Key</h2>
        </div>
        
        <div className="mb-6 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
          <p className="text-cyber-light text-sm text-center">
            Don't have an access key yet?{" "}
            <button
              onClick={() => navigate('/get-started')}
              className="text-cyber-blue hover:text-cyber-blue/80 underline font-medium"
            >
              Generate one here
            </button>
          </p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-cyber-light">Access Key</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-cyber-gray border border-cyber-blue/30 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Enter your 14-char access key"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-semibold rounded transition duration-200"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
