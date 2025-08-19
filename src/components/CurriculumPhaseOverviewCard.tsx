import React from 'react';
import { Link } from 'react-router-dom';
import { CurriculumPhase, CurriculumModule, CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useSession } from '@/components/SessionContextProvider';

interface CurriculumPhaseOverviewCardProps {
  phase: CurriculumPhase;
  modules: CurriculumModule[];
  allLessons: CurriculumLesson[]; // Added prop
  studentProgress: StudentProgress[]; // Added prop
}

const CurriculumPhaseOverviewCard: React.FC<CurriculumPhaseOverviewCardProps> = ({ phase, modules, allLessons, studentProgress }) => {
  const { user } = useSession();

  const getModuleProgress = (moduleId: string) => {
    const lessonsInModule = allLessons.filter(lesson => lesson.module_id === moduleId);
    const completedLessonsInModule = studentProgress.filter(
      progress => lessonsInModule.some(lesson => lesson.id === progress.lesson_id) && progress.status === 'completed'
    );

    const totalLessons = lessonsInModule.length;
    const completedCount = completedLessonsInModule.length;
    const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

    return { totalLessons, completedCount, progressPercentage };
  };

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
          <ul className="space-y-4">
            {modules.map((module) => {
              const { totalLessons, completedCount, progressPercentage } = getModuleProgress(module.id);
              return (
                <li key={module.id}>
                  <Link to={`/phases/${phase.id}/modules/${module.id}`} className="block p-3 rounded-md hover:bg-accent transition-colors">
                    <p className="font-medium">{module.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{module.description}</p>
                    {user && ( // Only show progress if user is logged in
                      <div className="flex items-center gap-2">
                        <Progress value={progressPercentage} className="flex-grow h-2" />
                        <span className="text-xs text-muted-foreground">{completedCount}/{totalLessons}</span>
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">No modules available for this phase yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CurriculumPhaseOverviewCard;