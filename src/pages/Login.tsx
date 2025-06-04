
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usedUsernames, setUsedUsernames] = useState<string[]>([]);
  const [usedCodes, setUsedCodes] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load used usernames and codes from localStorage on component mount
  useEffect(() => {
    const storedUsernames = localStorage.getItem('usedUsernames');
    const storedCodes = localStorage.getItem('usedCodes');
    
    if (storedUsernames) {
      setUsedUsernames(JSON.parse(storedUsernames));
    }
    if (storedCodes) {
      setUsedCodes(JSON.parse(storedCodes));
    }
  }, []);

  const generatePassword = () => {
    console.log('Generate password clicked');
    console.log('Username:', username);
    
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username first",
        variant: "destructive",
      });
      return;
    }

    if (usedUsernames.includes(username.trim())) {
      toast({
        title: "Username Already Used",
        description: "This username has already been used. Please choose a different username.",
        variant: "destructive",
      });
      return;
    }

    let newPassword;
    let attempts = 0;
    
    // Generate a unique code that hasn't been used before
    do {
      newPassword = Math.random().toString().slice(2, 14);
      attempts++;
      
      // Prevent infinite loop in case of exhaustion (very unlikely)
      if (attempts > 1000) {
        toast({
          title: "Error",
          description: "Unable to generate a unique code. Please try again later.",
          variant: "destructive",
        });
        return;
      }
    } while (usedCodes.includes(newPassword));

    console.log('Generated password:', newPassword);
    setGeneratedPassword(newPassword);
    
    toast({
      title: "Code Generated",
      description: "Your unique access code has been generated. Please enter it below.",
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted');
    console.log('Username:', username.trim());
    console.log('Generated password:', generatedPassword);
    console.log('Entered password:', enteredPassword);
    
    // Clear validation - check all required fields
    if (!username.trim()) {
      console.log('Username validation failed');
      toast({
        title: "Error",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    if (!generatedPassword) {
      console.log('Generated password validation failed');
      toast({
        title: "Error",
        description: "Please generate an access code first",
        variant: "destructive",
      });
      return;
    }

    if (!enteredPassword.trim()) {
      console.log('Entered password validation failed');
      toast({
        title: "Error",
        description: "Please enter the access code",
        variant: "destructive",
      });
      return;
    }

    // Check if entered password matches generated password
    if (enteredPassword.trim() !== generatedPassword) {
      console.log('Password mismatch:', enteredPassword.trim(), 'vs', generatedPassword);
      toast({
        title: "Access Denied",
        description: "The entered code does not match the generated code",
        variant: "destructive",
      });
      return;
    }

    console.log('All validations passed, proceeding with login');

    // Add username and code to used lists
    const newUsedUsernames = [...usedUsernames, username.trim()];
    const newUsedCodes = [...usedCodes, generatedPassword];
    
    setUsedUsernames(newUsedUsernames);
    setUsedCodes(newUsedCodes);
    
    // Store in localStorage
    localStorage.setItem('usedUsernames', JSON.stringify(newUsedUsernames));
    localStorage.setItem('usedCodes', JSON.stringify(newUsedCodes));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Save user credentials to admin dashboard
    const userCredential = {
      username: username.trim(),
      accessCode: generatedPassword,
      timestamp: new Date().toISOString()
    };
    
    const existingCredentials = localStorage.getItem('userCredentials');
    const credentials = existingCredentials ? JSON.parse(existingCredentials) : [];
    credentials.push(userCredential);
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    
    console.log('Authentication successful, user credentials saved');
    console.log('Stored credentials:', userCredential);
    
    toast({
      title: "Access Granted",
      description: "Welcome! Redirecting to products...",
    });
    
    // Navigate to products table
    console.log('Navigating to /products-table');
    navigate('/products-table');
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
              <Shield className="h-12 w-12 text-cyber-blue" />
            </div>
            <CardTitle className="text-2xl font-cyber text-cyber-light">
              CRYPTOBOI-911 Access
            </CardTitle>
            <CardDescription className="text-cyber-light/70">
              Generate and use your unique 12-digit access code
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-cyber-light text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full h-12 bg-cyber-darker/80 border-cyber-blue/30 text-cyber-light placeholder:text-cyber-light/50 focus:border-cyber-blue focus:ring-cyber-blue/20"
                />
                {usedUsernames.includes(username.trim()) && username.trim() && (
                  <p className="text-red-400 text-sm">This username has already been used</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-cyber-light text-sm font-medium">Generate Access Code</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={generatedPassword}
                    readOnly
                    placeholder="Click generate to create unique code"
                    className="flex-1 h-12 bg-cyber-darker/80 border-cyber-blue/30 text-cyber-light font-mono placeholder:text-cyber-light/50 focus:border-cyber-blue focus:ring-cyber-blue/20"
                  />
                  <Button
                    type="button"
                    onClick={generatePassword}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 hover:border-cyber-blue/50"
                    disabled={!username.trim() || usedUsernames.includes(username.trim())}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {generatedPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-cyber-light text-sm font-medium">
                    Enter Access Code
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={enteredPassword}
                      onChange={(e) => setEnteredPassword(e.target.value)}
                      placeholder="Enter the generated code"
                      className="w-full h-12 bg-cyber-darker/80 border-cyber-blue/30 text-cyber-light font-mono pr-12 placeholder:text-cyber-light/50 focus:border-cyber-blue focus:ring-cyber-blue/20"
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
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech font-semibold text-base"
                disabled={!username.trim() || !generatedPassword || !enteredPassword.trim() || usedUsernames.includes(username.trim())}
              >
                Access Products
              </Button>
            </form>

            <div className="text-center text-sm" style={{ color: 'gold' }}>
              <p>Use your username and Access code to access products. Each username can only be used once</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
