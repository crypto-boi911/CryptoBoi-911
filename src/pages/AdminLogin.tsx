
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Admin login attempt with password:', password);

    // Check against environment variables
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    const adminToken = import.meta.env.VITE_ADMIN_TOKEN || 'admin-token-2024';

    console.log('Expected admin password:', adminPassword);
    console.log('Expected admin token:', adminToken);

    if (password === adminPassword) {
      console.log('Password match - setting localStorage items');
      localStorage.setItem('adminToken', adminToken);
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      console.log('localStorage items set:', {
        adminToken: localStorage.getItem('adminToken'),
        isAdminAuthenticated: localStorage.getItem('isAdminAuthenticated')
      });

      toast({
        title: "Access Granted",
        description: "Welcome to the admin dashboard",
      });
      
      console.log('Navigating to admin dashboard');
      navigate('/admin/dashboard');
    } else {
      console.log('Password mismatch');
      toast({
        title: "Access Denied",
        description: "Invalid admin password",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cyber-gradient flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <UserCheck className="h-12 w-12 text-cyber-blue" />
            </div>
            <CardTitle className="text-2xl font-cyber text-cyber-light">
              Admin Access
            </CardTitle>
            <CardDescription className="text-cyber-light/70">
              Enter admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-cyber-light text-sm font-medium">
                  Admin Password
                </Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full h-12 bg-cyber-darker/80 border-cyber-blue/30 text-cyber-light pr-12 placeholder:text-cyber-light/50 focus:border-cyber-blue focus:ring-cyber-blue/20"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent text-cyber-light/70 hover:text-cyber-light"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech font-semibold text-base"
                disabled={!password || isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
            </form>

            <div className="text-center text-sm text-yellow-500">
              <p>Default password: admin123</p>
              <p>Admin access required for dashboard management</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
