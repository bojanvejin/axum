import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { doc, getDoc, collection, query, where, orderBy, getDocs, setDoc, updateDoc } from 'firebase/firestore'; // Firestore imports
import { CurriculumLesson, StudentProgress, CurriculumModule, CurriculumPhase } from '@/data/curriculum';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import LessonNavigationSidebar from '@/components/LessonNavigationSidebar';
import QuizComponent from '@/components/QuizComponent';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TextToSpeechButton from '@/components/TextToSpeechButton';
import { useSession } from '@/components/SessionContextProvider'; // New import for session
import { marked } from 'marked'; // Import marked
import DOMPurify from 'dompurify'; // Import DOMPurify

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
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSession(); // Get user from Firebase session

  useEffect(() => {
    if (authLoading) {
      return; // Wait for auth state to resolve
    }
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchLessonAndProgress = async () => {
      if (!lessonId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Fetch current lesson details
        const lessonDocRef = doc(db, 'lessons', lessonId);
        const lessonDocSnap = await getDoc(lessonDocRef);

        if (!lessonDocSnap.exists()) {
          throw new Error('Lesson not found');
        }
        const lessonData = { id: lessonDocSnap.id, ...lessonDocSnap.data() } as CurriculumLesson;
        setLesson(lessonData);

        // Fetch module and phase details
        if (lessonData.module_id) {
          const moduleDocRef = doc(db, 'modules', lessonData.module_id);
          const moduleDocSnap = await getDoc(moduleDocRef);
          if (moduleDocSnap.exists()) {
            const moduleData = { id: moduleDocSnap.id, ...moduleDocSnap.data() } as CurriculumModule;
            setCurrentModule(moduleData);

            if (moduleData.phase_id) {
              const phaseDocRef = doc(db, 'phases', moduleData.phase_id);
              const phaseDocSnap = await getDoc(phaseDocRef);
              if (phaseDocSnap.exists()) {
                setCurrentPhase({ id: phaseDocSnap.id, ...phaseDocSnap.data() } as CurriculumPhase);
              }
            }

            // Fetch all lessons for the current module (for sidebar navigation and next lesson)
            const lessonsInModuleCollectionRef = collection(db, 'lessons');
            const lessonsInModuleQuery = query(lessonsInModuleCollectionRef, where('module_id', '==', moduleData.id), orderBy('order_index'));
            const lessonsInModuleSnapshot = await getDocs(lessonsInModuleQuery);
            const lessonsInModuleData = lessonsInModuleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumLesson[];
            setModuleLessons(lessonsInModuleData);

            // Determine next lesson
            const currentIndex = lessonsInModuleData.findIndex(l => l.id === lessonId);
            if (currentIndex !== undefined && currentIndex < lessonsInModuleData.length - 1) {
              setNextLesson(lessonsInModuleData[currentIndex + 1]);
            } else {
              setNextLesson(null); // No next lesson
            }
          }
        } else {
          setModuleLessons([]);
          setNextLesson(null);
        }

        // Fetch student progress for the current user
        const progressCollectionRef = collection(db, 'student_progress');
        const progressQuery = query(progressCollectionRef, where('user_id', '==', user.uid), where('lesson_id', '==', lessonId));
        const progressSnapshot = await getDocs(progressQuery);
        const userProgress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StudentProgress[];
        setStudentProgress(userProgress);
        setIsCompleted(userProgress.some(p => p.status === 'completed'));

      } catch (error: any) {
        showError(`Failed to load lesson details: ${error.message}`);
        console.error('Error fetching lesson or progress:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLessonAndProgress();
    }
  }, [lessonId, user, authLoading, navigate]);

  const handleMarkComplete = async () => {
    if (!user || !lessonId) {
      showError("User not identified or lesson ID missing.");
      return;
    }

    setLoading(true);
    try {
      const progressDocRef = doc(db, 'student_progress', `${user.uid}_${lessonId}`); // Unique ID for progress
      const progressDocSnap = await getDoc(progressDocRef);

      if (progressDocSnap.exists()) {
        await updateDoc(progressDocRef, {
          status: 'completed',
          completed_at: new Date().toISOString(),
        });
      } else {
        await setDoc(progressDocRef, {
          user_id: user.uid,
          lesson_id: lessonId,
          status: 'completed',
          completed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        });
      }

      setIsCompleted(true);
      showSuccess("Lesson marked as complete!");
      // Re-fetch progress to update state
      const updatedProgressSnapshot = await getDocs(query(collection(db, 'student_progress'), where('user_id', '==', user.uid), where('lesson_id', '==', lessonId)));
      setStudentProgress(updatedProgressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StudentProgress[]);

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

  const lessonHtmlContent = useMemo(() => {
    if (!lesson?.content_html) return '<p>No content available for this lesson yet.</p>';
    // Convert markdown to HTML
    const rawHtml = marked.parse(lesson.content_html);
    // Sanitize the HTML to prevent XSS attacks
    return DOMPurify.sanitize(rawHtml);
  }, [lesson?.content_html]);

  const lessonText = useMemo(() => {
    if (!lesson?.content_html || typeof window === 'undefined') return '';
    // Use marked to convert markdown to HTML, then create a temporary div to extract plain text
    const rawHtml = marked.parse(lesson.content_html);
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    const div = document.createElement('div');
    div.innerHTML = sanitizedHtml;
    return div.textContent || div.innerText || '';
  }, [lesson?.content_html]);

  if (authLoading || loading) {
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
          <p className="text-lg text-muted-foreground mb-4">Objectives: {lesson.objectives}</p>

          <div className="mb-6">
            <TextToSpeechButton textToSpeak={lessonText} />
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: lessonHtmlContent }} />

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