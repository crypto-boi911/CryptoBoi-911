
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
        return;
      }

      // Redirect will happen automatically through auth context
      navigate('/admin');
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
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
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
            >
              {isLoading ? "Signing In..." : "Access Admin Dashboard"}
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
