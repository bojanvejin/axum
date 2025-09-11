import React from 'react';
import { Link } from 'react-router-dom';
import { CurriculumPhase, CurriculumModule, CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSession } from '@/components/SessionContextProvider';

interface CurriculumPhaseOverviewCardProps {
  phase: CurriculumPhase;
  modules: CurriculumModule[];
  allLessons: CurriculumLesson[];
  studentProgress: StudentProgress[];
  backgroundImage: string;
}

const CurriculumPhaseOverviewCard: React.FC<CurriculumPhaseOverviewCardProps> = ({ phase, modules, allLessons, studentProgress, backgroundImage }) => {
  const { user } = useSession();

  const getPhaseProgress = () => {
    const lessonsInPhase = allLessons.filter(lesson => 
      modules.some(module => module.id === lesson.module_id)
    );
    const completedLessonsInPhase = studentProgress.filter(
      progress => lessonsInPhase.some(lesson => lesson.id === progress.lesson_id) && progress.status === 'completed'
    );

    const totalLessons = lessonsInPhase.length;
    const completedCount = completedLessonsInPhase.length;
    const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

    return { totalLessons, completedCount, progressPercentage };
  };

  const { totalLessons, completedCount, progressPercentage } = getPhaseProgress();

  return (
    <Link to={`/phases/${phase.id}`} className="block group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 md:col-span-1 h-64">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />
      <div className="relative p-6 flex flex-col justify-between h-full text-white">
        <div>
          <CardTitle className="text-2xl font-bold">{phase.title}</CardTitle>
          <CardDescription className="text-gray-300 mt-1 line-clamp-2">{phase.description}</CardDescription>
          <p className="text-sm text-gray-400 mt-2">Duration: {phase.weeks} Weeks</p>
        </div>
        {user && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-sm mb-1">
              <span>Progress</span>
              <span>{completedCount}/{totalLessons} Lessons</span>
            </div>
            <Progress value={progressPercentage} className="h-2 [&>div]:bg-white" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default CurriculumPhaseOverviewCard;