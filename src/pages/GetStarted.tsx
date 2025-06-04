
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function GetStarted() {
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const generateAccessKey = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (let i = 0; i < 14; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || email.trim().length < 3) {
      toast({
        title: "Error",
        description: "Please enter a valid username (at least 3 characters).",
        variant: "destructive"
      });
      return;
    }

    const key = generateAccessKey();
    setAccessKey(key);
    setSubmitted(true);
    
    toast({
      title: "Access Key Generated",
      description: "Your 14-character access key has been created successfully!",
    });
    
    // Optionally: Save user username and key to database here
    console.log("Generated access key for:", email, "Key:", key);
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
        <h1 className="text-3xl font-cyber font-bold text-cyber-blue mb-6">Get Started</h1>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="text-cyber-light/70 font-tech">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your username"
              className="p-3 rounded-md bg-cyber-gray/50 border border-cyber-blue/20 text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-cyber-blue transition-all"
            />
            <button
              type="submit"
              className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech font-semibold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              Generate Access Key
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-green-400 font-tech font-medium">
              Welcome! Your digital access key is:
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
            <p className="text-sm text-cyber-light/60 font-tech">
              Please save this key securely. It will be used as your login credential.
            </p>
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
