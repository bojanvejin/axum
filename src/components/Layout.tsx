import React from 'react';
import AxumLogo from './AxumLogo';
import ThemeToggle from './ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider'; // Import useSession
import { Button } from '@/components/ui/button';
import { LogOut, UserCog } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { showError, showSuccess } from '@/utils/toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { session, loading, isAdmin } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      showSuccess('Logged out successfully!');
      navigate('/login');
    } catch (error: any) {
      showError(`Failed to log out: ${error.message}`);
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Loading user session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Link to="/">
          <AxumLogo />
        </Link>
        <div className="flex items-center gap-4">
          {session && isAdmin && (
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <UserCog className="mr-2 h-4 w-4" /> Admin Dashboard
              </Button>
            </Link>
          )}
          <ThemeToggle />
          {session && (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          )}
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;