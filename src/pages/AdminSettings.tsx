
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InsertTransaction from '@/components/InsertTransaction';
import TransactionList from '@/components/TransactionList';

const AdminSettings = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingEmail(true);

    // Simulate email change (in a real app, this would call an API)
    setTimeout(() => {
      toast({
        title: "Email Updated",
        description: `Email changed from ${currentEmail} to ${newEmail}`,
      });
      setCurrentEmail("");
      setNewEmail("");
      setIsChangingEmail(false);
    }, 1000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);

    // Simulate password change (in a real app, this would call an API)
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cyber-gradient">
      <div className="p-6">
        <h1 className="text-3xl font-cyber font-bold text-cyber-blue mb-8">Admin Settings</h1>
        
        <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Settings */}
          <div className="space-y-6">
            <h2 className="text-xl font-cyber font-semibold text-cyber-light mb-4">Account Settings</h2>
            
            {/* Change Email Form */}
            <div className="bg-cyber-darker border border-cyber-blue/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-cyber-blue mb-4">Change Email</h3>
              <form onSubmit={handleEmailChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentEmail" className="text-cyber-light">Current Email</Label>
                  <Input
                    id="currentEmail"
                    type="email"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    placeholder="Enter current email"
                    className="bg-cyber-gray border-cyber-blue/30 text-cyber-light"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newEmail" className="text-cyber-light">New Email</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter new email"
                    className="bg-cyber-gray border-cyber-blue/30 text-cyber-light"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isChangingEmail}
                  className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
                >
                  {isChangingEmail ? "Updating..." : "Change Email"}
                </Button>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="bg-cyber-darker border border-cyber-blue/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-cyber-blue mb-4">Change Password</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-cyber-light">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="bg-cyber-gray border-cyber-blue/30 text-cyber-light"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-cyber-light">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="bg-cyber-gray border-cyber-blue/30 text-cyber-light"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-cyber-light">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="bg-cyber-gray border-cyber-blue/30 text-cyber-light"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-full bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
                >
                  {isChangingPassword ? "Updating..." : "Change Password"}
                </Button>
              </form>
            </div>
          </div>

          {/* Transaction Management */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-cyber font-semibold text-cyber-light mb-4">Transaction Management</h2>
              <div className="bg-cyber-darker border border-cyber-blue/20 rounded-xl p-6">
                <InsertTransaction />
              </div>
            </div>
            
            <div className="bg-cyber-darker border border-cyber-blue/20 rounded-xl p-6">
              <TransactionList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
