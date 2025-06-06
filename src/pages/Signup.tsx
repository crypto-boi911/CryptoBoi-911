
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signUp(email, password, username);
    
    if (!error) {
      navigate("/login");
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
            <CardTitle className="text-2xl font-cyber text-cyber-blue">
              Sign Up
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-cyber-light">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="bg-cyber-gray/50 border-cyber-blue/30 text-cyber-light"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyber-light">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                placeholder="Create a password"
                className="bg-cyber-gray/50 border-cyber-blue/30 text-cyber-light"
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-cyber-light/70 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyber-blue hover:text-cyber-blue/80 underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
