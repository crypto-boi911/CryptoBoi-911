
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function GetStarted() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (!password || password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (!username || username.trim().length < 3) {
      toast({
        title: "Error",
        description: "Please enter a valid username (at least 3 characters).",
        variant: "destructive"
      });
      return;
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      toast({
        title: "Error",
        description: "Username can only contain letters, numbers, underscores, and hyphens.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(email, password, username);
      
      if (error) {
        console.error('Signup error:', error);
        
        if (error.message.includes('User already registered') || error.message.includes('already been registered')) {
          toast({
            title: "Error",
            description: "An account with this email already exists. Please use a different email or try logging in.",
            variant: "destructive"
          });
        } else if (error.message.includes('invalid format')) {
          toast({
            title: "Error", 
            description: "Please check your email format and try again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: error.message || "Failed to create account",
            variant: "destructive"
          });
        }
        setIsLoading(false);
        return;
      }

      setSubmitted(true);
      
      console.log("Account created for:", email, "with username:", username);
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-gradient">
      <div className="bg-cyber-darker/90 border border-cyber-blue/20 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-cyber-blue hover:text-cyber-blue/80 transition-colors flex items-center gap-2"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-tech">Back</span>
          </button>
        </div>
        
        <h1 className="text-3xl font-cyber font-bold text-cyber-blue mb-6">Sign Up</h1>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="text-cyber-light/70 font-tech">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-cyber-gray/50 border border-cyber-blue/20 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-cyber-light/70 font-tech">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Choose a username"
                className="w-full p-3 rounded-md bg-cyber-gray/50 border border-cyber-blue/20 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-all"
                disabled={isLoading}
                maxLength={20}
                pattern="[a-zA-Z0-9_-]+"
                title="Username can only contain letters, numbers, underscores, and hyphens"
              />
              <p className="text-sm text-cyber-light/60 font-tech mt-1">
                3-20 characters, letters, numbers, _, - only
              </p>
            </div>

            <div>
              <label className="text-cyber-light/70 font-tech">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password"
                className="w-full p-3 rounded-md bg-cyber-gray/50 border border-cyber-blue/20 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-all"
                disabled={isLoading}
                minLength={6}
              />
              <p className="text-sm text-cyber-light/60 font-tech mt-1">
                At least 6 characters
              </p>
            </div>

            <div>
              <label className="text-cyber-light/70 font-tech">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="w-full p-3 rounded-md bg-cyber-gray/50 border border-cyber-blue/20 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-all"
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-dark"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-md">
              <p className="text-green-300 font-tech font-medium">
                ✅ <strong>Account Created Successfully!</strong>
              </p>
              <p className="text-sm text-green-300/80 font-tech mt-2">
                Please check your email and click the confirmation link to activate your account.
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/login"
                className="block w-full text-center bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech font-semibold py-3 px-4 rounded-md transition-all duration-200"
              >
                Go to Login
              </Link>
            </div>
          </div>
        )}
        
        {!submitted && (
          <div className="mt-6 text-center">
            <p className="text-cyber-light/60 text-sm font-tech">
              Already have an account?{" "}
              <Link to="/login" className="text-cyber-blue hover:text-cyber-blue/80 transition-colors">
                Login here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
