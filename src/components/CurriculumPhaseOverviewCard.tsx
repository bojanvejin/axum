import React from 'react';
import { Link } from 'react-router-dom';
import { CurriculumPhase, CurriculumModule } from '@/data/curriculum';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface CurriculumPhaseOverviewCardProps {
  phase: CurriculumPhase;
  modules: CurriculumModule[];
}

const CurriculumPhaseOverviewCard: React.FC<CurriculumPhaseOverviewCardProps> = ({ phase, modules }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-2xl">{phase.title}</CardTitle>
        <CardDescription>{phase.description}</CardDescription>
        <p className="text-sm text-muted-foreground mt-2">Duration: {phase.weeks} Weeks</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="text-lg font-semibold mb-3">Modules:</h3>
        {modules.length > 0 ? (
          <ul className="space-y-2">
            {modules.map((module) => (
              <li key={module.id}>
                <Link to={`/phases/${phase.id}/modules/${module.id}`} className="block p-3 rounded-md hover:bg-accent transition-colors">
                  <p className="font-medium">{module.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{module.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">No modules available for this phase yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CurriculumPhaseOverviewCard;