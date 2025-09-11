import React from 'react';
import AxumLogo from './AxumLogo';
import ThemeToggle from './ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { getLocalUser, clearLocalUser } from '@/utils/localUser'; // Import local user utilities
import { Button } from '@/components/ui/button';
import { LogOut, UserCog } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const localUser = getLocalUser();
  const navigate = useNavigate();

  // Simple local check: user is admin if their name is "Admin"
  const isAdmin = localUser?.name === "Admin";

  const handleLogout = () => {
    clearLocalUser();
    showSuccess('Logged out successfully!');
    navigate('/enter-name');
  };

  if (!localUser) {
    // This case should ideally be handled by UserCheck in App.tsx, but as a fallback
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Redirecting to name input...</p>
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
          {localUser && isAdmin && (
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <UserCog className="mr-2 h-4 w-4" /> Admin Dashboard
              </Button>
            </Link>
          )}
          <ThemeToggle />
          {localUser && (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout ({localUser.name})
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