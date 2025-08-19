import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { showError } from '@/utils/toast'; // Import showError

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
}

interface SessionContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SessionContextProvider: Initializing...');
    const fetchUserProfile = async (userId: string) => {
      console.log('SessionContextProvider: Fetching user profile for ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, role')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('SessionContextProvider: Error fetching user profile:', error);
        showError(`Failed to load user profile: ${error.message}`);
        setProfile(null);
      } else if (data) {
        console.log('SessionContextProvider: User profile fetched:', data);
        setProfile(data as Profile);
      } else {
        console.log('SessionContextProvider: No user profile found for ID:', userId);
        setProfile(null);
      }
    };

    const handleAuthStateChange = async (event: string, currentSession: Session | null) => {
      console.log('SessionContextProvider: Auth state changed:', event, 'Session:', currentSession);
      setSession(currentSession);
      setUser(currentSession?.user || null);

      if (currentSession?.user) {
        await fetchUserProfile(currentSession.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
      console.log('SessionContextProvider: Loading set to false after auth state change.');

      if (event === 'SIGNED_OUT') {
        console.log('SessionContextProvider: Signed out, navigating to /login');
        navigate('/login');
      } else if (currentSession && location.pathname === '/login') {
        console.log('SessionContextProvider: Signed in on login page, navigating to /');
        navigate('/');
      }
    };

    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session: initialSession }, error: getSessionError }) => {
      if (getSessionError) {
        console.error('SessionContextProvider: Error getting initial session:', getSessionError);
        showError(`Failed to get initial session: ${getSessionError.message}`);
      }
      console.log('SessionContextProvider: Initial session check result:', initialSession);
      setSession(initialSession);
      setUser(initialSession?.user || null);
      if (initialSession?.user) {
        await fetchUserProfile(initialSession.user.id);
      }
      setLoading(false);
      console.log('SessionContextProvider: Loading set to false after initial getSession().');

      if (!initialSession && location.pathname !== '/login') {
        console.log('SessionContextProvider: No initial session, navigating to /login');
        navigate('/login');
      } else if (initialSession && location.pathname === '/login') {
        console.log('SessionContextProvider: Initial session found on login page, navigating to /');
        navigate('/');
      }
    }).catch(error => {
      console.error('SessionContextProvider: Uncaught error in getSession promise:', error);
      showError(`An unexpected error occurred during session check: ${error.message}`);
      setLoading(false); // Ensure loading is set to false even on uncaught errors
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      console.log('SessionContextProvider: Cleaning up auth state subscription.');
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <SessionContext.Provider value={{ session, user, profile, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};