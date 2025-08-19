import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  icon,
  children,
  ...props
}) => {
  return (
    <Card
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-card dark:border-border border border-border justify-between flex flex-col space-y-4",
        className
      )}
      {...props}
    >
      {header && <CardHeader className="p-0 pb-2">{header}</CardHeader>}
      <CardContent className="group-hover/bento:translate-x-2 transition duration-200 p-0">
        {icon}
        {title && <CardTitle className="font-sans font-bold text-lg mb-2 mt-2">{title}</CardTitle>}
        {description && <div className="font-sans font-normal text-sm text-muted-foreground">{description}</div>}
        {children}
      </CardContent>
    </Card>
  );
};

export default BentoGridItem;