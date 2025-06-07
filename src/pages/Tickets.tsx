
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plus, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import UserDashboardLayout from '@/components/UserDashboardLayout';

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
}

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
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

  const createTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.subject.trim() || !formData.message.trim()) return;

    setIsCreating(true);
    try {
      // Create ticket
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          user_id: user.id,
          subject: formData.subject.trim(),
          priority: formData.priority,
          status: 'open'
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Create initial message
      const { error: messageError } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticket.id,
          user_id: user.id,
          message: formData.message.trim(),
          is_admin: false
        });

      if (messageError) throw messageError;

      toast({
        title: "Ticket Created",
        description: "Your support ticket has been created successfully",
      });

      // Reset form and refresh tickets
      setFormData({ subject: '', message: '', priority: 'normal' });
      setShowCreateForm(false);
      fetchTickets();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-400';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'normal':
        return 'bg-blue-500/20 text-blue-400';
      case 'low':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  if (isLoading) {
    return (
      <UserDashboardLayout title="Support Tickets" showBackButton>
        <div className="flex items-center justify-center py-12">
          <div className="text-cyber-blue text-xl">Loading tickets...</div>
        </div>
      </UserDashboardLayout>
    );
  }

  return (
    <UserDashboardLayout title="Support Tickets" showBackButton>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Create Ticket Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-cyber text-cyber-light">Your Support Tickets</h2>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Create Ticket Form */}
        {showCreateForm && (
          <Card className="bg-cyber-darker/60 border-cyber-blue/30">
            <CardHeader>
              <CardTitle className="text-cyber-light font-tech">Create Support Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={createTicket} className="space-y-4">
                <div>
                  <Label htmlFor="subject" className="text-cyber-light">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="priority" className="text-cyber-light">Priority</Label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full bg-cyber-gray/30 border border-cyber-blue/20 text-cyber-light rounded-md px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-cyber-light">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light min-h-[100px]"
                    placeholder="Describe your issue in detail..."
                    required
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isCreating ? 'Creating...' : 'Create Ticket'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    variant="outline"
                    className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-cyber-light/40 mx-auto mb-4" />
            <h3 className="text-xl text-cyber-light/60 mb-2">No tickets yet</h3>
            <p className="text-cyber-light/40">Create your first support ticket to get help</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="bg-cyber-darker/60 border-cyber-blue/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-cyber-light font-tech">
                      {ticket.subject}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-cyber-light/60">
                    <span>Ticket #{ticket.id.slice(0, 8)}</span>
                    <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </UserDashboardLayout>
  );
};

export default Tickets;
