import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LessonNavigationSidebarProps {
  lessons: CurriculumLesson[];
  currentLessonId: string;
  studentProgress: StudentProgress[]; // Now passed directly
}

const LessonNavigationSidebar: React.FC<LessonNavigationSidebarProps> = ({
  lessons,
  currentLessonId,
  studentProgress,
}) => {
  const { phaseId, moduleId } = useParams<{ phaseId: string; moduleId: string }>();

  const isLessonCompleted = (lessonId: string) => {
    return studentProgress.some(p => p.lesson_id === lessonId && p.status === 'completed');
  };

  return (
    <ScrollArea className="h-full w-64 border-r bg-card p-4 hidden md:block">
      <h3 className="text-lg font-semibold mb-4">Lessons in this Module</h3>
      <nav className="space-y-2">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/lessons/${lesson.id}`}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              currentLessonId === lesson.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground",
            )}
          >
            {isLessonCompleted(lesson.id) ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <Circle className="text-muted-foreground" size={16} />
            )}
            {lesson.title}
          </Link>
        ))}
      </nav>
    </ScrollArea>
  );
};

export default LessonNavigationSidebar;