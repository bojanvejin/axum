import React, { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionContextProvider';
import { db } from '@/integrations/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { showError } from '@/utils/toast';

interface AdminRoleHook {
  isAdmin: boolean;
  loadingAdminRole: boolean;
}

export const useAdminRole = (): AdminRoleHook => {
  const { user, loading: loadingUser } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAdminRole, setLoadingAdminRole] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (loadingUser) {
        // Still loading user session, wait for it
        return;
      }

      if (!user) {
        // No user logged in, definitely not an admin
        setIsAdmin(false);
        setLoadingAdminRole(false);
        return;
      }

      try {
        const profileDocRef = doc(db, 'profiles', user.uid);
        const profileDocSnap = await getDoc(profileDocRef);

        if (profileDocSnap.exists()) {
          const profileData = profileDocSnap.data();
          setIsAdmin(profileData.role === 'admin');
        } else {
          // Profile not found, default to not admin
          setIsAdmin(false);
        }
      } catch (error: any) {
        console.error('Error fetching user profile for admin check:', error);
        showError('Failed to verify admin role.');
        setIsAdmin(false);
      } finally {
        setLoadingAdminRole(false);
      }
    };

    checkAdminStatus();
  }, [user, loadingUser]);

  return { isAdmin, loadingAdminRole };
};