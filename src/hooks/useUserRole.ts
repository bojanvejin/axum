import { useSession } from '@/components/SessionContextProvider';

export const useUserRole = () => {
  const { profile, loading } = useSession();
  const role = profile?.role || 'guest';
  return { role, loading };
};