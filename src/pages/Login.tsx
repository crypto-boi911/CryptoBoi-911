import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const generatePassword = () => {
    const password = Math.random().toString().slice(2, 14);
    setGeneratedPassword(password);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && enteredPassword === generatedPassword && generatedPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/products-table');
    }
  };

  return (
    <div className="min-h-screen bg-cyber-gradient flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-cyber-blue" />
            </div>
            <CardTitle className="text-2xl font-cyber text-cyber-light">
              CRYPTOBOI-911 Access
            </CardTitle>
            <CardDescription className="text-cyber-light/70">
              Generate and use your 12-digit access code
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-cyber-light">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-cyber-darker border-cyber-blue/30 text-cyber-light"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-cyber-light">Generate Access Code</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={generatedPassword}
                    readOnly
                    placeholder="Click generate to create code"
                    className="bg-cyber-darker border-cyber-blue/30 text-cyber-light font-mono"
                  />
                  <Button
                    type="button"
                    onClick={generatePassword}
                    variant="outline"
                    size="icon"
                    className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {generatedPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-cyber-light">Enter Access Code</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={enteredPassword}
                      onChange={(e) => setEnteredPassword(e.target.value)}
                      placeholder="Enter the generated code"
                      className="bg-cyber-darker border-cyber-blue/30 text-cyber-light font-mono pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-cyber-light/70"
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
              )}

              <Button
                type="submit"
                className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
                disabled={!username || !generatedPassword || !enteredPassword}
              >
                Access Products
              </Button>
            </form>

            <div className="text-center text-sm text-cyber-light/60">
              <p>Generate a 12-digit code and enter it to access premium products</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
