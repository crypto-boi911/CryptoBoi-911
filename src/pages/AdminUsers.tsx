
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, UserCheck, UserX, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: string;
  username: string;
  role: string;
  created_at: string;
  email?: string;
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigate('/admin/dashboard');
  };

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
                  Temporarily disabled for rebuild • Total: {users.length}
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
                    <p className="text-2xl font-bold text-cyber-blue">0</p>
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
                    <p className="text-2xl font-bold text-purple-400">0</p>
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
                    <p className="text-2xl font-bold text-green-400">0</p>
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
                User management temporarily disabled for rebuild
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <UserX className="h-12 w-12 text-cyber-light/40 mx-auto mb-4" />
                <p className="text-cyber-light/60">User management disabled for rebuild</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsers;
