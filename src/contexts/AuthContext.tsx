
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  logActivity: (action: string, details?: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const logActivity = async (action: string, details?: any) => {
    if (!user) return;
    
    try {
      await supabase
        .from('user_activity')
        .insert({
          user_id: user.id,
          action,
          details: details || {}
        });
      console.log('Activity logged:', action, details);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
          if (event === 'SIGNED_IN') {
            // Use setTimeout to avoid potential recursion in auth callback
            setTimeout(() => {
              logActivity('LOGIN', { 
                timestamp: new Date().toISOString(),
                email: session.user.email,
                username: session.user.user_metadata?.username || 'unknown'
              });
            }, 0);
          }
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    // Set default role to "user", but "admin@cryptoboi.fake" gets "admin" role
    const role = email === 'admin@cryptoboi.fake' ? 'admin' : 'user';
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          role: role
        }
      }
    });

    if (!error) {
      toast({
        title: "Success",
        description: "Account created successfully! Please check your email to confirm your account.",
      });
      
      // Log signup activity
      setTimeout(() => {
        logActivity('SIGNUP', { 
          timestamp: new Date().toISOString(),
          email: email,
          username: username,
          role: role
        });
      }, 100);
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (!error && data.session) {
      const username = data.user.user_metadata?.username || 'User';
      const role = data.user.user_metadata?.role || 'user';
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${username}`,
      });
      
      // Session persistence is handled automatically by Supabase
      console.log('Login successful, session persisted:', data.session.access_token);
      console.log('User role:', role);
    }

    return { error };
  };

  const signOut = async () => {
    if (user) {
      await logActivity('LOGOUT', { 
        timestamp: new Date().toISOString(),
        email: user.email,
        username: user.user_metadata?.username || 'unknown'
      });
    }
    await supabase.auth.signOut();
    setProfile(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const value = {
    user,
    session,
    profile,
    signUp,
    signIn,
    signOut,
    isLoading,
    logActivity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
