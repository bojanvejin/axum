import React from 'react';
import AxumLogo from './AxumLogo';
import ThemeToggle from './ThemeToggle';
import { MadeWithDyad } from './made-with-dyad';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <AxumLogo />
        <ThemeToggle />
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Layout;