
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return;
    }
    
    setIsLoading(true);
    const { error } = await signUp(email, password, username);
    
    if (!error) {
      navigate('/login');
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
              <CardTitle className="text-2xl font-cyber text-cyber-blue">Create Account</CardTitle>
              <CardDescription className="text-cyber-light/70">
                Join SecureVault today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-cyber-light">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-cyber-light/50" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                </div>
                
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
                  <Label htmlFor="password" className="text-cyber-light">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyber-light/50" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-cyber-light">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyber-light/50" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  {password !== confirmPassword && confirmPassword && (
                    <p className="text-red-400 text-sm">Passwords do not match</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading || password !== confirmPassword}
                  className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-cyber-light/70">
                  Already have an account?{' '}
                  <Link to="/login" className="text-cyber-blue hover:text-cyber-blue/80">
                    Sign in
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

export default Signup;
