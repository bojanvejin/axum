import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumLesson, StudentProgress, CurriculumSession } from '@/data/curriculum';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import LessonNavigationSidebar from '@/components/LessonNavigationSidebar';
import QuizComponent from '@/components/QuizComponent';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import { getLocalUser } from '@/utils/localUser'; // Import local user utility

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const localUser = getLocalUser(); // Get local user
  const [lesson, setLesson] = useState<CurriculumLesson | null>(null);
  const [sessionLessons, setSessionLessons] = useState<CurriculumLesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentSession, setCurrentSession] = useState<CurriculumSession | null>(null);
  const [nextLesson, setNextLesson] = useState<CurriculumLesson | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localUser) {
      navigate('/enter-name'); // Redirect if not logged in
      return;
    }

    const fetchLessonAndProgress = async () => {
      setLoading(true);
      try {
        // Fetch current lesson details and its session
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*, sessions(id, title, session_number)') // Select session details
          .eq('id', lessonId)
          .single();

        if (lessonError) throw lessonError;
        setLesson(lessonData);

        const session = lessonData?.sessions as CurriculumSession;
        if (session) {
          setCurrentSession(session);

          // Fetch all lessons for the current session (for sidebar navigation and next lesson)
          const { data: lessonsInSession, error: sessionLessonsError } = await supabase
            .from('lessons')
            .select('*')
            .eq('session_id', session.id)
            .order('order_index', { ascending: true });
          if (sessionLessonsError) throw sessionLessonsError;
          setSessionLessons(lessonsInSession || []);

          // Determine next lesson
          const currentIndex = lessonsInSession?.findIndex(l => l.id === lessonId);
          if (currentIndex !== undefined && lessonsInSession && currentIndex < lessonsInSession.length - 1) {
            setNextLesson(lessonsInSession[currentIndex + 1]);
          } else {
            setNextLesson(null); // No next lesson
          }
        } else {
          setSessionLessons([]);
          setNextLesson(null);
        }

        // Load student progress from Supabase using local user ID
        const { data: progressData, error: progressError } = await supabase
          .from('student_progress')
          .select('*')
          .eq('user_id', localUser.id); // Use localUser.id
        if (progressError) throw progressError;
        setStudentProgress(progressData || []);
        setIsCompleted(progressData?.some(p => p.lesson_id === lessonId && p.status === 'completed') || false);

      } catch (error: any) {
        showError(`Failed to load lesson details: ${error.message}`);
        console.error('Error fetching lesson or progress:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId && localUser) {
      fetchLessonAndProgress();
    }
  }, [lessonId, localUser, navigate]);

  const handleMarkComplete = async () => {
    if (!localUser) {
      showError("You must be identified to mark a lesson complete.");
      return;
    }

    setLoading(true);
    try {
      const existingProgress = studentProgress.find(p => p.lesson_id === lessonId);

      if (existingProgress) {
        const { error } = await supabase
          .from('student_progress')
          .update({ status: 'completed', completed_at: new Date().toISOString() })
          .eq('id', existingProgress.id)
          .eq('user_id', localUser.id); // Ensure only current user's progress is updated
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('student_progress')
          .insert({ user_id: localUser.id, lesson_id: lessonId!, status: 'completed', completed_at: new Date().toISOString() });
        if (error) throw error;
      }

      setIsCompleted(true);
      // Re-fetch progress to update state
      const { data: updatedProgress, error: fetchError } = await supabase
        .from('student_progress')
        .select('*')
        .eq('user_id', localUser.id);
      if (fetchError) throw fetchError;
      setStudentProgress(updatedProgress || []);

      showSuccess("Lesson marked as complete!");
    } catch (error: any) {
      showError(`Failed to mark lesson complete: ${error.message}`);
      console.error('Error marking lesson complete:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizAttempted = (score: number, totalQuestions: number) => {
    if (score >= 90) { // Mark complete if score is 90% or higher
      handleMarkComplete();
    } else {
      showError("Quiz score too low to mark lesson complete. Please review and try again.");
    }
  };

  const lessonText = useMemo(() => {
    if (!lesson?.content_html || typeof window === 'undefined') return '';
    const div = document.createElement('div');
    div.innerHTML = lesson.content_html;
    return div.textContent || div.innerText || '';
  }, [lesson?.content_html]);

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
          lessons={sessionLessons}
          currentLessonId={lessonId!}
          studentProgress={studentProgress}
        />
        <div className="flex-grow container mx-auto p-4 overflow-y-auto">
          <div className="flex items-center mb-4">
            {currentSession && (
              <Button variant="ghost" size="icon" asChild>
                <Link to={`/sessions/${currentSession.id}`}>
                      <ArrowLeft className="h-5 w-5" />
                    </Link>
                  </Button>
                )}
                <h1 className="text-3xl md:text-4xl font-bold ml-2">{lesson.title}</h1>
              </div>
              <p className="text-lg text-muted-foreground mb-4">Objectives: {lesson.objectives}</p>

              {currentSession?.session_number !== undefined && (
                <p className="text-md text-muted-foreground mb-2">
                  Session: {currentSession.session_number}
                </p>
              )}
              {lesson.week_number !== undefined && lesson.day_number !== undefined && (
                <p className="text-md text-muted-foreground mb-6">
                  Scheduled: Week {lesson.week_number}, Day {lesson.day_number}
                </p>
              )}

              <div className="mb-6">
                <TextToSpeechButton textToSpeak={lessonText} />
              </div>

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