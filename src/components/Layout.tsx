import React from 'react';
import AxumLogo from './AxumLogo';
import ThemeToggle from './ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider'; // New import
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/integrations/firebase/client';
import { showError, showSuccess } from '@/utils/toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, loading } = useSession(); // Use Firebase session
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showSuccess('Logged out successfully!');
      navigate('/login');
    } catch (error: any) {
      console.error('Firebase Logout Error:', error);
      showError(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Link to="/">
          <AxumLogo />
        </Link>
        <div className="flex items-center gap-4">
          {!loading && (
            user ? (
              <>
                <Link to="/admin">
                  <Button variant="ghost">Admin Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )
          )}
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;