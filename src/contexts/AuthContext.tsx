
import React, { createContext, useContext, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

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
  promoteToAdmin: () => Promise<{ error: any }>;
  getUserRole: () => string | null;
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
  const [isLoading, setIsLoading] = useState(false);

  const getUserRole = () => {
    return 'user'; // Static role for now
  };

  const promoteToAdmin = async () => {
    // Disabled for rebuild
    return { error: { message: 'Feature temporarily disabled' } };
  };

  const logActivity = async (action: string, details?: any) => {
    // Disabled for rebuild
    console.log('Activity logging disabled:', action, details);
  };

  const signUp = async (email: string, password: string, username: string) => {
    // Static implementation - no live updates
    return { error: { message: 'Signup temporarily disabled for rebuild' } };
  };

  const signIn = async (email: string, password: string) => {
    // Static implementation - no live updates
    return { error: { message: 'Login temporarily disabled for rebuild' } };
  };

  const signOut = async () => {
    // Static implementation - no live updates
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const value = {
    user,
    session,
    profile,
    signUp,
    signIn,
    signOut,
    isLoading,
    logActivity,
    promoteToAdmin,
    getUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
