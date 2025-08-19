import React from 'react';
import AxumLogo from './AxumLogo';
import ThemeToggle from './ThemeToggle';
import { MadeWithDyad } from './made-with-dyad';
import { Link } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole'; // Import the hook

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { role, loading } = useUserRole(); // Use the hook

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <AxumLogo />
        <div className="flex items-center gap-4">
          {!loading && role === 'admin' && ( // Conditionally render based on role
            <Link to="/admin" className="text-sm font-medium text-primary hover:underline">
              Admin Dashboard
            </Link>
          )}
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Layout;