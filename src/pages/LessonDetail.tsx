import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumLesson, StudentProgress, CurriculumModule, CurriculumPhase } from '@/data/curriculum';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/SessionContextProvider';
import LessonNavigationSidebar from '@/components/LessonNavigationSidebar';
import QuizComponent from '@/components/QuizComponent';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Import ArrowRight

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<CurriculumLesson | null>(null);
  const [moduleLessons, setModuleLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentModule, setCurrentModule] = useState<CurriculumModule | null>(null);
  const [currentPhase, setCurrentPhase] = useState<CurriculumPhase | null>(null);
  const [nextLesson, setNextLesson] = useState<CurriculumLesson | null>(null);
  const { user, loading: userLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonAndProgress = async () => {
      setLoading(true);
      try {
        // Fetch current lesson details and its module/phase
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*, modules(id, title, phase_id, phases(id, title))') // Select module and phase details
          .eq('id', lessonId)
          .single();

        if (lessonError) throw lessonError;
        setLesson(lessonData);

        const module = lessonData?.modules as CurriculumModule & { phases: CurriculumPhase };
        if (module) {
          setCurrentModule(module);
          setCurrentPhase(module.phases);

          // Fetch all lessons for the current module (for sidebar navigation and next lesson)
          const { data: lessonsInModule, error: moduleLessonsError } = await supabase
            .from('lessons')
            .select('*')
            .eq('module_id', module.id)
            .order('order_index', { ascending: true });
          if (moduleLessonsError) throw moduleLessonsError;
          setModuleLessons(lessonsInModule || []);

          // Determine next lesson
          const currentIndex = lessonsInModule?.findIndex(l => l.id === lessonId);
          if (currentIndex !== undefined && lessonsInModule && currentIndex < lessonsInModule.length - 1) {
            setNextLesson(lessonsInModule[currentIndex + 1]);
          } else {
            setNextLesson(null); // No next lesson
          }
        } else {
          setModuleLessons([]);
          setNextLesson(null);
        }

        // Fetch student progress if user is logged in
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('student_progress')
            .select('*')
            .eq('user_id', user.id);

          if (progressError && progressError.code !== 'PGRST116') {
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
  }, [lessonId, user, userLoading]);

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
          { onConflict: 'user_id,lesson_id' }
        );

      if (error) throw error;
      setIsCompleted(true);
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

  const handleQuizAttempted = (score: number, totalQuestions: number) => {
    // Optionally update progress or show a message based on quiz completion
    if (score >= 70) { // Example: Mark complete if score is 70% or higher
      handleMarkComplete();
    } else {
      showError("Quiz score too low to mark lesson complete. Please review and try again.");
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
          <div className="flex items-center mb-4">
            {currentModule && currentPhase && (
              <Button variant="ghost" size="icon" asChild>
                <Link to={`/phases/${currentPhase.id}/modules/${currentModule.id}`}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <h1 className="text-3xl md:text-4xl font-bold ml-2">{lesson.title}</h1>
          </div>
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
              <QuizComponent quizId={lesson.quiz_id} lessonId={lesson.id} onQuizAttempted={handleQuizAttempted} />
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handleMarkComplete}
              disabled={isCompleted || loading}
              className="w-full md:w-auto"
            >
              {isCompleted ? "Completed!" : "Mark Complete"}
            </Button>
            {nextLesson && (
              <Button onClick={() => navigate(`/lessons/${nextLesson.id}`)} className="ml-auto">
                Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LessonDetail;