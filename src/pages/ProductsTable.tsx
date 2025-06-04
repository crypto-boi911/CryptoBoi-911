
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Monitor, Database, Cloud, Smartphone, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProductsTable = () => {
  const navigate = useNavigate();

  const products = [
    {
      icon: Shield,
      name: 'Premium Bank logs',
      category: 'All country Suite',
      description: 'Complete Business and Personal Bank logs with Full Login credentials and balances',
      features: 'Acc Balance, Username, Password, IP address, Country, Fullz Details',
      price: '$299/month'
    },
    {
      icon: Monitor,
      name: 'SecureWatch',
      category: 'Network Monitoring',
      description: 'Advanced network monitoring solution that provides comprehensive visibility into your network traffic and security events.',
      features: 'Network traffic analysis, Anomaly detection, Custom alerts, Historical reporting, Integration APIs, Cloud-based dashboard',
      price: '$149/month'
    },
    {
      icon: Database,
      name: 'DataVault',
      category: 'Data Protection',
      description: 'Enterprise data encryption and backup solution ensuring your critical data remains secure and recoverable.',
      features: 'End-to-end encryption, Automated backups, Point-in-time recovery, Compliance tools, Multi-cloud support, Data loss prevention',
      price: '$199/month'
    },
    {
      icon: Cloud,
      name: 'CloudGuard',
      category: 'Cloud Security',
      description: 'Comprehensive cloud security platform protecting your cloud infrastructure across multiple providers.',
      features: 'Multi-cloud protection, Configuration monitoring, Identity management, Access controls, Security posture assessment, Cost optimization',
      price: '$249/month'
    },
    {
      icon: Smartphone,
      name: 'MobileShield',
      category: 'Mobile Security',
      description: 'Advanced mobile device management and security solution for protecting corporate mobile devices and data.',
      features: 'Device management, App security scanning, Remote data wipe, Compliance monitoring, VPN integration, Threat protection',
      price: '$79/month'
    },
    {
      icon: Lock,
      name: 'SecureAuth',
      category: 'Identity Management',
      description: 'Multi-factor authentication and identity management platform providing secure access control.',
      features: 'Multi-factor authentication, Single sign-on (SSO), Identity verification, Access management, Risk-based authentication, API security',
      price: '$99/month'
    },
    {
      icon: Shield,
      name: 'ThreatDetector',
      category: 'Advanced Threat Protection',
      description: 'AI-powered threat detection system that identifies and neutralizes sophisticated cyber attacks in real-time.',
      features: 'AI threat analysis, Real-time monitoring, Automated response, Threat intelligence, Behavioral analysis, Incident reporting',
      price: '$349/month'
    }
  ];

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
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                Premium Products Access
              </h1>
              <p className="text-xl text-cyber-light/70">
                Comprehensive overview of all available cybersecurity products
              </p>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardHeader>
              <CardTitle className="text-2xl font-cyber text-cyber-light">
                All Products ({products.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-cyber-blue/20">
                      <TableHead className="text-cyber-light font-tech">Product</TableHead>
                      <TableHead className="text-cyber-light font-tech">Category</TableHead>
                      <TableHead className="text-cyber-light font-tech">Description</TableHead>
                      <TableHead className="text-cyber-light font-tech">Key Features</TableHead>
                      <TableHead className="text-cyber-light font-tech">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow 
                        key={index} 
                        className="border-cyber-blue/10 hover:bg-cyber-blue/5 transition-colors"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <product.icon className="h-8 w-8 text-cyber-blue flex-shrink-0" />
                            <span className="text-cyber-light font-tech">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-cyber-blue text-sm font-tech">
                            {product.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <p className="text-cyber-light/70 text-sm max-w-xs">
                            {product.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="text-cyber-light/60 text-sm max-w-md">
                            {product.features}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span className="text-cyber-blue font-cyber font-bold">
                            {product.price}
                          </span>
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

export default ProductsTable;
