
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Plus, Send, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
  ticket_messages: Array<{
    id: string;
    message: string;
    is_admin: boolean;
    created_at: string;
  }>;
}

const Tickets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          ticket_messages (
            id,
            message,
            is_admin,
            created_at
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tickets:', error);
        return;
      }

      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTicket = async () => {
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          user_id: user?.id,
          subject: newTicketSubject,
          status: 'open',
          priority: 'normal'
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      const { error: messageError } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticket.id,
          user_id: user?.id,
          message: newTicketMessage,
          is_admin: false
        });

      if (messageError) throw messageError;

      toast({
        title: "Success",
        description: "Ticket created successfully",
      });

      setNewTicketSubject('');
      setNewTicketMessage('');
      setShowNewTicket(false);
      fetchTickets();
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: "Error",
        description: "Failed to create ticket",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return;

    try {
      const { error } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: selectedTicket.id,
          user_id: user?.id,
          message: newMessage,
          is_admin: false
        });

      if (error) throw error;

      setNewMessage('');
      fetchTickets();
      
      // Update selected ticket with new message
      const updatedTicket = tickets.find(t => t.id === selectedTicket.id);
      if (updatedTicket) {
        setSelectedTicket(updatedTicket);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-400';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Support Tickets" showBackButton>
        <div className="flex items-center justify-center py-12">
          <div className="text-cyber-blue text-xl">Loading tickets...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (selectedTicket) {
    return (
      <DashboardLayout title={`Ticket: ${selectedTicket.subject}`} showBackButton>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setSelectedTicket(null)}
              variant="outline"
              className="border-cyber-blue/30 text-cyber-blue"
            >
              ← Back to Tickets
            </Button>
            <Badge className={getStatusColor(selectedTicket.status)}>
              {selectedTicket.status}
            </Badge>
          </div>

          <Card className="bg-cyber-darker/60 border-cyber-blue/30">
            <CardContent className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {selectedTicket.ticket_messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.is_admin
                      ? 'bg-cyber-blue/10 border-l-4 border-cyber-blue'
                      : 'bg-cyber-dark/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-cyber-light">
                      {message.is_admin ? 'Admin' : 'You'}
                    </span>
                    <span className="text-xs text-cyber-light/60">
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-cyber-light">{message.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-cyber-dark/50 border-cyber-blue/30 text-cyber-light"
            />
            <Button
              onClick={sendMessage}
              className="bg-cyber-blue hover:bg-cyber-blue/80"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Support Tickets" showBackButton>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-cyber text-cyber-light">Your Tickets</h2>
          <Button
            onClick={() => setShowNewTicket(true)}
            className="bg-cyber-blue hover:bg-cyber-blue/80"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {showNewTicket && (
          <Card className="bg-cyber-darker/60 border-cyber-blue/30">
            <CardHeader>
              <CardTitle className="text-cyber-light">Create New Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Subject"
                value={newTicketSubject}
                onChange={(e) => setNewTicketSubject(e.target.value)}
                className="bg-cyber-dark/50 border-cyber-blue/30 text-cyber-light"
              />
              <Textarea
                placeholder="Describe your issue..."
                value={newTicketMessage}
                onChange={(e) => setNewTicketMessage(e.target.value)}
                className="bg-cyber-dark/50 border-cyber-blue/30 text-cyber-light"
              />
              <div className="flex space-x-2">
                <Button
                  onClick={createTicket}
                  className="bg-cyber-blue hover:bg-cyber-blue/80"
                >
                  Create Ticket
                </Button>
                <Button
                  onClick={() => setShowNewTicket(false)}
                  variant="outline"
                  className="border-cyber-blue/30 text-cyber-blue"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-cyber-light/40 mx-auto mb-4" />
            <h3 className="text-xl text-cyber-light/60 mb-2">No tickets yet</h3>
            <p className="text-cyber-light/40">Create a ticket to get support</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="bg-cyber-darker/60 border-cyber-blue/30 cursor-pointer hover:border-cyber-blue/60 transition-colors"
                onClick={() => setSelectedTicket(ticket)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-cyber-light">
                      {ticket.subject}
                    </h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-cyber-light/60">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                    </div>
                    <span>Priority: {ticket.priority}</span>
                    <span>{ticket.ticket_messages.length} messages</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Tickets;
