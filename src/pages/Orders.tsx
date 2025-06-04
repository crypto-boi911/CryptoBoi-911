
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Eye, Download, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: ['Chase Bank Log', 'PayPal Business'],
      status: 'completed',
      total: 1250,
      deliveryDate: '2024-01-15'
    },
    {
      id: 'ORD-002',
      date: '2024-01-14',
      items: ['Visa Platinum', 'CashApp Premium'],
      status: 'processing',
      total: 950,
      deliveryDate: 'Pending'
    },
    {
      id: 'ORD-003',
      date: '2024-01-12',
      items: ['Wells Fargo Log'],
      status: 'failed',
      total: 650,
      deliveryDate: 'Failed'
    },
    {
      id: 'ORD-004',
      date: '2024-01-10',
      items: ['Bank of America Log', 'Mastercard Gold'],
      status: 'completed',
      total: 850,
      deliveryDate: '2024-01-10'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-cyber-light/60" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-400/30 text-green-400';
      case 'processing':
        return 'border-yellow-400/30 text-yellow-400';
      case 'failed':
        return 'border-red-400/30 text-red-400';
      default:
        return 'border-cyber-light/30 text-cyber-light/60';
    }
  };

  return (
    <div className="min-h-screen bg-cyber-gradient p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-cyber font-bold text-cyber-light mb-4 flex items-center gap-3">
            <ClipboardList className="h-8 w-8" />
            Order History
          </h1>
          <p className="text-cyber-light/60">
            Track your orders and download your purchased items
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-cyber-light font-tech">
                        Order {order.id}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`capitalize ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold text-lg">${order.total}</p>
                      <p className="text-cyber-light/60 text-sm">{order.date}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-cyber-light font-tech mb-2">Items Ordered</h4>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-cyber-light/60 text-sm">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-cyber-light font-tech mb-2">Delivery Status</h4>
                      <p className="text-cyber-light/60 text-sm">
                        {order.status === 'completed' ? `Delivered on ${order.deliveryDate}` : order.deliveryDate}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {order.status === 'completed' && (
                        <Button 
                          size="sm"
                          className="bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
            <CardContent className="p-8 text-center">
              <ClipboardList className="h-16 w-16 text-cyber-light/30 mx-auto mb-4" />
              <p className="text-cyber-light/60">No orders found</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Orders;
