"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/integrations/firebase/client';
import { showError } from '@/utils/toast';

interface SessionContextType {
  user: User | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("SessionContextProvider: Initializing auth state listener.");
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("SessionContextProvider: Auth state changed. Current user:", currentUser ? currentUser.email : "No user");
      setUser(currentUser);
      setLoading(false);
    }, (error) => {
      console.error("SessionContextProvider: Firebase Auth Error:", error);
      showError("Authentication error. Please try again.");
      setLoading(false);
    });

    return () => {
      console.log("SessionContextProvider: Cleaning up auth state listener.");
      unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ user, loading }}>
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