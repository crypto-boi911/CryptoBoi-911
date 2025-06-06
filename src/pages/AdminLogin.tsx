
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Admin login error:', error);
        if (error.message.includes('Invalid login credentials')) {
          setError("Invalid admin credentials. Please check your email and password.");
        } else if (error.message.includes('Email not confirmed')) {
          setError("Please check your email and click the confirmation link before logging in.");
        } else {
          setError(error.message || "Login failed");
        }
        setIsLoading(false);
        return;
      }

      // Check if user has admin role after successful login
      // This will be handled by the useEffect above
      
    } catch (error) {
      console.error('Admin login error:', error);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cyber-gradient">
      <Card className="w-full max-w-md bg-cyber-darker/90 border-cyber-blue/20">
        <CardHeader>
          <div className="flex items-center mb-4">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-cyber-light hover:text-cyber-blue mr-4 p-2"
              disabled={isLoading}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-cyber-blue" />
              </div>
              <CardTitle className="text-2xl font-cyber text-cyber-blue">
                Admin Portal
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyber-light">
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="bg-cyber-gray/50 border-cyber-blue/30 text-cyber-light"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-cyber-light">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-cyber-gray/50 border-cyber-blue/30 text-cyber-light"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-cyber-light/60">
                Only administrators can access this portal
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-dark"></div>
                  Authenticating...
                </div>
              ) : (
                'Access Admin Dashboard'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-cyber-light/70 text-sm">
              Regular user?{" "}
              <Button
                onClick={() => navigate('/login')}
                variant="link"
                className="text-cyber-blue hover:text-cyber-blue/80 p-0 h-auto font-medium"
                disabled={isLoading}
              >
                Login here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
