
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cyber-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-cyber-darker/80 border-cyber-blue/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-cyber-blue" />
              </div>
              <CardTitle className="text-2xl font-cyber text-cyber-blue">Welcome Back</CardTitle>
              <CardDescription className="text-cyber-light/70">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-cyber-light">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cyber-light/50" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-cyber-light">24-Digit Access Key</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyber-light/50" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
                      placeholder="Enter your 24-digit access key"
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-cyber-light/70">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-cyber-blue hover:text-cyber-blue/80">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center text-cyber-light/70 hover:text-cyber-blue">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
