
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, EyeOff, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';

interface UserCredential {
  username: string;
  accessCode: string;
  timestamp: string;
}

const AdminUsers = () => {
  const [userCredentials, setUserCredentials] = useState<UserCredential[]>([]);
  const [showCodes, setShowCodes] = useState(false);

  useEffect(() => {
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      setUserCredentials(JSON.parse(storedCredentials));
    }
  }, []);

  const exportCredentials = () => {
    const dataStr = JSON.stringify(userCredentials, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'user-credentials.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearCredentials = () => {
    if (confirm('Are you sure you want to clear all user credentials? This action cannot be undone.')) {
      localStorage.removeItem('userCredentials');
      setUserCredentials([]);
    }
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
            <div>
              <Link to="/admin/dashboard" className="text-cyber-blue hover:text-cyber-blue/80 mb-4 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                User Management
              </h1>
              <p className="text-xl text-cyber-light/70">
                View all user login credentials
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
                onClick={exportCredentials}
                variant="outline"
                className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                disabled={userCredentials.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={clearCredentials}
                variant="outline"
                className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                disabled={userCredentials.length === 0}
              >
                Clear All
              </Button>
            </div>
          </div>

          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-cyber-blue" />
                <div>
                  <CardTitle className="text-cyber-light font-tech">
                    User Credentials ({userCredentials.length})
                  </CardTitle>
                  <CardDescription className="text-cyber-light/60">
                    All user login credentials and access codes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {userCredentials.length === 0 ? (
                <div className="text-center py-8 text-cyber-light/60">
                  No user credentials found. Users will appear here after they log in.
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsers;
