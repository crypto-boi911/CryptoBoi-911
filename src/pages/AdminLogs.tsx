
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, ShoppingCart, Settings, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface LogEntry {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  category: 'auth' | 'purchase' | 'admin' | 'system';
  details: string;
  ip: string;
}

const AdminLogs = () => {
  const [logs] = useState<LogEntry[]>([
    { id: 1, timestamp: '2024-06-04 15:30:25', user: 'john_doe', action: 'Login', category: 'auth', details: 'Successful login', ip: '192.168.1.100' },
    { id: 2, timestamp: '2024-06-04 15:25:10', user: 'alice_smith', action: 'Purchase', category: 'purchase', details: 'Bought Visa Platinum - $800', ip: '192.168.1.101' },
    { id: 3, timestamp: '2024-06-04 15:20:05', user: 'admin', action: 'Product Update', category: 'admin', details: 'Modified Chase Bank Log', ip: '192.168.1.1' },
    { id: 4, timestamp: '2024-06-04 15:15:30', user: 'bob_wilson', action: 'Cart Update', category: 'purchase', details: 'Added CashApp Premium to cart', ip: '192.168.1.102' },
    { id: 5, timestamp: '2024-06-04 15:10:15', user: 'system', action: 'Cleanup', category: 'system', details: 'Cleared expired sessions', ip: 'localhost' },
    { id: 6, timestamp: '2024-06-04 15:05:45', user: 'sarah_jones', action: 'Failed Login', category: 'auth', details: 'Invalid credentials', ip: '192.168.1.103' },
    { id: 7, timestamp: '2024-06-04 15:00:20', user: 'admin', action: 'User Management', category: 'admin', details: 'Exported user credentials', ip: '192.168.1.1' },
    { id: 8, timestamp: '2024-06-04 14:55:10', user: 'mike_brown', action: 'Registration', category: 'auth', details: 'New user registered', ip: '192.168.1.104' },
  ]);

  const getCategoryColor = (category: LogEntry['category']) => {
    switch (category) {
      case 'auth': return 'bg-blue-500/20 text-blue-400';
      case 'purchase': return 'bg-green-500/20 text-green-400';
      case 'admin': return 'bg-purple-500/20 text-purple-400';
      case 'system': return 'bg-orange-500/20 text-orange-400';
    }
  };

  const getCategoryIcon = (category: LogEntry['category']) => {
    switch (category) {
      case 'auth': return <Users className="h-4 w-4" />;
      case 'purchase': return <ShoppingCart className="h-4 w-4" />;
      case 'admin': return <Settings className="h-4 w-4" />;
      case 'system': return <Activity className="h-4 w-4" />;
    }
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'activity-logs.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const logStats = {
    total: logs.length,
    auth: logs.filter(l => l.category === 'auth').length,
    purchase: logs.filter(l => l.category === 'purchase').length,
    admin: logs.filter(l => l.category === 'admin').length,
    system: logs.filter(l => l.category === 'system').length,
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
                Activity Logs
              </h1>
              <p className="text-xl text-cyber-light/70">
                Monitor system activity and user actions
              </p>
            </div>
            <Button
              onClick={exportLogs}
              className="bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>

          {/* Log Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total</p>
                    <p className="text-2xl font-bold text-cyber-blue">{logStats.total}</p>
                  </div>
                  <Activity className="h-8 w-8 text-cyber-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Auth</p>
                    <p className="text-2xl font-bold text-blue-400">{logStats.auth}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Purchase</p>
                    <p className="text-2xl font-bold text-green-400">{logStats.purchase}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Admin</p>
                    <p className="text-2xl font-bold text-purple-400">{logStats.admin}</p>
                  </div>
                  <Settings className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">System</p>
                    <p className="text-2xl font-bold text-orange-400">{logStats.system}</p>
                  </div>
                  <Activity className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Logs Table */}
          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardHeader>
              <CardTitle className="text-cyber-light font-tech">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-cyber-blue/20">
                      <TableHead className="text-cyber-light">Timestamp</TableHead>
                      <TableHead className="text-cyber-light">User</TableHead>
                      <TableHead className="text-cyber-light">Action</TableHead>
                      <TableHead className="text-cyber-light">Category</TableHead>
                      <TableHead className="text-cyber-light">Details</TableHead>
                      <TableHead className="text-cyber-light">IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id} className="border-cyber-blue/10">
                        <TableCell className="text-cyber-light font-mono text-sm">
                          {log.timestamp}
                        </TableCell>
                        <TableCell className="text-cyber-light">{log.user}</TableCell>
                        <TableCell className="text-cyber-light font-medium">{log.action}</TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(log.category)}>
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(log.category)}
                              {log.category}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-cyber-light/70 max-w-xs truncate">
                          {log.details}
                        </TableCell>
                        <TableCell className="text-cyber-light/60 font-mono text-sm">
                          {log.ip}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogs;
