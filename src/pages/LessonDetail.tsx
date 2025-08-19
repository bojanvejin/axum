import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumLesson, StudentProgress } from '@/data/curriculum';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/SessionContextProvider'; // Import useSession
import LessonNavigationSidebar from '@/components/LessonNavigationSidebar'; // Import the new sidebar
import QuizComponent from '@/components/QuizComponent'; // Import QuizComponent

const LessonDetail: React.FC = () => {
  const { lessonId, moduleId } = useParams<{ lessonId: string; moduleId?: string }>(); // moduleId is now optional
  const [lesson, setLesson] = useState<CurriculumLesson | null>(null);
  const [moduleLessons, setModuleLessons] = useState<CurriculumLesson[]>([]); // All lessons in the current module
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const { user, loading: userLoading } = useSession();

  useEffect(() => {
    const fetchLessonAndProgress = async () => {
      setLoading(true);
      try {
        // Fetch current lesson details
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .single();

        if (lessonError) throw lessonError;
        setLesson(lessonData);

        // Fetch all lessons for the current module (for sidebar navigation)
        if (lessonData?.module_id) {
          const { data: lessonsInModule, error: moduleLessonsError } = await supabase
            .from('lessons')
            .select('*')
            .eq('module_id', lessonData.module_id)
            .order('order_index', { ascending: true });
          if (moduleLessonsError) throw moduleLessonsError;
          setModuleLessons(lessonsInModule || []);
        }

        // Fetch student progress if user is logged in
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('student_progress')
            .select('*') // Fetch all progress to check for sidebar
            .eq('user_id', user.id);

          if (progressError && progressError.code !== 'PGRST116') { // PGRST116 means no rows found
            throw progressError;
          }
          setStudentProgress(progressData || []);
          setIsCompleted(progressData?.some(p => p.lesson_id === lessonId && p.status === 'completed') || false);
        }

      } catch (error: any) {
        showError(`Failed to load lesson details: ${error.message}`);
        console.error('Error fetching lesson or progress:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId && !userLoading) {
      fetchLessonAndProgress();
    }
  }, [lessonId, user, userLoading]); // Re-fetch if user or lesson changes

  const handleMarkComplete = async () => {
    if (!user) {
      showError("You must be logged in to mark lessons complete.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('student_progress')
        .upsert(
          {
            user_id: user.id,
            lesson_id: lessonId!,
            completed_at: new Date().toISOString(),
            status: 'completed',
          },
          { onConflict: 'user_id,lesson_id' } // Update if already exists
        );

      if (error) throw error;
      setIsCompleted(true);
      // Update local studentProgress state to reflect the change for sidebar
      setStudentProgress(prev => {
        const existing = prev.find(p => p.lesson_id === lessonId);
        if (existing) {
          return prev.map(p => p.lesson_id === lessonId ? { ...p, status: 'completed', completed_at: new Date().toISOString() } : p);
        } else {
          return [...prev, { id: 'new-id', user_id: user.id, lesson_id: lessonId!, completed_at: new Date().toISOString(), status: 'completed' }];
        }
      });
      showSuccess("Lesson marked as complete!");
    } catch (error: any) {
      showError(`Failed to mark lesson complete: ${error.message}`);
      console.error('Error marking lesson complete:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-full">
          <Skeleton className="h-screen w-64 hidden md:block" />
          <div className="flex-grow container mx-auto p-4">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!lesson) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Lesson not found.</h2>
          <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-full">
        <LessonNavigationSidebar
          lessons={moduleLessons}
          currentLessonId={lessonId!}
          studentProgress={studentProgress}
        />
        <div className="flex-grow container mx-auto p-4 overflow-y-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">Objectives: {lesson.objectives}</p>

          <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: lesson.content_html || '<p>No content available for this lesson yet.</p>' }} />

          {lesson.video_url && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Video Demonstration</h2>
              <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src={lesson.video_url}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {lesson.resources_url && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Resources</h2>
              <a href={lesson.resources_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Download Resources
              </a>
            </div>
          )}

          {lesson.quiz_id && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Knowledge Check Quiz</h2>
              <QuizComponent quizId={lesson.quiz_id} lessonId={lesson.id} />
            </div>
          )}

          <Button
            onClick={handleMarkComplete}
            disabled={isCompleted || loading}
            className="w-full md:w-auto"
          >
            {isCompleted ? "Completed!" : "Mark Complete"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LessonDetail;