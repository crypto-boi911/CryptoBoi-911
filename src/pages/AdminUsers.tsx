
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, EyeOff, Download, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

interface UserCredential {
  username: string;
  accessCode: string;
  timestamp: string;
}

interface UserRegistration {
  username: string;
  accessKey: string;
  joinDate: string;
  lastLogin?: string;
}

const AdminUsers = () => {
  const [userCredentials, setUserCredentials] = useState<UserCredential[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<UserRegistration[]>([]);
  const [showCodes, setShowCodes] = useState(false);

  useEffect(() => {
    // Load login credentials
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      setUserCredentials(JSON.parse(storedCredentials));
    }

    // Load user registrations
    const storedRegistrations = localStorage.getItem('userRegistrations');
    if (storedRegistrations) {
      setUserRegistrations(JSON.parse(storedRegistrations));
    }

    // Set up real-time polling for updates
    const interval = setInterval(() => {
      const credentials = localStorage.getItem('userCredentials');
      const registrations = localStorage.getItem('userRegistrations');
      
      if (credentials) {
        setUserCredentials(JSON.parse(credentials));
      }
      if (registrations) {
        setUserRegistrations(JSON.parse(registrations));
      }
    }, 5000); // Poll every 5 seconds for real-time updates

    return () => clearInterval(interval);
  }, []);

  const exportAllData = () => {
    const allData = {
      registrations: userRegistrations,
      loginCredentials: userCredentials
    };
    const dataStr = JSON.stringify(allData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'all-user-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all user data? This action cannot be undone.')) {
      localStorage.removeItem('userCredentials');
      localStorage.removeItem('userRegistrations');
      setUserCredentials([]);
      setUserRegistrations([]);
    }
  };

  const totalUsers = userRegistrations.length;
  const activeUsers = userCredentials.length;

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/admin/dashboard" className="text-cyber-blue hover:text-cyber-blue/80 mb-4 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                User Management
              </h1>
              <p className="text-xl text-cyber-light/70">
                View all user registrations and login activity in real-time
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowCodes(!showCodes)}
                variant="outline"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
              >
                {showCodes ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showCodes ? 'Hide' : 'Show'} Codes
              </Button>
              <Button
                onClick={exportAllData}
                variant="outline"
                className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                disabled={totalUsers === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
              <Button
                onClick={clearAllData}
                variant="outline"
                className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                disabled={totalUsers === 0}
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Registered</p>
                    <p className="text-2xl font-bold text-cyber-blue">{totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-cyber-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-green-400">{activeUsers}</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Login Rate</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0}%
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-cyber-blue" />
                <div>
                  <CardTitle className="text-cyber-light font-tech">
                    User Data Management
                  </CardTitle>
                  <CardDescription className="text-cyber-light/60">
                    Monitor user registrations and login activity
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="registrations" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-cyber-gray/30">
                  <TabsTrigger value="registrations" className="text-cyber-light data-[state=active]:bg-cyber-blue/20">
                    User Registrations ({totalUsers})
                  </TabsTrigger>
                  <TabsTrigger value="logins" className="text-cyber-light data-[state=active]:bg-cyber-blue/20">
                    Login Activity ({activeUsers})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="registrations">
                  {userRegistrations.length === 0 ? (
                    <div className="text-center py-8 text-cyber-light/60">
                      No user registrations found. Users will appear here when they sign up via /get-started.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-cyber-blue/20">
                            <TableHead className="text-cyber-light">Username</TableHead>
                            <TableHead className="text-cyber-light">Access Key</TableHead>
                            <TableHead className="text-cyber-light">Join Date</TableHead>
                            <TableHead className="text-cyber-light">Last Login</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userRegistrations.map((user, index) => (
                            <TableRow key={index} className="border-cyber-blue/10">
                              <TableCell className="text-cyber-light font-medium">
                                {user.username}
                              </TableCell>
                              <TableCell className="text-cyber-light font-mono">
                                {showCodes ? user.accessKey : '••••••••••••••'}
                              </TableCell>
                              <TableCell className="text-cyber-light/70">
                                {new Date(user.joinDate).toLocaleString()}
                              </TableCell>
                              <TableCell className="text-cyber-light/70">
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="logins">
                  {userCredentials.length === 0 ? (
                    <div className="text-center py-8 text-cyber-light/60">
                      No login activity found. Users will appear here after they log in via /login.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-cyber-blue/20">
                            <TableHead className="text-cyber-light">Username</TableHead>
                            <TableHead className="text-cyber-light">Access Code</TableHead>
                            <TableHead className="text-cyber-light">Login Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userCredentials.map((credential, index) => (
                            <TableRow key={index} className="border-cyber-blue/10">
                              <TableCell className="text-cyber-light font-medium">
                                {credential.username}
                              </TableCell>
                              <TableCell className="text-cyber-light font-mono">
                                {showCodes ? credential.accessCode : '••••••••••••'}
                              </TableCell>
                              <TableCell className="text-cyber-light/70">
                                {new Date(credential.timestamp).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsers;
