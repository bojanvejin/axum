import React from 'react';
import { Link } from 'react-router-dom';
import { CurriculumSession, CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getLocalUser } from '@/utils/localUser'; // Import local user utility

interface SessionOverviewCardProps {
  session: CurriculumSession;
  allLessons: CurriculumLesson[];
  studentProgress: StudentProgress[];
  backgroundImage: string;
}

const SessionOverviewCard: React.FC<SessionOverviewCardProps> = ({ session, allLessons, studentProgress, backgroundImage }) => {
  const localUser = getLocalUser(); // Get local user

  const getSessionProgress = () => {
    const lessonsInSession = allLessons.filter(lesson => lesson.session_id === session.id);
    const completedLessonsInSession = studentProgress.filter(
      progress => lessonsInSession.some(lesson => lesson.id === progress.lesson_id) && progress.status === 'completed'
    );

    const totalLessons = lessonsInSession.length;
    const completedCount = completedLessonsInSession.length;
    const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

    return { totalLessons, completedCount, progressPercentage };
  };

  const { totalLessons, completedCount, progressPercentage } = getSessionProgress();

  return (
    <Link to={`/sessions/${session.id}`} className="block group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 md:col-span-1 h-64">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />
      <div className="relative p-6 flex flex-col justify-between h-full text-white">
        <div>
          <CardTitle className="text-2xl font-bold">Session {session.session_number}: {session.title}</CardTitle>
          <CardDescription className="text-gray-300 mt-1 line-clamp-2">{session.description}</CardDescription>
          {session.covers_days && session.covers_days.length > 0 && (
            <p className="text-sm text-gray-400 mt-2">Covers Days: {session.covers_days.join(', ')}</p>
          )}
        </div>
        {localUser && ( // Conditionally render progress if user is identified
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

export default SessionOverviewCard;