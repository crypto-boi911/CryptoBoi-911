
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, UserCheck, UserX, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  username: string;
  role: string;
  created_at: string;
  email?: string;
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive"
        });
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        toast({
          title: "Error",
          description: "Failed to update user role",
          variant: "destructive"
        });
        return;
      }

      // Update the local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: "Success",
        description: `User role updated to ${newRole}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-gradient flex items-center justify-center">
        <div className="text-cyber-light">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue">
                  User Management
                </h1>
                <p className="text-xl text-cyber-light/70 mt-2">
                  Manage all registered users • Total: {users.length}
                </p>
              </div>
            </div>
          </div>

          {/* Users Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-cyber-blue">{users.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-cyber-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Admin Users</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {users.filter(user => user.role === 'admin').length}
                    </p>
                  </div>
                  <Crown className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Regular Users</p>
                    <p className="text-2xl font-bold text-green-400">
                      {users.filter(user => user.role === 'user').length}
                    </p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users List */}
          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardHeader>
              <CardTitle className="text-cyber-light font-tech">All Users</CardTitle>
              <CardDescription className="text-cyber-light/60">
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.length === 0 ? (
                  <div className="text-center py-8">
                    <UserX className="h-12 w-12 text-cyber-light/40 mx-auto mb-4" />
                    <p className="text-cyber-light/60">No users found</p>
                  </div>
                ) : (
                  users.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center justify-between p-4 bg-cyber-darker/40 rounded-lg border border-cyber-blue/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          user.role === 'admin' ? 'bg-purple-500/20' : 'bg-cyber-blue/20'
                        }`}>
                          {user.role === 'admin' ? (
                            <Crown className="h-5 w-5 text-purple-400" />
                          ) : (
                            <UserCheck className="h-5 w-5 text-cyber-blue" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-cyber-light font-medium">{user.username}</h3>
                          <p className="text-cyber-light/60 text-sm">
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        }`}>
                          {user.role}
                        </span>
                        
                        <Button
                          onClick={() => updateUserRole(
                            user.id, 
                            user.role === 'admin' ? 'user' : 'admin'
                          )}
                          variant="outline"
                          size="sm"
                          className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                        >
                          {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsers;
