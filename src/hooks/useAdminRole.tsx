import React, { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionContextProvider';
import { db } from '@/integrations/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { showError } from '@/utils/toast';

interface AdminRoleHook {
  isAdmin: boolean;
  loadingAdminRole: boolean;
}

// TEMPORARY: Hardcoded admin email for development bypass
const HARDCODED_ADMIN_EMAIL = 'elmntmail@gmail.com';

export const useAdminRole = (): AdminRoleHook => {
  const { user, loading: loadingUser } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAdminRole, setLoadingAdminRole] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (loadingUser) {
        return;
      }

      if (!user) {
        setIsAdmin(false);
        setLoadingAdminRole(false);
        return;
      }

      // TEMPORARY BYPASS: If the user is the hardcoded admin, grant admin status immediately
      if (user.email === HARDCODED_ADMIN_EMAIL) {
        setIsAdmin(true);
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