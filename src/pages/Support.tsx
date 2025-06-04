
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Home,
  CreditCard,
  Database,
  Smartphone,
  Wrench,
  ShoppingCart,
  ClipboardList,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Support = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and message fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get user info
      const storedCredentials = localStorage.getItem('userCredentials');
      let userEmail = 'unknown@user.com';
      
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        if (credentials.length > 0) {
          const recentUser = credentials[credentials.length - 1];
          userEmail = recentUser.email || recentUser.username;
        }
      }

      // Create ticket object
      const ticket = {
        id: Date.now().toString(),
        user: userEmail,
        subject: subject.trim(),
        message: message.trim(),
        priority,
        status: 'open',
        createdAt: new Date().toISOString(),
      };

      // Store ticket in localStorage (in a real app, this would be sent to backend)
      const existingTickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
      existingTickets.push(ticket);
      localStorage.setItem('supportTickets', JSON.stringify(existingTickets));

      toast({
        title: "Ticket Submitted",
        description: "Your support ticket has been submitted successfully. We'll get back to you soon!",
      });

      // Reset form
      setSubject('');
      setMessage('');
      setPriority('medium');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };

  const sidebarItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Bank Logs', icon: CreditCard, path: '/dashboard/bank-logs' },
    { name: 'Cards/Linkables', icon: CreditCard, path: '/dashboard/cards' },
    { name: 'PayPal Logs', icon: Database, path: '/dashboard/paypal' },
    { name: 'CashApp Logs', icon: Smartphone, path: '/dashboard/cashapp' },
    { name: 'Tools', icon: Wrench, path: '/dashboard/tools' },
    { name: 'Cart', icon: ShoppingCart, path: '/dashboard/cart' },
    { name: 'Orders', icon: ClipboardList, path: '/dashboard/orders' },
    { name: 'Support', icon: HelpCircle, path: '/dashboard/support', active: true },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-cyber-gradient flex w-full">
        <AppSidebar sidebarItems={sidebarItems} onLogout={handleLogout} />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-cyber-darker/50 border-b border-cyber-blue/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="
                  bg-cyber-blue/20 
                  border-2 
                  border-cyber-blue 
                  text-cyber-blue 
                  hover:bg-cyber-blue 
                  hover:text-cyber-dark 
                  transition-all 
                  duration-300 
                  w-12 
                  h-12 
                  rounded-lg 
                  shadow-lg 
                  shadow-cyber-blue/30
                  hover:shadow-cyber-blue/50
                  hover:scale-105
                  active:scale-95
                " />
                <div>
                  <h1 className="text-2xl font-cyber font-bold text-cyber-light mb-2">
                    Contact Support
                  </h1>
                  <p className="text-cyber-light/60">
                    Need help? Submit a support ticket and our team will assist you.
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="glow-box bg-cyber-gray/50 border-cyber-blue/20">
                <CardHeader>
                  <CardTitle className="text-cyber-light font-cyber flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-cyber-blue" />
                    Submit Support Ticket
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-tech font-medium text-cyber-light mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Brief description of your issue..."
                        className="bg-cyber-dark/50 border-cyber-blue/30 text-cyber-light placeholder:text-cyber-light/50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="priority" className="block text-sm font-tech font-medium text-cyber-light mb-2">
                        Priority
                      </label>
                      <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-3 py-2 bg-cyber-dark/50 border border-cyber-blue/30 rounded-md text-cyber-light focus:outline-none focus:ring-2 focus:ring-cyber-blue/50"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-tech font-medium text-cyber-light mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please provide detailed information about your issue..."
                        rows={6}
                        className="bg-cyber-dark/50 border-cyber-blue/30 text-cyber-light placeholder:text-cyber-light/50"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-tech flex-1"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Ticket
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = ({ sidebarItems, onLogout }: { sidebarItems: any[], onLogout: () => void }) => {
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <Sidebar className="bg-cyber-darker/90 border-r border-cyber-blue/20">
      <SidebarHeader className="p-6 border-b border-cyber-blue/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyber-blue rounded-lg flex items-center justify-center">
            <span className="text-cyber-dark font-bold">C</span>
          </div>
          {state === 'expanded' && (
            <span className="text-xl font-cyber font-bold text-cyber-blue">CYBERKRYPT</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === item.path
                        ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                        : 'text-cyber-light/70 hover:bg-cyber-blue/10 hover:text-cyber-blue'
                    }`}
                  >
                    <Link to={item.path} className="flex items-center space-x-3 w-full">
                      <item.icon className="h-5 w-5" />
                      <span className="font-tech">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-cyber-blue/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-tech">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Support;
