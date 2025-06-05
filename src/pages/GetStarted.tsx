
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function GetStarted() {
  const [username, setUsername] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const generateAccessKey = () => {
    // Generate a strong access key that meets Supabase requirements
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*";
    
    let key = "";
    
    // Ensure at least one character from each required category
    key += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    key += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    key += numbers.charAt(Math.floor(Math.random() * numbers.length));
    key += special.charAt(Math.floor(Math.random() * special.length));
    
    // Fill the rest with random characters from all categories
    const allChars = lowercase + uppercase + numbers + special;
    for (let i = 4; i < 16; i++) {
      key += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    // Shuffle the key to randomize the order
    return key.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    const key = generateAccessKey();
    
    try {
      // Sign up with username stored in user_metadata
      const { error } = await signUp(username, key);
      
      if (error) {
        console.error('Signup error:', error);
        
        if (error.message.includes('User already registered') || error.message.includes('already been registered')) {
          toast({
            title: "Error",
            description: "Username already exists. Please choose a different one.",
            variant: "destructive"
          });
        } else if (error.message.includes('invalid format')) {
          toast({
            title: "Error", 
            description: "Please try a different username format.",
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

      setAccessKey(key);
      setSubmitted(true);
      
      toast({
        title: "Success!",
        description: "Your account has been created successfully with username stored in Supabase.",
      });
      
      console.log("Account created for:", username, "with access key generated and stored in Supabase Auth");
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessKey);
    toast({
      title: "Copied!",
      description: "Access key copied to clipboard.",
    });
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
        
        <h1 className="text-3xl font-cyber font-bold text-cyber-blue mb-6">Get Started</h1>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="text-cyber-light/70 font-tech">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="p-3 rounded-md bg-cyber-gray/50 border border-cyber-blue/20 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-all"
              disabled={isLoading}
              maxLength={20}
              pattern="[a-zA-Z0-9_-]+"
              title="Username can only contain letters, numbers, underscores, and hyphens"
            />
            <p className="text-sm text-cyber-light/60 font-tech">
              Choose a unique username (3-20 characters, letters, numbers, _, -)
            </p>
            <p className="text-xs text-cyber-light/50 font-tech">
              ℹ️ Username will be stored in Supabase user metadata with role 'user'
            </p>
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
                'Generate Access Key'
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-green-400 font-tech font-medium">
              Welcome <span className="text-cyber-blue">{username}</span>! Your secure access key is:
            </p>
            <div className="bg-cyber-gray/30 border border-cyber-blue/20 p-4 rounded-md">
              <div className="text-lg font-mono text-cyber-blue break-words mb-3">
                {accessKey}
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue text-sm font-tech py-2 px-4 rounded-md transition-all border border-cyber-blue/30"
              >
                Copy to Clipboard
              </button>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-md">
              <p className="text-sm text-amber-300 font-tech">
                ⚠️ <strong>Important:</strong> Save this access key securely. You'll need it to log in, and it cannot be recovered if lost.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-md">
              <p className="text-sm text-green-300 font-tech">
                ✅ <strong>Account Created:</strong> Username and role stored in Supabase Auth metadata. Session will persist automatically.
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
              Already have an access key?{" "}
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
