
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Clock, User, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SupportTicket {
  id: string;
  user: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'resolved';
  createdAt: string;
}

const AdminMessages = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load support tickets from localStorage
    const storedTickets = localStorage.getItem('supportTickets');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets);
      setTickets(parsedTickets);
    }
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'open' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white';
  };

  const markAsResolved = (ticketId: string) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, status: 'resolved' as const } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    
    toast({
      title: "Ticket Resolved",
      description: "The support ticket has been marked as resolved.",
    });
  };

  const deleteTicket = (ticketId: string) => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
    setTickets(updatedTickets);
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(null);
    }
    
    toast({
      title: "Ticket Deleted",
      description: "The support ticket has been deleted.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const openTickets = tickets.filter(ticket => ticket.status === 'open');
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved');

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/admin/dashboard')}
                variant="outline"
                className="border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-4">
                  Support Messages
                </h1>
                <p className="text-xl text-cyber-light/70">
                  Manage and respond to user support tickets
                </p>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Total Tickets</p>
                    <p className="text-2xl font-bold text-cyber-blue">{tickets.length}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-cyber-blue" />
                </div>
              </CardContent>
            </Card>

            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Open Tickets</p>
                    <p className="text-2xl font-bold text-orange-400">{openTickets.length}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyber-light/60 text-sm">Resolved</p>
                    <p className="text-2xl font-bold text-green-400">{resolvedTickets.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tickets List */}
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardHeader>
                <CardTitle className="text-cyber-light font-cyber flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-cyber-blue" />
                  Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tickets.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-cyber-light/30 mx-auto mb-4" />
                    <p className="text-cyber-light/60">No support tickets yet</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedTicket?.id === ticket.id
                            ? 'border-cyber-blue bg-cyber-blue/10'
                            : 'border-cyber-blue/20 hover:border-cyber-blue/40'
                        }`}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-cyber-light font-tech font-medium truncate">
                            {ticket.subject}
                          </h4>
                          <div className="flex gap-2 ml-2">
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                            <Badge className={getStatusColor(ticket.status)}>
                              {ticket.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-cyber-light/60">
                          <User className="h-4 w-4" />
                          <span>{ticket.user}</span>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{formatDate(ticket.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ticket Details */}
            <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
              <CardHeader>
                <CardTitle className="text-cyber-light font-cyber">
                  Ticket Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTicket ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-tech font-semibold text-cyber-light mb-2">
                        {selectedTicket.subject}
                      </h3>
                      <div className="flex gap-2 mb-4">
                        <Badge className={getPriorityColor(selectedTicket.priority)}>
                          {selectedTicket.priority}
                        </Badge>
                        <Badge className={getStatusColor(selectedTicket.status)}>
                          {selectedTicket.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-cyber-light/70">
                        <User className="h-4 w-4" />
                        <span className="font-tech">From: {selectedTicket.user}</span>
                      </div>
                      <div className="flex items-center gap-2 text-cyber-light/70">
                        <Clock className="h-4 w-4" />
                        <span className="font-tech">{formatDate(selectedTicket.createdAt)}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-cyber-light font-tech font-medium mb-2">Message:</h4>
                      <div className="bg-cyber-dark/50 border border-cyber-blue/20 rounded-lg p-4">
                        <p className="text-cyber-light/80 whitespace-pre-wrap">
                          {selectedTicket.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      {selectedTicket.status === 'open' && (
                        <Button
                          onClick={() => markAsResolved(selectedTicket.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Resolved
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteTicket(selectedTicket.id)}
                        variant="outline"
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-cyber-light/30 mx-auto mb-4" />
                    <p className="text-cyber-light/60">Select a ticket to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminMessages;
