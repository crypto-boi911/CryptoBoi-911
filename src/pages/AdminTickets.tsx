
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Send, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
  };
  ticket_messages: Array<{
    id: string;
    message: string;
    is_admin: boolean;
    created_at: string;
  }>;
}

const AdminTickets = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          profiles (username),
          ticket_messages (
            id,
            message,
            is_admin,
            created_at
          )
        `)
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

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status })
        .eq('id', ticketId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Ticket status updated",
      });

      fetchTickets();
      
      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, status });
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast({
        title: "Error",
        description: "Failed to update ticket status",
        variant: "destructive",
      });
    }
  };

  const sendAdminMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return;

    try {
      const { error } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: selectedTicket.id,
          user_id: selectedTicket.user_id,
          message: newMessage,
          is_admin: true
        });

      if (error) throw error;

      setNewMessage('');
      fetchTickets();

      const updatedTicket = tickets.find(t => t.id === selectedTicket.id);
      if (updatedTicket) {
        setSelectedTicket(updatedTicket);
      }

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
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
      <div className="flex items-center justify-center py-12">
        <div className="text-cyber-blue text-xl">Loading tickets...</div>
      </div>
    );
  }

  if (selectedTicket) {
    return (
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
          <div className="flex items-center space-x-4">
            <Select
              value={selectedTicket.status}
              onValueChange={(value) => updateTicketStatus(selectedTicket.id, value)}
            >
              <SelectTrigger className="w-40 bg-cyber-dark border-cyber-blue/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={getStatusColor(selectedTicket.status)}>
              {selectedTicket.status}
            </Badge>
          </div>
        </div>

        <Card className="bg-cyber-darker/60 border-cyber-blue/30">
          <CardHeader>
            <CardTitle className="text-cyber-light">
              {selectedTicket.subject} - {selectedTicket.profiles.username}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {selectedTicket.ticket_messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.is_admin
                    ? 'bg-cyber-blue/10 border-l-4 border-cyber-blue ml-8'
                    : 'bg-cyber-dark/50 mr-8'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-cyber-light">
                    {message.is_admin ? 'Admin (You)' : selectedTicket.profiles.username}
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
            placeholder="Type your admin response..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-cyber-dark/50 border-cyber-blue/30 text-cyber-light"
          />
          <Button
            onClick={sendAdminMessage}
            className="bg-cyber-blue hover:bg-cyber-blue/80"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Admin Response
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-cyber text-cyber-light">Support Tickets</h2>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-cyber-light/40 mx-auto mb-4" />
          <h3 className="text-xl text-cyber-light/60 mb-2">No tickets</h3>
          <p className="text-cyber-light/40">No support tickets to display</p>
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
                  <span>User: {ticket.profiles.username}</span>
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
  );
};

export default AdminTickets;
