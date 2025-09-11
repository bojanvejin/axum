import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumLesson, StudentProgress, CurriculumModule, CurriculumPhase } from '@/data/curriculum';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext'; // Changed from useSession
import LessonNavigationSidebar from '@/components/LessonNavigationSidebar';
import QuizComponent from '@/components/QuizComponent';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

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
  const { userName, isAuthenticated, loading: authLoading } = useAuth(); // Changed from useSession
  const navigate = useNavigate();
  const { t } = useLanguage(); // Use translation hook

  useEffect(() => {
    const fetchLessonAndProgress = async () => {
      setLoading(true);
      try {
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*, modules(id, title, phase_id, phases(id, title))')
          .eq('id', lessonId)
          .single();

        if (lessonError) throw lessonError;
        setLesson(lessonData);

        const module = lessonData?.modules as CurriculumModule & { phases: CurriculumPhase };
        if (module) {
          setCurrentModule(module);
          setCurrentPhase(module.phases);

          const { data: lessonsInModule, error: moduleLessonsError } = await supabase
            .from('lessons')
            .select('*')
            .eq('module_id', module.id)
            .order('order_index', { ascending: true });
          if (moduleLessonsError) throw moduleLessonsError;
          setModuleLessons(lessonsInModule || []);

          const currentIndex = lessonsInModule?.findIndex(l => l.id === lessonId);
          if (currentIndex !== undefined && lessonsInModule && currentIndex < lessonsInModule.length - 1) {
            setNextLesson(lessonsInModule[currentIndex + 1]);
          } else {
            setNextLesson(null);
          }
        } else {
          setModuleLessons([]);
          setNextLesson(null);
        }

        if (isAuthenticated && userName) {
          const storedProgress = localStorage.getItem(`progress_${userName}`);
          const parsedProgress: StudentProgress[] = storedProgress ? JSON.parse(storedProgress) : [];
          setStudentProgress(parsedProgress);
          setIsCompleted(parsedProgress.some(p => p.lesson_id === lessonId && p.status === 'completed') || false);
        } else {
          setStudentProgress([]);
          setIsCompleted(false);
        }

      } catch (error: any) {
        showError(t('failed_to_load_lessons', { message: error.message }));
        console.error('Error fetching lesson or progress:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId && !authLoading) {
      fetchLessonAndProgress();
    }
  }, [lessonId, isAuthenticated, userName, authLoading, t]);

  const handleMarkComplete = async () => {
    if (!isAuthenticated || !userName) {
      showError(t('must_be_logged_in_to_mark_complete'));
      return;
    }

    setLoading(true);
    try {
      const newProgressEntry: StudentProgress = {
        id: lessonId!, // Use lessonId as a unique identifier for progress in local storage
        user_id: userName, // Use userName as user_id for local storage
        lesson_id: lessonId!,
        completed_at: new Date().toISOString(),
        status: 'completed',
      };

      const updatedProgress = studentProgress.filter(p => p.lesson_id !== lessonId).concat(newProgressEntry);
      localStorage.setItem(`progress_${userName}`, JSON.stringify(updatedProgress));

      setIsCompleted(true);
      setStudentProgress(updatedProgress);
      showSuccess(t('lesson_marked_complete'));
    } catch (error: any) {
      showError(t('lesson_mark_complete_failed', { message: error.message }));
      console.error('Error marking lesson complete:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizAttempted = (score: number, totalQuestions: number) => {
    if (score >= 70) {
      handleMarkComplete();
    } else {
      showError(t('quiz_score_too_low'));
    }
  };

  const lessonText = useMemo(() => {
    if (!lesson?.content_html || typeof window === 'undefined') return '';
    const div = document.createElement('div');
    div.innerHTML = lesson.content_html;
    return div.textContent || div.innerText || '';
  }, [lesson?.content_html]);

  if (loading || authLoading) {
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
          <h2 className="text-2xl font-bold">{t('lesson_not_found')}</h2>
          <Link to="/" className="text-blue-500 hover:underline">{t('return_to_home')}</Link>
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
          <p className="text-lg text-muted-foreground mb-4">{t('objectives')}: {lesson.objectives}</p>

          <div className="mb-6">
            <TextToSpeechButton textToSpeak={lessonText} />
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: lesson.content_html || `<p>${t('no_content_available')}</p>` }} />

          {lesson.video_url && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('video_demonstration')}</h2>
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
              <h2 className="text-2xl font-semibold mb-4">{t('resources')}</h2>
              <a href={lesson.resources_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {t('download_resources')}
              </a>
            </div>
          )}

          {lesson.quiz_id && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('knowledge_check_quiz')}</h2>
              <QuizComponent quizId={lesson.quiz_id} lessonId={lesson.id} onQuizAttempted={handleQuizAttempted} />
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handleMarkComplete}
              disabled={isCompleted || loading || !isAuthenticated}
              className="w-full md:w-auto"
            >
              {isCompleted ? t('completed') : t('mark_complete')}
            </Button>
            {nextLesson && (
              <Button onClick={() => navigate(`/lessons/${nextLesson.id}`)} className="ml-auto">
                {t('next_lesson')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LessonDetail;