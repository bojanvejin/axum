import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr", // Responsive grid
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BentoGrid;