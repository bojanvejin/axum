import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { showError } from '@/utils/toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  avatar_url: string | null;
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
  const location = useLocation(); // Use useLocation hook
  const { t } = useLanguage();

  const fetchUserProfile = async (userId: string) => {
    console.log('SessionContextProvider: Fetching user profile for ID:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, role, avatar_url')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('SessionContextProvider: Error fetching user profile:', error);
      showError(t('failed_to_load_profile', { message: error.message }));
      setProfile(null);
      return null;
    } else if (data) {
      console.log('SessionContextProvider: User profile fetched:', data);
      setProfile(data as Profile);
      return data as Profile;
    } else {
      console.log('SessionContextProvider: No user profile found for ID:', userId);
      setProfile(null);
      return null;
    }
  };

  const handleAuthStateChange = async (event: string, currentSession: Session | null) => {
    console.log('SessionContextProvider: Auth state changed:', event, 'Session:', currentSession);
    setSession(currentSession);
    setUser(currentSession?.user || null);

    if (currentSession?.user) {
      const userProfile = await fetchUserProfile(currentSession.user.id);
      // Redirect to complete profile if first_name or last_name is missing
      if (userProfile && (!userProfile.first_name || !userProfile.last_name) && location.pathname !== '/complete-profile') {
        console.log('SessionContextProvider: Profile incomplete, navigating to /complete-profile');
        navigate('/complete-profile');
      } else if (currentSession && location.pathname === '/login') {
        console.log('SessionContextProvider: Signed in on login page, navigating to /');
        navigate('/');
      }
    } else {
      setProfile(null);
      if (event === 'SIGNED_OUT' && location.pathname !== '/login') {
        console.log('SessionContextProvider: Signed out, navigating to /login');
        navigate('/login');
      } else if (location.pathname !== '/login' && location.pathname !== '/complete-profile') {
        // Only redirect to login if not already on login or complete-profile page
        console.log('SessionContextProvider: No session, navigating to /login');
        navigate('/login');
      }
    }

    setLoading(false);
    console.log('SessionContextProvider: Loading set to false after auth state change.');
  };

  useEffect(() => {
    console.log('SessionContextProvider: Initializing...');
    supabase.auth.getSession().then(async ({ data: { session: initialSession }, error: getSessionError }) => {
      if (getSessionError) {
        console.error('SessionContextProvider: Error getting initial session:', getSessionError);
        showError(t('failed_to_get_initial_session', { message: getSessionError.message }));
      }
      console.log('SessionContextProvider: Initial session check result:', initialSession);
      setSession(initialSession);
      setUser(initialSession?.user || null);

      if (initialSession?.user) {
        const userProfile = await fetchUserProfile(initialSession.user.id);
        if (userProfile && (!userProfile.first_name || !userProfile.last_name) && location.pathname !== '/complete-profile') {
          console.log('SessionContextProvider: Initial profile incomplete, navigating to /complete-profile');
          navigate('/complete-profile');
        } else if (initialSession && location.pathname === '/login') {
          console.log('SessionContextProvider: Initial session found on login page, navigating to /');
          navigate('/');
        }
      } else if (!initialSession && location.pathname !== '/login' && location.pathname !== '/complete-profile') {
        console.log('SessionContextProvider: No initial session, navigating to /login');
        navigate('/login');
      }
      setLoading(false);
      console.log('SessionContextProvider: Loading set to false after initial getSession().');
    }).catch(error => {
      console.error('SessionContextProvider: Uncaught error in getSession promise:', error);
      showError(t('unexpected_error_session_check', { message: error.message }));
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      console.log('SessionContextProvider: Cleaning up auth state subscription.');
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname, t]); // Added location.pathname to dependencies

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