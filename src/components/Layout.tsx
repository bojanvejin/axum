import React from 'react';
import AxumLogo from './AxumLogo';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';
// useUserRole is no longer needed as we are removing Supabase auth

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // role and loading are no longer needed
  // const { role, loading } = useUserRole(); 

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <AxumLogo />
        <div className="flex items-center gap-4">
          {/* Admin Dashboard link removed as roles are no longer managed via Supabase auth */}
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