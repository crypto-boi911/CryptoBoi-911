
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
  signUp: (username: string, accessKey: string) => Promise<{ error: any }>;
  signIn: (username: string, accessKey: string) => Promise<{ error: any }>;
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
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
          if (event === 'SIGNED_IN') {
            // Use setTimeout to avoid potential recursion
            setTimeout(() => {
              logActivity('LOGIN', { timestamp: new Date().toISOString() });
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

  const signUp = async (username: string, accessKey: string) => {
    const email = `${username}@cryptoboi.fake`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password: accessKey,
      options: {
        data: {
          username: username,
          role: 'user'
        }
      }
    });

    if (!error) {
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    }

    return { error };
  };

  const signIn = async (username: string, accessKey: string) => {
    const email = `${username}@cryptoboi.fake`;
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: accessKey
    });

    if (!error) {
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
    }

    return { error };
  };

  const signOut = async () => {
    if (user) {
      await logActivity('LOGOUT', { timestamp: new Date().toISOString() });
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
