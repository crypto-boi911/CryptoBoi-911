
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SetAdminRole = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSetAdminRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate setting admin role (in a real app, this would call an API)
    setTimeout(() => {
      toast({
        title: "Admin Role Set",
        description: `User ${userId} has been granted admin privileges`,
      });
      setUserId("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-cyber-darker border border-cyber-blue/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-cyber-blue mb-4">Set Admin Role</h3>
      <form onSubmit={handleSetAdminRole} className="space-y-4">
        <div>
          <Label htmlFor="userId" className="text-cyber-light">User ID</Label>
          <Input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID to grant admin role"
            className="bg-cyber-gray border-cyber-blue/30 text-cyber-light"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
        >
          {isLoading ? "Setting Role..." : "Grant Admin Role"}
        </Button>
      </form>
    </div>
  );
};

export default SetAdminRole;
