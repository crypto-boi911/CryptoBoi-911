
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import UserDashboardLayout from '@/components/UserDashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
}

interface TicketMessage {
  id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
  attachment_url?: string;
}

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id);
    }
  }, [selectedTicket]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchMessages = async (ticketId: string) => {
    try {
      const { data, error } = await supabase
        .from('ticket_messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createTicket = async () => {
    if (!newSubject.trim() || !newMessage.trim()) return;

    setIsCreating(true);
    try {
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          user_id: user?.id,
          subject: newSubject,
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
          message: newMessage,
          is_admin: false
        });

      if (messageError) throw messageError;

      setNewSubject('');
      setNewMessage('');
      setShowNewTicket(false);
      fetchTickets();
      setSelectedTicket(ticket);

      toast({
        title: "Ticket Created",
        description: "Your support ticket has been created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return;

    setIsSending(true);
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
      fetchMessages(selectedTicket.id);

      toast({
        title: "Message Sent",
        description: "Your message has been sent to support",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <UserDashboardLayout title="Support Tickets" showBackButton>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-cyber text-cyber-light">Support Center</h2>
          <Button
            onClick={() => setShowNewTicket(true)}
            className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
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
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
              />
              <Textarea
                placeholder="Describe your issue..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light min-h-32"
              />
              <div className="flex gap-2">
                <Button
                  onClick={createTicket}
                  disabled={isCreating || !newSubject.trim() || !newMessage.trim()}
                  className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
                >
                  {isCreating ? 'Creating...' : 'Create Ticket'}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-cyber text-cyber-light">Your Tickets</h3>
            {tickets.length === 0 ? (
              <Card className="bg-cyber-darker/60 border-cyber-blue/30 text-center p-8">
                <MessageSquare className="h-12 w-12 text-cyber-blue/50 mx-auto mb-4" />
                <p className="text-cyber-light/60">No tickets yet</p>
                <p className="text-cyber-light/40 text-sm">Create your first support ticket</p>
              </Card>
            ) : (
              tickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className={`bg-cyber-darker/60 border-cyber-blue/30 cursor-pointer transition-all duration-300 ${
                    selectedTicket?.id === ticket.id ? 'border-cyber-blue' : 'hover:border-cyber-blue/60'
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-cyber-light font-medium text-sm truncate">
                          {ticket.subject}
                        </h4>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center text-cyber-light/60 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Messages */}
          <div className="lg:col-span-2">
            {selectedTicket ? (
              <Card className="bg-cyber-darker/60 border-cyber-blue/30 h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-cyber-light">{selectedTicket.subject}</CardTitle>
                      <p className="text-cyber-light/60 text-sm">
                        Ticket #{selectedTicket.id.slice(0, 8)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-96 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.is_admin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            message.is_admin
                              ? 'bg-cyber-gray/30 text-cyber-light'
                              : 'bg-cyber-blue/20 text-cyber-light border border-cyber-blue/30'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedTicket.status === 'open' && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={sendMessage}
                          disabled={isSending || !newMessage.trim()}
                          className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {isSending ? 'Sending...' : 'Send'}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-cyber-blue/30 text-cyber-blue"
                        >
                          <Paperclip className="h-4 w-4 mr-2" />
                          Attach
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-cyber-darker/60 border-cyber-blue/30 h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-cyber-blue/50 mx-auto mb-4" />
                  <p className="text-cyber-light/60">Select a ticket to view messages</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </UserDashboardLayout>
  );
};

export default Tickets;
